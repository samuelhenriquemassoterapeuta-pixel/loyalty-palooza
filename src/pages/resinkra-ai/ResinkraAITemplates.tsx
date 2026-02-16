import { ResinkraAILayout } from "@/components/resinkra-ai/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { FileText, Film, Image, BookOpen, Radio } from "lucide-react";
import { motion } from "framer-motion";

const typeIcons: Record<string, any> = { reels: Film, carousel: Image, stories: BookOpen, live: Radio, post: FileText };

const ResinkraAITemplates = () => {
  const { user } = useAuth();

  const { data: templates = [] } = useQuery({
    queryKey: ["resinkra-templates", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("scripts")
        .select("*")
        .eq("user_id", user!.id)
        .eq("is_template", true)
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  return (
    <ResinkraAILayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <FileText className="w-6 h-6 text-violet-400" /> Templates
        </h1>
        <p className="text-gray-400 text-sm">Roteiros salvos como template para reutilizar.</p>

        {templates.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">Nenhum template salvo ainda.</p>
            <p className="text-gray-500 text-sm mt-1">
              Gere um roteiro e salve como template para reutilizar.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {templates.map((tpl: any, i: number) => {
              const Icon = typeIcons[tpl.content_type] || FileText;
              return (
                <motion.div
                  key={tpl.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={`/resinkra-ai/script/${tpl.id}`}
                    className="block p-4 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/30 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-violet-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{tpl.template_name || tpl.topic}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{tpl.content_type} · Score: {tpl.score_total}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAITemplates;
