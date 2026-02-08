import { ScribbleCircle } from '@/components/AnnotationAccents'
import { 
  PencilEdit02Icon, 
  HighlighterIcon, 
  LayoutLeftIcon,
  Edit02Icon,
  Cursor02Icon,
  PresentationBarChart01Icon,
  Camera01Icon,
  MouseScroll01Icon,
  PaintBucketIcon,
  Settings02Icon,
  DashboardSquare01Icon,
  ArrowTurnBackwardIcon
} from 'hugeicons-react'

export default function Features() {
  const featureGroups = [
    {
      title: "Drawing Tools",
      description: "Everything you need to annotate with precision and style",
      features: [
        {
          name: "Freehand Drawing",
          description: "Draw smooth strokes naturally with your mouse or stylus. Perfect for circling, underlining, and sketching.",
          icon: <PencilEdit02Icon className="w-6 h-6" />,
        },
        {
          name: "Highlighter",
          description: "Emphasize text and areas with semi-transparent highlights that keep content readable underneath.",
          icon: <HighlighterIcon className="w-6 h-6" />,
        },
        {
          name: "Shape Tools",
          description: "Create clean lines, rectangles, circles, and arrows for professional-looking annotations.",
          icon: <LayoutLeftIcon className="w-6 h-6" />,
        },
        {
          name: "Text Annotations",
          description: "Add typed labels, notes, and callouts anywhere on screen for clear explanations.",
          icon: <Edit02Icon className="w-6 h-6" />,
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
          icon: <Cursor02Icon className="w-6 h-6" />,
        },
        {
          name: "Whiteboard Mode",
          description: "Transform your screen into a clean canvas with 16 background colors for focused explanations.",
          icon: <PresentationBarChart01Icon className="w-6 h-6" />,
        },
        {
          name: "Screenshots",
          description: "Capture your annotated screen instantly. Full screen or region selection, saved to clipboard or folder.",
          icon: <Camera01Icon className="w-6 h-6" />,
        },
        {
          name: "Click-Through Mode",
          description: "Switch back to normal cursor instantly. Annotations stay visible while you interact with apps underneath.",
          icon: <MouseScroll01Icon className="w-6 h-6" />,
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
          icon: <PaintBucketIcon className="w-6 h-6" />,
        },
        {
          name: "Keyboard Shortcuts",
          description: "Fully customizable global shortcuts that work even when Markury isn't in focus.",
          icon: <Settings02Icon className="w-6 h-6" />,
        },
        {
          name: "Flexible Toolbar",
          description: "Vertical or horizontal layout. Show only the tools you use. Position it anywhere on screen.",
          icon: <DashboardSquare01Icon className="w-6 h-6" />,
        },
        {
          name: "Undo & Redo",
          description: "Made a mistake? Undo it. Changed your mind? Redo. Clear all with one click when you're done.",
          icon: <ArrowTurnBackwardIcon className="w-6 h-6" />,
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
              <div className="grid sm:grid-cols-2 gap-6">
                {group.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100 group"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 mb-4 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                      {feature.icon}
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
