
import { useState } from "react";
import { Button } from "./ui/button";
import { Check, Star, Sparkles, Crown, Zap, Shield } from "lucide-react";
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
      featured: false,
      icon: Shield,
      gradient: "from-slate-500 to-slate-700",
      glowColor: "slate-400/30"
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
      featured: true,
      icon: Star,
      gradient: "from-daft-500 to-blue-600",
      glowColor: "daft-400/40"
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
      featured: false,
      icon: Crown,
      gradient: "from-purple-500 to-indigo-600",
      glowColor: "purple-400/40"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950/30"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-gradient-to-br from-daft-200/20 to-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-gradient-to-tr from-purple-200/20 to-indigo-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-daft-300/10 to-purple-300/10 rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-daft-100 to-blue-100 dark:from-daft-900/30 dark:to-blue-900/30 px-6 py-3 rounded-full mb-8 animate-fade-in border border-daft-200/50 dark:border-daft-700/50" style={{ animationDelay: '0.2s' }}>
            <Sparkles className="w-5 h-5 text-daft-500 animate-pulse" />
            <span className="text-sm font-semibold text-daft-700 dark:text-daft-300">Planos Flexíveis</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="text-gradient bg-gradient-to-r from-daft-600 via-blue-600 to-purple-600">Preços Simples</span>
            <br />
            <span className="text-slate-800 dark:text-slate-200">para Todos</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Escolha o plano perfeito para suas necessidades. Todos os planos incluem recursos principais com
            <span className="text-gradient font-semibold"> tecnologia de ponta</span>
          </p>
          
          <div className="flex items-center justify-center mt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="relative bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl p-2 rounded-2xl shadow-2xl border border-white/20 dark:border-slate-700/20">
              <div className="absolute inset-0 bg-gradient-to-r from-daft-200/30 to-blue-200/30 rounded-2xl blur-xl"></div>
              <div className="relative flex">
                <button
                  className={cn(
                    "relative px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden",
                    billingPeriod === "monthly"
                      ? "bg-gradient-to-r from-daft-500 to-blue-600 text-white shadow-lg shadow-daft-200/50 dark:shadow-daft-900/50 scale-105"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                  onClick={() => setBillingPeriod("monthly")}
                >
                  {billingPeriod === "monthly" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-daft-400/20 to-blue-500/20 animate-pulse"></div>
                  )}
                  <span className="relative">Mensal</span>
                </button>
                <button
                  className={cn(
                    "relative px-8 py-4 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden",
                    billingPeriod === "annually"
                      ? "bg-gradient-to-r from-daft-500 to-blue-600 text-white shadow-lg shadow-daft-200/50 dark:shadow-daft-900/50 scale-105"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
                  )}
                  onClick={() => setBillingPeriod("annually")}
                >
                  {billingPeriod === "annually" && (
                    <div className="absolute inset-0 bg-gradient-to-r from-daft-400/20 to-blue-500/20 animate-pulse"></div>
                  )}
                  <span className="relative">
                    Anual <span className="inline-flex items-center ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full font-bold">
                      <Zap className="w-3 h-3 mr-1" />
                      20% OFF
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div 
                key={plan.name}
                className={cn(
                  "group relative rounded-3xl overflow-hidden transition-all duration-500 animate-fade-in",
                  "transform-gpu hover:-translate-y-4 hover:scale-[1.02]",
                  plan.featured 
                    ? "lg:scale-110 lg:z-10" 
                    : "lg:hover:scale-105"
                )}
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                {/* Glow effect */}
                <div className={cn(
                  "absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl",
                  `bg-gradient-to-r ${plan.gradient}`
                )}></div>

                {/* Card background with glass effect */}
                <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-slate-700/20 shadow-2xl shadow-slate-200/20 dark:shadow-black/40">
                  
                  {/* Featured badge */}
                  {plan.featured && (
                    <div className="relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-daft-500 to-blue-600 animate-shimmer" 
                           style={{ backgroundSize: '200% 100%' }}></div>
                      <div className="relative bg-gradient-to-r from-daft-500 to-blue-600 text-white text-center py-4 text-sm font-bold tracking-wider">
                        <div className="flex items-center justify-center gap-2">
                          <Crown className="w-4 h-4 animate-pulse" />
                          MAIS POPULAR
                          <Crown className="w-4 h-4 animate-pulse" />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  )}

                  <div className="p-8 lg:p-10">
                    {/* Plan header with icon */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={cn(
                        "relative p-4 rounded-2xl shadow-lg",
                        `bg-gradient-to-br ${plan.gradient}`,
                        "group-hover:shadow-xl transition-shadow duration-300"
                      )}>
                        <div className={cn(
                          "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md",
                          `bg-${plan.glowColor}`
                        )}></div>
                        <IconComponent className="relative w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">{plan.name}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-sm lg:text-base">{plan.description}</p>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className={cn(
                          "text-4xl lg:text-5xl font-bold",
                          plan.featured 
                            ? "text-gradient bg-gradient-to-r from-daft-600 to-blue-600" 
                            : "text-slate-900 dark:text-white"
                        )}>
                          {plan.price[billingPeriod]}
                        </span>
                        {plan.name !== "Gratuito" && (
                          <span className="text-slate-500 dark:text-slate-400 text-lg">/mês</span>
                        )}
                      </div>
                      {billingPeriod === "annually" && plan.name !== "Gratuito" && (
                        <p className="text-green-600 dark:text-green-400 text-sm font-medium mt-2 flex items-center gap-1">
                          <Sparkles className="w-4 h-4" />
                          Economize R${((parseFloat(plan.price.monthly.replace('R$', '').replace(',', '.')) * 12) - (parseFloat(plan.price.annually.replace('R$', '').replace(',', '.')) * 12)).toFixed(0)} por ano
                        </p>
                      )}
                    </div>

                    {/* CTA Button */}
                    <div className="mb-8">
                      <Button 
                        className={cn(
                          "w-full h-14 text-base font-semibold rounded-2xl transition-all duration-300 relative overflow-hidden group/btn",
                          plan.featured 
                            ? "bg-gradient-to-r from-daft-500 to-blue-600 hover:from-daft-600 hover:to-blue-700 shadow-lg shadow-daft-200/50 dark:shadow-daft-900/50 hover:shadow-xl hover:shadow-daft-300/50 dark:hover:shadow-daft-800/50 text-white"
                            : "bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-700 dark:to-slate-800 hover:from-slate-900 hover:to-slate-950 dark:hover:from-slate-600 dark:hover:to-slate-700 text-white"
                        )}
                        onClick={() => navigate('/signup')}
                      >
                        <span className="relative z-10">{plan.cta}</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        {plan.featured && (
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                        )}
                      </Button>
                    </div>

                    {/* Features list */}
                    <div>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-6 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        O que está incluído:
                      </p>
                      <ul className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <li 
                            key={feature} 
                            className="flex items-start gap-3 animate-fade-in"
                            style={{ animationDelay: `${(index + 1) * 200 + featureIndex * 100}ms` }}
                          >
                            <div className="flex-shrink-0 mt-1">
                              <div className="relative">
                                <div className={cn(
                                  "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm",
                                  plan.featured ? "bg-daft-400/30" : "bg-green-400/30"
                                )}></div>
                                <Check className={cn(
                                  "relative w-5 h-5",
                                  plan.featured ? "text-daft-500" : "text-green-500"
                                )} />
                              </div>
                            </div>
                            <span className="text-slate-600 dark:text-slate-400 text-sm lg:text-base leading-relaxed">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Custom enterprise solution */}
        <div className="mt-20 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-daft-500 via-blue-500 to-purple-500 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 lg:p-12 text-center border border-white/20 dark:border-slate-700/20 shadow-2xl">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-daft-500 to-purple-600 rounded-2xl shadow-lg">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                  Solução Personalizada
                </h3>
              </div>
              
              <p className="text-lg lg:text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
                Oferecemos planos personalizados para <span className="font-semibold text-daft-600 dark:text-daft-400">escolas</span>, 
                <span className="font-semibold text-blue-600 dark:text-blue-400"> universidades</span> e 
                <span className="font-semibold text-purple-600 dark:text-purple-400"> empresas</span> com requisitos específicos.
              </p>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="h-14 px-8 text-base font-semibold rounded-2xl border-2 border-daft-300 dark:border-daft-600 text-daft-700 dark:text-daft-300 hover:bg-daft-50 dark:hover:bg-daft-900/20 hover:border-daft-400 dark:hover:border-daft-500 transition-all duration-300 group"
                onClick={() => navigate('/contact')}
              >
                <span className="flex items-center gap-2">
                  Entre em contato com nossa equipe
                  <Zap className="w-5 h-5 group-hover:animate-pulse" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
