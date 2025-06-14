
import { Card, CardContent } from "@/components/ui/card";
import { User } from "lucide-react";
import { QuestionBadges } from "./QuestionBadges";
import { QuestionStats } from "./QuestionStats";

interface Question {
  id: number;
  title: string;
  content: string;
  subject: string;
  timeAgo: string;
  points: number;
  hasAnswer: boolean;
  answers: number;
  likes: number;
  author: string;
  isUrgent: boolean;
  difficulty: string;
}

interface QuestionCardProps {
  question: Question;
  index: number;
}

export function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <Card 
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
            <QuestionBadges
              subject={question.subject}
              difficulty={question.difficulty}
              isUrgent={question.isUrgent}
              hasAnswer={question.hasAnswer}
              timeAgo={question.timeAgo}
            />

            {/* Title */}
            <h3 className="font-bold text-lg mb-2 text-gray-900 group-hover:text-daft-600 transition-colors line-clamp-2">
              {question.title}
            </h3>
            
            {/* Content preview */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {question.content}
            </p>

            {/* Stats and actions */}
            <QuestionStats
              answers={question.answers}
              likes={question.likes}
              points={question.points}
            />

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
  );
}
