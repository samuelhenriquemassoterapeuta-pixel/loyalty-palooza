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
      anotacoes_posturais: {
        Row: {
          anotacoes: Json
          avaliacao_id: string
          created_at: string
          id: string
          updated_at: string
          user_id: string
          vista: string
        }
        Insert: {
          anotacoes?: Json
          avaliacao_id: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id: string
          vista: string
        }
        Update: {
          anotacoes?: Json
          avaliacao_id?: string
          created_at?: string
          id?: string
          updated_at?: string
          user_id?: string
          vista?: string
        }
        Relationships: [
          {
            foreignKeyName: "anotacoes_posturais_avaliacao_id_fkey"
            columns: ["avaliacao_id"]
            isOneToOne: false
            referencedRelation: "avaliacoes_posturais"
            referencedColumns: ["id"]
          },
        ]
      }
      assinaturas_planos: {
        Row: {
          beneficios: Json
          cashback_bonus_percentual: number
          cor: string
          created_at: string
          creditos_mensais: number
          desconto_servicos_percentual: number
          descricao: string | null
          disponivel: boolean
          icone: string
          id: string
          nome: string
          ordem: number
          preco_mensal: number
          prioridade_agendamento: boolean
          tipo_credito: string
        }
        Insert: {
          beneficios?: Json
          cashback_bonus_percentual?: number
          cor?: string
          created_at?: string
          creditos_mensais?: number
          desconto_servicos_percentual?: number
          descricao?: string | null
          disponivel?: boolean
          icone?: string
          id?: string
          nome: string
          ordem?: number
          preco_mensal: number
          prioridade_agendamento?: boolean
          tipo_credito?: string
        }
        Update: {
          beneficios?: Json
          cashback_bonus_percentual?: number
          cor?: string
          created_at?: string
          creditos_mensais?: number
          desconto_servicos_percentual?: number
          descricao?: string | null
          disponivel?: boolean
          icone?: string
          id?: string
          nome?: string
          ordem?: number
          preco_mensal?: number
          prioridade_agendamento?: boolean
          tipo_credito?: string
        }
        Relationships: []
      }
      assinaturas_usuario: {
        Row: {
          created_at: string
          creditos_restantes: number
          creditos_usados: number
          data_fim: string | null
          data_inicio: string
          id: string
          plano_id: string
          renovacao_automatica: boolean
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          creditos_restantes?: number
          creditos_usados?: number
          data_fim?: string | null
          data_inicio?: string
          id?: string
          plano_id: string
          renovacao_automatica?: boolean
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          creditos_restantes?: number
          creditos_usados?: number
          data_fim?: string | null
          data_inicio?: string
          id?: string
          plano_id?: string
          renovacao_automatica?: boolean
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assinaturas_usuario_plano_id_fkey"
            columns: ["plano_id"]
            isOneToOne: false
            referencedRelation: "assinaturas_planos"
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
      avaliacoes_posturais: {
        Row: {
          created_at: string
          data: string
          foto_anterior: string | null
          foto_lateral_direita: string | null
          foto_lateral_esquerda: string | null
          foto_posterior: string | null
          id: string
          observacoes: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          data?: string
          foto_anterior?: string | null
          foto_lateral_direita?: string | null
          foto_lateral_esquerda?: string | null
          foto_posterior?: string | null
          id?: string
          observacoes?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          data?: string
          foto_anterior?: string | null
          foto_lateral_direita?: string | null
          foto_lateral_esquerda?: string | null
          foto_posterior?: string | null
          id?: string
          observacoes?: string | null
          user_id?: string
        }
        Relationships: []
      }
      banners_dismissals: {
        Row: {
          banner_id: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          banner_id: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          banner_id?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "banners_dismissals_banner_id_fkey"
            columns: ["banner_id"]
            isOneToOne: false
            referencedRelation: "banners_promocionais"
            referencedColumns: ["id"]
          },
        ]
      }
      banners_promocionais: {
        Row: {
          ativo: boolean
          cliques: number | null
          cor_fundo: string | null
          created_at: string
          data_fim: string | null
          data_inicio: string
          id: string
          imagem_url: string | null
          link_destino: string | null
          prioridade: number | null
          segmentos: string[] | null
          subtitulo: string | null
          tipo: string
          titulo: string
          updated_at: string
          visualizacoes: number | null
        }
        Insert: {
          ativo?: boolean
          cliques?: number | null
          cor_fundo?: string | null
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          id?: string
          imagem_url?: string | null
          link_destino?: string | null
          prioridade?: number | null
          segmentos?: string[] | null
          subtitulo?: string | null
          tipo?: string
          titulo: string
          updated_at?: string
          visualizacoes?: number | null
        }
        Update: {
          ativo?: boolean
          cliques?: number | null
          cor_fundo?: string | null
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          id?: string
          imagem_url?: string | null
          link_destino?: string | null
          prioridade?: number | null
          segmentos?: string[] | null
          subtitulo?: string | null
          tipo?: string
          titulo?: string
          updated_at?: string
          visualizacoes?: number | null
        }
        Relationships: []
      }
      brand_profiles: {
        Row: {
          brand_name: string
          created_at: string | null
          forbidden_words: string[] | null
          id: string
          keywords: string[] | null
          niche: string
          reference_profiles: string[] | null
          target_audience_age: string | null
          target_audience_desire: string | null
          target_audience_gender: string | null
          target_audience_pain: string | null
          tone_of_voice: string[] | null
          updated_at: string | null
          use_emojis: boolean | null
          use_slangs: boolean | null
          user_id: string
          website: string | null
        }
        Insert: {
          brand_name: string
          created_at?: string | null
          forbidden_words?: string[] | null
          id?: string
          keywords?: string[] | null
          niche: string
          reference_profiles?: string[] | null
          target_audience_age?: string | null
          target_audience_desire?: string | null
          target_audience_gender?: string | null
          target_audience_pain?: string | null
          tone_of_voice?: string[] | null
          updated_at?: string | null
          use_emojis?: boolean | null
          use_slangs?: boolean | null
          user_id: string
          website?: string | null
        }
        Update: {
          brand_name?: string
          created_at?: string | null
          forbidden_words?: string[] | null
          id?: string
          keywords?: string[] | null
          niche?: string
          reference_profiles?: string[] | null
          target_audience_age?: string | null
          target_audience_desire?: string | null
          target_audience_gender?: string | null
          target_audience_pain?: string | null
          tone_of_voice?: string[] | null
          updated_at?: string | null
          use_emojis?: boolean | null
          use_slangs?: boolean | null
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      calendar_events: {
        Row: {
          color: string | null
          content_type: string | null
          created_at: string | null
          description: string | null
          id: string
          scheduled_date: string
          scheduled_time: string | null
          script_id: string | null
          status: string | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          color?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          scheduled_date: string
          scheduled_time?: string | null
          script_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          color?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          scheduled_date?: string
          scheduled_time?: string | null
          script_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "calendar_events_script_id_fkey"
            columns: ["script_id"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
        ]
      }
      campanhas_marketing: {
        Row: {
          agendada_para: string | null
          created_at: string
          created_by: string
          enviada_em: string | null
          id: string
          mensagem: string
          segmentos: string[]
          status: string
          tipo: string
          titulo: string
          total_destinatarios: number | null
          total_enviados: number | null
          total_erros: number | null
          updated_at: string
        }
        Insert: {
          agendada_para?: string | null
          created_at?: string
          created_by: string
          enviada_em?: string | null
          id?: string
          mensagem: string
          segmentos?: string[]
          status?: string
          tipo?: string
          titulo: string
          total_destinatarios?: number | null
          total_enviados?: number | null
          total_erros?: number | null
          updated_at?: string
        }
        Update: {
          agendada_para?: string | null
          created_at?: string
          created_by?: string
          enviada_em?: string | null
          id?: string
          mensagem?: string
          segmentos?: string[]
          status?: string
          tipo?: string
          titulo?: string
          total_destinatarios?: number | null
          total_enviados?: number | null
          total_erros?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      checkins: {
        Row: {
          agendamento_id: string | null
          created_at: string
          id: string
          metodo: string
          user_id: string
          xp_ganho: number
        }
        Insert: {
          agendamento_id?: string | null
          created_at?: string
          id?: string
          metodo?: string
          user_id: string
          xp_ganho?: number
        }
        Update: {
          agendamento_id?: string | null
          created_at?: string
          id?: string
          metodo?: string
          user_id?: string
          xp_ganho?: number
        }
        Relationships: [
          {
            foreignKeyName: "checkins_agendamento_id_fkey"
            columns: ["agendamento_id"]
            isOneToOne: false
            referencedRelation: "agendamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      checklists_avaliacao: {
        Row: {
          agendamento_id: string | null
          created_at: string
          id: string
          itens_marcados: string[]
          observacoes: string | null
          protocolo_usuario_id: string | null
          user_id: string
        }
        Insert: {
          agendamento_id?: string | null
          created_at?: string
          id?: string
          itens_marcados?: string[]
          observacoes?: string | null
          protocolo_usuario_id?: string | null
          user_id: string
        }
        Update: {
          agendamento_id?: string | null
          created_at?: string
          id?: string
          itens_marcados?: string[]
          observacoes?: string | null
          protocolo_usuario_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "checklists_avaliacao_agendamento_id_fkey"
            columns: ["agendamento_id"]
            isOneToOne: false
            referencedRelation: "agendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklists_avaliacao_protocolo_usuario_id_fkey"
            columns: ["protocolo_usuario_id"]
            isOneToOne: false
            referencedRelation: "usuario_protocolos"
            referencedColumns: ["id"]
          },
        ]
      }
      colaboradores_empresa: {
        Row: {
          ativo: boolean
          cargo: string | null
          created_at: string
          departamento: string | null
          empresa_id: string
          id: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          cargo?: string | null
          created_at?: string
          departamento?: string | null
          empresa_id: string
          id?: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          cargo?: string | null
          created_at?: string
          departamento?: string | null
          empresa_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_empresa_empresa_id_fkey"
            columns: ["empresa_id"]
            isOneToOne: false
            referencedRelation: "empresas_corporativas"
            referencedColumns: ["id"]
          },
        ]
      }
      conquistas: {
        Row: {
          ativo: boolean
          categoria: string
          codigo: string
          condicao_tipo: string
          condicao_valor: number
          created_at: string
          descricao: string
          icone: string
          id: string
          ordem: number
          recompensa_tipo: string | null
          recompensa_valor: number | null
          secreta: boolean
          titulo: string
        }
        Insert: {
          ativo?: boolean
          categoria?: string
          codigo: string
          condicao_tipo: string
          condicao_valor?: number
          created_at?: string
          descricao: string
          icone?: string
          id?: string
          ordem?: number
          recompensa_tipo?: string | null
          recompensa_valor?: number | null
          secreta?: boolean
          titulo: string
        }
        Update: {
          ativo?: boolean
          categoria?: string
          codigo?: string
          condicao_tipo?: string
          condicao_valor?: number
          created_at?: string
          descricao?: string
          icone?: string
          id?: string
          ordem?: number
          recompensa_tipo?: string | null
          recompensa_valor?: number | null
          secreta?: boolean
          titulo?: string
        }
        Relationships: []
      }
      content_ideas: {
        Row: {
          brand_id: string | null
          content_type: string | null
          created_at: string | null
          description: string | null
          funnel_stage: string | null
          id: string
          is_used: boolean | null
          niche: string | null
          title: string
          user_id: string
        }
        Insert: {
          brand_id?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          funnel_stage?: string | null
          id?: string
          is_used?: boolean | null
          niche?: string | null
          title: string
          user_id: string
        }
        Update: {
          brand_id?: string | null
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          funnel_stage?: string | null
          id?: string
          is_used?: boolean | null
          niche?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "content_ideas_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      corporativo_beneficios: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string
          detalhe: string | null
          estatistica: string | null
          icone: string
          id: string
          imagem_url: string | null
          ordem: number
          titulo: string
          updated_at: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao: string
          detalhe?: string | null
          estatistica?: string | null
          icone?: string
          id?: string
          imagem_url?: string | null
          ordem?: number
          titulo: string
          updated_at?: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string
          detalhe?: string | null
          estatistica?: string | null
          icone?: string
          id?: string
          imagem_url?: string | null
          ordem?: number
          titulo?: string
          updated_at?: string
        }
        Relationships: []
      }
      corporativo_cases: {
        Row: {
          ativo: boolean
          created_at: string
          depoimento: string | null
          descricao: string
          detalhe_extra: string | null
          empresa: string
          fonte: string | null
          id: string
          imagem_url: string | null
          logo_emoji: string | null
          ordem: number
          resultado: string
          setor: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          depoimento?: string | null
          descricao: string
          detalhe_extra?: string | null
          empresa: string
          fonte?: string | null
          id?: string
          imagem_url?: string | null
          logo_emoji?: string | null
          ordem?: number
          resultado: string
          setor: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          depoimento?: string | null
          descricao?: string
          detalhe_extra?: string | null
          empresa?: string
          fonte?: string | null
          id?: string
          imagem_url?: string | null
          logo_emoji?: string | null
          ordem?: number
          resultado?: string
          setor?: string
        }
        Relationships: []
      }
      corporativo_depoimentos: {
        Row: {
          ativo: boolean
          cargo: string
          created_at: string
          depoimento: string
          detalhes: string | null
          empresa: string
          estrelas: number
          foto_url: string | null
          id: string
          metricas: Json | null
          nome: string
          ordem: number
        }
        Insert: {
          ativo?: boolean
          cargo: string
          created_at?: string
          depoimento: string
          detalhes?: string | null
          empresa: string
          estrelas?: number
          foto_url?: string | null
          id?: string
          metricas?: Json | null
          nome: string
          ordem?: number
        }
        Update: {
          ativo?: boolean
          cargo?: string
          created_at?: string
          depoimento?: string
          detalhes?: string | null
          empresa?: string
          estrelas?: number
          foto_url?: string | null
          id?: string
          metricas?: Json | null
          nome?: string
          ordem?: number
        }
        Relationships: []
      }
      corporativo_eventos: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string
          detalhe: string | null
          icone: string
          id: string
          imagem_url: string | null
          ordem: number
          titulo: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao: string
          detalhe?: string | null
          icone?: string
          id?: string
          imagem_url?: string | null
          ordem?: number
          titulo: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string
          detalhe?: string | null
          icone?: string
          id?: string
          imagem_url?: string | null
          ordem?: number
          titulo?: string
        }
        Relationships: []
      }
      corporativo_faq: {
        Row: {
          ativo: boolean
          created_at: string
          detalhes: Json | null
          id: string
          ordem: number
          pergunta: string
          resposta: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          detalhes?: Json | null
          id?: string
          ordem?: number
          pergunta: string
          resposta: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          detalhes?: Json | null
          id?: string
          ordem?: number
          pergunta?: string
          resposta?: string
        }
        Relationships: []
      }
      corporativo_galeria: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          id: string
          ordem: number
          tipo: string
          titulo: string
          url: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          ordem?: number
          tipo?: string
          titulo: string
          url: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          id?: string
          ordem?: number
          tipo?: string
          titulo?: string
          url?: string
        }
        Relationships: []
      }
      corporativo_logos: {
        Row: {
          ativo: boolean
          created_at: string
          id: string
          logo_url: string | null
          nome: string
          ordem: number
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          id?: string
          logo_url?: string | null
          nome: string
          ordem?: number
        }
        Update: {
          ativo?: boolean
          created_at?: string
          id?: string
          logo_url?: string | null
          nome?: string
          ordem?: number
        }
        Relationships: []
      }
      corporativo_planos: {
        Row: {
          ativo: boolean
          beneficios: Json | null
          como_funciona: string | null
          created_at: string
          descricao: string | null
          destaque: boolean
          icone: string
          id: string
          ideal_para: string | null
          nome: string
          ordem: number
          periodo: string | null
          preco: string
          subtitulo: string | null
        }
        Insert: {
          ativo?: boolean
          beneficios?: Json | null
          como_funciona?: string | null
          created_at?: string
          descricao?: string | null
          destaque?: boolean
          icone?: string
          id?: string
          ideal_para?: string | null
          nome: string
          ordem?: number
          periodo?: string | null
          preco: string
          subtitulo?: string | null
        }
        Update: {
          ativo?: boolean
          beneficios?: Json | null
          como_funciona?: string | null
          created_at?: string
          descricao?: string | null
          destaque?: boolean
          icone?: string
          id?: string
          ideal_para?: string | null
          nome?: string
          ordem?: number
          periodo?: string | null
          preco?: string
          subtitulo?: string | null
        }
        Relationships: []
      }
      corporativo_secoes: {
        Row: {
          ativo: boolean | null
          conteudo_detalhado: string | null
          cor: string | null
          created_at: string
          descricao: string | null
          galeria_urls: string[] | null
          icone: string | null
          id: string
          imagem_url: string | null
          ordem: number | null
          subtitulo: string | null
          titulo: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          ativo?: boolean | null
          conteudo_detalhado?: string | null
          cor?: string | null
          created_at?: string
          descricao?: string | null
          galeria_urls?: string[] | null
          icone?: string | null
          id?: string
          imagem_url?: string | null
          ordem?: number | null
          subtitulo?: string | null
          titulo: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          ativo?: boolean | null
          conteudo_detalhado?: string | null
          cor?: string | null
          created_at?: string
          descricao?: string | null
          galeria_urls?: string[] | null
          icone?: string | null
          id?: string
          imagem_url?: string | null
          ordem?: number | null
          subtitulo?: string | null
          titulo?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      cromos_usuarios: {
        Row: {
          elemento: string
          id: string
          quantidade: number
          updated_at: string
          user_id: string
        }
        Insert: {
          elemento: string
          id?: string
          quantidade?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          elemento?: string
          id?: string
          quantidade?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      curso_aulas: {
        Row: {
          ativo: boolean
          conteudo: string
          created_at: string
          descricao: string | null
          duracao_minutos: number | null
          id: string
          modulo_id: string
          ordem: number
          titulo: string
          video_url: string | null
        }
        Insert: {
          ativo?: boolean
          conteudo: string
          created_at?: string
          descricao?: string | null
          duracao_minutos?: number | null
          id?: string
          modulo_id: string
          ordem?: number
          titulo: string
          video_url?: string | null
        }
        Update: {
          ativo?: boolean
          conteudo?: string
          created_at?: string
          descricao?: string | null
          duracao_minutos?: number | null
          id?: string
          modulo_id?: string
          ordem?: number
          titulo?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curso_aulas_modulo_id_fkey"
            columns: ["modulo_id"]
            isOneToOne: false
            referencedRelation: "curso_modulos"
            referencedColumns: ["id"]
          },
        ]
      }
      curso_modulos: {
        Row: {
          ativo: boolean
          cor: string | null
          created_at: string
          descricao: string | null
          icone: string | null
          id: string
          ordem: number
          titulo: string
        }
        Insert: {
          ativo?: boolean
          cor?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          ordem?: number
          titulo: string
        }
        Update: {
          ativo?: boolean
          cor?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          ordem?: number
          titulo?: string
        }
        Relationships: []
      }
      curso_progresso: {
        Row: {
          aula_id: string
          concluida: boolean
          concluida_em: string | null
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          aula_id: string
          concluida?: boolean
          concluida_em?: string | null
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          aula_id?: string
          concluida?: boolean
          concluida_em?: string | null
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "curso_progresso_aula_id_fkey"
            columns: ["aula_id"]
            isOneToOne: false
            referencedRelation: "curso_aulas"
            referencedColumns: ["id"]
          },
        ]
      }
      desafio_participantes: {
        Row: {
          concluido: boolean
          concluido_em: string | null
          created_at: string
          desafio_id: string
          id: string
          progresso: number
          recompensa_creditada: boolean
          user_id: string
        }
        Insert: {
          concluido?: boolean
          concluido_em?: string | null
          created_at?: string
          desafio_id: string
          id?: string
          progresso?: number
          recompensa_creditada?: boolean
          user_id: string
        }
        Update: {
          concluido?: boolean
          concluido_em?: string | null
          created_at?: string
          desafio_id?: string
          id?: string
          progresso?: number
          recompensa_creditada?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "desafio_participantes_desafio_id_fkey"
            columns: ["desafio_id"]
            isOneToOne: false
            referencedRelation: "desafios"
            referencedColumns: ["id"]
          },
        ]
      }
      desafios: {
        Row: {
          ativo: boolean
          cor: string
          created_at: string
          data_fim: string
          data_inicio: string
          descricao: string | null
          icone: string
          id: string
          meta_quantidade: number
          meta_tipo: string
          recompensa_tipo: string
          recompensa_valor: number
          titulo: string
        }
        Insert: {
          ativo?: boolean
          cor?: string
          created_at?: string
          data_fim: string
          data_inicio: string
          descricao?: string | null
          icone?: string
          id?: string
          meta_quantidade?: number
          meta_tipo?: string
          recompensa_tipo?: string
          recompensa_valor?: number
          titulo: string
        }
        Update: {
          ativo?: boolean
          cor?: string
          created_at?: string
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          icone?: string
          id?: string
          meta_quantidade?: number
          meta_tipo?: string
          recompensa_tipo?: string
          recompensa_valor?: number
          titulo?: string
        }
        Relationships: []
      }
      diario_alimentar: {
        Row: {
          agua_ml: number | null
          created_at: string
          data: string
          descricao: string
          foto_url: string | null
          id: string
          observacoes: string | null
          plano_dieta_id: string | null
          tipo_refeicao: string
          user_id: string
        }
        Insert: {
          agua_ml?: number | null
          created_at?: string
          data?: string
          descricao: string
          foto_url?: string | null
          id?: string
          observacoes?: string | null
          plano_dieta_id?: string | null
          tipo_refeicao: string
          user_id: string
        }
        Update: {
          agua_ml?: number | null
          created_at?: string
          data?: string
          descricao?: string
          foto_url?: string | null
          id?: string
          observacoes?: string | null
          plano_dieta_id?: string | null
          tipo_refeicao?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "diario_alimentar_plano_dieta_id_fkey"
            columns: ["plano_dieta_id"]
            isOneToOne: false
            referencedRelation: "planos_dieta"
            referencedColumns: ["id"]
          },
        ]
      }
      dietas_conteudo: {
        Row: {
          categoria: string
          conteudo: Json
          created_at: string
          descricao: string | null
          disponivel: boolean | null
          id: string
          imagem_url: string | null
          ordem: number
          protocolo_tipo: string | null
          titulo: string
        }
        Insert: {
          categoria?: string
          conteudo?: Json
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          id?: string
          imagem_url?: string | null
          ordem?: number
          protocolo_tipo?: string | null
          titulo: string
        }
        Update: {
          categoria?: string
          conteudo?: Json
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          id?: string
          imagem_url?: string | null
          ordem?: number
          protocolo_tipo?: string | null
          titulo?: string
        }
        Relationships: []
      }
      empresas_corporativas: {
        Row: {
          ativa: boolean
          cnpj: string | null
          contato_email: string | null
          contato_nome: string | null
          contato_telefone: string | null
          created_at: string
          id: string
          max_colaboradores: number
          nome: string
          plano_qvt: string
          updated_at: string
          valor_mensal: number
        }
        Insert: {
          ativa?: boolean
          cnpj?: string | null
          contato_email?: string | null
          contato_nome?: string | null
          contato_telefone?: string | null
          created_at?: string
          id?: string
          max_colaboradores?: number
          nome: string
          plano_qvt?: string
          updated_at?: string
          valor_mensal?: number
        }
        Update: {
          ativa?: boolean
          cnpj?: string | null
          contato_email?: string | null
          contato_nome?: string | null
          contato_telefone?: string | null
          created_at?: string
          id?: string
          max_colaboradores?: number
          nome?: string
          plano_qvt?: string
          updated_at?: string
          valor_mensal?: number
        }
        Relationships: []
      }
      exames_usuario: {
        Row: {
          arquivo_tipo: string
          arquivo_url: string
          created_at: string
          data_exame: string | null
          id: string
          nome: string
          observacoes: string | null
          protocolo_usuario_id: string | null
          tamanho_bytes: number | null
          tipo_exame: string
          user_id: string
        }
        Insert: {
          arquivo_tipo?: string
          arquivo_url: string
          created_at?: string
          data_exame?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          protocolo_usuario_id?: string | null
          tamanho_bytes?: number | null
          tipo_exame?: string
          user_id: string
        }
        Update: {
          arquivo_tipo?: string
          arquivo_url?: string
          created_at?: string
          data_exame?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          protocolo_usuario_id?: string | null
          tamanho_bytes?: number | null
          tipo_exame?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "exames_usuario_protocolo_usuario_id_fkey"
            columns: ["protocolo_usuario_id"]
            isOneToOne: false
            referencedRelation: "usuario_protocolos"
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
      feedback_rapido: {
        Row: {
          agendamento_id: string
          comentario: string | null
          created_at: string
          emoji: number
          id: string
          user_id: string
        }
        Insert: {
          agendamento_id: string
          comentario?: string | null
          created_at?: string
          emoji: number
          id?: string
          user_id: string
        }
        Update: {
          agendamento_id?: string
          comentario?: string | null
          created_at?: string
          emoji?: number
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_rapido_agendamento_id_fkey"
            columns: ["agendamento_id"]
            isOneToOne: true
            referencedRelation: "agendamentos"
            referencedColumns: ["id"]
          },
        ]
      }
      ficha_nutricional: {
        Row: {
          alergias_alimentares: string[] | null
          alimentos_restritos: string[] | null
          altura: number | null
          consumo_alcool: string | null
          created_at: string
          doencas: string[] | null
          fumante: boolean | null
          historico_cirurgias: string | null
          id: string
          idade: number | null
          medicamentos: string | null
          nivel_atividade: string | null
          objetivo: string | null
          observacoes: string | null
          peso: number | null
          sexo: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          alergias_alimentares?: string[] | null
          alimentos_restritos?: string[] | null
          altura?: number | null
          consumo_alcool?: string | null
          created_at?: string
          doencas?: string[] | null
          fumante?: boolean | null
          historico_cirurgias?: string | null
          id?: string
          idade?: number | null
          medicamentos?: string | null
          nivel_atividade?: string | null
          objetivo?: string | null
          observacoes?: string | null
          peso?: number | null
          sexo?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          alergias_alimentares?: string[] | null
          alimentos_restritos?: string[] | null
          altura?: number | null
          consumo_alcool?: string | null
          created_at?: string
          doencas?: string[] | null
          fumante?: boolean | null
          historico_cirurgias?: string | null
          id?: string
          idade?: number | null
          medicamentos?: string | null
          nivel_atividade?: string | null
          objetivo?: string | null
          observacoes?: string | null
          peso?: number | null
          sexo?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      fichas_acompanhamento: {
        Row: {
          created_at: string
          data: string
          escala_eva: number | null
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
          escala_eva?: number | null
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
          escala_eva?: number | null
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
      google_ads_metrics: {
        Row: {
          average_cpc: number
          campaign_id: string
          campaign_name: string
          clicks: number
          conversion_value: number
          conversions: number
          cost_micros: number
          created_at: string
          ctr: number
          customer_id: string
          date_range: string
          id: string
          impressions: number
          roas: number
          snapshot_date: string
        }
        Insert: {
          average_cpc?: number
          campaign_id: string
          campaign_name: string
          clicks?: number
          conversion_value?: number
          conversions?: number
          cost_micros?: number
          created_at?: string
          ctr?: number
          customer_id: string
          date_range?: string
          id?: string
          impressions?: number
          roas?: number
          snapshot_date?: string
        }
        Update: {
          average_cpc?: number
          campaign_id?: string
          campaign_name?: string
          clicks?: number
          conversion_value?: number
          conversions?: number
          cost_micros?: number
          created_at?: string
          ctr?: number
          customer_id?: string
          date_range?: string
          id?: string
          impressions?: number
          roas?: number
          snapshot_date?: string
        }
        Relationships: []
      }
      headspa_imagens: {
        Row: {
          created_at: string
          etapa_key: string
          id: string
          imagem_url: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          etapa_key: string
          id?: string
          imagem_url: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          etapa_key?: string
          id?: string
          imagem_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      historico_cirurgico: {
        Row: {
          created_at: string
          data_cirurgia: string
          hospital_clinica: string | null
          id: string
          medico_responsavel: string | null
          observacoes: string | null
          tipo_cirurgia: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          data_cirurgia: string
          hospital_clinica?: string | null
          id?: string
          medico_responsavel?: string | null
          observacoes?: string | null
          tipo_cirurgia: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          data_cirurgia?: string
          hospital_clinica?: string | null
          id?: string
          medico_responsavel?: string | null
          observacoes?: string | null
          tipo_cirurgia?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      hooks: {
        Row: {
          best_for: string | null
          brand_id: string | null
          category: string | null
          completion_suggestion: string | null
          created_at: string | null
          emotion_triggered: string | null
          hook_text: string
          id: string
          is_favorite: boolean | null
          power_level: number | null
          topic: string
          user_id: string
        }
        Insert: {
          best_for?: string | null
          brand_id?: string | null
          category?: string | null
          completion_suggestion?: string | null
          created_at?: string | null
          emotion_triggered?: string | null
          hook_text: string
          id?: string
          is_favorite?: boolean | null
          power_level?: number | null
          topic: string
          user_id: string
        }
        Update: {
          best_for?: string | null
          brand_id?: string | null
          category?: string | null
          completion_suggestion?: string | null
          created_at?: string | null
          emotion_triggered?: string | null
          hook_text?: string
          id?: string
          is_favorite?: boolean | null
          power_level?: number | null
          topic?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hooks_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
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
      landing_config: {
        Row: {
          conteudo: Json
          created_at: string
          id: string
          secao: string
          updated_at: string
        }
        Insert: {
          conteudo?: Json
          created_at?: string
          id?: string
          secao: string
          updated_at?: string
        }
        Update: {
          conteudo?: Json
          created_at?: string
          id?: string
          secao?: string
          updated_at?: string
        }
        Relationships: []
      }
      lembretes_alongamento: {
        Row: {
          ativo: boolean
          created_at: string
          dias_semana: number[]
          horario: string
          id: string
          mensagem_personalizada: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          dias_semana?: number[]
          horario?: string
          id?: string
          mensagem_personalizada?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          dias_semana?: number[]
          horario?: string
          id?: string
          mensagem_personalizada?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      lista_espera: {
        Row: {
          ativo: boolean
          cashback_bonus: number
          created_at: string
          dia_preferido: number | null
          horario_preferido: string | null
          id: string
          notificado_em: string | null
          servico: string
          terapeuta_id: string | null
          user_id: string
        }
        Insert: {
          ativo?: boolean
          cashback_bonus?: number
          created_at?: string
          dia_preferido?: number | null
          horario_preferido?: string | null
          id?: string
          notificado_em?: string | null
          servico: string
          terapeuta_id?: string | null
          user_id: string
        }
        Update: {
          ativo?: boolean
          cashback_bonus?: number
          created_at?: string
          dia_preferido?: number | null
          horario_preferido?: string | null
          id?: string
          notificado_em?: string | null
          servico?: string
          terapeuta_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "lista_espera_terapeuta_id_fkey"
            columns: ["terapeuta_id"]
            isOneToOne: false
            referencedRelation: "terapeutas"
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
      moments_destaques: {
        Row: {
          created_at: string | null
          id: string
          pago: boolean | null
          post_id: string | null
          semana_referencia: string
          user_id: string
          xp_bonus: number | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          pago?: boolean | null
          post_id?: string | null
          semana_referencia: string
          user_id: string
          xp_bonus?: number | null
        }
        Update: {
          created_at?: string | null
          id?: string
          pago?: boolean | null
          post_id?: string | null
          semana_referencia?: string
          user_id?: string
          xp_bonus?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "moments_destaques_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "social_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      moments_missoes: {
        Row: {
          ativa: boolean | null
          created_at: string | null
          data_fim: string
          data_inicio: string
          descricao: string | null
          id: string
          multiplicador_cashback: number | null
          multiplicador_cromos: number | null
          multiplicador_xp: number | null
          requisito_tipo: string
          requisito_valor: string | null
          titulo: string
        }
        Insert: {
          ativa?: boolean | null
          created_at?: string | null
          data_fim: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          multiplicador_cashback?: number | null
          multiplicador_cromos?: number | null
          multiplicador_xp?: number | null
          requisito_tipo?: string
          requisito_valor?: string | null
          titulo: string
        }
        Update: {
          ativa?: boolean | null
          created_at?: string | null
          data_fim?: string
          data_inicio?: string
          descricao?: string | null
          id?: string
          multiplicador_cashback?: number | null
          multiplicador_cromos?: number | null
          multiplicador_xp?: number | null
          requisito_tipo?: string
          requisito_valor?: string | null
          titulo?: string
        }
        Relationships: []
      }
      moments_ranking: {
        Row: {
          created_at: string | null
          id: string
          posicao: number | null
          premio_ganho: string | null
          semana_fim: string
          semana_inicio: string
          total_cashback: number | null
          total_cromos: number | null
          total_posts: number | null
          total_xp: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          posicao?: number | null
          premio_ganho?: string | null
          semana_fim: string
          semana_inicio: string
          total_cashback?: number | null
          total_cromos?: number | null
          total_posts?: number | null
          total_xp?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          posicao?: number | null
          premio_ganho?: string | null
          semana_fim?: string
          semana_inicio?: string
          total_cashback?: number | null
          total_cromos?: number | null
          total_posts?: number | null
          total_xp?: number | null
          user_id?: string
        }
        Relationships: []
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
      pagamentos_asaas: {
        Row: {
          asaas_customer_id: string | null
          asaas_payment_id: string
          bank_slip_url: string | null
          billing_type: string
          created_at: string
          id: string
          invoice_url: string | null
          pix_copia_cola: string | null
          pix_expiration: string | null
          pix_qr_code: string | null
          referencia_id: string
          status: string
          tipo_referencia: string
          updated_at: string
          user_id: string
          valor: number
        }
        Insert: {
          asaas_customer_id?: string | null
          asaas_payment_id: string
          bank_slip_url?: string | null
          billing_type: string
          created_at?: string
          id?: string
          invoice_url?: string | null
          pix_copia_cola?: string | null
          pix_expiration?: string | null
          pix_qr_code?: string | null
          referencia_id: string
          status?: string
          tipo_referencia: string
          updated_at?: string
          user_id: string
          valor: number
        }
        Update: {
          asaas_customer_id?: string | null
          asaas_payment_id?: string
          bank_slip_url?: string | null
          billing_type?: string
          created_at?: string
          id?: string
          invoice_url?: string | null
          pix_copia_cola?: string | null
          pix_expiration?: string | null
          pix_qr_code?: string | null
          referencia_id?: string
          status?: string
          tipo_referencia?: string
          updated_at?: string
          user_id?: string
          valor?: number
        }
        Relationships: []
      }
      parceiro_comissoes: {
        Row: {
          created_at: string
          cupom_uso_id: string | null
          id: string
          pago_em: string | null
          parceiro_id: string
          percentual_comissao: number
          status: string
          valor_comissao: number
          valor_venda: number
        }
        Insert: {
          created_at?: string
          cupom_uso_id?: string | null
          id?: string
          pago_em?: string | null
          parceiro_id: string
          percentual_comissao: number
          status?: string
          valor_comissao: number
          valor_venda: number
        }
        Update: {
          created_at?: string
          cupom_uso_id?: string | null
          id?: string
          pago_em?: string | null
          parceiro_id?: string
          percentual_comissao?: number
          status?: string
          valor_comissao?: number
          valor_venda?: number
        }
        Relationships: [
          {
            foreignKeyName: "parceiro_comissoes_cupom_uso_id_fkey"
            columns: ["cupom_uso_id"]
            isOneToOne: false
            referencedRelation: "parceiro_cupom_usos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parceiro_comissoes_parceiro_id_fkey"
            columns: ["parceiro_id"]
            isOneToOne: false
            referencedRelation: "parceiros"
            referencedColumns: ["id"]
          },
        ]
      }
      parceiro_cupom_usos: {
        Row: {
          created_at: string
          cupom_id: string
          id: string
          parceiro_id: string
          referencia_id: string | null
          referencia_tipo: string
          user_id: string
          valor_compra: number
          valor_desconto_aplicado: number
        }
        Insert: {
          created_at?: string
          cupom_id: string
          id?: string
          parceiro_id: string
          referencia_id?: string | null
          referencia_tipo?: string
          user_id: string
          valor_compra: number
          valor_desconto_aplicado: number
        }
        Update: {
          created_at?: string
          cupom_id?: string
          id?: string
          parceiro_id?: string
          referencia_id?: string | null
          referencia_tipo?: string
          user_id?: string
          valor_compra?: number
          valor_desconto_aplicado?: number
        }
        Relationships: [
          {
            foreignKeyName: "parceiro_cupom_usos_cupom_id_fkey"
            columns: ["cupom_id"]
            isOneToOne: false
            referencedRelation: "parceiro_cupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parceiro_cupom_usos_parceiro_id_fkey"
            columns: ["parceiro_id"]
            isOneToOne: false
            referencedRelation: "parceiros"
            referencedColumns: ["id"]
          },
        ]
      }
      parceiro_cupons: {
        Row: {
          ativo: boolean
          codigo: string
          created_at: string
          descricao: string | null
          id: string
          max_usos: number | null
          parceiro_id: string
          servicos_aplicaveis: Json | null
          tipo_desconto: string
          updated_at: string
          usos_atuais: number
          valido_ate: string | null
          valor_desconto: number
          valor_minimo_compra: number | null
        }
        Insert: {
          ativo?: boolean
          codigo: string
          created_at?: string
          descricao?: string | null
          id?: string
          max_usos?: number | null
          parceiro_id: string
          servicos_aplicaveis?: Json | null
          tipo_desconto?: string
          updated_at?: string
          usos_atuais?: number
          valido_ate?: string | null
          valor_desconto?: number
          valor_minimo_compra?: number | null
        }
        Update: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          descricao?: string | null
          id?: string
          max_usos?: number | null
          parceiro_id?: string
          servicos_aplicaveis?: Json | null
          tipo_desconto?: string
          updated_at?: string
          usos_atuais?: number
          valido_ate?: string | null
          valor_desconto?: number
          valor_minimo_compra?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "parceiro_cupons_parceiro_id_fkey"
            columns: ["parceiro_id"]
            isOneToOne: false
            referencedRelation: "parceiros"
            referencedColumns: ["id"]
          },
        ]
      }
      parceiro_faixas_comissao: {
        Row: {
          beneficios: Json
          cor: string
          created_at: string
          icone: string
          id: string
          meta_vendas_minima: number
          nome: string
          ordem: number
          percentual_comissao: number
        }
        Insert: {
          beneficios?: Json
          cor?: string
          created_at?: string
          icone?: string
          id?: string
          meta_vendas_minima?: number
          nome: string
          ordem?: number
          percentual_comissao?: number
        }
        Update: {
          beneficios?: Json
          cor?: string
          created_at?: string
          icone?: string
          id?: string
          meta_vendas_minima?: number
          nome?: string
          ordem?: number
          percentual_comissao?: number
        }
        Relationships: []
      }
      parceiro_vales: {
        Row: {
          created_at: string
          id: string
          parceiro_id: string
          vale_presente_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          parceiro_id: string
          vale_presente_id: string
        }
        Update: {
          created_at?: string
          id?: string
          parceiro_id?: string
          vale_presente_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "parceiro_vales_parceiro_id_fkey"
            columns: ["parceiro_id"]
            isOneToOne: false
            referencedRelation: "parceiros"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "parceiro_vales_vale_presente_id_fkey"
            columns: ["vale_presente_id"]
            isOneToOne: false
            referencedRelation: "vale_presentes"
            referencedColumns: ["id"]
          },
        ]
      }
      parceiros: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          email_comercial: string | null
          faixa_comissao_atual: string
          id: string
          instagram: string | null
          logo_url: string | null
          nome_empresa: string
          segmento: string
          site_url: string | null
          slug: string
          telefone: string | null
          total_vendas_acumulado: number
          updated_at: string
          user_id: string
          verificado: boolean
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          email_comercial?: string | null
          faixa_comissao_atual?: string
          id?: string
          instagram?: string | null
          logo_url?: string | null
          nome_empresa: string
          segmento?: string
          site_url?: string | null
          slug: string
          telefone?: string | null
          total_vendas_acumulado?: number
          updated_at?: string
          user_id: string
          verificado?: boolean
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          email_comercial?: string | null
          faixa_comissao_atual?: string
          id?: string
          instagram?: string | null
          logo_url?: string | null
          nome_empresa?: string
          segmento?: string
          site_url?: string | null
          slug?: string
          telefone?: string | null
          total_vendas_acumulado?: number
          updated_at?: string
          user_id?: string
          verificado?: boolean
        }
        Relationships: []
      }
      pausas_posturais_config: {
        Row: {
          ativo: boolean
          created_at: string
          dias_semana: number[]
          horario_fim: string
          horario_inicio: string
          id: string
          intervalo_minutos: number
          updated_at: string
          user_id: string
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          dias_semana?: number[]
          horario_fim?: string
          horario_inicio?: string
          id?: string
          intervalo_minutos?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          ativo?: boolean
          created_at?: string
          dias_semana?: number[]
          horario_fim?: string
          horario_inicio?: string
          id?: string
          intervalo_minutos?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      pausas_posturais_registro: {
        Row: {
          completado: boolean
          created_at: string
          data: string
          duracao_segundos: number
          exercicio_id: string
          id: string
          user_id: string
        }
        Insert: {
          completado?: boolean
          created_at?: string
          data?: string
          duracao_segundos?: number
          exercicio_id: string
          id?: string
          user_id: string
        }
        Update: {
          completado?: boolean
          created_at?: string
          data?: string
          duracao_segundos?: number
          exercicio_id?: string
          id?: string
          user_id?: string
        }
        Relationships: []
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
      permissions: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          resource: string
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          resource: string
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          resource?: string
        }
        Relationships: []
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
      planos_dieta: {
        Row: {
          created_at: string
          descricao: string | null
          disponivel: boolean | null
          duracao_dias: number | null
          fase: string
          id: string
          nome: string
          orientacoes: string | null
          protocolo_id: string | null
          refeicoes: Json
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao_dias?: number | null
          fase?: string
          id?: string
          nome: string
          orientacoes?: string | null
          protocolo_id?: string | null
          refeicoes?: Json
        }
        Update: {
          created_at?: string
          descricao?: string | null
          disponivel?: boolean | null
          duracao_dias?: number | null
          fase?: string
          id?: string
          nome?: string
          orientacoes?: string | null
          protocolo_id?: string | null
          refeicoes?: Json
        }
        Relationships: [
          {
            foreignKeyName: "planos_dieta_protocolo_id_fkey"
            columns: ["protocolo_id"]
            isOneToOne: false
            referencedRelation: "protocolos"
            referencedColumns: ["id"]
          },
        ]
      }
      produto_elementos: {
        Row: {
          created_at: string
          elemento: string
          id: string
          multiplicador: number
          produto_id: string | null
          servico_nome: string | null
        }
        Insert: {
          created_at?: string
          elemento: string
          id?: string
          multiplicador?: number
          produto_id?: string | null
          servico_nome?: string | null
        }
        Update: {
          created_at?: string
          elemento?: string
          id?: string
          multiplicador?: number
          produto_id?: string | null
          servico_nome?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "produto_elementos_produto_id_fkey"
            columns: ["produto_id"]
            isOneToOne: true
            referencedRelation: "produtos"
            referencedColumns: ["id"]
          },
        ]
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
          asaas_customer_id: string | null
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
          asaas_customer_id?: string | null
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
          asaas_customer_id?: string | null
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
      protocolo_secao_checklist: {
        Row: {
          concluido: boolean
          created_at: string
          data_conclusao: string | null
          id: string
          item_key: string
          secao_id: string
          user_id: string
        }
        Insert: {
          concluido?: boolean
          created_at?: string
          data_conclusao?: string | null
          id?: string
          item_key: string
          secao_id: string
          user_id: string
        }
        Update: {
          concluido?: boolean
          created_at?: string
          data_conclusao?: string | null
          id?: string
          item_key?: string
          secao_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "protocolo_secao_checklist_secao_id_fkey"
            columns: ["secao_id"]
            isOneToOne: false
            referencedRelation: "protocolo_secoes_clinicas"
            referencedColumns: ["id"]
          },
        ]
      }
      protocolo_secoes_clinicas: {
        Row: {
          conteudo: Json
          cor: string | null
          created_at: string
          descricao: string | null
          icone: string | null
          id: string
          ordem: number
          protocolo_id: string
          titulo: string
        }
        Insert: {
          conteudo?: Json
          cor?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          ordem?: number
          protocolo_id: string
          titulo: string
        }
        Update: {
          conteudo?: Json
          cor?: string | null
          created_at?: string
          descricao?: string | null
          icone?: string | null
          id?: string
          ordem?: number
          protocolo_id?: string
          titulo?: string
        }
        Relationships: [
          {
            foreignKeyName: "protocolo_secoes_clinicas_protocolo_id_fkey"
            columns: ["protocolo_id"]
            isOneToOne: false
            referencedRelation: "protocolos"
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
      receitas_alquimia: {
        Row: {
          agua_requerido: number
          ar_requerido: number
          ativo: boolean
          created_at: string
          descricao: string | null
          elemento_gerado: string | null
          eter_requerido: number
          fogo_requerido: number
          icone: string | null
          id: string
          nivel_minimo: string
          nome: string
          ordem: number
          quantidade_gerada: number | null
          recompensa_descricao: string | null
          recompensa_tipo: string
          recompensa_valor: number
          terra_requerido: number
          usos_maximos: number | null
        }
        Insert: {
          agua_requerido?: number
          ar_requerido?: number
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          elemento_gerado?: string | null
          eter_requerido?: number
          fogo_requerido?: number
          icone?: string | null
          id?: string
          nivel_minimo?: string
          nome: string
          ordem?: number
          quantidade_gerada?: number | null
          recompensa_descricao?: string | null
          recompensa_tipo: string
          recompensa_valor?: number
          terra_requerido?: number
          usos_maximos?: number | null
        }
        Update: {
          agua_requerido?: number
          ar_requerido?: number
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          elemento_gerado?: string | null
          eter_requerido?: number
          fogo_requerido?: number
          icone?: string | null
          id?: string
          nivel_minimo?: string
          nome?: string
          ordem?: number
          quantidade_gerada?: number | null
          recompensa_descricao?: string | null
          recompensa_tipo?: string
          recompensa_valor?: number
          terra_requerido?: number
          usos_maximos?: number | null
        }
        Relationships: []
      }
      recomendacoes_ia: {
        Row: {
          aceita: boolean | null
          confianca: number
          created_at: string
          dados_base: Json
          descricao: string
          id: string
          tipo: string
          titulo: string
          user_id: string
        }
        Insert: {
          aceita?: boolean | null
          confianca?: number
          created_at?: string
          dados_base?: Json
          descricao: string
          id?: string
          tipo?: string
          titulo: string
          user_id: string
        }
        Update: {
          aceita?: boolean | null
          confianca?: number
          created_at?: string
          dados_base?: Json
          descricao?: string
          id?: string
          tipo?: string
          titulo?: string
          user_id?: string
        }
        Relationships: []
      }
      recompensas_cromos: {
        Row: {
          ativo: boolean
          created_at: string
          descricao: string | null
          elemento_requerido: string
          estoque: number | null
          icone: string | null
          id: string
          nivel_minimo: string
          nome: string
          ordem: number
          quantidade_requerida: number
          recompensa_descricao: string | null
          recompensa_tipo: string
          recompensa_valor: number
        }
        Insert: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          elemento_requerido: string
          estoque?: number | null
          icone?: string | null
          id?: string
          nivel_minimo?: string
          nome: string
          ordem?: number
          quantidade_requerida: number
          recompensa_descricao?: string | null
          recompensa_tipo: string
          recompensa_valor?: number
        }
        Update: {
          ativo?: boolean
          created_at?: string
          descricao?: string | null
          elemento_requerido?: string
          estoque?: number | null
          icone?: string | null
          id?: string
          nivel_minimo?: string
          nome?: string
          ordem?: number
          quantidade_requerida?: number
          recompensa_descricao?: string | null
          recompensa_tipo?: string
          recompensa_valor?: number
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
      resgates_cromos: {
        Row: {
          codigo_resgate: string
          created_at: string
          expira_em: string
          id: string
          receita_id: string | null
          recompensa_id: string | null
          tipo: string
          user_id: string
          utilizado: boolean
          utilizado_em: string | null
        }
        Insert: {
          codigo_resgate?: string
          created_at?: string
          expira_em?: string
          id?: string
          receita_id?: string | null
          recompensa_id?: string | null
          tipo: string
          user_id: string
          utilizado?: boolean
          utilizado_em?: string | null
        }
        Update: {
          codigo_resgate?: string
          created_at?: string
          expira_em?: string
          id?: string
          receita_id?: string | null
          recompensa_id?: string | null
          tipo?: string
          user_id?: string
          utilizado?: boolean
          utilizado_em?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resgates_cromos_receita_id_fkey"
            columns: ["receita_id"]
            isOneToOne: false
            referencedRelation: "receitas_alquimia"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resgates_cromos_recompensa_id_fkey"
            columns: ["recompensa_id"]
            isOneToOne: false
            referencedRelation: "recompensas_cromos"
            referencedColumns: ["id"]
          },
        ]
      }
      resinkra_user_settings: {
        Row: {
          created_at: string | null
          default_brand_id: string | null
          id: string
          language: string | null
          max_scripts_per_month: number | null
          notifications_enabled: boolean | null
          scripts_generated_this_month: number | null
          subscription_plan: string | null
          subscription_status: string | null
          theme: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          default_brand_id?: string | null
          id?: string
          language?: string | null
          max_scripts_per_month?: number | null
          notifications_enabled?: boolean | null
          scripts_generated_this_month?: number | null
          subscription_plan?: string | null
          subscription_status?: string | null
          theme?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          default_brand_id?: string | null
          id?: string
          language?: string | null
          max_scripts_per_month?: number | null
          notifications_enabled?: boolean | null
          scripts_generated_this_month?: number | null
          subscription_plan?: string | null
          subscription_status?: string | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resinkra_user_settings_default_brand_id_fkey"
            columns: ["default_brand_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      role_permissions: {
        Row: {
          granted_at: string | null
          permission_id: string
          role_id: string
        }
        Insert: {
          granted_at?: string | null
          permission_id: string
          role_id: string
        }
        Update: {
          granted_at?: string | null
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      scripts: {
        Row: {
          additional_info: string | null
          audio_suggestion: string | null
          body: Json | null
          brand_id: string | null
          caption: string | null
          climax: string | null
          content_type: string
          created_at: string | null
          cta: string | null
          depth_level: number | null
          duration: string | null
          engagement_tips: string[] | null
          estimated_duration_seconds: number | null
          hashtags: string[] | null
          hook: string | null
          hook_visual_direction: string | null
          id: string
          is_favorite: boolean | null
          is_template: boolean | null
          objective: string | null
          raw_ai_response: Json | null
          score_clarity: number | null
          score_cta: number | null
          score_emotion: number | null
          score_hook: number | null
          score_total: number | null
          score_virality: number | null
          status: string | null
          style: string | null
          template_name: string | null
          topic: string
          updated_at: string | null
          user_id: string
          variation_of: string | null
        }
        Insert: {
          additional_info?: string | null
          audio_suggestion?: string | null
          body?: Json | null
          brand_id?: string | null
          caption?: string | null
          climax?: string | null
          content_type: string
          created_at?: string | null
          cta?: string | null
          depth_level?: number | null
          duration?: string | null
          engagement_tips?: string[] | null
          estimated_duration_seconds?: number | null
          hashtags?: string[] | null
          hook?: string | null
          hook_visual_direction?: string | null
          id?: string
          is_favorite?: boolean | null
          is_template?: boolean | null
          objective?: string | null
          raw_ai_response?: Json | null
          score_clarity?: number | null
          score_cta?: number | null
          score_emotion?: number | null
          score_hook?: number | null
          score_total?: number | null
          score_virality?: number | null
          status?: string | null
          style?: string | null
          template_name?: string | null
          topic: string
          updated_at?: string | null
          user_id: string
          variation_of?: string | null
        }
        Update: {
          additional_info?: string | null
          audio_suggestion?: string | null
          body?: Json | null
          brand_id?: string | null
          caption?: string | null
          climax?: string | null
          content_type?: string
          created_at?: string | null
          cta?: string | null
          depth_level?: number | null
          duration?: string | null
          engagement_tips?: string[] | null
          estimated_duration_seconds?: number | null
          hashtags?: string[] | null
          hook?: string | null
          hook_visual_direction?: string | null
          id?: string
          is_favorite?: boolean | null
          is_template?: boolean | null
          objective?: string | null
          raw_ai_response?: Json | null
          score_clarity?: number | null
          score_cta?: number | null
          score_emotion?: number | null
          score_hook?: number | null
          score_total?: number | null
          score_virality?: number | null
          status?: string | null
          style?: string | null
          template_name?: string | null
          topic?: string
          updated_at?: string | null
          user_id?: string
          variation_of?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "scripts_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "scripts_variation_of_fkey"
            columns: ["variation_of"]
            isOneToOne: false
            referencedRelation: "scripts"
            referencedColumns: ["id"]
          },
        ]
      }
      servicos: {
        Row: {
          beneficios: string[] | null
          cashback_percentual: number | null
          categoria: string | null
          created_at: string
          descricao: string | null
          descricao_detalhada: string | null
          disponivel: boolean | null
          duracao: number
          id: string
          imagem_capa: string | null
          imagens: string[] | null
          nome: string
          preco: number
          video_url: string | null
        }
        Insert: {
          beneficios?: string[] | null
          cashback_percentual?: number | null
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          descricao_detalhada?: string | null
          disponivel?: boolean | null
          duracao: number
          id?: string
          imagem_capa?: string | null
          imagens?: string[] | null
          nome: string
          preco: number
          video_url?: string | null
        }
        Update: {
          beneficios?: string[] | null
          cashback_percentual?: number | null
          categoria?: string | null
          created_at?: string
          descricao?: string | null
          descricao_detalhada?: string | null
          disponivel?: boolean | null
          duracao?: number
          id?: string
          imagem_capa?: string | null
          imagens?: string[] | null
          nome?: string
          preco?: number
          video_url?: string | null
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
      social_posts: {
        Row: {
          agendamento_id: string | null
          aprovado_em: string | null
          aprovado_por: string | null
          cashback_valor: number
          created_at: string
          cromos_ether: number | null
          descricao: string | null
          id: string
          link_post: string | null
          missao_id: string | null
          motivo_rejeicao: string | null
          multiplicador_aplicado: number | null
          plataforma: string
          screenshot_url: string | null
          status: string
          tipo_post: string
          updated_at: string
          user_id: string
          xp_valor: number
        }
        Insert: {
          agendamento_id?: string | null
          aprovado_em?: string | null
          aprovado_por?: string | null
          cashback_valor?: number
          created_at?: string
          cromos_ether?: number | null
          descricao?: string | null
          id?: string
          link_post?: string | null
          missao_id?: string | null
          motivo_rejeicao?: string | null
          multiplicador_aplicado?: number | null
          plataforma?: string
          screenshot_url?: string | null
          status?: string
          tipo_post?: string
          updated_at?: string
          user_id: string
          xp_valor?: number
        }
        Update: {
          agendamento_id?: string | null
          aprovado_em?: string | null
          aprovado_por?: string | null
          cashback_valor?: number
          created_at?: string
          cromos_ether?: number | null
          descricao?: string | null
          id?: string
          link_post?: string | null
          missao_id?: string | null
          motivo_rejeicao?: string | null
          multiplicador_aplicado?: number | null
          plataforma?: string
          screenshot_url?: string | null
          status?: string
          tipo_post?: string
          updated_at?: string
          user_id?: string
          xp_valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_agendamento_id_fkey"
            columns: ["agendamento_id"]
            isOneToOne: false
            referencedRelation: "agendamentos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_posts_missao_id_fkey"
            columns: ["missao_id"]
            isOneToOne: false
            referencedRelation: "moments_missoes"
            referencedColumns: ["id"]
          },
        ]
      }
      social_posts_config: {
        Row: {
          ativo: boolean
          cashback_valor: number
          created_at: string
          descricao: string | null
          icone: string
          id: string
          label: string
          tipo_post: string
          xp_valor: number
        }
        Insert: {
          ativo?: boolean
          cashback_valor?: number
          created_at?: string
          descricao?: string | null
          icone?: string
          id?: string
          label: string
          tipo_post: string
          xp_valor?: number
        }
        Update: {
          ativo?: boolean
          cashback_valor?: number
          created_at?: string
          descricao?: string | null
          icone?: string
          id?: string
          label?: string
          tipo_post?: string
          xp_valor?: number
        }
        Relationships: []
      }
      team_members: {
        Row: {
          brand_id: string | null
          created_at: string | null
          id: string
          invited_email: string | null
          member_id: string
          owner_id: string
          role: string | null
          status: string | null
        }
        Insert: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          invited_email?: string | null
          member_id: string
          owner_id: string
          role?: string | null
          status?: string | null
        }
        Update: {
          brand_id?: string | null
          created_at?: string | null
          id?: string
          invited_email?: string | null
          member_id?: string
          owner_id?: string
          role?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      terapeuta_cupons: {
        Row: {
          ativo: boolean
          codigo: string
          created_at: string
          descricao: string | null
          id: string
          max_usos: number | null
          servicos_aplicaveis: Json | null
          terapeuta_id: string
          tipo_desconto: string
          updated_at: string
          usos_atuais: number
          valido_ate: string | null
          valor_desconto: number
          valor_minimo_compra: number | null
        }
        Insert: {
          ativo?: boolean
          codigo: string
          created_at?: string
          descricao?: string | null
          id?: string
          max_usos?: number | null
          servicos_aplicaveis?: Json | null
          terapeuta_id: string
          tipo_desconto?: string
          updated_at?: string
          usos_atuais?: number
          valido_ate?: string | null
          valor_desconto?: number
          valor_minimo_compra?: number | null
        }
        Update: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          descricao?: string | null
          id?: string
          max_usos?: number | null
          servicos_aplicaveis?: Json | null
          terapeuta_id?: string
          tipo_desconto?: string
          updated_at?: string
          usos_atuais?: number
          valido_ate?: string | null
          valor_desconto?: number
          valor_minimo_compra?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "terapeuta_cupons_terapeuta_id_fkey"
            columns: ["terapeuta_id"]
            isOneToOne: false
            referencedRelation: "terapeutas"
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
          user_id: string | null
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
          user_id?: string | null
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
          user_id?: string | null
        }
        Relationships: []
      }
      terapias_conteudo: {
        Row: {
          ativo: boolean | null
          beneficios: string[] | null
          como_funciona: string | null
          contraindicacoes: string[] | null
          created_at: string
          descricao: string | null
          duracao_media: string | null
          galeria_urls: string[] | null
          icone: string | null
          id: string
          imagem_capa: string | null
          indicacoes: string[] | null
          nome: string
          ordem: number | null
          slug: string
          subtitulo: string | null
          updated_at: string
          video_urls: string[] | null
        }
        Insert: {
          ativo?: boolean | null
          beneficios?: string[] | null
          como_funciona?: string | null
          contraindicacoes?: string[] | null
          created_at?: string
          descricao?: string | null
          duracao_media?: string | null
          galeria_urls?: string[] | null
          icone?: string | null
          id?: string
          imagem_capa?: string | null
          indicacoes?: string[] | null
          nome: string
          ordem?: number | null
          slug: string
          subtitulo?: string | null
          updated_at?: string
          video_urls?: string[] | null
        }
        Update: {
          ativo?: boolean | null
          beneficios?: string[] | null
          como_funciona?: string | null
          contraindicacoes?: string[] | null
          created_at?: string
          descricao?: string | null
          duracao_media?: string | null
          galeria_urls?: string[] | null
          icone?: string | null
          id?: string
          imagem_capa?: string | null
          indicacoes?: string[] | null
          nome?: string
          ordem?: number | null
          slug?: string
          subtitulo?: string | null
          updated_at?: string
          video_urls?: string[] | null
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
      transacoes_cromos: {
        Row: {
          created_at: string
          descricao: string | null
          elemento: string
          id: string
          quantidade: number
          referencia_id: string | null
          tipo: string
          user_id: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          elemento: string
          id?: string
          quantidade: number
          referencia_id?: string | null
          tipo: string
          user_id: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          elemento?: string
          id?: string
          quantidade?: number
          referencia_id?: string | null
          tipo?: string
          user_id?: string
        }
        Relationships: []
      }
      trends: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          niche: string | null
          relevance_score: number | null
          title: string
          trend_type: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          niche?: string | null
          relevance_score?: number | null
          title: string
          trend_type?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          niche?: string | null
          relevance_score?: number | null
          title?: string
          trend_type?: string | null
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
      user_streaks: {
        Row: {
          bonus_total_creditado: number
          id: string
          melhor_streak: number
          streak_atual: number
          ultima_semana_contada: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bonus_total_creditado?: number
          id?: string
          melhor_streak?: number
          streak_atual?: number
          ultima_semana_contada?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bonus_total_creditado?: number
          id?: string
          melhor_streak?: number
          streak_atual?: number
          ultima_semana_contada?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      usuario_conquistas: {
        Row: {
          conquista_id: string
          desbloqueada_em: string
          id: string
          recompensa_creditada: boolean
          user_id: string
        }
        Insert: {
          conquista_id: string
          desbloqueada_em?: string
          id?: string
          recompensa_creditada?: boolean
          user_id: string
        }
        Update: {
          conquista_id?: string
          desbloqueada_em?: string
          id?: string
          recompensa_creditada?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "usuario_conquistas_conquista_id_fkey"
            columns: ["conquista_id"]
            isOneToOne: false
            referencedRelation: "conquistas"
            referencedColumns: ["id"]
          },
        ]
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
      vale_presentes: {
        Row: {
          codigo: string
          comprador_id: string
          created_at: string
          data_entrega_agendada: string | null
          destinatario_email: string | null
          destinatario_nome: string
          experiencia_descricao: string | null
          experiencia_nome: string | null
          id: string
          mensagem: string | null
          servicos_inclusos: Json | null
          status: string
          tema: string
          tipo: string
          usado_em: string | null
          usado_por: string | null
          validade: string
          valor: number
        }
        Insert: {
          codigo?: string
          comprador_id: string
          created_at?: string
          data_entrega_agendada?: string | null
          destinatario_email?: string | null
          destinatario_nome: string
          experiencia_descricao?: string | null
          experiencia_nome?: string | null
          id?: string
          mensagem?: string | null
          servicos_inclusos?: Json | null
          status?: string
          tema?: string
          tipo?: string
          usado_em?: string | null
          usado_por?: string | null
          validade?: string
          valor: number
        }
        Update: {
          codigo?: string
          comprador_id?: string
          created_at?: string
          data_entrega_agendada?: string | null
          destinatario_email?: string | null
          destinatario_nome?: string
          experiencia_descricao?: string | null
          experiencia_nome?: string | null
          id?: string
          mensagem?: string | null
          servicos_inclusos?: Json | null
          status?: string
          tema?: string
          tipo?: string
          usado_em?: string | null
          usado_por?: string | null
          validade?: string
          valor?: number
        }
        Relationships: []
      }
      viral_analyses: {
        Row: {
          adapted_script: Json | null
          brand_id: string | null
          content_type: string | null
          created_at: string | null
          emotional_triggers: string[] | null
          hook_effectiveness: number | null
          hook_type: string | null
          id: string
          key_takeaways: string[] | null
          narrative_structure: string | null
          original_content: string
          overall_score: number | null
          retention_techniques: string[] | null
          user_id: string
          virality_elements: string[] | null
        }
        Insert: {
          adapted_script?: Json | null
          brand_id?: string | null
          content_type?: string | null
          created_at?: string | null
          emotional_triggers?: string[] | null
          hook_effectiveness?: number | null
          hook_type?: string | null
          id?: string
          key_takeaways?: string[] | null
          narrative_structure?: string | null
          original_content: string
          overall_score?: number | null
          retention_techniques?: string[] | null
          user_id: string
          virality_elements?: string[] | null
        }
        Update: {
          adapted_script?: Json | null
          brand_id?: string | null
          content_type?: string | null
          created_at?: string | null
          emotional_triggers?: string[] | null
          hook_effectiveness?: number | null
          hook_type?: string | null
          id?: string
          key_takeaways?: string[] | null
          narrative_structure?: string | null
          original_content?: string
          overall_score?: number | null
          retention_techniques?: string[] | null
          user_id?: string
          virality_elements?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "viral_analyses_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_conversas: {
        Row: {
          created_at: string
          email: string | null
          id: string
          mensagens: Json
          metadata: Json | null
          necessidade: string | null
          nome: string | null
          status: string
          telefone: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id?: string
          mensagens?: Json
          metadata?: Json | null
          necessidade?: string | null
          nome?: string | null
          status?: string
          telefone: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
          mensagens?: Json
          metadata?: Json | null
          necessidade?: string | null
          nome?: string | null
          status?: string
          telefone?: string
          updated_at?: string
        }
        Relationships: []
      }
      whatsapp_logs: {
        Row: {
          created_at: string
          enviado_em: string | null
          erro: string | null
          id: string
          mensagem: string
          referencia_id: string | null
          referencia_tipo: string | null
          status: string
          telefone: string
          tipo: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          enviado_em?: string | null
          erro?: string | null
          id?: string
          mensagem: string
          referencia_id?: string | null
          referencia_tipo?: string | null
          status?: string
          telefone: string
          tipo?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          enviado_em?: string | null
          erro?: string | null
          id?: string
          mensagem?: string
          referencia_id?: string | null
          referencia_tipo?: string | null
          status?: string
          telefone?: string
          tipo?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "whatsapp_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      user_permissions_mv: {
        Row: {
          action: string | null
          resource: string | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      check_and_unlock_achievements: {
        Args: { p_user_id: string }
        Returns: {
          conquista_codigo: string
          conquista_icone: string
          conquista_titulo: string
          recompensa: number
        }[]
      }
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
      executar_alquimia: { Args: { p_receita_id: string }; Returns: Json }
      get_achievements_ranking: {
        Args: { p_limit?: number }
        Returns: {
          is_current_user: boolean
          nome_exibicao: string
          posicao: number
          tier_nome: string
          total_gasto: number
          total_sessoes: number
        }[]
      }
      get_empresa_stats: { Args: { p_empresa_id: string }; Returns: Json }
      get_segmentacao_clientes: {
        Args: never
        Returns: {
          data_cadastro: string
          dias_sem_visita: number
          email: string
          nome: string
          segmento: string
          telefone: string
          ticket_medio: number
          tier_nome: string
          total_gasto: number
          total_pedidos: number
          total_sessoes: number
          ultima_visita: string
          user_id: string
        }[]
      }
      get_terapeuta_cartao: {
        Args: { terapeuta_uuid: string }
        Returns: {
          disponivel: boolean
          email: string
          especialidade: string
          foto_url: string
          id: string
          media_avaliacoes: number
          nome: string
          telefone: string
          total_avaliacoes: number
        }[]
      }
      get_terapeutas_publicos: {
        Args: never
        Returns: {
          disponivel: boolean
          especialidade: string
          foto_url: string
          id: string
          nome: string
        }[]
      }
      get_user_permissions: {
        Args: { p_user_id: string }
        Returns: {
          action: string
          resource: string
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
      has_permission: {
        Args: { p_action: string; p_resource: string; p_user_id: string }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_parceiro: { Args: { _user_id: string }; Returns: boolean }
      is_terapeuta: { Args: { _user_id: string }; Returns: boolean }
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
      process_expired_vales: {
        Args: never
        Returns: {
          vale_codigo: string
          vale_id: string
          vale_valor: number
        }[]
      }
      record_login_attempt: {
        Args: { p_email: string; p_ip_address?: string; p_success?: boolean }
        Returns: undefined
      }
      resgatar_recompensa_cromo: {
        Args: { p_recompensa_id: string }
        Returns: Json
      }
      resgatar_vale_presente: { Args: { p_codigo: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "user" | "parceiro" | "terapeuta"
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
      app_role: ["admin", "user", "parceiro", "terapeuta"],
    },
  },
} as const
