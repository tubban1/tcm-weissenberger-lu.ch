'use client'

import { useEffect, useMemo, useState } from 'react'
import { locales } from '@/i18n/config'
import { pageKeys } from '@/lib/pageKeys'

type Status = { type: 'idle' | 'loading' | 'success' | 'error'; message?: string }

export default function AdminPage() {
  const [token, setToken] = useState('')
  const [isAuthed, setIsAuthed] = useState(false)
  const [locale, setLocale] = useState(locales[0])
  const [page, setPage] = useState(pageKeys[0])
  const [form, setForm] = useState<any>({})
  const [status, setStatus] = useState<Status>({ type: 'idle' })
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem('tcm-admin-token')
    if (saved) {
      setToken(saved)
      setIsAuthed(true)
    }
  }, [])

  useEffect(() => {
    if (token) {
      window.localStorage.setItem('tcm-admin-token', token)
    }
  }, [token])

  const headersWithAuth = useMemo(
    () => ({
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    }),
    [token]
  )

  const handleLogin = () => {
    if (token.trim()) {
      setIsAuthed(true)
      window.localStorage.setItem('tcm-admin-token', token.trim())
    }
  }

  const loadContent = async () => {
    setStatus({ type: 'loading', message: '加载中...' })
    try {
      const res = await fetch(`/api/content?page=${page}&locale=${locale}`)
      const data = await res.json()
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || '加载失败')
      }
      setForm(data.data || {})
      setStatus({ type: 'success', message: '已加载' })
    } catch (err: any) {
      setStatus({ type: 'error', message: err?.message || '加载失败' })
    }
  }

  const saveContent = async () => {
    setStatus({ type: 'loading', message: '保存中...' })
    try {
      const res = await fetch(`/api/content?page=${page}&locale=${locale}`, {
        method: 'POST',
        headers: headersWithAuth,
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok || !data?.success) {
        throw new Error(data?.message || '保存失败')
      }
      setStatus({ type: 'success', message: '保存成功' })
    } catch (err: any) {
      setStatus({ type: 'error', message: err?.message || '保存失败' })
    }
  }

  const uploadImage = async (file: File) => {
    setUploading(true)
    setStatus({ type: 'loading', message: '图片上传中...' })
    try {
      const fd = new FormData()
      fd.append('file', file)
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: fd,
      })
      const data = await res.json()
      if (!res.ok || !data?.success) throw new Error(data?.message || '上传失败')
      setImageUrl(data.image?.url || '')
      setStatus({ type: 'success', message: '上传成功，URL 已可用' })
    } catch (err: any) {
      setStatus({ type: 'error', message: err?.message || '上传失败' })
    } finally {
      setUploading(false)
    }
  }

  // helpers
  const setField = (path: (string | number)[], value: any) => {
    setForm((prev: any) => {
      const next = structuredClone(prev || {})
      let cursor = next
      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i]
        if (cursor[key] === undefined) cursor[key] = typeof path[i + 1] === 'number' ? [] : {}
        cursor = cursor[key]
      }
      cursor[path[path.length - 1]] = value
      return next
    })
  }

  const arrayToLines = (arr: any[] = [], formatter: (item: any) => string) =>
    arr.map(formatter).join('\n')

  const linesToArray = (text: string, parser: (line: string) => any) =>
    text
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map(parser)

  const renderHomeForm = () => {
    const featuresText = arrayToLines(form.uniqueFeatures, (f) => `${f.title || ''}|${f.description || ''}`)
    const servicesText = arrayToLines(form.services, (s) => `${s.title || ''}|${s.description || ''}|${s.icon || ''}`)
    return (
      <div className="space-y-4">
        <SectionTitle title="主视觉" />
        <Input label="标题" value={form.hero?.title || ''} onChange={(v) => setField(['hero', 'title'], v)} />
        <Input label="副标题" value={form.hero?.subtitle || ''} onChange={(v) => setField(['hero', 'subtitle'], v)} />
        <Input label="Tagline" value={form.hero?.tagline || ''} onChange={(v) => setField(['hero', 'tagline'], v)} />
        <Textarea
          label="描述"
          value={form.hero?.description || ''}
          onChange={(v) => setField(['hero', 'description'], v)}
        />
        <Input
          label="CTA 文案"
          value={form.hero?.ctaLabel || ''}
          onChange={(v) => setField(['hero', 'ctaLabel'], v)}
        />
        <Input
          label="保险提示"
          value={form.hero?.insurance || ''}
          onChange={(v) => setField(['hero', 'insurance'], v)}
        />
        <Input
          label="YouTube ID（可选）"
          value={form.hero?.youtubeId || ''}
          onChange={(v) => setField(['hero', 'youtubeId'], v)}
          placeholder="如 kXYiU_JCYtU"
        />
        <Input
          label="主图 URL（若无视频）"
          value={form.hero?.heroImage || ''}
          onChange={(v) => setField(['hero', 'heroImage'], v)}
        />

        <SectionTitle title="特色" />
        <Input
          label="特色标题"
          value={form.uniqueFeaturesTitle || ''}
          onChange={(v) => setField(['uniqueFeaturesTitle'], v)}
        />
        <Textarea
          label="特色列表（每行：标题|描述）"
          value={featuresText}
          onChange={(v) =>
            setField(
              ['uniqueFeatures'],
              linesToArray(v, (line) => {
                const [title = '', description = ''] = line.split('|')
                return { title, description }
              })
            )
          }
        />

        <SectionTitle title="核心服务" />
        <Input
          label="核心服务标题"
          value={form.coreServicesTitle || ''}
          onChange={(v) => setField(['coreServicesTitle'], v)}
        />
        <Input
          label="无数据时提示"
          value={form.coreServicesNote || ''}
          onChange={(v) => setField(['coreServicesNote'], v)}
        />
        <Textarea
          label="服务列表（每行：标题|描述|图标）"
          value={servicesText}
          onChange={(v) =>
            setField(
              ['services'],
              linesToArray(v, (line) => {
                const [title = '', description = '', icon = ''] = line.split('|')
                return { title, description, icon }
              })
            )
          }
        />
      </div>
    )
  }

  const renderAboutForm = () => {
    const qualsText = arrayToLines(form.qualifications, (q) => `${q.title || ''}|${(q.items || []).join(';')}`)
    const langsText = arrayToLines(form.languages, (l) => l || '')
    return (
      <div className="space-y-4">
        <SectionTitle title="主视觉" />
        <Input label="标题" value={form.hero?.title || ''} onChange={(v) => setField(['hero', 'title'], v)} />
        <Input
          label="副标题"
          value={form.hero?.subtitle || ''}
          onChange={(v) => setField(['hero', 'subtitle'], v)}
        />
        <Input
          label="YouTube ID"
          value={form.hero?.youtubeId || ''}
          onChange={(v) => setField(['hero', 'youtubeId'], v)}
        />
        <Input
          label="主图 URL"
          value={form.hero?.heroImage || ''}
          onChange={(v) => setField(['hero', 'heroImage'], v)}
        />

        <SectionTitle title="使命 / 价值" />
        <Input
          label="使命标题"
          value={form.mission?.title || ''}
          onChange={(v) => setField(['mission', 'title'], v)}
        />
        <Textarea
          label="使命正文"
          value={form.mission?.body || ''}
          onChange={(v) => setField(['mission', 'body'], v)}
        />
        <Input label="价值标题" value={form.values?.title || ''} onChange={(v) => setField(['values', 'title'], v)} />
        <Textarea
          label="价值正文"
          value={form.values?.body || ''}
          onChange={(v) => setField(['values', 'body'], v)}
        />

        <SectionTitle title="资质" />
        <Input
          label="资质区块标题"
          value={form.qualificationsTitle || ''}
          onChange={(v) => setField(['qualificationsTitle'], v)}
        />
        <Textarea
          label="资质列表（每行：区块标题|item1;item2;item3）"
          value={qualsText}
          onChange={(v) =>
            setField(
              ['qualifications'],
              linesToArray(v, (line) => {
                const [title = '', itemsRaw = ''] = line.split('|')
                return { title, items: itemsRaw.split(';').map((s) => s.trim()).filter(Boolean) }
              })
            )
          }
        />

        <SectionTitle title="语言" />
        <Textarea
          label="语言列表（每行一个）"
          value={langsText}
          onChange={(v) => setField(['languages'], linesToArray(v, (line) => line))}
        />
      </div>
    )
  }

  const renderServicesForm = () => {
    const servicesText = arrayToLines(form.services, (s) => `${s.title || ''}|${s.description || ''}|${s.icon || ''}`)
    return (
      <div className="space-y-4">
        <SectionTitle title="主视觉" />
        <Input label="标题" value={form.hero?.title || ''} onChange={(v) => setField(['hero', 'title'], v)} />
        <Input
          label="副标题"
          value={form.hero?.subtitle || ''}
          onChange={(v) => setField(['hero', 'subtitle'], v)}
        />
        <Input
          label="YouTube ID"
          value={form.hero?.youtubeId || ''}
          onChange={(v) => setField(['hero', 'youtubeId'], v)}
        />
        <Input
          label="主图 URL"
          value={form.hero?.heroImage || ''}
          onChange={(v) => setField(['hero', 'heroImage'], v)}
        />

        <SectionTitle title="服务列表" />
        <Textarea
          label="服务（每行：标题|描述|图标）"
          value={servicesText}
          onChange={(v) =>
            setField(
              ['services'],
              linesToArray(v, (line) => {
                const [title = '', description = '', icon = ''] = line.split('|')
                return { title, description, icon }
              })
            )
          }
        />

        <SectionTitle title="CTA" />
        <Input label="CTA 标题" value={form.cta?.title || ''} onChange={(v) => setField(['cta', 'title'], v)} />
        <Textarea label="CTA 正文" value={form.cta?.body || ''} onChange={(v) => setField(['cta', 'body'], v)} />
        <Input label="CTA 按钮" value={form.cta?.label || ''} onChange={(v) => setField(['cta', 'label'], v)} />
      </div>
    )
  }

  const renderSymptomsForm = () => {
    const symptomsText = arrayToLines(form.symptoms, (s) => `${s.title || ''}|${s.description || ''}|${s.icon || ''}`)
    return (
      <div className="space-y-4">
        <SectionTitle title="主视觉" />
        <Input label="标题" value={form.hero?.title || ''} onChange={(v) => setField(['hero', 'title'], v)} />
        <Input
          label="副标题"
          value={form.hero?.subtitle || ''}
          onChange={(v) => setField(['hero', 'subtitle'], v)}
        />
        <Input
          label="YouTube ID"
          value={form.hero?.youtubeId || ''}
          onChange={(v) => setField(['hero', 'youtubeId'], v)}
        />
        <Input
          label="主图 URL"
          value={form.hero?.heroImage || ''}
          onChange={(v) => setField(['hero', 'heroImage'], v)}
        />

        <SectionTitle title="症状列表" />
        <Textarea
          label="症状（每行：标题|描述|图标）"
          value={symptomsText}
          onChange={(v) =>
            setField(
              ['symptoms'],
              linesToArray(v, (line) => {
                const [title = '', description = '', icon = ''] = line.split('|')
                return { title, description, icon }
              })
            )
          }
        />

        <SectionTitle title="CTA" />
        <Input label="CTA 标题" value={form.cta?.title || ''} onChange={(v) => setField(['cta', 'title'], v)} />
        <Textarea label="CTA 正文" value={form.cta?.body || ''} onChange={(v) => setField(['cta', 'body'], v)} />
        <Input label="CTA 按钮" value={form.cta?.label || ''} onChange={(v) => setField(['cta', 'label'], v)} />
      </div>
    )
  }

  const renderAppointmentForm = () => (
    <div className="space-y-4">
      <SectionTitle title="主视觉" />
      <Input label="标题" value={form.hero?.title || ''} onChange={(v) => setField(['hero', 'title'], v)} />
      <Input
        label="副标题"
        value={form.hero?.subtitle || ''}
        onChange={(v) => setField(['hero', 'subtitle'], v)}
      />
      <Input
        label="YouTube ID"
        value={form.hero?.youtubeId || ''}
        onChange={(v) => setField(['hero', 'youtubeId'], v)}
      />
      <Input
        label="主图 URL"
        value={form.hero?.heroImage || ''}
        onChange={(v) => setField(['hero', 'heroImage'], v)}
      />
      <SectionTitle title="预约链接" />
      <Input
        label="Google Calendar URL"
        value={form.calendarUrl || ''}
        onChange={(v) => setField(['calendarUrl'], v)}
        placeholder="https://calendar.google.com/..."
      />
    </div>
  )

  const renderContactForm = () => {
    const hoursText = arrayToLines(form.hours?.rows, (r) => `${r.label || ''}|${r.value || ''}`)
    const cardsText = arrayToLines(form.infoCards, (c) => `${c.title || ''}|${c.body || ''}`)
    return (
      <div className="space-y-4">
        <SectionTitle title="主视觉" />
        <Input label="标题" value={form.hero?.title || ''} onChange={(v) => setField(['hero', 'title'], v)} />
        <Input
          label="副标题"
          value={form.hero?.subtitle || ''}
          onChange={(v) => setField(['hero', 'subtitle'], v)}
        />
        <Input
          label="YouTube ID"
          value={form.hero?.youtubeId || ''}
          onChange={(v) => setField(['hero', 'youtubeId'], v)}
        />
        <Input
          label="主图 URL"
          value={form.hero?.heroImage || ''}
          onChange={(v) => setField(['hero', 'heroImage'], v)}
        />

        <SectionTitle title="地图" />
        <Input
          label="地图标题"
          value={form.mapTitle || ''}
          onChange={(v) => setField(['mapTitle'], v)}
        />
        <Input
          label="Google Maps Embed URL"
          value={form.mapEmbedUrl || ''}
          onChange={(v) => setField(['mapEmbedUrl'], v)}
          placeholder="https://www.google.com/maps?q=...&output=embed"
        />

        <SectionTitle title="联系信息" />
        <Input
          label="地址标题"
          value={form.details?.addressLabel || ''}
          onChange={(v) => setField(['details', 'addressLabel'], v)}
        />
        <Input
          label="地址"
          value={form.details?.address || ''}
          onChange={(v) => setField(['details', 'address'], v)}
        />
        <Input
          label="电话标题"
          value={form.details?.phoneLabel || ''}
          onChange={(v) => setField(['details', 'phoneLabel'], v)}
        />
        <Input
          label="电话"
          value={form.details?.phone || ''}
          onChange={(v) => setField(['details', 'phone'], v)}
        />
        <Input
          label="邮箱标题"
          value={form.details?.emailLabel || ''}
          onChange={(v) => setField(['details', 'emailLabel'], v)}
        />
        <Input
          label="邮箱"
          value={form.details?.email || ''}
          onChange={(v) => setField(['details', 'email'], v)}
        />

        <SectionTitle title="营业时间" />
        <Textarea
          label="时间行（每行：标签|值）"
          value={hoursText}
          onChange={(v) =>
            setField(
              ['hours', 'rows'],
              linesToArray(v, (line) => {
                const [label = '', value = ''] = line.split('|')
                return { label, value }
              })
            )
          }
        />

        <SectionTitle title="信息卡片" />
        <Textarea
          label="卡片（每行：标题|正文）"
          value={cardsText}
          onChange={(v) =>
            setField(
              ['infoCards'],
              linesToArray(v, (line) => {
                const [title = '', body = ''] = line.split('|')
                return { title, body }
              })
            )
          }
        />
      </div>
    )
  }

  const renderFormByPage = () => {
    switch (page) {
      case 'home':
        return renderHomeForm()
      case 'about':
        return renderAboutForm()
      case 'services':
        return renderServicesForm()
      case 'symptoms':
        return renderSymptomsForm()
      case 'appointment':
        return renderAppointmentForm()
      case 'contact':
        return renderContactForm()
      default:
        return null
    }
  }

  // load when page/locale changes
  useEffect(() => {
    loadContent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, locale])

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-primary-50 py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isAuthed && (
          <div className="max-w-xl mx-auto mb-6 bg-white rounded-2xl shadow-lg border border-primary-100 p-6 space-y-4">
            <h2 className="text-xl font-semibold text-primary-700">管理员登录</h2>
            <p className="text-sm text-gray-600">请输入后台密码（ENV: ADMIN_PW 或 ADMIN_TOKEN）</p>
            <Input label="Admin 密码" value={token} onChange={setToken} placeholder="输入后台密码" />
            <button
              onClick={handleLogin}
              className="w-full px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 shadow transition"
            >
              登录
            </button>
            {status.type === 'error' && (
              <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded">{status.message}</div>
            )}
          </div>
        )}

        {isAuthed && (
        <div className="bg-white rounded-2xl shadow-lg border border-primary-100 p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-primary-700">内容后台（文件存储，无数据库）</h1>
              <p className="text-sm text-gray-600">编辑后写入 content/{'{locale}'}/{'{page}'}.json</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select className="border rounded px-3 py-2" value={locale} onChange={(e) => setLocale(e.target.value as any)}>
                {locales.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
              <select className="border rounded px-3 py-2" value={page} onChange={(e) => setPage(e.target.value as any)}>
                {pageKeys.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <button
                onClick={loadContent}
                className="px-4 py-2 bg-primary-50 text-primary-700 rounded hover:bg-primary-100 transition"
              >
                重新读取
              </button>
              <button
                onClick={saveContent}
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 shadow transition"
              >
                保存
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-center bg-primary-50/60 border border-primary-100 p-4 rounded-xl">
            <label className="text-sm text-gray-700 font-medium">Admin Token</label>
            <input
              className="md:col-span-2 border rounded px-3 py-2 w-full"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="与环境变量 ADMIN_TOKEN / ADMIN_PW 一致"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4 items-center bg-primary-50/60 border border-primary-100 p-4 rounded-xl">
            <label className="text-sm text-gray-700 font-medium">图片上传</label>
            <div className="md:col-span-2 flex items-center gap-3">
              <input
                type="file"
                accept="image/*"
                disabled={uploading}
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) uploadImage(file)
                }}
              />
              {imageUrl && (
                <span className="text-sm text-green-700 break-all">URL: {imageUrl}</span>
              )}
            </div>
          </div>

          <div className="border rounded-2xl p-4 bg-white shadow-sm">
            {renderFormByPage() || <div className="text-sm text-gray-500">请选择页面进行编辑</div>}
          </div>

          {status.type !== 'idle' && (
            <div
              className={`rounded p-3 text-sm ${
                status.type === 'success'
                  ? 'bg-green-50 text-green-700'
                  : status.type === 'error'
                    ? 'bg-red-50 text-red-700'
                    : 'bg-blue-50 text-blue-700'
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="text-xs text-gray-500 space-y-1">
            <p>操作说明：</p>
            <p>- 读取：从 content/{'{locale}'}/{'{page}'}.json 读取，若不存在用默认模板</p>
            <p>- 保存：需要 Authorization Bearer {`<ADMIN_TOKEN>`} 或 {`<ADMIN_PW>`}，写入 JSON 文件</p>
            <p>- 图片：上传后返回 URL，粘贴到相应图片字段</p>
            <p>- 视频：填写 youtubeId（如 kXYiU_JCYtU）嵌入视频</p>
          </div>
        </div>
        )}
      </div>
    </div>
  )
}

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block space-y-1 text-sm text-gray-700">
      <span className="font-medium">{label}</span>
      <input
        className="w-full border rounded px-3 py-2 text-gray-900 focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  return (
    <label className="block space-y-1 text-sm text-gray-700">
      <span className="font-medium">{label}</span>
      <textarea
        className="w-full border rounded px-3 py-2 text-gray-900 font-mono text-sm h-28 focus:ring-2 focus:ring-primary-200 focus:border-primary-300 transition"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  )
}

function SectionTitle({ title }: { title: string }) {
  return (
    <h3 className="text-base font-semibold text-primary-700 mt-4 mb-2 flex items-center gap-2">
      <span className="w-1 h-4 rounded-full bg-primary-500 inline-block" />
      {title}
    </h3>
  )
}

