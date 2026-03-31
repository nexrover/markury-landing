import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function ToolPageShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-28 sm:pt-32">
        <section className="py-12 sm:py-16 bg-white">
          <div className="container-narrow">
            <div className="text-center mb-10">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Tools
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">{description}</p>
            </div>
          </div>
        </section>

        {children}
      </main>
      <Footer />
    </>
  )
}

