import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Affiliate Program — Earn 20% Recurring Commission',
  description:
    'Join the Markury affiliate program and earn 20% recurring commission on every sale you refer. Promote a simple, high-converting screen annotation tool for creators, educators, and SaaS demos.',
  keywords: [
    'markury affiliate program',
    'screen annotation affiliate',
    'earn commission',
    'recurring commission',
    'SaaS affiliate program',
    'markury partner program',
    'refer and earn',
  ],
  alternates: {
    canonical: '/affiliates',
  },
  openGraph: {
    title: 'Affiliate Program — Earn 20% Recurring Commission | Markury',
    description:
      'Partner with Markury and earn 20% recurring commission on every referral. 7-day cookie, $50 minimum payout, and recurring subscription commissions.',
    url: 'https://www.markury.app/affiliates',
    type: 'website',
    siteName: 'Markury',
    images: [
      {
        url: '/markury_og.png',
        width: 1200,
        height: 630,
        alt: 'Markury Affiliate Program — Earn 20% Recurring Commission',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affiliate Program — Earn 20% Recurring Commission | Markury',
    description:
      'Partner with Markury and earn 20% recurring commission on every referral. 7-day cookie, $50 min payout, recurring commissions.',
    images: ['/markury_og.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function AffiliatesPage() {
  const benefits = [
    {
      title: '20% Recurring Commission',
      description: 'Earn a generous 20% on every sale, including recurring subscription renewals.',
    },
    {
      title: '7-Day Cookie Duration',
      description: 'Get credit for any purchase made within 7 days of clicking your link.',
    },
    {
      title: '$50 Minimum Payout',
      description: 'Get paid quickly with a low $50 minimum threshold, processed reliably via Lemon Squeezy.',
    },
    {
      title: 'Last Referrer Credit',
      description: 'We reward the affiliate who finally convinces the customer to buy.',
    },
  ]

  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-32 sm:pt-36 min-h-screen">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container-narrow max-w-4xl text-center">
            <span className="inline-flex items-center rounded-full bg-markury-purple/15 px-3 py-1 text-sm font-semibold text-purple-800 ring-1 ring-inset ring-markury-purple/30 mb-6">
              Partner Program
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Partner with <span className="text-highlight text-highlight--soft">Markury</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              A simple, high-converting tool for creators, educators, and SaaS demos. Recommend Markury to your audience and start earning today.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="https://nexrover.lemonsqueezy.com/affiliates"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-8 py-4 rounded-xl font-semibold hover:bg-gray-800 transition-colors text-lg shadow-lg shadow-gray-900/20"
              >
                Become an Affiliate
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="pb-24 border-b border-gray-100">
          <div className="container-narrow max-w-5xl">
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-white ring-1 ring-gray-200 shadow-sm rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works Section */}
        <section className="py-24 relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-markury-yellow/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="container-narrow max-w-4xl relative z-10">
            <h2 className="text-3xl font-bold text-center mb-16">How it works</h2>
            
            <div className="relative">
              {/* Line connecting the steps (desktop) */}
              <div className="hidden md:block absolute top-[28px] left-[50px] right-[50px] h-px bg-gray-200" />
              
              <div className="grid md:grid-cols-3 gap-12 relative z-10">
                <div className="text-center group">
                  <div className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-900 mx-auto mb-6 relative shadow-sm group-hover:border-gray-900 group-hover:scale-105 transition-all">
                    1
                  </div>
                  <h3 className="text-lg font-bold mb-2">Join the Program</h3>
                  <p className="text-gray-600">Apply via Lemon Squeezy in just a few clicks. Approval is fast.</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-14 h-14 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center text-xl font-bold text-gray-900 mx-auto mb-6 relative shadow-sm group-hover:border-gray-900 group-hover:scale-105 transition-all">
                    2
                  </div>
                  <h3 className="text-lg font-bold mb-2">Share your Link</h3>
                  <p className="text-gray-600">Promote Markury on your blog, social media, or with clients.</p>
                </div>
                
                <div className="text-center group">
                  <div className="w-14 h-14 bg-white border-2 border-markury-purple rounded-full flex items-center justify-center text-xl font-bold text-purple-700 mx-auto mb-6 relative shadow-[0_0_15px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-all">
                    3
                  </div>
                  <h3 className="text-lg font-bold mb-2">Get Paid</h3>
                  <p className="text-gray-600">Earn 20% on every sale directly to your account.</p>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-20">
              <a 
                href="https://nexrover.lemonsqueezy.com/affiliates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-900 hover:text-gray-600 font-medium transition-colors border-b border-gray-300 hover:border-gray-600 pb-1"
              >
                Apply now via Lemon Squeezy
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
