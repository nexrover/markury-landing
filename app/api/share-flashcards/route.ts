import { NextResponse } from 'next/server'
import { supabase } from '@/app/api/_lib/supabase'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      topic?: string
      grade?: string
      cards?: Array<{ q: string; a: string }>
    }

    const { topic, grade, cards } = body

    if (!topic || !grade || !cards || cards.length === 0) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
    }

    const { data, error } = await supabase
      .from('shared_flashcards')
      .insert({ topic, grade, cards })
      .select('id')
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json({ error: 'Failed to save flashcards.' }, { status: 500 })
    }

    return NextResponse.json({ id: data.id })
  } catch {
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}
