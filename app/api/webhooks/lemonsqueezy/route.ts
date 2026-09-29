import { NextRequest, NextResponse } from 'next/server'
import { notifyError } from '@/lib/bugsnag'
import {
  inferPlanFromMeta,
  upsertLicenseFromLemonWebhook,
  verifyLemonWebhookSignature,
} from '@/app/api/_lib/license-store'
import type { LicenseStatus } from '@/app/api/_lib/license-types'
import { apiError, apiLog, apiWarn, maskLicenseKey } from '@/app/api/_lib/api-log'

const SCOPE = 'webhooks/lemonsqueezy'

/**
 * Lemon Squeezy webhook: sync license status into Supabase.
 * Configure signing secret as LEMONSQUEEZY_WEBHOOK_SECRET.
 */
export async function POST(request: NextRequest) {
  const started = Date.now()
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-signature')

    apiLog(SCOPE, 'received', {
      bytes: rawBody.length,
      has_signature: !!signature,
    })

    if (!verifyLemonWebhookSignature(rawBody, signature)) {
      apiWarn(SCOPE, 'invalid_signature', { ms: Date.now() - started })
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(rawBody)
    const eventName: string = payload?.meta?.event_name || ''
    const attrs = payload?.data?.attributes || {}
    const metaCustom = payload?.meta?.custom_data || {}

    const key: string | undefined =
      attrs.key ||
      attrs.license_key ||
      payload?.data?.attributes?.license_key?.key ||
      metaCustom.license_key

    apiLog(SCOPE, 'parsed', {
      event: eventName,
      license_key: maskLicenseKey(key),
      attr_status: attrs.status || null,
    })

    if (!key) {
      apiLog(SCOPE, 'skipped_no_license_key', {
        event: eventName,
        ms: Date.now() - started,
      })
      return NextResponse.json({ ok: true, skipped: true })
    }

    let status: LicenseStatus = 'active'
    if (
      eventName.includes('expired') ||
      attrs.status === 'expired' ||
      attrs.status === 'EXPIRED'
    ) {
      status = 'expired'
    } else if (
      eventName.includes('cancelled') ||
      eventName.includes('refunded') ||
      attrs.status === 'disabled' ||
      attrs.status === 'inactive'
    ) {
      status = eventName.includes('refunded') ? 'cancelled' : 'disabled'
    } else if (attrs.status === 'active') {
      status = 'active'
    }

    const productName =
      attrs.product_name ||
      payload?.data?.attributes?.first_order_item?.product_name ||
      'Markury Pro'
    const variantName =
      attrs.variant_name ||
      payload?.data?.attributes?.first_order_item?.variant_name ||
      null

    await upsertLicenseFromLemonWebhook({
      key,
      status,
      plan: inferPlanFromMeta({
        store_id: 0,
        order_id: Number(attrs.order_id) || 0,
        order_item_id: 0,
        product_id: Number(attrs.product_id) || 0,
        product_name: productName,
        variant_id: Number(attrs.variant_id) || 0,
        variant_name: variantName || '',
        customer_id: 0,
        customer_name: attrs.user_name || attrs.customer_name || '',
        customer_email: attrs.user_email || attrs.customer_email || '',
      }),
      activation_limit: attrs.activation_limit ?? 2,
      activation_usage: attrs.activation_usage ?? 0,
      expires_at: attrs.expires_at ?? null,
      customer_email: attrs.user_email || attrs.customer_email || null,
      customer_name: attrs.user_name || attrs.customer_name || null,
      product_name: productName,
      variant_name: variantName,
      lemon_license_id: payload?.data?.id ? String(payload.data.id) : null,
      lemon_order_id: attrs.order_id ? String(attrs.order_id) : null,
      lemon_numeric_id:
        typeof attrs.id === 'number'
          ? attrs.id
          : Number(payload?.data?.id) || null,
    })

    apiLog(SCOPE, 'synced', {
      event: eventName,
      status,
      license_key: maskLicenseKey(key),
      ms: Date.now() - started,
    })

    return NextResponse.json({ ok: true })
  } catch (error: any) {
    apiError(SCOPE, 'unhandled_error', {
      error: error?.message || String(error),
      ms: Date.now() - started,
    })
    await notifyError(error, request)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
