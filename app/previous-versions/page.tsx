import Link from 'next/link'
import Image from 'next/image'
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
      date: 'May 2024',
      notes: 'Added new annotation tools and improved performance.',
      macUrl: 'https://ftp.markury.app/installers/Markury%20v1.1.0/Markury%20v1.1.0.dmg',
      winUrl: 'https://ftp.markury.app/installers/Markury%20v1.1.0/Markury%20v1.1.0.exe',
    },
    {
      version: 'v1.0.1',
      date: 'March 2024',
      notes: 'Minor bug fixes and UI improvements.',
      macUrl: 'https://ftp.markury.app/installers/Markury%20v1.0.1/Markury%20v1.0.1.dmg',
      winUrl: 'https://ftp.markury.app/installers/Markury%20v1.0.1/Markury%20v1.0.1.exe',
    },
    {
      version: 'v1.0',
      date: 'January 2024',
      notes: 'Initial release of Markury.',
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

          <div className="max-w-4xl mx-auto mb-20">
            {/* Warning Banner */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 mb-10 flex items-start gap-4">
              <svg className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="text-base font-semibold text-yellow-900">We recommend using the latest version</h3>
                <p className="text-sm text-yellow-800 mt-1">
                  Older versions of Markury are provided for compatibility purposes and may not include the latest features or security updates. 
                  <Link href="/download" className="font-semibold underline ml-1 hover:text-yellow-900 transition-colors">Get the latest version here.</Link>
                </p>
              </div>
            </div>

            <div className="space-y-6">
              {versions.map((v) => (
                <div key={v.version} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h2 className="text-3xl font-bold text-gray-900">{v.version}</h2>
                          {v.date && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full border border-gray-200">
                              {v.date}
                            </span>
                          )}
                        </div>
                        {v.notes && <p className="text-gray-600">{v.notes}</p>}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {/* macOS Download */}
                      <a 
                        href={v.macUrl} 
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-orange-50 hover:border-orange-200 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center group-hover:border-orange-300 transition-colors p-2.5 shadow-sm">
                            <Image src="/apple.svg" alt="macOS" width={24} height={24} className="w-6 h-6 opacity-75 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 group-hover:text-orange-700 transition-colors">macOS</div>
                            <div className="text-sm text-gray-500">.dmg Installer</div>
                          </div>
                        </div>
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-orange-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>

                      {/* Windows Download */}
                      <a 
                        href={v.winUrl} 
                        className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-200 hover:shadow-sm transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center group-hover:border-blue-300 transition-colors p-2.5 shadow-sm">
                            <Image src="/windows.svg" alt="Windows" width={24} height={24} className="w-6 h-6 opacity-75 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 group-hover:text-blue-700 transition-colors">Windows</div>
                            <div className="text-sm text-gray-500">.exe Installer</div>
                          </div>
                        </div>
                        <svg className="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
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
