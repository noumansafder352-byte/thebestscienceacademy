// GET /api/files/:bucket/*path?expires=...&sig=...
// Serves uploaded files through signed, expiring links (replaces Supabase
// signed URLs). Links are created by signedFileUrl() in services/files.ts.
import { existsSync } from "node:fs";
import path from "node:path";
import { Router } from "express";
import { HttpError } from "../lib/http.js";
import { isBucket, resolveFile, verifySignature } from "../services/files.js";

export const filesRouter = Router();

const CONTENT_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".doc": "application/msword",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
};

filesRouter.get("/:bucket/*path", (req, res) => {
  const { bucket } = req.params;
  const filePath = ([] as string[]).concat(req.params.path).join("/");
  const expires = Number(req.query.expires);
  const sig = String(req.query.sig ?? "");

  if (!isBucket(bucket) || !verifySignature(bucket, filePath, expires, sig)) {
    throw new HttpError(403, "This link is invalid or has expired. Reload the page to get a new one.");
  }
  const full = resolveFile(bucket, filePath);
  if (!existsSync(full)) throw new HttpError(404, "File not found");

  const ext = path.extname(full).toLowerCase();
  const secondsLeft = Math.max(0, Math.floor(expires - Date.now() / 1000));
  res.setHeader("Cache-Control", `private, max-age=${Math.min(secondsLeft, 3600)}`);
  res.setHeader("Content-Type", CONTENT_TYPES[ext] ?? "application/octet-stream");
  // Images and PDFs open in the browser; anything else downloads.
  const inline = ext in CONTENT_TYPES && ext !== ".doc" && ext !== ".docx";
  res.attachment(path.basename(full));
  if (inline) res.setHeader("Content-Disposition", `inline; filename="${path.basename(full)}"`);
  res.sendFile(full, { dotfiles: "deny" });
});
