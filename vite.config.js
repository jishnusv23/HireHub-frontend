// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path";
// // https://vitejs.dev/config/
// export default defineConfig({
//     plugins: [react()],
//     resolve: {
//         alias: {
//             "@": path.resolve(process.cwd(), "./src"),
//             "@lib": path.resolve(process.cwd(), "./src/lib"),
//             "vite-env": path.resolve(__dirname, "src", "vite-env.d.ts"),
//         },
//     },
//     define: {
//         global: {},
//     },
// });

import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    strictPort: true,
    port: 5173,
  },
});