'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function ServicesPage() {
  const t = useTranslations('services')
  const locale = useLocale()

  const services = [
    {
      key: 'acupuncture',
      icon: '📍',
    },
    {
      key: 'herbs',
      icon: '🌿',
    },
    {
      key: 'tuina',
      icon: '💆',
    },
    {
      key: 'cupping',
      icon: '🔥',
    },
    {
      key: 'moxibustion',
      icon: '🌡️',
    },
    {
      key: 'consultation',
      icon: '💬',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Professionelle TCM-Behandlungen für Ihre Gesundheit
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.key}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-5xl mb-4 text-center">{service.icon}</div>
                <h3 className="text-2xl font-semibold text-primary-700 mb-4 text-center">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Bereit für eine Behandlung?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Vereinbaren Sie noch heute einen Termin
          </p>
          <Link
            href={`/${locale}/appointment`}
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
          >
            Termin vereinbaren
          </Link>
        </div>
      </section>
    </div>
  )
}

