import { defineConfig } from 'vite';

// base: './' 讓 build 出來的檔案可以直接被 Capacitor / 任何靜態主機載入
export default defineConfig({
  base: './',
  server: {
    port: 5173,
    // 允許 GitHub Codespaces 的轉發網址開啟開發伺服器
    allowedHosts: ['.app.github.dev'],
  },
});
