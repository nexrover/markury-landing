'use client'

import { useState, useEffect } from 'react'
import { Cancel01Icon, GiftIcon } from 'hugeicons-react'
import Link from 'next/link'

const DISMISS_KEY = 'share-banner-dismissed'

export default function ShareBanner() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Check if the banner was dismissed
    const dismissed = localStorage.getItem(DISMISS_KEY)
    if (!dismissed) {
      setIsVisible(true)
    }
  }, [])

  const handleDismiss = () => {
    setIsVisible(false)
    localStorage.setItem(DISMISS_KEY, 'true')
  }

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white px-4 py-2.5 sm:px-6 sm:py-3 z-50 border-b border-white/10">
      <div className="container-narrow flex items-center justify-center gap-3 sm:gap-4">
        <Link
          href="/share"
          className="group flex-1 flex items-center justify-center gap-2 sm:gap-3 text-center"
        >
          <GiftIcon className="w-4 h-4 sm:w-5 sm:h-5 text-markury-yellow flex-shrink-0 animate-wiggle" />
          <span className="text-xs sm:text-sm font-medium text-gray-200 group-hover:text-white transition-colors">
            <span className="hidden sm:inline">🎉 </span>
            Share with your friends and get{' '}
            <span className="font-bold text-markury-yellow">10% discount</span>
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-white/15 border border-white/10 group-hover:border-white/20 rounded-full text-xs font-semibold text-white transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent motion-safe:before:animate-[markury-shimmer_2.6s_ease-in-out_infinite] motion-reduce:before:hidden">
            Claim Now
          </span>
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            handleDismiss()
          }}
          className="text-gray-400 hover:text-white transition-colors shrink-0 p-1 rounded-lg hover:bg-white/10"
          aria-label="Dismiss banner"
        >
          <Cancel01Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  )
}
