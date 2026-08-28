"use client"

export function TrustSection() {
  return (
    <section className="py-20 sm:py-32 bg-background border-t border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center mb-12">
          <div className="bg-primary/5 rounded-lg p-8 border border-border/50">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-lg text-foreground mb-2">Security</h3>
            <p className="text-muted-foreground text-sm">Enterprise-grade encryption protects your data</p>
          </div>
          <div className="bg-primary/5 rounded-lg p-8 border border-border/50">
            <div className="text-4xl mb-3">🛡️</div>
            <h3 className="font-bold text-lg text-foreground mb-2">Privacy</h3>
            <p className="text-muted-foreground text-sm">Your documents are never shared or retained</p>
          </div>
          <div className="bg-primary/5 rounded-lg p-8 border border-border/50">
            <div className="text-4xl mb-3">🇺🇸</div>
            <h3 className="font-bold text-lg text-foreground mb-2">US-Focused</h3>
            <p className="text-muted-foreground text-sm">Compliant with all US business regulations</p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg border border-border p-8">
          <h3 className="font-bold text-foreground mb-3">Important Disclaimer</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            This tool does not replace a licensed attorney. Documents generated are for informational purposes. For
            complex legal matters or specific legal advice, please consult with a qualified attorney.
          </p>
        </div>
      </div>
    </section>
  )
}
