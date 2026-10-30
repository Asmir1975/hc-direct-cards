import { defineConfig } from "vite";
import { readFileSync } from "node:fs";

const notices = "/*!\n" + readFileSync(new URL("./LICENSE", import.meta.url), "utf8")
  + "\nBundled Lit packages:\n"
  + readFileSync(new URL("./docs/legal/LIT_BSD_3_CLAUSE.txt", import.meta.url), "utf8")
  + "\n*/\n";

export default defineConfig({
  plugins: [{
    name: "standalone-license-notices",
    generateBundle(_options, bundle) {
      for (const output of Object.values(bundle)) {
        if (output.type === "chunk") output.code = notices + output.code;
      }
    },
  }],
  build: {
    lib: { entry: "src/index.ts", formats: ["es"], fileName: () => "home-connect-direct-cards.js" },
    sourcemap: false,
    minify: "esbuild",
    target: "es2022",
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
