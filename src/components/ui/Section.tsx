import type { ReactNode } from 'react'

interface SectionProps {
  id?: string
  title: string
  subtitle?: string
  children: ReactNode
  className?: string
}

/**
 * 通用区块容器：统一标题、留白、最大宽度 1200px 居中。
 */
export function Section({ id, title, subtitle, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`mx-auto w-full max-w-[1200px] px-4 py-20 sm:px-6 ${className}`}>
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-fg sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-2 text-muted">{subtitle}</p>}
      </div>
      {children}
    </section>
  )
}
