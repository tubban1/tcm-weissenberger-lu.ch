'use client'

import { useTranslations } from 'next-intl'

export default function ContactPage() {
  const t = useTranslations('contact')

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

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-6">
                {t('title')}
              </h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('address')}</h3>
                  <p className="text-gray-600">
                    Adresse wird noch hinzugefügt
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('phone')}</h3>
                  <p className="text-gray-600">
                    Telefonnummer wird noch hinzugefügt
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{t('email')}</h3>
                  <p className="text-gray-600">
                    E-Mail-Adresse wird noch hinzugefügt
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-6">
                {t('hours')}
              </h2>
              <div className="space-y-3 text-gray-600">
                <div className="flex justify-between">
                  <span>Montag - Freitag</span>
                  <span>09:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Samstag</span>
                  <span>Nach Vereinbarung</span>
                </div>
                <div className="flex justify-between">
                  <span>Sonntag</span>
                  <span>Geschlossen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-primary-700 mb-4">
                {t('transport')}
              </h3>
              <p className="text-gray-600">
                Öffentliche Verkehrsmittel Informationen werden noch hinzugefügt
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-primary-700 mb-4">
                {t('parking')}
              </h3>
              <p className="text-gray-600">
                Parkmöglichkeiten Informationen werden noch hinzugefügt
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-primary-700 mb-4">
                {t('insurance')}
              </h3>
              <p className="text-gray-600">
                ASCA / EMR / LCC anerkannt. Bitte kontaktieren Sie Ihre Krankenkasse für Details.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

