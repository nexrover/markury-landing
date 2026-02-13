"use client"

import { useState } from 'react'
import { 
  BookOpen01Icon, 
  PresentationBarChart01Icon, 
  Image01Icon, 
  UserGroupIcon, 
  VideoReplayIcon, 
  SourceCodeIcon,
  PlayIcon,
  ArrowRight01Icon
} from 'hugeicons-react'

export default function UseCases() {
  const [activeIndex, setActiveIndex] = useState(0)

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
      image: "/use-cases/teacher.gif",
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
      image: "/use-cases/presenter.gif",
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
      image: "/use-cases/designer.gif",
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
      image: "/use-cases/remote.gif",
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
      image: "/use-cases/creator.gif",
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
      image: "/use-cases/developer.gif",
    },
  ]

  return (
    <section id="use-cases" className="relative py-24 sm:py-32 bg-gray-50/50">
      <div className="container-narrow relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 px-4">
          <h2 className="section-heading mb-6 text-4xl tracking-tight text-gray-900">
            Built for people who explain things
          </h2>
          <p className="text-lg text-gray-600">
            Whether you're teaching a classroom, leading a meeting, or recording a tutorial, Markury helps you communicate with clarity.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          
          {/* Sidebar Navigation */}
          <div className="w-full lg:w-1/3 flex lg:flex-col overflow-x-auto lg:overflow-visible gap-2 lg:gap-2 pb-4 lg:pb-0 snap-x">
            {useCases.map((useCase, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex-shrink-0 lg:w-full snap-center flex items-center justify-center lg:justify-start gap-2 lg:gap-3 py-1.5 px-4 lg:p-3 text-left rounded-lg lg:rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gray-900 
                    ${isActive 
                      ? 'bg-white shadow-md shadow-gray-200/50' 
                      : 'bg-white/50 lg:bg-transparent hover:bg-gray-100/80 text-gray-500'
                    }`}
                >
                  <div className={`p-1.5 lg:p-2 rounded-lg transition-colors duration-200 flex-shrink-0 
                    ${isActive ? 'bg-gray-50' : 'bg-transparent group-hover:bg-gray-100'} 
                    ${isActive ? useCase.color : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-xs lg:text-sm transition-colors duration-200 
                      ${isActive ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>{useCase.title}</h3>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Content Area */}
          <div className="w-full lg:w-2/3">
            <div className="relative overflow-hidden rounded-3xl bg-gray-900 text-white shadow-xl h-full min-h-[480px] transition-all duration-500 ease-in-out">
              
              {/* Dynamic Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${useCases[activeIndex].gradient} opacity-20 transition-opacity duration-500`} />
              
              {/* Content Content */}
              <div className="relative h-full flex flex-col justify-between p-8 sm:p-12 z-10">
                
                <div className="space-y-6 max-w-lg">
                  {/* Title removed */}
                  
                  <h3 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                    {useCases[activeIndex].headline}
                  </h3>
                  
                  <p className="text-lg text-gray-300 leading-relaxed">
                    {useCases[activeIndex].detail}
                  </p>
                  
                  {/* Button removed */}
                </div>

                {/* Example UI / Visual Placeholder */}
                {/* @ts-ignore */}
                {useCases[activeIndex].image ? (
                  <div className="mt-12 relative w-full aspect-video rounded-xl bg-gray-900 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center">
                    <img 
                      /* @ts-ignore */
                      src={useCases[activeIndex].image} 
                      alt={useCases[activeIndex].title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="mt-12 relative w-full aspect-video rounded-xl bg-gray-800/50 border border-white/10 overflow-hidden shadow-2xl flex items-center justify-center group cursor-pointer hover:bg-gray-800/70 transition-colors">
                     <div className={`absolute inset-0 bg-gradient-to-br ${useCases[activeIndex].gradient} opacity-10`} />
                     
                     {/* Play Button */}
                     <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <PlayIcon className="w-6 h-6 text-white ml-1" />
                     </div>

                     {/* Decorative elements representing 'UI' */}
                     <div className="absolute top-4 left-4 right-4 h-2 bg-white/5 rounded-full" />
                     <div className="absolute top-8 left-4 w-1/3 h-2 bg-white/5 rounded-full" />
                     <div className="absolute bottom-4 right-4 w-1/4 h-2 bg-white/5 rounded-full" />
                  </div>
                )}
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
