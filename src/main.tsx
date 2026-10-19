import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Buffer } from 'buffer'
import './index.css'
import App from './App.tsx'

// 浏览器环境补齐 Node 全局 Buffer。
// gray-matter（frontmatter 解析）内部依赖全局 Buffer，浏览器无此内置对象。
const globalScope = globalThis as unknown as { Buffer?: typeof Buffer }
if (typeof globalScope.Buffer === 'undefined') {
  globalScope.Buffer = Buffer
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
