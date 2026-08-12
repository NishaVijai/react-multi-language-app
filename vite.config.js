import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    // Keep CRA's output dir so Netlify publish directory ("build") stays unchanged
    outDir: "build"
  }
});