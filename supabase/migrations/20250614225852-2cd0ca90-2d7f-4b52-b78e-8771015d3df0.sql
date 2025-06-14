
-- Adiciona as colunas username, user_type, ai_credits e points na tabela profiles
ALTER TABLE public.profiles
  ADD COLUMN username TEXT,
  ADD COLUMN user_type TEXT NOT NULL DEFAULT 'student',
  ADD COLUMN ai_credits INTEGER NOT NULL DEFAULT 10,
  ADD COLUMN points INTEGER NOT NULL DEFAULT 0;

-- Popula a coluna username para usuários existentes que não a possuem
UPDATE public.profiles
SET username = split_part(email, '@', 1) || '_' || substr(md5(random()::text), 1, 4)
WHERE username IS NULL;

-- Adiciona as restrições NOT NULL e UNIQUE para a coluna username
ALTER TABLE public.profiles
  ALTER COLUMN username SET NOT NULL,
  ADD CONSTRAINT profiles_username_key UNIQUE (username);

-- Atualiza a função handle_new_user para popular o username ao criar um novo perfil
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, username)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'name', NEW.email),
    COALESCE(NEW.raw_user_meta_data ->> 'username', split_part(NEW.email, '@', 1) || '_' || substr(md5(random()::text), 1, 4))
  );
  RETURN NEW;
END;
$$;

-- Remove a política que permite que usuários insiram seus próprios perfis,
-- garantindo que a inserção seja feita apenas pelo sistema (via trigger).
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
