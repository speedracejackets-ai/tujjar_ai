"use client"

export function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose a Document Type",
      description: "Select from NDA, Contract, Privacy Policy, and more",
    },
    {
      number: "02",
      title: "Answer Simple Questions",
      description: "Our AI asks just what it needs to know about your business",
    },
    {
      number: "03",
      title: "Download or Edit Instantly",
      description: "Get your document ready to use or customize further",
    },
  ]

  return (
    <section id="how" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-6">How It Works</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Simple, intuitive, and fast. Three steps to your legal documents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              <div className="bg-card rounded-2xl p-10 border border-border hover:border-primary/50 transition-all duration-300 h-full hover:bg-muted/50">
                <div className="text-6xl font-black text-primary/20 mb-6 leading-none">{step.number}</div>
                <h3 className="text-xl font-bold text-foreground mb-4">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-5 w-10 h-1 bg-gradient-to-r from-primary/40 to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
