import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import SharedQuizDeck from './SharedQuizDeck'

type McqItem = { question: string; options: string[]; answer: string }
type Row = { id: string; topic: string; grade: string; mcqs: McqItem[]; created_at: string }

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
}

async function getQuiz(id: string): Promise<Row | null> {
  const { data, error } = await getSupabase()
    .from('shared_quizzes')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !data) return null
  return data as Row
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const row = await getQuiz(id)
  if (!row) return { title: 'Quiz Not Found' }

  return {
    title: `${row.topic} Quiz (${row.grade}) - Markury`,
    description: `Take a ${row.mcqs.length}-question quiz on "${row.topic}" for ${row.grade}. Generated with Markury free tools.`,
    openGraph: {
      title: `${row.topic} Quiz - Markury`,
      description: `${row.mcqs.length} multiple-choice questions on "${row.topic}" for ${row.grade}.`,
    },
  }
}

export default async function SharedQuizPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const row = await getQuiz(id)
  if (!row) notFound()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="text-center mb-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-gray-500 uppercase mb-2">
            Shared Quiz
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mb-2">
            {row.topic}
          </h1>
          <p className="text-gray-600">
            {row.grade} &middot; {row.mcqs.length} questions
          </p>
        </div>

        <SharedQuizDeck mcqs={row.mcqs} />

        <div className="text-center mt-12 space-y-4">
          <p className="text-sm text-gray-500">
            Generated with{' '}
            <Link href="/" className="font-semibold text-gray-900 underline underline-offset-4">
              Markury
            </Link>
          </p>
          <Link
            href="/tools/quiz-generator"
            className="inline-flex items-center px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Create your own quiz
          </Link>
        </div>
      </div>
    </main>
  )
}
