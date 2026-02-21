'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface TocItem {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<TocItem[]>([])
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    // Extract headings from the rendered article
    const article = document.querySelector('article')
    if (!article) return

    const elements = article.querySelectorAll('h2')
    const items: TocItem[] = Array.from(elements).map((el) => {
      // Ensure each heading has an id
      if (!el.id) {
        el.id = el.textContent
          ?.toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') || ''
      }
      return {
        id: el.id,
        text: el.textContent || '',
        level: Number(el.tagName.charAt(1)),
      }
    })
    setHeadings(items)
  }, [])

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: '-80px 0px -75% 0px', threshold: 0 }
    )

    headings.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <nav className="hidden xl:block">
      <div className="sticky top-36">
        <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-5">
          Contents
        </p>
        <ul className="space-y-1.5 border-l-2 border-gray-100">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`block text-[15px] leading-snug transition-all duration-200 py-2 border-l-2 -ml-[2px] ${
                  heading.level === 3 ? 'pl-6' : 'pl-4'
                } ${
                  activeId === heading.id
                    ? 'border-primary-500 text-primary-600 font-semibold'
                    : 'border-transparent text-gray-400 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>

        {/* Promotional CTA */}
        <div className="mt-14 p-8 rounded-xl bg-gray-50 border border-gray-100 flex flex-col items-start gap-4">
          <h3 className="text-[26px] font-bold text-gray-900 leading-[1.15] tracking-tight">
            Get Started with Markury
          </h3>
          <p className="text-[15px] text-gray-600 leading-relaxed max-w-[90%]">
            Draw and annotate on your screen instantly. Perfect for presentations!
          </p>
          <Link
            href="/#pricing"
            className="mt-2 inline-flex items-center justify-center text-[15px] font-semibold text-gray-900 bg-markury-yellow px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Start Free Trial
          </Link>
        </div>
      </div>
    </nav>
  )
}

