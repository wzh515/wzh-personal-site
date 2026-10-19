/**
 * 页脚：版权信息 + 简要说明。
 */
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-8">
      <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-muted sm:px-6">
        <p>© {new Date().getFullYear()} WZH · 个人展示网站</p>
        <p className="mt-1">用 React + TypeScript + Vite + Tailwind CSS 构建</p>
      </div>
    </footer>
  )
}
