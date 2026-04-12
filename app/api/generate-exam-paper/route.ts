import { NextRequest, NextResponse } from 'next/server'
import { groqGeneratePlainText } from '@/app/api/_lib/groq'
import { createInMemoryTextCache } from '@/app/api/_lib/cache'
import { notifyError } from '@/lib/bugsnag'

type Body = {
  topic?: string
  grade?: string
  totalMarks?: number
  sections?: number
  forceRegenerate?: boolean
}

const SUPPORTED_GRADES = new Set(Array.from({ length: 8 }, (_, i) => `Class ${i + 5}`))
const CACHE_TTL_MS = 1000 * 60 * 20
const cache = createInMemoryTextCache(CACHE_TTL_MS)

function keyOf(topic: string, grade: string, totalMarks: number, sections: number) {
  return `${topic.toLowerCase()}::${grade}::${totalMarks}::${sections}`
}

function promptOf(topic: string, grade: string, totalMarks: number, sections: number) {
  return `Generate an exam paper for students.

Topic: ${topic}
Grade: ${grade}
Total Marks: ${totalMarks}
Sections: ${sections}

Output format STRICTLY:

Exam Paper:

Instructions:
- ...

Section A (Marks: ...):
1) Question (Marks: ...)
2) Question (Marks: ...)

Section B (Marks: ...):
...

Answer Key:
1) ...
2) ...

Rules:
Keep language simple and clear
Make questions appropriate for the grade level
Ensure answers are correct
Avoid long explanations
Return plain text only. No markdown.`
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    const topic = body.topic?.trim()
    const grade = body.grade?.trim()
    const totalMarks = Number.isFinite(body.totalMarks) ? Number(body.totalMarks) : 50
    const sections = Number.isFinite(body.sections) ? Number(body.sections) : 3
    const forceRegenerate = Boolean(body.forceRegenerate)

    if (!topic || topic.length < 3) {
      return NextResponse.json({ error: 'topic is required and must be at least 3 characters.' }, { status: 400 })
    }
    if (!grade || !SUPPORTED_GRADES.has(grade)) {
      return NextResponse.json({ error: 'grade is required and must be between Class 5 and Class 12.' }, { status: 400 })
    }
    if (totalMarks < 10 || totalMarks > 200) {
      return NextResponse.json({ error: 'totalMarks must be between 10 and 200.' }, { status: 400 })
    }
    if (sections < 2 || sections > 6) {
      return NextResponse.json({ error: 'sections must be between 2 and 6.' }, { status: 400 })
    }

    const cacheKey = keyOf(topic, grade, totalMarks, sections)
    const cachedText = !forceRegenerate ? cache.get(cacheKey) : null
    if (cachedText) return NextResponse.json({ text: cachedText, cached: true })

    if (!forceRegenerate) {
      const existing = cache.getInFlight(cacheKey)
      if (existing) return NextResponse.json({ text: await existing, cached: false })
    }

    const prompt = promptOf(topic, grade, totalMarks, sections)
    const promise = groqGeneratePlainText(prompt)
    cache.setInFlight(cacheKey, promise)
    try {
      const text = await promise
      cache.set(cacheKey, text)
      return NextResponse.json({ text, cached: false })
    } finally {
      cache.clearInFlight(cacheKey)
    }
  } catch (error: any) {
    console.error('Generate exam paper API error:', error)
    notifyError(error, request)
    return NextResponse.json({ error: 'Unable to generate exam paper right now. Please try again.' }, { status: 500 })
  }
}

