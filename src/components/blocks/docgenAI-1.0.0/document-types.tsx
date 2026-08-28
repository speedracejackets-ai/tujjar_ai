"use client"

export function DocumentTypes() {
  const documents = [
    { icon: "🤝", name: "NDA (Mutual)" },
    { icon: "🔐", name: "NDA (Non-Mutual)" },
    { icon: "📋", name: "Privacy Policy" },
    { icon: "⚖️", name: "Terms of Service" },
    { icon: "💼", name: "Freelance Contract" },
    { icon: "👥", name: "Employment Agreement" },
    { icon: "📞", name: "Consulting Agreement" },
    { icon: "📄", name: "Service Agreement" },
  ]

  return (
    <section id="docs" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-6">Document Templates</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional, attorney-reviewed templates for every business need
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 lg:gap-6">
          {documents.map((doc, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-8 hover:border-primary/50 hover:bg-card/80 transition-all cursor-pointer text-center group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{doc.icon}</div>
              <p className="font-bold text-foreground text-sm">{doc.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
