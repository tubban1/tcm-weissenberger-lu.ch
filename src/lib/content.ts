import 'server-only'
import fs from 'fs/promises'
import path from 'path'
import { getDefaultContent, PageKey } from '@/content/defaults'
import { locales } from '@/i18n/config'

const CONTENT_ROOT = path.join(process.cwd(), 'content')

const ensureLocale = (locale: string) =>
  locales.includes(locale as any) ? locale : locales[0]

function getContentPath(page: PageKey, locale: string) {
  const safeLocale = ensureLocale(locale)
  const dir = path.join(CONTENT_ROOT, safeLocale)
  const file = path.join(dir, `${page}.json`)
  return { dir, file }
}

export async function readPageContent<T>(page: PageKey, locale: string, defaults?: T): Promise<T> {
  const { file } = getContentPath(page, locale)

  try {
    const raw = await fs.readFile(file, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return (defaults ?? (getDefaultContent(page, locale) as T)) as T
  }
}

export async function writePageContent<T>(page: PageKey, locale: string, data: T) {
  const { dir, file } = getContentPath(page, locale)
  await fs.mkdir(dir, { recursive: true })
  await fs.writeFile(file, JSON.stringify(data, null, 2), 'utf-8')
}

