"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { DocumentType } from "@/app/flow/page"
import { MonetizationModal } from "./monetization-modal"

interface DocumentPreviewProps {
  documentType: DocumentType
  country: string
  onBack: () => void
}

const DOCUMENT_CONTENT: Record<DocumentType, { title: string; sections: Array<{ heading: string; content: string }> }> =
  {
    "nda-mutual": {
      title: "Mutual Non-Disclosure Agreement",
      sections: [
        {
          heading: "1. CONFIDENTIAL INFORMATION",
          content:
            "Each party agrees to keep confidential all non-public information disclosed by the other party, including but not limited to technical data, business plans, financial information, and trade secrets.",
        },
        {
          heading: "2. OBLIGATIONS",
          content:
            "The receiving party agrees to protect the confidential information using the same degree of care it uses to protect its own confidential information, but in no case less than reasonable care.",
        },
        {
          heading: "3. TERM",
          content:
            "This agreement shall commence on the date of execution and continue for the period specified in the agreement unless terminated earlier by mutual written consent.",
        },
      ],
    },
    "nda-non-mutual": {
      title: "Non-Mutual Non-Disclosure Agreement",
      sections: [
        {
          heading: "1. CONFIDENTIAL INFORMATION",
          content:
            "The Disclosing Party may disclose confidential information to the Receiving Party under the terms and conditions set forth in this Agreement.",
        },
        {
          heading: "2. PROTECTION OBLIGATIONS",
          content:
            "The Receiving Party shall protect all confidential information disclosed hereunder from unauthorized use or disclosure.",
        },
        {
          heading: "3. PERMITTED DISCLOSURES",
          content:
            "The Receiving Party may disclose the Confidential Information only to its employees, contractors, and advisors who have a legitimate need to know.",
        },
      ],
    },
    "privacy-policy": {
      title: "Privacy Policy",
      sections: [
        {
          heading: "1. INFORMATION WE COLLECT",
          content:
            "We collect personal information that you provide directly to us, such as when you create an account.",
        },
        {
          heading: "2. HOW WE USE YOUR INFORMATION",
          content:
            "We use the information we collect to provide, maintain, and improve our services, comply with legal obligations, and communicate with you.",
        },
        {
          heading: "3. DATA RETENTION",
          content:
            "We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy.",
        },
      ],
    },
    "terms-of-service": {
      title: "Terms of Service",
      sections: [
        {
          heading: "1. ACCEPTANCE OF TERMS",
          content:
            "By accessing and using this service, you accept and agree to be bound by the terms and provision of this agreement.",
        },
        {
          heading: "2. USE LICENSE",
          content:
            "Permission is granted to temporarily download one copy of the materials (information or software) on our service for personal, non-commercial transitory viewing only.",
        },
        {
          heading: "3. DISCLAIMER OF WARRANTIES",
          content:
            "The materials on our service are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties.",
        },
      ],
    },
    "freelance-agreement": {
      title: "Freelance Services Agreement",
      sections: [
        {
          heading: "1. SCOPE OF WORK",
          content:
            "The Freelancer agrees to provide the services described in this Agreement on the terms and conditions set forth herein.",
        },
        {
          heading: "2. COMPENSATION",
          content:
            "The Client agrees to pay the Freelancer the compensation specified in this Agreement upon completion of the work or according to the payment schedule outlined.",
        },
        {
          heading: "3. INTELLECTUAL PROPERTY",
          content:
            "Upon receipt of full payment, all work product, including but not limited to documents, code, and designs, shall become the property of the Client.",
        },
      ],
    },
    "employment-agreement": {
      title: "Employment Agreement",
      sections: [
        {
          heading: "1. POSITION AND DUTIES",
          content:
            "The Employee will be employed in the position described in this Agreement and shall perform the duties and responsibilities normally associated with this position.",
        },
        {
          heading: "2. COMPENSATION AND BENEFITS",
          content:
            "The Employee shall receive an annual salary as specified in this Agreement, along with benefits as provided by the Employer.",
        },
        {
          heading: "3. TERMINATION",
          content:
            "Either party may terminate this Employment Agreement with written notice as specified herein, in accordance with applicable law.",
        },
      ],
    },
    "partnership-agreement": {
      title: "Partnership Agreement",
      sections: [
        {
          heading: "1. FORMATION",
          content:
            "The Partners agree to enter into a partnership for the purpose of conducting business as described in this Agreement.",
        },
        {
          heading: "2. CAPITAL CONTRIBUTIONS",
          content:
            "Each Partner shall contribute capital to the partnership as specified in this Agreement and as the partnership may require.",
        },
        {
          heading: "3. PROFIT AND LOSS SHARING",
          content:
            "Net profits and losses shall be shared among the Partners in accordance with the percentages specified in this Agreement.",
        },
      ],
    },
  }

export function DocumentPreview({ documentType, country, onBack }: DocumentPreviewProps) {
  const [showMonetization, setShowMonetization] = useState(false)
  const [action, setAction] = useState<"download" | "edit" | null>(null)

  const doc = DOCUMENT_CONTENT[documentType]

  const handleActionClick = (actionType: "download" | "edit") => {
    setAction(actionType)
    setShowMonetization(true)
  }

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">{doc.title}</h1>
          <p className="text-slate-400">Your document for {country} is ready to use</p>
        </div>

        {/* Document preview */}
        <Card className="bg-slate-800/50 border-slate-600 p-8 max-h-96 overflow-y-auto">
          <div className="space-y-6 text-slate-100 font-serif">
            {/* Watermark for preview */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="text-6xl font-bold text-slate-700/20 rotate-45 whitespace-nowrap">PREVIEW</div>
            </div>

            {doc.sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-2">{section.heading}</h3>
                <p className="text-sm leading-relaxed text-slate-300">{section.content}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Action buttons */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => handleActionClick("edit")}
            variant="outline"
            className="border border-blue-600 text-blue-400 hover:bg-blue-500/10 bg-transparent"
          >
            Edit Document
          </Button>
          <Button onClick={() => handleActionClick("download")} className="bg-blue-600 hover:bg-blue-700 text-white">
            Download
          </Button>
        </div>

        {/* Feature cards */}
        <Card className="bg-slate-700/30 border-slate-600 p-4">
          <div className="grid grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <span className="text-lg">🔄</span>
              <span>Regenerate anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🌍</span>
              <span>Region optimized</span>
            </div>
          </div>
        </Card>

        {/* Back button */}
        <div className="flex justify-start pt-2">
          <Button
            onClick={onBack}
            variant="outline"
            className="px-6 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent"
          >
            Start Over
          </Button>
        </div>
      </div>

      {/* Monetization modal */}
      {showMonetization && action && <MonetizationModal action={action} onClose={() => setShowMonetization(false)} />}
    </>
  )
}
