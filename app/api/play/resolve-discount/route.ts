import { NextRequest, NextResponse } from 'next/server'
import { notifyError } from '@/lib/bugsnag'
import { resolveDiscountCode } from '@/app/api/_lib/license-store'
import { apiError, apiLog, apiWarn } from '@/app/api/_lib/api-log'

const SCOPE = 'play/resolve-discount'

export async function POST(request: NextRequest) {
  const started = Date.now()
  try {
    const body = await request.json()
    const code = typeof body?.code === 'string' ? body.code : ''

    apiLog(SCOPE, 'request', { code: code ? code.toUpperCase() : null })

    const result = await resolveDiscountCode(code)
    if (!result.ok) {
      apiWarn(SCOPE, 'rejected', {
        error: result.error,
        ms: Date.now() - started,
      })
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    const { discount } = result
    apiLog(SCOPE, 'ok', {
      code: discount.code,
      productId: discount.play_product_id,
      offerId: discount.play_offer_id,
      plan: discount.plan,
      ms: Date.now() - started,
    })

    return NextResponse.json({
      success: true,
      code: discount.code,
      productId: discount.play_product_id,
      offerId: discount.play_offer_id,
      plan: discount.plan,
      label:
        discount.plan === 'pro_yearly'
          ? 'Pro Yearly (discounted)'
          : 'Pro Lifetime (discounted)',
    })
  } catch (error: any) {
    apiError(SCOPE, 'unhandled_error', {
      error: error?.message || String(error),
      ms: Date.now() - started,
    })
    await notifyError(error, request)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
