
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, Award } from "lucide-react";

interface QuestionsListProps {
  searchQuery: string;
  filters: {
    materia: string;
    status: string;
    nivel: string;
  };
}

// Mock data - em produção, isso viria de uma API/Supabase
const mockQuestions = [
  {
    id: 1,
    title: "Qual número de analfabetos no Brasil?",
    content: "brasileira de 14 anos e campeã da Copa do mundo de patins quais são os sujeitos de cada oração...",
    subject: "Português",
    timeAgo: "há 1 minuto",
    points: 5,
    hasAnswer: false,
    answers: 0
  },
  {
    id: 2,
    title: "Desarmamento militar",
    content: "Seu exército foi limitado a apenas 100.000 homens, proibição de possuir submarinos e grandes navios de guerra e uma força aérea...",
    subject: "História",
    timeAgo: "há 2 minutos",
    points: 5,
    hasAnswer: false,
    answers: 0
  },
  {
    id: 3,
    title: "Educação e classe social",
    content: "Toda educação é de classe, pois a educação que a classe empresarial recebe é diferente daquela da classe trabalhadora. Enquanto os membros...",
    subject: "Psicologia",
    timeAgo: "há 5 minutos",
    points: 5,
    hasAnswer: false,
    answers: 0
  },
  {
    id: 4,
    title: "Plutão como planeta",
    content: "Uma nova pesquisa da Universidade da Flórida Central, nos Estados Unidos, alega que Plutão deveria voltar a ser denominado como um planeta...",
    subject: "Física",
    timeAgo: "há 6 minutos",
    points: 5,
    hasAnswer: false,
    answers: 0
  },
  {
    id: 5,
    title: "Formas farmacêuticas",
    content: "As formas farmacêuticas são as formas físicas de apresentação do medicamento, e elas podem ser classificadas em sólidas, líquidas, semissólidas e...",
    subject: "Saúde",
    timeAgo: "há 6 minutos",
    points: 5,
    hasAnswer: true,
    answers: 1,
    isFirstQuestion: true
  }
];

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
    <div className="space-y-4">
      {/* New Question Button */}
      <div className="flex justify-center">
        <Button className="w-full max-w-2xl bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-full">
          + NOVA PERGUNTA
        </Button>
      </div>

      {/* Questions */}
      {filteredQuestions.map((question) => (
        <Card key={question.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              {/* Subject Icon */}
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-semibold text-sm">
                  {question.subject.charAt(0)}
                </span>
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {question.subject}
                  </Badge>
                  <span className="text-sm text-gray-500">{question.timeAgo}</span>
                  {question.isFirstQuestion && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      Primeira Pergunta
                    </Badge>
                  )}
                </div>

                <h3 className="font-semibold text-lg mb-2 text-gray-900">
                  {question.title}
                </h3>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {question.content}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-4 w-4" />
                      <span>{question.answers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      <span>+{question.points} pts</span>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="hover:bg-daft-50 hover:border-daft-300"
                  >
                    RESPONDER
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredQuestions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Nenhuma pergunta encontrada</p>
          <p className="text-gray-400 text-sm mt-2">
            Tente ajustar seus filtros ou fazer uma nova pergunta
          </p>
        </div>
      )}
    </div>
  );
}
