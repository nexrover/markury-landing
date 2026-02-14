import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Markury | Screen Annotation Made Simple',
  description: 'Draw, highlight, and annotate directly on your screen. The modern desktop annotation tool for teachers, presenters, designers, and remote teams.',
  keywords: 'screen annotation, drawing tool, presentation software, screen marker, digital whiteboard, teaching tool, screen recording',
  authors: [{ name: 'Markury' }],
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: [
      { url: '/favicon/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: 'Markury | Screen Annotation Made Simple',
    description: 'Draw, highlight, and annotate directly on your screen. The modern desktop annotation tool for teachers, presenters, designers, and remote teams.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Markury',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markury | Screen Annotation Made Simple',
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
        <Script id="crisp-chat" strategy="afterInteractive">
          {`window.$crisp=[];window.CRISP_WEBSITE_ID="c5564772-c0c5-464c-8f4d-d8cf3baad833";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`}
        </Script>
      </body>
    </html>
  )
}
