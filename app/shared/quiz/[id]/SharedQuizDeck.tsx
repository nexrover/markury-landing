"use client"

import QuizDeck from '@/components/tools/QuizDeck'

type McqItem = { question: string; options: string[]; answer: string }

export default function SharedQuizDeck({ mcqs }: { mcqs: McqItem[] }) {
  return <QuizDeck mcqs={mcqs} />
}
