'use client'

import { useEffect, useState } from 'react'
import { Download01Icon } from 'hugeicons-react'

interface DownloadCountBadgeProps {
  className?: string
  variant?: 'neutral' | 'orange' | 'dark'
}

export default function DownloadCountBadge({ className = '', variant = 'neutral' }: DownloadCountBadgeProps) {
  const [count, setCount] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/download-count')
      .then(res => res.json())
      .then(data => setCount(data.count))
      .catch(err => console.error(err))
  }, [])

  if (count === null) {
    return <div className={`h-8 animate-pulse bg-gray-100 rounded-full w-56 ${className}`}></div>
  }

  const variantStyles = {
    neutral: 'bg-white/80 text-gray-600 border-gray-200',
    orange: 'bg-orange-50/80 text-markury-orange border-orange-200',
    dark: 'bg-gray-900/80 text-white border-gray-700'
  }

  const iconStyles = {
    neutral: 'text-markury-orange',
    orange: 'text-markury-orange',
    dark: 'text-markury-orange'
  }

  return (
    <div className={`inline-flex items-center justify-center gap-2 text-sm font-medium backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm animate-fadeIn ${variantStyles[variant]} ${className}`}>
      <Download01Icon className={`w-4 h-4 ${iconStyles[variant]}`} />
      <span>{count.toLocaleString()}+ professionals downloaded Markury</span>
    </div>
  )
}
