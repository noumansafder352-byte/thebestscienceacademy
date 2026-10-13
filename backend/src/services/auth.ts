import { createHash, randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { CookieOptions } from "express";
import { db } from "../config/db.js";
import { env } from "../config/env.js";

export const SESSION_COOKIE = "sa_session";
const SESSION_DAYS = 7;
const BCRYPT_ROUNDS = 12;

export type Role = "admin" | "moderator" | "user";

export type AuthUser = {
  id: string;
  email: string;
  full_name: string | null;
  roles: Role[];
  isAdmin: boolean;
};

type SessionPayload = { sub: string; pv: string };

/* ---------------- Passwords ---------------- */

export function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

// Used when the email doesn't exist, so a failed login takes the same time
// either way and doesn't reveal which emails are registered.
const DUMMY_HASH = bcrypt.hashSync("timing-safe-dummy-password", BCRYPT_ROUNDS);

export async function verifyPassword(password: string, hash: string | null | undefined): Promise<boolean> {
  // Migrated users without a password have a placeholder that isn't a bcrypt hash.
  const usable = !!hash && hash.startsWith("$2");
  const ok = await bcrypt.compare(password, usable ? hash : DUMMY_HASH);
  return usable && ok;
}

/* ---------------- Sessions (JWT in an HTTP-only cookie) ---------------- */

// A short fingerprint of the password hash. Changing a user's password
// changes it, which logs out every existing session for that user.
function passwordVersion(hash: string): string {
  return createHash("sha256").update(hash).digest("base64url").slice(0, 16);
}

export function createSessionToken(userId: string, passwordHash: string): string {
  const payload: SessionPayload = { sub: userId, pv: passwordVersion(passwordHash) };
  return jwt.sign(payload, env.jwtSecret, { expiresIn: `${SESSION_DAYS}d`, algorithm: "HS256" });
}

export function sessionCookieOptions(): CookieOptions {
  return {
    httpOnly: true,
    secure: env.isProduction,
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60 * 1000,
  };
}

/** Returns the logged-in user for a session token, or null if it's invalid. */
export async function getUserFromToken(token: string | undefined): Promise<AuthUser | null> {
  if (!token) return null;
  let payload: SessionPayload;
  try {
    payload = jwt.verify(token, env.jwtSecret, { algorithms: ["HS256"] }) as SessionPayload;
  } catch {
    return null;
  }

  const [rows] = (await db.query(
    "SELECT id, email, full_name, password_hash FROM users WHERE id = ? LIMIT 1",
    [payload.sub],
  )) as any;
  const user = rows[0];
  // User deleted, or password changed since this token was issued.
  if (!user || passwordVersion(user.password_hash) !== payload.pv) return null;

  const roles = await getRoles(user.id);
  return { id: user.id, email: user.email, full_name: user.full_name, roles, isAdmin: roles.includes("admin") };
}

/* ---------------- Users & roles ---------------- */

export async function getRoles(userId: string): Promise<Role[]> {
  const [rows] = (await db.query("SELECT role FROM user_roles WHERE user_id = ?", [userId])) as any;
  return rows.map((r: { role: Role }) => r.role);
}

export async function findUserByEmail(email: string) {
  const [rows] = (await db.query(
    "SELECT id, email, full_name, password_hash FROM users WHERE email = ? LIMIT 1",
    [email.trim().toLowerCase()],
  )) as any;
  return (rows[0] as { id: string; email: string; full_name: string | null; password_hash: string }) ?? null;
}

export async function grantRole(userId: string, role: Role): Promise<void> {
  await db.query("INSERT IGNORE INTO user_roles (id, user_id, role) VALUES (?, ?, ?)", [randomUUID(), userId, role]);
}
