import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Optional Whop Vite plugin for bundling into Whop cloud worker layout
let whopPlugin = null;
try {
  const { whop } = await import("@whop/cli/vite");
  whopPlugin = whop();
} catch (e) {
  // Graceful fallback for local development before deployment
}

export default defineConfig({
  plugins: [
    react(),
    ...(whopPlugin ? [whopPlugin] : []),
  ],
  build: {
    outDir: "dist/client",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: true,
  },
});
