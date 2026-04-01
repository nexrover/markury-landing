import ToolPageShell from '@/components/tools/ToolPageShell'
import ExamPaperGenerator from '@/components/tools/ExamPaperGenerator'
import { getToolByHref } from '@/components/tools/toolData'

const tool = getToolByHref('/tools/exam-paper-builder')!

export const metadata = {
  title: 'Exam Paper Builder (Free) for Teachers - Markury Tools',
  description:
    'Build a balanced exam paper with multiple sections, marks, and an answer key for Classes 5–12. This free exam paper builder helps teachers quickly assemble tests that cover key learning outcomes.',
  alternates: { canonical: '/tools/exam-paper-builder' },
  openGraph: {
    title: 'Exam Paper Builder (Free) for Teachers - Markury Tools',
    description:
      'Generate a structured exam paper with clear sections, question marks, and an answer key so you can focus on choosing the right difficulty for your class.',
    url: 'https://www.markury.app/tools/exam-paper-builder',
    type: 'website',
    images: [{ url: '/markury_og.png', width: 1200, height: 630, alt: 'Markury Exam Paper Builder' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Free Exam Paper Builder for Classes 5–12',
    description:
      'Quickly create an exam paper with sections, question marks, and an answer key using this free tool from Markury.',
    images: ['/markury_og.png'],
  },
}

export default function ExamPaperBuilderToolPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <ExamPaperGenerator />
    </ToolPageShell>
  )
}
