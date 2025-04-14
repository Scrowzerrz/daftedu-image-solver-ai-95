
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileImage } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-16">
        <div className="bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900 py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Sobre a <span className="text-gradient">daftedu</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Usando IA para tornar o aprendizado de matemática e engenharia mais simples para todos
            </p>
          </div>
        </div>
        
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Nossa Missão</h2>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Na daftedu, temos a missão de democratizar o acesso à educação de matemática e engenharia de alta qualidade usando a mais recente tecnologia de IA. Acreditamos que o aprendizado de temas complexos deve ser intuitivo e acessível a todos, independentemente de seu histórico ou recursos.
                </p>
                <p className="text-slate-700 dark:text-slate-300 mb-6">
                  Nossa plataforma foi projetada para fornecer soluções passo a passo para uma ampla gama de problemas, desde álgebra básica até conceitos avançados de engenharia, ajudando os estudantes a entender não apenas a resposta, mas o processo de resolução de problemas.
                </p>
                <div className="flex items-center mb-6">
                  <FileImage className="h-7 w-7 text-daft-600 mr-2" />
                  <span className="font-bold text-xl text-gradient">daftedu</span>
                </div>
              </div>
              <div className="md:w-1/2">
                <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                  <h3 className="text-xl font-bold mb-4">Nossos Valores</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-daft-100 dark:bg-daft-900 flex items-center justify-center text-daft-600 dark:text-daft-400 mr-3 flex-shrink-0 mt-0.5">1</div>
                      <div>
                        <h4 className="font-medium">Acessibilidade</h4>
                        <p className="text-slate-600 dark:text-slate-400">Disponibilizando ferramentas educacionais avançadas para todos os estudantes, independentemente de sua condição econômica</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-daft-100 dark:bg-daft-900 flex items-center justify-center text-daft-600 dark:text-daft-400 mr-3 flex-shrink-0 mt-0.5">2</div>
                      <div>
                        <h4 className="font-medium">Excelência Educacional</h4>
                        <p className="text-slate-600 dark:text-slate-400">Fornecendo soluções precisas e detalhadas que ensinam conceitos, não apenas respostas</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-daft-100 dark:bg-daft-900 flex items-center justify-center text-daft-600 dark:text-daft-400 mr-3 flex-shrink-0 mt-0.5">3</div>
                      <div>
                        <h4 className="font-medium">Inovação</h4>
                        <p className="text-slate-600 dark:text-slate-400">Utilizando IA de ponta para criar experiências de aprendizado intuitivas</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-daft-100 dark:bg-daft-900 flex items-center justify-center text-daft-600 dark:text-daft-400 mr-3 flex-shrink-0 mt-0.5">4</div>
                      <div>
                        <h4 className="font-medium">Comunidade</h4>
                        <p className="text-slate-600 dark:text-slate-400">Construindo um ambiente de apoio para que os alunos cresçam e tenham sucesso juntos</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-20 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa História</h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Como a daftedu evoluiu de uma ideia para uma plataforma que ajuda milhares de estudantes
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-daft-600 to-daft-400"></div>
                
                {/* Timeline items */}
                <div className="space-y-24">
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full bg-daft-500"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:text-right md:pr-12">
                        <h3 className="text-xl font-bold mb-2">2023</h3>
                        <h4 className="font-medium text-daft-600 mb-4">O Início</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          Fundada por um grupo de engenheiros e educadores que viram o potencial da IA na transformação da educação. O conceito inicial visava ajudar os alunos a entender problemas matemáticos complexos.
                        </p>
                      </div>
                      <div className="md:pl-12">
                        {/* Intencionalmente vazio para fins de layout */}
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full bg-daft-500"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:text-right md:pr-12 md:order-1 order-2">
                        {/* Intencionalmente vazio para fins de layout */}
                      </div>
                      <div className="md:pl-12 md:order-2 order-1">
                        <h3 className="text-xl font-bold mb-2">2024</h3>
                        <h4 className="font-medium text-daft-600 mb-4">Lançamento & Crescimento</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          Após meses de desenvolvimento, a daftedu lançou sua plataforma beta. A resposta superou as expectativas, com milhares de estudantes se inscrevendo apenas no primeiro mês.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -mt-3 w-7 h-7 rounded-full bg-daft-500"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="md:text-right md:pr-12">
                        <h3 className="text-xl font-bold mb-2">2025</h3>
                        <h4 className="font-medium text-daft-600 mb-4">O Futuro</h4>
                        <p className="text-slate-600 dark:text-slate-400">
                          Olhando para o futuro, estamos expandindo nossa cobertura de disciplinas, aprimorando nossas capacidades de IA e fazendo parcerias com instituições de ensino globalmente para levar a daftedu a mais estudantes.
                        </p>
                      </div>
                      <div className="md:pl-12">
                        {/* Intencionalmente vazio para fins de layout */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Junte-se à Nossa Missão</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
              Seja você um estudante procurando melhorar seu entendimento de matemática e engenharia ou um educador buscando aprimorar suas ferramentas de ensino, a daftedu está aqui para apoiar sua jornada.
            </p>
            <Button className="gradient-bg" size="lg">
              Comece Agora
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
