import { appointmentDefaults } from '@/content/defaults'
import { readPageContent } from '@/lib/content'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AppointmentPage({ params }: { params: { locale: string } }) {
  const content = await readPageContent('appointment', params.locale, appointmentDefaults(params.locale))

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            {content.hero?.title}
          </h1>
          {content.hero?.subtitle && (
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">{content.hero.subtitle}</p>
          )}
          {(content.hero as any)?.youtubeId && (
            <div className="mt-10 aspect-video max-w-4xl mx-auto">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src={`https://www.youtube.com/embed/${(content.hero as any).youtubeId}`}
                title="Appointment Video"
                allowFullScreen
              />
            </div>
          )}
          {(content.hero as any)?.heroImage && !(content.hero as any)?.youtubeId && (
            <div className="mt-10 max-w-4xl mx-auto">
              <img
                src={(content.hero as any).heroImage}
                alt={content.hero?.title || 'Appointment'}
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-4 md:p-8">
            {content.calendarUrl ? (
              <iframe
                src={content.calendarUrl}
                style={{ border: 0 }}
                width="100%"
                height="600"
                frameBorder="0"
                title="Appointment Scheduling"
              />
            ) : (
              <div className="text-center text-gray-600">请在后台填写 calendarUrl</div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

