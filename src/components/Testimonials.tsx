
import { cn } from "@/lib/utils";

interface Testimonial {
  content: string;
  author: string;
  role: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      content: "O daftedu mudou completamente a forma como estudo para minhas aulas de engenharia elétrica. Basta enviar um diagrama de circuito e ele explica tudo!",
      author: "Alex Chen",
      role: "Estudante de Engenharia Elétrica",
      size: "lg"
    },
    {
      content: "Como professor de matemática, recomendo o daftedu para todos os meus alunos que precisam de ajuda extra. As explicações passo a passo são incrivelmente detalhadas.",
      author: "Sarah Johnson",
      role: "Professora de Matemática do Ensino Médio",
      size: "sm"
    },
    {
      content: "Eu estava com dificuldades em cálculo até encontrar o daftedu. Agora consigo entender as soluções e aprender com elas.",
      author: "Michael Rodriguez",
      role: "Calouro Universitário",
      size: "md"
    },
    {
      content: "A precisão das soluções é impressionante. É como ter um tutor pessoal disponível 24 horas por dia, 7 dias por semana.",
      author: "Emma Williams",
      role: "Estudante de Pós-Graduação em Física",
      size: "sm"
    },
    {
      content: "Como profissional que está voltando aos estudos, o daftedu tem sido essencial para revisar minhas habilidades matemáticas.",
      author: "David Thompson",
      role: "Estudante de Engenharia em Meio Período",
      size: "md"
    }
  ];

  return (
    <div className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Confiado por Estudantes</span> e Profissionais
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Veja o que nossos usuários estão dizendo sobre sua experiência com o daftedu
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md",
                testimonial.size === "sm" ? "md:col-span-4" : 
                testimonial.size === "md" ? "md:col-span-5" : 
                "md:col-span-8"
              )}
            >
              <p className="text-slate-600 dark:text-slate-300 mb-4">"{testimonial.content}"</p>
              <div>
                <p className="font-medium">{testimonial.author}</p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
