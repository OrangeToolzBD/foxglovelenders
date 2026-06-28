// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { prerenderPaths } from "./prerender-paths";

export default defineConfig({
  // Disable Nitro so the SSR bundle lands in dist/server/server.js where the
  // preview-server-plugin expects it during the prerender crawl.
  nitro: false,
  vite: {
    plugins: [
      {
        name: "strip-prerender-trailing-slash",
        // Strip trailing slashes before the app sees them so the sitemap.xml
        // and robots.txt H3 event handlers (registered for exact paths) match.
        configurePreviewServer(server) {
          server.middlewares.use((req, _res, next) => {
            if (req.url && req.url !== "/" && req.url.endsWith("/")) {
              req.url = req.url.replace(/\/+$/, "");
            }
            next();
          });
        },
      },
    ],
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
    // Static prerender: bake one index.html per listed route for R2 hosting.
    pages: prerenderPaths.map((path) => ({ path })),
    prerender: { enabled: true },
  },
});
