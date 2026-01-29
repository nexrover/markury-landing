export default function UseCases() {
  const useCases = [
    {
      title: "Teachers & Educators",
      description: "Make online lessons engaging and crystal clear. Annotate slides, highlight key concepts, and use whiteboard mode for spontaneous explanations.",
      examples: ["Annotate slides during live lessons", "Highlight key concepts in documents", "Record tutorials with visual guidance"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Presenters & Speakers",
      description: "Keep your audience focused exactly where you want them. Use the laser pointer for live demos and draw attention to key points without disrupting your flow.",
      examples: ["Draw attention to specific points", "Use laser pointer for live demos", "Keep presentations engaging"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
        </svg>
      ),
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Designers & Reviewers",
      description: "Give precise visual feedback on designs and mockups. Circle issues, add notes, and capture annotated screenshots for documentation.",
      examples: ["Mark up designs and mockups", "Annotate bug reports visually", "Sketch UI ideas quickly"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-pink-50 text-pink-600",
    },
    {
      title: "Remote Teams",
      description: "Bridge the gap in virtual collaboration. Point out details during video calls, sketch ideas over shared screens, and provide clear visual feedback.",
      examples: ["Annotate shared screens", "Point out details during calls", "Provide visual feedback"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Content Creators",
      description: "Level up your tutorials and how-to videos. Add live annotations during recording to guide viewers step-by-step with visual clarity.",
      examples: ["Record tutorials with annotations", "Highlight steps in how-to videos", "Add visual emphasis to recordings"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      ),
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Developers",
      description: "Explain code visually during reviews and pair programming. Highlight specific lines, annotate architecture diagrams, and document bugs with clarity.",
      examples: ["Highlight code during reviews", "Annotate architecture diagrams", "Document bugs visually"],
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      color: "bg-cyan-50 text-cyan-600",
    },
  ]

  return (
    <section id="use-cases" className="relative overflow-hidden py-20 sm:py-32">
      {/* Background accent */}
      <div className="pointer-events-none absolute -z-10 inset-0">
        <div className="absolute -right-16 top-24 w-72 h-72 bg-gradient-to-br from-orange-200 to-red-200 rounded-full blur-3xl opacity-25 float-slow" />
      </div>

      <div className="container-narrow relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Built for people who{' '}
            <span className="marker-underline marker-underline--soft">
              explain things
            </span>
          </h2>
          <p className="section-subheading">
            Whether you&apos;re teaching a classroom, leading a meeting, or recording a tutorial — Markury helps you communicate with clarity.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              {/* Icon */}
              <div className={`w-14 h-14 ${useCase.color} rounded-2xl flex items-center justify-center mb-5`}>
                {useCase.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{useCase.title}</h3>

              {/* Description */}
              <p className="text-gray-600 mb-4 leading-relaxed">{useCase.description}</p>

              {/* Examples */}
              <ul className="space-y-2">
                {useCase.examples.map((example, exIndex) => (
                  <li key={exIndex} className="flex items-center gap-2 text-sm text-gray-500">
                    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
