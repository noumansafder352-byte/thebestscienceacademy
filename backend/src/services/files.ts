// File storage on the server's disk. Mirrors the old Supabase buckets:
//
//   uploads/tutor-photos/   applicant photos (applications/...) and tutor photos (tutors/...)
//   uploads/tutor-cvs/      CVs (applications/...) and CNIC images (applications/cnic/...)
//
// Nothing here is publicly browsable. Files are served only through signed,
// expiring URLs (like Supabase's createSignedUrl) — see routes/files.routes.ts.
import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Request } from "express";
import { env } from "../config/env.js";
import { HttpError } from "../lib/http.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const UPLOADS_DIR = path.resolve(__dirname, "..", "..", "uploads");

export const BUCKETS = ["tutor-photos", "tutor-cvs"] as const;
export type Bucket = (typeof BUCKETS)[number];

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB, same as the old form

/* ---------------- Paths ---------------- */

export function isBucket(value: string): value is Bucket {
  return (BUCKETS as readonly string[]).includes(value);
}

/** Absolute path on disk for a bucket path, refusing anything that escapes the bucket. */
export function resolveFile(bucket: Bucket, filePath: string): string {
  const root = path.join(UPLOADS_DIR, bucket);
  const full = path.resolve(root, ...filePath.split("/"));
  if (!full.startsWith(root + path.sep)) throw new HttpError(400, "Invalid file path");
  return full;
}

/** Same cleaning the old frontend applied to uploaded file names. */
export function sanitizeName(name: string): string {
  const cleaned = name.replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^\.+/, "");
  return cleaned.slice(-100) || "file";
}

/** A short random tag so two uploads in the same millisecond never collide. */
export function uniqueTag(): string {
  return randomBytes(4).toString("hex");
}

export async function saveFile(bucket: Bucket, filePath: string, data: Buffer): Promise<void> {
  const full = resolveFile(bucket, filePath);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, data, { flag: "wx" }); // never overwrite an existing file
}

export async function deleteFile(bucket: Bucket, filePath: string): Promise<void> {
  await unlink(resolveFile(bucket, filePath)).catch(() => {});
}

/* ---------------- Checking real file contents ---------------- */

export type FileKind = "image" | "document";

// Detect the type from the file's first bytes rather than trusting the
// browser-supplied name or MIME type.
export function detectType(buf: Buffer): { kind: FileKind; ext: string } | null {
  const starts = (...bytes: number[]) => bytes.every((b, i) => buf[i] === b);
  if (starts(0xff, 0xd8, 0xff)) return { kind: "image", ext: "jpg" };
  if (starts(0x89, 0x50, 0x4e, 0x47)) return { kind: "image", ext: "png" };
  if (buf.subarray(0, 4).toString("latin1") === "RIFF" && buf.subarray(8, 12).toString("latin1") === "WEBP") {
    return { kind: "image", ext: "webp" };
  }
  if (buf.subarray(0, 5).toString("latin1") === "%PDF-") return { kind: "document", ext: "pdf" };
  if (starts(0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1)) return { kind: "document", ext: "doc" };
  if (starts(0x50, 0x4b, 0x03, 0x04)) return { kind: "document", ext: "docx" };
  return null;
}

export type UploadedFile = { buffer: Buffer; size: number; originalname: string };

/** Checks an uploaded file's size and real type; returns it, or throws a 400. */
export function checkUpload(file: UploadedFile | undefined, kind: FileKind, label: string): UploadedFile {
  if (!file) throw new HttpError(400, `${label} is required.`);
  if (file.size > MAX_UPLOAD_BYTES) throw new HttpError(400, `${label} must be under 5MB.`);
  const type = detectType(file.buffer);
  if (!type || type.kind !== kind) {
    throw new HttpError(400, kind === "image" ? `${label} must be JPG, PNG, or WebP.` : `${label} must be a PDF or Word document.`);
  }
  return file;
}

/* ---------------- Signed URLs ---------------- */

function signature(bucket: Bucket, filePath: string, expires: number): string {
  return createHmac("sha256", `files:${env.jwtSecret}`)
    .update(`${bucket}/${filePath}:${expires}`)
    .digest("base64url");
}

/** Base URL of this API, used to build absolute file links for the frontend. */
export function apiBaseUrl(req: Request): string {
  return env.publicApiUrl ?? `${req.protocol}://${req.get("host")}`;
}

/** A link that serves the file until it expires (like Supabase createSignedUrl). */
export function signedFileUrl(req: Request, bucket: Bucket, filePath: string | null | undefined, ttlSeconds: number) {
  if (!filePath) return null;
  if (/^https?:\/\//.test(filePath)) return filePath; // already a full external URL
  // Round the expiry up to a 10-minute boundary so the same file gets the same
  // URL for a while: server- and browser-rendered pages match (no hydration
  // mismatch) and browsers can cache the image instead of re-downloading it.
  const step = 600;
  const expires = Math.ceil((Math.floor(Date.now() / 1000) + ttlSeconds) / step) * step;
  const encodedPath = filePath.split("/").map(encodeURIComponent).join("/");
  return `${apiBaseUrl(req)}/api/files/${bucket}/${encodedPath}?expires=${expires}&sig=${signature(bucket, filePath, expires)}`;
}

export function verifySignature(bucket: Bucket, filePath: string, expires: number, sig: string): boolean {
  if (!Number.isFinite(expires) || expires < Date.now() / 1000) return false;
  const expected = Buffer.from(signature(bucket, filePath, expires));
  const given = Buffer.from(sig);
  return expected.length === given.length && timingSafeEqual(expected, given);
}
