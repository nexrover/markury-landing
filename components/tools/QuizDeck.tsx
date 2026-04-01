"use client"

import { useCallback, useEffect, useState } from 'react'

type McqItem = {
  question: string
  options: string[]
  answer: string
}

const THEME_COLORS = [
  { accent: '#0284c7', bg: 'from-sky-50 to-blue-100', border: 'border-sky-200' },
  { accent: '#7c3aed', bg: 'from-violet-50 to-purple-100', border: 'border-violet-200' },
  { accent: '#059669', bg: 'from-emerald-50 to-green-100', border: 'border-emerald-200' },
  { accent: '#d97706', bg: 'from-amber-50 to-yellow-100', border: 'border-amber-200' },
  { accent: '#e11d48', bg: 'from-rose-50 to-pink-100', border: 'border-rose-200' },
  { accent: '#0d9488', bg: 'from-teal-50 to-cyan-100', border: 'border-teal-200' },
]

type QuizState = 'taking' | 'results'

export default function QuizDeck({ mcqs }: { mcqs: McqItem[] }) {
  const total = mcqs.length
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [quizState, setQuizState] = useState<QuizState>('taking')
  const [slideDir, setSlideDir] = useState<'left' | 'right' | null>(null)

  const safeIndex = total > 0 ? Math.min(currentIndex, total - 1) : 0

  const goTo = useCallback((nextIndex: number, dir: 'left' | 'right') => {
    setSlideDir(dir)
    setTimeout(() => {
      setCurrentIndex(nextIndex)
      setSlideDir(null)
    }, 150)
  }, [])

  const goPrev = () => { if (safeIndex > 0) goTo(safeIndex - 1, 'right') }
  const goNext = () => { if (safeIndex < total - 1) goTo(safeIndex + 1, 'left') }

  useEffect(() => {
    if (total === 0 || quizState === 'results') return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev()
      else if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  })

  useEffect(() => {
    if (total > 0 && currentIndex > total - 1) setCurrentIndex(total - 1)
  }, [currentIndex, total])

  if (total === 0) return null

  const theme = THEME_COLORS[safeIndex % THEME_COLORS.length]
  const mcq = mcqs[safeIndex]
  const selectedOption = answers[safeIndex]
  const answeredCount = Object.keys(answers).length
  const progressPct = ((safeIndex + 1) / total) * 100

  const selectOption = (optIdx: number) => {
    if (quizState === 'results') return
    setAnswers((prev) => ({ ...prev, [safeIndex]: optIdx }))
  }

  const handleSubmitQuiz = () => {
    setQuizState('results')
    setCurrentIndex(0)
  }

  const handleRetake = () => {
    setAnswers({})
    setQuizState('taking')
    setCurrentIndex(0)
  }

  const getCorrectCount = () => {
    let correct = 0
    for (let i = 0; i < total; i++) {
      if (answers[i] === undefined) continue
      const correctLetter = mcqs[i].answer.trim().charAt(0).toUpperCase()
      const selectedLetter = String.fromCharCode(65 + answers[i])
      if (selectedLetter === correctLetter) correct++
    }
    return correct
  }

  if (quizState === 'results') {
    const correctCount = getCorrectCount()
    const pct = Math.round((correctCount / total) * 100)

    return (
      <div className="space-y-6">
        {/* Score card */}
        <div className="rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 text-white p-6 sm:p-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">Your Score</p>
          <p className="text-5xl sm:text-6xl font-bold mb-1">{correctCount}/{total}</p>
          <p className="text-lg text-gray-300">{pct}% correct</p>
          <div className="mt-4 w-full max-w-xs mx-auto h-2 rounded-full bg-gray-700 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                backgroundColor: pct >= 80 ? '#22c55e' : pct >= 50 ? '#eab308' : '#ef4444',
              }}
            />
          </div>
          <p className="mt-3 text-sm text-gray-400">
            {pct >= 80 ? 'Excellent work!' : pct >= 50 ? 'Good effort, review the ones you missed.' : 'Keep practicing, you\'ll improve!'}
          </p>
        </div>

        {/* Review each question */}
        <div className="space-y-4">
          {mcqs.map((q, qi) => {
            const userAnswer = answers[qi]
            const correctLetter = q.answer.trim().charAt(0).toUpperCase()
            const correctIdx = correctLetter.charCodeAt(0) - 65
            const isCorrect = userAnswer !== undefined && String.fromCharCode(65 + userAnswer) === correctLetter
            const wasSkipped = userAnswer === undefined

            return (
              <div key={qi} className={`rounded-xl border-2 p-4 sm:p-5 ${isCorrect ? 'border-green-200 bg-green-50/50' : wasSkipped ? 'border-gray-200 bg-gray-50/50' : 'border-red-200 bg-red-50/50'}`}>
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${isCorrect ? 'bg-green-500' : wasSkipped ? 'bg-gray-400' : 'bg-red-500'}`}>
                    {isCorrect ? '✓' : wasSkipped ? '—' : '✗'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 mb-2">
                      {qi + 1}. {q.question}
                    </p>
                    <div className="space-y-1.5">
                      {q.options.map((opt, oi) => {
                        const letter = String.fromCharCode(65 + oi)
                        const isThisCorrect = oi === correctIdx
                        const isThisSelected = oi === userAnswer
                        let optClass = 'bg-white border-gray-200 text-gray-700'
                        if (isThisCorrect) optClass = 'bg-green-100 border-green-300 text-green-800 font-medium'
                        if (isThisSelected && !isThisCorrect) optClass = 'bg-red-100 border-red-300 text-red-800 line-through'

                        return (
                          <div key={oi} className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm ${optClass}`}>
                            <span className="font-semibold text-xs w-5">{letter}.</span>
                            <span>{opt}</span>
                            {isThisCorrect && <span className="ml-auto text-green-600 text-xs font-bold">✓ Correct</span>}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRetake}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Retake Quiz
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Progress */}
      <div className="w-full max-w-lg flex items-center gap-3">
        <span className="text-xs font-semibold text-gray-500 tabular-nums whitespace-nowrap">
          {safeIndex + 1} / {total}
        </span>
        <div className="flex-1 h-1.5 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPct}%`, backgroundColor: theme.accent }}
          />
        </div>
        <span className="text-xs text-gray-500 tabular-nums">{answeredCount} answered</span>
      </div>

      {/* Question card */}
      <div className="relative w-full max-w-lg">
        <div
          className={`transition-all duration-150 ${
            slideDir === 'left' ? '-translate-x-4 opacity-0' :
            slideDir === 'right' ? 'translate-x-4 opacity-0' :
            'translate-x-0 opacity-100'
          }`}
        >
          <div className={`rounded-2xl bg-gradient-to-br ${theme.bg} ${theme.border} border-2 p-6 sm:p-8 shadow-md`}>
            <span
              className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-4"
              style={{ backgroundColor: `${theme.accent}18`, color: theme.accent }}
            >
              Question {safeIndex + 1}
            </span>
            <p className="text-base sm:text-lg font-semibold text-gray-900 leading-snug mb-6">
              {mcq.question}
            </p>

            <div className="space-y-2.5">
              {mcq.options.map((opt, oi) => {
                const letter = String.fromCharCode(65 + oi)
                const isSelected = selectedOption === oi

                return (
                  <button
                    key={oi}
                    type="button"
                    onClick={() => selectOption(oi)}
                    className={`w-full flex items-center gap-3 rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${
                      isSelected
                        ? 'border-gray-900 bg-white shadow-sm'
                        : 'border-transparent bg-white/70 hover:bg-white hover:border-gray-300'
                    }`}
                  >
                    <span
                      className={`flex-shrink-0 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                        isSelected ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className={`flex-1 ${isSelected ? 'font-medium text-gray-900' : 'text-gray-700'}`}>
                      {opt}
                    </span>
                    {isSelected && (
                      <svg className="w-5 h-5 text-gray-900 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={safeIndex === 0}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {safeIndex < total - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
          >
            Next
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmitQuiz}
            disabled={answeredCount === 0}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            Submit Quiz
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        )}

        <button
          type="button"
          onClick={goNext}
          disabled={safeIndex === total - 1}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shadow-sm"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <p className="text-[11px] text-gray-400 select-none">
        Use ← → arrow keys to navigate
      </p>
    </div>
  )
}
