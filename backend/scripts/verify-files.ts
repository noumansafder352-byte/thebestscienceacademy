// Checks that every file in Supabase Storage exists locally with the same size
// (and reports extra local files).   npm run verify:files
import "dotenv/config";
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@supabase/supabase-js";
import { db } from "../src/config/db.js";

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });

async function remote(bucket: string, prefix = ""): Promise<Map<string, number>> {
  const out = new Map<string, number>();
  for (let offset = 0; ; offset += 1000) {
    const { data, error } = await sb.storage.from(bucket).list(prefix, { limit: 1000, offset });
    if (error) throw error;
    for (const it of data ?? []) {
      const full = prefix ? `${prefix}/${it.name}` : it.name;
      if (it.id === null) for (const [k, v] of await remote(bucket, full)) out.set(k, v);
      else if (it.name !== ".emptyFolderPlaceholder") out.set(full, (it.metadata as any)?.size ?? -1);
    }
    if (!data || data.length < 1000) break;
  }
  return out;
}

async function local(dir: string, base = dir): Promise<Map<string, number>> {
  const out = new Map<string, number>();
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) for (const [k, v] of await local(full, base)) out.set(k, v);
    else if (e.name !== ".gitkeep") out.set(path.relative(base, full).split(path.sep).join("/"), (await stat(full)).size);
  }
  return out;
}

for (const bucket of ["tutor-photos", "tutor-cvs"]) {
  const r = await remote(bucket);
  const l = await local(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "uploads", bucket));
  const missing = [...r.keys()].filter((k) => !l.has(k));
  const extra = [...l.keys()].filter((k) => !r.has(k));
  const sizeDiff = [...r.keys()].filter((k) => l.has(k) && r.get(k) !== l.get(k));
  console.log(`${bucket}: supabase ${r.size}, local ${l.size}, missing ${missing.length}, extra ${extra.length}, size mismatch ${sizeDiff.length}`);
  for (const k of [...missing, ...extra, ...sizeDiff].slice(0, 10)) console.log("   ", k);
}
const [rows]: any = await db.query("SELECT COUNT(*) n FROM tutor_applications");
console.log("applications in MySQL:", rows[0].n);
await db.end();
