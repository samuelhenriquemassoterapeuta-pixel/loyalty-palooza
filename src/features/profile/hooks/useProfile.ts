import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Profile {
  id: string;
  nome: string | null;
  telefone: string | null;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export const useProfile = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;
      setProfile(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<Pick<Profile, "nome" | "telefone" | "avatar_url">>) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const { error } = await supabase
        .from("profiles")
        .update(updates)
        .eq("id", user.id);

      if (error) throw error;
      
      await fetchProfile();
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  // Allowed image types and size limit for avatar uploads
  const ALLOWED_AVATAR_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB

  // Map MIME types to file extensions
  const MIME_TO_EXT: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png', 
    'image/webp': 'webp',
    'image/gif': 'gif',
  };

  const uploadAvatar = async (file: File) => {
    if (!user) return { error: new Error("Usuário não autenticado"), url: null };

    // Client-side validation (defense in depth - server also validates)
    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      return { 
        error: new Error("Formato não suportado. Use JPG, PNG, WEBP ou GIF."), 
        url: null 
      };
    }

    if (file.size > MAX_AVATAR_SIZE) {
      return { 
        error: new Error("Arquivo muito grande. Máximo: 5MB."), 
        url: null 
      };
    }

    try {
      // Use MIME type to determine extension (prevents extension spoofing)
      const fileExt = MIME_TO_EXT[file.type] || 'jpg';
      const fileName = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      await updateProfile({ avatar_url: publicUrl });
      
      return { error: null, url: publicUrl };
    } catch (err: any) {
      return { error: err, url: null };
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  return {
    profile,
    loading,
    error,
    updateProfile,
    uploadAvatar,
    refetch: fetchProfile,
  };
};
