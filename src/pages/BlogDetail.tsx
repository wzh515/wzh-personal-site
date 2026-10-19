import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { getPostBySlug } from '../utils/posts'
import { extractToc } from '../utils/toc'
import { Markdown } from '../utils/markdown'
import { Tag } from '../components/ui/Tag'

/**
 * 博客详情页：Markdown 渲染 + 代码高亮 + 目录 TOC。
 */
export function BlogDetail() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined
  const toc = post ? extractToc(post.content) : []

  if (!post) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-32 sm:px-6">
        <p className="text-lg text-muted">未找到该文章。</p>
        <Link to="/blog" className="mt-4 inline-block text-accent hover:underline">
          ← 返回博客列表
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-28 sm:px-6">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        返回博客
      </Link>

      <header className="mt-6">
        <h1 className="text-3xl font-bold text-fg sm:text-4xl">{post.title}</h1>
        <p className="mt-3 text-sm text-muted">
          {post.date} · 约 {post.readingTime} 分钟阅读
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </header>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_240px]">
        <Markdown content={post.content} />

        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <nav
              className="sticky top-24 rounded-card border border-white/10 bg-white/[0.03] p-4"
              aria-label="文章目录"
            >
              <p className="mb-3 text-sm font-semibold text-fg">目录</p>
              <ul className="space-y-1.5">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-sm text-muted transition-colors hover:text-accent"
                      style={{ paddingLeft: `${(item.depth - 2) * 12}px` }}
                    >
                      {item.text}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>
        )}
      </div>
    </div>
  )
}
