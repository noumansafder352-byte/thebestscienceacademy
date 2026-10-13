import { Router } from "express";
import rateLimit from "express-rate-limit";
import { z } from "zod";
import { db } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";
import {
  createSessionToken,
  findUserByEmail,
  getRoles,
  SESSION_COOKIE,
  sessionCookieOptions,
  verifyPassword,
} from "../services/auth.js";

export const authRouter = Router();

// 10 failed login attempts per IP per 15 minutes. Successful logins don't count.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { error: "Too many login attempts. Please try again in 15 minutes." },
});

const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(160),
  password: z.string().min(1).max(200),
});

/** POST /api/auth/login  { email, password } */
authRouter.post("/login", loginLimiter, async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Please enter a valid email and password." });
    return;
  }
  const { email, password } = parsed.data;

  const user = await findUserByEmail(email);
  const ok = await verifyPassword(password, user?.password_hash);
  if (!user || !ok) {
    res.status(401).json({ error: "Invalid email or password." });
    return;
  }

  await db.query("UPDATE users SET last_login_at = UTC_TIMESTAMP(6) WHERE id = ?", [user.id]);
  res.cookie(SESSION_COOKIE, createSessionToken(user.id, user.password_hash), sessionCookieOptions());

  const roles = await getRoles(user.id);
  res.json({
    user: { id: user.id, email: user.email, full_name: user.full_name },
    isAdmin: roles.includes("admin"),
    userId: user.id,
  });
});

/** POST /api/auth/logout */
authRouter.post("/logout", (_req, res) => {
  const { maxAge: _maxAge, ...options } = sessionCookieOptions();
  res.clearCookie(SESSION_COOKIE, options);
  res.json({ ok: true });
});

/**
 * GET /api/auth/me
 * Replaces the old getIsAdmin server function — same { isAdmin, userId } shape,
 * plus the user's details. Returns 401 when not signed in.
 */
authRouter.get("/me", requireAuth, (req, res) => {
  const u = req.user!;
  res.json({
    user: { id: u.id, email: u.email, full_name: u.full_name },
    isAdmin: u.isAdmin,
    userId: u.id,
  });
});
