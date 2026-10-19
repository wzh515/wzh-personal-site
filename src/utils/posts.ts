import matter from 'gray-matter'
import type { Post } from '../types'

/**
 * 自动扫描 src/content/posts/*.md，新增文件无需改代码即可被收录。
 * 构建期静态读取原始文本，使用 gray-matter 解析 frontmatter。
 */
const modules = import.meta.glob('../content/posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

interface PostFrontmatter {
  title?: string
  // gray-matter 会把未加引号的 YAML 日期（如 2026-10-19）解析成 Date 对象
  date?: string | Date
  excerpt?: string
  tags?: string[]
}

/** 将 frontmatter 中的日期统一为 YYYY-MM-DD 字符串，避免 Date 对象泄漏到 React 渲染 */
function normalizeDate(value: string | Date | undefined): string {
  if (value instanceof Date) {
    const y = value.getUTCFullYear()
    const m = String(value.getUTCMonth() + 1).padStart(2, '0')
    const d = String(value.getUTCDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  }
  return value ?? ''
}

/** 估算阅读时长（分钟），中英文分别按字符/词数估算，取较大值，至少 1 分钟 */
function estimateReadingTime(content: string): number {
  const cjk = (content.match(/[\u4e00-\u9fff]/g) ?? []).length
  const words = (content.match(/[a-zA-Z0-9]+/g) ?? []).length
  return Math.max(1, Math.ceil(Math.max(cjk / 400, words / 200)))
}

/** 按日期倒序返回全部文章 */
export function getAllPosts(): Post[] {
  return Object.entries(modules)
    .map(([path, raw]): Post => {
      const { data, content } = matter(raw)
      // gray-matter 的 data 为未知类型，窄化为明确的 frontmatter 结构
      const fm = data as PostFrontmatter
      const slug = path.split('/').pop()?.replace(/\.md$/, '') ?? ''
      return {
        slug,
        title: fm.title ?? slug,
        date: normalizeDate(fm.date),
        excerpt: fm.excerpt ?? '',
        tags: fm.tags ?? [],
        content,
        readingTime: estimateReadingTime(content),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

/** 根据 slug 获取单篇文章 */
export function getPostBySlug(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug)
}
