import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { listTutorSlugs } from "@/lib/tutor-api.functions";

const BASE_URL = "";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        // If the API is unreachable, still serve the static pages.
        const tutors = await listTutorSlugs().catch((err) => {
          console.error("[sitemap] could not load tutor slugs:", err);
          return [];
        });
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/programs", changefreq: "monthly", priority: "0.9" },
          { path: "/subjects", changefreq: "monthly", priority: "0.9" },
          { path: "/tutors", changefreq: "weekly", priority: "0.9" },
          { path: "/become-a-tutor", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          ...(tutors ?? []).map((t) => ({ path: `/tutors/${t.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
        ];

        const urls = entries.map((e) => `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`);
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;

        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
