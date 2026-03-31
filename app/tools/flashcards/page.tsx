import ToolPageShell from '@/components/tools/ToolPageShell'
import FlashcardsGenerator from '@/components/tools/FlashcardsGenerator'

export const metadata = {
  title: 'Flashcards Generator (Free) for Students - Markury Tools',
  description:
    'Turn any topic into a set of question-and-answer flashcards for quick revision. This free flashcards generator helps Classes 5–12 memorize definitions, formulas, and key ideas faster.',
  alternates: { canonical: '/tools/flashcards' },
  openGraph: {
    title: 'Flashcards Generator (Free) for Students - Markury Tools',
    description:
      'Generate Q&A-style flashcards for any school subject to help students revise key ideas in short study sessions.',
    url: 'https://www.markury.app/tools/flashcards',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Flashcards Generator for Classes 5–12',
    description:
      'Create a stack of revision flashcards with clear questions and answers in seconds using this free tool from Markury.',
  },
}

export default function FlashcardsToolPage() {
  return (
    <ToolPageShell
      slug="flashcards"
      title="Flashcards Generator"
      description="Generate a stack of focused Q/A flashcards that students can use for spaced repetition, quick-fire quizzes, or last-minute revision before tests."
    >
      <FlashcardsGenerator />
    </ToolPageShell>
  )
}

