import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
      "@lib": path.resolve(process.cwd(), "./src/lib"),
      "vite-env": path.resolve(__dirname, "src", "vite-env.d.ts"),
    },
  },
});
