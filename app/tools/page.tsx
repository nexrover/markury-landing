import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Tools - Markury',
  description:
    'Free tools from Markury for teachers and students. Generate worksheets, quizzes, and more in seconds.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Tools - Markury',
    description:
      'Free tools from Markury for teachers and students. Generate worksheets, quizzes, and more in seconds.',
    url: 'https://www.markury.app/tools',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Tools - Markury',
    description:
      'Free tools from Markury for teachers and students. Generate worksheets, quizzes, and more in seconds.',
  },
}

export default function ToolsPage() {
  const tools = [
    {
      href: '/tools/worksheet',
      title: 'Worksheet / Quiz Generator',
      description: 'Generate MCQs and short questions with answers in seconds.',
    },
    {
      href: '/tools/lesson-plan',
      title: 'Lesson Plan Generator',
      description: 'Generate a simple lesson plan with objectives and activities.',
    },
    {
      href: '/tools/rubric',
      title: 'Rubric Generator',
      description: 'Create grading rubrics for assignments and projects.',
    },
    {
      href: '/tools/flashcards',
      title: 'Flashcards Generator',
      description: 'Turn a topic into quick revision flashcards.',
    },
    {
      href: '/tools/exam-paper',
      title: 'Exam Paper Builder',
      description: 'Build a balanced paper with sections, marks, and an answer key.',
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-28 sm:pt-32">
        <section className="py-12 sm:py-16 bg-white">
          <div className="container-narrow">
            <div className="text-center mb-10">
              <Link
                href="/"
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
                Back to Home
              </Link>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Tools by <span className="text-highlight text-highlight--soft">Mark</span>ury
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Fast, practical tools for teachers and students. More coming soon.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tools</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {tools.map((tool) => (
                    <Link
                      key={tool.href}
                      href={tool.href}
                      className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
                    >
                      <p className="font-semibold text-gray-900">{tool.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{tool.description}</p>
                      <p className="text-xs text-gray-500 mt-3">Free community tool</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

