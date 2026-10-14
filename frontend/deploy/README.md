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

## 4. Environment variables

The frontend no longer talks to Supabase or sends emails — it calls the Express
API in `backend/`, which owns the MySQL database, file uploads and SMTP.
Database, JWT and SMTP settings belong to the **backend** Node.js app (see
`backend/.env.example`), not to this one.

The only frontend setting is the API URL, and it is baked in **at build time**:
set it in `frontend/.env` *before* running `npm run build`:

| Variable | Value |
|----------|-------|
| `VITE_API_URL` | the public URL of the backend API, e.g. `https://api.thebestscienceacademy.com` |

Changing it later means rebuilding and re-uploading. Nothing needs to be added in
this app's cPanel environment-variables screen.

The backend's `FRONTEND_URL` must be this site's URL (for CORS and the login
cookie), and both sites must use HTTPS in production.

## 5. Start it

Click **Run NPM Install** (harmless — no deps), then **Restart**. Visit your URL.
Make sure the backend API is running too, or tutors and forms won't load.

## Updating after code changes

```powershell
npm run build
Compress-Archive -Path .output\*, deploy\app.cjs, deploy\package.json -DestinationPath deploy-bundle.zip -Force
```

Upload + extract into the app root (replacing the old `server/` and `public/`),
then **Restart** the app in cPanel.
