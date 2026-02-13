import { ScribbleStroke } from '@/components/AnnotationAccents'
import {  CheckmarkCircle02Icon, AiSecurity01Icon } from 'hugeicons-react'

export default function Pricing() {
  const proFeatures = [
    "All drawing tools (freehand, highlighter, eraser)",
    "Shape tools (line, rectangle, circle, ellipse, arrow)",
    "Text annotations",
    "Laser pointer for presentations",
    "Whiteboard mode with 4 colors",
    "Full screen & region screenshots",
    "4 customizable quick colors",
    "Fully customizable keyboard shortcuts",
    "Flexible toolbar (vertical/horizontal)",
    "Tool customization (show/hide/reorder)",
    "Unlimited undo & redo",
    "System tray integration",
    "Dark & light themes",
    "All future updates included",
  ]

  const lifetimeFeatures = [
    "All drawing tools (freehand, highlighter, eraser)",
    "Shape tools (line, rectangle, circle, ellipse, arrow)",
    "Text annotations",
    "Laser pointer for presentations",
    "Whiteboard mode with 4 colors",
    "Full screen & region screenshots",
    "4 customizable quick colors",
    "Fully customizable keyboard shortcuts",
    "Flexible toolbar (vertical/horizontal)",
    "Tool customization (show/hide/reorder)",
    "Unlimited undo & redo",
    "System tray integration",
    "Dark & light themes",
    "All future updates included",
  ]

  return (
    <section id="pricing" className="relative overflow-hidden py-20 sm:py-32">
      {/* Background accent */}
      <ScribbleStroke
        className="absolute -left-6 bottom-24 w-[520px] h-[120px] opacity-70 rotate-3 float-slow"
        stroke="#A3F635"
      />

      <div className="container mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Simple pricing,{' '}
            <span className="marker-underline marker-underline--soft">
              complete package
            </span>
          </h2>
          <p className="section-subheading">
            Choose the plan that suits you best.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          
          {/* Markury Pro Plan */}
          <div className="relative bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0">
              <div className="bg-markury-yellow text-gray-900 text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wide">
                Most Popular
              </div>
            </div>

            <div className="p-8 sm:p-10 flex-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Markury Pro</h3>
                <p className="text-highlight text-highlight--soft inline-block font-medium">7 days free trial</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-gray-400 line-through text-2xl">$29/year</span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">$19</span>
                  <span className="text-gray-600 font-medium">/year</span>
                </div>
                <p className="text-gray-500 text-sm mt-3 font-medium">Launch pricing — limited time.</p>
              </div>

              <a
                href="https://nexrover.lemonsqueezy.com/buy/081ee812-4d2c-4740-9111-ce03f0b26aa9"
                className="btn-primary block w-full text-center mb-4"
              >
                Start Free Trial
              </a>
              <p className="text-gray-500 text-xs text-center mb-8">
                Locked in price. No price increase for existing users.
              </p>

              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">What&apos;s included:</p>
                <ul className="space-y-3">
                  {proFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckmarkCircle02Icon className="w-5 h-5 text-markury-lime flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Lifetime Plan */}
          <div className="relative bg-gray-50 rounded-3xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
             <div className="absolute top-0 right-0">
              <div className="bg-gray-900 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl uppercase tracking-wide">
                Founders Offer
              </div>
            </div>

            <div className="p-8 sm:p-10 flex-1 flex flex-col">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Lifetime</h3>
                <p className="text-gray-600 font-medium">Pay once, own it forever</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-gray-400 line-through text-2xl">$79</span>
                </div>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-gray-900">$39</span>
                  <span className="text-gray-600 font-medium">one-time</span>
                </div>
                <p className="text-gray-500 text-sm mt-3 font-medium">Launch pricing — limited time.</p>
              </div>

              <a
                href="https://nexrover.lemonsqueezy.com/checkout/buy/f8632404-ee60-4d46-8782-c64e310bb943"
                className="inline-flex items-center justify-center w-full px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-xl transition-all duration-200 shadow-lg hover:-translate-y-0.5 hover:bg-gray-800 mb-4"
              >
                Get Lifetime Access
              </a>
              <p className="text-gray-500 text-xs text-center mb-8">
                One-time payment. No recurring fees.
              </p>

               <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">All features included:</p>
                <ul className="space-y-3">
                  {lifetimeFeatures.map((feature, index) => (
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
                <h4 className="text-lg font-bold text-gray-900 mb-1">30-Day Money-Back Guarantee</h4>
                <p className="text-gray-600">Not satisfied? Get a full refund, no questions asked. We're confident you'll love Markury.</p>
              </div>
            </div>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 text-center space-y-1">
          <p className="text-gray-500 text-sm">
            Secure payment via Stripe • Instant download after purchase • macOS 12.0+
          </p>
          <p className="text-gray-400 text-xs">
            Windows support is planned and currently in development.
          </p>
        </div>
      </div>
    </section>
  )
}
