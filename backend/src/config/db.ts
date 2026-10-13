import mysql from "mysql2/promise";
import { env } from "./env.js";

// Shared connection pool. Always pass values as `?` placeholders —
// never build SQL by string concatenation.
export const db = mysql.createPool({
  host: env.db.host,
  port: env.db.port,
  user: env.db.user,
  password: env.db.password,
  database: env.db.database,
  connectionLimit: 10,
  // Store and read all DATETIME values as UTC.
  timezone: "Z",
  charset: "utf8mb4",
  // Return DECIMAL columns (e.g. tutors.rating) as numbers, like Supabase did.
  decimalNumbers: true,
  // Return TINYINT(1) columns (is_active, is_featured) as true/false.
  typeCast(field, next) {
    if (field.type === "TINY" && field.length === 1) {
      const value = field.string();
      return value === null ? null : value === "1";
    }
    return next();
  },
});

// XAMPP's MariaDB defaults to a non-strict sql_mode, which silently truncates
// long text and turns invalid ENUM values into ''. Force strict mode so bad
// data fails loudly instead.
db.pool.on("connection", (conn) => {
  conn.query(
    "SET SESSION sql_mode = 'STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION'",
  );
});

// JSON columns: MySQL returns them already parsed, but MariaDB stores JSON as
// LONGTEXT and returns a string. Use this when reading JSON columns so both work.
export function parseJson<T>(value: unknown, fallback: T): T {
  if (value === null || value === undefined) return fallback;
  if (typeof value !== "string") return value as T;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export async function pingDb(): Promise<void> {
  await db.query("SELECT 1");
}
