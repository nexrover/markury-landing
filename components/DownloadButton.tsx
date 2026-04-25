'use client'

import React from 'react'

interface DownloadButtonProps {
  platform: string
  url: string
  children: React.ReactNode
}

export default function DownloadButton({ platform, url, children }: DownloadButtonProps) {
  const handleDownload = () => {
    // Fire and forget background tracking. 
    // Uses keepalive so it completes even if the page starts unloading.
    fetch('/api/track-download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ platform }),
      keepalive: true,
    }).catch((err) => {
      // Silently catch errors so it never affects the user experience
      console.error('Failed to track download:', err)
    })
  }

  return (
    <a
      href={url}
      onClick={handleDownload}
      className="flex items-center justify-center gap-3 w-full px-6 py-3.5 text-base font-semibold text-gray-900 bg-markury-yellow rounded-xl hover:opacity-95 transition-all shadow-md hover:shadow-lg"
    >
      {children}
    </a>
  )
}
