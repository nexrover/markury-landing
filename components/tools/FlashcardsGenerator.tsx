"use client"

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ToolResultActions from '@/components/tools/ToolResultActions'
import { GRADES } from '@/components/tools/constants'

type Flashcard = { q: string; a: string }
type Result = { rawText: string; cards: Flashcard[] }

function parseFlashcards(text: string): Flashcard[] {
  const lines = text.replace(/\r/g, '').split('\n').map((l) => l.trim()).filter(Boolean)
  const cards: Flashcard[] = []
  let q: string | null = null

  for (const line of lines) {
    if (/^flashcards:/i.test(line)) continue
    const qMatch = line.match(/^Q:\s*(.+)$/i)
    const aMatch = line.match(/^A:\s*(.+)$/i)
    if (qMatch) {
      q = qMatch[1].trim()
      continue
    }
    if (aMatch) {
      const a = aMatch[1].trim()
      if (q) cards.push({ q, a })
      q = null
    }
  }

  return cards
}

export default function FlashcardsGenerator() {
  const [topic, setTopic] = useState('')
  const [grade, setGrade] = useState('Class 5')
  const [count, setCount] = useState(12)
  const [isLoading, setIsLoading] = useState(false)
  const [topicError, setTopicError] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const generate = async (forceRegenerate = false) => {
    const trimmedTopic = topic.trim()
    if (trimmedTopic.length < 3) {
      setTopicError('Please enter a topic with at least 3 characters.')
      return
    }

    setTopicError('')
    setError('')
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: trimmedTopic, grade, count, forceRegenerate }),
      })
      const data = (await response.json()) as { text?: string; error?: string }
      if (!response.ok || !data.text) throw new Error(data.error || 'Failed to generate flashcards.')

      setResult({ rawText: data.text, cards: parseFlashcards(data.text) })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await generate(false)
  }

  const handleReset = () => {
    setTopic('')
    setGrade('Class 5')
    setCount(12)
    setResult(null)
    setTopicError('')
    setError('')
  }

  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="container-narrow">
        <div className="max-w-4xl mx-auto bg-gray-50 border border-gray-200 rounded-2xl p-5 sm:p-8">
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label htmlFor="topic" className="block text-sm font-semibold text-gray-700 mb-1.5">
                Topic
              </label>
              <input
                id="topic"
                type="text"
                value={topic}
                onChange={(e) => {
                  const nextTopic = e.target.value
                  setTopic(nextTopic)
                  if (nextTopic.trim().length >= 3) setTopicError('')
                }}
                placeholder="e.g. Fractions"
                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
              />
              {topicError && <p className="mt-2 text-sm font-medium text-red-600">{topicError}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="grade" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Grade
                </label>
                <select
                  id="grade"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                >
                  {GRADES.map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="count" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Cards
                </label>
                <input
                  id="count"
                  type="number"
                  min={4}
                  max={40}
                  value={count}
                  onChange={(e) => setCount(Number(e.target.value) || 4)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center px-3 py-1.5 rounded-md border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex items-center justify-center px-4 py-2 rounded-md text-xs sm:text-sm font-semibold text-gray-900 bg-markury-yellow shadow-sm hover:opacity-95"
              >
                {isLoading ? 'Generating...' : 'Generate Flashcards'}
              </button>
            </div>
          </form>

          {error && <p className="mt-4 text-sm font-medium text-red-600">{error}</p>}

          {result && (
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 space-y-6">
              <ToolResultActions
                rawText={result.rawText}
                title="Flashcards"
                isLoading={isLoading}
                onRegenerate={() => generate(true)}
                cta={
                  <p className="text-sm sm:text-base text-gray-700">
                    Want to teach these visually on screen?{' '}
                    <Link
                      href="/download"
                      className="font-semibold text-gray-900 underline underline-offset-4 hover:opacity-90"
                    >
                      → Use Markury
                    </Link>
                  </p>
                }
              />

              {result.cards.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {result.cards.map((card, idx) => (
                    <div key={`${card.q}-${idx}`} className="border border-gray-100 rounded-xl p-4">
                      <p className="text-sm font-semibold text-gray-900">Q{idx + 1}. {card.q}</p>
                      <p className="text-sm text-gray-700 mt-2">
                        <span className="font-semibold text-gray-900">A:</span> {card.a}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="whitespace-pre-wrap text-sm sm:text-base text-gray-800 leading-relaxed">
                  {result.rawText}
                </div>
              )}

              <p className="text-xs text-gray-500 pt-2 border-t border-gray-100">Generated with Markury</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

