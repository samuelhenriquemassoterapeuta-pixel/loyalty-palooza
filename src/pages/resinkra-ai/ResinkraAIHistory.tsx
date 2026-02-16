import { useState } from "react";
import { ResinkraAILayout } from "@/components/resinkra-ai/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Film, Image, BookOpen, Radio, FileText, Heart, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const typeIcons: Record<string, any> = { reels: Film, carousel: Image, stories: BookOpen, live: Radio, post: FileText };
const typeLabels: Record<string, string> = { reels: "Reels", carousel: "Carrossel", stories: "Stories", live: "Live", post: "Post" };
const typeFilters = ["all", "reels", "carousel", "stories", "live", "post"];

const ResinkraAIHistory = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [favOnly, setFavOnly] = useState(false);

  const { data: scripts = [], isLoading } = useQuery({
    queryKey: ["resinkra-history", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("scripts")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const filtered = scripts.filter((s: any) => {
    if (typeFilter !== "all" && s.content_type !== typeFilter) return false;
    if (favOnly && !s.is_favorite) return false;
    if (search && !s.topic.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <ResinkraAILayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-white">Histórico</h1>

        {/* Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <Input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar por tema..."
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {typeFilters.map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                  typeFilter === t ? "bg-violet-500/20 text-violet-300" : "bg-white/5 text-gray-400 hover:text-gray-200"
                )}
              >
                {t === "all" ? "Todos" : typeLabels[t]}
              </button>
            ))}
            <button
              onClick={() => setFavOnly(!favOnly)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1",
                favOnly ? "bg-amber-500/20 text-amber-300" : "bg-white/5 text-gray-400 hover:text-gray-200"
              )}
            >
              <Heart className="w-3 h-3" /> Favoritos
            </button>
          </div>
        </div>

        {/* List */}
        <div className="space-y-2">
          {filtered.map((script: any, i: number) => {
            const Icon = typeIcons[script.content_type] || FileText;
            return (
              <motion.div
                key={script.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Link
                  to={`/resinkra-ai/script/${script.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-violet-500/30 transition-all group"
                >
                  <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-violet-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{script.topic}</p>
                    <p className="text-xs text-gray-500">
                      {typeLabels[script.content_type]} · {format(new Date(script.created_at), "dd MMM yyyy", { locale: ptBR })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    {script.is_favorite && <Heart className="w-4 h-4 text-amber-400 fill-amber-400" />}
                    <div className="text-right">
                      <span className="text-lg font-bold text-violet-400">{script.score_total}</span>
                      <p className="text-[10px] text-gray-500">score</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
          {!isLoading && filtered.length === 0 && (
            <div className="text-center py-16">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">Nenhum roteiro encontrado</p>
              <Link to="/resinkra-ai/create" className="text-violet-400 text-sm mt-2 inline-block hover:underline">
                Criar primeiro roteiro →
              </Link>
            </div>
          )}
        </div>
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAIHistory;
