'use client'

import { useState } from 'react'
import { Cancel01Icon } from 'hugeicons-react'
import Link from 'next/link'

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="relative bg-gray-900 text-white px-4 py-3 sm:px-6 z-50">
      <div className="container-narrow flex items-center justify-between gap-4">
        <div className="flex-1 flex flex-row flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:gap-6 text-xs sm:text-sm md:text-base text-center mx-auto">
          <p className="font-medium whitespace-nowrap">
            <span className="hidden sm:inline">🚀 </span>
            <span className="font-bold text-markury-yellow">Launch Offer:</span> Get 50% off<span className="hidden sm:inline"> your first month</span>!
          </p>
          <Link 
            href="/#pricing" 
            className="whitespace-nowrap font-semibold text-markury-cyan hover:text-white transition-colors underline decoration-2 underline-offset-4"
          >
            Claim Offer &rarr;
          </Link>
        </div>
        
        <button 
          onClick={() => setIsVisible(false)}
          className="text-gray-400 hover:text-white transition-colors shrink-0"
          aria-label="Dismiss banner"
        >
          <Cancel01Icon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
