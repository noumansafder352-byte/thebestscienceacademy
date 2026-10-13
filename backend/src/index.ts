import express, { type ErrorRequestHandler } from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import multer from "multer";
import { env } from "./config/env.js";
import { pingDb } from "./config/db.js";
import { authRouter } from "./routes/auth.routes.js";
import { publicRouter } from "./routes/public.routes.js";
import { adminRouter } from "./routes/admin.routes.js";
import { filesRouter } from "./routes/files.routes.js";

const app = express();

// Behind cPanel/Passenger (or any reverse proxy) in production, trust the first
// proxy so req.ip is the visitor's real IP — needed for rate limiting.
if (env.isProduction) app.set("trust proxy", 1);

app.use(
  helmet({
    // Images and file links are loaded by the frontend from another origin.
    crossOriginResourcePolicy: { policy: "cross-origin" },
    // This server only returns JSON and files (with fixed, non-sniffable types);
    // a page-style CSP would only get in the way of the browser's PDF viewer.
    contentSecurityPolicy: false,
  }),
);
app.use(cors({ origin: env.frontendUrls, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(cookieParser());

app.get("/api/health", async (_req, res) => {
  try {
    await pingDb();
    res.json({ ok: true, db: "connected" });
  } catch (err: any) {
    res.status(500).json({ ok: false, db: "error", error: err?.message ?? String(err) });
  }
});

app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/files", filesRouter);
app.use("/api", publicRouter);

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "Not found" });
});

const MULTER_MESSAGES: Record<string, string> = {
  LIMIT_FILE_SIZE: "Each file must be under 5MB.",
  LIMIT_FILE_COUNT: "Too many files.",
  LIMIT_UNEXPECTED_FILE: "Unexpected file field.",
};

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof multer.MulterError) {
    res.status(400).json({ error: MULTER_MESSAGES[err.code] ?? err.message });
    return;
  }
  const status = Number(err?.status ?? err?.statusCode ?? 500);
  // 4xx errors (validation, malformed JSON, etc.) are safe to show; hide 5xx details in production.
  if (status >= 500) console.error("[api] Unhandled error:", err);
  const message = status < 500 || !env.isProduction ? (err?.message ?? "Server error") : "Server error";
  res.status(status).json({ error: message });
};
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`API running at http://localhost:${env.port}`);
});
