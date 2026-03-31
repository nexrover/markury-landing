import ToolPageShell from '@/components/tools/ToolPageShell'
import FlashcardsGenerator from '@/components/tools/FlashcardsGenerator'

export const metadata = {
  title: 'Flashcards Generator (Free) - Markury Tools',
  description:
    'Generate quick revision flashcards for any topic. Free flashcards generator by Markury.',
  alternates: { canonical: '/tools/flashcards' },
  openGraph: {
    title: 'Flashcards Generator (Free) - Markury Tools',
    description:
      'Generate quick revision flashcards for any topic. Free flashcards generator by Markury.',
    url: 'https://www.markury.app/tools/flashcards',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Flashcards Generator (Free)',
    description:
      'Generate quick revision flashcards for any topic. Free flashcards generator by Markury.',
  },
}

export default function FlashcardsToolPage() {
  return (
    <ToolPageShell
      title="Flashcards Generator"
      description="Generate Q/A flashcards for quick revision."
    >
      <FlashcardsGenerator />
    </ToolPageShell>
  )
}

