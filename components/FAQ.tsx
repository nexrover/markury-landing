"use client"

import { useState } from 'react'
import { ArrowDown01Icon, HelpCircleIcon } from 'hugeicons-react'

export default function FAQ() {
  const faqs = [
    {
      question: "Is Markury a subscription?",
      answer: "We offer flexible pricing to suit your needs. You can choose a standard yearly subscription or pay once for a lifetime license. Both plans include all features and future updates."
    },
    {
      question: "Does it work on both macOS and Windows?",
      answer: "Yes! Markury is a native application optimized for both macOS (12.0+) and Windows (10+). It feels right at home on either operating system."
    },
    {
      question: "Can I use Markury while screen recording or sharing?",
      answer: "Absolutely. Markury draws directly on your screen overlay, so your annotations are visible to any screen recording tool (like OBS, Loom, QuickTime) and video conferencing apps (Zoom, Teams, Google Meet)."
    },
    {
      question: "Do I need an internet connection?",
      answer: "You only need an internet connection once to activate your license key. After that, Markury works 100% offline. We respect your privacy and don't send any data to the cloud."
    },
    {
      question: "Can I install it on multiple computers?",
      answer: "Yes, 1 license covers 2 devices that you own (e.g., a desktop and a laptop)."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer a no-questions-asked 30-day money-back guarantee. If Markury doesn't improve your workflow, simply email us at info@markury.app for a full refund."
    }
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="py-20 sm:py-32 bg-white">
      <div className="container-narrow">
        <div className="text-center mb-16">
          <h2 className="section-heading mb-4">
            Frequently asked questions
          </h2>
          <p className="section-subheading">
            Everything you need to know about Markury.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-100">
          {faqs.map((faq, index) => (
            <div key={index} className="py-2">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between py-6 text-left focus:outline-none group"
              >
                <span className={`text-lg font-semibold transition-colors duration-200 ${openIndex === index ? 'text-gray-900' : 'text-gray-600 group-hover:text-gray-900'}`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 ml-6 transition-transform duration-200 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <ArrowDown01Icon className={`w-5 h-5 ${openIndex === index ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`} />
                </span>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-48 opacity-100 mb-6' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 leading-relaxed pr-12">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Still have questions?{' '}
            <a href="mailto:info@markury.app" className="font-semibold text-markury-cyan hover:underline decoration-2 underline-offset-2">
              Chat with us
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
