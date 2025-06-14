
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Clock, Award, Heart, Bookmark, User, CheckCircle } from "lucide-react";
import { useQuestions } from "@/hooks/useQuestions";
import { useNavigate } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

interface QuestionsListProps {
  searchQuery: string;
  filters: {
    materia: string;
    status: string;
    nivel: string;
  };
}

const subjectColors: Record<string, string> = {
  "Matemática": "bg-blue-100 text-blue-800 border-blue-200",
  "História": "bg-orange-100 text-orange-800 border-orange-200",
  "Biologia": "bg-green-100 text-green-800 border-green-200",
  "Física": "bg-purple-100 text-purple-800 border-purple-200",
  "Química": "bg-red-100 text-red-800 border-red-200",
  "Português": "bg-pink-100 text-pink-800 border-pink-200"
};

export function QuestionsList({ searchQuery, filters }: QuestionsListProps) {
  const navigate = useNavigate();
  
  const { data: questions, isLoading, error } = useQuestions(searchQuery, {
    materia: filters.materia,
    status: filters.status
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">
          Erro ao carregar perguntas: {error.message}
        </div>
        <Button onClick={() => window.location.reload()}>
          Tentar Novamente
        </Button>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Perguntas da Comunidade</h2>
          <p className="text-gray-600 mt-1">
            {questions.length} {questions.length === 1 ? 'pergunta encontrada' : 'perguntas encontradas'}
          </p>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">
        {questions.map((question, index) => (
          <Card 
            key={question.id} 
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:border-daft-200 animate-fade-in"
            style={{ animationDelay: `${index * 50}ms` }}
            onClick={() => navigate(`/question/${question.id}`)}
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
                    <Badge className={`${subjectColors[question.materias?.nome || 'Geral'] || 'bg-gray-100 text-gray-700'} border font-medium text-xs`}>
                      {question.materias?.nome || 'Geral'}
                    </Badge>
                    {question.status === 'resolvida' && (
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        Resolvida
                      </Badge>
                    )}
                    <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(question.created_at), { 
                        addSuffix: true, 
                        locale: ptBR 
                      })}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-daft-600 transition-colors line-clamp-2">
                    {question.titulo}
                  </h3>
                  
                  {/* Content preview */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {question.conteudo}
                  </p>

                  {/* Stats and actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1 text-gray-500 hover:text-daft-600 transition-colors">
                        <MessageCircle className="h-4 w-4" />
                        <span>{question.respostas_count || 0}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
                        <Heart className="h-4 w-4" />
                        <span>0</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500 hover:text-amber-500 transition-colors">
                        <Award className="h-4 w-4" />
                        <span>+{question.pontos} pts</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-amber-600 transition-colors p-2 h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Implementar bookmark
                        }}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-daft-600 to-blue-600 hover:from-daft-700 hover:to-blue-700 
                                   text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 
                                   transform hover:scale-105 shadow-sm hover:shadow-md text-sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/question/${question.id}`);
                        }}
                      >
                        VER DETALHES
                      </Button>
                    </div>
                  </div>

                  {/* Author info */}
                  <div className="mt-4 pt-3 border-t border-gray-100">
                    <p className="text-xs text-gray-500">
                      Perguntado por <span className="font-medium text-gray-700">
                        {question.profiles?.name || question.profiles?.username || 'Usuário'}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
