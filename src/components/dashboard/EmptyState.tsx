
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function EmptyState() {
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
