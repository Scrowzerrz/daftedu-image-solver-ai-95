
-- Criar tabela de matérias
CREATE TABLE public.materias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL UNIQUE,
  descricao TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de disciplinas
CREATE TABLE public.disciplinas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  materia_id UUID REFERENCES public.materias(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(nome, materia_id)
);

-- Criar tabela de perguntas
CREATE TABLE public.perguntas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  conteudo TEXT NOT NULL,
  pontos INTEGER NOT NULL DEFAULT 10,
  materia_id UUID REFERENCES public.materias(id),
  disciplina_id UUID REFERENCES public.disciplinas(id),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  anexos JSONB DEFAULT '[]'::jsonb,
  status TEXT DEFAULT 'ativa',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.materias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.disciplinas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.perguntas ENABLE ROW LEVEL SECURITY;

-- Políticas para matérias (públicas para leitura)
CREATE POLICY "Matérias são públicas para leitura" ON public.materias
  FOR SELECT USING (true);

-- Políticas para disciplinas (públicas para leitura)
CREATE POLICY "Disciplinas são públicas para leitura" ON public.disciplinas
  FOR SELECT USING (true);

-- Políticas para perguntas
CREATE POLICY "Usuários podem ver todas as perguntas" ON public.perguntas
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem criar suas próprias perguntas" ON public.perguntas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias perguntas" ON public.perguntas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias perguntas" ON public.perguntas
  FOR DELETE USING (auth.uid() = user_id);

-- Inserir algumas matérias e disciplinas de exemplo
INSERT INTO public.materias (nome, descricao) VALUES
  ('Matemática', 'Ciências exatas e cálculos'),
  ('Física', 'Ciências naturais e fenômenos físicos'),
  ('Química', 'Ciências naturais e transformações da matéria'),
  ('Biologia', 'Ciências da vida'),
  ('História', 'Ciências humanas e eventos históricos'),
  ('Geografia', 'Ciências da Terra e sociedade'),
  ('Português', 'Língua portuguesa e literatura'),
  ('Inglês', 'Língua inglesa'),
  ('Programação', 'Ciência da computação');

INSERT INTO public.disciplinas (nome, materia_id) VALUES
  ('Álgebra', (SELECT id FROM public.materias WHERE nome = 'Matemática')),
  ('Geometria', (SELECT id FROM public.materias WHERE nome = 'Matemática')),
  ('Cálculo', (SELECT id FROM public.materias WHERE nome = 'Matemática')),
  ('Mecânica', (SELECT id FROM public.materias WHERE nome = 'Física')),
  ('Termodinâmica', (SELECT id FROM public.materias WHERE nome = 'Física')),
  ('Eletromagnetismo', (SELECT id FROM public.materias WHERE nome = 'Física')),
  ('Química Orgânica', (SELECT id FROM public.materias WHERE nome = 'Química')),
  ('Química Inorgânica', (SELECT id FROM public.materias WHERE nome = 'Química')),
  ('Genética', (SELECT id FROM public.materias WHERE nome = 'Biologia')),
  ('Ecologia', (SELECT id FROM public.materias WHERE nome = 'Biologia')),
  ('História do Brasil', (SELECT id FROM public.materias WHERE nome = 'História')),
  ('História Geral', (SELECT id FROM public.materias WHERE nome = 'História')),
  ('Geografia Física', (SELECT id FROM public.materias WHERE nome = 'Geografia')),
  ('Geografia Humana', (SELECT id FROM public.materias WHERE nome = 'Geografia')),
  ('Gramática', (SELECT id FROM public.materias WHERE nome = 'Português')),
  ('Literatura', (SELECT id FROM public.materias WHERE nome = 'Português')),
  ('Grammar', (SELECT id FROM public.materias WHERE nome = 'Inglês')),
  ('Vocabulary', (SELECT id FROM public.materias WHERE nome = 'Inglês')),
  ('JavaScript', (SELECT id FROM public.materias WHERE nome = 'Programação')),
  ('Python', (SELECT id FROM public.materias WHERE nome = 'Programação')),
  ('React', (SELECT id FROM public.materias WHERE nome = 'Programação'));

-- Criar bucket de storage para anexos das perguntas
INSERT INTO storage.buckets (id, name, public) VALUES ('question-attachments', 'question-attachments', true);

-- Política de storage para anexos
CREATE POLICY "Usuários podem fazer upload de anexos" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'question-attachments' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Anexos são públicos para visualização" ON storage.objects
  FOR SELECT USING (bucket_id = 'question-attachments');

CREATE POLICY "Usuários podem deletar seus próprios anexos" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'question-attachments' AND
    auth.uid()::text = (storage.foldername(name))[1]
  );
