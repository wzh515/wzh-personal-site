interface SkillBarProps {
  /** 熟练度 0~100 */
  level: number
  /** 无障碍标签（技能名称） */
  label?: string
}

/**
 * 技能熟练度进度条组件。
 * 使用 role="progressbar" 提供无障碍语义。
 */
export function SkillBar({ level, label }: SkillBarProps) {
  const clamped = Math.max(0, Math.min(100, level))

  return (
    <div
      className="h-2 w-full overflow-hidden rounded-full bg-white/10"
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
    >
      <div
        className="h-full rounded-full bg-accent"
        style={{ width: `${clamped}%` }}
      />
    </div>
  )
}
