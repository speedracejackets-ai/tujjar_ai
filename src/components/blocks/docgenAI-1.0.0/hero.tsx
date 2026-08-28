"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative bg-background overflow-hidden pt-20 pb-24 sm:py-32">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-sm font-semibold text-primary">Trusted by 10,000+ companies</span>
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-balance leading-tight text-foreground">
              Legal Docs
              <br />
              <span className="text-primary">in Minutes</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-md leading-relaxed">
              Generate compliant NDAs, contracts, and policies with AI. Fast, affordable, and simple—no lawyer required.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/flow">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg h-12 px-8 w-full sm:w-auto"
                >
                  Start Free
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-primary/40 hover:border-primary hover:bg-primary/5 font-semibold rounded-lg h-12 bg-transparent text-foreground"
              >
                View Samples
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-muted border border-primary/30 flex items-center justify-center p-8">
              <div className="text-center space-y-4">
               <img src="/docsbot.png" alt="" />
                <p className="text-muted-foreground font-medium">AI-Powered Document Generation</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
