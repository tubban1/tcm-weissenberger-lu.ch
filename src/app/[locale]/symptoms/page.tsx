'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'

export default function SymptomsPage() {
  const t = useTranslations('symptoms')
  const locale = useLocale()

  const symptoms = [
    {
      key: 'backPain',
      icon: '🔹',
    },
    {
      key: 'migraine',
      icon: '🔹',
    },
    {
      key: 'stress',
      icon: '🔹',
    },
    {
      key: 'digestion',
      icon: '🔹',
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
            Wie TCM bei verschiedenen Beschwerden helfen kann
          </p>
        </div>
      </section>

      {/* Symptoms Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {symptoms.map((symptom) => (
              <div
                key={symptom.key}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{symptom.icon}</div>
                <h3 className="text-2xl font-semibold text-primary-700 mb-4">
                  {t(`${symptom.key}.title`)}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t(`${symptom.key}.description`)}
                </p>
                <Link
                  href={`/${locale}/appointment`}
                  className="inline-block text-primary-600 hover:text-primary-700 font-medium"
                >
                  Termin vereinbaren →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Haben Sie Fragen zu Ihrer Beschwerde?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Vereinbaren Sie eine Beratung und lassen Sie sich individuell behandeln
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

