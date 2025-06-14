
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle } from "lucide-react";
import { subjectColors, difficultyColors } from "./mockData";

interface QuestionBadgesProps {
  subject: string;
  difficulty: string;
  isUrgent: boolean;
  hasAnswer: boolean;
  timeAgo: string;
}

export function QuestionBadges({ subject, difficulty, isUrgent, hasAnswer, timeAgo }: QuestionBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <Badge className={`${subjectColors[subject] || 'bg-gray-100 text-gray-700'} border font-medium text-xs`}>
        {subject}
      </Badge>
      <Badge className={`${difficultyColors[difficulty]} text-xs font-medium`}>
        {difficulty}
      </Badge>
      {isUrgent && (
        <Badge className="bg-red-100 text-red-700 border-red-200 animate-pulse text-xs">
          Urgente
        </Badge>
      )}
      {hasAnswer && (
        <Badge className="bg-green-100 text-green-700 border-green-200 text-xs flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Respondida
        </Badge>
      )}
      <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
        <Clock className="h-3 w-3" />
        {timeAgo}
      </span>
    </div>
  );
}
