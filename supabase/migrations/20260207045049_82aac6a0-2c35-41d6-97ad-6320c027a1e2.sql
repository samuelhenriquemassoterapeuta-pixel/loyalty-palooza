-- Drop existing FK to auth.users and create one to profiles
ALTER TABLE public.pedidos DROP CONSTRAINT pedidos_user_id_fkey;

ALTER TABLE public.pedidos
ADD CONSTRAINT pedidos_user_id_profiles_fkey
FOREIGN KEY (user_id) REFERENCES public.profiles(id);