# Stripe & Tebex PoC

This is a full stack TypeScript PoC to test the feasibility of stripe checkout and product delivery via Tebex API.

## Test payment

This project is running in test mode, use `4242424242424242` as a test card number with any CVC and future expiration date.

Use the `4000000000003220` test card number to trigger a 3D Secure challenge flow.

Read more about testing on Stripe at https://stripe.com/docs/testing.


## Included functionality

### Stripe Checkout
Checkout payment result page that uses SWR hooks to fetch the CheckoutSession status from the API route: [pages/result.tsx](pages/result.tsx).

### Webhook handling for post-payment events
By default Next.js API routes are same-origin only. To allow Stripe webhook event requests to reach our API route, we need to add `micro-cors` and verify the webhook signature of the event. All of this happens in [pages/api/webhooks/index.ts](pages/api/webhooks/index.ts).

### Helpers
Helpers for GET and POST requests [utils/api-helpers.ts](utils/api-helpers.ts).

### Required configuration

Copy the `.env.local.example` file into a file named `.env.local` in the root directory of this project:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<replace-with-publishable-key>
STRIPE_SECRET_KEY=<replace-with-secret-key>
```

Now install the dependencies and start the development server.

```bash
pnpm install
pnpm dev
```

### Forward webhooks to local dev server

First install the Stripe CLI and link a Stripe account.

Next, start the webhook forwarding:

```bash
stripe listen --forward-to localhost:3000/api/webhooks
```

The CLI will print a webhook secret key to the console. Set `STRIPE_WEBHOOK_SECRET` to this value in the `.env.local` file.
