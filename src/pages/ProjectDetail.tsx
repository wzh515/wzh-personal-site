import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, GitBranch } from 'lucide-react'
import { projects } from '../data'
import { Tag } from '../components/ui/Tag'
import { Button } from '../components/ui/Button'
import { Markdown } from '../utils/markdown'

/**
 * 项目详情页：根据路由 id 读取 projects.json 展示详情。
 * detail 字段为 Markdown，由统一 Markdown 组件（unified + Shiki）渲染。
 */
export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const project = projects.items.find((item) => item.id === id)

  if (!project) {
    return (
      <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-32 sm:px-6">
        <p className="text-lg text-muted">未找到该项目。</p>
        <Link to="/#projects" className="mt-4 inline-block text-accent hover:underline">
          ← 返回项目列表
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-20 pt-28 sm:px-6">
      <Link
        to="/#projects"
        className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft size={16} aria-hidden="true" />
        返回项目列表
      </Link>

      <img
        src={project.cover}
        alt={`${project.title} 项目封面`}
        className="mt-6 aspect-video w-full rounded-card border border-white/10 object-cover"
      />

      <h1 className="mt-8 text-3xl font-bold text-fg sm:text-4xl">{project.title}</h1>

      <p className="mt-4 text-muted">{project.description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.demo && (
          <Button href={project.links.demo} target="_blank" rel="noreferrer">
            在线演示
            <ExternalLink size={16} aria-hidden="true" />
          </Button>
        )}
        {project.links.github && (
          <Button href={project.links.github} target="_blank" rel="noreferrer" variant="ghost">
            <GitBranch size={16} aria-hidden="true" />
            查看源码
          </Button>
        )}
      </div>

      <div className="mt-10">
        <Markdown content={project.detail} />
      </div>
    </div>
  )
}
