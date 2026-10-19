import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface Star {
  x: number
  y: number
  r: number
  baseAlpha: number
  twinkleSpeed: number
  twinklePhase: number
  depth: number
}

const STAR_RGB = '230, 234, 242' // #E6EAF2

/**
 * Canvas 星空粒子背景。
 * - 粒子缓慢闪烁（透明度周期性变化）
 * - 视差效果（鼠标轻微位移 + 滚动分层偏移）
 * - 移动端自动减少粒子数量
 * - 尊重 prefers-reduced-motion（静态显示）
 * - 页面不可见时暂停动画循环
 */
export function StarField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let stars: Star[] = []
    let rafId = 0
    let running = true
    let width = 0
    let height = 0
    let pointerX = 0 // -0.5 ~ 0.5
    let pointerY = 0 // -0.5 ~ 0.5
    let scrollY = window.scrollY

    const isMobile = () => window.matchMedia('(max-width: 640px)').matches

    const initStars = () => {
      const area = width * height
      // 桌面约 1 颗 / 5500px²，移动端降低密度（约 1 颗 / 10000px²）
      const density = isMobile() ? 1 / 10000 : 1 / 5500
      const cap = isMobile() ? 80 : 220
      const count = Math.min(Math.floor(area * density), cap)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        baseAlpha: Math.random() * 0.5 + 0.25,
        twinkleSpeed: Math.random() * 1.5 + 0.4,
        twinklePhase: Math.random() * Math.PI * 2,
        depth: Math.random() * 0.6 + 0.1,
      }))
    }

    const resize = () => {
      // 限制 devicePixelRatio，避免高 DPR 设备绘制压力过大
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars()
    }

    const wrap = (v: number, max: number) => {
      if (v < 0) return v + max
      if (v >= max) return v - max
      return v
    }

    const draw = (t: number) => {
      if (!running) return
      ctx.clearRect(0, 0, width, height)

      const time = t / 1000
      // 视差偏移：鼠标 ±24/16px，滚动向上轻微分层
      const offsetX = pointerX * 24
      const offsetY = pointerY * 16 - scrollY * 0.05

      for (const s of stars) {
        let alpha = s.baseAlpha
        let x = s.x
        let y = s.y

        if (reducedMotion) {
          // 减弱动画：静态显示，无闪烁、无视差
        } else {
          alpha = s.baseAlpha * (0.6 + 0.4 * Math.sin(time * s.twinkleSpeed + s.twinklePhase))
          x = wrap(s.x + offsetX * s.depth, width)
          y = wrap(s.y + offsetY * s.depth, height)
        }

        ctx.beginPath()
        ctx.arc(x, y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${STAR_RGB}, ${alpha.toFixed(3)})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }

    const onPointerMove = (e: PointerEvent) => {
      pointerX = e.clientX / width - 0.5
      pointerY = e.clientY / height - 0.5
    }
    const onScroll = () => {
      scrollY = window.scrollY
    }
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId)
        running = false
      } else if (!running) {
        running = true
        rafId = requestAnimationFrame(draw)
      }
    }

    resize()
    rafId = requestAnimationFrame(draw)

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(rafId)
      running = false
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [reducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10"
      aria-hidden="true"
    />
  )
}
