'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function HomePage() {
  const t = useTranslations('home')
  const locale = useLocale()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl text-primary-600 font-semibold mb-4">
              {t('subtitle')}
            </p>
            <p className="text-lg text-gray-600 mb-2">
              {t('tagline')}
            </p>
            <p className="text-base text-gray-500 mb-8">
              {t('description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${locale}/appointment`}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
              >
                {t('quickAppointment')}
              </Link>
              <span className="text-sm text-primary-600 font-medium bg-primary-50 px-4 py-2 rounded-lg">
                {t('insurance')}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Features */}
      <section className="py-16 bg-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('uniqueFeatures.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">
                ICD-11 System
              </h3>
              <p className="text-gray-600">
                {t('uniqueFeatures.icd11')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">
                AI Analysis
              </h3>
              <p className="text-gray-600">
                {t('uniqueFeatures.ai')}
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">
                Transparency
              </h3>
              <p className="text-gray-600">
                {t('uniqueFeatures.transparent')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Services Preview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {t('coreServices')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Service cards will be added here */}
            <div className="text-center text-gray-500">
              {t('coreServices')} - Coming soon
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

