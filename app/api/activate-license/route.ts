import { NextRequest, NextResponse } from 'next/server';
import type { ActivateLicenseRequest, ActivateLicenseResponse } from '@/types/lemon-squeezy';
import { notifyError } from '@/lib/bugsnag';

const LEMON_SQUEEZY_LICENSE_API = 'https://api.lemonsqueezy.com/v1/licenses/activate';

function sanitizeInstanceName(raw?: string): string {
  const trimmed = (raw && typeof raw === 'string') ? raw.trim() : ''
  if (!trimmed) return 'Desktop'
  if (trimmed.length < 3) return `Desktop ${trimmed}`
  return trimmed.slice(0, 20)
}

export async function POST(request: NextRequest) {
  try {
    const body: ActivateLicenseRequest = await request.json();
    const { license_key, instance_name } = body;

    // log the request body
    console.log('License activation request:', body);

    if (!license_key) {
      return NextResponse.json(
        { error: 'License key is required' },
        { status: 400 }
      );
    }

    const formData = new URLSearchParams();
    formData.append('license_key', license_key);
    formData.append('instance_name', sanitizeInstanceName(instance_name));

    const response = await fetch(LEMON_SQUEEZY_LICENSE_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data: ActivateLicenseResponse = await response.json();

    if (!response.ok || !data.activated) {
      const errorMessage = data?.error || (data as any)?.message || 'License activation failed';

      await notifyError(new Error(errorMessage), request, {
        request_body: body,
        lemon_squeezy: data
      });
      return NextResponse.json(
        {
          success: false,
          error: errorMessage,
          license_key: data.license_key
        },
        { status: response.status >= 400 ? response.status : 400 }
      );
    }

    return NextResponse.json({
      success: true,
      activated: data.activated,
      license_key: data.license_key,
      instance: data.instance,
      meta: data.meta,
    });

  } catch (error: any) {
    await notifyError(error, request);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
