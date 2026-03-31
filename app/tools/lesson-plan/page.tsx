import ToolPageShell from '@/components/tools/ToolPageShell'
import LessonPlanGenerator from '@/components/tools/LessonPlanGenerator'

export const metadata = {
  title: 'Lesson Plan Generator (Free) - Markury Tools',
  description:
    'Generate a simple, grade-appropriate lesson plan in seconds. Free lesson plan generator by Markury.',
  alternates: { canonical: '/tools/lesson-plan' },
  openGraph: {
    title: 'Lesson Plan Generator (Free) - Markury Tools',
    description:
      'Generate a simple, grade-appropriate lesson plan in seconds. Free lesson plan generator by Markury.',
    url: 'https://www.markury.app/tools/lesson-plan',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Lesson Plan Generator (Free)',
    description:
      'Generate a simple, grade-appropriate lesson plan in seconds. Free lesson plan generator by Markury.',
  },
}

export default function LessonPlanToolPage() {
  return (
    <ToolPageShell
      title="Lesson Plan Generator"
      description="Create a simple lesson plan with objectives, activities, and assessment."
    >
      <LessonPlanGenerator />
    </ToolPageShell>
  )
}

