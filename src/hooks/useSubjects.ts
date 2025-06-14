
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface Subject {
  id: string;
  nome: string;
  descricao?: string;
}

export interface Discipline {
  id: string;
  nome: string;
  materia_id: string;
}

export const useSubjects = () => {
  return useQuery({
    queryKey: ['subjects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('materias')
        .select('*')
        .order('nome');
      
      if (error) throw error;
      return data as Subject[];
    },
  });
};

export const useDisciplines = (subjectId?: string) => {
  return useQuery({
    queryKey: ['disciplines', subjectId],
    queryFn: async () => {
      if (!subjectId) return [];
      
      const { data, error } = await supabase
        .from('disciplinas')
        .select('*')
        .eq('materia_id', subjectId)
        .order('nome');
      
      if (error) throw error;
      return data as Discipline[];
    },
    enabled: !!subjectId,
  });
};
