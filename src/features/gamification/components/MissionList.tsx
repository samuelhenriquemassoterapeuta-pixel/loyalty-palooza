import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Trophy, CheckCircle, Clock, Loader2 } from 'lucide-react'

interface Mission {
  id: string
  title: string
  description: string
  icon: string
  xp_reward: number
  credits_reward: number
  completed_at: string | null
}

export function MissionList() {
  const [missions, setMissions] = useState<Mission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMissions()
  }, [])

  const loadMissions = async () => {
    setLoading(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const today = new Date().toISOString().split('T')[0]

      // Usar any cast pois as tabelas daily_missions/mission_types são novas (types.ts ainda não atualizado)
      const { data, error } = await (supabase as any)
        .from('daily_missions')
        .select(`
          *,
          mission_types:mission_type_id (
            title,
            description,
            icon,
            xp_reward,
            credits_reward
          )
        `)
        .eq('user_id', user.id)
        .eq('assigned_date', today)

      if (error) {
        console.error('Erro ao carregar missões:', error)
        return
      }

      if (data) {
        const formatted: Mission[] = data.map((m: any) => ({
          id: m.id,
          title: m.mission_types?.title || 'Missão',
          description: m.mission_types?.description || '',
          icon: m.mission_types?.icon || '🎯',
          xp_reward: m.mission_types?.xp_reward || 0,
          credits_reward: m.mission_types?.credits_reward || 0,
          completed_at: m.completed_at,
        }))
        setMissions(formatted)
      }
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        <span className="text-sm">Carregando missões...</span>
      </div>
    )
  }

  if (missions.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <Trophy className="w-10 h-10 mx-auto mb-2 opacity-30" />
        <p className="text-sm">Nenhuma missão disponível hoje.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-primary" />
        <h2 className="font-semibold text-foreground">Missões Diárias</h2>
        <span className="ml-auto text-xs text-muted-foreground">
          {missions.filter(m => m.completed_at).length}/{missions.length} concluídas
        </span>
      </div>

      {missions.map(mission => (
        <div
          key={mission.id}
          className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
            mission.completed_at
              ? 'bg-primary/5 border-primary/20 opacity-70'
              : 'bg-card border-border hover:border-primary/30'
          }`}
        >
          <div className="flex-shrink-0 text-2xl">{mission.icon}</div>

          <div className="flex-1 min-w-0">
            <p className={`font-medium text-sm leading-tight ${mission.completed_at ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {mission.title}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5 truncate">{mission.description}</p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs font-medium text-primary">+{mission.xp_reward} XP</span>
              <span className="text-xs text-muted-foreground">·</span>
              <span className="text-xs font-medium text-primary">+{mission.credits_reward} créditos</span>
            </div>
          </div>

          <div className="flex-shrink-0">
            {mission.completed_at ? (
              <CheckCircle className="w-5 h-5 text-primary" />
            ) : (
              <Clock className="w-5 h-5 text-muted-foreground" />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
