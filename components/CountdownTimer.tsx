'use client'

import { useState, useEffect, useCallback } from 'react'

// Fixed launch promotion end date: April 14, 2026 00:00:00 UTC
const PROMOTION_END_DATE = new Date('2026-04-12T00:00:00Z').getTime()

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft | null {
  const now = Date.now()
  const difference = PROMOTION_END_DATE - now

  if (difference <= 0) return null

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

function TimeBlock({ value, label, variant }: { value: number; label: string; variant: 'banner' | 'pricing' }) {
  const formatted = String(value).padStart(2, '0')

  if (variant === 'banner') {
    return (
      <div className="flex flex-col items-center">
        <span className="bg-white/15 backdrop-blur-sm border border-white/10 rounded-lg px-1.5 py-1 sm:px-2.5 sm:py-1.5 text-sm sm:text-base font-extrabold text-white tabular-nums min-w-[30px] sm:min-w-[38px] text-center">
          {formatted}
        </span>
        <span className="text-[9px] sm:text-[10px] text-gray-400 uppercase tracking-wider mt-1 font-semibold">
          {label}
        </span>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center">
      <span className="bg-gray-900 rounded-lg px-2.5 py-1.5 sm:px-3.5 sm:py-2 text-lg sm:text-2xl font-bold text-white tabular-nums min-w-[44px] sm:min-w-[56px] text-center shadow-lg">
        {formatted}
      </span>
      <span className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mt-1.5 font-semibold">
        {label}
      </span>
    </div>
  )
}

interface CountdownTimerProps {
  variant: 'banner' | 'pricing'
  /** Called when the timer expires */
  onExpired?: () => void
}

export default function CountdownTimer({ variant, onExpired }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null)
  const [mounted, setMounted] = useState(false)

  const handleExpired = useCallback(() => {
    onExpired?.()
  }, [onExpired])

  useEffect(() => {
    setMounted(true)
    const initial = calculateTimeLeft()
    setTimeLeft(initial)

    if (!initial) {
      handleExpired()
      return
    }

    const timer = setInterval(() => {
      const remaining = calculateTimeLeft()
      setTimeLeft(remaining)
      if (!remaining) {
        clearInterval(timer)
        handleExpired()
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [handleExpired])

  // Prevent hydration mismatch — render nothing on the server
  if (!mounted) return null

  // Expired state
  if (!timeLeft) {
    if (variant === 'pricing') {
      return (
        <div className="text-center mb-8">
          <p className="text-gray-500 font-medium">Launch Offer Ended</p>
        </div>
      )
    }
    return null
  }

  const separator = (
    <span className={`font-bold ${variant === 'banner' ? 'text-gray-500 text-sm sm:text-base' : 'text-gray-300 text-xl sm:text-2xl'} self-start ${variant === 'banner' ? 'mt-1 sm:mt-1.5' : 'mt-1.5 sm:mt-2'}`}>
      :
    </span>
  )

  const blocks = (
    <div className="flex items-start gap-1 sm:gap-1.5">
      <TimeBlock value={timeLeft.days} label="Days" variant={variant} />
      {separator}
      <TimeBlock value={timeLeft.hours} label="Hrs" variant={variant} />
      {separator}
      <TimeBlock value={timeLeft.minutes} label="Min" variant={variant} />
      {separator}
      <TimeBlock value={timeLeft.seconds} label="Sec" variant={variant} />
    </div>
  )

  if (variant === 'banner') {
    return (
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="hidden sm:block text-right whitespace-nowrap">
          <p className="font-bold text-white text-sm sm:text-base leading-tight tracking-tight">🔥 Launch Offer</p>
          <p className="text-gray-400 text-xs sm:text-sm leading-tight">up to <span className="font-bold text-markury-yellow">50% off</span></p>
        </div>
        <div className="sm:hidden text-right whitespace-nowrap">
          <p className="font-bold text-white text-xs leading-tight">🔥 <span className="text-markury-yellow">50% Off</span></p>
        </div>
        {blocks}
      </div>
    )
  }

  // Pricing variant
  return (
    <div className="text-center mb-10 px-4 sm:px-0">
      <div className="inline-flex flex-col items-center gap-2.5 sm:gap-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200/60 rounded-2xl px-5 py-3.5 sm:px-8 sm:py-5 shadow-sm w-full sm:w-auto max-w-md sm:max-w-none mx-auto">
        <p className="text-xs sm:text-base font-semibold text-gray-700">
          <span className="mr-1">⏳</span>
          Up to <span className="text-markury-orange font-bold">50% Off</span>, Limited Launch Offer Ends In
        </p>
        {blocks}
      </div>
    </div>
  )
}
