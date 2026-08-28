"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface JurisdictionContextProps {
  country: string | null
  region: string | null
  language: string | null
  businessType: "individual" | "company" | null
  onContinue: (data: {
    country: string
    region: string
    language: string
    businessType: "individual" | "company"
  }) => void
  onBack: () => void
}

const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "CA", name: "Canada" },
  { code: "GB", name: "United Kingdom" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "IN", name: "India" },
  { code: "SG", name: "Singapore" },
]

const US_STATES = [
  "Alabama",
  "Alaska",
  "Arizona",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Illinois",
  "New York",
  "Texas",
  "Washington",
]

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  { code: "zh", name: "Chinese" },
]

export function JurisdictionContext({
  country,
  region,
  language,
  businessType,
  onContinue,
  onBack,
}: JurisdictionContextProps) {
  const [localCountry, setLocalCountry] = useState(country)
  const [localRegion, setLocalRegion] = useState(region)
  const [localLanguage, setLocalLanguage] = useState(language || "en")
  const [localBusinessType, setLocalBusinessType] = useState<"individual" | "company" | null>(businessType)

  const canContinue = localCountry && localRegion && localLanguage && localBusinessType

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Where will this document be used?</h1>
        <p className="text-slate-400">We'll adjust clauses based on regional legal standards and requirements.</p>
      </div>

      {/* Form fields */}
      <div className="space-y-6">
        {/* Country */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Country</label>
          <select
            value={localCountry || ""}
            onChange={(e) => {
              setLocalCountry(e.target.value)
              setLocalRegion(null)
            }}
            className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            <option value="">Select a country</option>
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Region/State */}
        {localCountry && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white">{localCountry === "US" ? "State" : "Region"}</label>
            <select
              value={localRegion || ""}
              onChange={(e) => setLocalRegion(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            >
              <option value="">Select {localCountry === "US" ? "a state" : "a region"}</option>
              {localCountry === "US"
                ? US_STATES.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))
                : [localCountry].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
            </select>
          </div>
        )}

        {/* Language */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-white">Language Preference</label>
          <select
            value={localLanguage}
            onChange={(e) => setLocalLanguage(e.target.value)}
            className="w-full px-4 py-2.5 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Business Type */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-white">Business Type</label>
          <div className="grid grid-cols-2 gap-3">
            {["individual", "company"].map((type) => (
              <button
                key={type}
                onClick={() => setLocalBusinessType(type as "individual" | "company")}
                className={`p-3 rounded-lg border-2 transition-all ${
                  localBusinessType === type
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-slate-600 bg-slate-700/50 hover:border-slate-500"
                }`}
              >
                <div className="text-sm font-medium text-white capitalize">{type}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Info box */}
      <Card className="bg-slate-700/30 border-slate-600 p-4">
        <p className="text-xs text-slate-300">
          <span className="font-semibold">Note:</span> This information helps us customize legal language for your
          jurisdiction.
        </p>
      </Card>

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
          onClick={() => {
            if (canContinue) {
              onContinue({
                country: localCountry!,
                region: localRegion!,
                language: localLanguage!,
                businessType: localBusinessType!,
              })
            }
          }}
          disabled={!canContinue}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg font-semibold"
        >
          Continue
        </Button>
      </div>
    </div>
  )
}
