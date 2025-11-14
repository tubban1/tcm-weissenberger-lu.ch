'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

export default function Footer() {
  const locale = useLocale()
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">TCM Weissenberger</h3>
            <p className="text-sm">
              {t('description')}
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('links')}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href={`/${locale}/about`} className="hover:text-white transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/services`} className="hover:text-white transition-colors">
                  {tNav('services')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/appointment`} className="hover:text-white transition-colors">
                  {tNav('appointment')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="hover:text-white transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{t('contact')}</h4>
            <ul className="space-y-2 text-sm">
              <li>Address: To be added</li>
              <li>Phone: To be added</li>
              <li>Email: To be added</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            © 2025 Powered by{' '}
            <a 
              href="https://tubban.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 underline transition-colors"
            >
              Tubban.com
            </a>
            {' '}Agentic AI Services.
          </p>
        </div>
      </div>
    </footer>
  )
}

