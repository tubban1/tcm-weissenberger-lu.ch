import Link from 'next/link'
import { readPageContent } from '@/lib/content'
import { homeDefaults } from '@/content/defaults'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function HomePage({ params }: { params: { locale: string } }) {
  const { locale } = params
  const content = await readPageContent('home', locale, homeDefaults(locale))
  const hero = content.hero || {}
  const features = content.uniqueFeatures || []
  const services = content.services || []

  return (
    <div className="bg-white">
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {hero.title}
            </h1>
            {hero.subtitle && (
              <p className="text-xl md:text-2xl text-primary-600 font-semibold mb-4">{hero.subtitle}</p>
            )}
            {hero.tagline && <p className="text-lg text-gray-600 mb-2">{hero.tagline}</p>}
            {hero.description && <p className="text-base text-gray-500 mb-8">{hero.description}</p>}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href={`/${locale}/appointment`}
                className="bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
              >
                {hero.ctaLabel || 'Termin vereinbaren'}
              </Link>
              {hero.insurance && (
                <span className="text-sm text-primary-600 font-medium bg-primary-50 px-4 py-2 rounded-lg">
                  {hero.insurance}
                </span>
              )}
            </div>
            {hero.youtubeId && (
              <div className="mt-10 aspect-video max-w-4xl mx-auto">
                <iframe
                  className="w-full h-full rounded-lg shadow-lg"
                  src={`https://www.youtube.com/embed/${hero.youtubeId}`}
                  title="Hero Video"
                  allowFullScreen
                />
              </div>
            )}
            {hero.heroImage && !hero.youtubeId && (
              <div className="mt-10 max-w-4xl mx-auto">
                <img
                  src={hero.heroImage}
                  alt={hero.title || 'Hero'}
                  className="w-full rounded-lg shadow-lg object-cover"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16 bg-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {content.uniqueFeaturesTitle || 'Unsere Besonderheiten'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item: any, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary-700 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {content.coreServicesTitle || 'Unsere Behandlungen'}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.length ? (
              services.map((svc: any, idx: number) => (
                <div key={idx} className="text-center bg-white p-6 rounded-lg shadow-md">
                  <div className="text-4xl mb-3">{svc.icon || '•'}</div>
                  <h3 className="text-xl font-semibold text-primary-700 mb-2">{svc.title}</h3>
                  <p className="text-gray-600">{svc.description}</p>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">{content.coreServicesNote || '内容待添加'}</div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

