import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email é obrigatório" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Buscar usuário pelo email no auth.users
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();

    if (authError) {
      throw authError;
    }

    const foundUser = authData.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

    if (!foundUser) {
      return new Response(
        JSON.stringify({ error: "Usuário não encontrado", user: null }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Buscar perfil do usuário
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("nome")
      .eq("id", foundUser.id)
      .single();

    return new Response(
      JSON.stringify({
        user: {
          id: foundUser.id,
          nome: profile?.nome || null,
        }
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return new Response(
      JSON.stringify({ error: "Erro interno do servidor" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
