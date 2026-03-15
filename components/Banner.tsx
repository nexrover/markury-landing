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
      <div className="container-narrow flex items-center justify-between gap-3 sm:gap-4">
        <div className="flex-1 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-x-8 text-center mx-auto">
          
          <CountdownTimer variant="banner" onExpired={() => setIsVisible(false)} />

          <Link 
            href="/#pricing" 
            className="group relative inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-full transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_15px_-3px_rgba(255,255,255,0.1)]"
          >
            <span className="font-semibold text-white group-hover:text-markury-yellow transition-colors">Get Markury Now</span>
          </Link>

          {/* <Link 
            href="/#pricing" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-1.5 sm:px-5 sm:py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs sm:text-sm rounded-lg border border-white/10 transition-all duration-200"
          >
            Get Markury Now
          </Link> */}
          
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
