import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        favrecipes: resolve(__dirname, "src/fav-recipes/index.html"),
        recipe: resolve(__dirname, "src/recipe/index.html"),
        recipelist: resolve(__dirname, "src/recipe-listing/index.html"),
      },
    },
  },
});
