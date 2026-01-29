import { ScribbleStroke } from '@/components/AnnotationAccents'

export default function Pricing() {
  const features = [
    "All drawing tools (freehand, highlighter, eraser)",
    "Shape tools (line, rectangle, circle, arrow)",
    "Text annotations",
    "Laser pointer for presentations",
    "Whiteboard mode with 16 colors",
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
        stroke="#22c55e"
      />

      <div className="container-narrow relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Simple pricing,{' '}
            <span className="marker-underline marker-underline--soft">
              complete package
            </span>
          </h2>
          <p className="section-subheading">
            One plan with everything included. Pay once, use forever.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-lg mx-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
            {/* Popular badge */}
            <div className="absolute top-0 right-0">
              <div className="bg-gray-900 text-white text-xs font-semibold px-4 py-1.5 rounded-bl-xl">
                One-time purchase
              </div>
            </div>

            <div className="p-8 sm:p-10">
              {/* Plan name */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Markury Pro</h3>
                <p className="text-gray-600">Everything you need, nothing you don&apos;t.</p>
              </div>

              {/* Price */}
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-6xl font-bold text-gray-900">$99</span>
                </div>
                <p className="text-gray-500 mt-2">One-time payment • Yours forever</p>
              </div>

              {/* CTA */}
              <a
                href="#"
                className="block w-full text-center px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-xl hover:bg-gray-800 transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 mb-8"
              >
                Get Markury Pro
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>

              {/* Features list */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Everything included:</p>
                <ul className="grid grid-cols-1 gap-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Guarantee */}
            <div className="bg-gray-50 px-8 sm:px-10 py-6 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">30-Day Money-Back Guarantee</p>
                  <p className="text-sm text-gray-600">Not satisfied? Get a full refund, no questions asked.</p>
                </div>
              </div>
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
