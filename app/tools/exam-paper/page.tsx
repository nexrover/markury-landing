import ToolPageShell from '@/components/tools/ToolPageShell'
import ExamPaperGenerator from '@/components/tools/ExamPaperGenerator'

export const metadata = {
  title: 'Exam Paper Builder (Free) - Markury Tools',
  description:
    'Build a balanced exam paper with sections, marks, and an answer key. Free exam paper builder by Markury.',
  alternates: { canonical: '/tools/exam-paper' },
  openGraph: {
    title: 'Exam Paper Builder (Free) - Markury Tools',
    description:
      'Build a balanced exam paper with sections, marks, and an answer key. Free exam paper builder by Markury.',
    url: 'https://www.markury.app/tools/exam-paper',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Exam Paper Builder (Free)',
    description:
      'Build a balanced exam paper with sections, marks, and an answer key. Free exam paper builder by Markury.',
  },
}

export default function ExamPaperToolPage() {
  return (
    <ToolPageShell
      title="Exam Paper Builder"
      description="Generate an exam paper with sections, marks, and an answer key."
    >
      <ExamPaperGenerator />
    </ToolPageShell>
  )
}

