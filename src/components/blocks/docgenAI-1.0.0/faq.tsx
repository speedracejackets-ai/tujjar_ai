"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      q: "Is this legally binding?",
      a: "Yes, documents generated are legally binding when properly executed. However, for complex situations, we recommend having a lawyer review your document.",
    },
    {
      q: "Can I customize documents?",
      a: "All documents are fully editable. You can customize them to match your specific business needs before download.",
    },
    {
      q: "Is this US-specific?",
      a: "Yes, all our templates are created to comply with US federal and state laws. International support is coming soon.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can cancel your subscription at any time with no penalties or hidden fees. Your documents remain accessible forever.",
    },
    {
      q: "How long does generation take?",
      a: "Most documents are generated in under 5 minutes. Once generated, you can download or edit immediately.",
    },
    {
      q: "Are my documents private?",
      a: "Complete privacy is guaranteed. We never store your documents after generation, and they're not shared with anyone.",
    },
  ]

  return (
    <section id="faq" className="py-20 sm:py-32 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-muted-foreground">Everything you need to know</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
              >
                <h3 className="font-semibold text-foreground">{faq.q}</h3>
                <ChevronDown
                  className={`w-5 h-5 text-primary transition-transform ${openIndex === idx ? "rotate-180" : ""}`}
                />
              </button>
              {openIndex === idx && (
                <div className="px-6 pb-6 text-muted-foreground border-t border-border pt-4">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
