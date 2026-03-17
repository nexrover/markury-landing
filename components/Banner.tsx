'use client'

import { useState } from 'react'
import { Cancel01Icon } from 'hugeicons-react'
import Link from 'next/link'
import CountdownTimer from '@/components/CountdownTimer'

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white px-4 py-3 sm:px-6 sm:py-3.5 z-50 border-b border-white/10">
      <div className="container-narrow flex flex-wrap items-center justify-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-[240px] flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-x-8 text-center mx-auto">
          
          <CountdownTimer variant="banner" onExpired={() => setIsVisible(false)} />

          <Link 
            href="/#pricing" 
            className="group relative inline-flex w-full max-w-[240px] sm:w-auto sm:max-w-none justify-center items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent motion-safe:before:animate-[markury-shimmer_2.6s_ease-in-out_infinite] motion-reduce:before:hidden"
          >
            <span className="font-semibold text-white group-hover:text-markury-yellow transition-colors text-sm sm:text-base">Get Markury Now</span>
          </Link>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors shrink-0 p-1 rounded-lg hover:bg-white/10"
          aria-label="Dismiss banner"
        >
          <Cancel01Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  )
}
