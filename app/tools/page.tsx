import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { TOOLS } from '@/components/tools/toolData'

export const metadata = {
  title: 'Free Teaching Tools for the Community - Markury',
  description:
    'Discover free teaching tools from Markury, including a Worksheet Generator and a Quiz Generator, plus lesson plan templates, rubrics, flashcards, and exam paper builders designed to save teachers time and help students understand complex concepts more clearly.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Free Teaching Tools for the Community - Markury',
    description:
      'Browse a growing collection of free AI-powered teaching tools from Markury to generate worksheets, quizzes, lesson plans, rubrics, flashcards, and exam papers for Classes 5–12.',
    url: 'https://www.markury.app/tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Teaching Tools by Markury',
    description:
      'Use free AI-powered tools from Markury to generate worksheets, quizzes, lesson plans, rubrics, flashcards, and exam papers in just a few seconds.',
  },
}

export default function ToolsPage() {
  const tools = TOOLS

  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-28 sm:pt-32">
        <section className="py-12 sm:py-16 bg-white">
          <div className="container-narrow">
            <div className="text-center mb-14 pt-6 sm:pt-10">
              <p className="text-xs font-semibold tracking-[0.18em] text-markury-gray uppercase mb-3">
                Free tools
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Free tools for the <span className="text-highlight text-highlight--soft">community</span>
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore a growing library of free, classroom-ready tools built for teachers, tutors, and students.
                Every Markury tool is designed to remove repetitive prep work, so you can focus on explaining concepts,
                giving feedback, and teaching live on screen.
              </p>
            </div>

            <div className="max-w-5xl mx-auto">
              <div className="grid gap-6 md:grid-cols-2">
                {tools.map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-lg transition-all"
                  >
                    <div className="bg-[#F5F7FA] flex items-center justify-center px-8 py-8 sm:px-10 sm:py-10">
                      <div className="w-full max-w-[220px] h-[140px] sm:h-[160px]">
                        {tool.icon}
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col px-5 pb-6 pt-5 sm:px-6">
                      <h2 className="font-bold text-gray-900 text-lg sm:text-xl">{tool.title}</h2>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed flex-1">
                        {tool.description}
                      </p>
                      <div className="mt-5">
                        <span className="inline-flex items-center px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 group-hover:border-gray-900 group-hover:text-gray-900 transition-colors">
                          Try tool
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="container-narrow max-w-4xl mt-16 mb-4">
            <div className="rounded-3xl bg-primary-50 border border-primary-100 px-6 py-12 sm:px-12 sm:py-16 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                Ready to teach it visually?
              </h2>
              <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto mb-8">
                Generate your content with these free tools, then use Markury to annotate, highlight, and explain
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

