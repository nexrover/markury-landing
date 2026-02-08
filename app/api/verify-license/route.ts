import { NextRequest, NextResponse } from 'next/server';
import type { ValidateLicenseRequest, ValidateLicenseResponse } from '@/types/lemon-squeezy';

const LEMON_SQUEEZY_LICENSE_API = 'https://api.lemonsqueezy.com/v1/licenses/validate';

export async function POST(request: NextRequest) {
  try {
    const body: ValidateLicenseRequest = await request.json();
    const { license_key, instance_id } = body;

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
      return NextResponse.json(
        { 
          valid: false, 
          error: data.error || 'License validation failed',
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

  } catch (error) {
    console.error('License validation error:', error);
    return NextResponse.json(
      { valid: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
