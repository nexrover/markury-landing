import Image from 'next/image'
import { ScribbleArrow } from '@/components/AnnotationAccents'
import { ArrowRight02Icon } from 'hugeicons-react'

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="container-narrow">
        <div className="relative max-w-4xl mx-auto text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-markury-cyan/50 to-markury-purple/30 rounded-full opacity-30 blur-3xl" />
            <ScribbleArrow
              className="absolute -right-10 -top-10 w-[260px] h-[180px] opacity-[0.08] rotate-6 float-slower"
              stroke="#22D3EE"
            />
          </div>

          {/* Content */}
          <div className="relative">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto mb-8">
              <Image
                src="/new_logo.svg"
                alt="Markury"
                width={80}
                height={80}
                className="w-20 h-20"
              />
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-6">
              Ready to communicate with clarity?
            </h2>

            {/* Subheadline */}
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join thousands of teachers, presenters, and creators who trust Markury to help them explain, highlight, and annotate with ease.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <a href="#pricing" className="btn-primary w-full sm:w-auto">
                Get Markury Pro
                <ArrowRight02Icon className="w-5 h-5 ml-2" />
              </a>
            </div>

            {/* Trust text */}
            <p className="text-gray-500 text-sm">
              One-time purchase • 30-day money-back guarantee • All future updates included
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
