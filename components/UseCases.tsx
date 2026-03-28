"use client"

import { useState, useEffect, useRef } from 'react'
import { 
  BookOpen01Icon, 
  PresentationBarChart01Icon, 
  Image01Icon, 
  UserGroupIcon, 
  VideoReplayIcon, 
  SourceCodeIcon,
  PlayIcon,
  Analytics02Icon,
} from 'hugeicons-react'

/**
 * Lazily loaded use-case media. Only loads when:
 * 1. The section is near the viewport (IntersectionObserver)
 * 2. The tab is or has been active (preloads on first activation)
 */
function UseCaseMedia({ mediaSrc, alt, isActive }: { mediaSrc: string; alt: string; isActive: boolean }) {
  const [hasBeenActive, setHasBeenActive] = useState(false)

  useEffect(() => {
    if (isActive && !hasBeenActive) {
      setHasBeenActive(true)
    }
  }, [isActive, hasBeenActive])

  if (!hasBeenActive) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-800/50">
        <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <PlayIcon className="w-6 h-6 text-white ml-1" />
        </div>
      </div>
    )
  }

  return (
    <img 
      src={`${mediaSrc}.gif`} 
      alt={alt}
      className="w-full h-full object-contain"
    />
  )
}

function UseCaseImage({ mediaSrc, alt }: { mediaSrc: string; alt: string }) {
  return (
    <img 
      src={`${mediaSrc}.gif`} 
      alt={alt}
      className="w-full h-full object-contain"
    />
  )
}

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)
  const [sectionVisible, setSectionVisible] = useState(false)

  // Only start loading media when section is near viewport
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    if (typeof IntersectionObserver === 'undefined') {
      setSectionVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true)
          observer.disconnect()
        }
      },
      { rootMargin: '300px' }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const useCases = [
    {
      title: "Teachers & Educators",
      description: "Make online lessons engaging.",
      detail: "Annotate slides, highlight key concepts, and use whiteboard mode for spontaneous explanations during live classes.",
      headline: "How to make online lessons engaging",
      icon: <BookOpen01Icon className="w-6 h-6" />,
      color: "text-markury-cyan",
      bg: "bg-markury-cyan",
      gradient: "from-markury-cyan/20 to-blue-500/20",
      media: "https://ftp.markury.app/use-cases/teacher",
    },
    {
      title: "Presenters & Speakers",
      description: "Keep your audience focused.",
      detail: "Use the laser pointer for live demos and draw attention to key points without disrupting your flow.",
      headline: "How to keep your audience focused",
      icon: <PresentationBarChart01Icon className="w-6 h-6" />,
      color: "text-markury-purple",
      bg: "bg-markury-purple",
      gradient: "from-markury-purple/20 to-indigo-500/20",
      media: "https://ftp.markury.app/use-cases/presenter",
    },
    {
      title: "Traders & Analysts",
      description: "Explain trading ideas clearly.",
      detail: "Annotate charts, highlight key levels, and explain trade setups visually, perfect for sharing insights, training, or client reports.",
      headline: "How to explain trading ideas clearly",
      icon: <Analytics02Icon className="w-6 h-6" />,
      color: "text-markury-orange",
      bg: "bg-markury-orange",
      gradient: "from-markury-orange/20 to-amber-500/20",
      media: "https://ftp.markury.app/use-cases/trader",
    },
    {
      title: "Designers & Reviewers",
      description: "Give precise visual feedback.",
      detail: "Circle issues, add notes, and capture annotated screenshots for documentation to streamline reviews.",
      headline: "How to give precise visual feedback",
      icon: <Image01Icon className="w-6 h-6" />,
      color: "text-markury-pink",
      bg: "bg-markury-pink",
      gradient: "from-markury-pink/20 to-rose-500/20",
      media: "https://ftp.markury.app/use-cases/designer",
    },
    {
      title: "Remote Teams",
      description: "Bridge the gap in collaboration.",
      detail: "Point out details during video calls, sketch ideas over shared screens, and provide clear visual feedback instantly.",
      headline: "How to bridge the gap in collaboration",
      icon: <UserGroupIcon className="w-6 h-6" />,
      color: "text-markury-lime",
      bg: "bg-markury-lime",
      gradient: "from-markury-lime/20 to-green-500/20",
      media: "https://ftp.markury.app/use-cases/remote",
    },
    {
      title: "Content Creators",
      description: "Level up your tutorials.",
      detail: "Add live annotations during recording to guide viewers step-by-step with visual clarity and professional polish.",
      headline: "How to level up your tutorials",
      icon: <VideoReplayIcon className="w-6 h-6" />,
      color: "text-markury-orange",
      bg: "bg-markury-orange",
      gradient: "from-markury-orange/20 to-amber-500/20",
      media: "https://ftp.markury.app/use-cases/creator",
    },
    {
      title: "Developers",
      description: "Explain code visually.",
      detail: "Highlight specific lines, annotate architecture diagrams, and document bugs with clarity during code reviews.",
      headline: "How to explain code visually",
      icon: <SourceCodeIcon className="w-6 h-6" />,
      color: "text-markury-cyan",
      bg: "bg-markury-cyan",
      gradient: "from-cyan-400/20 to-teal-500/20",
      media: "https://ftp.markury.app/use-cases/developer",
    },
  ]

  return (
    <section ref={sectionRef} id="use-cases" className="relative py-24 sm:py-32 bg-white">
      <div className="container-narrow relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
          <h2 className="section-heading mb-4">
            Built for people who <span className="text-highlight text-highlight--cyan text-highlight--soft">explain things</span>
          </h2>
          <p className="section-subheading max-w-2xl mx-auto">
            Whether you&apos;re teaching a classroom, leading a meeting, or recording a tutorial, Markury helps you communicate with clarity.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Sidebar Navigation */}
          {/* Mobile: Horizontal scroll, Desktop: Vertical list */}
          <div className="w-full lg:w-1/3 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-3 lg:gap-2 pb-4 lg:pb-0 snap-x scrollbar-hide -mx-4 px-4 lg:mx-0 lg:px-0">
            {useCases.map((useCase, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex-shrink-0 lg:w-full snap-center flex items-center justify-center lg:justify-start gap-2 lg:gap-3 py-2 px-4 lg:p-3 text-left rounded-full lg:rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gray-900 border lg:border-transparent whitespace-nowrap
                    ${isActive 
                      ? 'bg-gray-900 text-white shadow-md lg:bg-white lg:text-gray-900 lg:shadow-gray-200/50 border-transparent' 
                      : 'bg-white text-gray-600 border-gray-200 lg:bg-transparent lg:border-transparent hover:bg-gray-50 lg:hover:bg-gray-100/80 lg:text-gray-500'
                    }`}
                >
                  <div className={`p-1.5 lg:p-2 rounded-lg transition-colors duration-200 flex-shrink-0 hidden lg:block
                    ${isActive ? 'bg-gray-50' : 'bg-transparent group-hover:bg-gray-100'} 
                    ${isActive ? useCase.color : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm transition-colors duration-200 
                      ${isActive ? 'text-inherit' : 'text-gray-600 group-hover:text-gray-900'}`}>{useCase.title}</h3>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-2/3">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gray-900 text-white shadow-xl h-full min-h-[400px] sm:min-h-[480px] transition-all duration-500 ease-in-out">
              
              {/* Dynamic Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCases[activeIndex].gradient} opacity-20 transition-opacity duration-500`} />
              
              {/* Content Content */}
              <div className="relative h-full flex flex-col justify-between p-6 sm:p-12 z-10">
                
                <div className="space-y-4 sm:space-y-6 max-w-lg">
                  <div className="lg:hidden w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm border border-white/10 text-white">
                    {useCases[activeIndex].icon}
                  </div>

                  <h3 className="text-2xl sm:text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                    {useCases[activeIndex].headline}
                  </h3>
                  
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    {useCases[activeIndex].detail}
                  </p>
                </div>

                {/* Media Area - Only loads when section is visible AND tab is/was active */}
                <div className="mt-8 sm:mt-12 relative w-full aspect-video rounded-xl bg-gray-900 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                  {sectionVisible ? (
                    <UseCaseMedia
                      mediaSrc={useCases[activeIndex].media}
                      alt={useCases[activeIndex].title}
                      isActive={true}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-800/50 animate-pulse" />
                  )}
                </div>
              </div>
              
              {/* Corner decorative blob */}
              <div className={`absolute -bottom-24 -right-24 w-64 h-64 rounded-full blur-3xl opacity-40 ${useCases[activeIndex].bg}`} />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
