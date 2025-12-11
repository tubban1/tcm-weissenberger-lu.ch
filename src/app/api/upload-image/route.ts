import { NextRequest, NextResponse } from 'next/server'
import { uploadToFreeimageHost } from '@/lib/uploaders/freeimage'

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

export async function POST(req: NextRequest) {
  if (!assertAuth(req)) {
    return json(401, { success: false, message: 'Unauthorized' })
  }

  const apiKey = process.env.FREEIMAGE_HOST_API_KEY
  if (!apiKey) {
    return json(500, { success: false, message: '缺少 FREEIMAGE_HOST_API_KEY' })
  }

  const formData = await req.formData()
  const file = formData.get('file')

  if (!file || typeof file === 'string' || !(file as any).arrayBuffer) {
    return json(400, { success: false, message: '未找到文件字段 file' })
  }

  try {
    const arrayBuffer = await (file as Blob).arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const result = await uploadToFreeimageHost(
      {
        buffer,
        filename: (file as any).name || 'upload.bin',
        mimeType: (file as any).type || 'application/octet-stream',
      },
      apiKey
    )
    return json(200, { success: true, image: result })
  } catch (error: any) {
    return json(500, { success: false, message: error?.message || '上传失败' })
  }
}

