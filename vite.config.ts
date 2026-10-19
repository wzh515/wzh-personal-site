import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // gray-matter -> js-yaml 依赖 Node 内置模块 buffer，
      // 浏览器环境无此模块，用 npm 的 buffer polyfill 替代。
      buffer: 'buffer/',
    },
  },
})
