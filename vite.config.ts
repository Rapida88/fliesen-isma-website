import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative base so the build works under a sub-path (GitHub Pages) or a custom domain.
  base: "./",
  plugins: [react(), tailwindcss()],
});
