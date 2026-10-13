# Deploying to cPanel (Node.js App / Passenger)

This app is a **TanStack Start** full-stack app. It is **not** a static site — the
"Become a Tutor" form, tutor pages, admin panel, SSR, and rejection emails all run
on a Node server. So it is deployed as a cPanel **Node.js Application** (Passenger),
not by dropping static files in File Manager.

## 1. Build the Node server (on your machine)

```bash
npm install
npm run build
```

`vite.config.ts` is configured to use Nitro's `node-server` preset, so the build
produces a self-contained server at `.output/server/index.mjs` with all server
dependencies bundled in (no `node_modules` needed at runtime).

> The `.output` folder is platform-independent JS — building on Windows and running
> on the Linux cPanel host is fine.

## 2. Files to upload

Upload the **contents** of `.output/` (flat) plus the two deploy files into your
**Application Root** on cPanel. The final layout must be:

```
<app root>/
├── server/           ← from .output/server
├── public/           ← from .output/public
├── nitro.json        ← from .output/nitro.json
├── app.cjs           ← from this deploy/ folder
└── package.json      ← from this deploy/ folder (the minimal runtime one, NOT the project root package.json)
```

`app.cjs` boots `./server/index.mjs`, so `server/` and `public/` must sit directly in
the app root (a flat layout — no `.output` folder, no `deploy/` subfolder).

Easiest path — zip the build contents + the deploy files, upload the zip via File
Manager, and extract it in the app root:

```powershell
Compress-Archive -Path .output\*, deploy\app.cjs, deploy\package.json -DestinationPath deploy-bundle.zip -Force
```

## 3. Create the Node.js app in cPanel

cPanel → **Setup Node.js App** → **Create Application**:

| Field | Value |
|-------|-------|
| Node.js version | **20.x or newer** (22 preferred) |
| Application mode | **Production** |
| Application root | e.g. `science-academy` (folder from step 2) |
| Application URL | your domain or subdomain |
| Application startup file | `app.cjs` |

## 4. Environment variables (add in the same screen)

These are read at **runtime** on the server. The service-role key must **only** live
here — never in the browser / `VITE_` vars.

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | `https://yxnvtaeqdcaldevqkduf.supabase.co` |
| `SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_...` (same as in `.env`) |
| `SUPABASE_SERVICE_ROLE_KEY` | **Supabase → Project Settings → API Keys → secret key (`sb_secret_...`)** |

`SUPABASE_SERVICE_ROLE_KEY` is the one that was missing and caused the form-submit
error. Without it the "Become a Tutor" form and the tutor/admin pages will fail.

### Email (SMTP) — optional but needed for the notification emails

The app sends four emails via SMTP: a new-application alert to your team, a
confirmation to the applicant on submit, and approval / rejection emails to the
applicant. Until these are set, emails are silently **skipped** (the app still works).

1. In cPanel → **Email Accounts**, create a mailbox, e.g. `careers@thebestscienceacademy.com`.
2. Open its **Connect Devices** tab to read the SMTP host/port, then add these env vars:

| Variable | Value |
|----------|-------|
| `SMTP_HOST` | e.g. `mail.thebestscienceacademy.com` |
| `SMTP_PORT` | `465` (SSL) or `587` (TLS) |
| `SMTP_SECURE` | `true` for 465, `false` for 587 |
| `SMTP_USER` | the full mailbox address (e.g. `careers@thebestscienceacademy.com`) |
| `SMTP_PASS` | the mailbox password |
| `EMAIL_FROM` | *(optional)* `The Best Science Academy <careers@thebestscienceacademy.com>` |
| `ADMIN_NOTIFY_EMAIL` | where new-application alerts go (falls back to `EMAIL_FROM`) |
| `CONTACT_NOTIFY_EMAIL` | where contact-form enquiries go, e.g. `info@thebestscienceacademy.com` (falls back to `ADMIN_NOTIFY_EMAIL`) |
| `SMTP_TLS_REJECT_UNAUTHORIZED` | set to `false` if you get a *"Hostname/IP does not match certificate"* error (common on shared cPanel/Namecheap mail — the cert is for `*.web-hosting.com`, not your domain) |

3. **Deliverability:** in cPanel → **Email Deliverability**, click **Repair** on your
   domain so SPF and DKIM are set — otherwise these emails may land in spam.

Restart the app after adding/changing any of these.

## 5. Start it

Click **Run NPM Install** (harmless — no deps), then **Restart**. Visit your URL.

## Updating after code changes

```powershell
npm run build
Compress-Archive -Path .output\*, deploy\app.cjs, deploy\package.json -DestinationPath deploy-bundle.zip -Force
```

Upload + extract into the app root (replacing the old `server/` and `public/`),
then **Restart** the app in cPanel.
