import { ScribbleCircle } from '@/components/AnnotationAccents'
import LazyMedia from '@/components/LazyMedia'
import { 
  PencilIcon, 
  PaintBoardIcon, 
  ShapesIcon, 
  TextIcon,
  Target01Icon,
  DashboardSquare01Icon,
  Camera01Icon,
  Cursor01Icon,
  ColorPickerIcon,
  KeyboardIcon,
  Layout01Icon,
  UndoIcon
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
          media: "https://ftp.markury.app/features/freehand",
          icon: <PencilIcon className="w-8 h-8" />,
        },
        {
          name: "Highlighter",
          description: "Emphasize text and areas with semi-transparent highlights that keep content readable underneath.",
          media: "https://ftp.markury.app/features/highlight",
          icon: <PaintBoardIcon className="w-8 h-8" />,
        },
        {
          name: "Shape Tools",
          description: "Create clean lines, rectangles, circles, and arrows for professional-looking annotations.",
          media: "https://ftp.markury.app/features/shape",
          icon: <ShapesIcon className="w-8 h-8" />,
        },
        {
          name: "Text Annotations",
          description: "Add typed labels, notes, and callouts anywhere on screen for clear explanations.",
          media: "https://ftp.markury.app/features/text",
          icon: <TextIcon className="w-8 h-8" />,
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
          media: "https://ftp.markury.app/features/laser",
          icon: <Target01Icon className="w-8 h-8" />,
        },
        {
          name: "Whiteboard Mode",
          description: "Transform your screen into a clean canvas with 16 background colors for focused explanations.",
          media: "https://ftp.markury.app/features/whiteboard",
          icon: <DashboardSquare01Icon className="w-8 h-8" />,
        },
        {
          name: "Screenshots",
          description: "Capture your annotated screen instantly. Full screen or region selection, saved to clipboard or folder.",
          media: "https://ftp.markury.app/features/screenshot",
          icon: <Camera01Icon className="w-8 h-8" />,
        },
        {
          name: "Click-Through Mode",
          description: "Switch back to normal cursor instantly. Annotations stay visible while you interact with apps underneath.",
          media: "https://ftp.markury.app/features/cursor",
          icon: <Cursor01Icon className="w-8 h-8" />,
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
          media: "https://ftp.markury.app/features/color",
          icon: <ColorPickerIcon className="w-8 h-8" />,
        },
        {
          name: "Keyboard Shortcuts",
          description: "Fully customizable global shortcuts that work even when Markury isn't in focus.",
          media: "https://ftp.markury.app/features/shortcuts",
          icon: <KeyboardIcon className="w-8 h-8" />,
        },
        {
          name: "Flexible Toolbar",
          description: "Vertical or horizontal layout. Show only the tools you use. Position it anywhere on screen.",
          media: "https://ftp.markury.app/features/toolbar",
          icon: <Layout01Icon className="w-8 h-8" />,
        },
        {
          name: "Undo & Redo",
          description: "Made a mistake? Undo it. Changed your mind? Redo. Clear all with one click when you're done.",
          media: "https://ftp.markury.app/features/undo_redo",
          icon: <UndoIcon className="w-8 h-8" />,
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
            Everything you need <span className="marker-underline marker-underline--purple">in one place</span>
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
                    <LazyMedia
                      className="mb-4 rounded-lg overflow-hidden border border-gray-100 bg-gray-50"
                      rootMargin="200px"
                      placeholderClass="min-h-[200px]"
                      icon={feature.icon}
                    >
                      <img 
                        src={`${feature.media}.gif`} 
                        alt={feature.name} 
                        className="w-full h-auto mix-blend-multiply"
                      />
                    </LazyMedia>
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
