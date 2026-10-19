import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { StarField } from '../StarField/StarField'
import { Navbar } from './Navbar'
import { Footer } from './Footer'

/**
 * 全局布局：星空背景 + 吸顶导航 + 内容区 + 页脚。
 * 同时负责路由切换与锚点平滑滚动。
 */
export function Layout() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    // 等待目标页面渲染后，平滑滚动到锚点
    const id = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
    })
    return () => cancelAnimationFrame(id)
  }, [pathname, hash])

  return (
    <div className="relative min-h-screen">
      <StarField />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
