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
          <div className="w-full lg:w-1/3 flex flex-col gap-2">
            {useCases.map((useCase, index) => {
              const isActive = index === activeIndex
              return (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`group flex items-center gap-4 p-4 text-left rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-gray-900 
                    ${isActive 
                      ? 'bg-white shadow-md shadow-gray-200/50 scale-[1.02]' 
                      : 'hover:bg-gray-100/80 hover:scale-[1.01] text-gray-500'
                    }`}
                >
                  <div className={`p-2 rounded-lg transition-colors duration-200 flex-shrink-0 
                    ${isActive ? 'bg-gray-50' : 'bg-transparent group-hover:bg-gray-100'} 
                    ${isActive ? useCase.color : 'text-gray-400 group-hover:text-gray-600'}`}>
                    {useCase.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold text-base transition-colors duration-200 
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
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/10 backdrop-blur-sm border border-white/10 ${useCases[activeIndex].color.replace('text-', 'text-white ')}`}>
                    {useCases[activeIndex].title}
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl font-bold leading-tight tracking-tight">
                    {useCases[activeIndex].headline}
                  </h3>
                  
                  <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                    {useCases[activeIndex].detail}
                  </p>
                  
                  <button className="group inline-flex items-center gap-2 font-semibold text-white hover:text-gray-100 transition-colors">
                    Learn more 
                    <ArrowRight01Icon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Example UI / Visual Placeholder */}
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
