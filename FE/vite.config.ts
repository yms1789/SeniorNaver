import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import EnvironmentPlugin from "vite-plugin-environment";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), EnvironmentPlugin("all")],
  build: {
    rollupOptions: {
      output: {
        // 콘솔 로그 비활성화
        intro: "console.clear();",
      },
    },
  },
  server: {
    proxy: {
      "/naver": {
        target: "https://openapi.naver.com",
        rewrite: path => path.replace(/^\/naver/, ""),
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
