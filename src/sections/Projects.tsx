import { Link } from 'react-router-dom'
import { ExternalLink, GitBranch } from 'lucide-react'
import { projects } from '../data'
import { Section } from '../components/ui/Section'
import { Tag } from '../components/ui/Tag'

/**
 * 项目展示：项目卡片网格。
 * 响应式：<640 单列，640~1024 两列，>1024 三列。
 * 卡片含封面、标题、简介、技术标签、跳转链接。
 */
export function Projects() {
  return (
    <Section id="projects" title="项目" subtitle="我做过的一些项目">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.items.map((project) => (
          <article
            key={project.id}
            className="group flex flex-col overflow-hidden rounded-card border border-white/10 bg-white/[0.03]"
          >
            <Link to={`/projects/${project.id}`} className="block overflow-hidden">
              <img
                src={project.cover}
                alt={`${project.title} 项目封面`}
                loading="lazy"
                className="aspect-video w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            <div className="flex flex-1 flex-col p-5">
              <h3 className="text-lg font-semibold text-fg">
                <Link to={`/projects/${project.id}`} className="transition-colors hover:text-accent">
                  {project.title}
                </Link>
              </h3>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {project.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-4">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-accent transition-colors hover:underline"
                  >
                    演示
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-fg"
                  >
                    <GitBranch size={14} aria-hidden="true" />
                    源码
                  </a>
                )}
                <Link
                  to={`/projects/${project.id}`}
                  className="ml-auto text-sm text-muted transition-colors hover:text-fg"
                >
                  详情 →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
