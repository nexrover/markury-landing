import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const ALL_TOOLS = [
  {
    slug: 'worksheet',
    href: '/tools/worksheet',
    title: 'Worksheet Generator',
    description: 'Generate worksheets with MCQs and short-answer questions plus an answer key.',
    icon: (
      <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
        <rect x="30" y="10" width="60" height="80" rx="6" fill="#FACC15" fillOpacity="0.18" stroke="#FACC15" strokeWidth="1.5" />
        <rect x="40" y="22" width="28" height="3" rx="1.5" fill="#FACC15" />
        <rect x="40" y="30" width="40" height="2" rx="1" fill="#D1D5DB" />
        <rect x="40" y="36" width="40" height="2" rx="1" fill="#D1D5DB" />
        <circle cx="42" cy="48" r="3" fill="#FACC15" />
        <rect x="48" y="46.5" width="28" height="3" rx="1.5" fill="#6B7280" />
        <circle cx="42" cy="58" r="3" fill="#FACC15" />
        <rect x="48" y="56.5" width="28" height="3" rx="1.5" fill="#6B7280" />
        <circle cx="42" cy="68" r="3" fill="#FACC15" />
        <rect x="48" y="66.5" width="28" height="3" rx="1.5" fill="#6B7280" />
      </svg>
    ),
  },
  {
    slug: 'quiz',
    href: '/tools/quiz',
    title: 'Quiz Generator',
    description: 'Generate MCQs with options A–D and an answer key for quick practice.',
    icon: (
      <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
        <rect x="28" y="10" width="64" height="80" rx="6" fill="#22D3EE" fillOpacity="0.12" stroke="#22D3EE" strokeWidth="1.5" />
        <circle cx="48" cy="32" r="8" fill="#22D3EE" fillOpacity="0.25" />
        <path d="M46 30l3 4 7-10" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="44" y="46" width="44" height="6" rx="3" fill="#22D3EE" fillOpacity="0.35" />
        <rect x="36" y="58" width="52" height="2" rx="1" fill="#D1D5DB" />
        <rect x="36" y="64" width="40" height="2" rx="1" fill="#D1D5DB" />
        <rect x="36" y="74" width="52" height="3" rx="1.5" fill="#22D3EE" fillOpacity="0.35" />
      </svg>
    ),
  },
  {
    slug: 'lesson-plan',
    href: '/tools/lesson-plan',
    title: 'Lesson Plan Generator',
    description: 'Create a structured lesson plan with objectives and activities.',
    icon: (
      <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
        <rect x="25" y="12" width="70" height="76" rx="6" fill="#22D3EE" fillOpacity="0.12" stroke="#22D3EE" strokeWidth="1.5" />
        <rect x="35" y="24" width="30" height="3" rx="1.5" fill="#22D3EE" />
        <rect x="35" y="33" width="50" height="2" rx="1" fill="#D1D5DB" />
        <rect x="35" y="39" width="50" height="2" rx="1" fill="#D1D5DB" />
        <rect x="35" y="49" width="22" height="3" rx="1.5" fill="#22D3EE" />
        <rect x="35" y="56" width="50" height="2" rx="1" fill="#D1D5DB" />
        <rect x="35" y="62" width="50" height="2" rx="1" fill="#D1D5DB" />
      </svg>
    ),
  },
  {
    slug: 'rubric',
    href: '/tools/rubric',
    title: 'Rubric Generator',
    description: 'Build grading rubrics with criteria and performance levels.',
    icon: (
      <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
        <rect x="20" y="14" width="80" height="72" rx="6" fill="#C084FC" fillOpacity="0.12" stroke="#C084FC" strokeWidth="1.5" />
        <line x1="20" y1="32" x2="100" y2="32" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="20" y1="50" x2="100" y2="50" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="20" y1="68" x2="100" y2="68" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="48" y1="14" x2="48" y2="86" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="74" y1="14" x2="74" y2="86" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
        <rect x="26" y="20" width="16" height="3" rx="1.5" fill="#C084FC" />
        <rect x="54" y="20" width="12" height="3" rx="1.5" fill="#D1D5DB" />
        <rect x="80" y="20" width="12" height="3" rx="1.5" fill="#D1D5DB" />
        <rect x="26" y="38" width="16" height="3" rx="1.5" fill="#C084FC" />
        <rect x="54" y="38" width="12" height="3" rx="1.5" fill="#D1D5DB" />
        <rect x="80" y="38" width="12" height="3" rx="1.5" fill="#D1D5DB" />
      </svg>
    ),
  },
  {
    slug: 'flashcards',
    href: '/tools/flashcards',
    title: 'Flashcards Generator',
    description: 'Turn any topic into Q&A flashcards for quick revision.',
    icon: (
      <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
        <rect x="32" y="20" width="56" height="60" rx="6" fill="#E5E7EB" fillOpacity="0.6" />
        <rect x="26" y="14" width="56" height="60" rx="6" fill="#FB923C" fillOpacity="0.15" stroke="#FB923C" strokeWidth="1.5" />
        <text x="54" y="38" textAnchor="middle" fill="#FB923C" fontSize="14" fontWeight="700">Q</text>
        <rect x="36" y="46" width="36" height="2" rx="1" fill="#D1D5DB" />
        <rect x="36" y="52" width="28" height="2" rx="1" fill="#D1D5DB" />
        <rect x="36" y="60" width="16" height="5" rx="2.5" fill="#FB923C" fillOpacity="0.4" />
      </svg>
    ),
  },
  {
    slug: 'exam-paper',
    href: '/tools/exam-paper',
    title: 'Exam Paper Builder',
    description: 'Generate a balanced exam paper with sections, marks, and an answer key.',
    icon: (
      <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
        <rect x="30" y="8" width="60" height="84" rx="6" fill="#FB7185" fillOpacity="0.12" stroke="#FB7185" strokeWidth="1.5" />
        <rect x="42" y="18" width="36" height="4" rx="2" fill="#FB7185" />
        <rect x="40" y="28" width="40" height="2" rx="1" fill="#D1D5DB" />
        <rect x="40" y="34" width="40" height="2" rx="1" fill="#D1D5DB" />
        <rect x="40" y="44" width="20" height="3" rx="1.5" fill="#FB7185" fillOpacity="0.6" />
        <rect x="40" y="51" width="40" height="2" rx="1" fill="#D1D5DB" />
        <rect x="40" y="57" width="40" height="2" rx="1" fill="#D1D5DB" />
      </svg>
    ),
  },
]

export default function ToolPageShell({
  slug,
  title,
  description,
  children,
}: {
  slug: string
  title: string
  description: string
  children: React.ReactNode
}) {
  const otherTools = ALL_TOOLS.filter((t) => t.slug !== slug)

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
