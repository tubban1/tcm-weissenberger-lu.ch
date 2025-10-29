export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-gray-900 text-center">联系方式</h1>
      <p className="text-gray-600 mb-12 text-center">
        欢迎与我们联系，我们会在第一时间回复您
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">诊所信息</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">地址</h3>
              <p className="text-gray-600">待补充</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">电话</h3>
              <p className="text-gray-600">待补充</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">邮箱</h3>
              <p className="text-gray-600">待补充</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">营业时间</h3>
              <p className="text-gray-600">
                周一至周五：待补充<br />
                周六：待补充<br />
                周日：休息
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">在线咨询</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700 mb-2">
                姓名 *
              </label>
              <input
                type="text"
                id="contact-name"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700 mb-2">
                邮箱 *
              </label>
              <input
                type="email"
                id="contact-email"
                name="email"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700 mb-2">
                留言 *
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="请输入您的咨询内容"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              发送消息
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

