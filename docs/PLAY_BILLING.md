# Google Play Console setup (Markury Pro)

Create these **managed products / subscriptions** in Play Console for package `com.nexrover.markury`:

| Product ID | Type | Base price | Notes |
|---|---|---|---|
| `markury_pro_yearly` | **Subscription** | $29/year | Add a **7-day free trial** base-plan offer for “Start Free Trial” |
| `markury_pro_lifetime` | One-time in-app product | $79 | No Play free trial (one-time only) |
| `markury_pro_yearly_discount` | Subscription / offer product | discounted | Used by dynamic discount codes |
| `markury_pro_lifetime_discount` | One-time product | discounted | Used by dynamic discount codes |

## Yearly free trial (production)

1. In Play Console, open `markury_pro_yearly` → base plan → add a **free trial** offer (7 days).
2. App billing launches that subscription (offer token from Play).
3. `/api/play/verify-purchase` reads Play `paymentState=2` (trial) and **`expiryTimeMillis`** from Google — license `expires_at` is set to that timestamp (≈ +7 days), not a fake +365 days.
4. On activate/verify, the API **re-syncs** with Play (throttled to every 5 minutes) so renewals, cancel-at-period-end, and trial expiry update `expires_at` / `status`.
5. Configure **Real-time developer notifications** (recommended) so cancel/renew/expire apply immediately.

### RTDN setup

1. Create a Cloud Pub/Sub topic (same GCP project linked to Play).
2. Play Console → Monetization setup → Real-time developer notifications → set that topic.
3. Create a **push** subscription to:
   `https://www.markury.app/api/webhooks/google-play`
4. Optionally protect with `GOOGLE_PLAY_RTDN_SECRET` (Bearer or `?token=`).

## Dynamic discounts

1. Create discounted product(s) or Play offers in Console.
2. Insert a code via Supabase `discount_codes` or:

```bash
curl -X POST https://www.markury.app/api/admin/discount-codes \
  -H "Content-Type: application/json" \
  -H "x-admin-secret: $ADMIN_API_SECRET" \
  -d '{
    "code": "SPECIAL20",
    "plan": "pro_lifetime",
    "play_product_id": "markury_pro_lifetime_discount",
    "max_redemptions": 1,
    "notes": "VIP user"
  }'
```

3. Share the code with the user. Android paywall resolves it before launching Billing.

## Server env

See `.env.example` for `GOOGLE_PLAY_SERVICE_ACCOUNT_*`, `PLAY_PRODUCT_*`, `PLAY_PACKAGE_NAME`, `GOOGLE_PLAY_RTDN_SECRET`, `LEMONSQUEEZY_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_*`.

### Purchase receipt email (Resend)

After a **new** Play license is created, `/api/play/verify-purchase` emails a Lemon Squeezy–style receipt (order info + license key) via Resend when `customerEmail` was provided.

```bash
RESEND_API_KEY=re_xxxxxxxxx
RESEND_FROM_EMAIL=orders@markury.app
RESEND_FROM_NAME=Markury
```

- Domain must be verified in Resend; `from` must use that domain.
- Email failures are logged and do **not** fail the purchase.

### Google Play service account (required to verify real purchases)

Without these, `/api/play/verify-purchase` returns 500:
`Google Play service account is not configured`.

1. **Google Cloud Console** → create/select a project → **IAM & Admin → Service Accounts** → Create  
   (e.g. `markury-play-verifier`).
2. **Keys → Add key → JSON** → download the JSON.
3. From the JSON, put into `markury-landing/.env.local`:

```bash
PLAY_PACKAGE_NAME=com.nexrover.markury
GOOGLE_PLAY_SERVICE_ACCOUNT_EMAIL=markury-play-verifier@YOUR_PROJECT.iam.gserviceaccount.com
# Keep the \n escapes as a single quoted line:
GOOGLE_PLAY_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
GOOGLE_PLAY_RTDN_SECRET=long-random-string
```

4. **Play Console** → **Users and permissions** (or **Setup → API access**) → link the Cloud project → invite that service account email with permission to **View financial data / View app information and download bulk reports** (and manage orders / manage subscriptions & IAP as needed) → Accept.
5. Restart `pnpm run dev` so Next picks up `.env.local`.

`PLAY_BILLING_MOCK=true` only accepts tokens starting with `mock_` — it will **not** verify a real Play purchase token.  
Use `mock_trial_…` to simulate a 7-day trial expiry locally.

## Webhooks

- Lemon Squeezy: `https://www.markury.app/api/webhooks/lemonsqueezy`
- Google Play RTDN: `https://www.markury.app/api/webhooks/google-play`
