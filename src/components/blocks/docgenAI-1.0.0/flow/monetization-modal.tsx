"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MonetizationModalProps {
  action: "download" | "edit"
  onClose: () => void
}

export function MonetizationModal({ action, onClose }: MonetizationModalProps) {
  const [selectedPlan, setSelectedPlan] = useState<"free" | "pro" | "business" | null>(null)

  const plans = [
    {
      id: "free",
      name: "Free",
      price: "$0",
      features: ["Watermarked PDF", "Single download", "Basic customization"],
      available: true,
    },
    {
      id: "pro",
      name: "Pro",
      price: "$49",
      period: "/month",
      features: ["Editable DOCX + PDF", "No watermark", "Unlimited downloads", "Custom branding", "Multiple documents"],
      highlighted: true,
      available: true,
    },
    {
      id: "business",
      name: "Business",
      price: "$199",
      period: "/month",
      features: [
        "Everything in Pro",
        "Team access (5 users)",
        "Saved document history",
        "Priority support",
        "API access",
      ],
      available: true,
    },
  ]

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-800 border-slate-600 max-w-2xl w-full p-8 max-h-96 overflow-y-auto">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-white">Your document is ready</h2>
            <p className="text-slate-400">
              Choose a plan to {action === "download" ? "download" : "edit"} your document
            </p>
          </div>

          {/* Plans grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id as any)}
                className={`p-6 rounded-lg border-2 transition-all text-left ${
                  selectedPlan === plan.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                } ${plan.highlighted ? "ring-2 ring-blue-500" : ""}`}
              >
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-white">{plan.name}</h3>
                    <p className="text-2xl font-bold text-white">
                      {plan.price}
                      {plan.period && <span className="text-sm text-slate-400">{plan.period}</span>}
                    </p>
                  </div>
                  <ul className="space-y-1 text-xs text-slate-300">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="text-blue-400">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </button>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1 border border-slate-600 text-slate-300 hover:bg-slate-700/50 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              disabled={!selectedPlan}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50"
            >
              {selectedPlan === "free" ? "Download Free" : "Create Account"}
            </Button>
          </div>

          {/* Trust note */}
          <p className="text-xs text-slate-400 text-center">You can upgrade or downgrade your plan anytime.</p>
        </div>
      </Card>
    </div>
  )
}
