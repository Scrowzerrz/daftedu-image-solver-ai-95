
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
          profiles:user_id (name, username, avatar_url),
          materias:materia_id (nome)
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

      const { data, error } = await query;
      
      if (error) throw error;
      return data as Question[];
    },
  });
};

export const useQuestion = (id: string) => {
  return useQuery({
    queryKey: ['question', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('perguntas')
        .select(`
          *,
          profiles:user_id (name, username, avatar_url),
          materias:materia_id (nome)
        `)
        .eq('id', id)
        .single();
      
      if (error) throw error;
      return data as Question;
    },
    enabled: !!id,
  });
};

export const useAnswers = (questionId: string) => {
  return useQuery({
    queryKey: ['answers', questionId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('respostas')
        .select(`
          *,
          profiles:user_id (name, username, avatar_url),
          comentarios:comentarios (
            *,
            profiles:user_id (name, username, avatar_url)
          )
        `)
        .eq('pergunta_id', questionId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Answer[];
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
