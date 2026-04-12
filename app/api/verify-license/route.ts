import { NextRequest, NextResponse } from 'next/server';
import type { ValidateLicenseRequest, ValidateLicenseResponse } from '@/types/lemon-squeezy';
import { notifyError } from '@/lib/bugsnag';

const LEMON_SQUEEZY_LICENSE_API = 'https://api.lemonsqueezy.com/v1/licenses/validate';

export async function POST(request: NextRequest) {
  try {
    const body: ValidateLicenseRequest = await request.json();
    const { license_key, instance_id } = body;

    // log the request body
    console.log('License verification request:', body);

    // Validate required fields
    if (!license_key) {
      return NextResponse.json(
        { error: 'license_key is required' },
        { status: 400 }
      );
    }

    if(!instance_id){
      return NextResponse.json(
        { error: 'instance_id is required' },
        { status: 400 }
      );
    }

    // Call Lemon Squeezy License API
    const formData = new URLSearchParams();
    formData.append('license_key', license_key);
    if (instance_id) {
      formData.append('instance_id', instance_id);
    }

    const response = await fetch(LEMON_SQUEEZY_LICENSE_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data: ValidateLicenseResponse = await response.json();

    if (!response.ok) {
      const errorMessage = data?.error || (data as any)?.message || 'License validation failed';
      notifyError(new Error(errorMessage), request, {
        request_body: body,
        lemon_squeezy: data
      });
      return NextResponse.json(
        { 
          valid: false, 
          error: errorMessage,
          license_key: data.license_key 
        },
        { status: response.status >= 400 ? response.status : 400 }
      );
    }

    // Return validation response
    return NextResponse.json({
      valid: data.valid,
      error: data.error,
      license_key: data.license_key,
      instance: data.instance,
      meta: data.meta,
    });

  } catch (error: any) {
    console.error('License validation error:', error);
    notifyError(error, request);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
