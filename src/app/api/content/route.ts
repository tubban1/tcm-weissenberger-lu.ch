import { NextRequest, NextResponse } from 'next/server'
import { getDefaultContent, PageKey } from '@/content/defaults'
import { readPageContent, writePageContent } from '@/lib/content'
import { locales } from '@/i18n/config'

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
  return ['home', 'about', 'services', 'symptoms', 'appointment', 'contact'].includes(page)
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

  const defaults = getDefaultContent(page as PageKey, locale)
  const data = await readPageContent(page as PageKey, locale, defaults)

  return json(200, { success: true, data })
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

  await writePageContent(page as PageKey, locale, body)
  return json(200, { success: true })
}

