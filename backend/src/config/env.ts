import "dotenv/config";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name} (see backend/.env.example)`);
  return value;
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  isProduction: process.env.NODE_ENV === "production",
  frontendUrls: (process.env.FRONTEND_URL ?? "http://localhost:8080")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  db: {
    host: process.env.DB_HOST ?? "localhost",
    port: Number(process.env.DB_PORT ?? 3306),
    user: required("DB_USER"),
    password: process.env.DB_PASSWORD ?? "",
    database: required("DB_NAME"),
  },
  jwtSecret: required("JWT_SECRET"),
  // Public URL of this API (e.g. https://api.thebestscienceacademy.com), used in
  // file links. When unset, it's taken from the incoming request.
  publicApiUrl: process.env.PUBLIC_API_URL?.replace(/\/+$/, "") || undefined,
};
