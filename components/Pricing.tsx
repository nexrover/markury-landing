'use client'

import { ScribbleStroke } from '@/components/AnnotationAccents'
import { CheckmarkCircle02Icon, AiSecurity01Icon, GiftIcon } from 'hugeicons-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function PricingContent() {
  const searchParams = useSearchParams()
  const discountCode = searchParams.get('discount')
  
  const isDiscounted = discountCode === 'SHARE10'
  
  const proYearlyBasePrice = 29
  const proYearlyPrice = isDiscounted ? 26 : proYearlyBasePrice
  const proYearlyLink = isDiscounted 
    ? "https://nexrover.lemonsqueezy.com/checkout/buy/089cb402-7c2f-4752-8b80-fb8929b4fb18?checkout[discount_code]=SHARE10" 
    : "https://nexrover.lemonsqueezy.com/checkout/buy/089cb402-7c2f-4752-8b80-fb8929b4fb18"
    
  const proLifetimeBasePrice = 79
  const proLifetimePrice = isDiscounted ? 71 : proLifetimeBasePrice
  const proLifetimeLink = isDiscounted
    ? "https://nexrover.lemonsqueezy.com/checkout/buy/88f60998-3fd2-47b0-be0e-87d1713c5110?checkout[discount_code]=SHARE10"
    : "https://nexrover.lemonsqueezy.com/checkout/buy/88f60998-3fd2-47b0-be0e-87d1713c5110"
  const features = [
    "All drawing tools (freehand, highlighter, eraser)",
    "Shape tools (line, rectangle, circle, ellipse, arrow)",
    "Text annotations",
    "Laser pointer for presentations",
    "Whiteboard mode with 4 colors",
    "Full screen & region screenshots",
    "4 customizable quick colors",
    "Fully customizable keyboard shortcuts",
    "Flexible toolbar (vertical/horizontal)",
    "Unlimited undo & redo",
    "Dark & light themes with 7 accent colors",
    "1 license covers 2 devices",
    "All future updates included",
  ]

  return (
    <section id="pricing" className="relative overflow-hidden py-20 sm:py-32">
      {/* Background accent */}
      <ScribbleStroke
        className="absolute -left-6 bottom-24 w-[520px] h-[120px] opacity-70 rotate-3 float-slow"
        stroke="#FB923C"
      />

      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="section-heading mb-4">
            Simple pricing,{' '}
            <span className="marker-underline marker-underline--orange">
              complete package
            </span>
          </h2>
          <p className="section-subheading">
            Choose the plan that suits you best.
          </p>
        </div>

        {/* Share & Save Promo */}
        <div className="max-w-4xl mx-auto mb-16 px-4">
          <div className="bg-gradient-to-r from-orange-50 via-yellow-50 to-orange-50 rounded-3xl p-6 sm:p-8 border border-orange-200/60 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
            <div className="absolute -right-12 -top-12 w-48 h-48 bg-markury-orange opacity-10 rounded-full blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />
            <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-markury-yellow opacity-10 rounded-full blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity duration-500" />
            
            <div className="flex items-center gap-5 sm:gap-6 z-10 relative text-center md:text-left flex-col md:flex-row w-full md:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl flex items-center justify-center shadow-md flex-shrink-0 border border-orange-100">
                <GiftIcon className="w-8 h-8 sm:w-10 sm:h-10 text-markury-orange animate-wiggle" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1.5">
                  Get <span className="text-markury-orange">10% Off</span> Your Purchase
                </h3>
                <p className="text-gray-600 text-sm sm:text-base max-w-md">
                  Share Markury with your friends on social media and unlock an exclusive discount code instantly.
                </p>
              </div>
            </div>
            
            <Link 
              href="/share" 
              className="btn-primary whitespace-nowrap z-10 shrink-0 w-full md:w-auto text-sm sm:text-base px-6 py-3.5 sm:px-8 sm:py-4 border border-orange-400 relative overflow-hidden before:pointer-events-none before:absolute before:inset-y-0 before:-left-1/3 before:w-1/3 before:skew-x-[-20deg] before:bg-gradient-to-r before:from-transparent before:via-white/30 before:to-transparent motion-safe:before:animate-[markury-shimmer_2.6s_ease-in-out_infinite] motion-reduce:before:hidden hover:shadow-[0_0_20px_-3px_rgba(251,146,60,0.5)] motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
              style={{ backgroundColor: 'var(--markury-orange)', color: 'white' }}
            >
              Share & Save 10%
            </Link>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto px-4">
          
          {/* Markury Pro Plan */}
          <div className="relative bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col transform lg:-translate-y-4">
            <div className="absolute top-0 right-0">
              <div className="bg-markury-orange text-gray-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wide">
                Most Popular
              </div>
            </div>

            <div className="p-8 sm:p-10 flex-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Yearly</h3>
                <p className="text-highlight text-highlight--soft inline-block font-medium">7 days free trial</p>
              </div>

              <div className="text-center mb-8 lg:mb-12">
                <div className="flex items-baseline justify-center gap-1">
                  {isDiscounted && <span className="text-2xl text-gray-400 line-through mr-2">${proYearlyBasePrice}</span>}
                  <span className="text-5xl font-bold text-gray-900 tracking-tight">${proYearlyPrice}</span>
                  <span className="text-gray-600 font-medium">/year</span>
                </div>
              </div>

              <a
                href={proYearlyLink}
                style={{ backgroundColor: 'var(--markury-orange)' }}
                className="btn-primary block w-full text-center mb-4"
              >
                Start Free Trial
              </a>
              <p className="text-gray-500 text-xs text-center mb-8">
                Locked-in price for existing users.
              </p>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckmarkCircle02Icon className="w-5 h-5 text-markury-orange flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Lifetime Plan */}
          <div className="relative bg-gray-50 rounded-3xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">

            <div className="p-8 sm:p-10 flex-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro Lifetime</h3>
                <p className="text-gray-600 font-medium">Pay once, own it forever</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  {isDiscounted && <span className="text-2xl text-gray-400 line-through mr-2">${proLifetimeBasePrice}</span>}
                  <span className="text-5xl font-bold text-gray-900 tracking-tight">${proLifetimePrice}</span>
                  <span className="text-gray-600 font-medium">one-time</span>
                </div>
              </div>

              <a
                href={proLifetimeLink}
                className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-xl transition-all duration-200 shadow-lg hover:-translate-y-0.5 hover:bg-gray-800 mb-4"
              >
                Get Lifetime Access
              </a>
              <p className="text-gray-500 text-xs text-center mb-8">
                One-time payment. No recurring fees.
              </p>

               <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">What&apos;s included:</p>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckmarkCircle02Icon className="w-5 h-5 text-markury-lime flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Guarantee */}
        <div className="max-w-3xl mx-auto mt-16 px-4">
             <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center flex-shrink-0">
                <AiSecurity01Icon className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-1">7-Day Money-Back Guarantee</h4>
                <p className="text-gray-600">Not satisfied? Get a full refund, no questions asked. We&apos;re confident you&apos;ll love Markury.</p>
              </div>
            </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center space-y-1">
          <p className="text-gray-500 text-sm">
            Secure payment via Stripe • Instant download after purchase • macOS 12.0+ & Windows 10+
          </p>
      </div>
      </div>
    </section>
  )
}

export default function Pricing() {
  return (
    <Suspense fallback={
      <section className="relative overflow-hidden py-20 sm:py-32 min-h-screen">
        <div className="container mx-auto relative flex justify-center items-center h-full">
          <div className="w-12 h-12 border-4 border-markury-orange/30 border-t-markury-orange rounded-full animate-spin"></div>
        </div>
      </section>
    }>
      <PricingContent />
    </Suspense>
  )
}
