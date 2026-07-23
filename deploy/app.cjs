/*
 * cPanel "Setup Node.js App" (Passenger) startup file.
 *
 * Passenger loads this file with CommonJS `require`, so it MUST stay a .cjs
 * file. It dynamically imports the ESM Nitro server, which starts an HTTP
 * listener that Passenger routes traffic to automatically — do not set PORT
 * yourself.
 *
 * Layout expected in the Application Root (the contents of the build's
 * `.output` folder are uploaded flat, next to this file):
 *
 *   <app root>/
 *   ├── server/          (from .output/server)
 *   ├── public/          (from .output/public)
 *   ├── nitro.json       (from .output/nitro.json)
 *   ├── app.cjs          (this file)
 *   └── package.json
 */
import("./server/index.mjs").catch((err) => {
  console.error("[startup] Failed to boot the server:", err);
  process.exit(1);
});
