import { ScribbleArrow } from '@/components/AnnotationAccents'
import { 
  Cursor02Icon, 
  LayoutLeftIcon, 
  FlashIcon, 
  VideoReplayIcon,
  Cancel01Icon,
  ArrowRight02Icon
} from 'hugeicons-react'

export default function ProblemSolution() {
  const problems = [
    {
      problem: "Pointing at your screen during calls looks awkward and unclear",
      solution: "Draw directly on screen with precise circles, arrows, and highlights",
      icon: <Cursor02Icon className="w-6 h-6" />,
    },
    {
      problem: "Switching between presentation tools breaks your flow",
      solution: "A floating toolbar that works over any app, always ready when you need it",
      icon: <LayoutLeftIcon className="w-6 h-6" />,
    },
    {
      problem: "Complex annotation tools slow down your explanations",
      solution: "Instant access to simple, beautiful tools — draw, highlight, done",
      icon: <FlashIcon className="w-6 h-6" />,
    },
    {
      problem: "Screen recordings lack visual guidance for viewers",
      solution: "Add live annotations that guide attention exactly where it matters",
      icon: <VideoReplayIcon className="w-6 h-6" />,
    },
  ]

  return (
    <section className="relative overflow-hidden py-20 sm:py-32 bg-gray-50">
      {/* Background accent */}
      <ScribbleArrow
        className="absolute -top-10 right-0 w-[260px] h-[180px] opacity-[0.08] -rotate-12 float-slower"
        stroke="#3b82f6"
      />

      <div className="container-narrow relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            From frustration to{' '}
            <span className="marker-underline marker-underline--cyan">clarity</span>
          </h2>
          <p className="section-subheading">
            We built Markury because visual communication shouldn&apos;t be complicated.
          </p>
        </div>

        {/* Problems & Solutions Grid */}
        <div className="grid gap-6 lg:gap-8">
          {problems.map((item, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="grid md:grid-cols-2 gap-6 items-center">
                {/* Problem */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500">
                    <Cancel01Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">The Problem</div>
                    <p className="text-gray-700 font-medium">{item.problem}</p>
                  </div>
                </div>

                {/* Arrow (hidden on mobile) */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                  <ArrowRight02Icon className="w-8 h-8 text-gray-300" />
                </div>

                {/* Solution */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-500">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-1">Markury Solution</div>
                    <p className="text-gray-700 font-medium">{item.solution}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
