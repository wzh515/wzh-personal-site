import { useState, type FormEvent } from 'react'
import {
  Check,
  CircleAlert,
  CircleCheck,
  Copy,
  ExternalLink,
  LoaderCircle,
  Mail,
  MapPin,
  Send,
} from 'lucide-react'
import { profile } from '../data'
import { Section } from '../components/ui/Section'
import { Button } from '../components/ui/Button'
import { copyText } from '../utils/clipboard'

interface FormState {
  name: string
  email: string
  message: string
}

type FormErrors = Partial<Record<keyof FormState, string>>
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error'

const EMPTY_FORM: FormState = { name: '', email: '', message: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** 提交联系表单。配置了 VITE_CONTACT_ENDPOINT 则走真实请求，否则模拟提交。 */
async function submitContact(data: FormState): Promise<void> {
  const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT
  if (!endpoint) {
    // 静态站点无后端时的模拟提交（演示成功反馈）
    await new Promise((resolve) => setTimeout(resolve, 800))
    return
  }
  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw new Error(`提交失败：${res.status}`)
  }
}

function inputClass(invalid: boolean): string {
  return `w-full rounded-control border bg-white/[0.03] px-3.5 py-2.5 text-sm text-fg placeholder:text-muted/60 transition-colors focus:outline-none focus:ring-1 ${
    invalid
      ? 'border-red-400/60 focus:ring-red-400/60'
      : 'border-white/10 focus:border-accent focus:ring-accent'
  }`
}

/**
 * 联系模块：一键复制邮箱、社交账号链接、带校验与反馈的联系表单。
 */
export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmitStatus>('idle')
  const [copied, setCopied] = useState(false)

  const update = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const validate = (): boolean => {
    const next: FormErrors = {}
    if (!form.name.trim()) next.name = '请输入姓名'
    if (!form.email.trim()) next.email = '请输入邮箱'
    else if (!EMAIL_RE.test(form.email)) next.email = '邮箱格式不正确'
    if (!form.message.trim()) next.message = '请输入内容'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleCopyEmail = async () => {
    const ok = await copyText(profile.email)
    setCopied(ok)
    if (ok) window.setTimeout(() => setCopied(false), 2000)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('submitting')
    try {
      await submitContact(form)
      setStatus('success')
      setForm(EMPTY_FORM)
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" title="联系我" subtitle="期待与你交流">
      <div className="grid gap-10 lg:grid-cols-2">
        {/* 左侧：邮箱 / 位置 / 社交 */}
        <div className="space-y-6">
          <div>
            <p className="flex items-center gap-2 text-sm text-muted">
              <Mail size={16} className="text-accent" aria-hidden="true" />
              邮箱
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="text-fg">{profile.email}</span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 rounded-control border border-white/10 px-2.5 py-1 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                aria-label="复制邮箱"
              >
                {copied ? (
                  <Check size={14} className="text-green-400" aria-hidden="true" />
                ) : (
                  <Copy size={14} aria-hidden="true" />
                )}
                {copied ? '已复制' : '复制'}
              </button>
            </div>
          </div>

          {profile.location && (
            <p className="flex items-center gap-2 text-sm text-muted">
              <MapPin size={16} className="text-accent" aria-hidden="true" />
              {profile.location}
            </p>
          )}

          <div>
            <p className="mb-3 text-sm text-muted">社交账号</p>
            <div className="flex flex-wrap gap-3">
              {profile.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-control border border-white/10 px-3 py-1.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent"
                >
                  {social.name}
                  <ExternalLink size={14} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：联系表单 */}
        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="contact-name" className="mb-1.5 block text-sm text-fg">
              姓名
            </label>
            <input
              id="contact-name"
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className={inputClass(!!errors.name)}
              placeholder="你的姓名"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'contact-name-error' : undefined}
            />
            {errors.name && (
              <p id="contact-name-error" className="mt-1 text-xs text-red-400">
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-1.5 block text-sm text-fg">
              邮箱
            </label>
            <input
              id="contact-email"
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className={inputClass(!!errors.email)}
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
            {errors.email && (
              <p id="contact-email-error" className="mt-1 text-xs text-red-400">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="contact-message" className="mb-1.5 block text-sm text-fg">
              内容
            </label>
            <textarea
              id="contact-message"
              value={form.message}
              onChange={(e) => update('message', e.target.value)}
              rows={5}
              className={`${inputClass(!!errors.message)} resize-y`}
              placeholder="想说的话..."
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? 'contact-message-error' : undefined}
            />
            {errors.message && (
              <p id="contact-message-error" className="mt-1 text-xs text-red-400">
                {errors.message}
              </p>
            )}
          </div>

          {status === 'success' && (
            <p
              role="status"
              className="flex items-center gap-2 rounded-control bg-green-400/10 px-3 py-2 text-sm text-green-400"
            >
              <CircleCheck size={16} aria-hidden="true" />
              消息已发送，感谢联系！
            </p>
          )}
          {status === 'error' && (
            <p
              role="alert"
              className="flex items-center gap-2 rounded-control bg-red-400/10 px-3 py-2 text-sm text-red-400"
            >
              <CircleAlert size={16} aria-hidden="true" />
              发送失败，请稍后重试或直接发送邮件。
            </p>
          )}

          <Button type="submit" disabled={status === 'submitting'}>
            {status === 'submitting' && (
              <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
            )}
            {status === 'submitting' ? '发送中...' : (
              <>
                发送消息
                <Send size={16} aria-hidden="true" />
              </>
            )}
          </Button>
        </form>
      </div>
    </Section>
  )
}
