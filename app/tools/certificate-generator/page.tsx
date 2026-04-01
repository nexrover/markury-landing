import dynamic from 'next/dynamic'

const CertificateEditorApp = dynamic(
  () => import('@/components/tools/certificate/CertificateEditor'),
  { ssr: false }
)

export const metadata = {
  title: 'Certificate Generator (Free) - Create & Customize Certificates - Markury Tools',
  description:
    'Design beautiful, professional certificates with our free drag-and-drop certificate generator. Choose from pre-designed templates, customize text, colors, and backgrounds, then export as PDF or PNG.',
  alternates: { canonical: '/tools/certificate-generator' },
  openGraph: {
    title: 'Certificate Generator (Free) - Create & Customize Certificates - Markury Tools',
    description:
      'Create professional certificates in minutes with pre-designed templates, drag-and-drop editing, and instant PDF/PNG export. Free for teachers, tutors, and organizations.',
    url: 'https://www.markury.app/tools/certificate-generator',
    type: 'website',
    images: [{ url: '/markury_og.png', width: 1200, height: 630, alt: 'Markury Certificate Generator' }],
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'Free Certificate Generator - Markury Tools',
    description:
      'Design and export professional certificates with drag-and-drop editing, templates, and instant PDF export.',
    images: ['/markury_og.png'],
  },
}

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Certificate Generator - Markury',
    url: 'https://www.markury.app/tools/certificate-generator',
    description: metadata.description,
    applicationCategory: 'DesignApplication',
    operatingSystem: 'All',
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    creator: { '@type': 'Organization', name: 'Markury', url: 'https://www.markury.app' },
  },
]

export default function CertificateGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CertificateEditorApp />
    </>
  )
}
