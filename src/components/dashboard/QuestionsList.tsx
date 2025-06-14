
import { QuestionCard } from "./QuestionCard";
import { EmptyState } from "./EmptyState";
import { mockQuestions } from "./mockData";

interface QuestionsListProps {
  searchQuery: string;
  filters: {
    materia: string;
    status: string;
    nivel: string;
  };
}

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
          <QuestionCard
            key={question.id}
            question={question}
            index={index}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredQuestions.length === 0 && <EmptyState />}
    </div>
  );
}
