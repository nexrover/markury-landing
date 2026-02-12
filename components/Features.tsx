import { ScribbleCircle } from '@/components/AnnotationAccents'

export default function Features() {
  const featureGroups = [
    {
      title: "Drawing Tools",
      description: "Everything you need to annotate with precision and style",
      features: [
        {
          name: "Freehand Drawing",
          description: "Draw smooth strokes naturally with your mouse or stylus. Perfect for circling, underlining, and sketching.",
          gif: "/features/freehand.gif",
        },
        {
          name: "Highlighter",
          description: "Emphasize text and areas with semi-transparent highlights that keep content readable underneath.",
          gif: "/features/highlight.gif",
        },
        {
          name: "Shape Tools",
          description: "Create clean lines, rectangles, circles, and arrows for professional-looking annotations.",
          gif: "/features/shape.gif",
        },
        {
          name: "Text Annotations",
          description: "Add typed labels, notes, and callouts anywhere on screen for clear explanations.",
          gif: "/features/text.gif",
        },
      ],
    },
    {
      title: "Presentation Features",
      description: "Tools designed for live presentations and screen recordings",
      features: [
        {
          name: "Laser Pointer",
          description: "A virtual laser that follows your cursor with a fading trail. Perfect for guiding attention without leaving marks.",
          gif: "/features/laser.gif",
        },
        {
          name: "Whiteboard Mode",
          description: "Transform your screen into a clean canvas with 16 background colors for focused explanations.",
          gif: "/features/whiteboard.gif",
        },
        {
          name: "Screenshots",
          description: "Capture your annotated screen instantly. Full screen or region selection, saved to clipboard or folder.",
          gif: "/features/screenshot.gif",
        },
        {
          name: "Click-Through Mode",
          description: "Switch back to normal cursor instantly. Annotations stay visible while you interact with apps underneath.",
          gif: "/features/cursor.gif",
        },
      ],
    },
    {
      title: "Customization & Workflow",
      description: "Tailor Markury to fit exactly how you work",
      features: [
        {
          name: "Quick Colors",
          description: "Four customizable color slots accessible with keyboard shortcuts. Switch colors in an instant.",
          gif: "/features/color.gif",
        },
        {
          name: "Keyboard Shortcuts",
          description: "Fully customizable global shortcuts that work even when Markury isn't in focus.",
          gif: "/features/shortcuts.gif",
        },
        {
          name: "Flexible Toolbar",
          description: "Vertical or horizontal layout. Show only the tools you use. Position it anywhere on screen.",
          gif: "/features/toolbar.gif",
        },
        {
          name: "Undo & Redo",
          description: "Made a mistake? Undo it. Changed your mind? Redo. Clear all with one click when you're done.",
          gif: "/features/undo_redo.gif",
        },
      ],
    },
  ]

  return (
    <section id="features" className="relative overflow-hidden py-20 sm:py-32 bg-gray-50">
      {/* Background accent */}
      <ScribbleCircle
        className="absolute -left-10 top-28 w-[280px] h-[200px] opacity-[0.07] rotate-6 float-slower"
        stroke="#C084FC"
      />

      <div className="container-narrow relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Everything you need to{' '}
            <span className="marker-underline marker-underline--purple">
              communicate visually
            </span>
          </h2>
          <p className="section-subheading">
            Professional annotation tools that feel effortless. No learning curve, no clutter.
          </p>
        </div>

        {/* Feature Groups */}
        <div className="space-y-20">
          {featureGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Group Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{group.title}</h3>
                <p className="text-gray-600">{group.description}</p>
              </div>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-8">
                {group.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
                  >
                    {/* @ts-ignore */}
                    <div className="mb-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50">
                      <img 
                        /* @ts-ignore */
                        src={feature.gif} 
                        alt={feature.name} 
                        className="w-full h-auto object-cover mix-blend-multiply"
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.name}</h4>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
