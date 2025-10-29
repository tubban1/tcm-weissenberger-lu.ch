export default function ServicesPage() {
  const services = [
    {
      title: '针灸治疗',
      description: '运用传统针灸技术，通过刺激特定穴位，调节人体气血，治疗各种疾病和症状。',
      benefits: ['缓解疼痛', '改善睡眠', '调节内分泌', '增强免疫力'],
    },
    {
      title: '中药调理',
      description: '根据个人体质和病情，开具个性化中药处方，调理身体机能，恢复健康平衡。',
      benefits: ['个性化配方', '调理体质', '慢性病调理', '术后恢复'],
    },
    {
      title: '推拿按摩',
      description: '采用中医推拿手法，疏通经络，放松肌肉，缓解疲劳，促进血液循环。',
      benefits: ['缓解筋骨疼痛', '放松身心', '改善血液循环', '舒缓压力'],
    },
    {
      title: '拔罐疗法',
      description: '传统拔罐疗法，通过负压作用，促进局部血液循环，缓解肌肉紧张。',
      benefits: ['疏通经络', '活血化瘀', '缓解肌肉酸痛', '改善局部循环'],
    },
    {
      title: '艾灸治疗',
      description: '利用艾草的温热作用，温通经络，驱寒除湿，增强身体抵抗力。',
      benefits: ['温经散寒', '补气养血', '增强体质', '预防疾病'],
    },
    {
      title: '中医咨询',
      description: '提供专业的中医健康咨询，制定个性化的养生方案和调理建议。',
      benefits: ['健康评估', '养生指导', '饮食建议', '生活方式调整'],
    },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">服务项目</h1>
      <p className="text-xl text-gray-600 mb-12 text-center max-w-2xl mx-auto">
        我们提供全面的中医诊疗服务，帮助您恢复健康，提升生活质量
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-semibold mb-3 text-gray-900">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-2">主要功效：</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="text-sm">{benefit}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

