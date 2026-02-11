import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Link2, Unlink, Loader2, ShieldCheck } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface IdentityInfo {
  id: string;
  provider: string;
  identity_id: string;
  created_at: string;
  last_sign_in_at: string;
  identity_data?: Record<string, unknown>;
}

const providerConfig: Record<string, { label: string; icon: JSX.Element; color: string }> = {
  google: {
    label: "Google",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    ),
    color: "border-blue-200 dark:border-blue-800",
  },
  apple: {
    label: "Apple",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
      </svg>
    ),
    color: "border-gray-200 dark:border-gray-700",
  },
  email: {
    label: "Email/Senha",
    icon: <ShieldCheck className="w-5 h-5 text-primary" />,
    color: "border-primary/20",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

const ContaConfiguracoes = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [identities, setIdentities] = useState<IdentityInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkingProvider, setLinkingProvider] = useState<string | null>(null);
  const [unlinkTarget, setUnlinkTarget] = useState<IdentityInfo | null>(null);
  const [unlinking, setUnlinking] = useState(false);

  const fetchIdentities = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.getUser();
    if (!error && data.user?.identities) {
      setIdentities(data.user.identities as unknown as IdentityInfo[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchIdentities();
  }, []);

  const handleLink = async (provider: "google" | "apple") => {
    setLinkingProvider(provider);
    try {
      const { error } = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin + "/conta",
      });
      if (error) {
        toast.error(`Erro ao vincular conta ${providerConfig[provider].label}.`);
      }
    } catch {
      toast.error("Erro ao conectar. Tente novamente.");
    } finally {
      setLinkingProvider(null);
    }
  };

  const handleUnlink = async () => {
    if (!unlinkTarget) return;
    setUnlinking(true);
    try {
      const { error } = await supabase.auth.unlinkIdentity({
        id: unlinkTarget.id,
        provider: unlinkTarget.provider,
        identity_id: unlinkTarget.identity_id,
        created_at: unlinkTarget.created_at,
        last_sign_in_at: unlinkTarget.last_sign_in_at,
        updated_at: unlinkTarget.last_sign_in_at,
        identity_data: (unlinkTarget.identity_data || {}) as Record<string, unknown>,
      } as any);
      if (error) {
        toast.error(error.message || "Erro ao desvincular conta.");
      } else {
        toast.success(`Conta ${providerConfig[unlinkTarget.provider]?.label || unlinkTarget.provider} desvinculada.`);
        await fetchIdentities();
      }
    } catch {
      toast.error("Erro ao desvincular. Tente novamente.");
    } finally {
      setUnlinking(false);
      setUnlinkTarget(null);
    }
  };

  const linkedProviders = identities.map((i) => i.provider);
  const availableProviders = ["google", "apple"].filter((p) => !linkedProviders.includes(p));
  const canUnlink = identities.length > 1;

  const getProviderEmail = (identity: IdentityInfo) => {
    const data = identity.identity_data as Record<string, unknown> | undefined;
    return (data?.email as string) || "";
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-2xl mx-auto px-4 lg:px-8 safe-top pt-4 space-y-6">
          {/* Header */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex items-center gap-3"
          >
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl glass-card-strong">
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Configurações da Conta</h1>
              <p className="text-sm text-muted-foreground">Gerencie suas contas vinculadas</p>
            </div>
          </motion.div>

          {/* Linked accounts */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.1 }}
            className="space-y-3"
          >
            <p className="section-label px-1">Contas vinculadas</p>

            {loading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            ) : identities.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Nenhuma conta vinculada encontrada.
              </p>
            ) : (
              <div className="space-y-2.5">
                {identities.map((identity) => {
                  const config = providerConfig[identity.provider] || {
                    label: identity.provider,
                    icon: <ShieldCheck className="w-5 h-5" />,
                    color: "border-muted",
                  };
                  const email = getProviderEmail(identity);

                  return (
                    <div
                      key={identity.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl glass-card-strong border ${config.color}`}
                    >
                      <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
                        {config.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">{config.label}</p>
                        {email && (
                          <p className="text-xs text-muted-foreground truncate">{email}</p>
                        )}
                      </div>
                      {canUnlink && identity.provider !== "email" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setUnlinkTarget(identity)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10 gap-1.5"
                        >
                          <Unlink size={16} />
                          <span className="hidden sm:inline">Desvincular</span>
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>

          {/* Link new account */}
          {availableProviders.length > 0 && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <p className="section-label px-1">Vincular nova conta</p>
              <div className="space-y-2.5">
                {availableProviders.map((provider) => {
                  const config = providerConfig[provider];
                  const isLinking = linkingProvider === provider;

                  return (
                    <Button
                      key={provider}
                      variant="outline"
                      onClick={() => handleLink(provider as "google" | "apple")}
                      disabled={isLinking}
                      className={`w-full h-14 justify-start gap-4 rounded-2xl border ${config.color}`}
                    >
                      {isLinking ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        config.icon
                      )}
                      <div className="flex-1 text-left">
                        <p className="font-medium">Vincular {config.label}</p>
                      </div>
                      <Link2 size={16} className="text-muted-foreground" />
                    </Button>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Info */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="p-4 rounded-2xl bg-muted/50 border border-border"
          >
            <p className="text-xs text-muted-foreground leading-relaxed">
              💡 Vincular contas sociais permite que você faça login de diferentes formas.
              Você precisa manter pelo menos uma conta vinculada para acessar o app.
            </p>
          </motion.div>
        </div>
      </div>

      <ConfirmDialog
        open={!!unlinkTarget}
        onOpenChange={(open) => !open && setUnlinkTarget(null)}
        title="Desvincular conta"
        description={`Tem certeza que deseja desvincular sua conta ${providerConfig[unlinkTarget?.provider || ""]?.label || ""}? Você não poderá mais usá-la para fazer login.`}
        onConfirm={handleUnlink}
        variant="destructive"
      />
    </AppLayout>
  );
};

export default ContaConfiguracoes;
