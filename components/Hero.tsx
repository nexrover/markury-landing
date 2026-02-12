import { ScribbleArrow, ScribbleCircle } from '@/components/AnnotationAccents'
import { ArrowRight02Icon } from 'hugeicons-react'
import VideoComparison from '@/components/VideoComparison'

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
        <div className="max-w-5xl mx-auto text-center">
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
              Get Markury Pro
            </a>
            <a href="#how-it-works" className="btn-secondary w-full sm:w-auto">
              See how it works
            </a>
          </div>
        </div>

          {/* Hero Visual - Video Comparison */}
          <div className="relative mx-auto w-full max-w-[90rem]">
            {/* Main container with shadow/border */}
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 sm:p-4">
              <div className="aspect-video bg-gray-100 rounded-xl overflow-hidden relative isolate">
                <VideoComparison 
                  // Placeholder videos - PLEASE REPLACE WITH YOUR ACTUAL URLs
                  videoSrc1="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
                  videoSrc2="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                  label1="Without Markury"
                  label2="With Markury"
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-markury-yellow/50 rounded-full opacity-40 blur-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-markury-cyan/50 rounded-full opacity-40 blur-2xl -z-10" />

            {/* Hand-drawn accents (subtle, like marker doodles) */}
            <ScribbleCircle
              className="absolute -top-12 right-4 w-32 h-24 opacity-40 rotate-6"
              stroke="#000000"
            />
            <ScribbleArrow
              className="absolute -bottom-14 left-2 w-32 h-20 opacity-40 -rotate-6"
              stroke="#000000"
            />
          </div>
      </div>
    </section>
  )
}
