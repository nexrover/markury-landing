'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu01Icon, Cancel01Icon } from 'hugeicons-react'
import Banner from './Banner'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle hash navigation when landing on the page or navigating
  useEffect(() => {
    if (pathname === '/' && window.location.hash) {
      const id = window.location.hash.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' })
        }, 100)
      }
    }
  }, [pathname])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setMobileMenuOpen(false)
    if (pathname === '/' && href.startsWith('/#')) {
      e.preventDefault()
      const targetId = href.replace('/#', '')
      const element = document.getElementById(targetId)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navLinks = [
    // { href: '/#how-it-works', label: 'How It Works' },
    { href: '/#features', label: 'Features' },
    { href: '/#use-cases', label: 'Use Cases' },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/blog', label: 'Blog' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col transition-all duration-300">
      <Banner />
      <div className="w-full bg-white/80 backdrop-blur-lg border-b border-gray-100">
        <nav className="container-narrow">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt="Markury Logo"
                width={32}
                height={32}
                className="w-8 h-8 sm:w-9 sm:h-9"
              />
              <span className="relative text-xl sm:text-2xl font-bold text-gray-900">
                <span className="text-highlight text-highlight--soft">Mark</span>ury
                {/* Freehand-style underline */}
                {/* <span className="pointer-events-none absolute left-0 right-0 -bottom-1 h-[3px] rounded-full bg-yellow-300/80" /> */}
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Button */}

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="http://app.lemonsqueezy.com/my-orders/login"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                Sign in
              </Link>
              <Link
                href="/#pricing"
                onClick={(e) => handleNavClick(e, '/#pricing')}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-gray-900 bg-markury-yellow rounded-lg hover:opacity-95 transition-colors shadow-md"
              >
                Start Free Trial
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
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                  <Link
                    href="http://app.lemonsqueezy.com/my-orders/login"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/#pricing"
                    onClick={(e) => handleNavClick(e, '/#pricing')}
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-gray-900 bg-markury-yellow rounded-lg hover:opacity-95 transition-colors mt-2 shadow-md"
                  >
                    Start Free Trial
                  </Link>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}
