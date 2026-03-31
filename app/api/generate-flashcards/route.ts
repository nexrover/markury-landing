import { NextRequest, NextResponse } from 'next/server'
import { groqGeneratePlainText } from '@/app/api/_lib/groq'
import { createInMemoryTextCache } from '@/app/api/_lib/cache'

type Body = {
  topic?: string
  difficulty?: string
  count?: number
  language?: string
  forceRegenerate?: boolean
}

const SUPPORTED_DIFFICULTIES = new Set(['Easy', 'Medium', 'Hard'])


const CACHE_TTL_MS = 1000 * 60 * 20
const cache = createInMemoryTextCache(CACHE_TTL_MS)

function keyOf(topic: string, difficulty: string, count: number, language: string) {
  return `${topic.toLowerCase()}::${difficulty}::${count}::${language}`
}

function promptOf(topic: string, difficulty: string, count: number, language: string) {
  const askCount = count + 2
  const langInstruction =
    language === 'Auto'
      ? 'Detect the most appropriate language from the topic and write in that language'
      : `Write all questions and answers in ${language}`

  return `Create exactly ${askCount} flashcards for studying.

Topic: ${topic}
Difficulty: ${difficulty}
Number of flashcards to generate: ${askCount}

Output format STRICTLY (each flashcard is one Q line followed by one A line):

Flashcards:

Q: [question 1]
A: [answer 1]
Q: [question 2]
A: [answer 2]
... continue until you have exactly ${askCount} Q/A pairs ...

Rules:
- Generate EXACTLY ${askCount} Q/A pairs. Count them as you write: 1, 2, 3 ... ${askCount}. Do NOT stop early.
- Difficulty "${difficulty}" means: ${difficulty === 'Easy' ? 'basic recall, simple definitions, beginner-friendly' : difficulty === 'Hard' ? 'advanced concepts, deeper analysis, challenging questions' : 'moderate complexity, clear but requires understanding'}
- ${langInstruction}
- Keep answers concise but accurate
- Avoid long explanations
- Return plain text only. No markdown.`
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    const topic = body.topic?.trim()
    const difficulty = body.difficulty?.trim() || 'Medium'
    const count = Number.isFinite(body.count) ? Number(body.count) : 12
    const language = body.language?.trim() || 'Auto'
    const forceRegenerate = Boolean(body.forceRegenerate)

    if (!topic || topic.length < 3) {
      return NextResponse.json({ error: 'topic is required and must be at least 3 characters.' }, { status: 400 })
    }
    if (!SUPPORTED_DIFFICULTIES.has(difficulty)) {
      return NextResponse.json({ error: 'difficulty must be Easy, Medium, or Hard.' }, { status: 400 })
    }
    if (count < 4 || count > 40) {
      return NextResponse.json({ error: 'count must be between 4 and 40.' }, { status: 400 })
    }


    const cacheKey = keyOf(topic, difficulty, count, language)
    const cachedText = !forceRegenerate ? cache.get(cacheKey) : null
    if (cachedText) return NextResponse.json({ text: cachedText, cached: true })

    if (!forceRegenerate) {
      const existing = cache.getInFlight(cacheKey)
      if (existing) return NextResponse.json({ text: await existing, cached: false })
    }

    const prompt = promptOf(topic, difficulty, count, language)
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
