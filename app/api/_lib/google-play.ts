import { createSign } from 'crypto'
import { PLAY_PRODUCTS } from './license-types'
import { apiError, apiLog, maskToken } from './api-log'

/** Google Play subscription paymentState values */
export const PlayPaymentState = {
  Pending: 0,
  Received: 1,
  FreeTrial: 2,
  PendingDeferred: 3,
} as const

export interface PlayVerificationResult {
  valid: boolean
  orderId?: string
  productId: string
  isSubscription: boolean
  isTrial: boolean
  autoRenewing: boolean
  paymentState?: number
  purchaseState?: number
  consumptionState?: number
  acknowledgementState?: number
  /** Epoch millis from Play (subscriptions). */
  expiryTimeMillis?: string
  /** ISO expiry derived from Play (or null for lifetime). */
  expiresAt: string | null
  cancelReason?: number
  raw: unknown
  error?: string
}

function base64url(input: Buffer | string): string {
  const buf = Buffer.isBuffer(input) ? input : Buffer.from(input)
  return buf
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

async function getAccessToken(): Promise<string> {
  const email = process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_EMAIL
  const privateKey = process.env.GOOGLE_PLAY_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(
    /\\n/g,
    '\n'
  )
  if (!email || !privateKey) {
    throw new Error('Google Play service account is not configured')
  }

  const now = Math.floor(Date.now() / 1000)
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claim = base64url(
    JSON.stringify({
      iss: email,
      scope: 'https://www.googleapis.com/auth/androidpublisher',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    })
  )
  const unsigned = `${header}.${claim}`
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  signer.end()
  const signature = base64url(signer.sign(privateKey))
  const assertion = `${unsigned}.${signature}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion,
    }),
  })
  const data = await res.json()
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description || data.error || 'Failed to get Google access token')
  }
  return data.access_token as string
}

export function isKnownPlayProduct(productId: string): boolean {
  const known = new Set([
    PLAY_PRODUCTS.yearly,
    PLAY_PRODUCTS.lifetime,
    PLAY_PRODUCTS.yearlyDiscounted,
    PLAY_PRODUCTS.lifetimeDiscounted,
  ])
  return known.has(productId)
}

export function isSubscriptionProduct(productId: string): boolean {
  const id = productId.toLowerCase()
  return id.includes('year') || id.includes('sub')
}

export function expiryMillisToIso(expiryTimeMillis?: string | number | null): string | null {
  if (expiryTimeMillis == null || expiryTimeMillis === '') return null
  const ms = typeof expiryTimeMillis === 'number'
    ? expiryTimeMillis
    : Number(expiryTimeMillis)
  if (!Number.isFinite(ms) || ms <= 0) return null
  return new Date(ms).toISOString()
}

/**
 * Decide whether a Play subscription entitles access right now.
 * Supports free trial (paymentState=2), paid, and canceled-but-not-expired.
 */
export function isSubscriptionEntitled(data: {
  expiryTimeMillis?: string | number
  paymentState?: number
  cancelReason?: number
}): { entitled: boolean; isTrial: boolean; expiresAt: string | null } {
  const expiresAt = expiryMillisToIso(data.expiryTimeMillis ?? null)
  const expiryMs = expiresAt ? Date.parse(expiresAt) : 0
  const notExpired = expiryMs > Date.now()
  const paymentState = data.paymentState
  const isTrial = paymentState === PlayPaymentState.FreeTrial

  // Pending payment: do not unlock.
  if (paymentState === PlayPaymentState.Pending) {
    return { entitled: false, isTrial, expiresAt }
  }

  // Free trial or paid receipt.
  if (
    paymentState === PlayPaymentState.FreeTrial ||
    paymentState === PlayPaymentState.Received
  ) {
    return { entitled: notExpired, isTrial, expiresAt }
  }

  // paymentState often omitted after cancel; access continues until expiry.
  if (paymentState == null || paymentState === PlayPaymentState.PendingDeferred) {
    return { entitled: notExpired, isTrial: false, expiresAt }
  }

  return { entitled: false, isTrial, expiresAt }
}

/**
 * Verifies a Google Play purchase token against Android Publisher API.
 * Yearly SKUs use the subscriptions endpoint (supports free trials).
 * Lifetime uses one-time products.
 */
export async function verifyGooglePlayPurchase(params: {
  packageName: string
  productId: string
  purchaseToken: string
}): Promise<PlayVerificationResult> {
  const { packageName, productId, purchaseToken } = params
  const isSubscription = isSubscriptionProduct(productId)

  if (process.env.PLAY_BILLING_MOCK === 'true') {
    if (purchaseToken.startsWith('mock_')) {
      const trial = purchaseToken.includes('trial')
      const expiresAt = isSubscription
        ? new Date(
            Date.now() + (trial ? 7 : 365) * 24 * 60 * 60 * 1000
          ).toISOString()
        : null
      apiLog('google-play', 'mock_accept', {
        productId,
        purchaseToken: maskToken(purchaseToken),
        trial,
        expiresAt,
      })
      return {
        valid: true,
        orderId: `mock-order-${purchaseToken.slice(0, 12)}`,
        productId,
        isSubscription,
        isTrial: trial,
        autoRenewing: isSubscription,
        paymentState: trial
          ? PlayPaymentState.FreeTrial
          : PlayPaymentState.Received,
        purchaseState: 0,
        acknowledgementState: 1,
        expiryTimeMillis: expiresAt ? String(Date.parse(expiresAt)) : undefined,
        expiresAt,
        raw: { mock: true, purchaseToken, trial },
      }
    }
  }

  apiLog('google-play', 'verify_start', {
    packageName,
    productId,
    purchaseToken: maskToken(purchaseToken),
    mode: isSubscription ? 'subscription' : 'product',
  })

  const token = await getAccessToken()

  try {
    if (isSubscription) {
      const url =
        `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/` +
        `${encodeURIComponent(packageName)}/purchases/subscriptions/` +
        `${encodeURIComponent(productId)}/tokens/${encodeURIComponent(purchaseToken)}`
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (!res.ok) {
        return {
          valid: false,
          productId,
          isSubscription: true,
          isTrial: false,
          autoRenewing: false,
          expiresAt: null,
          raw: data,
          error: data.error?.message || 'Subscription verification failed',
        }
      }

      const entitlement = isSubscriptionEntitled(data)
      const autoRenewing = data.autoRenewing === true

      apiLog('google-play', 'subscription_result', {
        productId,
        valid: entitlement.entitled,
        isTrial: entitlement.isTrial,
        paymentState: data.paymentState ?? null,
        autoRenewing,
        expiresAt: entitlement.expiresAt,
        cancelReason: data.cancelReason ?? null,
      })

      return {
        valid: entitlement.entitled,
        orderId: data.orderId || undefined,
        productId,
        isSubscription: true,
        isTrial: entitlement.isTrial,
        autoRenewing,
        paymentState: data.paymentState ?? undefined,
        acknowledgementState: data.acknowledgementState ?? undefined,
        expiryTimeMillis: data.expiryTimeMillis || undefined,
        expiresAt: entitlement.expiresAt,
        cancelReason: data.cancelReason ?? undefined,
        raw: data,
        error: entitlement.entitled ? undefined : 'Subscription is not active',
      }
    }

    const url =
      `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/` +
      `${encodeURIComponent(packageName)}/purchases/products/` +
      `${encodeURIComponent(productId)}/tokens/${encodeURIComponent(purchaseToken)}`
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    const data = await res.json()
    if (!res.ok) {
      return {
        valid: false,
        productId,
        isSubscription: false,
        isTrial: false,
        autoRenewing: false,
        expiresAt: null,
        raw: data,
        error: data.error?.message || 'Product verification failed',
      }
    }
    const valid = data.purchaseState === 0
    return {
      valid,
      orderId: data.orderId || undefined,
      productId,
      isSubscription: false,
      isTrial: false,
      autoRenewing: false,
      purchaseState: data.purchaseState ?? undefined,
      consumptionState: data.consumptionState ?? undefined,
      acknowledgementState: data.acknowledgementState ?? undefined,
      expiresAt: null,
      raw: data,
      error: valid ? undefined : 'Purchase is not valid',
    }
  } catch (e: any) {
    apiError('google-play', 'verify_exception', {
      productId,
      error: e?.message || String(e),
    })
    return {
      valid: false,
      productId,
      isSubscription,
      isTrial: false,
      autoRenewing: false,
      expiresAt: null,
      raw: { error: e?.message || String(e) },
      error: e?.message || 'Google Play verification failed',
    }
  }
}
