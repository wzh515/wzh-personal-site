import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

type ButtonVariant = 'primary' | 'ghost'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  /** 普通链接（外部地址或静态资源），渲染为 <a> */
  href?: string
  /** 路由内链（react-router），渲染为 <Link> */
  to?: string
  onClick?: () => void
  className?: string
  type?: 'button' | 'submit'
  target?: string
  rel?: string
  download?: boolean
  ariaLabel?: string
  disabled?: boolean
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-control px-5 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-bg hover:bg-accent/80',
  ghost: 'border border-white/15 text-fg hover:bg-white/5',
}

/**
 * 通用按钮：支持渲染为 <a>（href）、<Link>（to）或 <button>。
 * 圆角 12px（rounded-control），配色全部读取 @theme 变量。
 */
export function Button({
  children,
  variant = 'primary',
  href,
  to,
  onClick,
  className = '',
  type = 'button',
  target,
  rel,
  download,
  ariaLabel,
  disabled,
}: ButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} aria-label={ariaLabel}>
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        onClick={onClick}
        target={target}
        rel={rel}
        download={download ? '' : undefined}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
