"use client"

import { useState } from 'react'

type Flashcard = { q: string; a: string }

const CARD_THEMES = [
  { bg: 'bg-gradient-to-br from-rose-100 to-pink-200', border: 'border-rose-200', accent: '#e11d48' },
  { bg: 'bg-gradient-to-br from-sky-100 to-blue-200', border: 'border-sky-200', accent: '#0284c7' },
  { bg: 'bg-gradient-to-br from-amber-100 to-yellow-200', border: 'border-amber-200', accent: '#d97706' },
  { bg: 'bg-gradient-to-br from-emerald-100 to-green-200', border: 'border-emerald-200', accent: '#059669' },
  { bg: 'bg-gradient-to-br from-violet-100 to-purple-200', border: 'border-violet-200', accent: '#7c3aed' },
  { bg: 'bg-gradient-to-br from-orange-100 to-red-200', border: 'border-orange-200', accent: '#ea580c' },
  { bg: 'bg-gradient-to-br from-teal-100 to-cyan-200', border: 'border-teal-200', accent: '#0d9488' },
  { bg: 'bg-gradient-to-br from-fuchsia-100 to-pink-200', border: 'border-fuchsia-200', accent: '#c026d3' },
]

function DecoSvg({ index, accent }: { index: number; accent: string }) {
  const variant = index % 6
  const opacity = '0.12'

  if (variant === 0)
    return (
      <svg className="absolute top-3 right-3 w-14 h-14" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="24" stroke={accent} strokeWidth="2.5" opacity={opacity} />
        <circle cx="28" cy="28" r="14" stroke={accent} strokeWidth="2" opacity={opacity} />
        <circle cx="28" cy="28" r="5" fill={accent} opacity={opacity} />
      </svg>
    )
  if (variant === 1)
    return (
      <svg className="absolute top-3 right-3 w-14 h-14" viewBox="0 0 56 56" fill="none">
        <path d="M28 4L52 28L28 52L4 28Z" stroke={accent} strokeWidth="2.5" opacity={opacity} />
        <path d="M28 16L40 28L28 40L16 28Z" stroke={accent} strokeWidth="2" opacity={opacity} />
      </svg>
    )
  if (variant === 2)
    return (
      <svg className="absolute top-3 right-3 w-14 h-14" viewBox="0 0 56 56" fill="none">
        <path d="M28 6L33.5 21H49L36.5 30.5L41 46L28 36L15 46L19.5 30.5L7 21H22.5Z" stroke={accent} strokeWidth="2.5" opacity={opacity} />
      </svg>
    )
  if (variant === 3)
    return (
      <svg className="absolute top-3 right-3 w-14 h-14" viewBox="0 0 56 56" fill="none">
        <rect x="6" y="6" width="44" height="44" rx="8" stroke={accent} strokeWidth="2.5" opacity={opacity} />
        <rect x="16" y="16" width="24" height="24" rx="4" stroke={accent} strokeWidth="2" opacity={opacity} />
      </svg>
    )
  if (variant === 4)
    return (
      <svg className="absolute top-3 right-3 w-14 h-14" viewBox="0 0 56 56" fill="none">
        <path d="M28 4C28 4 46 18 46 30C46 42 28 52 28 52C28 52 10 42 10 30C10 18 28 4 28 4Z" stroke={accent} strokeWidth="2.5" opacity={opacity} />
      </svg>
    )
  return (
    <svg className="absolute top-3 right-3 w-14 h-14" viewBox="0 0 56 56" fill="none">
      <polygon points="28,4 52,44 4,44" stroke={accent} strokeWidth="2.5" opacity={opacity} />
      <polygon points="28,18 42,40 14,40" stroke={accent} strokeWidth="2" opacity={opacity} />
    </svg>
  )
}

function FlipCard({ card, index }: { card: Flashcard; index: number }) {
  const [flipped, setFlipped] = useState(false)
  const theme = CARD_THEMES[index % CARD_THEMES.length]

  return (
    <div
      className="cursor-pointer group"
      style={{ perspective: '800px' }}
      onClick={() => setFlipped((f) => !f)}
    >
      <div
        className="relative w-full transition-transform duration-500"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          minHeight: '200px',
        }}
      >
        {/* Front */}
        <div
          className={`absolute inset-0 rounded-2xl ${theme.bg} ${theme.border} border-2 p-5 flex flex-col justify-between overflow-hidden shadow-md`}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <DecoSvg index={index} accent={theme.accent} />
          <div>
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-3"
              style={{ backgroundColor: `${theme.accent}18`, color: theme.accent }}
            >
              Card {index + 1}
            </span>
            <p className="text-base sm:text-lg font-semibold text-gray-900 leading-snug pr-12">
              {card.q}
            </p>
          </div>
          <p className="text-[11px] text-gray-500 mt-4 select-none">Tap to reveal answer</p>
        </div>

        {/* Back */}
        <div
          className={`absolute inset-0 rounded-2xl ${theme.bg} ${theme.border} border-2 p-5 flex flex-col justify-between overflow-hidden shadow-md`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <DecoSvg index={index + 3} accent={theme.accent} />
          <div>
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md mb-3"
              style={{ backgroundColor: `${theme.accent}18`, color: theme.accent }}
            >
              Answer
            </span>
            <p className="text-base sm:text-lg font-medium text-gray-800 leading-relaxed pr-12">
              {card.a}
            </p>
          </div>
          <p className="text-[11px] text-gray-500 mt-4 select-none">Tap to see question</p>
        </div>
      </div>
    </div>
  )
}

export default function FlashcardDeck({ cards }: { cards: Flashcard[] }) {
  if (cards.length === 0) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, idx) => (
        <FlipCard key={`${card.q}-${idx}`} card={card} index={idx} />
      ))}
    </div>
  )
}
