import { NextRequest, NextResponse } from 'next/server'
import { groqGeneratePlainText } from '@/app/api/_lib/groq'
import { createInMemoryTextCache } from '@/app/api/_lib/cache'

type Body = {
  topic?: string
  grade?: string
  count?: number
  forceRegenerate?: boolean
}

const SUPPORTED_GRADES = new Set(Array.from({ length: 8 }, (_, i) => `Class ${i + 5}`))
const CACHE_TTL_MS = 1000 * 60 * 20
const cache = createInMemoryTextCache(CACHE_TTL_MS)

function keyOf(topic: string, grade: string, count: number) {
  return `${topic.toLowerCase()}::${grade}::${count}`
}

function promptOf(topic: string, grade: string, count: number) {
  return `Create flashcards for students.

Topic: ${topic}
Grade: ${grade}
Count: ${count}

Output format STRICTLY:

Flashcards:

Q: ...
A: ...
Q: ...
A: ...

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
    const count = Number.isFinite(body.count) ? Number(body.count) : 12
    const forceRegenerate = Boolean(body.forceRegenerate)

    if (!topic || topic.length < 3) {
      return NextResponse.json({ error: 'topic is required and must be at least 3 characters.' }, { status: 400 })
    }
    if (!grade || !SUPPORTED_GRADES.has(grade)) {
      return NextResponse.json({ error: 'grade is required and must be between Class 5 and Class 12.' }, { status: 400 })
    }
    if (count < 4 || count > 40) {
      return NextResponse.json({ error: 'count must be between 4 and 40.' }, { status: 400 })
    }

    const cacheKey = keyOf(topic, grade, count)
    const cachedText = !forceRegenerate ? cache.get(cacheKey) : null
    if (cachedText) return NextResponse.json({ text: cachedText, cached: true })

    if (!forceRegenerate) {
      const existing = cache.getInFlight(cacheKey)
      if (existing) return NextResponse.json({ text: await existing, cached: false })
    }

    const prompt = promptOf(topic, grade, count)
    const promise = groqGeneratePlainText(prompt)
    cache.setInFlight(cacheKey, promise)
    try {
      const text = await promise
      cache.set(cacheKey, text)
      return NextResponse.json({ text, cached: false })
    } finally {
      cache.clearInFlight(cacheKey)
    }
  } catch (error) {
    console.error('Generate flashcards API error:', error)
    return NextResponse.json({ error: 'Unable to generate flashcards right now. Please try again.' }, { status: 500 })
  }
}

