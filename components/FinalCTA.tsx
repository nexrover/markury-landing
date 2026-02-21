import Image from 'next/image'
import { ScribbleArrow } from '@/components/AnnotationAccents'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 bg-gray-50 border-t border-gray-100">
      <div className="container-narrow">
        <div className="relative max-w-4xl mx-auto text-center bg-white rounded-3xl p-10 sm:p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-gradient-to-bl from-primary-200/40 to-markury-cyan/20 rounded-full blur-3xl opacity-60" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-96 h-96 bg-gradient-to-tr from-markury-yellow/20 to-primary-100/30 rounded-full blur-3xl opacity-60" />
            <ScribbleArrow
              className="absolute right-4 top-12 w-[160px] h-[100px] opacity-[0.2] rotate-12 float-slower text-markury-yellow"
              stroke="currentColor"
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="w-16 h-16 mx-auto mb-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center p-3">
              <Image
                src="/logo.svg"
                alt="Markury"
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 tracking-tight mb-5 leading-tight">
              Ready to communicate with <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-markury-cyan">clarity?</span>
            </h2>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-gray-500 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of teachers, presenters, and creators who trust Markury to help them explain, highlight, and annotate with ease.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="#pricing" className="btn-primary w-full sm:w-auto shadow-lg shadow-primary-500/25">
                Get Markury Pro
              </a>
            </div>

            {/* Trust text */}
            <div className="inline-flex items-center justify-center gap-2 text-sm font-medium text-gray-500 bg-gray-50/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-100">
              <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
