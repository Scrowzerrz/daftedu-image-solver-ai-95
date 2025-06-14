
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export function NewQuestionButton() {
  const handleNewQuestion = () => {
    // TODO: Implementar modal ou página para nova pergunta
    console.log("Nova pergunta");
  };

  return (
    <Button 
      onClick={handleNewQuestion}
      className="bg-daft-600 hover:bg-daft-700 text-white h-12 px-6"
    >
      <Plus className="h-4 w-4 mr-2" />
      <span className="hidden sm:inline">Nova Pergunta</span>
      <span className="sm:hidden">Nova</span>
    </Button>
  );
}
