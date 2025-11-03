
# NobleCare Mobility – Website (Email + SMS form)

This folder contains the updated site. The form now POSTs to `/api/contact`.
On each submission it:
- sends an **email** to `noblecaremobility@gmail.com` (via Gmail SMTP)
- sends a **text message** to `+1 857-333-9639` (via Twilio)
- shows a success/failure message to the visitor

## Quick deploy on Vercel (free)
1. Create a free account at vercel.com and install Vercel CLI (optional).
2. Click “New Project” → **Import** this folder or drag & drop it.
3. In *Project Settings → Environment Variables*, add the keys from `.env.example`:
   - `MAIL_FROM`, `MAIL_APP_PASSWORD`, `MAIL_TO`
   - Optional: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`, `SMS_TO`
4. Deploy. Your site URL will be something like `https://noblecare-<hash>.vercel.app`.

### Gmail Setup
- In your Google account, enable 2‑Step Verification.
- Create an **App Password** for “Mail” and copy it into `MAIL_APP_PASSWORD`.

### Twilio Setup (for SMS)
- Create a Twilio account and buy a phone number.
- Put the Account SID, Auth Token, and Twilio number into the env vars.
- Set `SMS_TO=+18573339639` (or any number you prefer).

## Local test
- Install Node 18+
- Run `npm init -y` then `npm i nodemailer twilio`.
- Start a local server with `npx vercel dev` (or any static server plus the API route).

## Notes
- All submissions are saved in your **email inbox** and Twilio message logs.
- If you want a database later (Google Sheets, Airtable, or Supabase), we can add it.
