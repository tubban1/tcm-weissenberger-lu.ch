import Link from 'next/link'
import { readPageContent } from '@/lib/content'
import { symptomsDefaults } from '@/content/defaults'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function SymptomsPage({ params }: { params: { locale: string } }) {
  const content = await readPageContent('symptoms', params.locale, symptomsDefaults(params.locale))

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
          {content.hero?.youtubeId && (
            <div className="mt-10 aspect-video max-w-4xl mx-auto">
              <iframe
                className="w-full h-full rounded-lg shadow-lg"
                src={`https://www.youtube.com/embed/${content.hero.youtubeId}`}
                title="Symptoms Video"
                allowFullScreen
              />
            </div>
          )}
          {content.hero?.heroImage && !content.hero?.youtubeId && (
            <div className="mt-10 max-w-4xl mx-auto">
              <img
                src={content.hero.heroImage}
                alt={content.hero.title || 'Symptoms'}
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {(content.symptoms || []).map((symptom: any, idx: number) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="text-4xl mb-4">{symptom.icon || '•'}</div>
                <h3 className="text-2xl font-semibold text-primary-700 mb-4">{symptom.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{symptom.description}</p>
                <Link
                  href={`/${params.locale}/appointment`}
                  className="inline-block text-primary-600 hover:text-primary-700 font-medium"
                >
                  {content.cta?.label || 'Termin vereinbaren'} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">{content.cta?.title}</h2>
          <p className="text-lg text-gray-600 mb-8">{content.cta?.body}</p>
          <Link
            href={`/${params.locale}/appointment`}
            className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
          >
            {content.cta?.label || 'Termin vereinbaren'}
          </Link>
        </div>
      </section>
    </div>
  )
}

