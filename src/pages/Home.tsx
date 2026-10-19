import { Hero } from '../sections/Hero'
import { About } from '../sections/About'
import { Skills } from '../sections/Skills'
import { Projects } from '../sections/Projects'
import { Contact } from '../sections/Contact'

/**
 * 首页：组装 Hero / 关于 / 技能 / 项目 / 联系各 section。
 */
export function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  )
}
