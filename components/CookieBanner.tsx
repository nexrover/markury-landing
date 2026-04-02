'use client'

import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem('cookie_consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      // If consent was previously granted, update GTM
      if (consent === 'granted') {
        window.gtag?.('consent', 'update', {
          'ad_storage': 'granted',
          'analytics_storage': 'granted'
        })
      }
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'granted')
    setShowBanner(false)
    window.gtag?.('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    })
  }

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'denied')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-[100]">
      <div className="container-narrow flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 text-center sm:text-left">
          <p>
            We use cookies to improve your experience and analyze our traffic. 
            By clicking &quot;Accept&quot;, you consent to our use of cookies.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
