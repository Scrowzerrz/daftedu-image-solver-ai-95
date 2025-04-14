
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function CTA() {
  const navigate = useNavigate();
  
  return (
    <div className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-daft-600 to-daft-400 rounded-3xl p-10 md:p-16 text-center md:text-left relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
          
          <div className="relative z-10 md:max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para resolver seus problemas matemáticos mais difíceis?
            </h2>
            <p className="text-white text-opacity-80 text-lg mb-8">
              Junte-se a milhares de estudantes e profissionais que estão usando o daftedu para resolver problemas complexos, entender conceitos difíceis e melhorar suas notas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-white text-daft-600 hover:bg-slate-100" onClick={() => navigate('/signup')}>
                Comece Gratuitamente
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" onClick={() => navigate('/pricing')}>
                Ver Preços <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
