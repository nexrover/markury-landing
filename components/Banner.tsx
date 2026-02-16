'use client'

import { useState } from 'react'
import { Cancel01Icon } from 'hugeicons-react'
import Link from 'next/link'

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-gray-900 via-slate-900 to-gray-900 text-white px-4 py-2.5 sm:px-6 z-50 border-b border-white/10">
      <div className="container-narrow flex items-center justify-between gap-4">
        <div className="flex-1 flex flex-row flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-6 text-xs sm:text-sm md:text-base text-center mx-auto">
          
          <div className="flex items-center gap-2.5">
            <span className="text-lg leading-none animate-wiggle inline-block origin-bottom">🎁</span>
            <p className="font-medium whitespace-nowrap">
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-markury-yellow to-markury-orange">Launch Offer:</span>
              <span className="text-gray-200 ml-1.5">Get 50% off<span className="hidden sm:inline"> your first month</span>!</span>
            </p>
          </div>

          <Link 
            href="/#pricing" 
            className="group relative inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]"
          >
            <span className="font-semibold text-white group-hover:text-markury-yellow transition-colors">Claim Offer</span>
            <span className="block transition-transform group-hover:translate-x-0.5">&rarr;</span>
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
