// ============================================================
// 🌿 RESINKRA - Componente Admin para Gerenciar Agentes
// ============================================================

import { useState, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Bot, Settings, RefreshCw, Save } from "lucide-react";

interface AgentConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  is_active: boolean;
  system_prompt: string | null;
  keywords: string[];
  priority: number;
}

export function AdminResiAgents() {
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPrompt, setEditingPrompt] = useState<string | null>(null);
  const [promptValue, setPromptValue] = useState("");
  const [stats, setStats] = useState<any[]>([]);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("resi_agents_config" as any)
        .select("*")
        .order("priority", { ascending: true });

      if (error) throw error;
      setAgents((data as any[]) || []);
    } catch (error) {
      console.error("Erro ao carregar agentes:", error);
      toast.error("Erro ao carregar configuração dos agentes");
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const { data, error } = await supabase.rpc("get_resi_stats", { days_back: 7 });
      if (error) throw error;
      setStats((data as any[]) || []);
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error);
    }
  };

  useEffect(() => {
    loadAgents();
    loadStats();
  }, []);

  const toggleAgent = async (agentId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from("resi_agents_config" as any)
        .update({ is_active: isActive } as any)
        .eq("id", agentId);

      if (error) throw error;

      setAgents(prev => prev.map(agent =>
        agent.id === agentId ? { ...agent, is_active: isActive } : agent
      ));

      toast.success(`${isActive ? "Ativado" : "Desativado"} com sucesso!`);
    } catch (error) {
      console.error("Erro ao atualizar agente:", error);
      toast.error("Erro ao atualizar status do agente");
    }
  };

  const savePrompt = async (agentId: string) => {
    try {
      const { error } = await supabase
        .from("resi_agents_config" as any)
        .update({ system_prompt: promptValue } as any)
        .eq("id", agentId);

      if (error) throw error;

      setAgents(prev => prev.map(agent =>
        agent.id === agentId ? { ...agent, system_prompt: promptValue } : agent
      ));

      setEditingPrompt(null);
      toast.success("Prompt atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar prompt:", error);
      toast.error("Erro ao salvar prompt");
    }
  };

  const getAgentStats = (agentId: string) => stats.find(s => s.agent === agentId);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            Agentes Resi
          </h2>
          <p className="text-muted-foreground mt-1">
            Gerencie os agentes de IA da Resinkra
          </p>
        </div>
        <Button variant="outline" onClick={() => { loadAgents(); loadStats(); }}>
          <RefreshCw className="w-4 h-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {/* Grid de Agentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => {
          const agentStats = getAgentStats(agent.id);

          return (
            <Card key={agent.id} className={`transition-all ${!agent.is_active ? "opacity-60" : ""}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{agent.emoji}</span>
                    <div>
                      <CardTitle className="text-lg">{agent.name}</CardTitle>
                      <CardDescription className="text-xs">{agent.description}</CardDescription>
                    </div>
                  </div>
                  <Switch
                    checked={agent.is_active}
                    onCheckedChange={(checked) => toggleAgent(agent.id, checked)}
                  />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={agent.is_active ? "default" : "secondary"}>
                    {agent.is_active ? "🟢 Ativo" : "🔴 Inativo"}
                  </Badge>
                  <Badge variant="outline">Prioridade: {agent.priority}</Badge>
                </div>

                {agentStats && (
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="bg-muted/50 p-2 rounded">
                      <div className="text-muted-foreground text-xs">Conversas (7d)</div>
                      <div className="font-semibold">{agentStats.total_conversations || 0}</div>
                    </div>
                    <div className="bg-muted/50 p-2 rounded">
                      <div className="text-muted-foreground text-xs">Usuários únicos</div>
                      <div className="font-semibold">{agentStats.unique_users || 0}</div>
                    </div>
                  </div>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    setEditingPrompt(agent.id);
                    setPromptValue(agent.system_prompt || "");
                  }}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Configurar Prompt
                </Button>

                {editingPrompt === agent.id && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <Textarea
                      value={promptValue}
                      onChange={(e) => setPromptValue(e.target.value)}
                      placeholder="System prompt customizado (deixe vazio para usar o padrão)"
                      className="min-h-[100px] text-xs"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => savePrompt(agent.id)}>
                        <Save className="w-4 h-4 mr-1" />
                        Salvar
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => setEditingPrompt(null)}>
                        Cancelar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Resumo */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📊 Resumo dos Últimos 7 Dias</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {stats.reduce((acc, s) => acc + (s.total_conversations || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total de Conversas</div>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {stats.reduce((acc, s) => acc + (s.unique_users || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Usuários Únicos</div>
            </div>
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-3xl font-bold text-primary">
                {agents.filter(a => a.is_active).length}
              </div>
              <div className="text-sm text-muted-foreground">Agentes Ativos</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-3xl font-bold text-foreground">
                {agents.length}
              </div>
              <div className="text-sm text-muted-foreground">Total de Agentes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminResiAgents;
