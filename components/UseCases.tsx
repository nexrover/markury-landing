import { 
  BookOpen01Icon, 
  PresentationBarChart01Icon, 
  Image01Icon, 
  UserGroupIcon, 
  VideoReplayIcon, 
  SourceCodeIcon,
  CheckmarkCircle02Icon
} from 'hugeicons-react'

export default function UseCases() {
  const useCases = [
    {
      title: "Teachers & Educators",
      description: "Make online lessons engaging and crystal clear. Annotate slides, highlight key concepts, and use whiteboard mode for spontaneous explanations.",
      examples: ["Annotate slides during live lessons", "Highlight key concepts in documents", "Record tutorials with visual guidance"],
      icon: <BookOpen01Icon className="w-8 h-8" />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Presenters & Speakers",
      description: "Keep your audience focused exactly where you want them. Use the laser pointer for live demos and draw attention to key points without disrupting your flow.",
      examples: ["Draw attention to specific points", "Use laser pointer for live demos", "Keep presentations engaging"],
      icon: <PresentationBarChart01Icon className="w-8 h-8" />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Designers & Reviewers",
      description: "Give precise visual feedback on designs and mockups. Circle issues, add notes, and capture annotated screenshots for documentation.",
      examples: ["Mark up designs and mockups", "Annotate bug reports visually", "Sketch UI ideas quickly"],
      icon: <Image01Icon className="w-8 h-8" />,
      color: "bg-pink-50 text-pink-600",
    },
    {
      title: "Remote Teams",
      description: "Bridge the gap in virtual collaboration. Point out details during video calls, sketch ideas over shared screens, and provide clear visual feedback.",
      examples: ["Annotate shared screens", "Point out details during calls", "Provide visual feedback"],
      icon: <UserGroupIcon className="w-8 h-8" />,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Content Creators",
      description: "Level up your tutorials and how-to videos. Add live annotations during recording to guide viewers step-by-step with visual clarity.",
      examples: ["Record tutorials with annotations", "Highlight steps in how-to videos", "Add visual emphasis to recordings"],
      icon: <VideoReplayIcon className="w-8 h-8" />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Developers",
      description: "Explain code visually during reviews and pair programming. Highlight specific lines, annotate architecture diagrams, and document bugs with clarity.",
      examples: ["Highlight code during reviews", "Annotate architecture diagrams", "Document bugs visually"],
      icon: <SourceCodeIcon className="w-8 h-8" />,
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
                    <CheckmarkCircle02Icon className="w-4 h-4 text-green-500 flex-shrink-0" />
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
