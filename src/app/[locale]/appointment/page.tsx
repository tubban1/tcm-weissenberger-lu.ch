'use client'

import { useTranslations } from 'next-intl'

export default function AppointmentPage() {
  const t = useTranslations('appointment')

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Google Calendar Appointment Scheduling */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1it6AjotMsExF6VbZH6WcVYds3A4ElpTdbpXh668CxO7MTdxskRnyplsLs9PNv3ZCp4bK2ZA76?gv=true&hl=de" 
              style={{ border: 0 }} 
              width="100%" 
              height="600" 
              frameBorder="0"
              title="Google Calendar Appointment Scheduling"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

