
import { Button } from "@/components/ui/button";
import { MessageCircle, Heart, Award, Bookmark } from "lucide-react";

interface QuestionStatsProps {
  answers: number;
  likes: number;
  points: number;
}

export function QuestionStats({ answers, likes, points }: QuestionStatsProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 text-sm">
        <div className="flex items-center gap-1 text-gray-500 hover:text-daft-600 transition-colors">
          <MessageCircle className="h-4 w-4" />
          <span>{answers}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors cursor-pointer">
          <Heart className="h-4 w-4" />
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-1 text-gray-500 hover:text-amber-500 transition-colors">
          <Award className="h-4 w-4" />
          <span>+{points} pts</span>
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
  );
}
