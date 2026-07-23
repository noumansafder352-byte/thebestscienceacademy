// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  // Build a self-contained Node.js server at .output/server/index.mjs so the app
  // can run under cPanel "Setup Node.js App" (Passenger). Override with the
  // NITRO_PRESET env var if deploying elsewhere. This is ignored inside the
  // Lovable sandbox, which always targets Cloudflare.
  nitro: { preset: process.env.NITRO_PRESET ?? "node-server" },
});
