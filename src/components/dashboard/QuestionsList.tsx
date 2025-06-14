
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, Award, Heart, Bookmark, User, CheckCircle } from "lucide-react";

interface QuestionsListProps {
  searchQuery: string;
  filters: {
    materia: string;
    status: string;
    nivel: string;
  };
}

// Mock data with enhanced realistic content
const mockQuestions = [
  {
    id: 1,
    title: "Como resolver equações do segundo grau usando fórmula de Bhaskara?",
    content: "Estou com dificuldade para entender como aplicar a fórmula de Bhaskara em equações mais complexas. Alguém pode explicar o passo a passo com exemplos práticos?",
    subject: "Matemática",
    timeAgo: "há 2 minutos",
    points: 15,
    hasAnswer: false,
    answers: 3,
    likes: 12,
    author: "Maria Silva",
    isUrgent: true,
    difficulty: "Médio"
  },
  {
    id: 2,
    title: "Principais causas da Segunda Guerra Mundial - contexto histórico",
    content: "Preciso entender melhor os fatores políticos, econômicos e sociais que levaram ao início da Segunda Guerra Mundial. Qual foi o papel do Tratado de Versalhes?",
    subject: "História",
    timeAgo: "há 8 minutos",
    points: 10,
    hasAnswer: true,
    answers: 5,
    likes: 18,
    author: "João Santos",
    isUrgent: false,
    difficulty: "Fácil"
  },
  {
    id: 3,
    title: "Diferença entre mitose e meiose - divisão celular",
    content: "Qual a principal diferença entre esses dois processos de divisão celular? Quando cada um ocorre e qual a importância de cada processo para os organismos?",
    subject: "Biologia",
    timeAgo: "há 15 minutos",
    points: 12,
    hasAnswer: false,
    answers: 2,
    likes: 9,
    author: "Ana Costa",
    isUrgent: false,
    difficulty: "Médio"
  },
  {
    id: 4,
    title: "Processo completo da fotossíntese em plantas",
    content: "Como funciona exatamente o processo da fotossíntese? Preciso entender desde a captação da luz solar até a produção de glucose e oxigênio.",
    subject: "Biologia",
    timeAgo: "há 25 minutos",
    points: 8,
    hasAnswer: true,
    answers: 7,
    likes: 24,
    author: "Pedro Lima",
    isUrgent: false,
    difficulty: "Difícil"
  },
  {
    id: 5,
    title: "Análise sintática - classificação de orações subordinadas",
    content: "Estou com dúvidas sobre como identificar e classificar orações subordinadas substantivas, adjetivas e adverbiais. Podem dar exemplos práticos?",
    subject: "Português",
    timeAgo: "há 1 hora",
    points: 6,
    hasAnswer: false,
    answers: 1,
    likes: 5,
    author: "Carla Oliveira",
    isUrgent: false,
    difficulty: "Difícil"
  }
];

const subjectColors: Record<string, string> = {
  "Matemática": "bg-blue-100 text-blue-800 border-blue-200",
  "História": "bg-orange-100 text-orange-800 border-orange-200",
  "Biologia": "bg-green-100 text-green-800 border-green-200",
  "Física": "bg-purple-100 text-purple-800 border-purple-200",
  "Química": "bg-red-100 text-red-800 border-red-200",
  "Português": "bg-pink-100 text-pink-800 border-pink-200"
};

const difficultyColors: Record<string, string> = {
  "Fácil": "bg-green-100 text-green-700",
  "Médio": "bg-yellow-100 text-yellow-700",
  "Difícil": "bg-red-100 text-red-700"
};

export function QuestionsList({ searchQuery, filters }: QuestionsListProps) {
  // Filter questions based on search and filters
  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = searchQuery === "" || 
      question.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSubject = filters.materia === "" || question.subject === filters.materia;
    
    const matchesStatus = filters.status === "" || 
      (filters.status === "Sem Resposta" && !question.hasAnswer) ||
      (filters.status === "Com Resposta" && question.hasAnswer);
    
    return matchesSearch && matchesSubject && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Perguntas da Comunidade</h2>
          <p className="text-gray-600 mt-1">
            {filteredQuestions.length} {filteredQuestions.length === 1 ? 'pergunta encontrada' : 'perguntas encontradas'}
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => (
          <Card 
            key={question.id} 
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:border-daft-200 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-daft-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                  <User className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Header with badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge className={`${subjectColors[question.subject] || 'bg-gray-100 text-gray-700'} border font-medium text-xs`}>
                      {question.subject}
                    </Badge>
                    <Badge className={`${difficultyColors[question.difficulty]} text-xs font-medium`}>
                      {question.difficulty}
                    </Badge>
                    {question.isUrgent && (
                      <Badge className="bg-red-100 text-red-700 border-red-200 animate-pulse text-xs">
                        Urgente
                      </Badge>
                    )}
                    {question.hasAnswer && (
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Respondida
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
                      <Clock className="h-3 w-3" />
                      {question.timeAgo}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-daft-600 transition-colors line-clamp-2">
                    {question.title}
                  </h3>
                  
                  {/* Content preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {question.content}
                  </p>

                  {/* Stats and actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500 hover:text-daft-600 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{question.answers}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                        <Heart className="h-4 w-4" />
                        <span>{question.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 hover:text-amber-500 transition-colors">
                        <Award className="h-4 w-4" />
                        <span>+{question.points} pts</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-amber-600 transition-colors p-2 h-8 w-8"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-daft-600 to-blue-600 hover:from-daft-700 hover:to-blue-700 
                                   text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 
                                   transform hover:scale-105 shadow-sm hover:shadow-md text-sm"
                      >
                        RESPONDER
                      </Button>
                    </div>
                  </div>

                  {/* Author info */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Perguntado por <span className="font-medium text-gray-700">{question.author}</span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      {filteredQuestions.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma pergunta encontrada</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Não encontramos perguntas que correspondam aos seus critérios de pesquisa. Tente ajustar os filtros ou criar uma nova pergunta.
          </p>
          <Button className="bg-gradient-to-r from-daft-600 to-blue-600 hover:from-daft-700 hover:to-blue-700 text-white">
            Fazer Nova Pergunta
          </Button>
        </div>
      )}
    </div>
  );
}
