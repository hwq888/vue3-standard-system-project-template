import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './', // 配置相对路由
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/css/theme/handleThemes.scss";`, // 整个应用程序中共享scss变量
      }
    }
  },
  server: {
    host: '0.0.0.0', // IP可访问
    cors: true, // 默认启用并允许任何源
    open: false, // 在服务器启动时自动在浏览器中打开应用程序
    port: 5173,
    proxy: {
      '^/sso-service': {
        target: 'http://sso.qmwallet.vip',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/sso-service/, '/sso-service')
      },
      '^/machine-learning-admin': {
        target: 'http://learning.qmwallet.vip/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/machine-learning-admin/, '/machine-learning-admin')
      }
    }
  }
})
