
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CreateQuestionModal } from '@/components/questions/CreateQuestionModal';

export function NewQuestionButton() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setModalOpen(true)}
        className="bg-gradient-to-r from-daft-600 to-blue-600 hover:from-daft-700 hover:to-blue-700 
                   text-white h-12 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg 
                   transition-all duration-300 transform hover:scale-[1.02] border-0"
      >
        <Plus className="h-5 w-5 mr-2" />
        <span className="hidden sm:inline">Nova Pergunta</span>
        <span className="sm:hidden">Nova</span>
      </Button>
      
      <CreateQuestionModal 
        open={modalOpen} 
        onOpenChange={setModalOpen} 
      />
    </>
  );
}
