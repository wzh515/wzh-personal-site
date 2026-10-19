import { ArrowRight, Download, Mail } from 'lucide-react'
import { profile } from '../data'
import { Button } from '../components/ui/Button'

/**
 * 首页 Hero：头像、姓名、头衔、一句话简介 + 三个主要入口按钮。
 */
export function Hero() {
  return (
    <section
      id="home"
      className="flex min-h-screen items-center justify-center px-4 pt-16"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        <img
          src={profile.avatar}
          alt={`${profile.name} 的头像`}
          className="h-28 w-28 rounded-full border border-white/10 object-cover sm:h-32 sm:w-32"
        />

        <h1 className="mt-6 text-4xl font-bold text-fg sm:text-5xl">{profile.name}</h1>

        <p className="mt-3 text-xl font-medium text-accent">{profile.title}</p>

        <p className="mt-4 max-w-xl text-muted">{profile.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button to="/#projects">
            查看项目
            <ArrowRight size={16} aria-hidden="true" />
          </Button>
          <Button href={profile.resume} variant="ghost" download>
            <Download size={16} aria-hidden="true" />
            下载简历
          </Button>
          <Button to="/#contact" variant="ghost">
            <Mail size={16} aria-hidden="true" />
            联系我
          </Button>
        </div>
      </div>
    </section>
  )
}
