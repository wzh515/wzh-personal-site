/**
 * 站点级配置：强调色等可配置项在此集中管理。
 * 修改此文件即可全局生效，避免在组件中硬编码颜色。
 * 注意：需与 src/index.css 中 @theme 的 --color-accent 保持一致。
 */
export const theme = {
  /** 强调色（主按钮、链接、高亮、进度条） */
  accent: '#6C8CFF',
  /** 背景色 */
  bg: '#0B0F1A',
  /** 文字主色 */
  fg: '#E6EAF2',
  /** 文字次要色 */
  muted: '#9AA3B2',
  /** 卡片圆角（px） */
  radiusCard: 16,
  /** 按钮/标签圆角（px） */
  radiusControl: 12,
  /** 内容最大宽度（px） */
  maxWidth: 1200,
  /** 吸顶导航高度补偿（px），与 Navbar 高度保持一致 */
  navHeight: 64,
} as const

export type Theme = typeof theme
