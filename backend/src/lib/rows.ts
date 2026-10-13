import { parseJson } from "../config/db.js";

// Columns stored as JSON. MariaDB returns them as strings, so parse them back
// into arrays — the frontend gets exactly what Supabase used to return.
const JSON_COLUMNS = ["subjects", "curriculums", "grade_levels", "languages", "education", "schedule"] as const;

export function withParsedJson<T extends Record<string, any>>(row: T): T {
  const out: Record<string, any> = { ...row };
  for (const col of JSON_COLUMNS) {
    if (col in out) out[col] = parseJson(out[col], []);
  }
  return out as T;
}

/** Turn values from a validated patch/insert into MySQL-ready values. */
export function toDbValue(column: string, value: unknown): unknown {
  if ((JSON_COLUMNS as readonly string[]).includes(column)) return JSON.stringify(value ?? []);
  if (typeof value === "boolean") return value ? 1 : 0;
  return value;
}
