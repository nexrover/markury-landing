export default function WhyMarkury() {
  const comparisons = [
    {
      aspect: "Design Philosophy",
      markury: "Modern, clean, distraction-free interface",
      others: "Dated UI with cluttered toolbars",
    },
    {
      aspect: "Performance",
      markury: "Lightweight and fast, launches instantly",
      others: "Heavy applications that slow you down",
    },
    {
      aspect: "User Experience",
      markury: "Intuitive — start drawing immediately",
      others: "Steep learning curve, complex menus",
    },
    {
      aspect: "Pricing",
      markury: "One-time $99, yours forever",
      others: "Subscriptions or per-seat licensing",
    },
    {
      aspect: "Toolbar",
      markury: "Floating, customizable, stays out of your way",
      others: "Fixed toolbars that take up screen space",
    },
    {
      aspect: "Shortcuts",
      markury: "Fully customizable global shortcuts",
      others: "Limited or no keyboard support",
    },
  ]

  const highlights = [
    {
      title: "Made for macOS (Windows coming soon)",
      description: "Native app that feels right at home on your Mac. Fast, smooth, and respects your system preferences. Windows support is in active development.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Privacy First",
      description: "No accounts, no analytics, no cloud. Your annotations stay on your machine where they belong.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: "One-Time Purchase",
      description: "Pay once, own it forever. No subscriptions, no hidden fees, no recurring charges.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Instant Updates",
      description: "Always improving. Get new features and improvements as they ship, included in your purchase.",
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
    },
  ]

  return (
    <section className="py-20 sm:py-32 bg-gray-900 text-white">
      <div className="container-narrow">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            Why professionals choose{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              Markury
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
            A modern alternative to outdated annotation tools. Designed for how you work today.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white/5 backdrop-blur rounded-2xl border border-white/10 overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-4 sm:p-6 text-gray-400 font-medium">Feature</th>
                  <th className="text-left p-4 sm:p-6 text-cyan-400 font-semibold">Markury</th>
                  <th className="text-left p-4 sm:p-6 text-gray-500 font-medium">Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className={index < comparisons.length - 1 ? 'border-b border-white/5' : ''}>
                    <td className="p-4 sm:p-6 text-gray-300 font-medium">{row.aspect}</td>
                    <td className="p-4 sm:p-6">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-white">{row.markury}</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-6 text-gray-500">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Highlights Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((highlight, index) => (
            <div key={index} className="text-center sm:text-left">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-cyan-400 mb-4 mx-auto sm:mx-0">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{highlight.title}</h3>
              <p className="text-gray-400 leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
