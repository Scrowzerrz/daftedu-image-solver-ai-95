
import { useState } from "react";
import { Button } from "./ui/button";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

type PricingPlan = "monthly" | "annually";

export function Pricing() {
  const [billingPeriod, setBillingPeriod] = useState<PricingPlan>("monthly");
  const navigate = useNavigate();
  
  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out and occasional use",
      price: { monthly: "$0", annually: "$0" },
      features: [
        "5 image uploads per day",
        "Basic step-by-step solutions",
        "Limited subjects covered",
        "24-hour history"
      ],
      cta: "Get Started",
      featured: false
    },
    {
      name: "Pro",
      description: "Everything you need for regular academic use",
      price: { monthly: "$9.99", annually: "$7.99" },
      features: [
        "50 image uploads per day",
        "Full step-by-step solutions",
        "All subjects covered",
        "30-day history",
        "Priority processing",
        "Download solutions as PDF"
      ],
      cta: "Start 7-Day Trial",
      featured: true
    },
    {
      name: "Premium",
      description: "Advanced features for professionals and educators",
      price: { monthly: "$19.99", annually: "$15.99" },
      features: [
        "Unlimited image uploads",
        "Enhanced solution depth",
        "All subjects with specialized focus",
        "Unlimited history",
        "Instant processing",
        "Export to all formats",
        "Team sharing features",
        "API access"
      ],
      cta: "Contact Sales",
      featured: false
    }
  ];

  return (
    <div className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Simple Pricing</span> for Everyone
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Choose the perfect plan that fits your needs. All plans include core features.
          </p>
          
          <div className="flex items-center justify-center mt-8">
            <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-full inline-flex">
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  billingPeriod === "monthly"
                    ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400"
                )}
                onClick={() => setBillingPeriod("monthly")}
              >
                Monthly
              </button>
              <button
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all",
                  billingPeriod === "annually"
                    ? "bg-white dark:bg-slate-700 shadow-sm text-slate-900 dark:text-white"
                    : "text-slate-600 dark:text-slate-400"
                )}
                onClick={() => setBillingPeriod("annually")}
              >
                Annually <span className="text-daft-600 font-medium">Save 20%</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={cn(
                "rounded-2xl overflow-hidden border transition-all",
                plan.featured 
                  ? "border-daft-400 shadow-lg shadow-daft-200/20 dark:border-daft-600 dark:shadow-daft-900/20 scale-105 md:scale-105" 
                  : "border-slate-200 dark:border-slate-800"
              )}
            >
              {plan.featured && (
                <div className="bg-daft-500 text-white text-center py-2 text-sm font-medium">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">{plan.price[billingPeriod]}</span>
                  {plan.name !== "Free" && (
                    <span className="text-slate-500 dark:text-slate-400">/month</span>
                  )}
                </div>
                <div className="mt-8">
                  <Button 
                    className={cn(
                      "w-full",
                      plan.featured ? "gradient-bg" : "bg-slate-900 dark:bg-slate-700"
                    )}
                    onClick={() => navigate('/signup')}
                  >
                    {plan.cta}
                  </Button>
                </div>
                <div className="mt-8">
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">What's included:</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start">
                        <Check className="h-5 w-5 text-daft-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 dark:text-slate-400 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center bg-slate-50 dark:bg-slate-900 rounded-xl p-8 max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Need a custom solution?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            We offer custom plans for schools, universities, and enterprises with specialized requirements.
          </p>
          <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
            Contact our Sales Team
          </Button>
        </div>
      </div>
    </div>
  );
}
