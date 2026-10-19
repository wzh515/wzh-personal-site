import { useEffect, useState } from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeStringify from 'rehype-stringify'

interface MarkdownProps {
  content: string
}

/**
 * 通用 Markdown 渲染组件：
 * - remark-gfm 支持表格/任务列表等 GFM 语法
 * - rehype-slug 为标题生成锚点 id（供 TOC 跳转）
 * - rehype-pretty-code（Shiki）提供代码高亮
 * 外层包裹 .markdown 样式类。
 *
 * rehype-pretty-code（Shiki v4）是异步插件，无法配合 react-markdown 的
 * runSync 同步处理，因此这里改用 unified 的异步 process() 得到 HTML 后渲染。
 * 内容仅来自本地 src/content/posts 的受信任 Markdown 文件。
 */
const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkRehype)
  .use(rehypeSlug)
  .use(rehypePrettyCode, { theme: 'github-dark' })
  .use(rehypeStringify)

export function Markdown({ content }: MarkdownProps) {
  const [html, setHtml] = useState('')

  useEffect(() => {
    let cancelled = false
    processor
      .process(content)
      .then((file) => {
        if (!cancelled) setHtml(String(file))
      })
      .catch((err) => {
        console.error('Markdown 渲染失败：', err)
      })
    return () => {
      cancelled = true
    }
  }, [content])

  return <div className="markdown" dangerouslySetInnerHTML={{ __html: html }} />
}
