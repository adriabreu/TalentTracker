import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// Recriar __dirname para ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração simplificada para evitar conflitos ESM/CommonJS
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client/src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets"),
    },
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
    proxy: {
      // Redirect auth and other main API calls to the main backend server
      '/api/auth': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      '/api/candidates': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
      
      // Redirect the /api/skills call to our new microservice
      '/api/skills': {
        target: 'http://localhost:3003',
        changeOrigin: true,
        secure: false,
      },
      
      // Fallback for all other API routes
      '^/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      }
    },
  },
});