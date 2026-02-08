import { NextRequest, NextResponse } from 'next/server';
import type { DeactivateLicenseRequest, DeactivateLicenseResponse } from '@/types/lemon-squeezy';

const LEMON_SQUEEZY_LICENSE_API = 'https://api.lemonsqueezy.com/v1/licenses/deactivate';

export async function POST(request: NextRequest) {
  try {
    const body: DeactivateLicenseRequest = await request.json();
    const { license_key, instance_id } = body;

    // Validate required fields
    if (!license_key || !instance_id) {
      return NextResponse.json(
        { error: 'license_key and instance_id are required' },
        { status: 400 }
      );
    }

    // Call Lemon Squeezy License API
    const formData = new URLSearchParams();
    formData.append('license_key', license_key);
    formData.append('instance_id', instance_id);

    const response = await fetch(LEMON_SQUEEZY_LICENSE_API, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    const data: DeactivateLicenseResponse = await response.json();

    if (!response.ok || !data.deactivated) {
      return NextResponse.json(
        { 
          success: false, 
          error: data.error || 'License deactivation failed',
          license_key: data.license_key 
        },
        { status: response.status >= 400 ? response.status : 400 }
      );
    }

    // Return successful deactivation response
    return NextResponse.json({
      success: true,
      deactivated: data.deactivated,
      license_key: data.license_key,
      meta: data.meta,
    });

  } catch (error) {
    console.error('License deactivation error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
