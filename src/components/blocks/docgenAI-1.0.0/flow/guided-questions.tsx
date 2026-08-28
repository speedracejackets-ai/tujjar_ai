"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { DocumentType } from "@/app/flow/page"

interface Question {
  id: string
  question: string
  type: "text" | "textarea" | "select"
  explanation?: string
  options?: { label: string; value: string }[]
  required?: boolean
}

const DOCUMENT_QUESTIONS: Record<DocumentType, Question[]> = {
  "nda-mutual": [
    {
      id: "party1",
      question: "First Party Name",
      type: "text",
      explanation: "Legal name of the first party (individual or company)",
      required: true,
    },
    {
      id: "party2",
      question: "Second Party Name",
      type: "text",
      explanation: "Legal name of the second party",
      required: true,
    },
    {
      id: "purpose",
      question: "Purpose of Agreement",
      type: "textarea",
      explanation: "Briefly describe why you're sharing confidential information",
      required: true,
    },
    {
      id: "info_type",
      question: "Type of Confidential Information",
      type: "select",
      options: [
        { label: "Business Plans", value: "business-plans" },
        { label: "Trade Secrets", value: "trade-secrets" },
        { label: "Technical Information", value: "technical" },
        { label: "Customer Data", value: "customer-data" },
        { label: "Financial Information", value: "financial" },
        { label: "Other", value: "other" },
      ],
      explanation: "What type of information will be protected?",
      required: true,
    },
    {
      id: "duration",
      question: "Confidentiality Duration (years)",
      type: "text",
      explanation: "How long should the confidentiality obligation last?",
      required: true,
    },
  ],
  "nda-non-mutual": [
    {
      id: "disclosing_party",
      question: "Disclosing Party Name",
      type: "text",
      explanation: "Legal name of the party sharing confidential information",
      required: true,
    },
    {
      id: "receiving_party",
      question: "Receiving Party Name",
      type: "text",
      explanation: "Legal name of the party receiving the information",
      required: true,
    },
    {
      id: "info_type",
      question: "Type of Confidential Information",
      type: "select",
      options: [
        { label: "Business Plans", value: "business-plans" },
        { label: "Trade Secrets", value: "trade-secrets" },
        { label: "Technical Information", value: "technical" },
        { label: "Customer Data", value: "customer-data" },
        { label: "Financial Information", value: "financial" },
        { label: "Other", value: "other" },
      ],
      required: true,
    },
    {
      id: "duration",
      question: "Confidentiality Duration (years)",
      type: "text",
      explanation: "How long should the confidentiality obligation last?",
      required: true,
    },
  ],
  "privacy-policy": [
    {
      id: "company_name",
      question: "Company Name",
      type: "text",
      required: true,
    },
    {
      id: "data_types",
      question: "Types of Data Collected",
      type: "textarea",
      explanation: "List the types of personal data you collect (e.g., name, email, location)",
      required: true,
    },
    {
      id: "data_usage",
      question: "Primary Purpose for Data Use",
      type: "textarea",
      explanation: "Describe the main purposes for collecting this data",
      required: true,
    },
  ],
  "terms-of-service": [
    {
      id: "company_name",
      question: "Company/Service Name",
      type: "text",
      required: true,
    },
    {
      id: "service_description",
      question: "Service Description",
      type: "textarea",
      explanation: "Briefly describe your service or product",
      required: true,
    },
    {
      id: "restrictions",
      question: "Key Use Restrictions",
      type: "textarea",
      explanation: "What are the main restrictions on how users can use your service?",
      required: true,
    },
  ],
  "freelance-agreement": [
    {
      id: "freelancer_name",
      question: "Freelancer Name",
      type: "text",
      required: true,
    },
    {
      id: "client_name",
      question: "Client Name",
      type: "text",
      required: true,
    },
    {
      id: "project_scope",
      question: "Project Scope",
      type: "textarea",
      explanation: "Describe the work to be performed",
      required: true,
    },
    {
      id: "compensation",
      question: "Compensation Amount",
      type: "text",
      explanation: "Total fee or hourly rate for the project",
      required: true,
    },
  ],
  "employment-agreement": [
    {
      id: "employee_name",
      question: "Employee Name",
      type: "text",
      required: true,
    },
    {
      id: "employer_name",
      question: "Employer Name",
      type: "text",
      required: true,
    },
    {
      id: "position",
      question: "Job Position",
      type: "text",
      required: true,
    },
    {
      id: "compensation",
      question: "Annual Compensation",
      type: "text",
      required: true,
    },
  ],
  "partnership-agreement": [
    {
      id: "partner1",
      question: "First Partner Name",
      type: "text",
      required: true,
    },
    {
      id: "partner2",
      question: "Second Partner Name",
      type: "text",
      required: true,
    },
    {
      id: "business_name",
      question: "Partnership Business Name",
      type: "text",
      required: true,
    },
    {
      id: "ownership_split",
      question: "Ownership Split Percentage",
      type: "text",
      explanation: "How will ownership be divided (e.g., 50-50, 60-40)?",
      required: true,
    },
  ],
}

interface GuidedQuestionsProps {
  documentType: DocumentType
  answers: Record<string, string>
  onSave: (answers: Record<string, string>) => void
  onBack: () => void
}

export function GuidedQuestions({ documentType, answers, onSave, onBack }: GuidedQuestionsProps) {
  const questions = DOCUMENT_QUESTIONS[documentType]
  const [localAnswers, setLocalAnswers] = useState(answers)

  const canContinue = questions.every((q) => !q.required || localAnswers[q.id])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Customize Your Document</h1>
        <p className="text-slate-400">Answer a few questions to personalize your legal document.</p>
      </div>

      {/* Questions form */}
      <div className="space-y-6">
        {questions.map((q, idx) => (
          <div key={q.id} className="space-y-2">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-white">
                {idx + 1}. {q.question}
              </label>
              {q.required && <span className="text-red-400 text-xs">*</span>}
            </div>

            {q.explanation && <p className="text-xs text-slate-400">{q.explanation}</p>}

            {q.type === "text" && (
              <input
                type="text"
                value={localAnswers[q.id] || ""}
                onChange={(e) => setLocalAnswers({ ...localAnswers, [q.id]: e.target.value })}
                placeholder="Type your answer..."
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            )}

            {q.type === "textarea" && (
              <textarea
                value={localAnswers[q.id] || ""}
                onChange={(e) => setLocalAnswers({ ...localAnswers, [q.id]: e.target.value })}
                placeholder="Type your answer..."
                rows={3}
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none"
              />
            )}

            {q.type === "select" && (
              <select
                value={localAnswers[q.id] || ""}
                onChange={(e) => setLocalAnswers({ ...localAnswers, [q.id]: e.target.value })}
                className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              >
                <option value="">Select an option...</option>
                {q.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="px-6 py-2 border border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent"
        >
          Back
        </Button>
        <Button
          onClick={() => onSave(localAnswers)}
          disabled={!canContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
