
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function NewQuestionButton() {
  const handleNewQuestion = () => {
    console.log("Nova pergunta");
  };

  return (
    <Button 
      onClick={handleNewQuestion}
      className="bg-gradient-to-r from-daft-600 to-blue-600 hover:from-daft-700 hover:to-blue-700 
                 text-white h-14 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl 
                 transition-all duration-300 transform hover:scale-105"
    >
      <Plus className="h-5 w-5 mr-2" />
      <span className="hidden sm:inline">Nova Pergunta</span>
      <span className="sm:hidden">Nova</span>
    </Button>
  );
}
