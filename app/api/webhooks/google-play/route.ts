import { NextRequest, NextResponse } from 'next/server'
import { notifyError } from '@/lib/bugsnag'
import { syncGooglePlayByPurchaseToken } from '@/app/api/_lib/license-store'
import { apiError, apiLog, apiWarn, maskToken } from '@/app/api/_lib/api-log'

const SCOPE = 'webhooks/google-play'

/**
 * Google Play Real-time Developer Notifications (Pub/Sub push).
 *
 * Configure in Play Console → Monetization setup → Real-time developer notifications
 * pointing a Cloud Pub/Sub topic whose push subscription hits:
 *   POST https://www.markury.app/api/webhooks/google-play
 *
 * Optional shared secret (recommended):
 *   Authorization: Bearer $GOOGLE_PLAY_RTDN_SECRET
 * or ?token=$GOOGLE_PLAY_RTDN_SECRET
 */
export async function POST(request: NextRequest) {
  const started = Date.now()
  try {
    const secret = process.env.GOOGLE_PLAY_RTDN_SECRET
    console.log('secret', secret)
    if (secret) {
      const auth = request.headers.get('authorization') || ''
      const bearer = auth.startsWith('Bearer ') ? auth.slice(7) : ''
      const queryToken = request.nextUrl.searchParams.get('token') || ''
      if (bearer !== secret && queryToken !== secret) {
        apiWarn(SCOPE, 'unauthorized')
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    const body = await request.json()
    // Pub/Sub push wrapper: { message: { data: base64, messageId, publishTime }, subscription }
    const encoded = body?.message?.data
    if (!encoded || typeof encoded !== 'string') {
      apiWarn(SCOPE, 'missing_pubsub_data')
      // Ack to avoid infinite retries on malformed probes
      return NextResponse.json({ ok: true, ignored: true })
    }

    let notification: any
    try {
      notification = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'))
    } catch {
      apiWarn(SCOPE, 'invalid_base64_json')
      return NextResponse.json({ ok: true, ignored: true })
    }

    const packageName = notification?.packageName
    const expected =
      process.env.PLAY_PACKAGE_NAME || 'com.nexrover.markury'
    if (packageName && packageName !== expected) {
      apiWarn(SCOPE, 'package_mismatch', { packageName, expected })
      return NextResponse.json({ ok: true, ignored: true })
    }

    const sub = notification?.subscriptionNotification
    const oneTime = notification?.oneTimeProductNotification
    const purchaseToken: string | undefined =
      sub?.purchaseToken || oneTime?.purchaseToken
    const productId: string | undefined =
      sub?.subscriptionId || oneTime?.sku

    apiLog(SCOPE, 'notification', {
      type: sub
        ? `subscription:${sub.notificationType}`
        : oneTime
          ? `oneTime:${oneTime.notificationType}`
          : notification?.testNotification
            ? 'test'
            : 'unknown',
      productId: productId || null,
      purchaseToken: purchaseToken ? maskToken(purchaseToken) : null,
    })

    if (notification?.testNotification) {
      return NextResponse.json({ ok: true, test: true })
    }

    if (!purchaseToken) {
      return NextResponse.json({ ok: true, ignored: true })
    }

    const license = await syncGooglePlayByPurchaseToken(
      purchaseToken,
      productId
    )

    apiLog(SCOPE, 'synced', {
      found: !!license,
      status: license?.status || null,
      expiresAt: license?.expires_at || null,
      ms: Date.now() - started,
    })

    return NextResponse.json({
      ok: true,
      synced: !!license,
      status: license?.status || null,
    })
  } catch (error: any) {
    apiError(SCOPE, 'unhandled_error', {
      error: error?.message || String(error),
      ms: Date.now() - started,
    })
    await notifyError(error, request)
    // Return 500 so Pub/Sub retries transient failures
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
