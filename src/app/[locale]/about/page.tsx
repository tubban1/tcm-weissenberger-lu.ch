'use client'

import { useTranslations } from 'next-intl'

export default function AboutPage() {
  const t = useTranslations('about')

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            {t('title')}
          </h1>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">
              {t('mission')}
            </h2>
            <p className="text-gray-600 leading-relaxed">
              {t('values')}
            </p>
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Qualifikationen & Zertifizierungen
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">
                Ausbildung
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• TCM Bachelor / Master Abschluss</li>
                <li>• Kontinuierliche Weiterbildung</li>
                <li>• Wissenschaftlich fundierte Methoden</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-primary-700 mb-3">
                Zertifizierungen
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• ASCA anerkannt</li>
                <li>• EMR anerkannt</li>
                <li>• LCC anerkannt</li>
                <li>• TCM-Fachverband Mitglied</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Languages Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Sprachen
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="bg-primary-100 text-primary-700 px-6 py-3 rounded-lg font-medium">
              Deutsch
            </span>
            <span className="bg-primary-100 text-primary-700 px-6 py-3 rounded-lg font-medium">
              English
            </span>
            <span className="bg-primary-100 text-primary-700 px-6 py-3 rounded-lg font-medium">
              中文
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

