import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ShareDiscount from '@/components/ShareDiscount'

export const metadata: Metadata = {
  title: 'Share & Save 10%',
  description: 'Share Markury with your friends and get a 10% discount on your purchase. Share on social media, verify your post, and claim your exclusive discount code.',
  alternates: {
    canonical: '/share',
  },
}

export default function SharePage() {
  return (
    <>
      <Header />
      <main className="pt-24 sm:pt-28 pb-16 min-h-screen bg-gradient-to-b from-white via-orange-50/30 to-white">
        <ShareDiscount />
      </main>
      <Footer />
    </>
  )
}
