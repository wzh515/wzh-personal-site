import { Link } from 'react-router-dom'
import { getAllPosts } from '../utils/posts'
import { Tag } from '../components/ui/Tag'

/**
 * 博客列表页：标题、摘要、发布日期、标签。
 * 文章由 src/content/posts/*.md 自动读取。
 */
export function BlogList() {
  const posts = getAllPosts()

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-28 sm:px-6">
      <h1 className="text-3xl font-bold text-fg sm:text-4xl">博客</h1>
      <p className="mt-2 text-muted">分享技术思考与学习笔记</p>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">暂无文章，欢迎稍后再来。</p>
      ) : (
        <div className="mt-10 grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-card border border-white/10 bg-white/[0.03] p-6"
            >
              <Link to={`/blog/${post.slug}`} className="group inline-block">
                <h2 className="text-xl font-semibold text-fg transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
              </Link>

              <p className="mt-2 text-sm text-muted">
                {post.date} · 约 {post.readingTime} 分钟阅读
              </p>

              <p className="mt-3 text-muted">{post.excerpt}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
