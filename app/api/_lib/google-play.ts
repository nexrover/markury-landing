import { createSign } from 'crypto'
import { PLAY_PRODUCTS } from './license-types'
import { apiError, apiLog, apiWarn, maskToken } from './api-log'

export interface PlayVerificationResult {
  valid: boolean
  orderId?: string
  productId: string
  purchaseState?: number
  consumptionState?: number
  acknowledgementState?: number
  expiryTimeMillis?: string
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

function isSubscriptionLike(productId: string): boolean {
  const id = productId.toLowerCase()
  return id.includes('year') || id.includes('sub')
}

/**
 * Verifies a Google Play purchase token.
 * Tries subscription API for yearly SKUs, then one-time products.
 * When PLAY_BILLING_MOCK=true, accepts tokens prefixed with mock_ for local testing.
 */
export async function verifyGooglePlayPurchase(params: {
  packageName: string
  productId: string
  purchaseToken: string
}): Promise<PlayVerificationResult> {
  const { packageName, productId, purchaseToken } = params

  if (process.env.PLAY_BILLING_MOCK === 'true') {
    if (purchaseToken.startsWith('mock_')) {
      apiLog('google-play', 'mock_accept', {
        productId,
        purchaseToken: maskToken(purchaseToken),
      })
      return {
        valid: true,
        orderId: `mock-order-${purchaseToken.slice(0, 12)}`,
        productId,
        purchaseState: 0,
        acknowledgementState: 1,
        raw: { mock: true, purchaseToken },
      }
    }
  }

  apiLog('google-play', 'verify_start', {
    packageName,
    productId,
    purchaseToken: maskToken(purchaseToken),
    mode: isSubscriptionLike(productId) ? 'subscription' : 'product',
  })

  const token = await getAccessToken()
  const isSubscription = isSubscriptionLike(productId)

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
          raw: data,
          error: data.error?.message || 'Subscription verification failed',
        }
      }
      const expiry = data.expiryTimeMillis
        ? Number(data.expiryTimeMillis)
        : undefined
      const valid =
        data.paymentState === 1 ||
        data.paymentState === 2 ||
        (expiry != null && expiry > Date.now())

      return {
        valid: !!valid,
        orderId: data.orderId || undefined,
        productId,
        expiryTimeMillis: data.expiryTimeMillis || undefined,
        raw: data,
        error: valid ? undefined : 'Subscription is not active',
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
        raw: data,
        error: data.error?.message || 'Product verification failed',
      }
    }
    const valid = data.purchaseState === 0
    return {
      valid,
      orderId: data.orderId || undefined,
      productId,
      purchaseState: data.purchaseState ?? undefined,
      consumptionState: data.consumptionState ?? undefined,
      acknowledgementState: data.acknowledgementState ?? undefined,
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
      raw: { error: e?.message || String(e) },
      error: e?.message || 'Google Play verification failed',
    }
  }
}
