// Lemon Squeezy API Types

export interface LicenseKeyMeta {
  store_id: number;
  order_id: number;
  order_item_id: number;
  product_id: number;
  product_name: string;
  variant_id: number;
  variant_name: string;
  customer_id: number;
  customer_name: string;
  customer_email: string;
}

export interface LicenseKey {
  id: number;
  status: 'inactive' | 'active' | 'expired' | 'disabled';
  key: string;
  activation_limit: number;
  activation_usage: number;
  created_at: string;
  expires_at: string | null;
}

export interface LicenseInstance {
  id: string;
  name: string;
  created_at: string;
}

export interface ActivateLicenseResponse {
  activated: boolean;
  error: string | null;
  license_key: LicenseKey;
  instance: LicenseInstance;
  meta: LicenseKeyMeta;
}

export interface ValidateLicenseResponse {
  valid: boolean;
  error: string | null;
  license_key: LicenseKey;
  instance: LicenseInstance | null;
  meta: LicenseKeyMeta;
}

export interface DeactivateLicenseResponse {
  deactivated: boolean;
  error: string | null;
  license_key: LicenseKey;
  meta: LicenseKeyMeta;
}

// Request types for our API routes
export interface ActivateLicenseRequest {
  license_key: string;
  instance_name: string;
}

export interface ValidateLicenseRequest {
  license_key: string;
  instance_id?: string;
}

export interface DeactivateLicenseRequest {
  license_key: string;
  instance_id: string;
}
