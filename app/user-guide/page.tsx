import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function UserGuidePage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-20 sm:pt-24">
        <div className="container-narrow py-12 md:py-16">
          {/* Header */}
          <div className="mb-12">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Markury User Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Complete documentation for getting the most out of Markury. Learn how to annotate, present, and communicate visually.
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Table of Contents Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <nav className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <h2 className="font-semibold text-gray-900 mb-4">Table of Contents</h2>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#getting-started" className="text-gray-600 hover:text-gray-900 transition-colors">Getting Started</a></li>
                    <li><a href="#floating-toolbar" className="text-gray-600 hover:text-gray-900 transition-colors">The Floating Toolbar</a></li>
                    <li><a href="#drawing-tools" className="text-gray-600 hover:text-gray-900 transition-colors">Drawing Tools</a></li>
                    <li><a href="#colors-stroke" className="text-gray-600 hover:text-gray-900 transition-colors">Colors & Stroke Width</a></li>
                    <li><a href="#shape-tools" className="text-gray-600 hover:text-gray-900 transition-colors">Shape Tools</a></li>
                    <li><a href="#text-annotations" className="text-gray-600 hover:text-gray-900 transition-colors">Text Annotations</a></li>
                    <li><a href="#laser-pointer" className="text-gray-600 hover:text-gray-900 transition-colors">Laser Pointer</a></li>
                    <li><a href="#whiteboard-mode" className="text-gray-600 hover:text-gray-900 transition-colors">Whiteboard Mode</a></li>
                    <li><a href="#screenshots" className="text-gray-600 hover:text-gray-900 transition-colors">Screenshots</a></li>
                    <li><a href="#undo-redo" className="text-gray-600 hover:text-gray-900 transition-colors">Undo, Redo & Clear</a></li>
                    <li><a href="#keyboard-shortcuts" className="text-gray-600 hover:text-gray-900 transition-colors">Keyboard Shortcuts</a></li>
                    <li><a href="#settings" className="text-gray-600 hover:text-gray-900 transition-colors">Settings & Customization</a></li>
                    <li><a href="#system-tray" className="text-gray-600 hover:text-gray-900 transition-colors">System Tray</a></li>
                    <li><a href="#use-cases" className="text-gray-600 hover:text-gray-900 transition-colors">Use Cases</a></li>
                    <li><a href="#tips" className="text-gray-600 hover:text-gray-900 transition-colors">Tips & Best Practices</a></li>
                    <li><a href="#troubleshooting" className="text-gray-600 hover:text-gray-900 transition-colors">Troubleshooting</a></li>
                  </ul>
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                
                {/* Getting Started */}
                <section id="getting-started" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Getting Started</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    When you launch Markury, a <strong>floating toolbar</strong> appears on your screen. This toolbar is your control center for all annotation features.
                  </p>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">First Steps</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                    <li><strong>Move the toolbar</strong> — Click and drag the app icon (pen icon) to reposition the toolbar anywhere on screen.</li>
                    <li><strong>Start drawing</strong> — Click the pencil icon to activate freehand drawing, then draw directly on your screen.</li>
                    <li><strong>Switch back</strong> — Click the cursor icon to return to normal mode where you can click through to other apps.</li>
                  </ol>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
                    <h4 className="font-semibold text-blue-900 mb-2">Quick Tips</h4>
                    <ul className="list-disc list-inside space-y-1 text-blue-800">
                      <li>The toolbar stays on top of all other windows</li>
                      <li>When you&apos;re not drawing, clicks pass through to the apps underneath</li>
                      <li>Your toolbar position is remembered between sessions</li>
                    </ul>
                  </div>
                </section>

                {/* Floating Toolbar */}
                <section id="floating-toolbar" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">The Floating Toolbar</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    The toolbar is your main interface for all Markury features.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Toolbar Basics</h3>
                  <div className="overflow-x-auto mb-6">
                    <table className="min-w-full border-collapse border border-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Action</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">How to Do It</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Move toolbar</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Drag the pen icon at the start of the toolbar</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Collapse/Expand</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Click the pen icon to toggle</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Find toolbar</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Use the system tray menu if you lose it</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Toolbar Orientation</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Switch between <strong>vertical</strong> and <strong>horizontal</strong> layouts to fit your workflow:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li><strong>Vertical</strong> — Takes up less horizontal space, great for side placement</li>
                    <li><strong>Horizontal</strong> — Compact height, ideal for top or bottom of screen</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Drawing Mode Indicator</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    When drawing mode is active, the toolbar shows a <strong>cyan border glow</strong> so you always know when your clicks will draw instead of passing through.
                  </p>
                </section>

                {/* Drawing Tools */}
                <section id="drawing-tools" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Drawing Tools</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Cursor Tool</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Return to normal mode</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Clicks pass through to underlying apps</li>
                        <li>Use this when you&apos;re done annotating</li>
                        <li>Drawings remain visible but you can interact with other windows</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Freehand Drawing</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Draw freely with your mouse or stylus</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Click and drag to draw smooth strokes</li>
                        <li>Strokes are automatically smoothed for a natural look</li>
                        <li>Great for circling items, underlining text, or free-form sketching</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Highlighter</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Emphasize content with semi-transparent highlights</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Works like a real highlighter marker</li>
                        <li>Semi-transparent so text underneath remains readable</li>
                        <li>Automatically uses a wider stroke for easy highlighting</li>
                        <li>Perfect for marking important text or areas</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Eraser</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Remove unwanted strokes</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Click and drag over any drawing to erase it</li>
                        <li>Erases any stroke it touches</li>
                        <li>Also removes text annotations</li>
                        <li>Use to clean up mistakes or clear specific areas</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Colors & Stroke Width */}
                <section id="colors-stroke" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Colors & Stroke Width</h2>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Choosing Colors</h3>
                  <div className="space-y-4 mb-6">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Color Palette</strong> — Click the color dots in the toolbar to open the color picker. Choose from 30+ colors organized in an easy-to-use grid.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Quick Colors</strong> — Four customizable color slots for your most-used colors. Access them instantly from the toolbar or with keyboard shortcuts (⌘1, ⌘2, ⌘3, ⌘4).
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Default Color</strong> — Set your preferred starting color in Settings. Markury will use this color when you launch the app.
                    </p>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Stroke Width</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Adjust how thick your lines are:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-4">
                    <li><strong>Thin strokes</strong> — Great for detailed annotations and writing</li>
                    <li><strong>Medium strokes</strong> — Good all-purpose thickness</li>
                    <li><strong>Thick strokes</strong> — Bold, highly visible marks</li>
                  </ul>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Click the stroke width button (shows &quot;3 px&quot; or similar) to see available options:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 mb-6">
                    <li>1 px — Fine detail</li>
                    <li>3 px — Standard drawing</li>
                    <li>5 px — Medium emphasis</li>
                    <li>10 px — Bold marks</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    You can also use keyboard shortcuts to quickly adjust thickness.
                  </p>
                </section>

                {/* Shape Tools */}
                <section id="shape-tools" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Shape Tools</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Create precise geometric shapes for professional-looking annotations.
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Line Tool</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Draw perfectly straight lines</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                        <li>Click where you want the line to start</li>
                        <li>Drag to where you want it to end</li>
                        <li>Release to place the line</li>
                      </ul>
                      <p className="text-gray-600 italic">Great for: Connecting items, pointing to specific areas, creating dividers</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Rectangle Tool</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Draw rectangular boxes</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                        <li>Click to set one corner</li>
                        <li>Drag to the opposite corner</li>
                        <li>Release to complete the rectangle</li>
                      </ul>
                      <p className="text-gray-600 italic">Great for: Highlighting areas, creating boxes around content, framing elements</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Circle Tool</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Draw perfect circles and ovals</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                        <li>Click to set the starting point</li>
                        <li>Drag to define the size</li>
                        <li>Release to complete the shape</li>
                      </ul>
                      <p className="text-gray-600 italic">Great for: Circling important items, creating bullet points, emphasizing specific spots</p>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Arrow Tool</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Draw arrows that point to things</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 mb-2">
                        <li>Click where you want the arrow to start</li>
                        <li>Drag toward what you want to point at</li>
                        <li>Release to place the arrow with its arrowhead</li>
                      </ul>
                      <p className="text-gray-600 italic">Great for: Directing attention, showing flow, indicating specific elements</p>
                    </div>
                  </div>
                </section>

                {/* Text Annotations */}
                <section id="text-annotations" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Text Annotations</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Add typed text anywhere on your screen.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">How to Add Text</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                    <li>Select the <strong>Text tool</strong> from the toolbar</li>
                    <li>Click anywhere on screen where you want to add text</li>
                    <li>A text input box appears — type your message</li>
                    <li>Press <strong>Enter</strong> to confirm, or <strong>Escape</strong> to cancel</li>
                    <li>The text appears at your chosen location</li>
                  </ol>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Text Features</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Text uses your current selected color</li>
                    <li>Text size is based on your stroke width setting</li>
                    <li>Text can be erased just like drawn strokes</li>
                    <li>Position text precisely by clicking exactly where you want it</li>
                  </ul>
                  <p className="text-gray-600 italic">Great for: Labels, explanations, callouts, step numbers, notes</p>
                </section>

                {/* Laser Pointer */}
                <section id="laser-pointer" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Laser Pointer</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    A virtual laser pointer for presentations — perfect for drawing attention without leaving permanent marks.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">How It Works</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                    <li>Select the <strong>Laser Pointer</strong> tool</li>
                    <li>Move your mouse to point at things</li>
                    <li>A bright trail follows your cursor</li>
                    <li>The trail <strong>fades away automatically</strong> after about 1.5 seconds</li>
                  </ol>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">When to Use It</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li><strong>Live presentations</strong> — Point at items while talking</li>
                    <li><strong>Screen recordings</strong> — Guide viewers&apos; attention</li>
                    <li><strong>Teaching</strong> — Highlight what you&apos;re explaining without cluttering the screen</li>
                    <li><strong>Demonstrations</strong> — Show where to click or look</li>
                  </ul>
                  <p className="text-gray-700 leading-relaxed">
                    The laser pointer leaves no permanent marks, so your screen stays clean.
                  </p>
                </section>

                {/* Whiteboard Mode */}
                <section id="whiteboard-mode" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Whiteboard Mode</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Transform your entire screen into a drawing canvas with a solid background.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Activating Whiteboard Mode</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                    <li>Click the <strong>Whiteboard</strong> button in the toolbar (presentation icon)</li>
                    <li>Your screen fills with a solid color background</li>
                    <li>Draw freely on the clean canvas</li>
                    <li>Click the button again to return to normal overlay mode</li>
                  </ol>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Whiteboard Colors</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Choose from 16 background colors:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li><strong>Light backgrounds</strong> — White, cream, light gray (great for general use)</li>
                    <li><strong>Colored backgrounds</strong> — Soft blue, green, pink, yellow (for variety)</li>
                    <li><strong>Dark backgrounds</strong> — Charcoal, dark blue, black (for light-colored drawings)</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">When to Use Whiteboard Mode</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Brainstorming</strong> — Sketch ideas on a clean canvas</li>
                    <li><strong>Teaching</strong> — Explain concepts without distracting backgrounds</li>
                    <li><strong>Presentations</strong> — Create a focused drawing space</li>
                    <li><strong>Quick diagrams</strong> — Map out ideas visually</li>
                  </ul>
                </section>

                {/* Screenshots */}
                <section id="screenshots" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Screenshots</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Capture your screen with or without your annotations.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Full Screen Screenshot</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Capture everything visible on your screen:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                    <li>Click the <strong>Screenshot</strong> button in the toolbar (camera icon)</li>
                    <li>The entire screen is captured instantly</li>
                    <li>Depending on your settings, the image is either:
                      <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                        <li><strong>Copied to clipboard</strong> — Paste anywhere with ⌘V</li>
                        <li><strong>Saved to a folder</strong> — Find it in your designated location</li>
                      </ul>
                    </li>
                  </ol>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Region Screenshot</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Capture just a specific area:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                    <li>Click the <strong>Region Screenshot</strong> option</li>
                    <li>Click and drag to select the area you want to capture</li>
                    <li>Release to capture that region</li>
                    <li>The selected area is saved or copied based on your settings</li>
                  </ol>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Screenshot Settings</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Configure how screenshots are handled:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li><strong>Clipboard mode</strong> — Screenshots are copied to your clipboard for quick pasting</li>
                    <li><strong>Folder mode</strong> — Screenshots are saved as files to a location you choose</li>
                    <li><strong>Default location</strong> — ~/Downloads folder</li>
                  </ul>
                  <p className="text-gray-700 mt-4 leading-relaxed">
                    Screenshots are automatically named with the date and time for easy organization.
                  </p>
                </section>

                {/* Undo, Redo & Clear */}
                <section id="undo-redo" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Undo, Redo & Clear</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Undo</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Take back your last action</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Click the <strong>Undo</strong> button (curved arrow pointing left)</li>
                        <li>Or use the keyboard shortcut</li>
                        <li>Reverses your most recent stroke, shape, or text</li>
                        <li>Keep clicking to undo multiple actions</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Redo</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Bring back something you undid</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Click the <strong>Redo</strong> button (curved arrow pointing right)</li>
                        <li>Or use the keyboard shortcut</li>
                        <li>Restores actions you&apos;ve undone</li>
                        <li>Only available after using Undo</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">Clear All</h3>
                      <p className="text-gray-700 mb-2 leading-relaxed"><strong>Remove all drawings at once</strong></p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Click the <strong>Clear</strong> button (trash icon)</li>
                        <li>All strokes, shapes, and text are removed</li>
                        <li>Use when you want a fresh start</li>
                        <li>This action can be undone</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Keyboard Shortcuts */}
                <section id="keyboard-shortcuts" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Keyboard Shortcuts</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Work faster with customizable keyboard shortcuts.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Default Shortcuts</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Markury comes with sensible default shortcuts, and you can customize all of them in Settings.
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Toggle drawing mode</li>
                    <li>Switch between tools</li>
                    <li>Undo / Redo</li>
                    <li>Take screenshots</li>
                    <li>Adjust stroke width</li>
                    <li>Switch to quick colors (⌘1 through ⌘4)</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Customizing Shortcuts</h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                    <li>Open <strong>Settings</strong> from the toolbar</li>
                    <li>Go to the <strong>Shortcuts</strong> tab</li>
                    <li>Click on any shortcut to record a new key combination</li>
                    <li>Press your desired keys (e.g., ⌘+Shift+D)</li>
                    <li>The new shortcut is saved automatically</li>
                  </ol>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Shortcut Tips</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>Shortcuts work globally — they work even when Markury isn&apos;t focused</li>
                    <li>Tooltips show shortcuts — hover over toolbar buttons to see their shortcuts</li>
                    <li>Avoid conflicts — Markury will warn you if a shortcut is already in use</li>
                  </ul>
                </section>

                {/* Settings & Customization */}
                <section id="settings" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Settings & Customization</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Access Settings by clicking the <strong>gear icon</strong> in the toolbar.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">General Settings</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Theme</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li><strong>Light</strong> — Bright toolbar appearance</li>
                        <li><strong>Dark</strong> — Dark toolbar appearance</li>
                        <li><strong>Auto</strong> — Matches your system setting</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Toolbar Orientation</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li><strong>Vertical</strong> — Toolbar arranged top-to-bottom</li>
                        <li><strong>Horizontal</strong> — Toolbar arranged left-to-right</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Screenshot Storage</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li><strong>Clipboard</strong> — Copy screenshots for pasting</li>
                        <li><strong>Folder</strong> — Save screenshots to a specific location</li>
                        <li><strong>Browse</strong> — Choose your save folder</li>
                      </ul>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Tools Settings</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Customize which tools appear in your toolbar:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li>Toggle individual tools on/off</li>
                    <li>Hide tools you don&apos;t use to simplify your toolbar</li>
                    <li>Changes take effect immediately</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Colors Settings</h3>
                  <div className="space-y-4 mb-6">
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Default Color</p>
                      <p className="text-gray-700 leading-relaxed">Set the color Markury uses when you first launch. Click to expand color picker, choose your color.</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 mb-1">Quick Palette</p>
                      <p className="text-gray-700 leading-relaxed">Customize your 4 quick-access colors. Click a slot, then choose a color from the picker. Access with ⌘1, ⌘2, ⌘3, ⌘4.</p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Shortcuts Settings</h3>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>View all available shortcuts</li>
                    <li>Click any shortcut to record a new key combination</li>
                    <li>Clear shortcuts you don&apos;t want</li>
                  </ul>
                </section>

                {/* System Tray */}
                <section id="system-tray" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">System Tray</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Markury adds an icon to your system tray (menu bar on Mac) for quick access.
                  </p>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Tray Menu Options</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Right-click (or click) the tray icon to see:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gray-700 mb-6">
                    <li><strong>Expand/Collapse Toolbar</strong> — Show or hide the toolbar</li>
                    <li><strong>Horizontal/Vertical</strong> — Switch toolbar orientation</li>
                    <li><strong>Find Toolbar</strong> — Locate toolbar with a pulsing glow effect</li>
                    <li><strong>Quit</strong> — Close Markury</li>
                  </ul>

                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 mt-8">Finding a Lost Toolbar</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    If you can&apos;t see your toolbar:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>Click the Markury icon in the system tray</li>
                    <li>Select <strong>Find Toolbar</strong></li>
                    <li>The toolbar will pulse with a bright glow so you can spot it</li>
                    <li>Drag it to a more convenient location</li>
                  </ol>
                </section>

                {/* Use Cases */}
                <section id="use-cases" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Use Cases</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">For Teachers & Educators</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Annotate slides during live lessons</li>
                        <li>Highlight key concepts in documents</li>
                        <li>Use whiteboard mode for explanations</li>
                        <li>Record annotated tutorials</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">For Presenters</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Draw attention to specific points</li>
                        <li>Use laser pointer for live demos</li>
                        <li>Annotate any application in real-time</li>
                        <li>Keep presentations engaging</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">For Content Creators</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Create annotated screenshots</li>
                        <li>Record tutorials with on-screen drawings</li>
                        <li>Highlight steps in how-to videos</li>
                        <li>Add visual emphasis to recordings</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">For Remote Collaboration</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Annotate shared screens</li>
                        <li>Point out details during video calls</li>
                        <li>Sketch ideas over documents</li>
                        <li>Provide visual feedback</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">For Developers & Designers</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700">
                        <li>Mark up designs and mockups</li>
                        <li>Annotate bug reports with screenshots</li>
                        <li>Sketch UI ideas quickly</li>
                        <li>Highlight code during reviews</li>
                      </ul>
                    </div>
                  </div>
                </section>

                {/* Tips & Best Practices */}
                <section id="tips" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Tips & Best Practices</h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Keep Your Toolbar Accessible</h3>
                      <p className="text-gray-700 leading-relaxed">Position your toolbar where it won&apos;t block important content but is always within reach.</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Use Keyboard Shortcuts</h3>
                      <p className="text-gray-700 leading-relaxed">Learn the shortcuts for your most-used tools to speed up your workflow.</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Customize Your Quick Colors</h3>
                      <p className="text-gray-700 leading-relaxed">Set up your four quick colors for the tasks you do most often.</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Use the Right Tool for the Job</h3>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                        <li><strong>Freehand</strong> for informal marks and circling</li>
                        <li><strong>Shapes</strong> for clean, professional annotations</li>
                        <li><strong>Highlighter</strong> for text emphasis</li>
                        <li><strong>Laser pointer</strong> for presentations</li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Clear Regularly</h3>
                      <p className="text-gray-700 leading-relaxed">Don&apos;t let annotations pile up — clear when you&apos;re done with a topic.</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Screenshots Strategically</h3>
                      <p className="text-gray-700 leading-relaxed">Use clipboard mode for quick sharing, folder mode for documentation.</p>
                    </div>
                  </div>
                </section>

                {/* Troubleshooting */}
                <section id="troubleshooting" className="mb-16 scroll-mt-24">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Troubleshooting</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Toolbar Disappeared</h3>
                      <p className="text-gray-700 leading-relaxed">Use the system tray menu → &quot;Find Toolbar&quot; to locate it with a visual pulse.</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Can&apos;t Draw on Screen</h3>
                      <p className="text-gray-700 leading-relaxed">Make sure you&apos;ve selected a drawing tool (not the cursor). Check that drawing mode is active (cyan border on toolbar).</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Screenshots Not Working</h3>
                      <p className="text-gray-700 leading-relaxed">Markury needs Screen Recording permission. Go to System Preferences → Privacy & Security → Screen Recording and ensure Markury is enabled.</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Shortcuts Not Working</h3>
                      <p className="text-gray-700 leading-relaxed">Markury needs Accessibility permission for global shortcuts. Go to System Preferences → Privacy & Security → Accessibility and ensure Markury is enabled.</p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Drawings Not Visible</h3>
                      <p className="text-gray-700 leading-relaxed">Click the visibility toggle to ensure drawings are shown, not hidden.</p>
                    </div>
                  </div>
                </section>

                {/* Summary */}
                <section className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Summary</h2>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    Markury puts powerful screen annotation tools at your fingertips:
                  </p>
                  <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                          <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">What It Does</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Freehand</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Draw freely on screen</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Highlighter</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Emphasize with transparent marks</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Shapes</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Add lines, rectangles, circles, arrows</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Text</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Type annotations anywhere</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Laser Pointer</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Point without permanent marks</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Whiteboard</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Clean canvas for focused drawing</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Screenshots</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Capture your annotated screen</td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Shortcuts</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Work faster with keyboard commands</td>
                        </tr>
                        <tr>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700"><strong>Customization</strong></td>
                          <td className="border border-gray-300 px-4 py-3 text-gray-700">Tailor the toolbar to your needs</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p className="text-gray-700 mt-6 leading-relaxed">
                    Whether you&apos;re teaching, presenting, or creating content — Markury helps you communicate visually with ease.
                  </p>
                </section>

              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
