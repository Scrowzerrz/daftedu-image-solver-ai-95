
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
      name: "Gratuito",
      description: "Perfeito para experimentar e uso ocasional",
      price: { monthly: "R$0", annually: "R$0" },
      features: [
        "5 uploads de imagens por dia",
        "Soluções básicas passo a passo",
        "Disciplinas limitadas",
        "Histórico de 24 horas"
      ],
      cta: "Começar Agora",
      featured: false
    },
    {
      name: "Pro",
      description: "Tudo que você precisa para uso acadêmico regular",
      price: { monthly: "R$49,90", annually: "R$39,90" },
      features: [
        "50 uploads de imagens por dia",
        "Soluções completas passo a passo",
        "Todas as disciplinas cobertas",
        "Histórico de 30 dias",
        "Processamento prioritário",
        "Download de soluções em PDF"
      ],
      cta: "Teste Gratuito de 7 Dias",
      featured: true
    },
    {
      name: "Premium",
      description: "Recursos avançados para profissionais e educadores",
      price: { monthly: "R$99,90", annually: "R$79,90" },
      features: [
        "Uploads ilimitados de imagens",
        "Maior profundidade nas soluções",
        "Todas as disciplinas com foco especializado",
        "Histórico ilimitado",
        "Processamento instantâneo",
        "Exportação para todos os formatos",
        "Recursos de compartilhamento em equipe",
        "Acesso à API"
      ],
      cta: "Fale com Vendas",
      featured: false
    }
  ];

  return (
    <div className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Preços Simples</span> para Todos
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Escolha o plano perfeito para suas necessidades. Todos os planos incluem recursos principais.
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
                Mensal
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
                Anual <span className="text-daft-600 font-medium">Economize 20%</span>
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
                  MAIS POPULAR
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">{plan.description}</p>
                <div className="mt-6">
                  <span className="text-4xl font-bold">{plan.price[billingPeriod]}</span>
                  {plan.name !== "Gratuito" && (
                    <span className="text-slate-500 dark:text-slate-400">/mês</span>
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
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-4">O que está incluído:</p>
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
          <h3 className="text-2xl font-bold mb-4">Precisa de uma solução personalizada?</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Oferecemos planos personalizados para escolas, universidades e empresas com requisitos específicos.
          </p>
          <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
            Entre em contato com nossa equipe de vendas
          </Button>
        </div>
      </div>
    </div>
  );
}
