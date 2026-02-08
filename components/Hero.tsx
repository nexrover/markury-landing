import Image from 'next/image'
import { LaserPointer, ScribbleArrow, ScribbleCircle } from '@/components/AnnotationAccents'
import { ArrowRight02Icon, PencilEdit02Icon, Menu01Icon } from 'hugeicons-react'

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white -z-10" />
      
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.015] -z-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />

      <div className="container-narrow">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6">
            Screen annotation{' '}
            <span className="text-highlight">made simple</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed mb-10 max-w-2xl mx-auto">
            Draw, highlight, and present directly on your screen. 
            
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="#pricing" className="btn-primary w-full sm:w-auto">
              Get Markury Pro — $49
              <ArrowRight02Icon className="w-5 h-5 ml-2" />
            </a>
            <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
              See how it works
            </a>
          </div>

          {/* Hero Visual */}
          <div className="relative mx-auto max-w-3xl">
            {/* Floating toolbar mockup */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 sm:p-8">
              {/* Screen mockup */}
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl relative overflow-hidden">
                {/* Subtle animated laser pointer */}
                <LaserPointer className="opacity-70" />

                {/* Annotation demonstration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="text-2xl sm:text-3xl font-semibold text-gray-400 mb-4">Your Screen Content</div>
                    
                    {/* Simulated annotations */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 225" preserveAspectRatio="xMidYMid meet">
                      {/* Circle annotation */}
                      <ellipse cx="200" cy="90" rx="60" ry="30" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="0" />
                      
                      {/* Arrow */}
                      <path d="M280 90 L340 60" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
                      <polygon points="340,60 330,58 335,68" fill="#3b82f6" />
                      
                      {/* Highlight */}
                      <rect x="120" y="140" width="160" height="20" fill="#fbbf24" fillOpacity="0.4" rx="4" />
                      
                      {/* Freehand underline */}
                      <path d="M100 180 Q150 175 200 182 T300 178" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                
                {/* Floating toolbar indicator */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-lg shadow-lg px-3 py-2 flex items-center gap-2">
                  <Image src="/new_logo.svg" alt="" width={16} height={16} className="w-4 h-4" />
                  <div className="flex gap-1">
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                      <PencilEdit02Icon className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                    <div className="w-6 h-6 bg-yellow-100 rounded flex items-center justify-center">
                      <div className="w-3 h-1.5 bg-yellow-500 rounded-full" />
                    </div>
                    <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                      <Menu01Icon className="w-3.5 h-3.5 text-gray-600" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-200 rounded-full opacity-40 blur-2xl" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-200 rounded-full opacity-40 blur-2xl" />

            {/* Hand-drawn accents (subtle, like marker doodles) */}
            <ScribbleCircle
              className="absolute -top-12 right-4 w-32 h-24 opacity-40 rotate-6"
              stroke="#ffffff"
            />
            <ScribbleArrow
              className="absolute -bottom-14 left-2 w-32 h-20 opacity-40 -rotate-6"
              stroke="#ffffff"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
