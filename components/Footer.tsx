import Image from 'next/image'
import { NewTwitterIcon, GithubIcon } from 'hugeicons-react'

export default function Footer() {
  const links = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'Use Cases', href: '#use-cases' },
    ],
    support: [
      { label: 'User Guide', href: '/user-guide' },
      { label: 'Contact Us', href: '/contact-support' },
      { label: 'FAQ', href: '#faq' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
      { label: 'Refund Policy', href: '/refund-policy' },
    ],
  }

  return (
    <footer className="bg-gray-50 text-gray-900 py-16">
      <div className="container-narrow">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <Image
                src="/logo.svg"
                alt="Markury Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-highlight text-highlight--thin">
                Markury
              </span>
            </a>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Screen annotation made simple. Draw, highlight, and present directly on your screen.
            </p>
            
          </div>

          {/* Product links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-600 hover:text-gray-900 text-sm transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-900 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} Markury. All rights reserved.
            </p>
            
            {/* Social links */}
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="Twitter">
                <NewTwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-900 transition-colors" aria-label="GitHub">
                <GithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
