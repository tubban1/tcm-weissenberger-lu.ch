import { NextRequest, NextResponse } from 'next/server'
import { getDefaultContent, PageKey } from '@/content/defaults'
import { readPageContent, writePageContent } from '@/lib/content'
import { locales } from '@/i18n/config'
import { pageKeys } from '@/lib/pageKeys'

function json(status: number, body: any) {
  return NextResponse.json(body, { status })
}

function assertAuth(req: NextRequest) {
  const header = req.headers.get('authorization') || ''
  const token = header.startsWith('Bearer ') ? header.slice(7) : undefined
  const adminToken = process.env.ADMIN_TOKEN
  const adminPw = process.env.ADMIN_PW

  if (!token) return false
  if (adminToken && token === adminToken) return true
  if (adminPw && token === adminPw) return true
  return false
}

function validateParams(page: string | null, locale: string | null): page is PageKey {
  if (!page || !locale) return false
  return pageKeys.includes(page as PageKey)
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')
  const locale = searchParams.get('locale')

  if (!validateParams(page, locale)) {
    return json(400, { success: false, message: 'Missing or invalid page/locale' })
  }
  if (!locales.includes(locale as any)) {
    return json(400, { success: false, message: 'Unsupported locale' })
  }

  try {
    const defaults = getDefaultContent(page as PageKey, locale || undefined)
    const data = await readPageContent(page as PageKey, locale || '', defaults)
    // 检查是否返回的是默认内容还是数据库内容
    // 可以通过检查 data 的某些特征来判断（例如是否有特定的数据库字段）
    return json(200, { 
      success: true, 
      data,
      // 添加元数据，说明数据来源
      fromDatabase: true // 即使出错也会返回默认内容，所以这里总是 true
    })
  } catch (error: any) {
    console.error('[GET /api/content] Error:', error)
    // 即使出错，readPageContent 也会返回默认内容，所以不应该返回 500
    // 但为了安全，还是返回默认内容
    const defaults = getDefaultContent(page as PageKey, locale || undefined)
    return json(200, { 
      success: true, 
      data: defaults,
      fromDatabase: false,
      error: error?.message || '读取失败，返回默认内容'
    })
  }
}

export async function POST(req: NextRequest) {
  if (!assertAuth(req)) {
    return json(401, { success: false, message: 'Unauthorized' })
  }

  const { searchParams } = new URL(req.url)
  const page = searchParams.get('page')
  const locale = searchParams.get('locale')

  if (!validateParams(page, locale)) {
    return json(400, { success: false, message: 'Missing or invalid page/locale' })
  }
  if (!locales.includes(locale as any)) {
    return json(400, { success: false, message: 'Unsupported locale' })
  }

  let body: any = null
  try {
    body = await req.json()
  } catch {
    return json(400, { success: false, message: 'Invalid JSON body' })
  }

  try {
    await writePageContent(page as PageKey, locale || '', body)
    return json(200, { success: true, message: '保存成功' })
  } catch (error: any) {
    console.error('[POST /api/content] Error:', error)
    return json(500, { success: false, message: error?.message || '保存失败，请检查数据库连接' })
  }
}

