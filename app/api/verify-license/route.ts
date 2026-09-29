import { NextRequest, NextResponse } from 'next/server'
import type { ValidateLicenseRequest } from '@/types/lemon-squeezy'
import { notifyError } from '@/lib/bugsnag'
import {
  findLicenseByKey,
  isInternalKey,
  mirrorLemonLicense,
  verifySupabaseLicense,
} from '@/app/api/_lib/license-store'
import { apiError, apiLog, apiWarn, maskLicenseKey } from '@/app/api/_lib/api-log'

const SCOPE = 'verify-license'
const LEMON_SQUEEZY_LICENSE_API =
  'https://api.lemonsqueezy.com/v1/licenses/validate'

export async function POST(request: NextRequest) {
  const started = Date.now()
  try {
    const body: ValidateLicenseRequest = await request.json()
    const { license_key, instance_id } = body

    apiLog(SCOPE, 'request', {
      license_key: maskLicenseKey(license_key),
      instance_id: instance_id || null,
    })

    if (!license_key) {
      apiWarn(SCOPE, 'missing_license_key')
      return NextResponse.json(
        { error: 'license_key is required' },
        { status: 400 }
      )
    }

    if (!instance_id) {
      apiWarn(SCOPE, 'missing_instance_id')
      return NextResponse.json(
        { error: 'instance_id is required' },
        { status: 400 }
      )
    }

    const dbLicense = await findLicenseByKey(license_key).catch((err) => {
      apiWarn(SCOPE, 'supabase_lookup_failed', { error: String(err?.message || err) })
      return null
    })

    if (dbLicense && (dbLicense.source === 'google_play' || isInternalKey(license_key))) {
      apiLog(SCOPE, 'path_supabase', {
        source: dbLicense.source,
        status: dbLicense.status,
      })
      const result = await verifySupabaseLicense(dbLicense, instance_id)
      apiLog(SCOPE, result.valid ? 'supabase_verify_ok' : 'supabase_verify_rejected', {
        valid: result.valid,
        error: result.error,
        ms: Date.now() - started,
      })
      return NextResponse.json(result, {
        status: result.valid ? 200 : 400,
      })
    }

    if (dbLicense && dbLicense.source === 'lemon_squeezy') {
      if (
        dbLicense.status === 'cancelled' ||
        dbLicense.status === 'disabled' ||
        dbLicense.status === 'expired'
      ) {
        apiWarn(SCOPE, 'mirror_status_reject', {
          status: dbLicense.status,
          ms: Date.now() - started,
        })
        return NextResponse.json(
          {
            valid: false,
            error: `License is ${dbLicense.status}.`,
            license_key: license_key,
          },
          { status: 400 }
        )
      }
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
      valid: data.valid,
      error: data?.error || null,
    })

    if (!response.ok) {
      const errorMessage =
        data?.error || data?.message || 'License validation failed'
      apiWarn(SCOPE, 'verify_failed', {
        error: errorMessage,
        ms: Date.now() - started,
      })
      await notifyError(new Error(errorMessage), request, {
        lemon_squeezy: data,
      })
      return NextResponse.json(
        {
          valid: false,
          error: errorMessage,
          license_key: data.license_key,
        },
        { status: response.status >= 400 ? response.status : 400 }
      )
    }

    if (data.valid && data.license_key && data.meta) {
      await mirrorLemonLicense({
        key: license_key,
        licenseKey: data.license_key,
        meta: data.meta,
        instance: data.instance,
      })
    }

    apiLog(SCOPE, data.valid ? 'lemon_verify_ok' : 'lemon_verify_invalid', {
      valid: data.valid,
      ms: Date.now() - started,
    })

    return NextResponse.json({
      valid: data.valid,
      error: data.error,
      license_key: data.license_key,
      instance: data.instance,
      meta: data.meta,
    })
  } catch (error: any) {
    apiError(SCOPE, 'unhandled_error', {
      error: error?.message || String(error),
      ms: Date.now() - started,
    })
    await notifyError(error, request)
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
