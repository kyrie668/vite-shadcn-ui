import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8888,
    cors: true, // 允许跨域
    hmr: true, // 开启热更新
    proxy: {
      "/api": {
        target: "http://baidu.com", // 设置要代理到的主机名
        changeOrigin: true,
      },
    },
  },
  base: './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
