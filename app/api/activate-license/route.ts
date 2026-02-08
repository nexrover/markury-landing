import { NextRequest, NextResponse } from 'next/server';
import type { ActivateLicenseRequest, ActivateLicenseResponse } from '@/types/lemon-squeezy';

const LEMON_SQUEEZY_LICENSE_API = 'https://api.lemonsqueezy.com/v1/licenses/activate';

export async function POST(request: NextRequest) {
  try {
    const body: ActivateLicenseRequest = await request.json();
    const { license_key, instance_name } = body;

    // Validate required fields
    if (!license_key || !instance_name) {
      return NextResponse.json(
        { error: 'license_key and instance_name are required' },
        { status: 400 }
      );
    }

    // Call Lemon Squeezy License API
    const formData = new URLSearchParams();
    formData.append('license_key', license_key);
    formData.append('instance_name', instance_name);

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
      return NextResponse.json(
        { 
          success: false, 
          error: data.error || 'License activation failed',
          license_key: data.license_key 
        },
        { status: response.status >= 400 ? response.status : 400 }
      );
    }

    // Return successful activation response
    return NextResponse.json({
      success: true,
      activated: data.activated,
      license_key: data.license_key,
      instance: data.instance,
      meta: data.meta,
    });

  } catch (error) {
    console.error('License activation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
