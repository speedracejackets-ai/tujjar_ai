"use client"

import { Button } from "@/components/ui/button"

export function FinalCTA() {
  return (
    <section className="py-24 sm:py-32 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-t border-primary/20">
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-balance text-foreground mb-8 leading-tight">
          Stop Paying for <br />
          <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Basic Lawyers.</span>
        </h2>
        <p className="text-lg sm:text-xl text-muted-foreground text-balance mb-10 max-w-2xl mx-auto leading-relaxed">
          Generate professional, compliant legal documents today. No credit card required.
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-lg h-13 px-10 text-lg"
        >
          Generate Your First Document
        </Button>
      </div>
    </section>
  )
}
