import { ScribbleStroke } from '@/components/AnnotationAccents'
import { 
  PlayCircleIcon, 
  Cursor02Icon,
  PencilIcon,
  ShapeCollectionIcon
} from 'hugeicons-react'

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Launch Markury",
      description: "A sleek floating toolbar appears on your screen, ready to use over any application.",
      icon: <PlayCircleIcon className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "Pick your tool",
      description: "Choose from freehand drawing, highlighter, shapes, text, or laser pointer, whatever fits your need.",
      icon: <ShapeCollectionIcon className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Annotate anything",
      description: "Draw directly on your screen to highlight, circle, underline, or point at exactly what matters.",
      icon: <PencilIcon className="w-8 h-8" />,
    },
    {
      number: "04",
      title: "Continue working",
      description: "Switch back to cursor mode instantly. Your annotations stay visible while you interact with your apps.",
      icon: <Cursor02Icon className="w-8 h-8" />,
    },
  ]

  return (
    <section id="how-it-works" className="relative overflow-hidden py-20 sm:py-32">
      {/* Background accent */}
      <ScribbleStroke
        className="absolute left-1/2 -translate-x-1/2 top-10 w-[520px] h-[120px] opacity-60 float-slow"
        stroke="#FACC15"
      />

      <div className="container-narrow relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            How Markury works
          </h2>
          <p className="section-subheading">
            Simple enough to start using immediately. Powerful enough for professionals.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line (hidden on mobile, visible between items) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-px bg-gradient-to-r from-gray-200 to-transparent z-0" style={{ width: 'calc(100% - 3rem)' }} />
              )}
              
              <div className="relative z-10">
                {/* Step number */}
                <div className="text-6xl font-bold text-gray-100 mb-4">{step.number}</div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-gray-900 rounded-2xl flex items-center justify-center text-white mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <a href="#pricing" className="btn-primary">
            Start annotating today
            
          </a>
        </div>
      </div>
    </section>
  )
}
