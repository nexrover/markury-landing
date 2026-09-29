export type LicenseSource = 'lemon_squeezy' | 'google_play'
export type LicenseStatus =
  | 'active'
  | 'inactive'
  | 'expired'
  | 'disabled'
  | 'cancelled'
export type LicensePlan = 'pro_yearly' | 'pro_lifetime' | 'basic'
export type LicensePlatform =
  | 'android'
  | 'macos'
  | 'windows'
  | 'linux'
  | 'other'

export interface DbLicense {
  id: string
  key: string
  source: LicenseSource
  status: LicenseStatus
  plan: LicensePlan
  activation_limit: number
  activation_usage: number
  customer_email: string | null
  customer_name: string | null
  product_name: string | null
  variant_name: string | null
  expires_at: string | null
  lemon_license_id: string | null
  lemon_order_id: string | null
  lemon_numeric_id: number | null
  created_at: string
  updated_at: string
}

export interface DbLicenseInstance {
  id: string
  license_id: string
  name: string
  platform: LicensePlatform
  created_at: string
}

export interface DbDiscountCode {
  id: string
  code: string
  play_product_id: string
  play_offer_id: string | null
  plan: 'pro_yearly' | 'pro_lifetime'
  max_redemptions: number | null
  redemption_count: number
  expires_at: string | null
  notes: string | null
  active: boolean
  created_at: string
}

export const PLAY_PRODUCTS = {
  yearly: process.env.PLAY_PRODUCT_YEARLY || 'markury_pro_yearly',
  lifetime: process.env.PLAY_PRODUCT_LIFETIME || 'markury_pro_lifetime',
  yearlyDiscounted:
    process.env.PLAY_PRODUCT_YEARLY_DISCOUNTED || 'markury_pro_yearly_discount',
  lifetimeDiscounted:
    process.env.PLAY_PRODUCT_LIFETIME_DISCOUNTED ||
    'markury_pro_lifetime_discount',
} as const
