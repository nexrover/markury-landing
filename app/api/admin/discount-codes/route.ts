import { NextRequest, NextResponse } from 'next/server'
import { notifyError } from '@/lib/bugsnag'
import { getSupabaseAdmin } from '@/app/api/_lib/supabase-admin'
import { PLAY_PRODUCTS } from '@/app/api/_lib/license-types'
import { apiError, apiLog, apiWarn } from '@/app/api/_lib/api-log'

const SCOPE = 'admin/discount-codes'

/**
 * Create a dynamic Play discount code for a special user.
 * Protected by ADMIN_API_SECRET header: x-admin-secret
 */
export async function POST(request: NextRequest) {
  const started = Date.now()
  try {
    const adminSecret = process.env.ADMIN_API_SECRET
    if (!adminSecret || request.headers.get('x-admin-secret') !== adminSecret) {
      apiWarn(SCOPE, 'unauthorized')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const code = String(body?.code || '')
      .trim()
      .toUpperCase()
    const plan = body?.plan === 'pro_yearly' ? 'pro_yearly' : 'pro_lifetime'
    const maxRedemptions =
      body?.max_redemptions != null ? Number(body.max_redemptions) : 1
    const expiresAt = body?.expires_at || null
    const notes = body?.notes || null
    const playProductId =
      body?.play_product_id ||
      (plan === 'pro_yearly'
        ? PLAY_PRODUCTS.yearlyDiscounted
        : PLAY_PRODUCTS.lifetimeDiscounted)
    const playOfferId = body?.play_offer_id || null

    apiLog(SCOPE, 'request', {
      code: code || null,
      plan,
      playProductId,
      maxRedemptions,
    })

    if (!code || code.length < 4) {
      apiWarn(SCOPE, 'invalid_code')
      return NextResponse.json(
        { error: 'code must be at least 4 characters' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('discount_codes')
      .upsert(
        {
          code,
          play_product_id: playProductId,
          play_offer_id: playOfferId,
          plan,
          max_redemptions: maxRedemptions,
          expires_at: expiresAt,
          notes,
          active: true,
        },
        { onConflict: 'code' }
      )
      .select('*')
      .single()

    if (error) throw error

    apiLog(SCOPE, 'upsert_ok', {
      code: data.code,
      id: data.id,
      ms: Date.now() - started,
    })

    return NextResponse.json({ success: true, discount: data })
  } catch (error: any) {
    apiError(SCOPE, 'unhandled_error', {
      error: error?.message || String(error),
      ms: Date.now() - started,
    })
    await notifyError(error, request)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
