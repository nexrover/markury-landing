import ToolPageShell from '@/components/tools/ToolPageShell'
import LessonPlanGenerator from '@/components/tools/LessonPlanGenerator'

export const metadata = {
  title: 'Lesson Plan Generator (Free) for Teachers - Markury Tools',
  description:
    'Generate a clear, grade-appropriate lesson plan in seconds with objectives, key vocabulary, activities, assessment, and homework. Ideal for planning Classes 5–12 lessons without starting from a blank page.',
  alternates: { canonical: '/tools/lesson-plan' },
  openGraph: {
    title: 'Lesson Plan Generator (Free) for Teachers - Markury Tools',
    description:
      'Create a simple, structured lesson plan for Classes 5–12 that includes learning objectives, warm-up, main activities, assessment ideas, and optional homework in one click.',
    url: 'https://www.markury.app/tools/lesson-plan',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Free Lesson Plan Generator for Classes 5–12',
    description:
      'Quickly build a classroom-ready lesson plan with objectives, activities, and assessment ideas using this free tool from Markury.',
  },
}

export default function LessonPlanToolPage() {
  return (
    <ToolPageShell
      slug="lesson-plan"
      title="Lesson Plan Generator"
      description="Create a structured lesson plan that includes clear learning objectives, key vocabulary, warm-up ideas, main teaching activities, and simple assessment suggestions tailored to your topic and grade level."
    >
      <LessonPlanGenerator />
    </ToolPageShell>
  )
}

