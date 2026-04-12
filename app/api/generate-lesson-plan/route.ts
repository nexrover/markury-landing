import { NextRequest, NextResponse } from 'next/server'
import { groqGeneratePlainText } from '@/app/api/_lib/groq'
import { createInMemoryTextCache } from '@/app/api/_lib/cache'
import { notifyError } from '@/lib/bugsnag'

type Body = {
  topic?: string
  grade?: string
  durationMinutes?: number
  forceRegenerate?: boolean
}

const SUPPORTED_GRADES = new Set(Array.from({ length: 8 }, (_, i) => `Class ${i + 5}`))
const CACHE_TTL_MS = 1000 * 60 * 20
const cache = createInMemoryTextCache(CACHE_TTL_MS)

function keyOf(topic: string, grade: string, durationMinutes: number) {
  return `${topic.toLowerCase()}::${grade}::${durationMinutes}`
}

function promptOf(topic: string, grade: string, durationMinutes: number) {
  return `Create a lesson plan for students.

Topic: ${topic}
Grade: ${grade}
Duration: ${durationMinutes} minutes

Output format STRICTLY:

Lesson Plan:

Learning Objectives:
- ...
- ...

Key Vocabulary:
- Term: Meaning
- ...

Materials:
- ...

Warm-up (5 minutes):
Steps:
- ...

Main Activity (${Math.max(10, durationMinutes - 15)} minutes):
Steps:
- ...

Assessment (5 minutes):
Steps:
- ...

Homework:
- ...

Rules:
Keep language simple and clear
Make it appropriate for the grade level
Avoid long explanations
Return plain text only. No markdown.`
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    const topic = body.topic?.trim()
    const grade = body.grade?.trim()
    const durationMinutes = Number.isFinite(body.durationMinutes) ? Number(body.durationMinutes) : 40
    const forceRegenerate = Boolean(body.forceRegenerate)

    if (!topic || topic.length < 3) {
      return NextResponse.json({ error: 'topic is required and must be at least 3 characters.' }, { status: 400 })
    }
    if (!grade || !SUPPORTED_GRADES.has(grade)) {
      return NextResponse.json({ error: 'grade is required and must be between Class 5 and Class 12.' }, { status: 400 })
    }
    if (durationMinutes < 15 || durationMinutes > 120) {
      return NextResponse.json({ error: 'durationMinutes must be between 15 and 120.' }, { status: 400 })
    }

    const cacheKey = keyOf(topic, grade, durationMinutes)
    const cachedText = !forceRegenerate ? cache.get(cacheKey) : null
    if (cachedText) return NextResponse.json({ text: cachedText, cached: true })

    if (!forceRegenerate) {
      const existing = cache.getInFlight(cacheKey)
      if (existing) return NextResponse.json({ text: await existing, cached: false })
    }

    const prompt = promptOf(topic, grade, durationMinutes)
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
    console.error('Generate lesson plan API error:', error)
    notifyError(error, request)
    return NextResponse.json({ error: 'Unable to generate lesson plan right now. Please try again.' }, { status: 500 })
  }
}

