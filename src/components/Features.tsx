
import { CalendarClock, Camera, CheckCircle2, FileText, LayoutGrid, MessageCircle } from "lucide-react";

export function Features() {
  return (
    <div className="bg-slate-50 dark:bg-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Recursos Poderosos</span> para Estudantes e Profissionais
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            O daftedu combina IA avançada com uma interface amigável para ajudar você a resolver qualquer problema de matemática ou engenharia
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <Camera className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Reconhecimento de Imagem</h3>
            <p className="text-slate-600 dark:text-slate-400">Envie uma foto de qualquer problema matemático, diagrama de circuito ou questão de geometria e obtenha análise instantânea.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <FileText className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Soluções Detalhadas</h3>
            <p className="text-slate-600 dark:text-slate-400">Receba soluções completas passo a passo com explicações para ajudar você a entender os conceitos.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <LayoutGrid className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Múltiplas Disciplinas</h3>
            <p className="text-slate-600 dark:text-slate-400">Suporte para álgebra, cálculo, física, engenharia elétrica, geometria e muito mais.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <MessageCircle className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Perguntas Complementares</h3>
            <p className="text-slate-600 dark:text-slate-400">Faça perguntas adicionais sobre a solução para aprofundar sua compreensão do problema.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <CalendarClock className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Histórico e Salvamentos</h3>
            <p className="text-slate-600 dark:text-slate-400">Acesse todos os seus problemas e soluções anteriores em seu painel pessoal.</p>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-lg p-8 border border-slate-200 dark:border-slate-700">
            <CheckCircle2 className="h-10 w-10 text-daft-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Garantia de Precisão</h3>
            <p className="text-slate-600 dark:text-slate-400">Nossa IA avançada garante soluções precisas e explicações claras a cada vez.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
