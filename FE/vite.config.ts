import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import EnvironmentPlugin from "vite-plugin-environment";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  server: {
    proxy: {
      "/api": {
        target: "https://openapi.naver.com",
        rewrite: path => path.replace(/^\/api/, ""),
        changeOrigin: true,
      },
      "/api": {
        target: "http://k9d105.p.ssafy.io:9999",
        rewrite: path => path.replace(/^\/api/, ""),
        changeOrigin: true,
      },
    },
  },
});
