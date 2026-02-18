import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` being run
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    // Dynamically set base URL based on environment
    // GitHub Pages requires /pantry-chef/, local development uses /
    base: process.env.NODE_ENV === "production" ? "/pantry-chef/" : "/",
    root: "src/",
    define: {
      __VITE_ENV__: JSON.stringify(env),
    },
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
  };
});
