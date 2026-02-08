import Image from 'next/image'
import { ScribbleArrow } from '@/components/AnnotationAccents'

const testimonials = [
  {
    name: 'Sarah Chen',
    designation: 'High School Math Teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=128&h=128&fit=crop',
    problem: 'During remote lessons I kept saying "look here, no — here" while waving my mouse. Students got confused and I lost their attention.',
    solution: 'With Markury I draw circles and arrows right on the screen. Everyone sees exactly what I mean, and class time actually feels productive.',
  },
  {
    name: 'Marcus Webb',
    designation: 'Product Lead, Tech Startup',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&h=128&fit=crop',
    problem: 'I was constantly switching between my deck, Figma, and a separate annotation tool. It broke my flow and made demos feel clunky.',
    solution: "Markury's toolbar floats over everything. I annotate the live product or our designs without leaving the app. One tool, no context switching.",
  },
  {
    name: 'Priya Sharma',
    designation: 'YouTube Creator, Tutorials',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=128&h=128&fit=crop',
    problem: 'Viewers kept asking "which button?" or "where do I click?" My recordings lacked clear visual guidance.',
    solution: 'I record with Markury now — I highlight steps and circle the exact button as I go. Comments like "so easy to follow" have gone way up.',
  },
  {
    name: 'James Okonkwo',
    designation: 'Senior Developer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=128&h=128&fit=crop',
    problem: 'Code review feedback was either vague or buried in long comments. Pointing at the right line in a call was tedious.',
    solution: 'I draw on the screen during pair sessions and paste annotated screenshots into PRs. Fast and simple — no learning curve, just clarity.',
  },
]

export default function ProblemSolution() {
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
            Real people, real problems — and how Markury helps them communicate visually without the hassle.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {testimonials.map((person, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex gap-4 sm:gap-5">
                <div className="flex-shrink-0">
                  <Image
                    src={person.avatar}
                    alt={person.name}
                    width={64}
                    height={64}
                    className="rounded-full object-cover w-14 h-14 sm:w-16 sm:h-16 ring-2 ring-gray-100"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-gray-700 leading-relaxed mb-5">
                    <span className="text-red-600 font-medium">&ldquo;{person.problem}&rdquo;</span>
                    <span className="text-gray-500"> … </span>
                    <span className="text-green-700 font-medium">&ldquo;{person.solution}&rdquo;</span>
                  </p>
                  <div>
                    <p className="font-semibold text-gray-900">{person.name}</p>
                    <p className="text-sm text-gray-500">{person.designation}</p>
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
