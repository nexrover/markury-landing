"use client"

import { useCallback, useEffect, useState } from 'react'

type Flashcard = { q: string; a: string }

const CARD_THEMES = [
  { bg: 'from-rose-100 to-pink-200', border: 'border-rose-200', accent: '#e11d48' },
  { bg: 'from-sky-100 to-blue-200', border: 'border-sky-200', accent: '#0284c7' },
  { bg: 'from-amber-100 to-yellow-200', border: 'border-amber-200', accent: '#d97706' },
  { bg: 'from-emerald-100 to-green-200', border: 'border-emerald-200', accent: '#059669' },
  { bg: 'from-violet-100 to-purple-200', border: 'border-violet-200', accent: '#7c3aed' },
  { bg: 'from-orange-100 to-red-200', border: 'border-orange-200', accent: '#ea580c' },
  { bg: 'from-teal-100 to-cyan-200', border: 'border-teal-200', accent: '#0d9488' },
  { bg: 'from-fuchsia-100 to-pink-200', border: 'border-fuchsia-200', accent: '#c026d3' },
]

function DecoSvg({ index, accent }: { index: number; accent: string }) {
  const variant = index % 6
  const opacity = '0.12'

  if (variant === 0)
    return (
      <svg className="absolute top-4 right-4 w-16 h-16" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="24" stroke={accent} strokeWidth="2.5" opacity={opacity} />
        <circle cx="28" cy="28" r="14" stroke={accent} strokeWidth="2" opacity={opacity} />
        <circle cx="28" cy="28" r="5" fill={accent} opacity={opacity} />
      </svg>
    )
  if (variant === 1)
    return (
      <svg className="absolute top-4 right-4 w-16 h-16" viewBox="0 0 56 56" fill="none">
        <path d="M28 4L52 28L28 52L4 28Z" stroke={accent} strokeWidth="2.5" opacity={opacity} />
        <path d="M28 16L40 28L28 40L16 28Z" stroke={accent} strokeWidth="2" opacity={opacity} />
      </svg>
    )
  if (variant === 2)
    return (
      <svg className="absolute top-4 right-4 w-16 h-16" viewBox="0 0 56 56" fill="none">
        <path d="M28 6L33.5 21H49L36.5 30.5L41 46L28 36L15 46L19.5 30.5L7 21H22.5Z" stroke={accent} strokeWidth="2.5" opacity={opacity} />
      </svg>
    )
  if (variant === 3)
    return (
      <svg className="absolute top-4 right-4 w-16 h-16" viewBox="0 0 56 56" fill="none">
        <rect x="6" y="6" width="44" height="44" rx="8" stroke={accent} strokeWidth="2.5" opacity={opacity} />
        <rect x="16" y="16" width="24" height="24" rx="4" stroke={accent} strokeWidth="2" opacity={opacity} />
      </svg>
    )
  if (variant === 4)
    return (
      <svg className="absolute top-4 right-4 w-16 h-16" viewBox="0 0 56 56" fill="none">
        <path d="M28 4C28 4 46 18 46 30C46 42 28 52 28 52C28 52 10 42 10 30C10 18 28 4 28 4Z" stroke={accent} strokeWidth="2.5" opacity={opacity} />
      </svg>
    )
  return (
    <svg className="absolute top-4 right-4 w-16 h-16" viewBox="0 0 56 56" fill="none">
      <polygon points="28,4 52,44 4,44" stroke={accent} strokeWidth="2.5" opacity={opacity} />
      <polygon points="28,18 42,40 14,40" stroke={accent} strokeWidth="2" opacity={opacity} />
    </svg>
  )
}

function DecoSvgBottomLeft({ index, accent }: { index: number; accent: string }) {
  const variant = (index + 3) % 6
  const opacity = '0.08'

  if (variant === 0)
    return (
      <svg className="absolute bottom-4 left-4 w-20 h-20" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="26" stroke={accent} strokeWidth="1.5" opacity={opacity} />
      </svg>
    )
  if (variant === 1)
    return (
      <svg className="absolute bottom-4 left-4 w-20 h-20" viewBox="0 0 56 56" fill="none">
        <path d="M4 28Q28 4 52 28Q28 52 4 28Z" stroke={accent} strokeWidth="1.5" opacity={opacity} />
      </svg>
    )
  if (variant === 2)
    return (
      <svg className="absolute bottom-4 left-4 w-20 h-20" viewBox="0 0 56 56" fill="none">
        <rect x="4" y="4" width="48" height="48" rx="12" stroke={accent} strokeWidth="1.5" opacity={opacity} />
      </svg>
    )
  return null
}

export default function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null)

  const total = cards.length
  if (total === 0) return null

  const theme = CARD_THEMES[currentIndex % CARD_THEMES.length]
  const card = cards[currentIndex]

  const goTo = useCallback(
    (nextIndex: number, dir: 'left' | 'right') => {
      setSlideDir(dir)
      setFlipped(false)
      setTimeout(() => {
        setCurrentIndex(nextIndex)
        setSlideDir(null)
      }, 200)
    },
    [],
  )

  const goPrev = () => {
    if (currentIndex > 0) goTo(currentIndex - 1, 'right')
  }

  const goNext = () => {
    if (currentIndex < total - 1) goTo(currentIndex + 1, 'left')
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
      else if (e.key === ' ') {
        e.preventDefault()
        setFlipped((f) => !f)
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  const progressPct = ((currentIndex + 1) / total) * 100

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Progress */}
      <div className="w-full max-w-lg flex items-center gap-3">
        <span className="text-xs font-semibold text-gray-500 tabular-nums whitespace-nowrap">
          {currentIndex + 1} / {total}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%`, backgroundColor: theme.accent }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="relative w-full max-w-lg" style={{ perspective: '1000px' }}>
        {/* Stacked cards behind (visual only) */}
        {currentIndex < total - 1 && (
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${CARD_THEMES[(currentIndex + 1) % CARD_THEMES.length].bg} ${CARD_THEMES[(currentIndex + 1) % CARD_THEMES.length].border} border-2 opacity-40`}
            style={{ transform: 'translateY(8px) scale(0.96)', zIndex: 0 }}
          />
        )}
        {currentIndex < total - 2 && (
          <div
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${CARD_THEMES[(currentIndex + 2) % CARD_THEMES.length].bg} ${CARD_THEMES[(currentIndex + 2) % CARD_THEMES.length].border} border-2 opacity-20`}
            style={{ transform: 'translateY(16px) scale(0.92)', zIndex: -1 }}
          />
        )}

        {/* Active card */}
        <div
          className={`relative z-10 cursor-pointer transition-all duration-200 ${
            slideDir === 'left'
              ? '-translate-x-4 opacity-0'
              : slideDir === 'right'
                ? 'translate-x-4 opacity-0'
                : 'translate-x-0 opacity-100'
          }`}
          onClick={() => setFlipped((f) => !f)}
        >
          <div
            className="relative w-full transition-transform duration-500"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front */}
            <div
              className={`relative rounded-2xl bg-gradient-to-br ${theme.bg} ${theme.border} border-2 p-6 sm:p-8 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between overflow-hidden shadow-lg`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <DecoSvg index={currentIndex} accent={theme.accent} />
              <DecoSvgBottomLeft index={currentIndex} accent={theme.accent} />
              <div>
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-4"
                  style={{ backgroundColor: `${theme.accent}18`, color: theme.accent }}
                >
                  Question {currentIndex + 1}
                </span>
                <p className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug pr-14">
                  {card.q}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-6 select-none flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Tap to reveal answer
              </p>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${theme.bg} ${theme.border} border-2 p-6 sm:p-8 min-h-[260px] sm:min-h-[300px] flex flex-col justify-between overflow-hidden shadow-lg`}
              style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            >
              <DecoSvg index={currentIndex + 3} accent={theme.accent} />
              <DecoSvgBottomLeft index={currentIndex + 2} accent={theme.accent} />
              <div>
                <span
                  className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-4"
                  style={{ backgroundColor: `${theme.accent}18`, color: theme.accent }}
                >
                  Answer
                </span>
                <p className="text-lg sm:text-xl font-medium text-gray-800 leading-relaxed pr-14">
                  {card.a}
                </p>
              </div>
              <p className="text-xs text-gray-500 mt-6 select-none flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                </svg>
                Tap to see question
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Dot indicators */}
        <div className="flex items-center gap-1.5 max-w-[200px] overflow-hidden">
          {cards.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                const dir = i > currentIndex ? 'left' : 'right'
                goTo(i, dir)
              }}
              className={`flex-shrink-0 rounded-full transition-all duration-200 ${
                i === currentIndex
                  ? 'w-6 h-2'
                  : 'w-2 h-2 hover:opacity-70'
              }`}
              style={{
                backgroundColor: i === currentIndex ? theme.accent : '#d1d5db',
              }}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={goNext}
          disabled={currentIndex === total - 1}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Keyboard hint */}
      <p className="text-[11px] text-gray-400 select-none">
        Use ← → arrow keys to navigate, Space to flip
      </p>
    </div>
  )
}
