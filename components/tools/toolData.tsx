export type ToolItem = {
  href: string
  title: string
  description: string
  icon: React.ReactNode
}

function WorksheetIcon() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="30" y="10" width="60" height="80" rx="6" fill="#FACC15" fillOpacity="0.18" stroke="#FACC15" strokeWidth="1.5" />
      <rect x="40" y="22" width="28" height="3" rx="1.5" fill="#FACC15" />
      <rect x="40" y="30" width="40" height="2" rx="1" fill="#D1D5DB" />
      <rect x="40" y="36" width="40" height="2" rx="1" fill="#D1D5DB" />
      <circle cx="42" cy="48" r="3" fill="#FACC15" />
      <rect x="48" y="46.5" width="28" height="3" rx="1.5" fill="#6B7280" />
      <circle cx="42" cy="58" r="3" fill="#FACC15" />
      <rect x="48" y="56.5" width="28" height="3" rx="1.5" fill="#6B7280" />
      <circle cx="42" cy="68" r="3" fill="#FACC15" />
      <rect x="48" y="66.5" width="28" height="3" rx="1.5" fill="#6B7280" />
      <rect x="40" y="76" width="18" height="6" rx="3" fill="#FACC15" fillOpacity="0.5" />
    </svg>
  )
}

function QuizIcon() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="28" y="10" width="64" height="80" rx="6" fill="#22D3EE" fillOpacity="0.12" stroke="#22D3EE" strokeWidth="1.5" />
      <circle cx="48" cy="32" r="8" fill="#22D3EE" fillOpacity="0.25" />
      <path d="M46 30l3 4 7-10" stroke="#22D3EE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="44" y="46" width="44" height="6" rx="3" fill="#22D3EE" fillOpacity="0.35" />
      <rect x="36" y="58" width="52" height="2" rx="1" fill="#D1D5DB" />
      <rect x="36" y="64" width="40" height="2" rx="1" fill="#D1D5DB" />
      <rect x="36" y="74" width="52" height="3" rx="1.5" fill="#22D3EE" fillOpacity="0.35" />
    </svg>
  )
}

function LessonPlanIcon() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="25" y="12" width="70" height="76" rx="6" fill="#22D3EE" fillOpacity="0.12" stroke="#22D3EE" strokeWidth="1.5" />
      <rect x="35" y="24" width="30" height="3" rx="1.5" fill="#22D3EE" />
      <rect x="35" y="33" width="50" height="2" rx="1" fill="#D1D5DB" />
      <rect x="35" y="39" width="50" height="2" rx="1" fill="#D1D5DB" />
      <rect x="35" y="49" width="22" height="3" rx="1.5" fill="#22D3EE" />
      <rect x="35" y="56" width="50" height="2" rx="1" fill="#D1D5DB" />
      <rect x="35" y="62" width="50" height="2" rx="1" fill="#D1D5DB" />
      <rect x="35" y="72" width="22" height="3" rx="1.5" fill="#22D3EE" />
      <rect x="35" y="79" width="36" height="2" rx="1" fill="#D1D5DB" />
    </svg>
  )
}

function RubricIcon() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="20" y="14" width="80" height="72" rx="6" fill="#C084FC" fillOpacity="0.12" stroke="#C084FC" strokeWidth="1.5" />
      <line x1="20" y1="32" x2="100" y2="32" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="20" y1="50" x2="100" y2="50" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="20" y1="68" x2="100" y2="68" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="48" y1="14" x2="48" y2="86" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
      <line x1="74" y1="14" x2="74" y2="86" stroke="#C084FC" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="26" y="20" width="16" height="3" rx="1.5" fill="#C084FC" />
      <rect x="54" y="20" width="12" height="3" rx="1.5" fill="#D1D5DB" />
      <rect x="80" y="20" width="12" height="3" rx="1.5" fill="#D1D5DB" />
      <rect x="26" y="38" width="16" height="3" rx="1.5" fill="#C084FC" />
      <rect x="54" y="38" width="12" height="3" rx="1.5" fill="#D1D5DB" />
      <rect x="80" y="38" width="12" height="3" rx="1.5" fill="#D1D5DB" />
      <rect x="26" y="56" width="16" height="3" rx="1.5" fill="#C084FC" />
      <rect x="54" y="56" width="12" height="3" rx="1.5" fill="#D1D5DB" />
      <rect x="80" y="56" width="12" height="3" rx="1.5" fill="#D1D5DB" />
      <rect x="26" y="74" width="16" height="3" rx="1.5" fill="#C084FC" />
      <rect x="54" y="74" width="12" height="3" rx="1.5" fill="#D1D5DB" />
      <rect x="80" y="74" width="12" height="3" rx="1.5" fill="#D1D5DB" />
    </svg>
  )
}

function FlashcardsIcon() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="32" y="20" width="56" height="60" rx="6" fill="#E5E7EB" fillOpacity="0.6" />
      <rect x="26" y="14" width="56" height="60" rx="6" fill="#FB923C" fillOpacity="0.15" stroke="#FB923C" strokeWidth="1.5" />
      <text x="54" y="38" textAnchor="middle" fill="#FB923C" fontSize="14" fontWeight="700">Q</text>
      <rect x="36" y="46" width="36" height="2" rx="1" fill="#D1D5DB" />
      <rect x="36" y="52" width="28" height="2" rx="1" fill="#D1D5DB" />
      <rect x="36" y="60" width="16" height="5" rx="2.5" fill="#FB923C" fillOpacity="0.4" />
    </svg>
  )
}

function ExamPaperIcon() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="30" y="8" width="60" height="84" rx="6" fill="#FB7185" fillOpacity="0.12" stroke="#FB7185" strokeWidth="1.5" />
      <rect x="42" y="18" width="36" height="4" rx="2" fill="#FB7185" />
      <rect x="40" y="28" width="40" height="2" rx="1" fill="#D1D5DB" />
      <rect x="40" y="34" width="40" height="2" rx="1" fill="#D1D5DB" />
      <rect x="40" y="44" width="20" height="3" rx="1.5" fill="#FB7185" fillOpacity="0.6" />
      <rect x="40" y="51" width="40" height="2" rx="1" fill="#D1D5DB" />
      <rect x="40" y="57" width="40" height="2" rx="1" fill="#D1D5DB" />
      <rect x="40" y="67" width="20" height="3" rx="1.5" fill="#FB7185" fillOpacity="0.6" />
      <rect x="40" y="74" width="40" height="2" rx="1" fill="#D1D5DB" />
      <rect x="40" y="80" width="40" height="2" rx="1" fill="#D1D5DB" />
    </svg>
  )
}

function CertificateIcon() {
  return (
    <svg viewBox="0 0 120 100" fill="none" className="w-full h-full">
      <rect x="20" y="10" width="80" height="62" rx="6" fill="#34D399" fillOpacity="0.12" stroke="#34D399" strokeWidth="1.5" />
      <rect x="36" y="22" width="48" height="3" rx="1.5" fill="#34D399" />
      <rect x="40" y="30" width="40" height="2" rx="1" fill="#D1D5DB" />
      <rect x="32" y="38" width="56" height="3" rx="1.5" fill="#6B7280" />
      <rect x="40" y="46" width="40" height="2" rx="1" fill="#D1D5DB" />
      <rect x="40" y="52" width="40" height="2" rx="1" fill="#D1D5DB" />
      <line x1="34" y1="62" x2="54" y2="62" stroke="#34D399" strokeWidth="1" />
      <line x1="66" y1="62" x2="86" y2="62" stroke="#34D399" strokeWidth="1" />
      <circle cx="60" cy="84" r="12" fill="#34D399" fillOpacity="0.18" stroke="#34D399" strokeWidth="1.5" />
      <text x="60" y="89" textAnchor="middle" fill="#34D399" fontSize="12" fontWeight="700">★</text>
    </svg>
  )
}

export const TOOLS: ToolItem[] = [
  {
    href: '/tools/worksheet-generator',
    title: 'Worksheet Generator',
    description:
      'Generate grade-appropriate worksheets with multiple-choice questions and short-answer prompts, plus a correct answer key for quick marking. Great for homework, practice sets, and quick class checks.',
    icon: <WorksheetIcon />,
  },
  {
    href: '/tools/quiz-generator',
    title: 'Quiz Generator',
    description:
      'Generate MCQs with options A–D and a built-in answer key. Perfect for classroom quizzes, revision warm-ups, and timed practice for Students in Classes 5–12.',
    icon: <QuizIcon />,
  },
  {
    href: '/tools/lesson-plan-generator',
    title: 'Lesson Plan Generator',
    description:
      'Create a structured lesson plan with learning objectives, activities, assessment ideas, and homework in one click. Ideal for daily lesson prep.',
    icon: <LessonPlanIcon />,
  },
  {
    href: '/tools/rubric-generator',
    title: 'Rubric Generator',
    description:
      'Build clear grading rubrics with criteria and performance levels for essays, projects, and presentations. Helps students understand expectations upfront.',
    icon: <RubricIcon />,
  },
  {
    href: '/tools/flashcards-generator',
    title: 'Flashcards Generator',
    description:
      'Turn any topic into a stack of Q&A flashcards for quick revision, spaced repetition, or in-class quiz rounds. Great for memorizing key facts.',
    icon: <FlashcardsIcon />,
  },
  {
    href: '/tools/exam-paper-builder',
    title: 'Exam Paper Builder',
    description:
      'Generate a balanced exam paper with multiple sections, marks distribution, and an answer key. Save hours of formatting and focus on question quality.',
    icon: <ExamPaperIcon />,
  },
  {
    href: '/tools/certificate-generator',
    title: 'Certificate Generator',
    description:
      'Design professional certificates with drag-and-drop editing, pre-designed templates, custom text, colors, and backgrounds. Export as high-quality PDF or PNG.',
    icon: <CertificateIcon />,
  },
]

export function titleToToolSlug(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export function getToolByHref(href: string) {
  return TOOLS.find((tool) => tool.href === href)
}

