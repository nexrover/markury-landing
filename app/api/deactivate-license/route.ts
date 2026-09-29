import { NextRequest, NextResponse } from 'next/server'
import type { DeactivateLicenseRequest } from '@/types/lemon-squeezy'
import { notifyError } from '@/lib/bugsnag'
import {
  deactivateSupabaseLicense,
  findLicenseByKey,
  isInternalKey,
  mirrorLemonLicense,
} from '@/app/api/_lib/license-store'
import { apiError, apiLog, apiWarn, maskLicenseKey } from '@/app/api/_lib/api-log'

const SCOPE = 'deactivate-license'
const LEMON_SQUEEZY_LICENSE_API =
  'https://api.lemonsqueezy.com/v1/licenses/deactivate'

export async function POST(request: NextRequest) {
  const started = Date.now()
  try {
    const body: DeactivateLicenseRequest = await request.json()
    const { license_key, instance_id } = body

    apiLog(SCOPE, 'request', {
      license_key: maskLicenseKey(license_key),
      instance_id,
    })

    if (!license_key || !instance_id) {
      apiWarn(SCOPE, 'missing_fields')
      return NextResponse.json(
        { error: 'license_key and instance_id are required' },
        { status: 400 }
      )
    }

    const dbLicense = await findLicenseByKey(license_key).catch((err) => {
      apiWarn(SCOPE, 'supabase_lookup_failed', { error: String(err?.message || err) })
      return null
    })

    if (dbLicense && (dbLicense.source === 'google_play' || isInternalKey(license_key))) {
      apiLog(SCOPE, 'path_supabase', { source: dbLicense.source })
      const result = await deactivateSupabaseLicense(dbLicense, instance_id)
      if (!('deactivated' in result) || !result.deactivated) {
        apiWarn(SCOPE, 'supabase_deactivate_failed', {
          error: (result as any).error,
          ms: Date.now() - started,
        })
        return NextResponse.json(
          {
            success: false,
            error: (result as any).error || 'License deactivation failed',
            license_key: dbLicense.key,
          },
          { status: 400 }
        )
      }
      apiLog(SCOPE, 'supabase_deactivate_ok', { ms: Date.now() - started })
      return NextResponse.json({
        success: true,
        deactivated: result.deactivated,
        license_key: result.license_key,
        meta: result.meta,
      })
    }

    apiLog(SCOPE, 'path_lemon_squeezy')

    const formData = new URLSearchParams()
    formData.append('license_key', license_key)
    formData.append('instance_id', instance_id)

    const response = await fetch(LEMON_SQUEEZY_LICENSE_API, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    })

    const data = await response.json()
    apiLog(SCOPE, 'lemon_response', {
      http_status: response.status,
      deactivated: !!data.deactivated,
      error: data?.error || null,
    })

    if (!response.ok || !data.deactivated) {
      if (dbLicense) {
        apiLog(SCOPE, 'fallback_supabase_mirror')
        const sb = await deactivateSupabaseLicense(dbLicense, instance_id)
        if ('deactivated' in sb && sb.deactivated) {
          apiLog(SCOPE, 'mirror_deactivate_ok', { ms: Date.now() - started })
          return NextResponse.json({
            success: true,
            deactivated: sb.deactivated,
            license_key: sb.license_key,
            meta: sb.meta,
          })
        }
      }

      const errorMessage =
        data?.error || data?.message || 'License deactivation failed'
      apiWarn(SCOPE, 'deactivate_failed', {
        error: errorMessage,
        ms: Date.now() - started,
      })
      await notifyError(new Error(errorMessage), request, {
        lemon_squeezy: data,
      })
      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          license_key: data.license_key,
        },
        { status: response.status >= 400 ? response.status : 400 }
      )
    }

    if (data.license_key && data.meta) {
      await mirrorLemonLicense({
        key: license_key,
        licenseKey: data.license_key,
        meta: data.meta,
      })
      if (dbLicense) {
        await deactivateSupabaseLicense(dbLicense, instance_id).catch(() => null)
      }
    }

    apiLog(SCOPE, 'lemon_deactivate_ok', { ms: Date.now() - started })

    return NextResponse.json({
      success: true,
      deactivated: data.deactivated,
      license_key: data.license_key,
      meta: data.meta,
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
