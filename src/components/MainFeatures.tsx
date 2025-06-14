
import { Trophy, Brain, Paperclip, Shield } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export function MainFeatures() {
  const features = [
    {
      icon: Trophy,
      title: "Sistema de Pontos e Gamificação",
      description: "Ganhe pontos resolvendo problemas, desbloqueie conquistas e suba no ranking. Torne o aprendizado divertido e competitivo com nosso sistema de recompensas integrado."
    },
    {
      icon: Brain,
      title: "Respostas de IA Avançada",
      description: "Powered by OpenAI e Gemini para fornecer soluções precisas e explicações detalhadas. Nossa IA combina múltiplos modelos para garantir a melhor resposta possível."
    },
    {
      icon: Paperclip,
      title: "Anexar Arquivos e Mídias",
      description: "Envie imagens, PDFs, documentos e outros tipos de arquivo. Nossa IA pode analisar e resolver problemas em qualquer formato que você precisar."
    },
    {
      icon: Shield,
      title: "Moderação e Melhor Resposta",
      description: "Sistema de moderação inteligente que garante qualidade das respostas. Vote na melhor solução e ajude a comunidade a encontrar as melhores explicações."
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gradient">Recursos Principais</span> do DaftEdu
          </h2>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Descubra as funcionalidades exclusivas que tornam o DaftEdu a melhor plataforma para resolver problemas de matemática e engenharia
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="group relative overflow-hidden border-2 border-transparent hover:border-daft-200 dark:hover:border-daft-800 transition-all duration-300 hover:shadow-2xl hover:shadow-daft-100/20 dark:hover:shadow-daft-900/20 animate-fade-in hover-scale"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-daft-50/50 to-transparent dark:from-daft-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <CardHeader className="relative z-10">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-12 w-12 bg-gradient-to-br from-daft-500 to-daft-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-daft-500/25 transition-all duration-300 group-hover:scale-110">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <CardTitle className="text-xl font-semibold group-hover:text-daft-600 dark:group-hover:text-daft-400 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                
                <CardContent className="relative z-10">
                  <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-daft-500 to-daft-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-daft-50 dark:bg-daft-950/50 rounded-full border border-daft-200 dark:border-daft-800">
            <div className="w-2 h-2 bg-daft-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-daft-600 dark:text-daft-400 font-medium">
              Mais recursos sendo desenvolvidos constantemente
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
