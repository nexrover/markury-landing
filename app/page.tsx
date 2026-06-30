import Header from '@/components/Header'
import Hero from '@/components/Hero'
// import ProblemSolution from '@/components/ProblemSolution'
import HowItWorks from '@/components/HowItWorks'
import Features from '@/components/Features'
import UseCases from '@/components/UseCases'
import WhyMarkury from '@/components/WhyMarkury'
import Pricing from '@/components/Pricing'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import FAQ from '@/components/FAQ'

export const metadata = {
  alternates: {
    canonical: '/',
  },
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Is Markury a subscription?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer flexible pricing to suit your needs. You can choose a standard yearly subscription or pay once for a lifetime license. Both plans include all features and future updates."
      }
    },
    {
      "@type": "Question",
      "name": "Does it work on both macOS and Windows?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes! Markury is a native application optimized for both macOS (12.0+) and Windows (10+). It feels right at home on either operating system."
      }
    },
    {
      "@type": "Question",
      "name": "Can I use Markury while screen recording or sharing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Absolutely. Markury draws directly on your screen overlay, so your annotations are visible to any screen recording tool (like OBS, Loom, QuickTime) and video conferencing apps (Zoom, Teams, Google Meet)."
      }
    },
    {
      "@type": "Question",
      "name": "Do I need an internet connection?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You only need an internet connection once to activate your license key. After that, Markury works 100% offline. We respect your privacy and don't send any data to the cloud."
      }
    },
    {
      "@type": "Question",
      "name": "Can I install it on multiple computers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, 1 license covers 2 devices that you own (e.g., a desktop and a laptop)."
      }
    },
    {
      "@type": "Question",
      "name": "What is your refund policy?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We offer a no-questions-asked 7-day money-back guarantee. If Markury doesn't improve your workflow, simply email us at support@markury.app for a full refund."
      }
    }
  ]
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        {/* <ProblemSolution /> */}
        <HowItWorks />
        <Features />
        <UseCases />
        <WhyMarkury />
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}
