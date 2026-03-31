import ToolPageShell from '@/components/tools/ToolPageShell'
import RubricGenerator from '@/components/tools/RubricGenerator'
import { getToolByHref } from '@/components/tools/toolData'

const tool = getToolByHref('/tools/rubric-generator')!

export const metadata = {
  title: 'Rubric Generator (Free) for Assignments and Projects - Markury Tools',
  description:
    'Create a clear, student-friendly grading rubric with criteria and performance levels for essays, projects, presentations, and more. This free rubric generator helps teachers communicate expectations for Classes 5–12.',
  alternates: { canonical: '/tools/rubric-generator' },
  openGraph: {
    title: 'Rubric Generator (Free) for Assignments and Projects - Markury Tools',
    description:
      'Build a grading rubric with multiple criteria and performance levels to assess essays, presentations, and projects in a transparent way for students and parents.',
    url: 'https://www.markury.app/tools/rubric-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Rubric Generator for Classes 5–12',
    description:
      'Quickly generate a grading rubric with clear performance levels for school assignments using this free tool from Markury.',
  },
}

export default function RubricGeneratorToolPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <RubricGenerator />
    </ToolPageShell>
  )
}
