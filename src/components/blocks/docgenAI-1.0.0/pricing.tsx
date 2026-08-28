"use client"

import { Button } from "@/components/ui/button"

export function Pricing() {
  const plans = [
    {
      name: "Starter",
      price: "0",
      description: "Perfect for getting started",
      features: ["1 document per month", "Watermarked documents", "Basic templates", "Email support"],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Pro",
      price: "29",
      description: "For most small businesses",
      features: ["Unlimited documents", "No watermark", "Editable formats", "Priority support", "Advanced templates"],
      cta: "Start Free Trial",
      highlighted: true,
    },
    {
      name: "Business",
      price: "79",
      description: "For growing teams",
      features: ["Everything in Pro", "Team access", "Client documents", "Priority support", "Custom templates"],
      cta: "Contact Sales",
      highlighted: false,
    },
  ]

  return (
    <section id="pricing" className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl sm:text-6xl font-black text-foreground mb-6">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground">Choose the plan that fits your needs</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-10 flex flex-col transition-all ${
                plan.highlighted
                  ? "bg-card border-primary/60 shadow-2xl shadow-primary/10 ring-1 ring-primary/30 scale-105 lg:scale-110"
                  : "bg-card border-border hover:border-primary/40"
              }`}
            >
              {plan.highlighted && (
                <div className="mb-6 inline-block w-fit">
                  <span className="text-xs font-bold text-primary bg-primary/15 px-4 py-2 rounded-full">
                    RECOMMENDED
                  </span>
                </div>
              )}
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-muted-foreground text-sm mb-8">{plan.description}</p>

              <div className="mb-8">
                <span className="text-5xl font-black text-foreground">${plan.price}</span>
                {plan.price !== "0" && <span className="text-muted-foreground ml-2">/month</span>}
              </div>

              <Button
                className={`w-full mb-10 font-semibold h-11 rounded-lg ${
                  plan.highlighted
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                    : "border-2 border-border hover:border-primary hover:bg-muted text-foreground"
                }`}
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.cta}
              </Button>

              <ul className="space-y-4 flex-1">
                {plan.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1 text-lg">✓</span>
                    <span className="text-foreground text-sm leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
