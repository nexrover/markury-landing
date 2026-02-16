'use client'

import { useRef, useState, useEffect, ReactNode } from 'react'

interface LazyMediaProps {
  children: ReactNode
  className?: string
  /** Margin around the root for triggering early (e.g. "200px") */
  rootMargin?: string
  /** Placeholder height class while content is not yet visible */
  placeholderClass?: string
}

/**
 * Wrapper that defers rendering its children until the element
 * scrolls near the viewport, using IntersectionObserver.
 * Once visible, it stays rendered (no unloading).
 */
export default function LazyMedia({
  children,
  className = '',
  rootMargin = '200px',
  placeholderClass = 'min-h-[200px]',
}: LazyMediaProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // If IntersectionObserver isn't available, show immediately
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={className}>
      {isVisible ? (
        children
      ) : (
        <div className={`${placeholderClass} bg-gray-100 rounded-lg animate-pulse`} />
      )}
    </div>
  )
}
