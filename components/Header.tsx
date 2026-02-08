'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Menu01Icon, Cancel01Icon } from 'hugeicons-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#use-cases', label: 'Use Cases' },
    { href: '#pricing', label: 'Pricing' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <nav className="container-narrow">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/new_logo.svg"
              alt="Markury Logo"
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10"
            />
            <span className="relative text-xl sm:text-2xl font-bold text-gray-900">
              <span>Markury</span>
              {/* Freehand-style underline */}
              <span className="pointer-events-none absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-yellow-300/80" />
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/#pricing"
              className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors shadow-md"
            >
              Start highlighting
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <Cancel01Icon className="w-6 h-6" />
            ) : (
              <Menu01Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-gray-900 bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-colors mt-2 shadow-md"
              >
                Start highlighting
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
