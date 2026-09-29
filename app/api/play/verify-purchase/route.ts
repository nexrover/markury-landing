import { NextRequest, NextResponse } from 'next/server'
import { notifyError } from '@/lib/bugsnag'
import {
  createPlayLicense,
  productIdToPlan,
  resolveDiscountCode,
  toApiLicenseKey,
  toApiMeta,
} from '@/app/api/_lib/license-store'
import {
  isKnownPlayProduct,
  verifyGooglePlayPurchase,
} from '@/app/api/_lib/google-play'
import {
  apiError,
  apiLog,
  apiWarn,
  maskLicenseKey,
  maskToken,
} from '@/app/api/_lib/api-log'

const SCOPE = 'play/verify-purchase'

export async function POST(request: NextRequest) {
  const started = Date.now()
  try {
    const body = await request.json()
    const purchaseToken =
      typeof body?.purchaseToken === 'string' ? body.purchaseToken : ''
    const productId = typeof body?.productId === 'string' ? body.productId : ''
    const packageName =
      typeof body?.packageName === 'string'
        ? body.packageName
        : process.env.PLAY_PACKAGE_NAME || 'com.nexrover.markury'
    const discountCode =
      typeof body?.discountCode === 'string' ? body.discountCode.trim() : ''

    apiLog(SCOPE, 'request', {
      productId,
      packageName,
      purchaseToken: maskToken(purchaseToken),
      discountCode: discountCode || null,
    })

    if (!purchaseToken || !productId) {
      apiWarn(SCOPE, 'missing_fields')
      return NextResponse.json(
        { success: false, error: 'purchaseToken and productId are required' },
        { status: 400 }
      )
    }

    if (!isKnownPlayProduct(productId)) {
      apiWarn(SCOPE, 'unknown_product', { productId })
      return NextResponse.json(
        { success: false, error: 'Unknown product' },
        { status: 400 }
      )
    }

    let discountCodeId: string | null = null
    let plan = productIdToPlan(productId)

    if (discountCode) {
      const resolved = await resolveDiscountCode(discountCode)
      if (!resolved.ok) {
        apiWarn(SCOPE, 'discount_rejected', { error: resolved.error })
        return NextResponse.json(
          { success: false, error: resolved.error },
          { status: 400 }
        )
      }
      if (resolved.discount.play_product_id !== productId) {
        apiWarn(SCOPE, 'discount_product_mismatch', {
          expected: resolved.discount.play_product_id,
          got: productId,
        })
        return NextResponse.json(
          {
            success: false,
            error: 'Discount code does not match purchased product',
          },
          { status: 400 }
        )
      }
      discountCodeId = resolved.discount.id
      plan = resolved.discount.plan
      apiLog(SCOPE, 'discount_applied', { plan, discountCodeId })
    }

    const verification = await verifyGooglePlayPurchase({
      packageName,
      productId,
      purchaseToken,
    })

    apiLog(SCOPE, 'google_verify_result', {
      valid: verification.valid,
      orderId: verification.orderId || null,
      error: verification.error || null,
    })

    if (!verification.valid) {
      apiWarn(SCOPE, 'google_verify_failed', {
        error: verification.error,
        ms: Date.now() - started,
      })
      return NextResponse.json(
        {
          success: false,
          error: verification.error || 'Purchase verification failed',
        },
        { status: 400 }
      )
    }

    const { license, created } = await createPlayLicense({
      plan,
      productId,
      purchaseToken,
      orderId: verification.orderId || null,
      packageName,
      raw: verification.raw,
      discountCodeId,
    })

    apiLog(SCOPE, 'license_issued', {
      created,
      license_key: maskLicenseKey(license.key),
      plan: license.plan,
      ms: Date.now() - started,
    })

    return NextResponse.json({
      success: true,
      created,
      license_key: license.key,
      license: toApiLicenseKey(license),
      meta: toApiMeta(license),
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
