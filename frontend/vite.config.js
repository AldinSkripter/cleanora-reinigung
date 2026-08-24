import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  envPrefix: "REACT_APP_",
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  server: {
    port: 3000,
    host: true,
    allowedHosts: true,
  },
  build: {
    outDir: "build",
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: "react-vendor",
              test: /node_modules[\\/](react|react-dom|react-router|react-router-dom|scheduler)/,
              priority: 20,
            },
            {
              name: "motion",
              test: /node_modules[\\/](framer-motion|motion)/,
              priority: 10,
            },
          ],
        },
      },
    },
  },
});
