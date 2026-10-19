import type { ReactNode } from 'react'

interface TagProps {
  children: ReactNode
  className?: string
}

/**
 * 标签组件：圆角 12px（rounded-control），用于技术标签等。
 */
export function Tag({ children, className = '' }: TagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-control border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-muted ${className}`}
    >
      {children}
    </span>
  )
}
