"use client"

import Link from 'next/link'
import { FormEvent, useState } from 'react'
import ToolResultActions from '@/components/tools/ToolResultActions'
import FlashcardDeck from '@/components/tools/FlashcardDeck'
import { LANGUAGES } from '@/components/tools/constants'

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
  const [difficulty, setDifficulty] = useState('Medium')
  const [countStr, setCountStr] = useState('12')
  const [language, setLanguage] = useState('Auto')
  const [isLoading, setIsLoading] = useState(false)
  const [topicError, setTopicError] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState<Result | null>(null)

  const [isSharing, setIsSharing] = useState(false)
  const [shareUrl, setShareUrl] = useState<string | null>(null)
  const [shareCopied, setShareCopied] = useState(false)

  const generate = async (forceRegenerate = false) => {
    const trimmedTopic = topic.trim()
    if (trimmedTopic.length < 3) {
      setTopicError('Please enter a topic with at least 3 characters.')
      return
    }

    const count = Math.max(4, Math.min(40, parseInt(countStr, 10) || 12))
    setCountStr(String(count))

    setTopicError('')
    setError('')
    setShareUrl(null)
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: trimmedTopic, difficulty, count, language, forceRegenerate }),
      })
      const data = (await response.json()) as { text?: string; error?: string }
      if (!response.ok || !data.text) throw new Error(data.error || 'Failed to generate flashcards.')

      const allCards = parseFlashcards(data.text)
      setResult({ rawText: data.text, cards: allCards.slice(0, count) })
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
    setDifficulty('Medium')
    setCountStr('12')
    setLanguage('Auto')
    setResult(null)
    setTopicError('')
    setError('')
    setShareUrl(null)
  }

  const handleShare = async () => {
    if (!result || result.cards.length === 0) return
    setIsSharing(true)
    try {
      const response = await fetch('/api/share-flashcards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: topic.trim(), grade: difficulty, cards: result.cards }),
      })
      const data = (await response.json()) as { id?: string; error?: string }
      if (!response.ok || !data.id) throw new Error(data.error || 'Failed to share.')

      const url = `${window.location.origin}/shared/flashcards/${data.id}`
      setShareUrl(url)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to share flashcards.')
    } finally {
      setIsSharing(false)
    }
  }

  const handleCopyShareLink = async () => {
    if (!shareUrl) return
    try {
      await navigator.clipboard.writeText(shareUrl)
      setShareCopied(true)
      setTimeout(() => setShareCopied(false), 2000)
    } catch {
      /* noop */
    }
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
                <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Difficulty
                </label>
                <select
                  id="difficulty"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
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
                  value={countStr}
                  onChange={(e) => setCountStr(e.target.value)}
                  onBlur={() => {
                    const n = parseInt(countStr, 10)
                    if (!n || n < 4) setCountStr('4')
                    else if (n > 40) setCountStr('40')
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                />
              </div>

              <div>
                <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Output Language
                </label>
                <select
                  id="language"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-markury-cyan"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
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

          {result && result.cards.length > 0 && (
            <>
              {/* Action bar */}
              <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
                <ToolResultActions
                  rawText={result.rawText}
                  title="Flashcards"
                  isLoading={isLoading}
                  onRegenerate={() => generate(true)}
                />

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleShare}
                    disabled={isSharing}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-60 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    {isSharing ? 'Sharing...' : 'Share'}
                  </button>
                </div>
              </div>

              {/* Share link toast */}
              {shareUrl && (
                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <p className="text-sm text-emerald-800 truncate">{shareUrl}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyShareLink}
                    className="flex-shrink-0 inline-flex items-center px-3 py-1.5 rounded-lg border border-emerald-300 bg-white text-xs sm:text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
                  >
                    {shareCopied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              )}

              {/* Flashcard deck */}
              <div className="mt-6">
                <FlashcardDeck cards={result.cards} />
              </div>

              {/* Markury CTA */}
              <div className="mt-6 rounded-2xl border border-markury-yellow/30 bg-gradient-to-r from-markury-yellow/20 via-markury-cyan/10 to-markury-purple/10 p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex-shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-markury-yellow/40 text-base">
                      ✏️
                    </span>
                    <p className="text-sm text-gray-800">
                      <span className="font-semibold text-gray-900">
                        Want to teach these flashcards visually on screen?
                      </span>{' '}
                      Annotate, highlight, and explain with Markury.
                    </p>
                  </div>
                  <Link
                    href="/download"
                    className="flex-shrink-0 inline-flex items-center px-4 py-2 rounded-lg bg-gray-900 text-white text-xs sm:text-sm font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Try Markury
                  </Link>
                </div>
              </div>

              <p className="text-xs text-gray-500 pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span>Generated with Markury</span>
                <Link href="https://www.markury.app" target="_blank" rel="noopener noreferrer" className="hover:text-gray-700">
                  www.markury.app
                </Link>
              </p>
            </>
          )}

          {result && result.cards.length === 0 && (
            <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-4 sm:p-6">
              <ToolResultActions
                rawText={result.rawText}
                title="Flashcards"
                isLoading={isLoading}
                onRegenerate={() => generate(true)}
              />
              <div className="mt-4 whitespace-pre-wrap text-sm sm:text-base text-gray-800 leading-relaxed">
                {result.rawText}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
