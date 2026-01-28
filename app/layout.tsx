import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Markury — Screen Annotation Made Simple',
  description: 'Draw, highlight, and annotate directly on your screen. The modern desktop annotation tool for teachers, presenters, designers, and remote teams.',
  keywords: 'screen annotation, drawing tool, presentation software, screen marker, digital whiteboard, teaching tool, screen recording',
  authors: [{ name: 'Markury' }],
  openGraph: {
    title: 'Markury — Screen Annotation Made Simple',
    description: 'Draw, highlight, and annotate directly on your screen. The modern desktop annotation tool for teachers, presenters, designers, and remote teams.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Markury',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markury — Screen Annotation Made Simple',
    description: 'Draw, highlight, and annotate directly on your screen. The modern desktop annotation tool for teachers, presenters, designers, and remote teams.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        {children}
      </body>
    </html>
  )
}
