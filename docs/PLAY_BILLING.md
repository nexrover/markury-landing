# Google Play Console setup (Markury Pro)

Create these **managed products / subscriptions** in Play Console for package `com.nexrover.markury`:

| Product ID | Type | Base price | Notes |
|---|---|---|---|
| `markury_pro_yearly` | Subscription (or yearly IAP) | $29/year | Matches web Pro Yearly |
| `markury_pro_lifetime` | One-time in-app product | $79 | Matches web Pro Lifetime |
| `markury_pro_yearly_discount` | Subscription / offer product | discounted | Used by dynamic discount codes |
| `markury_pro_lifetime_discount` | One-time product | discounted | Used by dynamic discount codes |

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

See `.env.example` for `GOOGLE_PLAY_SERVICE_ACCOUNT_*`, `PLAY_PRODUCT_*`, `PLAY_PACKAGE_NAME`, `LEMONSQUEEZY_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`.

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
```

4. **Play Console** → **Users and permissions** (or **Setup → API access**) → link the Cloud project → invite that service account email with permission to **View financial data / View app information and download bulk reports** (and manage orders / manage subscriptions & IAP as needed) → Accept.
5. Restart `pnpm run dev` so Next picks up `.env.local`.

`PLAY_BILLING_MOCK=true` only accepts tokens starting with `mock_` — it will **not** verify a real Play purchase token.

## Webhook

Point Lemon Squeezy webhooks to:

`https://www.markury.app/api/webhooks/lemonsqueezy`
