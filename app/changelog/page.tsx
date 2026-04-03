import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Changelog - Markury',
  description: 'See what\'s new in Markury. Latest updates, bug fixes, and improvements.',
  alternates: {
    canonical: '/changelog',
  },
  openGraph: {
    title: 'Changelog - Markury',
    description: 'See what\'s new in Markury. Latest updates, bug fixes, and improvements.',
    url: 'https://www.markury.app/changelog',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Changelog - Markury',
    description: 'See what\'s new in Markury. Latest updates, bug fixes, and improvements.',
  },
}

/* ── Changelog data ─────────────────────────────────────── */
interface ChangelogEntry {
  version: string
  date: string
  tag?: 'latest' | 'major'
  sections: {
    type: 'fix' | 'feature' | 'improvement' | 'breaking'
    items: string[]
  }[]
}

const changelog: ChangelogEntry[] = [
  {
    version: '1.0.1',
    date: 'April 2, 2026',
    tag: 'latest',
    sections: [
      {
        type: 'fix',
        items: [
          'Fixed keyboard shortcuts for ellipse and laser tools.',
          'Fixed issue where the settings window spanned across multiple screens due to incorrect centering.'
        ],
      },
    ],
  },
  {
    version: '1.0.0',
    date: 'February 14, 2026',
    tag: 'major',
    sections: [
      {
        type: 'feature',
        items: [
          'Initial public release of Markury.',
          'Pen, highlighter, arrow, line, rectangle, circle, ellipse, and text annotation tools.',
          'Laser pointer for live presentations.',
          'Multi-monitor support with flexible display selection.',
          'Customizable keyboard shortcuts for every tool.',
          'Undo/redo and one-click clear canvas.',
          'Available on Windows and macOS.',
        ],
      },
    ],
  },
]

/* ── Badge colors per section type ──────────────────────── */
const sectionMeta: Record<
  string,
  { label: string; bg: string; text: string; dot: string }
> = {
  fix: {
    label: 'Bug Fix',
    bg: 'bg-rose-50',
    text: 'text-rose-700',
    dot: 'bg-rose-400',
  },
  feature: {
    label: 'New Feature',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    dot: 'bg-emerald-400',
  },
  improvement: {
    label: 'Improvement',
    bg: 'bg-sky-50',
    text: 'text-sky-700',
    dot: 'bg-sky-400',
  },
  breaking: {
    label: 'Breaking Change',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    dot: 'bg-amber-400',
  },
}

export default function ChangelogPage() {
  return (
    <>
      <Header />
      <main className="bg-white text-gray-900 pt-32 sm:pt-36">
        <section className="py-16 md:py-24 border-b border-gray-100">
          <div className="container-narrow max-w-3xl">
            {/* Page header */}
            <div className="mb-14">
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Changelog
              </h1>
              <p className="text-gray-600 max-w-2xl">
                All notable changes to Markury are documented here. We release
                updates regularly to improve stability, fix bugs, and add new
                features.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical timeline line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gray-200" />

              <div className="space-y-14">
                {changelog.map((entry) => (
                  <article key={entry.version} className="relative pl-8">
                    {/* Timeline dot */}
                    <span className="absolute left-0 top-[6px] h-[15px] w-[15px] rounded-full border-[3px] border-white bg-gray-900 ring-2 ring-gray-200" />

                    {/* Version header */}
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <h2 className="text-xl font-bold tracking-tight">
                        v{entry.version}
                      </h2>
                      {entry.tag === 'latest' && (
                        <span className="inline-flex items-center rounded-full bg-markury-lime/20 px-2.5 py-0.5 text-xs font-semibold text-green-800 ring-1 ring-inset ring-markury-lime/40">
                          Latest
                        </span>
                      )}
                      {entry.tag === 'major' && (
                        <span className="inline-flex items-center rounded-full bg-markury-purple/15 px-2.5 py-0.5 text-xs font-semibold text-purple-800 ring-1 ring-inset ring-markury-purple/30">
                          Major
                        </span>
                      )}
                      <span className="text-sm text-gray-400">
                        {entry.date}
                      </span>
                    </div>

                    {/* Sections (fix / feature / …) */}
                    <div className="space-y-5">
                      {entry.sections.map((section, sIdx) => {
                        const meta = sectionMeta[section.type]
                        return (
                          <div key={sIdx}>
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-xs font-medium ${meta.bg} ${meta.text} mb-3`}
                            >
                              <span
                                className={`h-1.5 w-1.5 rounded-full ${meta.dot}`}
                              />
                              {meta.label}
                            </span>

                            <ul className="space-y-2 text-sm md:text-base text-gray-700 leading-relaxed">
                              {section.items.map((item, iIdx) => (
                                <li
                                  key={iIdx}
                                  className="relative pl-5 before:content-[''] before:absolute before:left-0 before:top-[9px] before:h-1.5 before:w-1.5 before:rounded-full before:bg-gray-300"
                                >
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
