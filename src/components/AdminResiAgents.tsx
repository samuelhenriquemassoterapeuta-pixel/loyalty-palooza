import React, { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Bot, RefreshCw } from 'lucide-react';

interface AgentConfig {
  id: string;
  name: string;
  description: string;
  emoji: string;
  is_active: boolean;
  priority: number;
}

export function AdminResiAgents() {
  const [agents, setAgents] = useState<AgentConfig[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAgents = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resi_agents_config')
        .select('*')
        .order('priority', { ascending: true });

      if (error) throw error;
      setAgents((data as AgentConfig[]) || []);
    } catch (error) {
      console.error('Erro ao carregar agentes:', error);
      toast.error('Erro ao carregar configuração dos agentes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAgents();
  }, []);

  const toggleAgent = async (agentId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('resi_agents_config')
        .update({ is_active: isActive, updated_at: new Date().toISOString() })
        .eq('id', agentId);

      if (error) throw error;

      setAgents(prev =>
        prev.map(agent =>
          agent.id === agentId ? { ...agent, is_active: isActive } : agent
        )
      );

      toast.success(`Agente ${isActive ? 'ativado' : 'desativado'} com sucesso!`);
    } catch (error) {
      console.error('Erro ao atualizar agente:', error);
      toast.error('Erro ao atualizar status do agente');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <RefreshCw className="w-6 h-6 animate-spin text-green-600" />
      </div>
    );
  }

  const activeCount = agents.filter(a => a.is_active).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Bot className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-lg">Agentes Resi</CardTitle>
                <CardDescription>Gerencie os agentes de IA da Resinkra</CardDescription>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={loadAgents} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Agents list */}
      <div className="grid gap-3">
        {agents.map((agent) => (
          <Card key={agent.id} className={`transition-all ${agent.is_active ? 'border-green-200 bg-green-50/30' : 'opacity-70'}`}>
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{agent.emoji}</span>
                  <div>
                    <div className="font-semibold text-sm">{agent.name}</div>
                    <div className="text-xs text-muted-foreground">{agent.description}</div>
                  </div>
                </div>
                <Switch
                  checked={agent.is_active}
                  onCheckedChange={(checked) => toggleAgent(agent.id, checked)}
                />
              </div>

              <div className="flex items-center gap-2 mt-3">
                <Badge
                  variant={agent.is_active ? 'default' : 'secondary'}
                  className={agent.is_active ? 'bg-green-600 text-white' : ''}
                >
                  {agent.is_active ? '🟢 Ativo' : '🔴 Inativo'}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Prioridade: {agent.priority}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">📊 Resumo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{activeCount}</div>
              <div className="text-xs text-muted-foreground">Agentes Ativos</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-gray-700">{agents.length}</div>
              <div className="text-xs text-muted-foreground">Total de Agentes</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminResiAgents;
