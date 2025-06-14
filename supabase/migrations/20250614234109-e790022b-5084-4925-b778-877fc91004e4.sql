
-- Criar tabela de respostas
CREATE TABLE public.respostas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pergunta_id UUID REFERENCES public.perguntas(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conteudo TEXT NOT NULL,
  pontos INTEGER NOT NULL DEFAULT 0,
  melhor_resposta BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de comentários
CREATE TABLE public.comentarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resposta_id UUID REFERENCES public.respostas(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conteudo TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.respostas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comentarios ENABLE ROW LEVEL SECURITY;

-- Políticas para respostas
CREATE POLICY "Usuários podem ver todas as respostas" ON public.respostas
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem criar suas próprias respostas" ON public.respostas
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas próprias respostas" ON public.respostas
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas próprias respostas" ON public.respostas
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas para comentários
CREATE POLICY "Usuários podem ver todos os comentários" ON public.comentarios
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem criar seus próprios comentários" ON public.comentarios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar seus próprios comentários" ON public.comentarios
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar seus próprios comentários" ON public.comentarios
  FOR DELETE USING (auth.uid() = user_id);

-- Criar função para atualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar triggers para atualizar updated_at
CREATE TRIGGER update_respostas_updated_at 
  BEFORE UPDATE ON public.respostas 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Adicionar índices para performance
CREATE INDEX idx_respostas_pergunta_id ON public.respostas(pergunta_id);
CREATE INDEX idx_comentarios_resposta_id ON public.comentarios(resposta_id);
CREATE INDEX idx_respostas_user_id ON public.respostas(user_id);
CREATE INDEX idx_comentarios_user_id ON public.comentarios(user_id);
