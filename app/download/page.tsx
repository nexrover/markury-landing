import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Download Markury - Screen Annotation Tool for Mac & Windows',
  description: 'Download Markury for macOS or Windows. Start annotating your screen in seconds with the modern, lightweight screen drawing tool.',
  alternates: {
    canonical: '/download',
  },
  openGraph: {
    title: 'Download Markury - Screen Annotation Tool for Mac & Windows',
    description: 'Download Markury for macOS or Windows. Start annotating your screen in seconds.',
    url: 'https://www.markury.app/download',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Download Markury',
    description: 'Download Markury for macOS or Windows. Start annotating your screen in seconds.',
  },
}

export default function DownloadPage() {
  const downloads = [
    {
      platform: 'macOS',
      subtitle: 'Apple Silicon & Intel',
      icon: '/apple.svg',
      fileName: 'Markury v1.0.dmg',
      fileSize: '~19 MB',
      url: 'https://ftp.markury.app/installers/Markury%20v1.0.dmg',
      requirements: 'macOS 12 Monterey or later',
      instructions: [
        'Download the .dmg file',
        'Double-click to open the disk image',
        'Drag Markury into the Applications folder',
        'Launch from Applications',
      ],
    },
    {
      platform: 'Windows',
      subtitle: 'Windows 10 & 11',
      icon: '/windows.svg',
      fileName: 'Markury v1.0.exe',
      fileSize: '~11 MB',
      url: 'https://ftp.markury.app/installers/Markury%20v1.0.exe',
      requirements: 'Windows 10 (64-bit) or later',
      instructions: [
        'Download the .exe installer',
        'Double-click to run the installer',
        'Follow the on-screen prompts',
        'Markury launches automatically when done',
      ],
    },
  ]

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Markury',
    description: 'Screen annotation tool for Mac and Windows. Draw, highlight, and present directly on your screen.',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'macOS, Windows',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      description: 'Free trial available',
    },
    downloadUrl: [
      'https://ftp.markury.app/installers/Markury%20v1.0.dmg',
      'https://ftp.markury.app/installers/Markury%20v1.0.exe',
    ],
    softwareVersion: '1.0',
    author: {
      '@type': 'Organization',
      name: 'Nexrover',
      url: 'https://www.nexrover.com',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="bg-white text-gray-900 pt-32 sm:pt-36">
        <div className="container-narrow py-12 md:py-16">
          {/* Header */}
          <div className="text-center mb-16">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Download <span className="text-highlight text-highlight--soft">Mark</span>ury
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in seconds. Download Markury for your platform and start annotating your screen instantly.
            </p>
          </div>

          {/* Download Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-20">
            {downloads.map((item) => (
              <div
                key={item.platform}
                className="relative bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Platform header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center border border-gray-100 p-3">
                    <Image
                      src={item.icon}
                      alt={item.platform}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{item.platform}</h2>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                </div>

                {/* File info */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6 border border-gray-100">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-700">{item.fileName}</span>
                    {/* <span className="text-gray-500">{item.fileSize}</span> */}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Requires: {item.requirements}</p>
                </div>

                {/* Download button */}
                <a
                  href={item.url}
                  className="flex items-center justify-center gap-3 w-full px-6 py-3.5 text-base font-semibold text-gray-900 bg-markury-yellow rounded-xl hover:opacity-95 transition-all shadow-md hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                  Download for {item.platform}
                </a>

                {/* Quick install steps */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Install</h3>
                  <ol className="space-y-2">
                    {item.instructions.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                        <span className="flex-shrink-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold text-gray-500 mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </div>

          {/* macOS Gatekeeper Notice */}
          {/* <div className="max-w-3xl mx-auto mb-20">
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 sm:p-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-yellow-900 mb-2">macOS: &quot;App can&apos;t be opened&quot; Warning?</h3>
                  <p className="text-sm text-yellow-800 mb-3">
                    If macOS shows a warning that it cannot check the app for malicious software, follow these steps:
                  </p>
                  <ol className="space-y-1.5 text-sm text-yellow-800">
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">1.</span>
                      <strong>Right-click</strong> (or Control-click) Markury in Finder
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">2.</span>
                      Select <strong>Open</strong> from the context menu
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-semibold">3.</span>
                      Click <strong>Open</strong> in the dialog that appears
                    </li>
                  </ol>
                  <p className="text-xs text-yellow-700 mt-3">
                    You only need to do this once. After that, Markury opens normally.
                  </p>
                </div>
              </div>
            </div>
          </div> */}

          {/* Help links */}
          <div className="text-center pb-8">
            <p className="text-gray-500 text-sm">
              Need help? Check the{' '}
              <Link href="/user-guide#installation" className="text-gray-900 font-medium hover:underline">
                Installation Guide
              </Link>{' '}
              or{' '}
              <Link href="/contact-support" className="text-gray-900 font-medium hover:underline">
                Contact Support
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
