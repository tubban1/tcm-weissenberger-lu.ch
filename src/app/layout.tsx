import { defaultLocale } from '@/i18n/config'
import './globals.css'

// 根布局：返回完整的 HTML 结构
// next-intl 中间件会自动处理语言路由，将 / 重定向到 /de
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang={defaultLocale}>
      <body className="font-sans antialiased bg-white text-gray-900">{children}</body>
    </html>
  )
}

