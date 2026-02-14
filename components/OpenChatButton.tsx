"use client"
import { Comment01Icon } from 'hugeicons-react'

export default function OpenChatButton() {
  return (
    <button
      onClick={(e) => {
        e.preventDefault()
        // @ts-ignore
        if (window.$crisp) window.$crisp.push(['do', 'chat:open'])
      }}
      className="btn-secondary inline-flex items-center gap-2 w-full sm:w-auto"
    >
      <Comment01Icon className="w-5 h-5" />
      Live Chat
    </button>
  )
}
