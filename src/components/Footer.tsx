import Link from 'next/link'
import { readPageContent } from '@/lib/content'
import { footerDefaults } from '@/content/defaults'

export default async function Footer({ locale }: { locale: string }) {
  const content = await readPageContent('footer', locale, footerDefaults(locale))

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">{content.companyName || 'TCM Weissenberger'}</h3>
            <p className="text-sm">{content.description || ''}</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              {(content.links || []).map((link: any, idx: number) => (
                <li key={idx}>
                  <Link 
                    href={`/${locale}${link.href || ''}`} 
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">{content.contact?.title || 'Kontakt'}</h4>
            <ul className="space-y-2 text-sm">
              {content.contact?.address && <li>{content.contact.address}</li>}
              {content.contact?.phone && <li>{content.contact.phone}</li>}
              {content.contact?.email && <li>{content.contact.email}</li>}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            {content.copyright?.text || '© 2025 Powered by'}{' '}
            {content.copyright?.linkUrl ? (
              <>
                <a 
                  href={content.copyright.linkUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 underline transition-colors"
                >
                  {content.copyright.linkText || 'Tubban.com'}
                </a>
                {content.copyright.suffix && ` ${content.copyright.suffix}`}
              </>
            ) : (
              <>
                <a 
                  href="https://tubban.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 underline transition-colors"
                >
                  Tubban.com
                </a>
                {' '}Agentic AI Services.
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}

