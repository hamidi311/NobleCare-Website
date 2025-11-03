# NobleCare Mobility – Website (Email + SMS form)

This folder contains the updated site. The form **POSTs to `/api/contact`**.
On each submission it:
- sends an **email** to `noblecaremobility@gmail.com` (via Gmail SMTP)
- optionally sends a **text message** to `+1 857-333-9639` (via Twilio)
- shows a success/failure message to the visitor

## Deploy on Vercel
1. Create a new GitHub repo and upload **this entire folder**.
2. On Vercel, **New Project** → Import the repo.
3. In *Settings → Environment Variables*, add keys from `.env.example`.
4. Deploy. Visit your live URL and test the form.

### Gmail Setup
- In your Google account, enable 2‑Step Verification.
- Create an **App Password** for “Mail”; paste into `MAIL_APP_PASSWORD`.

### Local test (optional)
- Node 18+, then:
  ```bash
  npm install
  npx vercel dev
  ```
- Open http://localhost:3000 and submit the form.

If you need database storage later (Google Sheets, Airtable, Supabase), we can add it.
