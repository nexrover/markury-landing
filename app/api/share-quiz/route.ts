import { NextResponse } from 'next/server'
import { supabase } from '@/app/api/_lib/supabase'
import { notifyError } from '@/lib/bugsnag'

type McqPayload = {
  question: string
  options: string[]
  answer: string
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      topic?: string
      grade?: string
      mcqs?: McqPayload[]
    }

    const { topic, grade, mcqs } = body

    if (!topic || !grade || !mcqs || mcqs.length === 0) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('shared_quizzes')
      .insert({ topic, grade, mcqs })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      await notifyError(error, request, {
        request_body: body,
        supabase_error: error
      })
      return NextResponse.json({ error: 'Failed to save quiz.' }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch (error: any) {
    await notifyError(error, request)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
