"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

const MESSAGES = [
  "Structuring legal clauses...",
  "Applying regional standards...",
  "Formatting document...",
  "Generating document...",
]

export function LoadingGeneration() {
  const [currentMessage, setCurrentMessage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % MESSAGES.length)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      {/* Animated loading circle */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-4 border-slate-700 rounded-full" />
        <div className="absolute inset-0 border-4 border-transparent border-t-blue-500 rounded-full animate-spin" />
      </div>

      {/* Messages */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Generating Your Document</h2>

        {/* Message carousel */}
        <div className="h-6 flex items-center justify-center">
          <p className="text-slate-300 text-sm transition-opacity duration-300">{MESSAGES[currentMessage]}</p>
        </div>

        {/* Progress indicators */}
        <div className="flex gap-2 justify-center pt-4">
          {MESSAGES.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentMessage ? "w-6 bg-blue-500" : "w-2 bg-slate-600"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Info card */}
      <Card className="bg-slate-700/30 border-slate-600 p-4 max-w-sm">
        <p className="text-xs text-slate-300 text-center">This typically takes 3-6 seconds. Please wait...</p>
      </Card>
    </div>
  )
}
