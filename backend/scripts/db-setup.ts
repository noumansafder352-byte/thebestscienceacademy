// Creates the database (if missing) and applies sql/schema.sql.
// Safe to re-run: every statement uses IF NOT EXISTS.
//
//   npm run db:setup
import "dotenv/config";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.resolve(__dirname, "..", "sql", "schema.sql");

const dbName = process.env.DB_NAME;
if (!dbName || !/^[A-Za-z0-9_]+$/.test(dbName)) {
  throw new Error("DB_NAME must be set in backend/.env (letters, numbers and _ only)");
}

const conn = await mysql.createConnection({
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD ?? "",
  multipleStatements: true,
});

try {
  const [[{ version }]] = (await conn.query("SELECT VERSION() AS version")) as any;
  console.log(`Connected to ${version}`);

  await conn.query(
    `CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`,
  );
  await conn.query(`USE \`${dbName}\``);
  await conn.query("SET SESSION sql_mode = 'STRICT_ALL_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,NO_ENGINE_SUBSTITUTION'");

  const schema = await readFile(schemaPath, "utf8");
  await conn.query(schema);

  const [tables] = (await conn.query(
    "SELECT table_name AS name, table_rows AS approx_rows FROM information_schema.tables WHERE table_schema = ? ORDER BY table_name",
    [dbName],
  )) as any;
  console.log(`Database "${dbName}" is ready with ${tables.length} tables:`);
  for (const t of tables) console.log(`  - ${t.name}`);
} finally {
  await conn.end();
}
