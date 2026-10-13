// One-time (re-runnable) copy of all data and files from Supabase to MySQL.
//
//   npm run migrate:supabase              # tables + files
//   npm run migrate:supabase -- --no-files  # tables only
//
// Needs SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env.
//
// Safe to run again (e.g. on switch-over day): rows are upserted by id, and
// files that are already present locally with the same size are skipped
// without being downloaded again.
//
// Passwords: the Supabase API does not expose password hashes. To keep the
// existing admin passwords, run this in the Supabase SQL editor and download
// the result as CSV to backend/scripts/data/auth-users.csv, then re-run:
//
//   select id, email, encrypted_password from auth.users;
//
// Without that file, users are created with an unusable password and can be
// given a new one with the create-admin script (Step 4).
import "dotenv/config";
import { existsSync } from "node:fs";
import { mkdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { db } from "../src/config/db.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const UPLOADS_DIR = path.resolve(__dirname, "..", "uploads");
const AUTH_CSV = path.resolve(__dirname, "data", "auth-users.csv");
const BUCKETS = ["tutor-photos", "tutor-cvs"] as const;
const NO_PASSWORD = "!no-password";
const PAGE = 1000;

const skipFiles = process.argv.includes("--no-files");

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SUPABASE_URL || !SERVICE_KEY) {
  throw new Error("Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in backend/.env");
}
const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const JSON_COLUMNS = new Set(["subjects", "curriculums", "grade_levels", "languages", "education", "schedule"]);
const warnings: string[] = [];
const warn = (msg: string) => {
  warnings.push(msg);
  console.warn(`  ! ${msg}`);
};

/* ---------------------------------------------------------------- helpers */

async function fetchAll(table: string): Promise<any[]> {
  const rows: any[] = [];
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from(table)
      .select("*")
      .order("created_at", { ascending: true })
      .order("id", { ascending: true })
      .range(from, from + PAGE - 1);
    if (error) throw new Error(`Reading ${table} from Supabase failed: ${error.message}`);
    rows.push(...(data ?? []));
    if (!data || data.length < PAGE) break;
  }
  return rows;
}

const columnCache = new Map<string, Map<string, string>>();
async function mysqlColumns(table: string): Promise<Map<string, string>> {
  if (!columnCache.has(table)) {
    const [rows] = (await db.query(
      "SELECT column_name AS name, data_type AS type FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ?",
      [table],
    )) as any;
    columnCache.set(table, new Map(rows.map((r: any) => [r.name, r.type])));
  }
  return columnCache.get(table)!;
}

function toMysqlValue(column: string, type: string, value: unknown): unknown {
  if (value === null || value === undefined) return JSON_COLUMNS.has(column) ? "[]" : null;
  if (JSON_COLUMNS.has(column)) return JSON.stringify(value);
  if (type === "datetime" || type === "timestamp") return new Date(value as string);
  if (typeof value === "boolean") return value ? 1 : 0;
  return value;
}

/** Insert rows, or update them if the id already exists. */
async function upsert(table: string, rows: Record<string, unknown>[], keepExisting: string[] = []) {
  if (rows.length === 0) return;
  const cols = await mysqlColumns(table);

  // Any Supabase column we don't have in MySQL would be lost — make it loud.
  const unknown = new Set<string>();
  for (const row of rows) for (const k of Object.keys(row)) if (!cols.has(k)) unknown.add(k);
  if (unknown.size) warn(`${table}: Supabase columns not in MySQL (not copied): ${[...unknown].join(", ")}`);

  const names = [...cols.keys()].filter((c) => rows.some((r) => c in r));
  const updates = names
    .filter((c) => c !== "id")
    .map((c) =>
      keepExisting.includes(c)
        ? `\`${c}\` = IF(VALUES(\`${c}\`) = '${NO_PASSWORD}', \`${c}\`, VALUES(\`${c}\`))`
        : `\`${c}\` = VALUES(\`${c}\`)`,
    )
    .join(", ");
  const sql = `INSERT INTO \`${table}\` (${names.map((c) => `\`${c}\``).join(", ")}) VALUES ? ON DUPLICATE KEY UPDATE ${updates}`;

  for (let i = 0; i < rows.length; i += 200) {
    const batch = rows.slice(i, i + 200).map((r) => names.map((c) => toMysqlValue(c, cols.get(c)!, r[c])));
    await db.query(sql, [batch]);
  }
}

async function countMysql(table: string): Promise<number> {
  const [[row]] = (await db.query(`SELECT COUNT(*) AS n FROM \`${table}\``)) as any;
  return row.n;
}

async function loadAuthCsv(): Promise<Map<string, string>> {
  const hashes = new Map<string, string>();
  if (!existsSync(AUTH_CSV)) return hashes;
  const lines = (await readFile(AUTH_CSV, "utf8")).split(/\r?\n/).filter((l) => l.trim());
  const header = lines.shift()!.split(",").map((h) => h.trim().replace(/^"|"$/g, ""));
  const idIdx = header.indexOf("id");
  const hashIdx = header.indexOf("encrypted_password");
  if (idIdx < 0 || hashIdx < 0) throw new Error(`${AUTH_CSV} must have "id" and "encrypted_password" columns`);
  for (const line of lines) {
    const cells = line.split(",").map((c) => c.trim().replace(/^"|"$/g, ""));
    if (cells[idIdx] && cells[hashIdx]?.startsWith("$2")) hashes.set(cells[idIdx], cells[hashIdx]);
  }
  return hashes;
}

/* ---------------------------------------------------------------- tables */

const counts: { table: string; supabase: number; mysql: number }[] = [];

async function migrateUsers(): Promise<Set<string>> {
  console.log("\nusers (auth.users + profiles)");
  const authUsers: any[] = [];
  for (let page = 1; ; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: PAGE });
    if (error) throw new Error(`Listing Supabase auth users failed: ${error.message}`);
    authUsers.push(...data.users);
    if (data.users.length < PAGE) break;
  }
  const profiles = new Map((await fetchAll("profiles")).map((p) => [p.id, p]));
  const hashes = await loadAuthCsv();
  if (existsSync(AUTH_CSV)) console.log(`  using password hashes from scripts/data/auth-users.csv (${hashes.size} found)`);

  const rows: Record<string, unknown>[] = [];
  for (const u of authUsers) {
    if (!u.email) {
      warn(`users: skipped ${u.id} (no email address)`);
      continue;
    }
    rows.push({
      id: u.id,
      email: u.email.toLowerCase(),
      password_hash: hashes.get(u.id) ?? NO_PASSWORD,
      full_name: profiles.get(u.id)?.full_name ?? u.user_metadata?.full_name ?? null,
      last_login_at: u.last_sign_in_at ?? null,
      created_at: u.created_at,
      updated_at: u.updated_at ?? u.created_at,
    });
  }
  await upsert("users", rows, ["password_hash"]);
  const withoutPassword = rows.filter((r) => r.password_hash === NO_PASSWORD).length;
  if (withoutPassword) warn(`users: ${withoutPassword} of ${rows.length} have no password yet (see note at top of script)`);
  counts.push({ table: "users", supabase: authUsers.length, mysql: await countMysql("users") });
  return new Set(rows.map((r) => r.id as string));
}

async function migrateTable(
  table: string,
  transform: (row: any) => Record<string, unknown> | null = (r) => r,
) {
  console.log(`\n${table}`);
  const source = await fetchAll(table);
  const rows = source.map(transform).filter((r): r is Record<string, unknown> => r !== null);
  await upsert(table, rows);
  counts.push({ table, supabase: source.length, mysql: await countMysql(table) });
  console.log(`  ${rows.length} rows copied`);
}

/* ---------------------------------------------------------------- files */

type RemoteFile = { path: string; size: number | null };

async function listBucket(bucket: string, prefix = ""): Promise<RemoteFile[]> {
  const files: RemoteFile[] = [];
  for (let offset = 0; ; offset += PAGE) {
    const { data, error } = await supabase.storage.from(bucket).list(prefix, {
      limit: PAGE,
      offset,
      sortBy: { column: "name", order: "asc" },
    });
    if (error) throw new Error(`Listing ${bucket}/${prefix} failed: ${error.message}`);
    for (const item of data ?? []) {
      const full = prefix ? `${prefix}/${item.name}` : item.name;
      if (item.id === null) files.push(...(await listBucket(bucket, full))); // folder
      else if (item.name !== ".emptyFolderPlaceholder") {
        const size = (item.metadata as { size?: number } | null)?.size;
        files.push({ path: full, size: typeof size === "number" ? size : null });
      }
    }
    if (!data || data.length < PAGE) break;
  }
  return files;
}

async function migrateFiles() {
  for (const bucket of BUCKETS) {
    console.log(`\nfiles: ${bucket}`);
    const files = await listBucket(bucket);
    let downloaded = 0;
    let skipped = 0;
    for (const { path: file, size } of files) {
      const dest = path.join(UPLOADS_DIR, bucket, ...file.split("/"));
      if (!dest.startsWith(path.join(UPLOADS_DIR, bucket) + path.sep)) {
        warn(`${bucket}: skipped suspicious path "${file}"`);
        continue;
      }
      // Already downloaded with the same size? Skip without downloading again.
      const existing = await stat(dest).catch(() => null);
      if (existing && size !== null && existing.size === size) {
        skipped++;
        continue;
      }
      const { data, error } = await supabase.storage.from(bucket).download(file);
      if (error || !data) {
        warn(`${bucket}: could not download "${file}": ${error?.message ?? "no data"}`);
        continue;
      }
      const buf = Buffer.from(await data.arrayBuffer());
      await mkdir(path.dirname(dest), { recursive: true });
      await writeFile(dest, buf);
      downloaded++;
    }
    console.log(`  ${files.length} files in bucket — ${downloaded} downloaded, ${skipped} already present`);
  }
}

/** Every file path stored in the database should now exist on disk. */
async function verifyFileReferences() {
  console.log("\nchecking file references in the database");
  const refs: { bucket: string; path: string; where: string }[] = [];
  const [apps] = (await db.query(
    "SELECT id, photo_path, cv_path, cnic_front_path, cnic_back_path FROM tutor_applications",
  )) as any;
  for (const a of apps) {
    if (a.photo_path) refs.push({ bucket: "tutor-photos", path: a.photo_path, where: `application ${a.id} photo` });
    if (a.cv_path) refs.push({ bucket: "tutor-cvs", path: a.cv_path, where: `application ${a.id} CV` });
    if (a.cnic_front_path) refs.push({ bucket: "tutor-cvs", path: a.cnic_front_path, where: `application ${a.id} CNIC front` });
    if (a.cnic_back_path) refs.push({ bucket: "tutor-cvs", path: a.cnic_back_path, where: `application ${a.id} CNIC back` });
  }
  const [tutors] = (await db.query("SELECT id, slug, photo_url FROM tutors")) as any;
  for (const t of tutors) {
    if (t.photo_url && !/^https?:\/\//.test(t.photo_url)) {
      refs.push({ bucket: "tutor-photos", path: t.photo_url, where: `tutor ${t.slug} photo` });
    }
  }
  let missing = 0;
  for (const r of refs) {
    if (!existsSync(path.join(UPLOADS_DIR, r.bucket, ...r.path.split("/")))) {
      missing++;
      warn(`missing file for ${r.where}: ${r.bucket}/${r.path}`);
    }
  }
  console.log(`  ${refs.length} file references, ${missing} missing`);
}

/* ---------------------------------------------------------------- run */

try {
  const [[{ db: dbName }]] = (await db.query("SELECT DATABASE() AS db")) as any;
  console.log(`Copying Supabase -> MySQL database "${dbName}"`);

  const userIds = await migrateUsers();
  const userOrNull = (id: string | null, label: string) => {
    if (id && !userIds.has(id)) {
      warn(`${label} references unknown user ${id} — set to NULL`);
      return null;
    }
    return id;
  };

  await migrateTable("user_roles", (r) => {
    if (!userIds.has(r.user_id)) {
      warn(`user_roles: skipped role "${r.role}" for unknown user ${r.user_id}`);
      return null;
    }
    return r;
  });
  await migrateTable("tutor_applications", (r) => ({
    ...r,
    reviewed_by: userOrNull(r.reviewed_by, `application ${r.id} reviewed_by`),
  }));
  await migrateTable("tutors");
  await migrateTable("trial_bookings");
  await migrateTable("contact_messages");

  if (skipFiles) console.log("\nfiles: skipped (--no-files)");
  else await migrateFiles();
  await verifyFileReferences();

  console.log("\n================ Summary ================");
  console.log("table                 supabase   mysql");
  for (const c of counts) {
    const flag = c.mysql < c.supabase ? "  <-- fewer rows in MySQL" : "";
    console.log(`${c.table.padEnd(20)} ${String(c.supabase).padStart(9)} ${String(c.mysql).padStart(7)}${flag}`);
  }
  console.log(warnings.length ? `\n${warnings.length} warning(s) — see "!" lines above.` : "\nNo warnings.");
} finally {
  await db.end();
}
