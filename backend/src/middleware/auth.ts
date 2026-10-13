import type { RequestHandler } from "express";
import { getUserFromToken, SESSION_COOKIE } from "../services/auth.js";

// The user is re-read from the database on every request, so deleting a user
// or removing their admin role takes effect immediately.

/** Requires a valid login. Sets req.user. */
export const requireAuth: RequestHandler = async (req, res, next) => {
  const user = await getUserFromToken(req.cookies?.[SESSION_COOKIE]);
  if (!user) {
    res.status(401).json({ error: "Unauthorized: please sign in" });
    return;
  }
  req.user = user;
  next();
};

/** Requires a valid login with the admin role. Sets req.user. */
export const requireAdmin: RequestHandler = async (req, res, next) => {
  const user = await getUserFromToken(req.cookies?.[SESSION_COOKIE]);
  if (!user) {
    res.status(401).json({ error: "Unauthorized: please sign in" });
    return;
  }
  if (!user.isAdmin) {
    res.status(403).json({ error: "Forbidden: admin role required" });
    return;
  }
  req.user = user;
  next();
};
