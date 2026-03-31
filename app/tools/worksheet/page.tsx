import ToolPageShell from '@/components/tools/ToolPageShell'
import WorksheetGenerator from '@/components/WorksheetGenerator'

export const metadata = {
  title: 'Worksheet / Quiz Generator (Free) - Markury Tools',
  description:
    'Generate MCQs and short questions with answers for Class 5–12. Free worksheet generator by Markury.',
  alternates: { canonical: '/tools/worksheet' },
  openGraph: {
    title: 'Worksheet / Quiz Generator (Free) - Markury Tools',
    description:
      'Generate MCQs and short questions with answers for Class 5–12. Free worksheet generator by Markury.',
    url: 'https://www.markury.app/tools/worksheet',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Worksheet / Quiz Generator (Free)',
    description:
      'Generate MCQs and short questions with answers for Class 5–12. Free worksheet generator by Markury.',
  },
}

export default function WorksheetToolPage() {
  return (
    <ToolPageShell
      title="Worksheet / Quiz Generator"
      description="Generate grade-appropriate MCQs and short questions with answers."
    >
      <WorksheetGenerator />
    </ToolPageShell>
  )
}

