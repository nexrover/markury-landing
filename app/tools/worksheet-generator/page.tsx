import ToolPageShell from '@/components/tools/ToolPageShell'
import WorksheetGenerator from '@/components/WorksheetGenerator'
import { getToolByHref } from '@/components/tools/toolData'

const tool = getToolByHref('/tools/worksheet-generator')!

export const metadata = {
  title: 'Worksheet Generator (Free) for Teachers - Markury Tools',
  description:
    'Use this free worksheet generator by Markury to instantly create multiple-choice and short-answer practice sheets with answers for Classes 5–12. Perfect for quick tests, homework, and in-class practice.',
  alternates: { canonical: '/tools/worksheet-generator' },
  openGraph: {
    title: 'Worksheet Generator (Free) for Teachers - Markury Tools',
    description:
      'Instantly generate printable worksheets with MCQs and short questions plus answer keys for Classes 5–12 using this free tool from Markury.',
    url: 'https://www.markury.app/tools/worksheet-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Worksheet Generator for Classes 5–12',
    description:
      'Create classroom-ready worksheets with MCQs and short-answer questions for Classes 5–12 in seconds.',
  },
}

export default function WorksheetGeneratorToolPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <WorksheetGenerator />
    </ToolPageShell>
  )
}
