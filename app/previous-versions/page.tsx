import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Previous Versions - Markury',
  description: 'Download previous versions of Markury for macOS and Windows.',
  alternates: {
    canonical: '/previous-versions',
  },
}

export default function PreviousVersionsPage() {
  const versions = [
    {
      version: 'v1.1.0',
      macUrl: 'https://ftp.markury.app/installers/Markury%20v1.1.0/Markury%20v1.1.0.dmg',
      winUrl: 'https://ftp.markury.app/installers/Markury%20v1.1.0/Markury%20v1.1.0.exe',
    },
    {
      version: 'v1.0.1',
      macUrl: 'https://ftp.markury.app/installers/Markury%20v1.0.1/Markury%20v1.0.1.dmg',
      winUrl: 'https://ftp.markury.app/installers/Markury%20v1.0.1/Markury%20v1.0.1.exe',
    },
    {
      version: 'v1.0',
      macUrl: 'https://ftp.markury.app/installers/Markury%20v1.0.dmg',
      winUrl: 'https://ftp.markury.app/installers/Markury%20v1.0.exe',
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-32 sm:pt-36 min-h-screen">
        <div className="container-narrow py-12 md:py-16">
          <div className="text-center mb-16">
            <Link 
              href="/download" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Download
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Previous <span className="text-highlight text-highlight--soft">Versions</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Download older releases of Markury for macOS or Windows.
            </p>
          </div>

          <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-3 bg-gray-50 p-4 border-b border-gray-200 font-semibold text-gray-700">
                <div>Version</div>
                <div>macOS</div>
                <div>Windows</div>
              </div>
              {versions.map((v, idx) => (
                <div key={v.version} className={`grid grid-cols-3 p-4 items-center ${idx !== versions.length - 1 ? 'border-b border-gray-100' : ''}`}>
                  <div className="font-medium text-gray-900">{v.version}</div>
                  <div>
                    <a href={v.macUrl} className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      .dmg
                    </a>
                  </div>
                  <div>
                    <a href={v.winUrl} className="inline-flex items-center gap-1.5 text-gray-600 hover:text-gray-900 font-medium transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      .exe
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
