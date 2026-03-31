import ToolPageShell from '@/components/tools/ToolPageShell'
import QuizGenerator from '@/components/tools/QuizGenerator'

export const metadata = {
  title: 'Quiz Generator (Free) for Teachers - Markury Tools',
  description:
    'Generate grade-appropriate MCQs with options A–D and an answer key in seconds. Free quiz generator for Classes 5–12 by Markury.',
  alternates: { canonical: '/tools/quiz' },
  openGraph: {
    title: 'Quiz Generator (Free) for Teachers - Markury Tools',
    description:
      'Generate grade-appropriate MCQs with options A–D and an answer key in seconds. Free quiz generator for Classes 5–12 by Markury.',
    url: 'https://www.markury.app/tools/quiz',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Quiz Generator for Classes 5–12',
    description:
      'Generate MCQs with answers in seconds using this free tool from Markury.',
  },
}

export default function QuizToolPage() {
  return (
    <ToolPageShell
      slug="quiz"
      title="Quiz Generator"
      description="Generate MCQs with options A–D and an answer key, tailored to your grade level."
    >
      <QuizGenerator />
    </ToolPageShell>
  )
}

