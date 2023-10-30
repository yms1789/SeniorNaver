import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import EnvironmentPlugin from "vite-plugin-environment";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  server: {
    proxy: {
      "/naver": {
        target: "https://openapi.naver.com",
        rewrite: path => path.replace(/^\/naver/, ""),
        changeOrigin: true,
      },
    },
  },
});
