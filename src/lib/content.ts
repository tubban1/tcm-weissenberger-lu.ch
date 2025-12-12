import 'server-only'
import { getDefaultContent, PageKey } from '@/content/defaults'
import { locales } from '@/i18n/config'
import { query } from '@/lib/db'

const ensureLocale = (locale: string) =>
  locales.includes(locale as any) ? locale : locales[0]

export async function readPageContent<T>(page: PageKey, locale: string, defaults?: T): Promise<T> {
  const safeLocale = ensureLocale(locale)

  try {
    const results = await query(
      'SELECT content FROM tcm_lu_page_content WHERE page_key = ? AND locale = ?',
      [page, safeLocale]
    ) as any[]

    if (results && results.length > 0) {
      const content = results[0].content
      // MySQL JSON 字段可能返回对象或字符串
      const parsedContent = (typeof content === 'string' ? JSON.parse(content) : content) as T
      console.log(`[readPageContent] ✅ Loaded from database: ${page} (${safeLocale})`)
      return parsedContent
    } else {
      console.log(`[readPageContent] ⚠️  No data in database for ${page} (${safeLocale}), using defaults`)
    }
  } catch (error: any) {
    console.error(`[readPageContent] ❌ Database error for ${page} (${safeLocale}):`, error?.message || error)
    // 数据库错误时会回退到默认内容
  }

  const defaultContent = (defaults ?? (getDefaultContent(page, safeLocale) as T)) as T
  return defaultContent
}

export async function writePageContent<T>(page: PageKey, locale: string, data: T) {
  const safeLocale = ensureLocale(locale)
  const contentJson = JSON.stringify(data)

  await query(
    `INSERT INTO tcm_lu_page_content (page_key, locale, content)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE
       content = VALUES(content),
       updated_at = CURRENT_TIMESTAMP`,
    [page, safeLocale, contentJson]
  )
}

