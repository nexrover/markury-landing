import ToolPageShell from '@/components/tools/ToolPageShell'
import QuizGenerator from '@/components/tools/QuizGenerator'
import { getToolByHref } from '@/components/tools/toolData'

const tool = getToolByHref('/tools/quiz-generator')!

export const metadata = {
  title: 'Quiz Generator (Free) for Teachers - Markury Tools',
  description:
    'Generate grade-appropriate MCQs with options A–D and an answer key in seconds. Free quiz generator for Classes 5–12 by Markury.',
  alternates: { canonical: '/tools/quiz-generator' },
  openGraph: {
    title: 'Quiz Generator (Free) for Teachers - Markury Tools',
    description:
      'Generate grade-appropriate MCQs with options A–D and an answer key in seconds. Free quiz generator for Classes 5–12 by Markury.',
    url: 'https://www.markury.app/tools/quiz-generator',
    type: 'website',
    images: [{ url: '/markury_og.png', width: 1200, height: 630, alt: 'Markury Quiz Generator' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Free Quiz Generator for Classes 5–12',
    description:
      'Generate MCQs with answers in seconds using this free tool from Markury.',
    images: ['/markury_og.png'],
  },
}

export default function QuizGeneratorToolPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <QuizGenerator />
    </ToolPageShell>
  )
}
