const FREEIMAGE_ENDPOINT = 'https://freeimage.host/api/1/upload'

type UploadResult = {
  url: string
  displayUrl?: string
  viewerUrl?: string
  imageId?: string
  deleteHash?: string
}

type UploadFile = {
  buffer: Buffer
  filename: string
  mimeType?: string
}

export async function uploadToFreeimageHost(file: UploadFile, apiKey: string): Promise<UploadResult> {
  const formData = new FormData()
  formData.append('key', apiKey)
  formData.append('action', 'upload')
  formData.append('format', 'json')
  formData.append(
    'source',
    new Blob([file.buffer], { type: file.mimeType || 'application/octet-stream' }),
    file.filename || 'upload.bin'
  )

  const res = await fetch(FREEIMAGE_ENDPOINT, {
    method: 'POST',
    body: formData,
  })

  const data = await res.json()

  if (!res.ok || data?.status_code !== 200 || !data?.success) {
    const message = data?.status_txt || data?.error?.message || '上传失败'
    throw new Error(message)
  }

  const image = data.image || {}
  return {
    url: image.url,
    displayUrl: image.display_url || image.url,
    viewerUrl: image.url_viewer,
    imageId: image.id_encoded || image.id,
    deleteHash: image.storage_id,
  }
}

