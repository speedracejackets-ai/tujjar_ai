"use client"

import type { DocumentType } from "@/app/flow/page"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const DOCUMENT_TYPES: Array<{
  id: DocumentType
  title: string
  description: string
  icon: string
}> = [
  {
    id: "nda-mutual",
    title: "Mutual NDA",
    description: "Protect information shared between two parties",
    icon: "🤝",
  },
  {
    id: "nda-non-mutual",
    title: "Non-Mutual NDA",
    description: "One-way confidentiality agreement",
    icon: "🔒",
  },
  {
    id: "privacy-policy",
    title: "Privacy Policy",
    description: "Outline how you handle user data",
    icon: "📋",
  },
  {
    id: "terms-of-service",
    title: "Terms of Service",
    description: "Define rules for using your service",
    icon: "⚖️",
  },
  {
    id: "freelance-agreement",
    title: "Freelance Agreement",
    description: "Contract for freelance work arrangements",
    icon: "💼",
  },
  {
    id: "employment-agreement",
    title: "Employment Agreement",
    description: "Define employment terms and conditions",
    icon: "👔",
  },
  {
    id: "partnership-agreement",
    title: "Partnership Agreement",
    description: "Establish partnership terms and obligations",
    icon: "🏢",
  },
]

interface DocumentTypeSelectionProps {
  selected: DocumentType | null
  onSelect: (docType: DocumentType) => void
}

export function DocumentTypeSelection({ selected, onSelect }: DocumentTypeSelectionProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-white">Choose a Legal Document</h1>
        <p className="text-lg text-slate-400">Select the document type you need. We'll guide you through the rest.</p>
      </div>

      {/* Document cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DOCUMENT_TYPES.map((doc) => (
          <Card
            key={doc.id}
            className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
              selected === doc.id
                ? "border-blue-500 bg-slate-700/50"
                : "border-slate-600 hover:border-slate-500 bg-slate-800/50"
            }`}
            onClick={() => onSelect(doc.id)}
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl">{doc.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">{doc.title}</h3>
                <p className="text-sm text-slate-400">{doc.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={() => {
            if (selected) {
              onSelect(selected)
            }
          }}
          disabled={!selected}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold transition-colors"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
