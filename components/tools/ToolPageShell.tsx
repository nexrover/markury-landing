import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { TOOLS, titleToToolSlug } from '@/components/tools/toolData'

export default function ToolPageShell({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: React.ReactNode
}) {
  const currentToolSlug = titleToToolSlug(title)
  const otherTools = TOOLS.filter((tool) => titleToToolSlug(tool.title) !== currentToolSlug)

  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-40 sm:pt-44">
        {/* Breadcrumb */}
        <div className="container-narrow pt-8 sm:pt-10">
          <nav className="flex items-center justify-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
            <span>›</span>
            <Link href="/tools" className="hover:text-gray-900 transition-colors">Tools</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{title}</span>
          </nav>
        </div>

        {/* Title */}
        <section className="pt-6 sm:pt-8 pb-2 bg-white">
          <div className="container-narrow text-center">
            <p className="text-xs font-semibold tracking-[0.18em] text-markury-gray uppercase mb-3">
              Tools
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </section>

        {/* Generator */}
        <div className="mt-6 sm:mt-8">{children}</div>

        {/* Other tools */}
        <section className="py-16 sm:py-20 bg-[#F5F7FA]">
          <div className="container-narrow">
            <div className="text-center mb-10">
              <p className="text-xs font-semibold tracking-[0.18em] text-markury-gray uppercase mb-2">
                Other tools
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Try our other free tools!
              </h2>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {otherTools.map((tool) => (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg transition-all"
                >
                  <div className="bg-[#F0F3F8] flex items-center justify-center px-6 py-6">
                    <div className="w-full max-w-[140px] h-[90px]">
                      {tool.icon}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
                    <h3 className="font-bold text-gray-900 text-base">{tool.title}</h3>
                    <p className="text-sm text-gray-600 mt-1.5 leading-relaxed flex-1">
                      {tool.description}
                    </p>
                    <div className="mt-4">
                      <span className="inline-flex items-center px-3.5 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-700 group-hover:border-gray-900 group-hover:text-gray-900 transition-colors">
                        Try tool
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Markury CTA */}
        <section className="py-10 sm:py-14">
          <div className="container-narrow max-w-4xl">
            <div className="rounded-3xl bg-primary-50 border border-primary-100 px-6 py-12 sm:px-12 sm:py-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Ready to teach it visually?
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto mb-8">
                Generate your content with this free tool, then use Markury to annotate, highlight, and explain
                it live on screen during recordings and presentations.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/download"
                  className="btn-primary w-full sm:w-auto"
                >
                  Try Markury
                </Link>
                <Link
                  href="/#how-it-works"
                  className="btn-secondary w-full sm:w-auto"
                >
                  See how it works
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
