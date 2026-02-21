import Link from 'next/link'
import { ReactNode } from 'react'

interface InternalLinkProps {
  href: string
  children: ReactNode
  className?: string
}

export default function InternalLink({ href, children, className }: InternalLinkProps) {
  const isInternal = href.startsWith('/') || href.startsWith('#')
  
  if (isInternal) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    )
  }

  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  )
}
