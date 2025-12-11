import { aboutDefaults } from '@/content/defaults'
import { readPageContent } from '@/lib/content'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function AboutPage({ params }: { params: { locale: string } }) {
  const content = await readPageContent('about', params.locale, aboutDefaults(params.locale))

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
                title="About Video"
                allowFullScreen
              />
            </div>
          )}
          {content.hero?.heroImage && !content.hero?.youtubeId && (
            <div className="mt-10 max-w-4xl mx-auto">
              <img
                src={content.hero.heroImage}
                alt={content.hero.title || 'About'}
                className="w-full rounded-lg shadow-lg object-cover"
              />
            </div>
          )}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">
              {content.mission?.title || 'Mission'}
            </h2>
            <p className="text-gray-600 leading-relaxed">{content.mission?.body}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-primary-700 mb-4">
              {content.values?.title || 'Werte'}
            </h2>
            <p className="text-gray-600 leading-relaxed">{content.values?.body}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {content.qualificationsTitle || 'Qualifikationen & Zertifizierungen'}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {(content.qualifications || []).map((block: any, idx: number) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-primary-700 mb-3">{block.title}</h3>
                <ul className="space-y-2 text-gray-600">
                  {(block.items || []).map((item: string, i: number) => (
                    <li key={i}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            {content.languagesTitle || 'Sprachen'}
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {(content.languages || []).map((lang: string, idx: number) => (
              <span key={idx} className="bg-primary-100 text-primary-700 px-6 py-3 rounded-lg font-medium">
                {lang}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

