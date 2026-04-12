import { NextRequest, NextResponse } from 'next/server'
import { groqGeneratePlainText } from '@/app/api/_lib/groq'
import { createInMemoryTextCache } from '@/app/api/_lib/cache'
import { notifyError } from '@/lib/bugsnag'

type Body = {
  topic?: string
  grade?: string
  mcqCount?: number
  forceRegenerate?: boolean
}

const SUPPORTED_GRADES = new Set(Array.from({ length: 8 }, (_, i) => `Class ${i + 5}`))
const CACHE_TTL_MS = 1000 * 60 * 20
const cache = createInMemoryTextCache(CACHE_TTL_MS)

function buildCacheKey(topic: string, grade: string, mcqCount: number) {
  return `${topic.toLowerCase()}::${grade}::${mcqCount}`
}

function buildPrompt(topic: string, grade: string, mcqCount: number) {
  return `Generate a quiz for students.

Topic: ${topic}
Grade: ${grade}

Create exactly ${mcqCount} MCQs.

Output format STRICTLY:

MCQs:

Question
A. Option
B. Option
C. Option
D. Option
Answer: Correct option
Question
...

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
    const mcqCount = Number.isFinite(body.mcqCount) ? Number(body.mcqCount) : 5
    const forceRegenerate = Boolean(body.forceRegenerate)

    if (!topic || topic.length < 3) {
      return NextResponse.json({ error: 'topic is required and must be at least 3 characters.' }, { status: 400 })
    }

    if (!grade || !SUPPORTED_GRADES.has(grade)) {
      return NextResponse.json({ error: 'grade is required and must be between Class 5 and Class 12.' }, { status: 400 })
    }

    if (mcqCount < 1 || mcqCount > 20) {
      return NextResponse.json({ error: 'mcqCount must be between 1 and 20.' }, { status: 400 })
    }

    const cacheKey = buildCacheKey(topic, grade, mcqCount)
    const cachedText = !forceRegenerate ? cache.get(cacheKey) : null
    if (cachedText) return NextResponse.json({ text: cachedText, cached: true })

    if (!forceRegenerate) {
      const existingRequest = cache.getInFlight(cacheKey)
      if (existingRequest) {
        const text = await existingRequest
        return NextResponse.json({ text, cached: false })
      }
    }

    const prompt = buildPrompt(topic, grade, mcqCount)

    const requestPromise = groqGeneratePlainText(prompt)
    cache.setInFlight(cacheKey, requestPromise)
    try {
      const text = await requestPromise
      cache.set(cacheKey, text)
      return NextResponse.json({ text, cached: false })
    } finally {
      cache.clearInFlight(cacheKey)
    }
  } catch (error: any) {
    console.error('Generate quiz API error:', error)
    notifyError(error, request)
    return NextResponse.json({ error: 'Unable to generate quiz right now. Please try again.' }, { status: 500 })
  }
}

