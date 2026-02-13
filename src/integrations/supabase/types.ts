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
      social_posts: {
        Row: {
          agendamento_id: string | null
          aprovado_em: string | null
          aprovado_por: string | null
          cashback_valor: number
          created_at: string
          descricao: string | null
          id: string
          link_post: string | null
          motivo_rejeicao: string | null
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
          descricao?: string | null
          id?: string
          link_post?: string | null
          motivo_rejeicao?: string | null
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
          descricao?: string | null
          id?: string
          link_post?: string | null
          motivo_rejeicao?: string | null
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
      is_parceiro: { Args: { _user_id: string }; Returns: boolean }
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
      resgatar_vale_presente: { Args: { p_codigo: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "user" | "parceiro"
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
      app_role: ["admin", "user", "parceiro"],
    },
  },
} as const
