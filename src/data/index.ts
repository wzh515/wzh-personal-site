/**
 * 数据统一出口：导入本地 JSON 并做类型约束。
 * 赋值给带类型的常量，使 JSON 结构在编译期被严格校验。
 */
import profileJson from './profile.json'
import skillsJson from './skills.json'
import projectsJson from './projects.json'
import type { Profile, Projects, Skills } from '../types'

export const profile: Profile = profileJson
export const skills: Skills = skillsJson
export const projects: Projects = projectsJson
