import { profile } from '../data'
import type { TimelineItem } from '../types'
import { Section } from '../components/ui/Section'
import { Tag } from '../components/ui/Tag'

/**
 * 时间线：用于经历与教育背景。
 */
function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <ol className="space-y-8">
      {items.map((item) => (
        <li key={item.id} className="relative border-l border-white/10 pl-6">
          <span
            className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent"
            aria-hidden="true"
          />
          <p className="text-sm text-muted">{item.period}</p>
          <h4 className="mt-1 font-semibold text-fg">{item.title}</h4>
          <p className="text-sm text-muted">{item.org}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg/80">{item.description}</p>
          {item.tags && item.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </li>
      ))}
    </ol>
  )
}

/**
 * 个人介绍：多段落简介 + 经历时间线 + 教育背景。
 */
export function About() {
  return (
    <Section id="about" title="关于我" subtitle="我的简介、经历与教育背景">
      {/* 个人简介（多段落） */}
      <div className="space-y-4 leading-relaxed text-fg/80">
        {profile.bio.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* 经历时间线 + 教育背景 */}
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h3 className="mb-6 text-lg font-semibold text-fg">工作经历</h3>
          <Timeline items={profile.experience} />
        </div>
        <div>
          <h3 className="mb-6 text-lg font-semibold text-fg">教育背景</h3>
          <Timeline items={profile.education} />
        </div>
      </div>
    </Section>
  )
}
