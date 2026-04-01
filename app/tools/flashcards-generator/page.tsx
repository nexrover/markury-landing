import ToolPageShell from '@/components/tools/ToolPageShell'
import FlashcardsGenerator from '@/components/tools/FlashcardsGenerator'
import { getToolByHref } from '@/components/tools/toolData'

const tool = getToolByHref('/tools/flashcards-generator')!

export const metadata = {
  title: 'Flashcards Generator (Free) for Students - Markury Tools',
  description:
    'Turn any topic into a set of question-and-answer flashcards for quick revision. This free flashcards generator helps Classes 5–12 memorize definitions, formulas, and key ideas faster.',
  alternates: { canonical: '/tools/flashcards-generator' },
  openGraph: {
    title: 'Flashcards Generator (Free) for Students - Markury Tools',
    description:
      'Generate Q&A-style flashcards for any school subject to help students revise key ideas in short study sessions.',
    url: 'https://www.markury.app/tools/flashcards-generator',
    type: 'website',
    images: [{ url: '/markury_og.png', width: 1200, height: 630, alt: 'Markury Flashcards Generator' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Free Flashcards Generator for Classes 5–12',
    description:
      'Create a stack of revision flashcards with clear questions and answers in seconds using this free tool from Markury.',
    images: ['/markury_og.png'],
  },
}

export default function FlashcardsGeneratorToolPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <FlashcardsGenerator />
    </ToolPageShell>
  )
}
