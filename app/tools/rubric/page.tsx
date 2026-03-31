import ToolPageShell from '@/components/tools/ToolPageShell'
import RubricGenerator from '@/components/tools/RubricGenerator'

export const metadata = {
  title: 'Rubric Generator (Free) - Markury Tools',
  description:
    'Create a clear grading rubric for assignments and projects. Free rubric generator by Markury.',
  alternates: { canonical: '/tools/rubric' },
  openGraph: {
    title: 'Rubric Generator (Free) - Markury Tools',
    description:
      'Create a clear grading rubric for assignments and projects. Free rubric generator by Markury.',
    url: 'https://www.markury.app/tools/rubric',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Rubric Generator (Free)',
    description:
      'Create a clear grading rubric for assignments and projects. Free rubric generator by Markury.',
  },
}

export default function RubricToolPage() {
  return (
    <ToolPageShell
      title="Rubric Generator"
      description="Generate a rubric with criteria and performance levels."
    >
      <RubricGenerator />
    </ToolPageShell>
  )
}

