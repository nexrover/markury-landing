import { 
  ComputerIcon, 
  SecurityLockIcon, 
  MoneyBag02Icon, 
  RepeatIcon,
  CheckmarkCircle02Icon
} from 'hugeicons-react'

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
      markury: "Intuitive, start drawing immediately",
      others: "Steep learning curve, complex menus",
    },
    {
      aspect: "Pricing",
      markury: "Flexible: Yearly or Lifetime",
      others: "Rigid subscription models",
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
      title: "Supports macOS and Windows",
      description: "Native app for Mac and Windows. Fast, smooth, and respects your system preferences.",
      icon: <ComputerIcon className="w-7 h-7" />,
    },
    {
      title: "Privacy First",
      description: "No accounts, no analytics, no cloud. Your annotations stay on your machine where they belong.",
      icon: <SecurityLockIcon className="w-7 h-7" />,
    },
    {
      title: "Flexible Pricing",
      description: "Choose between a simple yearly plan or pay once for lifetime access. No hidden fees.",
      icon: <MoneyBag02Icon className="w-7 h-7" />,
    },
    {
      title: "Instant Updates",
      description: "Always improving. Get new features and improvements as they ship, included in your purchase.",
      icon: <RepeatIcon className="w-7 h-7" />,
    },
  ]

  return (
    <section className="relative overflow-hidden py-20 sm:py-32 bg-markury-yellow/10">
      {/* Background accent */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 top-16 w-80 h-80 bg-gradient-to-br from-markury-yellow/40 via-markury-orange/30 to-white rounded-full blur-3xl opacity-80 float-slower" />
      </div>

      <div className="container-narrow relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-gray-900">
            Why professionals choose{' '}
            <span className="marker-underline marker-underline--cyan">Markury</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            A modern alternative to outdated annotation tools. Designed for how you work today.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-markury-yellow/30 shadow-sm overflow-hidden mb-16">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-markury-yellow/10">
                  <th className="text-left p-4 sm:p-6 text-gray-500 font-medium text-sm uppercase tracking-wide">Feature</th>
                  <th className="text-left p-4 sm:p-6 text-gray-900 font-semibold">Markury</th>
                  <th className="text-left p-4 sm:p-6 text-gray-500 font-medium">Others</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className={index < comparisons.length - 1 ? 'border-b border-gray-100' : ''}>
                    <td className="p-4 sm:p-6 text-gray-700 font-medium">{row.aspect}</td>
                    <td className="p-4 sm:p-6">
                      <div className="flex items-center gap-2">
                        <CheckmarkCircle02Icon className="w-5 h-5 text-markury-lime flex-shrink-0" />
                        <span className="text-gray-900">{row.markury}</span>
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
              <div className="w-14 h-14 bg-markury-yellow/20 rounded-2xl flex items-center justify-center text-gray-800 mb-4 mx-auto sm:mx-0">
                {highlight.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{highlight.title}</h3>
              <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
