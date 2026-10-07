import { randomBytes, createHmac, timingSafeEqual } from 'crypto'
import { getSupabaseAdmin } from './supabase-admin'
import type {
  DbDiscountCode,
  DbLicense,
  DbLicenseInstance,
  LicensePlan,
  LicensePlatform,
  LicenseStatus,
} from './license-types'
import type {
  ActivateLicenseResponse,
  DeactivateLicenseResponse,
  LicenseKey,
  LicenseKeyMeta,
  LicenseInstance,
  ValidateLicenseResponse,
} from '@/types/lemon-squeezy'
import { apiError, apiLog, apiWarn, maskLicenseKey } from './api-log'

export function sanitizeInstanceName(raw?: string): string {
  const trimmed = raw && typeof raw === 'string' ? raw.trim() : ''
  if (!trimmed) return 'Desktop'
  if (trimmed.length < 3) return `Desktop ${trimmed}`
  return trimmed.slice(0, 20)
}

export function detectPlatform(instanceName: string): LicensePlatform {
  const n = instanceName.toLowerCase()
  if (n.includes('android') || n.startsWith('and-') || n.includes('pixel')) {
    return 'android'
  }
  if (n.includes('mac') || n.includes('darwin')) return 'macos'
  if (n.includes('win')) return 'windows'
  if (n.includes('linux')) return 'linux'
  return 'other'
}

export function isInternalKey(key: string): boolean {
  return key.toUpperCase().startsWith('MKY-')
}

export function generateMarkuryKey(): string {
  const bytes = randomBytes(12)
  const hex = bytes.toString('hex').toUpperCase()
  const parts = hex.match(/.{1,4}/g) || [hex]
  return `MKY-${parts.join('-')}`
}

export function planToMeta(plan: LicensePlan, productName?: string | null) {
  const isYearly = plan === 'pro_yearly'
  const isBasic = plan === 'basic'
  return {
    product_name: productName || (isBasic ? 'Markury Basic' : 'Markury Pro'),
    variant_name: isBasic
      ? 'Basic'
      : isYearly
        ? 'Pro Yearly'
        : 'Pro Lifetime',
  }
}

function numericIdFromUuid(id: string): number {
  // Stable positive int for clients that parse license_key.id as int
  let hash = 0
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0
  }
  return hash || 1
}

export function toApiLicenseKey(license: DbLicense): LicenseKey {
  return {
    id: license.lemon_numeric_id || numericIdFromUuid(license.id),
    status:
      license.status === 'cancelled' || license.status === 'disabled'
        ? 'disabled'
        : license.status === 'expired'
          ? 'expired'
          : license.status === 'inactive'
            ? 'inactive'
            : 'active',
    key: license.key,
    activation_limit: license.activation_limit,
    activation_usage: license.activation_usage,
    created_at: license.created_at,
    expires_at: license.expires_at,
  }
}

export function toApiMeta(license: DbLicense): LicenseKeyMeta {
  const names = planToMeta(license.plan, license.product_name)
  return {
    store_id: 0,
    order_id: 0,
    order_item_id: 0,
    product_id: 0,
    product_name: license.product_name || names.product_name,
    variant_id: 0,
    variant_name: license.variant_name || names.variant_name,
    customer_id: 0,
    customer_name: license.customer_name || '',
    customer_email: license.customer_email || '',
  }
}

export function toApiInstance(instance: DbLicenseInstance): LicenseInstance {
  return {
    id: instance.id,
    name: instance.name,
    created_at: instance.created_at,
  }
}

export function isLicenseCurrentlyValid(license: DbLicense): boolean {
  if (license.status !== 'active') return false
  if (!license.expires_at) return true
  return new Date(license.expires_at) > new Date()
}

export async function findLicenseByKey(
  key: string
): Promise<DbLicense | null> {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('licenses')
    .select('*')
    .eq('key', key.trim())
    .maybeSingle()
  if (error) throw error
  return data as DbLicense | null
}

export async function activateSupabaseLicense(
  license: DbLicense,
  instanceNameRaw?: string
): Promise<ActivateLicenseResponse | { activated: false; error: string }> {
  const supabase = getSupabaseAdmin()

  if (license.source === 'google_play') {
    try {
      license = await syncGooglePlayLicenseIfNeeded(license)
    } catch (e: any) {
      apiWarn('activate', 'play_sync_failed', { error: e?.message || String(e) })
      // Fall through with cached license state if Play is temporarily down.
    }
  }

  if (!isLicenseCurrentlyValid(license)) {
    return {
      activated: false,
      error:
        license.status === 'expired' ||
        (license.expires_at && new Date(license.expires_at) <= new Date())
          ? 'This license has expired.'
          : `This license is ${license.status}.`,
    }
  }

  const instanceName = sanitizeInstanceName(instanceNameRaw)
  const platform = detectPlatform(instanceName)

  // Reuse existing instance with same name if present
  const { data: existing, error: existingErr } = await supabase
    .from('license_instances')
    .select('*')
    .eq('license_id', license.id)
    .eq('name', instanceName)
    .maybeSingle()
  if (existingErr) throw existingErr

  if (existing) {
    return {
      activated: true,
      error: null,
      license_key: toApiLicenseKey(license),
      instance: toApiInstance(existing as DbLicenseInstance),
      meta: toApiMeta(license),
    }
  }

  if (license.activation_usage >= license.activation_limit) {
    return {
      activated: false,
      error: 'This license key has reached the activation limit',
    }
  }

  const { data: instance, error: insertErr } = await supabase
    .from('license_instances')
    .insert({
      license_id: license.id,
      name: instanceName,
      platform,
    })
    .select('*')
    .single()
  if (insertErr) throw insertErr

  const usage = license.activation_usage + 1
  const { data: updated, error: updErr } = await supabase
    .from('licenses')
    .update({
      activation_usage: usage,
      updated_at: new Date().toISOString(),
    })
    .eq('id', license.id)
    .select('*')
    .single()
  if (updErr) throw updErr

  const lic = (updated as DbLicense) || { ...license, activation_usage: usage }

  return {
    activated: true,
    error: null,
    license_key: toApiLicenseKey(lic),
    instance: toApiInstance(instance as DbLicenseInstance),
    meta: toApiMeta(lic),
  }
}

export async function verifySupabaseLicense(
  license: DbLicense,
  instanceId: string
): Promise<ValidateLicenseResponse> {
  const supabase = getSupabaseAdmin()

  if (license.source === 'google_play') {
    try {
      license = await syncGooglePlayLicenseIfNeeded(license)
    } catch (e: any) {
      apiWarn('verify', 'play_sync_failed', { error: e?.message || String(e) })
    }
  }

  // Refresh expiry status from stored expires_at
  if (
    license.status === 'active' &&
    license.expires_at &&
    new Date(license.expires_at) <= new Date()
  ) {
    await supabase
      .from('licenses')
      .update({ status: 'expired', updated_at: new Date().toISOString() })
      .eq('id', license.id)
    license = { ...license, status: 'expired' }
  }

  const { data: instance, error } = await supabase
    .from('license_instances')
    .select('*')
    .eq('license_id', license.id)
    .eq('id', instanceId)
    .maybeSingle()
  if (error) throw error

  const valid = isLicenseCurrentlyValid(license) && !!instance

  return {
    valid,
    error: valid
      ? null
      : !instance
        ? 'Instance not found for this license.'
        : `License is ${license.status}.`,
    license_key: toApiLicenseKey(license),
    instance: instance
      ? toApiInstance(instance as DbLicenseInstance)
      : null,
    meta: toApiMeta(license),
  }
}

export async function deactivateSupabaseLicense(
  license: DbLicense,
  instanceId: string
): Promise<DeactivateLicenseResponse | { deactivated: false; error: string }> {
  const supabase = getSupabaseAdmin()

  const { data: instance, error } = await supabase
    .from('license_instances')
    .select('*')
    .eq('license_id', license.id)
    .eq('id', instanceId)
    .maybeSingle()
  if (error) throw error

  if (!instance) {
    return { deactivated: false, error: 'Instance not found for this license.' }
  }

  const { error: delErr } = await supabase
    .from('license_instances')
    .delete()
    .eq('id', instanceId)
  if (delErr) throw delErr

  const usage = Math.max(0, license.activation_usage - 1)
  const { data: updated, error: updErr } = await supabase
    .from('licenses')
    .update({
      activation_usage: usage,
      updated_at: new Date().toISOString(),
    })
    .eq('id', license.id)
    .select('*')
    .single()
  if (updErr) throw updErr

  const lic = (updated as DbLicense) || { ...license, activation_usage: usage }

  return {
    deactivated: true,
    error: null,
    license_key: toApiLicenseKey(lic),
    meta: toApiMeta(lic),
  }
}

/** Mirror a successful Lemon Squeezy response into Supabase (best-effort). */
export async function mirrorLemonLicense(params: {
  key: string
  licenseKey: LicenseKey
  meta: LicenseKeyMeta
  instance?: LicenseInstance | null
  instanceName?: string
}): Promise<void> {
  try {
    const supabase = getSupabaseAdmin()
    const plan: LicensePlan = inferPlanFromMeta(params.meta)
    const status = mapLemonStatus(params.licenseKey.status)

    const row = {
      key: params.key,
      source: 'lemon_squeezy' as const,
      status,
      plan,
      activation_limit: params.licenseKey.activation_limit ?? 2,
      activation_usage: params.licenseKey.activation_usage ?? 0,
      customer_email: params.meta.customer_email || null,
      customer_name: params.meta.customer_name || null,
      product_name: params.meta.product_name || 'Markury Pro',
      variant_name: params.meta.variant_name || null,
      expires_at: params.licenseKey.expires_at,
      lemon_license_id: String(params.licenseKey.id),
      lemon_order_id: params.meta.order_id
        ? String(params.meta.order_id)
        : null,
      lemon_numeric_id: params.licenseKey.id,
      updated_at: new Date().toISOString(),
    }

    const { data: license, error } = await supabase
      .from('licenses')
      .upsert(row, { onConflict: 'key' })
      .select('*')
      .single()
    if (error) throw error

    if (params.instance?.id && license) {
      await supabase.from('license_instances').upsert(
        {
          id: params.instance.id,
          license_id: license.id,
          name: params.instance.name || sanitizeInstanceName(params.instanceName),
          platform: detectPlatform(
            params.instance.name || params.instanceName || ''
          ),
          created_at: params.instance.created_at || new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
    }
  } catch (e) {
    apiError('mirrorLemonLicense', 'failed', {
      license_key: maskLicenseKey(params.key),
      error: e instanceof Error ? e.message : String(e),
    })
  }
}

export function inferPlanFromMeta(meta: LicenseKeyMeta): LicensePlan {
  const blob = `${meta.product_name || ''} ${meta.variant_name || ''}`.toLowerCase()
  if (blob.includes('basic')) return 'basic'
  if (blob.includes('year') || blob.includes('annual') || blob.includes('sub')) {
    return 'pro_yearly'
  }
  return 'pro_lifetime'
}

function mapLemonStatus(status: string): LicenseStatus {
  switch (status) {
    case 'active':
      return 'active'
    case 'inactive':
      return 'inactive'
    case 'expired':
      return 'expired'
    case 'disabled':
      return 'disabled'
    default:
      return 'inactive'
  }
}

export async function upsertLicenseFromLemonWebhook(payload: {
  key: string
  status: LicenseStatus
  plan?: LicensePlan
  activation_limit?: number
  activation_usage?: number
  expires_at?: string | null
  customer_email?: string | null
  customer_name?: string | null
  product_name?: string | null
  variant_name?: string | null
  lemon_license_id?: string | null
  lemon_order_id?: string | null
  lemon_numeric_id?: number | null
}): Promise<void> {
  const supabase = getSupabaseAdmin()
  await supabase.from('licenses').upsert(
    {
      key: payload.key,
      source: 'lemon_squeezy',
      status: payload.status,
      plan: payload.plan || 'pro_lifetime',
      activation_limit: payload.activation_limit ?? 2,
      activation_usage: payload.activation_usage ?? 0,
      expires_at: payload.expires_at ?? null,
      customer_email: payload.customer_email ?? null,
      customer_name: payload.customer_name ?? null,
      product_name: payload.product_name ?? 'Markury Pro',
      variant_name: payload.variant_name ?? null,
      lemon_license_id: payload.lemon_license_id ?? null,
      lemon_order_id: payload.lemon_order_id ?? null,
      lemon_numeric_id: payload.lemon_numeric_id ?? null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'key' }
  )
}

export async function resolveDiscountCode(
  codeRaw: string
): Promise<
  | { ok: true; discount: DbDiscountCode }
  | { ok: false; error: string }
> {
  const code = codeRaw.trim().toUpperCase()
  if (!code) return { ok: false, error: 'Discount code is required' }

  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('discount_codes')
    .select('*')
    .eq('code', code)
    .maybeSingle()
  if (error) throw error
  if (!data) return { ok: false, error: 'Invalid discount code' }

  const discount = data as DbDiscountCode
  if (!discount.active) return { ok: false, error: 'This discount code is inactive' }
  if (discount.expires_at && new Date(discount.expires_at) <= new Date()) {
    return { ok: false, error: 'This discount code has expired' }
  }
  if (
    discount.max_redemptions != null &&
    discount.redemption_count >= discount.max_redemptions
  ) {
    return { ok: false, error: 'This discount code has been fully redeemed' }
  }

  return { ok: true, discount }
}

export async function createPlayLicense(params: {
  plan: LicensePlan
  customerEmail?: string | null
  productId: string
  purchaseToken: string
  orderId?: string | null
  packageName: string
  raw: unknown
  discountCodeId?: string | null
  /** ISO expiry from Google Play (subscriptions / trials). Null = lifetime. */
  expiresAt?: string | null
  isTrial?: boolean
  autoRenewing?: boolean
}): Promise<{ license: DbLicense; created: boolean }> {
  const supabase = getSupabaseAdmin()

  // Idempotent: existing purchase token — refresh entitlement from latest verify.
  const { data: existingPurchase, error: findErr } = await supabase
    .from('play_purchases')
    .select('*, licenses(*)')
    .eq('purchase_token', params.purchaseToken)
    .maybeSingle()
  if (findErr) throw findErr

  if (existingPurchase?.licenses) {
    let license = existingPurchase.licenses as unknown as DbLicense
    license = await applyPlayEntitlementToLicense(license, {
      expiresAt: params.expiresAt ?? null,
      isTrial: params.isTrial === true,
      autoRenewing: params.autoRenewing === true,
      raw: params.raw,
      orderId: params.orderId || null,
      purchaseToken: params.purchaseToken,
      productId: params.productId,
      packageName: params.packageName,
    })
    return { license, created: false }
  }

  const key = generateMarkuryKey()
  const names = planToMeta(params.plan)
  const isYearly = params.plan === 'pro_yearly'
  const expiresAt = isYearly
    ? params.expiresAt ??
      // Conservative fallback if Play omitted expiry (should be rare).
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    : null

  if (isYearly && !params.expiresAt) {
    apiWarn('play-license', 'missing_play_expiry_fallback_7d', {
      productId: params.productId,
    })
  }

  const variantName = params.isTrial
    ? `${names.variant_name} Trial`
    : names.variant_name

  const { data: license, error: licErr } = await supabase
    .from('licenses')
    .insert({
      key,
      source: 'google_play',
      status: 'active',
      plan: params.plan,
      activation_limit: 2,
      activation_usage: 0,
      customer_email: params.customerEmail || null,
      product_name: names.product_name,
      variant_name: variantName,
      expires_at: expiresAt,
    })
    .select('*')
    .single()
  if (licErr) throw licErr

  const { data: purchase, error: purErr } = await supabase
    .from('play_purchases')
    .insert({
      purchase_token: params.purchaseToken,
      order_id: params.orderId || null,
      product_id: params.productId,
      package_name: params.packageName,
      license_id: license.id,
      raw: {
        ...(typeof params.raw === 'object' && params.raw ? params.raw : { value: params.raw }),
        _markury: {
          is_trial: params.isTrial === true,
          auto_renewing: params.autoRenewing === true,
          expires_at: expiresAt,
          synced_at: new Date().toISOString(),
        },
      },
    })
    .select('*')
    .single()
  if (purErr) throw purErr

  if (params.discountCodeId) {
    await supabase.from('discount_redemptions').insert({
      code_id: params.discountCodeId,
      license_id: license.id,
      play_purchase_id: purchase.id,
    })
    const { data: codeRow } = await supabase
      .from('discount_codes')
      .select('redemption_count')
      .eq('id', params.discountCodeId)
      .single()
    if (codeRow) {
      await supabase
        .from('discount_codes')
        .update({ redemption_count: (codeRow.redemption_count || 0) + 1 })
        .eq('id', params.discountCodeId)
    }
  }

  apiLog('play-license', 'created', {
    plan: params.plan,
    isTrial: params.isTrial === true,
    expiresAt,
    key: maskLicenseKey(key),
  })

  return { license: license as DbLicense, created: true }
}

/**
 * Apply a verified Play entitlement onto an existing license row.
 */
export async function applyPlayEntitlementToLicense(
  license: DbLicense,
  entitlement: {
    expiresAt: string | null
    isTrial: boolean
    autoRenewing: boolean
    raw: unknown
    orderId?: string | null
    purchaseToken: string
    productId: string
    packageName: string
    forceStatus?: LicenseStatus
  }
): Promise<DbLicense> {
  const supabase = getSupabaseAdmin()
  const now = Date.now()
  let status: LicenseStatus = license.status

  if (entitlement.forceStatus) {
    status = entitlement.forceStatus
  } else if (license.plan === 'pro_lifetime') {
    status = 'active'
  } else if (entitlement.expiresAt) {
    const exp = Date.parse(entitlement.expiresAt)
    status = Number.isFinite(exp) && exp > now ? 'active' : 'expired'
  } else {
    // Yearly without expiry from Play → treat as expired for safety.
    status = license.plan === 'pro_yearly' ? 'expired' : license.status
  }

  const variantBase = planToMeta(license.plan).variant_name
  const variantName = entitlement.isTrial
    ? `${variantBase} Trial`
    : variantBase

  const { data: updated, error } = await supabase
    .from('licenses')
    .update({
      status,
      expires_at: license.plan === 'pro_lifetime' ? null : entitlement.expiresAt,
      variant_name: variantName,
      updated_at: new Date().toISOString(),
    })
    .eq('id', license.id)
    .select('*')
    .single()
  if (error) throw error

  await supabase
    .from('play_purchases')
    .update({
      ...(entitlement.orderId ? { order_id: entitlement.orderId } : {}),
      raw: {
        ...(typeof entitlement.raw === 'object' && entitlement.raw
          ? (entitlement.raw as object)
          : { value: entitlement.raw }),
        _markury: {
          is_trial: entitlement.isTrial,
          auto_renewing: entitlement.autoRenewing,
          expires_at: entitlement.expiresAt,
          synced_at: new Date().toISOString(),
        },
      },
    })
    .eq('purchase_token', entitlement.purchaseToken)

  return (updated as DbLicense) || {
    ...license,
    status,
    expires_at: entitlement.expiresAt,
    variant_name: variantName,
  }
}

const PLAY_SYNC_MIN_INTERVAL_MS = 5 * 60 * 1000 // avoid hammering Play on every verify

/**
 * Re-check Google Play for a google_play yearly license and refresh expires_at/status.
 * Lifetime licenses are left unchanged (no subscription to poll).
 */
export async function syncGooglePlayLicenseIfNeeded(
  license: DbLicense,
  opts?: { force?: boolean }
): Promise<DbLicense> {
  if (license.source !== 'google_play') return license
  if (license.plan === 'pro_lifetime' || license.plan === 'basic') return license

  const supabase = getSupabaseAdmin()
  const { data: purchase, error } = await supabase
    .from('play_purchases')
    .select('*')
    .eq('license_id', license.id)
    .limit(1)
    .maybeSingle()
  if (error) throw error
  if (!purchase) {
    apiWarn('play-sync', 'no_purchase_row', { licenseId: license.id })
    return license
  }

  const raw = purchase.raw as { _markury?: { synced_at?: string } } | null
  const lastSync = raw?._markury?.synced_at
    ? Date.parse(raw._markury.synced_at)
    : 0
  if (
    !opts?.force &&
    lastSync &&
    Date.now() - lastSync < PLAY_SYNC_MIN_INTERVAL_MS
  ) {
    // Still apply local expiry check.
    if (
      license.status === 'active' &&
      license.expires_at &&
      Date.parse(license.expires_at) <= Date.now()
    ) {
      const { data: expired } = await supabase
        .from('licenses')
        .update({ status: 'expired', updated_at: new Date().toISOString() })
        .eq('id', license.id)
        .select('*')
        .single()
      return (expired as DbLicense) || { ...license, status: 'expired' }
    }
    return license
  }

  const { verifyGooglePlayPurchase } = await import('./google-play')
  const verification = await verifyGooglePlayPurchase({
    packageName: purchase.package_name,
    productId: purchase.product_id,
    purchaseToken: purchase.purchase_token,
  })

  if (!verification.valid) {
    const { PlayPaymentState } = await import('./google-play')
    const graceAccess =
      !!verification.expiresAt &&
      Date.parse(verification.expiresAt) > Date.now() &&
      verification.paymentState !== PlayPaymentState.Pending &&
      verification.paymentState !== PlayPaymentState.PendingDeferred

    return applyPlayEntitlementToLicense(license, {
      expiresAt: verification.expiresAt,
      isTrial: verification.isTrial,
      autoRenewing: verification.autoRenewing,
      raw: verification.raw,
      orderId: verification.orderId || purchase.order_id,
      purchaseToken: purchase.purchase_token,
      productId: purchase.product_id,
      packageName: purchase.package_name,
      forceStatus: graceAccess
        ? 'active'
        : verification.cancelReason != null
          ? 'cancelled'
          : 'expired',
    })
  }

  return applyPlayEntitlementToLicense(license, {
    expiresAt: verification.expiresAt,
    isTrial: verification.isTrial,
    autoRenewing: verification.autoRenewing,
    raw: verification.raw,
    orderId: verification.orderId || purchase.order_id,
    purchaseToken: purchase.purchase_token,
    productId: purchase.product_id,
    packageName: purchase.package_name,
  })
}

/**
 * Sync by purchase token (used by RTDN webhook).
 */
export async function syncGooglePlayByPurchaseToken(
  purchaseToken: string,
  productIdHint?: string
): Promise<DbLicense | null> {
  const supabase = getSupabaseAdmin()
  const { data: purchase, error } = await supabase
    .from('play_purchases')
    .select('*, licenses(*)')
    .eq('purchase_token', purchaseToken)
    .maybeSingle()
  if (error) throw error
  if (!purchase?.licenses) {
    apiWarn('play-sync', 'rtdn_unknown_token', {
      token: purchaseToken.slice(0, 8) + '…',
      productIdHint: productIdHint || null,
    })
    return null
  }

  const license = purchase.licenses as unknown as DbLicense
  return syncGooglePlayLicenseIfNeeded(license, { force: true })
}

export function verifyLemonWebhookSignature(
  rawBody: string,
  signatureHeader: string | null
): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
  if (!secret) {
    apiWarn('ls-webhook', 'LEMONSQUEEZY_WEBHOOK_SECRET not set')
    return false
  }
  if (!signatureHeader) return false

  const digest = createHmac('sha256', secret).update(rawBody).digest('hex')
  try {
    const a = Buffer.from(digest, 'utf8')
    const b = Buffer.from(signatureHeader, 'utf8')
    if (a.length !== b.length) return false
    return timingSafeEqual(a, b)
  } catch {
    return false
  }
}

export function productIdToPlan(productId: string): LicensePlan {
  const id = productId.toLowerCase()
  if (id.includes('year')) return 'pro_yearly'
  if (id.includes('life')) return 'pro_lifetime'
  // Default lifetime for unknown one-time SKUs
  return 'pro_lifetime'
}
