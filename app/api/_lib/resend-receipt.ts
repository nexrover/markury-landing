import { Resend } from 'resend'
import { apiLog, apiWarn, maskLicenseKey } from '@/app/api/_lib/api-log'
import type { DbLicense } from '@/app/api/_lib/license-types'

const SCOPE = 'resend/play-receipt'

/** Markury landing design tokens (tailwind / globals.css). */
const DS = {
  lime: '#A3F635',
  purple: '#C084FC',
  cyan: '#22D3EE',
  yellow: '#FACC15',
  pink: '#FB7185',
  orange: '#FB923C',
  gray: '#6B7280',
  gray900: '#111827',
  gray800: '#1F2937',
  gray700: '#374151',
  gray600: '#4B5563',
  gray500: '#6B7280',
  gray400: '#9CA3AF',
  gray200: '#E5E7EB',
  gray100: '#F3F4F6',
  gray50: '#F9FAFB',
  brandLight: '#F8F9FA',
  white: '#FFFFFF',
  font: "Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  logoUrl: 'https://www.markury.app/logo.svg',
  siteUrl: 'https://www.markury.app',
} as const

export type PlayReceiptInput = {
  license: DbLicense
  customerEmail: string
  orderId?: string | null
  productId: string
  isTrial?: boolean
  created: boolean
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function formatDate(iso?: string | null): string {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch {
    return iso
  }
}

function planLabel(license: DbLicense, isTrial?: boolean): string {
  const product = license.product_name || 'Markury Pro'
  const variant =
    license.variant_name ||
    (license.plan === 'pro_yearly' ? 'Pro Yearly' : 'Pro Lifetime')
  void isTrial
  return `${product} — ${variant}`
}

function amountLabel(license: DbLicense, isTrial?: boolean): string {
  if (license.plan === 'pro_lifetime') return '$79.00 USD (one-time)'
  if (isTrial || (license.variant_name || '').toLowerCase().includes('trial')) {
    return 'Free trial (then $29.00 USD / year)'
  }
  return '$29.00 USD / year'
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${DS.gray200};font-size:13px;color:${DS.gray500};width:38%;vertical-align:top;">${escapeHtml(label)}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${DS.gray200};font-size:14px;color:${DS.gray900};font-weight:600;vertical-align:top;">${value}</td>
  </tr>`
}

function buildReceiptHtml(input: PlayReceiptInput): string {
  const { license, orderId, isTrial } = input
  const productLine = planLabel(license, isTrial)
  const amount = amountLabel(license, isTrial)
  const order = orderId?.trim() || license.id.slice(0, 8).toUpperCase()
  const expires =
    license.plan === 'pro_lifetime'
      ? 'Never (lifetime)'
      : formatDate(license.expires_at)
  const badge =
    isTrial || (license.variant_name || '').toLowerCase().includes('trial')
      ? '7 days free trial'
      : license.plan === 'pro_lifetime'
        ? 'Pay once, own it forever'
        : 'Subscription'

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Your Markury receipt</title>
</head>
<body style="margin:0;padding:0;background:${DS.brandLight};font-family:${DS.font};color:${DS.gray900};-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:${DS.brandLight};padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;">
          <tr>
            <td style="padding:0 0 20px 0;" align="left">
              <a href="${DS.siteUrl}" style="text-decoration:none;display:inline-flex;align-items:center;gap:10px;">
                <img src="${DS.logoUrl}" width="28" height="28" alt="Markury" style="display:block;border:0;" />
                <span style="font-size:20px;font-weight:700;color:${DS.gray900};letter-spacing:-0.02em;">Markury</span>
              </a>
            </td>
          </tr>
          <tr>
            <td style="background:${DS.white};border:1px solid ${DS.gray200};border-radius:24px;overflow:hidden;box-shadow:0 10px 25px -12px rgba(17,24,39,0.18);">
              <div style="height:6px;background:linear-gradient(90deg, ${DS.yellow} 0%, ${DS.orange} 55%, ${DS.pink} 100%);"></div>
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:28px 28px 8px 28px;">
                    <span style="display:inline-block;background:${DS.orange};color:${DS.gray900};font-size:11px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;padding:6px 12px;border-radius:999px;">
                      ${escapeHtml(badge)}
                    </span>
                    <h1 style="margin:16px 0 0 0;font-size:28px;line-height:1.2;font-weight:700;letter-spacing:-0.03em;color:${DS.gray900};">
                      Thanks for your purchase
                    </h1>
                    <p style="margin:12px 0 0 0;font-size:16px;line-height:1.55;color:${DS.gray600};max-width:420px;">
                      Here’s your receipt and Markury license key. Keep this email for your records.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 28px 8px 28px;">
                    <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${DS.gray900};margin-bottom:8px;">
                      Order summary
                    </div>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      ${row('Order ID', escapeHtml(order))}
                      ${row('Product', escapeHtml(productLine))}
                      ${row('Amount', escapeHtml(amount))}
                      ${row('Payment', 'Google Play')}
                      ${row('Date', escapeHtml(formatDate(license.created_at || new Date().toISOString())))}
                      ${row('Renews / expires', escapeHtml(expires))}
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 28px 8px 28px;">
                    <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${DS.gray900};margin-bottom:10px;">
                      Your license key
                    </div>
                    <div style="font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;font-size:15px;letter-spacing:0.02em;background:${DS.gray900};color:${DS.white};border-radius:12px;padding:16px 18px;word-break:break-all;border:2px solid ${DS.yellow};">
                      ${escapeHtml(license.key)}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:22px 28px 8px 28px;">
                    <div style="font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:${DS.gray900};margin-bottom:10px;">
                      How to activate
                    </div>
                    <ol style="margin:0;padding:0 0 0 18px;color:${DS.gray600};font-size:14px;line-height:1.7;">
                      <li>Open Markury → Settings → License</li>
                      <li>Paste your license key</li>
                      <li>Tap Unlock Pro</li>
                    </ol>
                    <p style="margin:14px 0 0 0;font-size:14px;line-height:1.55;color:${DS.gray600};">
                      This license covers up to <strong style="color:${DS.gray900};">2 devices</strong>.
                      Billing was processed by Google Play, you may also get a separate Google Play receipt.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:20px 28px 28px 28px;" align="center">
                    <a href="${DS.siteUrl}/user-guide" style="display:inline-block;background:${DS.yellow};color:${DS.gray900};font-size:15px;font-weight:600;text-decoration:none;padding:14px 28px;border-radius:12px;box-shadow:0 10px 15px -3px rgba(250,204,21,0.35);">
                      Open user guide
                    </a>
                    <p style="margin:16px 0 0 0;font-size:13px;line-height:1.5;color:${DS.gray500};">
                      Need help?
                      <a href="mailto:support@markury.app" style="color:${DS.gray900};font-weight:600;text-decoration:underline;">support@markury.app</a>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding:20px 8px 0 8px;text-align:center;font-size:12px;line-height:1.6;color:${DS.gray400};">
              <a href="${DS.siteUrl}" style="color:${DS.gray500};text-decoration:none;font-weight:600;">www.markury.app</a>
              · Screen annotation for demos &amp; teaching
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

/**
 * Sends a Lemon Squeezy–style receipt for a new Google Play purchase.
 * No-ops (without failing the purchase) when Resend is not configured,
 * email is missing, or this is a duplicate verify (`created === false`).
 */
export async function sendPlayPurchaseReceipt(
  input: PlayReceiptInput
): Promise<{ sent: boolean; error?: string }> {
  if (!input.created) {
    return { sent: false }
  }

  const apiKey = process.env.RESEND_API_KEY?.trim()
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim() || 'orders@markury.app'
  const fromName = process.env.RESEND_FROM_NAME?.trim() || 'Markury'
  const to = input.customerEmail.trim().toLowerCase()

  if (!apiKey) {
    apiWarn(SCOPE, 'skipped_missing_api_key')
    return { sent: false, error: 'RESEND_API_KEY not configured' }
  }
  if (!to || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) {
    apiWarn(SCOPE, 'skipped_invalid_email')
    return { sent: false, error: 'Invalid customer email' }
  }

  try {
    const resend = new Resend(apiKey)
    const subject = `Your Markury receipt — ${planLabel(input.license, input.isTrial)}`
    const { data, error } = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: [to],
      replyTo: 'support@markury.app',
      subject,
      html: buildReceiptHtml(input),
    })

    if (error) {
      apiWarn(SCOPE, 'send_failed', {
        message: error.message,
        license_key: maskLicenseKey(input.license.key),
      })
      return { sent: false, error: error.message }
    }

    apiLog(SCOPE, 'sent', {
      id: data?.id || null,
      to: to.replace(/(.{2}).+(@.+)/, '$1***$2'),
      license_key: maskLicenseKey(input.license.key),
      orderId: input.orderId || null,
    })
    return { sent: true }
  } catch (err: any) {
    apiWarn(SCOPE, 'send_exception', {
      error: err?.message || String(err),
      license_key: maskLicenseKey(input.license.key),
    })
    return { sent: false, error: err?.message || String(err) }
  }
}

/** Dev/test helper: send the receipt HTML with dummy order data. */
export async function sendDummyPlayReceipt(toEmail: string) {
  const now = new Date()
  const expires = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
  return sendPlayPurchaseReceipt({
    created: true,
    customerEmail: toEmail,
    orderId: 'GPA.TEST-ORDER-0001',
    productId: 'markury_pro_yearly',
    isTrial: true,
    license: {
      id: '00000000-0000-4000-8000-000000000001',
      key: 'MKY-TEST-DEMO-KEY-0001',
      source: 'google_play',
      status: 'active',
      plan: 'pro_yearly',
      activation_limit: 2,
      activation_usage: 0,
      customer_email: toEmail,
      customer_name: null,
      product_name: 'Markury Pro',
      variant_name: 'Pro Yearly Trial',
      expires_at: expires.toISOString(),
      lemon_license_id: null,
      lemon_order_id: null,
      lemon_numeric_id: null,
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    },
  })
}
