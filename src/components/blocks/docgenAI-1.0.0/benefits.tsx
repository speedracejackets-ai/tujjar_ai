"use client"

export function Benefits() {
  const benefits = [
    {
      icon: "⚡",
      title: "Attorney-reviewed templates",
      description: "Created by legal experts for accuracy and compliance",
    },
    {
      icon: "🇺🇸",
      title: "US-business friendly",
      description: "Compliant with US laws and regulations",
    },
    {
      icon: "📖",
      title: "No legal jargon",
      description: "Clear, plain English everyone can understand",
    },
    {
      icon: "✏️",
      title: "Edit & export anytime",
      description: "Customize documents to your specific needs",
    },
    {
      icon: "🔒",
      title: "Secure & private",
      description: "Your documents are never shared or stored",
    },
    {
      icon: "⚡",
      title: "Instant generation",
      description: "Get professional documents in under 5 minutes",
    },
  ]

  return (
    <section className="py-24 sm:py-32 bg-muted/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-6">Key Features</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {benefits.map((benefit, idx) => (
            <div
              key={idx}
              className="bg-card rounded-2xl p-10 border border-border hover:border-primary/50 transition-colors"
            >
              <div className="text-4xl mb-6">{benefit.icon}</div>
              <h3 className="font-bold text-lg text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
