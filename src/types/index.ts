/**
 * 全局数据模型类型定义。
 * 结构与 docs/TECH_DESIGN.md 第 3 节严格对齐。
 */

export interface Social {
  name: string
  url: string
  icon: string
}

export interface TimelineItem {
  id: string
  period: string
  title: string
  org: string
  description: string
  tags?: string[]
}

export interface Profile {
  name: string
  title: string
  tagline: string
  avatar: string
  email: string
  location: string
  bio: string[]
  resume: string
  socials: Social[]
  experience: TimelineItem[]
  education: TimelineItem[]
}

export interface Skill {
  name: string
  level: number
  icon?: string
}

export interface SkillGroup {
  category: string
  icon: string
  skills: Skill[]
}

export interface Skills {
  groups: SkillGroup[]
}

export interface ProjectLinks {
  demo?: string
  github?: string
}

export interface Project {
  id: string
  title: string
  cover: string
  description: string
  tags: string[]
  links: ProjectLinks
  detail: string
}

export interface Projects {
  items: Project[]
}

export interface Post {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  content: string
  readingTime: number
}

export interface TocItem {
  id: string
  text: string
  depth: number
}
