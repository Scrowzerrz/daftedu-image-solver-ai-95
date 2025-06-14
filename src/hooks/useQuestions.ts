
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Question {
  id: string;
  titulo: string;
  conteudo: string;
  pontos: number;
  status: string;
  user_id: string;
  materia_id?: string;
  disciplina_id?: string;
  anexos?: any[];
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string;
    username: string;
    avatar_url?: string;
  };
  materias?: {
    nome: string;
  };
  respostas_count?: number;
}

export interface Answer {
  id: string;
  pergunta_id: string;
  user_id: string;
  conteudo: string;
  pontos: number;
  melhor_resposta: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    name: string;
    username: string;
    avatar_url?: string;
  };
  comentarios?: Comment[];
}

export interface Comment {
  id: string;
  resposta_id: string;
  user_id: string;
  conteudo: string;
  created_at: string;
  profiles?: {
    name: string;
    username: string;
    avatar_url?: string;
  };
}

export const useQuestions = (searchQuery = '', filters = { materia: '', status: '' }) => {
  return useQuery({
    queryKey: ['questions', searchQuery, filters],
    queryFn: async () => {
      let query = supabase
        .from('perguntas')
        .select(`
          *,
          materias (nome)
        `)
        .order('created_at', { ascending: false });

      if (searchQuery) {
        query = query.or(`titulo.ilike.%${searchQuery}%,conteudo.ilike.%${searchQuery}%`);
      }

      if (filters.materia) {
        query = query.eq('materia_id', filters.materia);
      }

      if (filters.status) {
        query = query.eq('status', filters.status);
      }

      const { data: questions, error } = await query;
      
      if (error) throw error;

      // Buscar perfis separadamente para cada pergunta
      const questionsWithProfiles = await Promise.all(
        (questions || []).map(async (question) => {
          if (question.user_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('name, username, avatar_url')
              .eq('id', question.user_id)
              .single();
            
            return {
              ...question,
              profiles: profile || undefined
            } as Question;
          }
          return question as Question;
        })
      );
      
      return questionsWithProfiles;
    },
  });
};

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: ['question', id],
    queryFn: async () => {
      const { data: question, error } = await supabase
        .from('perguntas')
        .select(`
          *,
          materias (nome)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;

      // Buscar perfil do usuário separadamente
      let questionWithProfile = question as Question;
      if (question.user_id) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('name, username, avatar_url')
          .eq('id', question.user_id)
          .single();
        
        questionWithProfile = {
          ...question,
          profiles: profile || undefined
        } as Question;
      }
      
      return questionWithProfile;
    },
    enabled: !!id,
  });
};

export const useAnswers = (questionId: string) => {
  return useQuery({
    queryKey: ['answers', questionId],
    queryFn: async () => {
      const { data: answers, error } = await supabase
        .from('respostas')
        .select(`
          *,
          comentarios (*)
        `)
        .eq('pergunta_id', questionId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;

      // Buscar perfis para respostas e comentários separadamente
      const answersWithProfiles = await Promise.all(
        (answers || []).map(async (answer) => {
          // Buscar perfil do autor da resposta
          let answerProfile = undefined;
          if (answer.user_id) {
            const { data: profile } = await supabase
              .from('profiles')
              .select('name, username, avatar_url')
              .eq('id', answer.user_id)
              .single();
            answerProfile = profile || undefined;
          }

          // Buscar perfis dos autores dos comentários
          const commentsWithProfiles = await Promise.all(
            (answer.comentarios || []).map(async (comment: any) => {
              if (comment.user_id) {
                const { data: profile } = await supabase
                  .from('profiles')
                  .select('name, username, avatar_url')
                  .eq('id', comment.user_id)
                  .single();
                
                return {
                  ...comment,
                  profiles: profile || undefined
                } as Comment;
              }
              return comment as Comment;
            })
          );

          return {
            ...answer,
            profiles: answerProfile,
            comentarios: commentsWithProfiles
          } as Answer;
        })
      );
      
      return answersWithProfiles;
    },
    enabled: !!questionId,
  });
};

export const useCreateAnswer = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ questionId, content }: { questionId: string; content: string }) => {
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('respostas')
        .insert({
          pergunta_id: questionId,
          user_id: user.id,
          conteudo: content,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['answers', variables.questionId] });
    },
  });
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ answerId, content, questionId }: { 
      answerId: string; 
      content: string; 
      questionId: string;
    }) => {
      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await supabase
        .from('comentarios')
        .insert({
          resposta_id: answerId,
          user_id: user.id,
          conteudo: content,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['answers', variables.questionId] });
    },
  });
};
