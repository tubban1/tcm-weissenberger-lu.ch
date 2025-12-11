import { contactDefaults } from '@/content/defaults'
import { readPageContent } from '@/lib/content'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function ContactPage({ params }: { params: { locale: string } }) {
  const content = await readPageContent('contact', params.locale, contactDefaults(params.locale))

  return (
    <div className="bg-white">
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 text-center">
            {content.hero?.title}
          </h1>
          {content.hero?.subtitle && (
            <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto">{content.hero.subtitle}</p>
          )}
          {content.hero?.youtubeId && (
            <div className="mt-10 aspect-video max-w-4xl mx-auto">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src={`https://www.youtube.com/embed/${content.hero.youtubeId}`}
                title="Contact Video"
                allowFullScreen
              />
            </div>
          )}
          {content.hero?.heroImage && !content.hero?.youtubeId && (
            <div className="mt-10 max-w-4xl mx-auto">
              <img
                src={content.hero.heroImage}
                alt={content.hero.title || 'Contact'}
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-6">{content.details?.title || content.hero?.title}</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{content.details?.addressLabel}</h3>
                  <p className="text-gray-600">{content.details?.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{content.details?.phoneLabel}</h3>
                  <p className="text-gray-600">{content.details?.phone}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{content.details?.emailLabel}</h3>
                  <p className="text-gray-600">{content.details?.email}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-semibold text-primary-700 mb-6">
                {content.hours?.title || 'Öffnungszeiten'}
              </h2>
              <div className="space-y-3 text-gray-600">
                {(content.hours?.rows || []).map((row: any, idx: number) => (
                  <div key={idx} className="flex justify-between">
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {(content.infoCards || []).map((card: any, idx: number) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-primary-700 mb-4">{card.title}</h3>
                <p className="text-gray-600">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

