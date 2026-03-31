import ToolPageShell from '@/components/tools/ToolPageShell'
import WorksheetGenerator from '@/components/WorksheetGenerator'

export const metadata = {
  title: 'Worksheet / Quiz Generator (Free) for Teachers - Markury Tools',
  description:
    'Use this free worksheet and quiz generator by Markury to instantly create MCQs and short-answer questions with answers for Classes 5–12. Perfect for quick tests, homework, and in-class practice.',
  alternates: { canonical: '/tools/worksheet' },
  openGraph: {
    title: 'Worksheet / Quiz Generator (Free) for Teachers - Markury Tools',
    description:
      'Instantly generate printable worksheets with MCQs and short questions plus answer keys for Classes 5–12 using this free tool from Markury.',
    url: 'https://www.markury.app/tools/worksheet',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Worksheet / Quiz Generator for Classes 5–12',
    description:
      'Create classroom-ready worksheets and quizzes with MCQs and short-answer questions for Classes 5–12 in seconds.',
  },
}

export default function WorksheetToolPage() {
  return (
    <ToolPageShell
      slug="worksheet"
      title="Worksheet Generator"
      description="Generate a complete worksheet with multiple-choice and short-answer questions, plus an answer key, so you can quickly test understanding or send home targeted practice without building everything from scratch."
    >
      <WorksheetGenerator />
    </ToolPageShell>
  )
}

