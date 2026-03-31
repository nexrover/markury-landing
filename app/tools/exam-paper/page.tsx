import ToolPageShell from '@/components/tools/ToolPageShell'
import ExamPaperGenerator from '@/components/tools/ExamPaperGenerator'

export const metadata = {
  title: 'Exam Paper Builder (Free) for Teachers - Markury Tools',
  description:
    'Build a balanced exam paper with multiple sections, marks, and an answer key for Classes 5–12. This free exam paper builder helps teachers quickly assemble tests that cover key learning outcomes.',
  alternates: { canonical: '/tools/exam-paper' },
  openGraph: {
    title: 'Exam Paper Builder (Free) for Teachers - Markury Tools',
    description:
      'Generate a structured exam paper with clear sections, question marks, and an answer key so you can focus on choosing the right difficulty for your class.',
    url: 'https://www.markury.app/tools/exam-paper',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Exam Paper Builder for Classes 5–12',
    description:
      'Quickly create an exam paper with sections, question marks, and an answer key using this free tool from Markury.',
  },
}

export default function ExamPaperToolPage() {
  return (
    <ToolPageShell
      slug="exam-paper"
      title="Exam Paper Builder"
      description="Generate an exam paper with clearly separated sections, marks distribution, and an answer key so you can run fair, consistent tests without manually formatting every question."
    >
      <ExamPaperGenerator />
    </ToolPageShell>
  )
}

