import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bell, Mail, MessageSquare, Smartphone, Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { toast } from "sonner";

interface Prefs {
  notif_push: boolean;
  notif_email: boolean;
  notif_whatsapp: boolean;
}

export const NotificationPreferences = () => {
  const { user } = useAuth();
  const { isSupported, isSubscribed, permission, subscribe, unsubscribe, loading: pushLoading } = usePushNotifications();
  const [prefs, setPrefs] = useState<Prefs>({ notif_push: true, notif_email: true, notif_whatsapp: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchPrefs = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("notif_push, notif_email, notif_whatsapp")
        .eq("id", user.id)
        .maybeSingle();
      if (data) setPrefs(data as Prefs);
      setLoading(false);
    };
    fetchPrefs();
  }, [user]);

  const updatePref = async (key: keyof Prefs, value: boolean) => {
    if (!user) return;
    setSaving(true);
    const newPrefs = { ...prefs, [key]: value };
    setPrefs(newPrefs);

    const { error } = await supabase
      .from("profiles")
      .update({ [key]: value })
      .eq("id", user.id);

    if (error) {
      toast.error("Erro ao salvar preferência");
      setPrefs(prefs); // revert
    }

    // Handle push subscription
    if (key === "notif_push") {
      if (value && !isSubscribed) {
        await subscribe();
      } else if (!value && isSubscribed) {
        await unsubscribe();
      }
    }

    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="animate-spin text-muted-foreground" size={24} />
      </div>
    );
  }

  const channels = [
    {
      key: "notif_push" as keyof Prefs,
      icon: Smartphone,
      label: "Push (navegador)",
      desc: isSupported
        ? permission === "denied"
          ? "Bloqueado pelo navegador — libere nas configurações"
          : "Receba alertas mesmo fora do app"
        : "Não suportado neste navegador",
      disabled: !isSupported || permission === "denied",
    },
    {
      key: "notif_email" as keyof Prefs,
      icon: Mail,
      label: "E-mail",
      desc: "Lembretes e promoções por email",
      disabled: false,
    },
    {
      key: "notif_whatsapp" as keyof Prefs,
      icon: MessageSquare,
      label: "WhatsApp",
      desc: "Lembretes de agendamento e cashback",
      disabled: false,
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Bell size={20} className="text-primary" />
        <h3 className="text-base font-semibold text-foreground">Canais de Notificação</h3>
      </div>

      {channels.map((ch, i) => {
        const Icon = ch.icon;
        return (
          <motion.div
            key={ch.key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-center justify-between p-3 rounded-xl bg-card border"
          >
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon size={18} className="text-primary" />
              </div>
              <div>
                <Label className="text-sm font-medium">{ch.label}</Label>
                <p className="text-xs text-muted-foreground">{ch.desc}</p>
              </div>
            </div>
            <Switch
              checked={prefs[ch.key]}
              onCheckedChange={(val) => updatePref(ch.key, val)}
              disabled={ch.disabled || saving || pushLoading}
            />
          </motion.div>
        );
      })}
    </div>
  );
};
