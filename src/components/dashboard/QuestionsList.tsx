
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, Award, Heart, Bookmark, User } from "lucide-react";

interface QuestionsListProps {
  searchQuery: string;
  filters: {
    materia: string;
    status: string;
    nivel: string;
  };
}

// Mock data with more realistic content
const mockQuestions = [
  {
    id: 1,
    title: "Como resolver equações do segundo grau?",
    content: "Estou com dificuldade para entender o método de completar quadrados. Alguém pode explicar passo a passo?",
    subject: "Matemática",
    timeAgo: "há 2 minutos",
    points: 15,
    hasAnswer: false,
    answers: 3,
    likes: 12,
    author: "Maria Silva",
    isUrgent: true
  },
  {
    id: 2,
    title: "Principais causas da Segunda Guerra Mundial",
    content: "Preciso entender os fatores políticos e econômicos que levaram ao início da Segunda Guerra Mundial para minha prova...",
    subject: "História",
    timeAgo: "há 5 minutos",
    points: 10,
    hasAnswer: true,
    answers: 2,
    likes: 8,
    author: "João Santos",
    isUrgent: false
  },
  {
    id: 3,
    title: "Diferença entre mitose e meiose",
    content: "Qual a principal diferença entre esses dois processos de divisão celular? E quando cada um ocorre?",
    subject: "Biologia",
    timeAgo: "há 10 minutos",
    points: 12,
    hasAnswer: false,
    answers: 1,
    likes: 15,
    author: "Ana Costa",
    isUrgent: false
  },
  {
    id: 4,
    title: "Como funciona a fotossíntese?",
    content: "Preciso entender todo o processo da fotossíntese, desde a captação da luz até a produção de glucose...",
    subject: "Biologia",
    timeAgo: "há 15 minutos",
    points: 8,
    hasAnswer: true,
    answers: 4,
    likes: 20,
    author: "Pedro Lima",
    isUrgent: false
  }
];

const subjectColors: Record<string, string> = {
  "Matemática": "bg-blue-100 text-blue-700 border-blue-200",
  "História": "bg-orange-100 text-orange-700 border-orange-200",
  "Biologia": "bg-green-100 text-green-700 border-green-200",
  "Física": "bg-purple-100 text-purple-700 border-purple-200",
  "Química": "bg-red-100 text-red-700 border-red-200",
  "Português": "bg-pink-100 text-pink-700 border-pink-200"
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
          <h2 className="text-2xl font-bold text-gray-900">Perguntas Recentes</h2>
          <p className="text-gray-600 mt-1">{filteredQuestions.length} perguntas encontradas</p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {filteredQuestions.map((question, index) => (
          <Card 
            key={question.id} 
            className="hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-white/80 backdrop-blur-sm hover:bg-white group animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-12 h-12 bg-gradient-to-br from-daft-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <User className="h-6 w-6 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge 
                      className={`${subjectColors[question.subject] || 'bg-gray-100 text-gray-700'} border font-medium`}
                    >
                      {question.subject}
                    </Badge>
                    {question.isUrgent && (
                      <Badge className="bg-red-100 text-red-700 border-red-200 animate-pulse">
                        Urgente
                      </Badge>
                    )}
                    <span className="text-sm text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {question.timeAgo}
                    </span>
                  </div>

                  <h3 className="font-bold text-xl mb-3 text-gray-900 group-hover:text-daft-600 transition-colors">
                    {question.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {question.content}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6 text-sm text-gray-500">
                      <div className="flex items-center gap-1 hover:text-daft-600 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{question.answers} respostas</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                        <Heart className="h-4 w-4" />
                        <span>{question.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 hover:text-yellow-600 transition-colors">
                        <Award className="h-4 w-4" />
                        <span>+{question.points} pts</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-yellow-600 transition-colors"
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-daft-600 to-blue-600 hover:from-daft-700 hover:to-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                      >
                        RESPONDER
                      </Button>
                    </div>
                  </div>

                  {/* Author info */}
                  <div className="mt-3 pt-3 border-t border-gray-100">
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

      {filteredQuestions.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageCircle className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Nenhuma pergunta encontrada</h3>
          <p className="text-gray-500 mb-6">
            Tente ajustar seus filtros ou fazer uma nova pergunta
          </p>
          <Button className="bg-gradient-to-r from-daft-600 to-blue-600 hover:from-daft-700 hover:to-blue-700 text-white">
            Fazer Nova Pergunta
          </Button>
        </div>
      )}
    </div>
  );
}
