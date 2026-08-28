"use client"

export function ProblemSolution() {
  const problems = [
    {
      icon: "💰",
      title: "Hiring lawyers is expensive",
      description: "Legal services can cost thousands for simple documents",
    },
    {
      icon: "⏱️",
      title: "Legal documents take time",
      description: "Traditional drafting takes weeks or months",
    },
    {
      icon: "📖",
      title: "Confusing legal language",
      description: "Complex jargon makes documents hard to understand",
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl sm:text-6xl font-black text-balance leading-tight text-foreground mb-12">
              The Problem
            </h2>
            <div className="space-y-8">
              {problems.map((problem, idx) => (
                <div key={idx} className="flex gap-5">
                  <div className="text-4xl flex-shrink-0 leading-none">{problem.icon}</div>
                  <div className="pt-1">
                    <h3 className="font-bold text-lg text-foreground mb-2">{problem.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-muted border border-primary/30 p-10 space-y-8">
            <h2 className="text-4xl sm:text-5xl font-black text-foreground leading-tight">Our Solution</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our AI creates clear, ready-to-use legal documents tailored to your business in minutes. No legal jargon.
              No confusion. Just documents you can understand and use immediately.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                  ✓
                </span>
                <span className="text-foreground font-medium">Save thousands on legal fees</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                  ✓
                </span>
                <span className="text-foreground font-medium">Get documents in minutes, not months</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white">
                  ✓
                </span>
                <span className="text-foreground font-medium">Clear, plain English language</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
