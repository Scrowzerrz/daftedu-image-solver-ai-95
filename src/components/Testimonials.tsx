
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  avatar: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      content: "O daftedu mudou completamente a forma como estudo para minhas aulas de engenharia elétrica. Basta enviar um diagrama de circuito e ele explica tudo!",
      author: "Alex Chen",
      role: "Estudante de Engenharia Elétrica",
      avatar: "AC",
      size: "lg"
    },
    {
      content: "Como professor de matemática, recomendo o daftedu para todos os meus alunos que precisam de ajuda extra. As explicações passo a passo são incrivelmente detalhadas.",
      author: "Sarah Johnson",
      role: "Professora de Matemática do Ensino Médio",
      avatar: "SJ",
      size: "sm"
    },
    {
      content: "Eu estava com dificuldades em cálculo até encontrar o daftedu. Agora consigo entender as soluções e aprender com elas.",
      author: "Michael Rodriguez",
      role: "Calouro Universitário",
      avatar: "MR",
      size: "md"
    },
    {
      content: "A precisão das soluções é impressionante. É como ter um tutor pessoal disponível 24 horas por dia, 7 dias por semana.",
      author: "Emma Williams",
      role: "Estudante de Pós-Graduação em Física",
      avatar: "EW",
      size: "sm"
    },
    {
      content: "Como profissional que está voltando aos estudos, o daftedu tem sido essencial para revisar minhas habilidades matemáticas.",
      author: "David Thompson",
      role: "Estudante de Engenharia em Meio Período",
      avatar: "DT",
      size: "md"
    }
  ];

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Confiado por Estudantes</span> e Profissionais
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Veja o que nossos usuários estão dizendo sobre sua experiência com o daftedu
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col transform-gpu transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                "bg-white dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-700/50 animate-fade-in",
                "shadow-lg shadow-slate-200/40 dark:shadow-black/20",
                testimonial.size === "sm" ? "md:col-span-4" : 
                testimonial.size === "md" ? "md:col-span-5" : 
                "md:col-span-8"
              )}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <CardContent className="p-0 flex flex-col h-full">
                <Quote className="w-10 h-10 text-daft-200 dark:text-daft-800 mb-4" />
                <p className="text-slate-700 dark:text-slate-300 mb-6 flex-grow text-lg leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-slate-200/60 dark:border-slate-700/60">
                  <Avatar>
                    <AvatarFallback className="bg-daft-100 dark:bg-daft-900 text-daft-600 dark:text-daft-400 font-bold">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">{testimonial.author}</p>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
