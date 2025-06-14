
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote, Star, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
  size?: 'sm' | 'md' | 'lg';
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      content: "O daftedu mudou completamente a forma como estudo para minhas aulas de engenharia elétrica. Basta enviar um diagrama de circuito e ele explica tudo!",
      author: "Alex Chen",
      role: "Estudante de Engenharia Elétrica",
      avatar: "AC",
      rating: 5,
      size: "lg"
    },
    {
      content: "Como professor de matemática, recomendo o daftedu para todos os meus alunos que precisam de ajuda extra. As explicações passo a passo são incrivelmente detalhadas.",
      author: "Sarah Johnson",
      role: "Professora de Matemática do Ensino Médio",
      avatar: "SJ",
      rating: 5,
      size: "sm"
    },
    {
      content: "Eu estava com dificuldades em cálculo até encontrar o daftedu. Agora consigo entender as soluções e aprender com elas.",
      author: "Michael Rodriguez",
      role: "Calouro Universitário",
      avatar: "MR",
      rating: 5,
      size: "md"
    },
    {
      content: "A precisão das soluções é impressionante. É como ter um tutor pessoal disponível 24 horas por dia, 7 dias por semana.",
      author: "Emma Williams",
      role: "Estudante de Pós-Graduação em Física",
      avatar: "EW",
      rating: 5,
      size: "sm"
    },
    {
      content: "Como profissional que está voltando aos estudos, o daftedu tem sido essencial para revisar minhas habilidades matemáticas.",
      author: "David Thompson",
      role: "Estudante de Engenharia em Meio Período",
      avatar: "DT",
      rating: 5,
      size: "md"
    }
  ];

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-900 dark:via-slate-800/50 dark:to-indigo-950/30"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-72 h-72 bg-gradient-to-br from-daft-200/20 to-daft-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-8 -left-8 w-96 h-96 bg-gradient-to-tr from-indigo-200/20 to-purple-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-daft-300/10 to-blue-300/10 rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-daft-100 to-blue-100 dark:from-daft-900/30 dark:to-blue-900/30 px-4 py-2 rounded-full mb-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Sparkles className="w-4 h-4 text-daft-500" />
            <span className="text-sm font-medium text-daft-700 dark:text-daft-300">Depoimentos Reais</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="text-gradient bg-gradient-to-r from-daft-600 via-blue-600 to-indigo-600">Confiado por Estudantes</span>
            <br />
            <span className="text-slate-800 dark:text-slate-200">e Profissionais</span>
          </h2>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.6s' }}>
            Veja o que nossos usuários estão dizendo sobre sua experiência transformadora com o 
            <span className="text-gradient font-semibold"> daftedu</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={cn(
                "group relative overflow-hidden",
                "transform-gpu transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]",
                "bg-white/80 dark:bg-slate-800/60 backdrop-blur-xl",
                "border-0 shadow-xl shadow-slate-200/40 dark:shadow-black/30",
                "hover:shadow-2xl hover:shadow-daft-200/30 dark:hover:shadow-daft-900/40",
                "animate-fade-in rounded-3xl",
                testimonial.size === "sm" ? "md:col-span-4" : 
                testimonial.size === "md" ? "md:col-span-5" : 
                "md:col-span-8"
              )}
              style={{ 
                animationDelay: `${(index + 1) * 150}ms`,
                background: `linear-gradient(135deg, 
                  rgba(255,255,255,0.9) 0%, 
                  rgba(248,250,252,0.8) 100%)`,
              }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-daft-200/50 via-blue-200/50 to-indigo-200/50 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-full h-full rounded-3xl bg-white dark:bg-slate-800"></div>
              </div>

              {/* Floating sparkles effect */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110">
                <Sparkles className="w-5 h-5 text-daft-400 animate-pulse" />
              </div>

              <CardContent className="relative p-8 flex flex-col h-full">
                {/* Quote icon with gradient */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-daft-200 to-blue-300 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-daft-100 to-blue-100 dark:from-daft-900/50 dark:to-blue-900/50 p-4 rounded-2xl w-fit">
                    <Quote className="w-8 h-8 text-daft-600 dark:text-daft-400" />
                  </div>
                </div>

                {/* Rating stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-fade-in" 
                      style={{ animationDelay: `${(index + 1) * 150 + i * 50}ms` }}
                    />
                  ))}
                </div>

                {/* Testimonial content */}
                <blockquote className="text-slate-700 dark:text-slate-300 mb-8 flex-grow text-lg md:text-xl leading-relaxed font-medium relative">
                  <span className="absolute -left-2 -top-2 text-6xl text-daft-200/30 dark:text-daft-800/30 font-serif">"</span>
                  {testimonial.content}
                  <span className="absolute -right-2 -bottom-4 text-6xl text-daft-200/30 dark:text-daft-800/30 font-serif">"</span>
                </blockquote>

                {/* Author info with enhanced styling */}
                <div className="flex items-center gap-5 mt-auto pt-6 border-t border-gradient-to-r from-transparent via-slate-200/60 to-transparent dark:via-slate-700/60">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-daft-400 to-blue-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
                    <Avatar className="relative w-14 h-14 ring-4 ring-white dark:ring-slate-700 shadow-lg group-hover:ring-daft-200 dark:group-hover:ring-daft-800 transition-all duration-500">
                      <AvatarFallback className="bg-gradient-to-br from-daft-100 to-blue-100 dark:from-daft-900 dark:to-blue-900 text-daft-700 dark:text-daft-300 font-bold text-lg">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1 group-hover:text-daft-700 dark:group-hover:text-daft-400 transition-colors duration-300">
                      {testimonial.author}
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-daft-500 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer group">
            <span>Junte-se a milhares de estudantes!</span>
            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
          </div>
        </div>
      </div>
    </section>
  );
}
