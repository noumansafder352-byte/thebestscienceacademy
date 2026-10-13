// Create an admin, or set a new password for an existing user and make them admin.
//
//   npm run create-admin -- --email you@example.com --password "YourStrongPass123"
//   npm run create-admin -- --email you@example.com --name "Your Name"   (password is generated)
//   npm run create-admin -- --list                                        (show users and roles)
//   npm run create-admin -- --email old@example.com --revoke              (remove admin role)
//
// Setting a password logs that user out of every existing session.
import { randomBytes, randomUUID } from "node:crypto";
import { parseArgs } from "node:util";
import { db } from "../src/config/db.js";
import { findUserByEmail, getRoles, grantRole, hashPassword } from "../src/services/auth.js";

const { values: args } = parseArgs({
  options: {
    email: { type: "string" },
    password: { type: "string" },
    name: { type: "string" },
    list: { type: "boolean", default: false },
    revoke: { type: "boolean", default: false },
  },
});

async function listUsers() {
  const [rows] = (await db.query(
    `SELECT u.email, u.full_name, u.last_login_at,
            LEFT(u.password_hash, 2) = '$2' AS has_password,
            GROUP_CONCAT(r.role ORDER BY r.role) AS roles
       FROM users u LEFT JOIN user_roles r ON r.user_id = u.id
      GROUP BY u.id ORDER BY u.created_at`,
  )) as any;
  console.log(`\n${rows.length} user(s):\n`);
  for (const r of rows) {
    console.log(
      `  ${r.email.padEnd(38)} roles: ${(r.roles ?? "-").padEnd(16)} password: ${r.has_password ? "set" : "NOT SET"}` +
        (r.last_login_at ? `   last login: ${r.last_login_at.toISOString().slice(0, 16).replace("T", " ")}` : ""),
    );
  }
  console.log();
}

async function main() {
  if (args.list) return listUsers();

  const email = args.email?.trim().toLowerCase();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Pass a valid email, e.g. npm run create-admin -- --email you@example.com --password "..."');
  }

  if (args.revoke) {
    const user = await findUserByEmail(email);
    if (!user) throw new Error(`No user with email ${email}`);
    await db.query("DELETE FROM user_roles WHERE user_id = ? AND role = 'admin'", [user.id]);
    console.log(`Removed admin role from ${email}.`);
    return;
  }

  const generated = !args.password;
  const password = args.password ?? randomBytes(12).toString("base64url");
  if (password.length < 8) throw new Error("Password must be at least 8 characters.");

  const passwordHash = await hashPassword(password);
  let user = await findUserByEmail(email);

  if (user) {
    await db.query("UPDATE users SET password_hash = ?, full_name = COALESCE(?, full_name) WHERE id = ?", [
      passwordHash,
      args.name ?? null,
      user.id,
    ]);
    console.log(`Updated password for existing user ${email}.`);
  } else {
    const id = randomUUID();
    await db.query("INSERT INTO users (id, email, password_hash, full_name) VALUES (?, ?, ?, ?)", [
      id,
      email,
      passwordHash,
      args.name ?? null,
    ]);
    user = { id, email, full_name: args.name ?? null, password_hash: passwordHash };
    console.log(`Created user ${email}.`);
  }

  await grantRole(user.id, "admin");
  console.log(`Roles: ${(await getRoles(user.id)).join(", ")}`);
  if (generated) {
    console.log(`\nGenerated password (shown once — save it now):\n\n    ${password}\n`);
  }
}

try {
  await main();
} catch (err: any) {
  console.error(`Error: ${err?.message ?? err}`);
  process.exitCode = 1;
} finally {
  await db.end();
}
