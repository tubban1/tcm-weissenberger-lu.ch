import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">TCM Weissenberger</h3>
            <p className="text-sm">
              专业中医诊疗服务，传承中医文化，为您提供健康保障
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  关于我们
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  服务项目
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="hover:text-white transition-colors">
                  预约就诊
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  联系方式
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">联系方式</h4>
            <ul className="space-y-2 text-sm">
              <li>地址：待补充</li>
              <li>电话：待补充</li>
              <li>邮箱：待补充</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© {new Date().getFullYear()} TCM Weissenberger. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

