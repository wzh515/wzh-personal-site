import { remark } from 'remark'
import { visit } from 'unist-util-visit'
import { toString } from 'mdast-util-to-string'
import GithubSlugger from 'github-slugger'
import type { Heading } from 'mdast'
import type { TocItem } from '../types'

/**
 * 从 Markdown 提取目录（TOC）。
 * 使用与 rehype-slug 相同的 github-slugger 生成标题 id，
 * 并对所有标题统一 slug，确保与渲染后的标题 id 一致。
 * 仅收录 h2~h4 作为目录项。
 */
export function extractToc(markdown: string): TocItem[] {
  const slugger = new GithubSlugger()
  const toc: TocItem[] = []
  const tree = remark().parse(markdown)

  visit(tree, 'heading', (node: Heading) => {
    const text = toString(node)
    const id = slugger.slug(text)
    if (node.depth >= 2 && node.depth <= 4) {
      toc.push({ id, text, depth: node.depth })
    }
  })

  return toc
}
