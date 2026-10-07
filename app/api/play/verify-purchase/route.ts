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
import { sendPlayPurchaseReceipt } from '@/app/api/_lib/resend-receipt'

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
    const customerEmailRaw =
      typeof body?.customerEmail === 'string' ? body.customerEmail.trim() : ''
    const customerEmail =
      customerEmailRaw && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmailRaw)
        ? customerEmailRaw.toLowerCase()
        : null

    apiLog(SCOPE, 'request', {
      productId,
      packageName,
      purchaseToken: maskToken(purchaseToken),
      discountCode: discountCode || null,
      customerEmail: customerEmail ? customerEmail.replace(/(.{2}).+(@.+)/, '$1***$2') : null,
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
      expiresAt: verification.expiresAt,
      isTrial: verification.isTrial,
      autoRenewing: verification.autoRenewing,
      customerEmail,
    })

    apiLog(SCOPE, 'license_issued', {
      created,
      license_key: maskLicenseKey(license.key),
      plan: license.plan,
      isTrial: verification.isTrial,
      expiresAt: license.expires_at,
      ms: Date.now() - started,
    })

    if (created && customerEmail) {
      const receipt = await sendPlayPurchaseReceipt({
        license,
        customerEmail,
        orderId: verification.orderId || null,
        productId,
        isTrial: verification.isTrial,
        created,
      })
      apiLog(SCOPE, 'receipt_email', {
        sent: receipt.sent,
        error: receipt.error || null,
      })
    }

    return NextResponse.json({
      success: true,
      created,
      license_key: license.key,
      is_trial: verification.isTrial,
      expires_at: license.expires_at,
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
