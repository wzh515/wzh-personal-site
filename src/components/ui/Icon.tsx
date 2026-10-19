import {
  Atom,
  Boxes,
  Braces,
  Cloud,
  Code,
  Database,
  GitBranch,
  Globe,
  Layers,
  LayoutGrid,
  Palette,
  Rocket,
  Server,
  Sparkles,
  Terminal,
  Wrench,
  type LucideIcon,
} from 'lucide-react'

const ICONS: Record<string, LucideIcon> = {
  atom: Atom,
  boxes: Boxes,
  braces: Braces,
  cloud: Cloud,
  code: Code,
  database: Database,
  git: GitBranch,
  globe: Globe,
  layers: Layers,
  layout: LayoutGrid,
  palette: Palette,
  rocket: Rocket,
  server: Server,
  sparkles: Sparkles,
  terminal: Terminal,
  wrench: Wrench,
}

interface IconProps {
  name: string
  size?: number
  className?: string
}

/**
 * 根据字符串 key 解析 lucide 图标，未匹配时回退到 Sparkles。
 * 集中维护图标映射，避免在业务组件中散落 import。
 */
export function Icon({ name, size = 20, className }: IconProps) {
  const Cmp = ICONS[name] ?? Sparkles
  return <Cmp size={size} className={className} aria-hidden="true" />
}
