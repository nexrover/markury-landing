"use client"

function formatLine(line: string, index: number) {
  const trimmed = line.trim()
  if (!trimmed) return null

  const isSectionHeading =
    /^(Section\s+[A-Z0-9]+|SECTION\s+[A-Z0-9]+)/i.test(trimmed) ||
    /^(Part\s+[A-Z0-9]+|PART\s+[A-Z0-9]+)/i.test(trimmed)

  const isMajorHeading =
    /^#{1,3}\s/.test(trimmed) ||
    /^(Lesson Plan|Objective|Objectives|Learning Objectives|Materials|Duration|Introduction|Warm[- ]?Up|Main Activity|Activities|Activity|Practice|Assessment|Closure|Wrap[- ]?Up|Homework|Extensions?|Differentiation|Reflection|Summary|Conclusion|Answer Key|Answers|Instructions|Time|Notes?|Resources|Standards|Prerequisites|Vocabulary|Key ?(Concepts|Terms|Points|Vocabulary)|Teaching Strategy|Procedure|Evaluation|General Instructions|Total Marks|Subject|Grade|Time Allowed)(\s*:|\s*$)/i.test(trimmed)

  const isSubHeading =
    /^(Q\d+|Question\s+\d+|\d+[\.\)]\s)/i.test(trimmed) ||
    /^(Answer|Ans|Correct Answer|Marks?)\s*:/i.test(trimmed)

  const isAnswer = /^(Answer|Ans|Correct Answer)\s*:/i.test(trimmed)
  const isMarks = /^(Marks?)\s*:/i.test(trimmed)

  if (isSectionHeading) {
    return (
      <div key={index} className="mt-6 mb-3 pb-2 border-b border-gray-200">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">{trimmed.replace(/^#+\s*/, '')}</h3>
      </div>
    )
  }

  if (isMajorHeading) {
    return (
      <div key={index} className="mt-5 mb-2">
        <h4 className="text-sm sm:text-base font-bold text-gray-900">{trimmed.replace(/^#+\s*/, '')}</h4>
      </div>
    )
  }

  if (isAnswer) {
    return (
      <p key={index} className="text-sm text-green-700 font-semibold mt-1 ml-4">
        {trimmed}
      </p>
    )
  }

  if (isMarks) {
    return (
      <p key={index} className="text-xs text-gray-500 font-medium mt-0.5 ml-4">
        {trimmed}
      </p>
    )
  }

  if (isSubHeading) {
    return (
      <p key={index} className="text-sm sm:text-base text-gray-900 font-medium mt-3">
        {trimmed}
      </p>
    )
  }

  if (/^[-•]\s/.test(trimmed)) {
    return (
      <li key={index} className="text-sm sm:text-base text-gray-700 ml-4 list-disc list-inside">
        {trimmed.replace(/^[-•]\s*/, '')}
      </li>
    )
  }

  if (/^[A-D][\.\)]\s/.test(trimmed)) {
    return (
      <p key={index} className="text-sm text-gray-700 ml-6 mt-0.5">
        {trimmed}
      </p>
    )
  }

  return (
    <p key={index} className="text-sm sm:text-base text-gray-700 mt-1">
      {trimmed}
    </p>
  )
}

export default function FormattedTextOutput({ text }: { text: string }) {
  const lines = text.replace(/\r/g, '').split('\n')

  return <div className="space-y-0.5">{lines.map((line, i) => formatLine(line, i))}</div>
}
