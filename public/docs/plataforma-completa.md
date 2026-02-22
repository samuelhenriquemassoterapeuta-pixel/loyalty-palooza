# 🏗️ Resinkra — Documentação Completa da Plataforma

> Gerado automaticamente · 22/02/2026

---

## 📋 Visão Geral

| Métrica | Valor |
|---|---|
| Tabelas no Banco | 134 |
| Políticas RLS | 366 |
| Edge Functions | 46 |
| Permissões RBAC | 30 |
| Componentes React | 300+ |
| Funções SQL | 51 |
| Storage Buckets | 11 |
| Triggers | 57 |
| Feature Folders | 29 |
| Cursos Completos | 35 |
| **Agentes IA** | **5** 🆕 |
| **Integrações Ativas** | **8** |

---

## 🏛️ Arquitetura

### Stack Principal
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS
- **UI**: Shadcn/UI + Framer Motion
- **Backend**: Lovable Cloud (Edge Functions em Deno/TypeScript)
- **Banco de Dados**: PostgreSQL com RLS
- **Mobile**: Capacitor (Android/iOS)
- **State Management**: TanStack Query (cache + invalidação)
- **Validação**: Zod + React Hook Form

### Padrão de Pastas
```
src/features/ — 29 Feature Folders
├── academy/           → Calculadora de diluição e ferramentas educativas
├── admin/             → Painel administrativo (39+ componentes)
├── agendamentos/      → Fluxo de agendamento com check-in QR
├── alongamento/       → Exercícios e pausas posturais
├── anamnese/          → Fichas de anamnese dinâmicas por serviço
├── avaliacao-postural/→ Fotos, ângulos e anotações
├── bem-estar/         → Diário de bem-estar, humor e wellness
├── cashback/          → Wallet, tiers, transações
├── conquistas/        → Gamificação, XP, ranking
├── corporativo/       → Portal B2B para empresas
├── cromos/            → Cromos colecionáveis por elementos
├── cupom/             → Editor de cupons de desconto
├── cursos/            → 35 cursos com progresso e certificados
├── dietas/            → Planos nutricionais personalizados
├── guia-clinico/      → Guia clínico interativo
├── landing/           → Landing page com parallax
├── liga/              → Liga de bem-estar e competições
├── loja/              → E-commerce interno (produtos + pacotes)
├── marketplace/       → Marketplace de terapeutas
├── materiais/         → Materiais gráficos e downloads
├── pagamento/         → Integração Asaas (PIX, boleto)
├── playlist/          → Playlist musical terapêutica
├── profile/           → Perfil do usuário + ficha nutricional
├── protocolos/        → Protocolos terapêuticos completos
├── resinkra-ai/       → IA para criação de conteúdo social
├── social/            → Resinkra Moments (social proof)
├── terapeuta/         → Dashboard do terapeuta
├── terapias/          → Catálogo de terapias
└── vale-presente/     → Sistema de vales digitais
```

---

## 🔐 Autenticação & RBAC

### Sistema de Autenticação
- Email/senha com verificação obrigatória
- Rate limiting: 5 tentativas falhas em 15 minutos
- Proteção HIBP (senhas vazadas)
- Tabela `login_attempts` para auditoria

### 4 Roles (Papéis)
| Role | Permissões | Descrição |
|---|---|---|
| Admin | 30/30 | Acesso total à plataforma |
| User | 21/30 | Básico + social + gamificação |
| Terapeuta | 13/30 | Clínico + cursos + agenda |
| Parceiro | 4/30 | Loja + cashback + cupons |

### Segurança do RBAC
- Roles armazenados em `user_roles` (separado de `profiles`)
- Anti-escalação: impossível alterar o próprio papel
- Cache via Materialized View `user_permissions_mv`
- Auto-refresh via triggers em `role_permissions`
- Funções `has_role()` e `has_permission()` como SECURITY DEFINER

### 30 Permissões Granulares
```sql
SELECT has_role('user-uuid', 'admin');           -- boolean
SELECT has_permission('user-uuid', 'admin', 'access');
SELECT * FROM get_user_permissions('user-uuid'); -- lista completa
```

---

## 🗄️ Banco de Dados (134 Tabelas)

### Organização por Domínio

| Grupo | Tabelas | Qtd |
|---|---|---|
| 👤 Usuários & Auth | profiles, user_roles, roles, login_attempts, audit_logs | 5 |
| 🔑 Permissões | permissions, role_permissions, user_permissions_mv | 3 |
| 📅 Serviços | servicos, servicos_detalhes, agendamentos, terapeutas, horarios_disponiveis | 5 |
| 🛒 Produtos & Loja | produtos, pedidos, pedido_itens, pacotes, pacotes_usuario, carrinho | 6 |
| 💰 Financeiro | transacoes, indicacoes, vale_presentes, pagamentos_asaas, cupons, assinaturas_planos, assinaturas_usuario | 7 |
| 🏆 Gamificação | desafios, desafio_participantes, checkins, conquistas, cromos_usuarios, badges, conquistas_usuario_badges | 7 |
| 🩺 Saúde & Protocolos | protocolos, usuario_protocolos, fichas_acompanhamento, avaliacoes_posturais, anotacoes_posturais, checklists_avaliacao, fichas_anamnese, anamnese_templates | 8 |
| 🥗 Nutrição | planos_dieta, diario_alimentar, ficha_nutricional, dietas_conteudo, historico_cirurgico | 5 |
| 📚 Educação | curso_modulos, curso_aulas, curso_progresso, curso_progresso_geral, curso_certificados, curso_aula_historico, curso_disclaimers, curso_review_log | 8 |
| 📱 Social | social_posts, social_posts_config, notificacoes, banners_promocionais, banners_dismissals | 5 |
| 🏢 Corporativo | empresas_corporativas, colaboradores_empresa, corporativo_beneficios, corporativo_cases, corporativo_contratos, corporativo_depoimentos, corporativo_eventos, corporativo_faq, corporativo_galeria, corporativo_logos, corporativo_planos | 11 |
| 📣 Marketing | campanhas_marketing, google_ads_metrics, landing_config | 3 |
| 🤝 Parceiros | parceiros, parceiro_cupons, parceiro_comissoes, parceiro_faixas_comissao | 4 |
| 🤖 IA & Conteúdo | brand_profiles, scripts, hooks, content_ideas, calendar_events, resi_agents_config, resi_conversations, resi_memory, chat_interactions, chat_sessions | 10 |
| 🧘 Bem-Estar | wellness_*, diario_bem_estar, humor_*, energia_* | 8+ |
| 🏋️ Exercícios | exercicios_alongamento, lembretes_alongamento, sessoes_alongamento | 3 |
| ⭐ Avaliações | avaliacoes, avaliacoes_playlist, feedback_rapido, exames_usuario, fotos_evolucao | 5 |
| 🎁 Recompensas | social_rewards_config, recompensas_cromos, receitas_alquimia, resgates_cromos | 4 |
| 🎵 Playlists | playlists | 1 |
| 💆 Head SPA | headspa_imagens | 1 |
| 🔧 Plataforma | platform_texts, platform_media, platform_modules, platform_theme, platform_edit_history, documentation_versions | 6 |

---

## ⚙️ Funções SQL & Triggers (51 funções, 57 triggers)

### Funções Principais

| Função | Descrição |
|---|---|
| `credit_cashback_on_order()` | Cashback automático em pedidos com multiplicador de tier |
| `credit_cashback_on_agendamento()` | Cashback em sessões terapêuticas concluídas |
| `process_referral_on_first_purchase()` | R$10 indicador + R$5 indicado na 1ª compra |
| `credit_cromos_on_order()` | Credita cromos elementais por compra |
| `credit_cromos_on_agendamento()` | Credita cromos por sessão concluída |
| `executar_alquimia()` | Combina cromos e gera recompensas |
| `resgatar_recompensa_cromo()` | Troca cromos por cashback/produtos |
| `credit_vale_presente_on_redeem()` | Credita valor do vale ao resgatante |
| `resgatar_vale_presente()` | Processo completo de resgate de vale |
| `validate_transaction_insert()` | Valida transações no server-side |
| `protect_referral_code()` | Impede alteração de código de indicação |
| `protect_pacote_sessoes()` | Protege sessões de pacotes |
| `protect_avaliacao_edit()` | Bloqueia edição de avaliação após 24h |
| `update_user_streak()` | Atualiza streak semanal com bônus |
| `get_user_tier()` | Calcula tier (Bronze/Prata/Ouro) |
| `get_segmentacao_clientes()` | Segmentação de clientes para marketing |
| `get_achievements_ranking()` | Ranking de conquistas anonimizado |
| `get_empresa_stats()` | Estatísticas corporativas |
| `has_role()` / `has_permission()` | Verificação de RBAC |
| `check_login_rate_limit()` | Rate limiting de login |
| `process_expired_cashback()` | Expira cashback vencido |
| `notify_expiring_cashback()` | Notifica cashback próximo de expirar |
| `update_curso_progresso_geral()` | Progresso de cursos com certificação |
| `emitir_certificado()` | Emite certificado ao concluir curso |

---

## 🖥️ Edge Functions (46 funções)

### 💳 Pagamentos (Asaas)
| Função | Descrição |
|---|---|
| `asaas-criar-cobranca` | Cria cobranças PIX/boleto/cartão via Asaas API v3 |
| `asaas-webhook` | Recebe callbacks de pagamento (CONFIRMED, REFUNDED) |
| `asaas-status` | Consulta status de pagamentos |

### 💬 Comunicação
| Função | Descrição |
|---|---|
| `enviar-whatsapp` | Envia mensagens via Z-API |
| `whatsapp-webhook` | Recebe mensagens WhatsApp + bot com tool calling |
| `enviar-campanha` | Dispara campanhas de marketing |
| `enviar-lembretes` | Lembretes de agendamento |
| `lembrete-alongamento` | Notifica pausas posturais |
| `notificacoes-inteligentes` | Notificações contextuais com IA |
| `enviar-email-notificacao` | Email transacional via Resend |
| `enviar-push` | Push notifications |

### 🤖 Inteligência Artificial
| Função | Descrição |
|---|---|
| `chat-assistente` | Assistente IA conversacional 24/7 (Gemini streaming) |
| `resi-agent-router` | Roteador central multi-agente (5 agentes) |
| `resi-whatsapp` | Agente Resi no WhatsApp |
| `resi-chat` | Chat contextual da Resi |
| `generate-script` | Gera roteiros para Reels/Stories |
| `generate-hooks` | Ganchos virais com score de poder |
| `generate-ideas` | 10 ideias por nicho e funil |
| `gerar-ideias-semanais` | Ideias semanais automatizadas |
| `analyze-viral` | Análise de potencial viral |
| `gerar-recomendacoes` | Recomendações personalizadas |
| `gerar-imagem-servico` | Gera imagens com IA |

### 🧘 Saúde & Bem-Estar
| Função | Descrição |
|---|---|
| `assistente-saude` | Assistente de saúde com contexto completo |
| `insights-saude` | Insights personalizados de saúde |
| `plano-bem-estar` | Plano de bem-estar gerado por IA |
| `recomendar-sessao` | Recomendação de sessão terapêutica |
| `reflexao-diario` | Reflexão do diário de bem-estar |
| `analise-progresso` | Análise de progresso do paciente |
| `wellness-insight` | Insight de wellness com IA |
| `wellness-correlations` | Correlações de bem-estar |
| `wellness-check-conquistas` | Verifica conquistas wellness |
| `wellness-update-streak` | Atualiza streak de bem-estar |
| `lembretes-wellness` | Lembretes de bem-estar |
| `lembrete-medidas` | Lembrete de registrar medidas |

### ⚙️ Infraestrutura
| Função | Descrição |
|---|---|
| `fetch-google-ads` | Coleta métricas Google Ads |
| `atualizar-trends` | Atualiza tendências e métricas |
| `curso-tts` | Text-to-Speech para cursos (ElevenLabs) |
| `processar-expiracoes` | Expira cashback vencido (cron) |
| `processar-vales-expirados` | Expira vales presente |
| `transferir-creditos` | Transferência P2P entre usuários |
| `check-rate-limit` | Rate limiting de login |
| `buscar-usuario` | Busca por email/telefone (admin-only) |
| `creditar-recompensa-sugestao` | Credita recompensa por sugestão |
| `cashback-inteligente` | Cashback sugerido por IA |
| `validar-playlist` | Valida links YouTube/Spotify |
| `notificar-roteiros-pendentes` | Notifica roteiros pendentes |

---

## 🤖 Sistema Multi-Agente Resi (5 Agentes)

### Arquitetura
```
Usuário → resi-agent-router → Detecta intenção → Agente especializado → Resposta
                           ↓
                     Cache 5min de config
                     Sessões persistentes
                     Contexto do usuário (tier, saldo)
```

### Agentes
| # | Agente | Emoji | Especialidade |
|---|---|---|---|
| 1 | Core | 💬 | Dúvidas gerais, cashback, plataforma |
| 2 | Agenda | 📅 | Agendamentos, sessões, horários |
| 3 | Creator | 🎬 | Roteiros e ideias para redes sociais |
| 4 | Loja | 🛒 | Produtos, pacotes, compras |
| 5 | Wellness | 🧘 | Saúde, bem-estar, protocolos |

### Tabelas de Suporte
- `resi_agents_config` — Configuração dos 5 agentes
- `chat_interactions` — Log de todas as interações
- `chat_sessions` — Sessões com histórico completo
- `resi_conversations` — Histórico por sessionId
- `resi_memory` — Memória de longo prazo por usuário

---

## 💾 Storage (11 Buckets)

| Bucket | Descrição | Acesso |
|---|---|---|
| `avatars` | Fotos de perfil | 🌐 Público |
| `fotos-evolucao` | Fotos de tratamento | 🔒 Privado (URLs assinadas 1h) |
| `avaliacoes-posturais` | Fotos posturais | 🔒 Privado |
| `exercise-videos` | Vídeos de exercícios | 🌐 Público |
| `social-posts` | Posts Resinkra Moments | 🔒 Privado |
| `exames-arquivos` | Exames do paciente | 🔒 Privado |
| `admin-uploads` | Uploads administrativos | 🌐 Público |
| `corporativo-media` | Mídia corporativa | 🌐 Público |
| `landing-media` | Mídia da landing page | 🌐 Público |
| `headspa-imagens` | Imagens head spa | 🌐 Público |
| `servico-imagens` | Imagens de serviços | 🌐 Público |

---

## 🔌 Integrações & APIs

| Integração | Uso | Secret |
|---|---|---|
| Asaas | PIX, boleto, cartão | `ASAAS_API_KEY`, `ASAAS_WEBHOOK_TOKEN` |
| Z-API | WhatsApp bot + envio | `ZAPI_INSTANCE_ID`, `ZAPI_TOKEN` |
| Google Ads | Métricas de campanhas | `GOOGLE_ADS_*` |
| Lovable AI | Gemini para conteúdo/chat | `LOVABLE_API_KEY` |
| Resend | Emails transacionais | `RESEND_API_KEY` |
| ElevenLabs | Text-to-Speech cursos | `ELEVENLABS_API_KEY` |

---

## 🛡️ Arquitetura de Segurança (5 Camadas)

### 1. Autenticação
- Email/senha com verificação obrigatória
- Rate limiting (5 tentativas / 15 min)
- Proteção HIBP (senhas vazadas)

### 2. Autorização (RBAC + Permissões Granulares)
- `user_roles` separada (anti-escalação)
- `has_role()` + `has_permission()` SECURITY DEFINER
- Cache via `user_permissions_mv` + auto-refresh
- `ProtectedRoute` + `AdminRoute` no frontend

### 3. Row Level Security (RLS)
- 366 políticas em todas as 134 tabelas
- Políticas RESTRICTIVE para bloquear anon
- Admins via `has_role()`, users via `auth.uid()`

### 4. Proteção de Dados
- Fotos sensíveis via URLs assinadas (1h)
- Triggers protegem código de indicação
- Validação server-side em transações
- Audit logs em tabelas críticas

### 5. Integrações Seguras
- API keys em Secrets (nunca no código)
- Webhooks com token de validação
- Edge Functions com CORS configurado

---

## 🔄 Fluxos de Negócio

### Compra/Sessão
```
Compra → Trigger calcula cashback (% do produto)
       → Multiplica pelo tier (Bronze 1x, Prata 1.5x, Ouro 2x)
       → Insere em transacoes (expira: 90 dias)
       → Credita cromos do elemento correspondente
       → Notificação automática
```

### Agendamento
```
Agendar → Notificação para terapeuta
        → Lembrete automático pré-sessão (WhatsApp/push)
        → Check-in via QR Code
        → Feedback pós-sessão (emoji + comentário)
        → Cashback + cromos creditados ao concluir
```

### Indicação
```
Amigo se cadastra com código → Amigo faz primeira compra
→ R$10 ao indicador + R$5 ao indicado (cashback 90 dias)
```

### Resinkra Moments (Social)
```
Usuário posta foto → Admin aprova
→ Cashback + XP + Cromos Éther creditados
→ Ranking semanal atualizado
→ Missões especiais com multiplicadores
```

### Alquimia (Cromos)
```
Usuário combina cromos → Receita valida saldo
→ Debita cromos + credita recompensa
→ Notificação de sucesso
```

---

## 📚 Cursos (35 Cursos Completos)

### Estrutura
- 17 cursos base + 18 cursos de expansão
- Módulos com aulas progressivas
- Sistema de quiz e checklist
- Progresso salvo no banco (`curso_progresso_geral`)
- Certificados automáticos ao concluir
- Text-to-Speech via ElevenLabs
- Review workflow para auditoria de conteúdo

### Métricas de Progresso
```sql
SELECT * FROM get_cursos_em_andamento('user-uuid');
SELECT emitir_certificado('user-uuid', 'curso-id', 'Nome do Curso');
```

---

## 🔧 Editor da Plataforma

### Tabelas
- `platform_texts` — Textos configuráveis (títulos, CTAs, legendas)
- `platform_media` — URLs de imagens/banners
- `platform_modules` — Ativar/desativar módulos
- `platform_theme` — Cores e temas
- `platform_edit_history` — Auditoria de alterações

### Uso no Frontend
```tsx
const { texts, media, modules } = usePlatformConfig();

// Textos dinâmicos
<h1>{texts['landing.titulo'] || 'Bem-vindo à Resinkra'}</h1>

// Módulos condicionais
<ModuleWrapper moduleName="cashback">
  <CashbackSection />
</ModuleWrapper>
```

---

## 📊 Últimas Atualizações

| Data | Mudança |
|---|---|
| 22/02/2026 | Editor da Plataforma (5 tabelas, hooks, ModuleWrapper) |
| 22/02/2026 | Sistema de versionamento de documentação |
| 20/02/2026 | Sistema Multi-Agente Resi (reescrita completa) |
| 20/02/2026 | 35 cursos completos com certificados |
| 19/02/2026 | 5 agentes IA especializados |
| 19/02/2026 | 46 Edge Functions operacionais |

---

> Resinkra © 2026 — Plataforma de bem-estar com gamificação, IA e cashback inteligente.
