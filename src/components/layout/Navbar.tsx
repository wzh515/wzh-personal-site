import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

interface NavItem {
  label: string
  to: string
}

const NAV_ITEMS: NavItem[] = [
  { label: '首页', to: '/#home' },
  { label: '关于', to: '/#about' },
  { label: '技能', to: '/#skills' },
  { label: '项目', to: '/#projects' },
  { label: '博客', to: '/blog' },
  { label: '联系', to: '/#contact' },
]

/**
 * 吸顶毛玻璃导航栏。
 * 桌面端横向菜单；移动端（< md）折叠为汉堡菜单。
 */
export function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // 路由变化时自动收起移动端菜单
  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-bg/60 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link to="/#home" className="text-lg font-semibold text-fg">
          WZH<span className="text-accent">.dev</span>
        </Link>

        {/* 桌面菜单 */}
        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="text-sm text-muted transition-colors duration-200 hover:text-fg"
                style={{ transitionTimingFunction: 'var(--ease)' }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* 汉堡按钮（移动端） */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] text-fg hover:bg-white/5 md:hidden"
          aria-label={open ? '关闭菜单' : '打开菜单'}
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* 移动端折叠菜单 */}
      {open && (
        <div
          id="mobile-menu"
          className="border-t border-white/10 bg-bg/90 backdrop-blur-md md:hidden"
        >
          <ul className="flex flex-col px-4 py-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className="border-b border-white/5 last:border-0">
                <Link
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-sm text-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
