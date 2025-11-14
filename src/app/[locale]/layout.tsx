import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n/config'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import HtmlLangSetter from '@/components/HtmlLangSetter'
import '../globals.css'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const { locale } = await params
  
  // 验证语言参数
  if (!locales.includes(locale as any)) {
    notFound()
  }

  // 获取翻译消息
  const messages = await getMessages()

  return (
    <div className="font-sans antialiased">
      <HtmlLangSetter locale={locale} />
      <NextIntlClientProvider messages={messages}>
        <Nav />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </NextIntlClientProvider>
    </div>
  )
}

