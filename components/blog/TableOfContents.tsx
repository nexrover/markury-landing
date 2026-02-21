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

    const elements = article.querySelectorAll('h2, h3')
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
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">
          On this page
        </p>
        <ul className="space-y-1 border-l-2 border-gray-100">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' })
                }}
                className={`block text-[13px] leading-snug transition-all duration-200 py-1.5 border-l-2 -ml-[2px] ${
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

        {/* Mini CTA */}
        <div className="mt-8 p-4 rounded-xl bg-gradient-to-br from-primary-50 to-markury-yellow/10 border border-primary-100">
          <p className="text-xs font-bold text-gray-900 mb-1.5">Try Markury Free</p>
          <p className="text-[11px] text-gray-500 leading-relaxed mb-3">
            Draw &amp; annotate on your screen instantly.
          </p>
          <Link
            href="/#pricing"
            className="block text-center text-xs font-semibold text-gray-900 bg-markury-yellow px-3 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-sm"
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  )
}

