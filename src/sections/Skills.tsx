import { skills } from '../data'
import { Section } from '../components/ui/Section'
import { SkillBar } from '../components/ui/SkillBar'
import { Icon } from '../components/ui/Icon'

/**
 * 技能展示：按分类渲染，图标 + 名称 + 熟练度进度条。
 * 响应式：单列 / 两列 / 三列。
 */
export function Skills() {
  return (
    <Section id="skills" title="技能" subtitle="我的技术栈与熟练度">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {skills.groups.map((group) => (
          <div
            key={group.category}
            className="rounded-card border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="mb-4 flex items-center gap-2">
              <Icon name={group.icon} className="text-accent" />
              <h3 className="text-lg font-semibold text-fg">{group.category}</h3>
            </div>

            <ul className="space-y-4">
              {group.skills.map((skill) => (
                <li key={skill.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="flex items-center gap-2 text-sm text-fg">
                      {skill.icon && (
                        <Icon name={skill.icon} size={16} className="text-muted" />
                      )}
                      {skill.name}
                    </span>
                    <span className="text-xs text-muted">{skill.level}%</span>
                  </div>
                  <SkillBar level={skill.level} label={skill.name} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
