import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            欢迎来到 TCM Weissenberger
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            传承中医文化，为您提供专业的中医诊疗服务，守护您和家人的健康
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/appointment"
              className="bg-primary-600 text-white px-8 py-3 rounded-lg hover:bg-primary-700 transition-colors"
            >
              预约就诊
            </Link>
            <Link
              href="/services"
              className="border-2 border-primary-600 text-primary-600 px-8 py-3 rounded-lg hover:bg-primary-50 transition-colors"
            >
              了解服务
            </Link>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            我们的服务
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: '针灸治疗',
                description: '传统针灸疗法，缓解疼痛，调理身体',
                icon: '📍',
              },
              {
                title: '中药调理',
                description: '个性化中药配方，调理体质，增强免疫力',
                icon: '🌿',
              },
              {
                title: '推拿按摩',
                description: '专业推拿手法，舒缓筋骨，放松身心',
                icon: '💆',
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/services"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              查看更多服务 →
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">关于我们</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            TCM Weissenberger 是一家专业的中医诊所，致力于传承和发扬传统中医文化。
            我们的医师拥有丰富的临床经验，为患者提供个性化、专业的中医诊疗服务。
          </p>
          <Link
            href="/about"
            className="inline-block text-primary-600 hover:text-primary-700 font-medium"
          >
            了解更多 →
          </Link>
        </div>
      </section>
    </div>
  )
}

