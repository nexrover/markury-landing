import ToolPageShell from '@/components/tools/ToolPageShell'
import LessonPlanGenerator from '@/components/tools/LessonPlanGenerator'
import { getToolByHref } from '@/components/tools/toolData'

const tool = getToolByHref('/tools/lesson-plan-generator')!

export const metadata = {
  title: 'Lesson Plan Generator (Free) for Teachers - Markury Tools',
  description:
    'Generate a clear, grade-appropriate lesson plan in seconds with objectives, key vocabulary, activities, assessment, and homework. Ideal for planning Classes 5–12 lessons without starting from a blank page.',
  alternates: { canonical: '/tools/lesson-plan-generator' },
  openGraph: {
    title: 'Lesson Plan Generator (Free) for Teachers - Markury Tools',
    description:
      'Create a simple, structured lesson plan for Classes 5–12 that includes learning objectives, warm-up, main activities, assessment ideas, and optional homework in one click.',
    url: 'https://www.markury.app/tools/lesson-plan-generator',
    type: 'website',
    images: [{ url: '/markury_og.png', width: 1200, height: 630, alt: 'Markury Lesson Plan Generator' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Free Lesson Plan Generator for Classes 5–12',
    description:
      'Quickly build a classroom-ready lesson plan with objectives, activities, and assessment ideas using this free tool from Markury.',
    images: ['/markury_og.png'],
  },
}

export default function LessonPlanGeneratorToolPage() {
  return (
    <ToolPageShell title={tool.title} description={tool.description}>
      <LessonPlanGenerator />
    </ToolPageShell>
  )
}
