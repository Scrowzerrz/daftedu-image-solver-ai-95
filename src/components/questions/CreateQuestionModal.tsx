
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { QuestionFileUpload } from './QuestionFileUpload';
import { useSubjects, useDisciplines } from '@/hooks/useSubjects';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, HelpCircle } from 'lucide-react';

const questionSchema = z.object({
  titulo: z.string()
    .min(10, 'O título deve ter pelo menos 10 caracteres')
    .max(200, 'O título deve ter no máximo 200 caracteres'),
  conteudo: z.string()
    .min(20, 'O conteúdo deve ter pelo menos 20 caracteres')
    .max(2000, 'O conteúdo deve ter no máximo 2000 caracteres'),
  materia_id: z.string().min(1, 'Selecione uma matéria'),
  disciplina_id: z.string().min(1, 'Selecione uma disciplina'),
  pontos: z.number().min(10).max(100),
});

type QuestionFormData = z.infer<typeof questionSchema>;

interface CreateQuestionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateQuestionModal({ open, onOpenChange }: CreateQuestionModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('');

  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: disciplines, isLoading: disciplinesLoading } = useDisciplines(selectedSubject);

  const form = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      titulo: '',
      conteudo: '',
      materia_id: '',
      disciplina_id: '',
      pontos: 50,
    },
  });

  const watchedTitle = form.watch('titulo');
  const watchedContent = form.watch('conteudo');
  const watchedPoints = form.watch('pontos');

  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    form.setValue('materia_id', value);
    form.setValue('disciplina_id', '');
  };

  const uploadFiles = async (): Promise<string[]> => {
    if (uploadedFiles.length === 0) return [];

    const uploadPromises = uploadedFiles.map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from('question-attachments')
        .upload(fileName, file);

      if (error) throw error;
      return fileName;
    });

    return Promise.all(uploadPromises);
  };

  const onSubmit = async (data: QuestionFormData) => {
    if (!user) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para criar uma pergunta.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Upload files first
      const attachmentPaths = await uploadFiles();
      
      // Create question
      const { error } = await supabase
        .from('perguntas')
        .insert({
          titulo: data.titulo,
          conteudo: data.conteudo,
          pontos: data.pontos,
          materia_id: data.materia_id,
          disciplina_id: data.disciplina_id,
          user_id: user.id,
          anexos: attachmentPaths,
        });

      if (error) throw error;

      toast({
        title: "Pergunta criada!",
        description: "Sua pergunta foi publicada com sucesso.",
      });

      // Reset form and close modal
      form.reset();
      setUploadedFiles([]);
      setSelectedSubject('');
      onOpenChange(false);

    } catch (error) {
      console.error('Error creating question:', error);
      toast({
        title: "Erro",
        description: "Erro ao criar pergunta. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-daft-600">
            Criar Nova Pergunta
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Título da Pergunta */}
            <FormField
              control={form.control}
              name="titulo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Título da Pergunta</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Digite um título claro e específico para sua pergunta..."
                      className="text-base"
                    />
                  </FormControl>
                  <div className="flex justify-between text-sm text-gray-500">
                    <FormMessage />
                    <span>{watchedTitle.length}/200 caracteres</span>
                  </div>
                </FormItem>
              )}
            />

            {/* Conteúdo da Pergunta */}
            <FormField
              control={form.control}
              name="conteudo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Conteúdo da Pergunta</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Descreva sua pergunta em detalhes. Seja específico sobre o que você precisa de ajuda..."
                      className="min-h-[120px] text-base resize-none"
                    />
                  </FormControl>
                  <div className="flex justify-between text-sm text-gray-500">
                    <FormMessage />
                    <span>{watchedContent.length}/2000 caracteres</span>
                  </div>
                </FormItem>
              )}
            />

            {/* Seletores de Matéria e Disciplina */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="materia_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Matéria</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={handleSubjectChange}
                      disabled={subjectsLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma matéria" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects?.map((subject) => (
                          <SelectItem key={subject.id} value={subject.id}>
                            {subject.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="disciplina_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-semibold">Disciplina</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={!selectedSubject || disciplinesLoading}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma disciplina" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {disciplines?.map((discipline) => (
                          <SelectItem key={discipline.id} value={discipline.id}>
                            {discipline.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Pontos da Pergunta */}
            <FormField
              control={form.control}
              name="pontos"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold flex items-center gap-2">
                    Pontos da Pergunta
                    <HelpCircle className="h-4 w-4 text-gray-400" />
                  </FormLabel>
                  <div className="space-y-4">
                    <div className="px-4 py-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        Os pontos serão divididos entre as melhores respostas. Perguntas com mais pontos 
                        tendem a receber respostas mais detalhadas.
                      </p>
                    </div>
                    <div className="space-y-3">
                      <Slider
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                        min={10}
                        max={100}
                        step={10}
                        className="w-full"
                      />
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">10 pontos</span>
                        <div className="text-center">
                          <span className="text-2xl font-bold text-daft-600">{watchedPoints}</span>
                          <span className="text-sm text-gray-500 ml-1">pontos</span>
                        </div>
                        <span className="text-sm text-gray-500">100 pontos</span>
                      </div>
                    </div>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Upload de Arquivos */}
            <div className="space-y-2">
              <label className="text-lg font-semibold">Anexar Arquivos (Opcional)</label>
              <QuestionFileUpload
                files={uploadedFiles}
                onFilesChange={setUploadedFiles}
              />
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-daft-600 to-blue-600 hover:from-daft-700 hover:to-blue-700"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Criando...
                  </>
                ) : (
                  'Criar Pergunta'
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
