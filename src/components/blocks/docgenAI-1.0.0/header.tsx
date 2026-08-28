"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="">

              <img src="/docgen-ai-logo.svg" alt="DocGenAI logo" className="h-7 w-7" />
            </div>
            <span className="font-black text-xl tracking-tight text-foreground">DocGenAI</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              How It Works
            </a>
            <a
              href="#docs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Documents
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/auth/sign-in">
              <Button variant="ghost" className="text-foreground hover:text-white rounded-lg">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/sign-up">
              <Button className="bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg">Sign Up</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
