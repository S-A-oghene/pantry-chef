import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/pantry-chef/",
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        recipe: resolve(__dirname, "src/recipe/index.html"),
        detail: resolve(__dirname, "src/recipe/detail.html"),
        favorites: resolve(__dirname, "src/favorites/index.html"),
        tips: resolve(__dirname, "src/tips/index.html"),
      },
    },
  },
});
