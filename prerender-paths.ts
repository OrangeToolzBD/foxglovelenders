// Per-site list of every URL to prerender to static HTML for R2 hosting.
// Kept in sync with the sitemap source of truth in src/lib/seo-sitemap.ts.
// vite.config.ts feeds this into tanstackStart.pages so the static build
// renders one index.html per route. Use RELATIVE imports only — this module
// is bundled by esbuild when Vite loads the config (the `@/` alias is unknown there).
import { INDUSTRIES } from "./src/lib/industries-data";
import { PILLARS, TOP_MONEY_PILLARS } from "./src/lib/pillars-data";
import { SUBURBS } from "./src/lib/suburbs-data";

const suburbPillarPairs: string[] = [];
for (const s of SUBURBS) {
  for (const p of TOP_MONEY_PILLARS) {
    suburbPillarPairs.push(`/san-antonio/${s.slug}/${p.slug}`);
  }
}

export const prerenderPaths: string[] = [
  "/",
  "/contact",
  "/apply-now",
  "/san-antonio",
  // SSR route handlers — listing them forces Nitro to bake them to static files.
  "/sitemap.xml",
  "/robots.txt",
  ...INDUSTRIES.map((i) => `/industry/${i.slug}`),
  ...PILLARS.map((p) => `/pillar/${p.slug}`),
  ...SUBURBS.map((s) => `/san-antonio/${s.slug}`),
  ...suburbPillarPairs,
];
