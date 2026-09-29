import { NextRequest, NextResponse } from 'next/server'
import type { ActivateLicenseRequest } from '@/types/lemon-squeezy'
import { notifyError } from '@/lib/bugsnag'
import {
  activateSupabaseLicense,
  findLicenseByKey,
  isInternalKey,
  mirrorLemonLicense,
  sanitizeInstanceName,
} from '@/app/api/_lib/license-store'
import { apiError, apiLog, apiWarn, maskLicenseKey } from '@/app/api/_lib/api-log'

const SCOPE = 'activate-license'
const LEMON_SQUEEZY_LICENSE_API =
  'https://api.lemonsqueezy.com/v1/licenses/activate'

export async function POST(request: NextRequest) {
  const started = Date.now()
  try {
    const body: ActivateLicenseRequest = await request.json()
    const { license_key, instance_name } = body

    apiLog(SCOPE, 'request', {
      license_key: maskLicenseKey(license_key),
      instance_name: sanitizeInstanceName(instance_name),
    })

    if (!license_key) {
      apiWarn(SCOPE, 'missing_license_key')
      return NextResponse.json(
        { error: 'License key is required' },
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
        plan: dbLicense.plan,
        usage: `${dbLicense.activation_usage}/${dbLicense.activation_limit}`,
      })
      const result = await activateSupabaseLicense(dbLicense, instance_name)
      if (!('activated' in result) || !result.activated) {
        apiWarn(SCOPE, 'supabase_activate_failed', {
          error: (result as any).error,
          ms: Date.now() - started,
        })
        return NextResponse.json(
          {
            success: false,
            error: (result as any).error || 'License activation failed',
            license_key: dbLicense.key,
          },
          { status: 400 }
        )
      }
      apiLog(SCOPE, 'supabase_activate_ok', {
        instance_id: result.instance?.id,
        ms: Date.now() - started,
      })
      return NextResponse.json({
        success: true,
        activated: result.activated,
        license_key: result.license_key,
        instance: result.instance,
        meta: result.meta,
      })
    }

    apiLog(SCOPE, 'path_lemon_squeezy', {
      mirrored: !!dbLicense,
      mirror_source: dbLicense?.source ?? null,
    })

    const formData = new URLSearchParams()
    formData.append('license_key', license_key)
    formData.append('instance_name', sanitizeInstanceName(instance_name))

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
      activated: !!data.activated,
      error: data?.error || null,
    })

    if (!response.ok || !data.activated) {
      const errorMessage =
        data?.error || data?.message || 'License activation failed'

      if (dbLicense && dbLicense.source === 'lemon_squeezy') {
        apiLog(SCOPE, 'fallback_supabase_mirror')
        const sb = await activateSupabaseLicense(dbLicense, instance_name)
        if ('activated' in sb && sb.activated) {
          apiLog(SCOPE, 'mirror_activate_ok', {
            instance_id: sb.instance?.id,
            ms: Date.now() - started,
          })
          return NextResponse.json({
            success: true,
            activated: sb.activated,
            license_key: sb.license_key,
            instance: sb.instance,
            meta: sb.meta,
          })
        }
      }

      apiWarn(SCOPE, 'activate_failed', {
        error: errorMessage,
        ms: Date.now() - started,
      })
      await notifyError(new Error(errorMessage), request, {
        request_body: { instance_name },
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

    await mirrorLemonLicense({
      key: license_key,
      licenseKey: data.license_key,
      meta: data.meta,
      instance: data.instance,
      instanceName: instance_name,
    })

    apiLog(SCOPE, 'lemon_activate_ok', {
      instance_id: data.instance?.id,
      ms: Date.now() - started,
    })

    return NextResponse.json({
      success: true,
      activated: data.activated,
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
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}
