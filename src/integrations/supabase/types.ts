export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      agendamentos: {
        Row: {
          created_at: string
          data_hora: string
          id: string
          observacoes: string | null
          servico: string
          status: string
          terapeuta_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          data_hora: string
          id?: string
          observacoes?: string | null
          servico: string
          status?: string
          terapeuta_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          data_hora?: string
          id?: string
          observacoes?: string | null
          servico?: string
          status?: string
          terapeuta_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agendamentos_terapeuta_id_fkey"
            columns: ["terapeuta_id"]
            isOneToOne: false
            referencedRelation: "terapeutas"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          created_at: string
          id: string
          ip_address: string | null
          new_data: Json | null
          old_data: Json | null
          operation: string
          record_id: string
          table_name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          record_id: string
          table_name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          ip_address?: string | null
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          record_id?: string
          table_name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      avaliacoes: {
        Row: {
          agendamento_id: string | null
          comentario: string | null
          created_at: string
          id: string
          nota: number
          produto_id: string | null
          user_id: string
        }
        Insert: {
          agendamento_id?: string | null
          comentario?: string | null
          created_at?: string
          id?: string
          nota: number
          produto_id?: string | null
          user_id: string
        }
        Update: {
          agendamento_id?: string | null
          comentario?: string | null
          created_at?: string
          id?: string
          nota?: number
          produto_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "avaliacoes_agendamento_id_fkey"
            columns: ["agendamento_id"]
            isOneToOne: false
            referencedRelation: "agendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "avaliacoes_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      exercicios_alongamento: {
        Row: {
          categoria: string
          created_at: string
          descricao: string | null
          disponivel: boolean | null
          duracao_segundos: number
          id: string
          imagem_url: string | null
          instrucoes: string | null
          musculos_alvo: string | null
          nivel: string
          nome: string
          repeticoes: number | null
          video_url: string | null
        }
        Insert: {
          categoria?: string
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao_segundos?: number
          id?: string
          imagem_url?: string | null
          instrucoes?: string | null
          musculos_alvo?: string | null
          nivel?: string
          nome: string
          repeticoes?: number | null
          video_url?: string | null
        }
        Update: {
          categoria?: string
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao_segundos?: number
          id?: string
          imagem_url?: string | null
          instrucoes?: string | null
          musculos_alvo?: string | null
          nivel?: string
          nome?: string
          repeticoes?: number | null
          video_url?: string | null
        }
        Relationships: []
      }
      favoritos: {
        Row: {
          created_at: string
          id: string
          produto_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          produto_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          produto_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favoritos_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      fichas_acompanhamento: {
        Row: {
          created_at: string
          data: string
          gordura_corporal: number | null
          id: string
          imc: number | null
          medida_braco: number | null
          medida_cintura: number | null
          medida_coxa: number | null
          medida_quadril: number | null
          medida_torax: number | null
          observacoes: string | null
          peso: number | null
          protocolo_usuario_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: string
          gordura_corporal?: number | null
          id?: string
          imc?: number | null
          medida_braco?: number | null
          medida_cintura?: number | null
          medida_coxa?: number | null
          medida_quadril?: number | null
          medida_torax?: number | null
          observacoes?: string | null
          peso?: number | null
          protocolo_usuario_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: string
          gordura_corporal?: number | null
          id?: string
          imc?: number | null
          medida_braco?: number | null
          medida_cintura?: number | null
          medida_coxa?: number | null
          medida_quadril?: number | null
          medida_torax?: number | null
          observacoes?: string | null
          peso?: number | null
          protocolo_usuario_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fichas_acompanhamento_protocolo_usuario_id_fkey"
            columns: ["protocolo_usuario_id"]
            isOneToOne: false
            referencedRelation: "usuario_protocolos"
            referencedColumns: ["id"]
          },
        ]
      }
      fotos_evolucao: {
        Row: {
          created_at: string
          data: string
          foto_url: string
          id: string
          observacoes: string | null
          protocolo_usuario_id: string
          tipo: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: string
          foto_url: string
          id?: string
          observacoes?: string | null
          protocolo_usuario_id: string
          tipo?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data?: string
          foto_url?: string
          id?: string
          observacoes?: string | null
          protocolo_usuario_id?: string
          tipo?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fotos_evolucao_protocolo_usuario_id_fkey"
            columns: ["protocolo_usuario_id"]
            isOneToOne: false
            referencedRelation: "usuario_protocolos"
            referencedColumns: ["id"]
          },
        ]
      }
      indicacoes: {
        Row: {
          cashback_valor: number
          created_at: string
          id: string
          indicado_id: string
          indicador_id: string
          processado_at: string | null
          status: string
        }
        Insert: {
          cashback_valor?: number
          created_at?: string
          id?: string
          indicado_id: string
          indicador_id: string
          processado_at?: string | null
          status?: string
        }
        Update: {
          cashback_valor?: number
          created_at?: string
          id?: string
          indicado_id?: string
          indicador_id?: string
          processado_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "indicacoes_indicado_id_fkey"
            columns: ["indicado_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "indicacoes_indicador_id_fkey"
            columns: ["indicador_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      login_attempts: {
        Row: {
          attempted_at: string
          email: string
          id: string
          ip_address: string | null
          success: boolean
        }
        Insert: {
          attempted_at?: string
          email: string
          id?: string
          ip_address?: string | null
          success?: boolean
        }
        Update: {
          attempted_at?: string
          email?: string
          id?: string
          ip_address?: string | null
          success?: boolean
        }
        Relationships: []
      }
      metas_semanais: {
        Row: {
          concluida: boolean
          created_at: string
          data_conclusao: string | null
          descricao: string
          id: string
          meta_valor: string | null
          protocolo_usuario_id: string
          semana_numero: number
          user_id: string
        }
        Insert: {
          concluida?: boolean
          created_at?: string
          data_conclusao?: string | null
          descricao: string
          id?: string
          meta_valor?: string | null
          protocolo_usuario_id: string
          semana_numero?: number
          user_id: string
        }
        Update: {
          concluida?: boolean
          created_at?: string
          data_conclusao?: string | null
          descricao?: string
          id?: string
          meta_valor?: string | null
          protocolo_usuario_id?: string
          semana_numero?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "metas_semanais_protocolo_usuario_id_fkey"
            columns: ["protocolo_usuario_id"]
            isOneToOne: false
            referencedRelation: "usuario_protocolos"
            referencedColumns: ["id"]
          },
        ]
      }
      notificacoes: {
        Row: {
          created_at: string
          id: string
          lida: boolean | null
          mensagem: string
          tipo: string
          titulo: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          lida?: boolean | null
          mensagem: string
          tipo?: string
          titulo: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          lida?: boolean | null
          mensagem?: string
          tipo?: string
          titulo?: string
          user_id?: string
        }
        Relationships: []
      }
      pacotes: {
        Row: {
          created_at: string
          descricao: string | null
          disponivel: boolean | null
          id: string
          nome: string
          preco: number
          preco_original: number | null
          total_sessoes: number
          validade_dias: number | null
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          id?: string
          nome: string
          preco: number
          preco_original?: number | null
          total_sessoes: number
          validade_dias?: number | null
        }
        Update: {
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          id?: string
          nome?: string
          preco?: number
          preco_original?: number | null
          total_sessoes?: number
          validade_dias?: number | null
        }
        Relationships: []
      }
      pacotes_usuario: {
        Row: {
          data_compra: string
          data_validade: string
          id: string
          pacote_id: string
          sessoes_usadas: number | null
          status: string | null
          user_id: string
        }
        Insert: {
          data_compra?: string
          data_validade: string
          id?: string
          pacote_id: string
          sessoes_usadas?: number | null
          status?: string | null
          user_id: string
        }
        Update: {
          data_compra?: string
          data_validade?: string
          id?: string
          pacote_id?: string
          sessoes_usadas?: number | null
          status?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pacotes_usuario_pacote_id_fkey"
            columns: ["pacote_id"]
            isOneToOne: false
            referencedRelation: "pacotes"
            referencedColumns: ["id"]
          },
        ]
      }
      pedido_itens: {
        Row: {
          id: string
          pedido_id: string
          preco_unitario: number
          produto_id: string
          quantidade: number
        }
        Insert: {
          id?: string
          pedido_id: string
          preco_unitario: number
          produto_id: string
          quantidade?: number
        }
        Update: {
          id?: string
          pedido_id?: string
          preco_unitario?: number
          produto_id?: string
          quantidade?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedido_itens_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedido_itens_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: false
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
      }
      pedidos: {
        Row: {
          created_at: string
          id: string
          status: string
          total: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          status?: string
          total: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          status?: string
          total?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_user_id_profiles_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      plano_exercicios: {
        Row: {
          dia_semana: number
          duracao_segundos: number
          exercicio_id: string
          id: string
          ordem: number
          plano_id: string
          series: number
        }
        Insert: {
          dia_semana?: number
          duracao_segundos?: number
          exercicio_id: string
          id?: string
          ordem?: number
          plano_id: string
          series?: number
        }
        Update: {
          dia_semana?: number
          duracao_segundos?: number
          exercicio_id?: string
          id?: string
          ordem?: number
          plano_id?: string
          series?: number
        }
        Relationships: [
          {
            foreignKeyName: "plano_exercicios_exercicio_id_fkey"
            columns: ["exercicio_id"]
            isOneToOne: false
            referencedRelation: "exercicios_alongamento"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plano_exercicios_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos_alongamento"
            referencedColumns: ["id"]
          },
        ]
      }
      planos_alongamento: {
        Row: {
          created_at: string
          descricao: string | null
          disponivel: boolean | null
          duracao_semanas: number
          frequencia_semanal: number
          id: string
          imagem_url: string | null
          nivel: string
          nome: string
          objetivo: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao_semanas?: number
          frequencia_semanal?: number
          id?: string
          imagem_url?: string | null
          nivel?: string
          nome: string
          objetivo?: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao_semanas?: number
          frequencia_semanal?: number
          id?: string
          imagem_url?: string | null
          nivel?: string
          nome?: string
          objetivo?: string
        }
        Relationships: []
      }
      produtos: {
        Row: {
          cashback_percentual: number | null
          categoria: string | null
          created_at: string
          descricao: string | null
          disponivel: boolean | null
          id: string
          imagem_url: string | null
          nome: string
          preco: number
        }
        Insert: {
          cashback_percentual?: number | null
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          id?: string
          imagem_url?: string | null
          nome: string
          preco: number
        }
        Update: {
          cashback_percentual?: number | null
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          id?: string
          imagem_url?: string | null
          nome?: string
          preco?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          codigo_indicacao: string | null
          created_at: string
          id: string
          indicado_por: string | null
          nome: string | null
          telefone: string | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          codigo_indicacao?: string | null
          created_at?: string
          id: string
          indicado_por?: string | null
          nome?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          codigo_indicacao?: string | null
          created_at?: string
          id?: string
          indicado_por?: string | null
          nome?: string | null
          telefone?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_indicado_por_fkey"
            columns: ["indicado_por"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      protocolos: {
        Row: {
          beneficios: string | null
          created_at: string
          descricao: string | null
          disponivel: boolean | null
          duracao_semanas: number
          id: string
          imagem_url: string | null
          nome: string
          sessoes_por_semana: number
          tipo: string
        }
        Insert: {
          beneficios?: string | null
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao_semanas?: number
          id?: string
          imagem_url?: string | null
          nome: string
          sessoes_por_semana?: number
          tipo?: string
        }
        Update: {
          beneficios?: string | null
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao_semanas?: number
          id?: string
          imagem_url?: string | null
          nome?: string
          sessoes_por_semana?: number
          tipo?: string
        }
        Relationships: []
      }
      relatorios_enviados: {
        Row: {
          created_at: string
          id: string
          metodo: string
          protocolo_usuario_id: string
          terapeuta_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          metodo?: string
          protocolo_usuario_id: string
          terapeuta_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          metodo?: string
          protocolo_usuario_id?: string
          terapeuta_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "relatorios_enviados_protocolo_usuario_id_fkey"
            columns: ["protocolo_usuario_id"]
            isOneToOne: false
            referencedRelation: "usuario_protocolos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "relatorios_enviados_terapeuta_id_fkey"
            columns: ["terapeuta_id"]
            isOneToOne: false
            referencedRelation: "terapeutas"
            referencedColumns: ["id"]
          },
        ]
      }
      servicos: {
        Row: {
          cashback_percentual: number | null
          categoria: string | null
          created_at: string
          descricao: string | null
          disponivel: boolean | null
          duracao: number
          id: string
          nome: string
          preco: number
        }
        Insert: {
          cashback_percentual?: number | null
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao: number
          id?: string
          nome: string
          preco: number
        }
        Update: {
          cashback_percentual?: number | null
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao?: number
          id?: string
          nome?: string
          preco?: number
        }
        Relationships: []
      }
      sessoes_alongamento: {
        Row: {
          created_at: string
          data: string
          duracao_total_segundos: number
          exercicios_completados: number
          id: string
          notas: string | null
          plano_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: string
          duracao_total_segundos?: number
          exercicios_completados?: number
          id?: string
          notas?: string | null
          plano_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          data?: string
          duracao_total_segundos?: number
          exercicios_completados?: number
          id?: string
          notas?: string | null
          plano_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessoes_alongamento_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos_alongamento"
            referencedColumns: ["id"]
          },
        ]
      }
      terapeutas: {
        Row: {
          created_at: string
          disponivel: boolean | null
          email: string | null
          especialidade: string | null
          foto_url: string | null
          id: string
          nome: string
          telefone: string | null
        }
        Insert: {
          created_at?: string
          disponivel?: boolean | null
          email?: string | null
          especialidade?: string | null
          foto_url?: string | null
          id?: string
          nome: string
          telefone?: string | null
        }
        Update: {
          created_at?: string
          disponivel?: boolean | null
          email?: string | null
          especialidade?: string | null
          foto_url?: string | null
          id?: string
          nome?: string
          telefone?: string | null
        }
        Relationships: []
      }
      transacoes: {
        Row: {
          created_at: string
          descricao: string | null
          expira_em: string | null
          id: string
          referencia_id: string | null
          tipo: string
          user_id: string
          valor: number
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          expira_em?: string | null
          id?: string
          referencia_id?: string | null
          tipo: string
          user_id: string
          valor: number
        }
        Update: {
          created_at?: string
          descricao?: string | null
          expira_em?: string | null
          id?: string
          referencia_id?: string | null
          tipo?: string
          user_id?: string
          valor?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      usuario_planos_alongamento: {
        Row: {
          created_at: string
          data_fim: string | null
          data_inicio: string
          id: string
          plano_id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          id?: string
          plano_id: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          id?: string
          plano_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_planos_alongamento_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "planos_alongamento"
            referencedColumns: ["id"]
          },
        ]
      }
      usuario_protocolos: {
        Row: {
          created_at: string
          data_fim: string | null
          data_inicio: string
          id: string
          observacoes: string | null
          protocolo_id: string
          status: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          id?: string
          observacoes?: string | null
          protocolo_id: string
          status?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          id?: string
          observacoes?: string | null
          protocolo_id?: string
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_protocolos_protocolo_id_fkey"
            columns: ["protocolo_id"]
            isOneToOne: false
            referencedRelation: "protocolos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_login_rate_limit: {
        Args: {
          p_email: string
          p_ip_address?: string
          p_max_attempts?: number
          p_window_minutes?: number
        }
        Returns: {
          attempts_count: number
          is_blocked: boolean
          next_attempt_at: string
        }[]
      }
      get_user_tier: {
        Args: { p_user_id: string }
        Returns: {
          progresso_percentual: number
          proximo_tier_limite: number
          proximo_tier_nome: string
          tier_multiplier: number
          tier_name: string
          total_gasto: number
        }[]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      notify_expiring_cashback: {
        Args: never
        Returns: {
          dias_restantes: number
          total_expirando: number
          user_id: string
        }[]
      }
      process_expired_cashback: {
        Args: never
        Returns: {
          total_expirado: number
          transacoes_expiradas: number
          user_id: string
        }[]
      }
      record_login_attempt: {
        Args: { p_email: string; p_ip_address?: string; p_success?: boolean }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
