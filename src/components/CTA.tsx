
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles, Calculator } from "lucide-react";

export function CTA() {
  const navigate = useNavigate();
  
  return (
    <div className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-daft-400/20 to-daft-600/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="relative group">
          {/* Main CTA Card */}
          <div className="bg-gradient-to-r from-daft-600 via-daft-500 to-daft-400 rounded-3xl p-1 shadow-2xl hover:shadow-daft-500/25 transition-all duration-500 hover:scale-[1.02] animate-fade-in">
            <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-3xl p-10 md:p-16 relative overflow-hidden">
              {/* Decorative grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,theme(colors.daft.500)_1px,transparent_1px),linear-gradient(to_bottom,theme(colors.daft.500)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5"></div>
              
              {/* Floating decorative elements */}
              <div className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-daft-400 to-daft-600 rounded-full blur-xl opacity-20 animate-float"></div>
              <div className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
              
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-daft-500 to-daft-600 rounded-2xl mb-8 shadow-lg group-hover:shadow-daft-500/50 transition-all duration-300 animate-scale-in">
                  <Calculator className="w-10 h-10 text-white" />
                </div>

                {/* Main heading */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-daft-600 via-daft-500 to-daft-400 bg-clip-text text-transparent mb-6 animate-fade-in-up">
                  Pronto para resolver seus problemas matemáticos mais difíceis?
                </h2>
                
                {/* Subtitle */}
                <p className="text-slate-600 dark:text-slate-300 text-lg md:text-xl mb-10 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  Junte-se a milhares de estudantes e profissionais que estão usando o <span className="font-semibold text-daft-600">daftedu</span> para resolver problemas complexos, entender conceitos difíceis e melhorar suas notas.
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-daft-600 to-daft-500 hover:from-daft-700 hover:to-daft-600 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-daft-500/50 transition-all duration-300 hover:scale-105 group" 
                    onClick={() => navigate('/signup')}
                  >
                    <Sparkles className="mr-2 h-5 w-5 group-hover:animate-spin" />
                    Comece Gratuitamente
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-2 border-daft-500 text-daft-600 hover:bg-daft-50 dark:hover:bg-daft-950 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-lg transition-all duration-300 hover:scale-105 group" 
                    onClick={() => navigate('/pricing')}
                  >
                    Ver Preços 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                  <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>+10.000 problemas resolvidos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                      <span>Suporte 24/7</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                      <span>Garantia de 30 dias</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
