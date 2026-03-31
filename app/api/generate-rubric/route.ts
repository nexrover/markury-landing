import { NextRequest, NextResponse } from 'next/server'
import { groqGeneratePlainText } from '@/app/api/_lib/groq'
import { createInMemoryTextCache } from '@/app/api/_lib/cache'

type Body = {
  assignment?: string
  grade?: string
  criteriaCount?: number
  levelsCount?: number
  forceRegenerate?: boolean
}

const SUPPORTED_GRADES = new Set(Array.from({ length: 8 }, (_, i) => `Class ${i + 5}`))
const CACHE_TTL_MS = 1000 * 60 * 20
const cache = createInMemoryTextCache(CACHE_TTL_MS)

function keyOf(assignment: string, grade: string, criteriaCount: number, levelsCount: number) {
  return `${assignment.toLowerCase()}::${grade}::${criteriaCount}::${levelsCount}`
}

function promptOf(assignment: string, grade: string, criteriaCount: number, levelsCount: number) {
  return `Create a grading rubric for students.

Assignment: ${assignment}
Grade: ${grade}

Create exactly ${criteriaCount} criteria and exactly ${levelsCount} performance levels.

Output format STRICTLY:

Rubric:

Criteria 1: <name>
Level 1: <description>
Level 2: <description>
Level 3: <description>
Level 4: <description>

Criteria 2: <name>
Level 1: <description>
...

Rules:
Keep language simple and clear
Make it appropriate for the grade level
Avoid long explanations
Return plain text only. No markdown.`
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Body
    const assignment = body.assignment?.trim()
    const grade = body.grade?.trim()
    const criteriaCount = Number.isFinite(body.criteriaCount) ? Number(body.criteriaCount) : 4
    const levelsCount = Number.isFinite(body.levelsCount) ? Number(body.levelsCount) : 4
    const forceRegenerate = Boolean(body.forceRegenerate)

    if (!assignment || assignment.length < 3) {
      return NextResponse.json({ error: 'assignment is required and must be at least 3 characters.' }, { status: 400 })
    }
    if (!grade || !SUPPORTED_GRADES.has(grade)) {
      return NextResponse.json({ error: 'grade is required and must be between Class 5 and Class 12.' }, { status: 400 })
    }
    if (criteriaCount < 2 || criteriaCount > 10) {
      return NextResponse.json({ error: 'criteriaCount must be between 2 and 10.' }, { status: 400 })
    }
    if (levelsCount < 3 || levelsCount > 5) {
      return NextResponse.json({ error: 'levelsCount must be between 3 and 5.' }, { status: 400 })
    }

    const cacheKey = keyOf(assignment, grade, criteriaCount, levelsCount)
    const cachedText = !forceRegenerate ? cache.get(cacheKey) : null
    if (cachedText) return NextResponse.json({ text: cachedText, cached: true })

    if (!forceRegenerate) {
      const existing = cache.getInFlight(cacheKey)
      if (existing) return NextResponse.json({ text: await existing, cached: false })
    }

    const prompt = promptOf(assignment, grade, criteriaCount, levelsCount)
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
    console.error('Generate rubric API error:', error)
    return NextResponse.json({ error: 'Unable to generate rubric right now. Please try again.' }, { status: 500 })
  }
}

