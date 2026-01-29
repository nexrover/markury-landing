import { ScribbleArrow } from '@/components/AnnotationAccents'

export default function ProblemSolution() {
  const problems = [
    {
      problem: "Pointing at your screen during calls looks awkward and unclear",
      solution: "Draw directly on screen with precise circles, arrows, and highlights",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
        </svg>
      ),
    },
    {
      problem: "Switching between presentation tools breaks your flow",
      solution: "A floating toolbar that works over any app, always ready when you need it",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
    },
    {
      problem: "Complex annotation tools slow down your explanations",
      solution: "Instant access to simple, beautiful tools — draw, highlight, done",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      problem: "Screen recordings lack visual guidance for viewers",
      solution: "Add live annotations that guide attention exactly where it matters",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
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
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">The Problem</div>
                    <p className="text-gray-700 font-medium">{item.problem}</p>
                  </div>
                </div>

                {/* Arrow (hidden on mobile) */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2">
                  <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
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
