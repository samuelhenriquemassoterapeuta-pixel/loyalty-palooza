/**
 * Generates a comprehensive Markdown document of the entire platform.
 */
export function generatePlatformMarkdown(): string {
  let md = `# 🏗️ Resinkra — Documentação Completa da Plataforma\n`;
  md += `> Gerado automaticamente · ${new Date().toLocaleDateString("pt-BR")}\n\n`;

  // ── 1. Visão Geral ──
  md += `---\n\n## 📋 Visão Geral\n\n`;
  md += `| Métrica | Valor |\n|---|---|\n`;
  md += `| Tabelas no Banco | 134 |\n`;
  md += `| Políticas RLS | 366 |\n`;
  md += `| Edge Functions | 46 |\n`;
  md += `| Permissões RBAC | 30 |\n`;
  md += `| Componentes React | 300+ |\n`;
  md += `| Funções SQL | 51 |\n`;
  md += `| Storage Buckets | 11 |\n`;
  md += `| Triggers | 57 |\n`;
  md += `| Feature Folders | 29 |\n`;
  md += `| Cursos Completos | 35 |\n\n`;

  // ── 2. Stack Tecnológico ──
  md += `---\n\n## ⚙️ Stack Tecnológico\n\n`;
  md += `| Camada | Tecnologia |\n|---|---|\n`;
  md += `| Frontend | React 18 + TypeScript |\n`;
  md += `| Build | Vite |\n`;
  md += `| Estilização | Tailwind CSS + Shadcn/UI |\n`;
  md += `| Animações | Framer Motion |\n`;
  md += `| Estado / Fetch | TanStack Query |\n`;
  md += `| Formulários | React Hook Form + Zod |\n`;
  md += `| Backend | Supabase (Lovable Cloud) |\n`;
  md += `| Edge Functions | Deno / TypeScript |\n`;
  md += `| Mobile | Capacitor (Android / iOS) |\n`;
  md += `| Pagamentos | Asaas (PIX, boleto, cartão) |\n`;
  md += `| WhatsApp | Z-API |\n`;
  md += `| IA | Lovable AI (GPT, Gemini) |\n`;
  md += `| TTS | ElevenLabs |\n`;
  md += `| Email | Resend |\n\n`;

  // ── 3. Feature Folders ──
  md += `---\n\n## 📁 Estrutura de Diretórios (Feature Folders)\n\n`;
  const features = [
    { name: "academy/", desc: "Calculadora de diluição e ferramentas educativas" },
    { name: "admin/", desc: "Painel administrativo (39+ componentes, 15+ abas)" },
    { name: "agendamentos/", desc: "Fluxo de agendamento com check-in QR e feedback pós-sessão" },
    { name: "alongamento/", desc: "Exercícios e pausas posturais com timer e lembretes" },
    { name: "anamnese/", desc: "Fichas de anamnese dinâmicas por serviço com templates configuráveis" },
    { name: "avaliacao-postural/", desc: "Fotos 4 vistas, ângulos e anotações por ponto anatômico" },
    { name: "bem-estar/", desc: "Diário de bem-estar, humor, sono, energia e wellness com IA" },
    { name: "cashback/", desc: "Wallet digital, tiers (Bronze/Prata/Ouro), transações e expiração" },
    { name: "conquistas/", desc: "Gamificação completa: XP, badges, ranking, desafios" },
    { name: "corporativo/", desc: "Portal B2B — planos QVT, cases, depoimentos, galeria, FAQ" },
    { name: "cromos/", desc: "Cromos colecionáveis por elementos (água, fogo, terra, ar, éter)" },
    { name: "cupom/", desc: "Editor de cupons de desconto com regras e expiração" },
    { name: "cursos/", desc: "35 cursos completos (17 base + 18 expansão) com módulos, aulas, quiz, checklist e certificação" },
    { name: "dietas/", desc: "Planos nutricionais, diário alimentar, ficha nutricional" },
    { name: "guia-clinico/", desc: "Guia clínico interativo com protocolos e recomendações" },
    { name: "landing/", desc: "Landing page com parallax, seções dinâmicas e CMS" },
    { name: "liga/", desc: "Liga de bem-estar com competições e rankings" },
    { name: "loja/", desc: "E-commerce interno — produtos, pacotes, carrinho, pedidos" },
    { name: "marketplace/", desc: "Marketplace de terapeutas com perfis e avaliações" },
    { name: "materiais/", desc: "Materiais gráficos e downloads para terapeutas" },
    { name: "pagamento/", desc: "Integração Asaas (PIX, boleto) com webhook de confirmação" },
    { name: "playlist/", desc: "Playlist musical terapêutica com 6 categorias e 90+ faixas" },
    { name: "profile/", desc: "Perfil do usuário, ficha nutricional, histórico cirúrgico" },
    { name: "protocolos/", desc: "Protocolos terapêuticos completos com fichas de acompanhamento" },
    { name: "resinkra-ai/", desc: "IA para criação de conteúdo social: scripts, hooks, ideias, viral" },
    { name: "social/", desc: "Resinkra Moments — posts sociais com recompensa e moderação" },
    { name: "terapeuta/", desc: "Dashboard do terapeuta com agenda, pacientes e fichas" },
    { name: "terapias/", desc: "Catálogo de terapias com detalhes e agendamento" },
    { name: "vale-presente/", desc: "Sistema de vales digitais com QR, resgate e expiração" },
  ];
  features.forEach(f => {
    md += `- **${f.name}** — ${f.desc}\n`;
  });
  md += `\n`;

  // ── 4. Autenticação & RBAC ──
  md += `---\n\n## 🔑 Autenticação & Permissões (RBAC)\n\n`;
  md += `### Fluxo de Autenticação\n\n`;
  md += `- Email/Senha com verificação obrigatória\n`;
  md += `- Rate limiting: 5 tentativas / 15 minutos\n`;
  md += `- Proteção HIBP (senhas vazadas)\n`;
  md += `- Sessão gerenciada por Supabase Auth\n\n`;

  md += `### Roles\n\n`;
  md += `| Role | Permissões | Descrição |\n|---|---|---|\n`;
  md += `| Admin | 30/30 | Acesso total a todas as funcionalidades |\n`;
  md += `| User | 21/30 | Básico + social + cursos + cashback |\n`;
  md += `| Terapeuta | 13/30 | Clínico + cursos + agenda |\n`;
  md += `| Parceiro | 4/30 | Loja + cashback + cupons |\n\n`;

  md += `### Módulos de Permissão (11)\n\n`;
  const permModules = [
    { mod: "admin", actions: 1, desc: "Acesso ao painel administrativo" },
    { mod: "appointments", actions: 4, desc: "Criar, ver, editar, cancelar agendamentos" },
    { mod: "exercises", actions: 3, desc: "Ver, executar, gerenciar exercícios" },
    { mod: "cashback", actions: 3, desc: "Ver saldo, transferir, gerenciar" },
    { mod: "courses", actions: 4, desc: "Ver, estudar, gerenciar, certificar" },
    { mod: "diets", actions: 2, desc: "Ver e gerenciar planos nutricionais" },
    { mod: "store", actions: 2, desc: "Comprar e gerenciar produtos" },
    { mod: "protocols", actions: 2, desc: "Ver e gerenciar protocolos" },
    { mod: "ai", actions: 2, desc: "Usar e gerenciar IA" },
    { mod: "social", actions: 4, desc: "Postar, moderar, configurar, recompensar" },
    { mod: "gift_card", actions: 3, desc: "Criar, resgatar, gerenciar vales" },
  ];
  md += `| Módulo | Ações | Descrição |\n|---|---|---|\n`;
  permModules.forEach(p => {
    md += `| ${p.mod} | ${p.actions} | ${p.desc} |\n`;
  });
  md += `\n`;

  md += `### Funções SQL de Permissão\n\n`;
  md += "```sql\n";
  md += `-- Verificar papel\nSELECT has_role('user-uuid', 'admin');\n\n`;
  md += `-- Verificar permissão granular\nSELECT has_permission('user-uuid', 'admin', 'access');\n\n`;
  md += `-- Listar permissões do usuário\nSELECT * FROM get_user_permissions('user-uuid');\n`;
  md += "```\n\n";

  // ── 5. Banco de Dados ──
  md += `---\n\n## 🗄️ Banco de Dados (134 tabelas)\n\n`;
  const dbGroups = [
    { group: "Usuários & Auth", tables: "profiles, user_roles, roles, login_attempts, audit_logs", count: 5 },
    { group: "Permissões", tables: "permissions, role_permissions, user_permissions_mv", count: 3 },
    { group: "Serviços", tables: "servicos, servicos_detalhes, agendamentos, terapeutas, horarios_disponiveis", count: 5 },
    { group: "Produtos & Loja", tables: "produtos, pedidos, pedido_itens, pacotes, pacotes_usuario, carrinho", count: 6 },
    { group: "Financeiro", tables: "transacoes, indicacoes, vale_presentes, pagamentos_asaas, cupons, assinaturas_planos, assinaturas_usuario", count: 7 },
    { group: "Gamificação", tables: "desafios, desafio_participantes, checkins, conquistas, cromos_usuarios, badges, conquistas_usuario_badges", count: 7 },
    { group: "Saúde & Protocolos", tables: "protocolos, usuario_protocolos, fichas_acompanhamento, avaliacoes_posturais, anotacoes_posturais, checklists_avaliacao, fichas_anamnese, anamnese_templates", count: 8 },
    { group: "Nutrição", tables: "planos_dieta, diario_alimentar, ficha_nutricional, dietas_conteudo, historico_cirurgico", count: 5 },
    { group: "Bem-Estar", tables: "wellness_*, diario_bem_estar, humor_*, energia_*", count: "8+" },
    { group: "Educação", tables: "curso_modulos, curso_aulas, curso_progresso, academy_waitlist", count: 4 },
    { group: "Social", tables: "social_posts, social_posts_config, notificacoes, banners_promocionais, banners_dismissals", count: 5 },
    { group: "Corporativo", tables: "empresas_corporativas, colaboradores_empresa, corporativo_beneficios, corporativo_cases, corporativo_depoimentos, corporativo_eventos, corporativo_faq, corporativo_galeria, corporativo_logos, corporativo_planos, corporativo_secoes", count: 11 },
    { group: "Marketing", tables: "campanhas_marketing, google_ads_metrics, landing_config", count: 3 },
    { group: "Parceiros", tables: "parceiros, parceiro_cupons, parceiro_comissoes, parceiro_faixas_comissao", count: 4 },
    { group: "IA / Conteúdo", tables: "brand_profiles, scripts, hooks, content_ideas, calendar_events", count: 5 },
    { group: "Exercícios", tables: "exercicios_alongamento, lembretes_alongamento, sessoes_alongamento", count: 3 },
    { group: "Avaliações", tables: "avaliacoes, avaliacoes_playlist, feedback_rapido, exames_usuario, fotos_evolucao", count: 5 },
    { group: "Head SPA", tables: "headspa_imagens", count: 1 },
    { group: "Recompensas Social", tables: "social_rewards_config", count: 1 },
    { group: "Resi IA", tables: "resi_agents_config, chat_interactions, chat_sessions", count: 3 },
  ];
  md += `| Grupo | Tabelas | Qtd |\n|---|---|---|\n`;
  dbGroups.forEach(g => {
    md += `| ${g.group} | ${g.tables} | ${g.count} |\n`;
  });
  md += `\n`;

  md += `### Exemplos de Políticas RLS\n\n`;
  md += "```sql\n";
  md += `-- Usuários só veem seus dados\nCREATE POLICY "Users see own data"\nON profiles FOR SELECT USING (auth.uid() = id);\n\n`;
  md += `-- Admins gerenciam tudo\nCREATE POLICY "Admins manage servicos"\nON servicos FOR ALL USING (has_role(auth.uid(), 'admin'));\n\n`;
  md += `-- Terapeutas veem agendamentos atribuídos\nCREATE POLICY "Terapeutas see appointments"\nON agendamentos FOR SELECT\nUSING (auth.uid() = user_id OR is_terapeuta(auth.uid()));\n`;
  md += "```\n\n";

  // ── 6. Funções SQL & Triggers ──
  md += `---\n\n## ⚡ Funções SQL & Triggers\n\n`;
  md += `### Funções Principais (51)\n\n`;
  const sqlFunctions = [
    { name: "credit_cashback_on_order()", desc: "Cashback automático em pedidos com multiplicador de tier" },
    { name: "credit_cashback_on_agendamento()", desc: "Cashback em sessões terapêuticas" },
    { name: "process_referral_on_first_purchase()", desc: "R$10 indicador + R$5 indicado na 1ª compra" },
    { name: "credit_desafio_reward()", desc: "Creditação automática ao concluir desafios" },
    { name: "credit_social_post_reward()", desc: "Recompensa por posts aprovados" },
    { name: "validate_transaction_insert()", desc: "Validação server-side de transações" },
    { name: "protect_referral_code()", desc: "Impede alteração de código de indicação" },
    { name: "notificar_novo_agendamento()", desc: "Notificação automática ao agendar" },
    { name: "has_role(uuid, text)", desc: "Verifica se usuário possui role específica" },
    { name: "has_permission(uuid, text, text)", desc: "Verifica permissão granular" },
    { name: "get_user_permissions(uuid)", desc: "Lista todas as permissões do usuário" },
    { name: "get_user_tier(uuid)", desc: "Retorna tier atual do usuário (Bronze/Prata/Ouro)" },
    { name: "is_terapeuta(uuid)", desc: "Verifica se é terapeuta ativo" },
    { name: "refresh_user_permissions_mv()", desc: "Atualiza cache de permissões" },
    { name: "update_updated_at_column()", desc: "Atualiza timestamp automaticamente" },
  ];
  md += `| Função | Descrição |\n|---|---|\n`;
  sqlFunctions.forEach(f => {
    md += `| \`${f.name}\` | ${f.desc} |\n`;
  });
  md += `\n`;

  md += `### Triggers Automáticos (57)\n\n`;
  const triggers = [
    "Cashback automático em pedidos",
    "Cashback em agendamentos confirmados",
    "Processamento de indicações na 1ª compra",
    "Recompensa em desafios concluídos",
    "Recompensa em posts sociais aprovados",
    "Validação de transações antes de INSERT",
    "Proteção do código de indicação",
    "Notificação de novo agendamento",
    "Atualização de updated_at em tabelas",
    "Refresh de materialized view de permissões",
    "Notificação de cashback expirando",
    "Criação automática de profile no signup",
    "Atribuição automática de role 'user' no signup",
  ];
  triggers.forEach(t => {
    md += `- ${t}\n`;
  });
  md += `\n`;

  // ── 7. Edge Functions ──
  md += `---\n\n## 🖥️ Edge Functions (46 funções serverless)\n\n`;

  md += `### 💳 Pagamentos (Asaas)\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| asaas-criar-cobranca | Cria cobranças PIX/boleto via Asaas |\n`;
  md += `| asaas-webhook | Recebe callbacks de pagamento confirmado |\n`;
  md += `| asaas-status | Consulta status de pagamentos |\n\n`;

  md += `### 💬 Comunicação\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| enviar-whatsapp | Envia mensagens via Z-API |\n`;
  md += `| whatsapp-webhook | Recebe mensagens WhatsApp |\n`;
  md += `| enviar-campanha | Dispara campanhas de marketing |\n`;
  md += `| enviar-lembretes | Lembretes de agendamento |\n`;
  md += `| enviar-email-notificacao | Email de notificação |\n`;
  md += `| enviar-push | Push notification |\n`;
  md += `| lembrete-alongamento | Notifica pausas posturais |\n`;
  md += `| lembrete-medidas | Lembrete de registrar medidas |\n`;
  md += `| lembretes-wellness | Lembretes de bem-estar |\n`;
  md += `| notificacoes-inteligentes | Notificações contextuais IA |\n`;
  md += `| notificar-roteiros-pendentes | Roteiros pendentes |\n\n`;

  md += `### 🤖 Inteligência Artificial\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| chat-assistente | Assistente IA conversacional 24/7 |\n`;
  md += `| resi-chat | Chat contextual da Resi |\n`;
  md += `| resi-router | 🆕 Roteador multi-agente Resi (Gemini 1.5 Flash) |\n`;
  md += `| resi-whatsapp | 🆕 Agente Resi integrado ao WhatsApp via Z-API |\n`;
  md += `| generate-script | Gera roteiros para Reels/Stories |\n`;
  md += `| generate-hooks | Ganchos virais com score de poder |\n`;
  md += `| generate-ideas | 10 ideias por nicho e funil |\n`;
  md += `| gerar-ideias-semanais | Ideias semanais automatizadas |\n`;
  md += `| analyze-viral | Análise de potencial viral |\n`;
  md += `| gerar-recomendacoes | Recomendações personalizadas |\n`;
  md += `| gerar-imagem-servico | Gera imagens com IA |\n`;
  md += `| cashback-inteligente | Cashback sugerido por IA |\n\n`;

  md += `### 🧘 Saúde & Bem-Estar\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| assistente-saude | Assistente de saúde com IA |\n`;
  md += `| insights-saude | Insights de saúde personalizados |\n`;
  md += `| plano-bem-estar | Gera plano de bem-estar com IA |\n`;
  md += `| recomendar-sessao | Recomenda sessão terapêutica |\n`;
  md += `| reflexao-diario | Reflexão do diário de bem-estar |\n`;
  md += `| analise-progresso | Análise de progresso do paciente |\n`;
  md += `| wellness-insight | Insight de wellness com IA |\n`;
  md += `| wellness-correlations | Correlações de bem-estar |\n`;
  md += `| wellness-check-conquistas | Verifica conquistas wellness |\n`;
  md += `| wellness-update-streak | Atualiza streak de bem-estar |\n\n`;

  md += `### ⚙️ Infraestrutura\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| fetch-google-ads | Coleta métricas Google Ads |\n`;
  md += `| atualizar-trends | Atualiza tendências e métricas |\n`;
  md += `| curso-tts | Text-to-Speech para cursos |\n`;
  md += `| processar-expiracoes | Expira cashback vencido |\n`;
  md += `| processar-vales-expirados | Expira vales presente |\n`;
  md += `| transferir-creditos | Transferência entre usuários |\n`;
  md += `| check-rate-limit | Rate limiting de login |\n`;
  md += `| buscar-usuario | Busca por email/telefone |\n`;
  md += `| creditar-recompensa-sugestao | Credita recompensa por sugestão |\n`;
  md += `| validar-playlist | Valida links YouTube/Spotify |\n\n`;

  // ── 8. Storage ──
  md += `---\n\n## 💾 Storage (11 buckets)\n\n`;
  md += `| Bucket | Descrição | Acesso |\n|---|---|---|\n`;
  const buckets = [
    { name: "avatars", desc: "Fotos de perfil", access: "público" },
    { name: "fotos-evolucao", desc: "Fotos de tratamento", access: "privado (URLs assinadas 1h)" },
    { name: "avaliacoes-posturais", desc: "Fotos posturais", access: "privado" },
    { name: "exercise-videos", desc: "Vídeos de exercícios", access: "público" },
    { name: "social-posts", desc: "Posts Resinkra Moments", access: "privado" },
    { name: "exames-arquivos", desc: "Exames do paciente", access: "privado" },
    { name: "admin-uploads", desc: "Uploads administrativos", access: "público" },
    { name: "corporativo-media", desc: "Mídia corporativa", access: "público" },
    { name: "landing-media", desc: "Mídia da landing page", access: "público" },
    { name: "headspa-imagens", desc: "Imagens head spa", access: "público" },
    { name: "servico-imagens", desc: "Imagens de serviços", access: "público" },
  ];
  buckets.forEach(b => {
    md += `| ${b.name} | ${b.desc} | ${b.access} |\n`;
  });
  md += `\n`;

  // ── 9. Integrações ──
  md += `---\n\n## 🔌 Integrações & APIs\n\n`;
  md += `| Integração | Uso | Secret |\n|---|---|---|\n`;
  md += `| Asaas | Pagamentos PIX, boleto, cartão | ASAAS_API_KEY, ASAAS_WEBHOOK_TOKEN |\n`;
  md += `| Z-API | WhatsApp (envio e recebimento) | ZAPI_INSTANCE_ID, ZAPI_TOKEN |\n`;
  md += `| Resend | Email transacional | RESEND_API_KEY |\n`;
  md += `| ElevenLabs | Text-to-Speech (narração cursos) | ELEVENLABS_API_KEY |\n`;
  md += `| Google Ads | Métricas de campanhas | via fetch-google-ads |\n`;
  md += `| Lovable AI | Scripts, hooks, ideias, análise viral | LOVABLE_API_KEY |\n\n`;

  // ── 10. Segurança ──
  md += `---\n\n## 🛡️ Arquitetura de Segurança (5 camadas)\n\n`;
  md += `### Camada 1 — Autenticação\n`;
  md += `- Email/senha com verificação obrigatória\n`;
  md += `- Rate limiting (5 tentativas / 15 min)\n`;
  md += `- Proteção HIBP (senhas vazadas)\n\n`;
  md += `### Camada 2 — Autorização (RBAC)\n`;
  md += `- user_roles separada (anti-escalação)\n`;
  md += `- has_role() + has_permission() SECURITY DEFINER\n`;
  md += `- Cache via user_permissions_mv + auto-refresh\n`;
  md += `- ProtectedRoute + AdminRoute no frontend\n\n`;
  md += `### Camada 3 — Row Level Security (RLS)\n`;
  md += `- 366 políticas em todas as 134 tabelas\n`;
  md += `- Políticas RESTRICTIVE para bloquear anon\n`;
  md += `- Admins via has_role(), users via auth.uid()\n\n`;
  md += `### Camada 4 — Proteção de Dados\n`;
  md += `- Fotos sensíveis via URLs assinadas (1h)\n`;
  md += `- Triggers protegem código de indicação\n`;
  md += `- Validação server-side em transações\n`;
  md += `- Audit logs em tabelas críticas\n\n`;
  md += `### Camada 5 — Integrações Seguras\n`;
  md += `- API keys em Secrets (nunca no código)\n`;
  md += `- Webhooks com token de validação\n`;
  md += `- Edge Functions com CORS configurado\n\n`;

  // ── 11. Fluxos de Negócio ──
  md += `---\n\n## 🔄 Fluxos de Negócio Automáticos\n\n`;
  md += `### Compra / Sessão\n`;
  md += `1. Trigger calcula cashback (% do produto)\n`;
  md += `2. Multiplica pelo tier (Bronze 1x, Prata 1.5x, Ouro 2x)\n`;
  md += `3. Insere em transações (expira: 90 dias)\n`;
  md += `4. Notificação automática ao usuário\n\n`;
  md += `### Indicação\n`;
  md += `1. Amigo se cadastra com código de indicação\n`;
  md += `2. Amigo faz primeira compra\n`;
  md += `3. R$ 10 creditado ao indicador + R$ 5 ao indicado\n\n`;
  md += `### Desafio Concluído\n`;
  md += `1. Sistema detecta meta atingida\n`;
  md += `2. Trigger credita recompensa automaticamente\n`;
  md += `3. Notificação de parabéns\n\n`;
  md += `### Cashback Expirando\n`;
  md += `1. Notifica 7 dias antes do vencimento\n`;
  md += `2. Debita automaticamente após 90 dias\n\n`;
  md += `### Agendamento\n`;
  md += `1. Usuário agenda serviço\n`;
  md += `2. Notificação para terapeuta\n`;
  md += `3. Lembrete automático pré-sessão\n`;
  md += `4. Check-in via QR Code\n`;
  md += `5. Feedback pós-sessão (emoji + comentário)\n`;
  md += `6. Cashback creditado\n\n`;

  // ── 11b. Sistema Multi-Agente Resi ──
  md += `---\n\n## 🤖 Sistema Multi-Agente Resi (NOVO — 19/02/2026)\n\n`;
  md += `Arquitetura de IA orquestrada por roteador central integrado à API Google Gemini.\n\n`;
  md += `### Componentes\n\n`;
  md += `| Componente | Descrição |\n|---|---|\n`;
  md += `| \`resi-router\` (Edge Function) | Roteador central — analisa intenção e delega ao agente correto |\n`;
  md += `| \`resi-whatsapp\` (Edge Function) | Recebe mensagens WhatsApp via Z-API e encaminha ao router |\n`;
  md += `| \`ResiChat.tsx\` | Widget flutuante no frontend com menu de seleção de agentes |\n`;
  md += `| \`AdminResiAgents.tsx\` | Interface admin para ativar/desativar agentes |\n`;
  md += `| \`resi_agents_config\` (tabela) | Configuração de prompts, palavras-chave e prioridade dos agentes |\n\n`;
  md += `### 5 Agentes Especializados\n\n`;
  md += `| # | Agente | Especialidade |\n|---|---|---|\n`;
  md += `| 1 | 💬 Core | Dúvidas gerais, cashback, plataforma |\n`;
  md += `| 2 | 📅 Agenda | Agendamentos, sessões, horários |\n`;
  md += `| 3 | 🎬 Creator | Roteiros e ideias para redes sociais |\n`;
  md += `| 4 | 🛒 Loja | Produtos, pacotes, compras |\n`;
  md += `| 5 | 🧘 Wellness | Saúde, bem-estar, protocolos |\n\n`;
  md += `### Modelo de IA\n`;
  md += `- **Google Gemini 1.5 Flash** — via Lovable AI (sem API key adicional)\n`;
  md += `- Roteamento por palavras-chave + prioridade configurável\n`;
  md += `- Comando \`0\` retorna ao menu principal\n`;
  md += `- Interações salvas em \`chat_interactions\` e \`chat_sessions\`\n`;
  md += `- Monitoramento admin via RPC \`get_resi_stats\`\n\n`;

  // ── 12. Painel Administrativo ──
  md += `---\n\n## 🎛️ Painel Administrativo (15+ abas)\n\n`;
  const adminTabs = [
    { name: "Dashboard", desc: "Métricas gerais, gráficos de receita e KPIs" },
    { name: "Agendamentos", desc: "Gestão completa de agenda, confirmações e cancelamentos" },
    { name: "Exercícios", desc: "CRUD de exercícios de alongamento com vídeos" },
    { name: "Protocolos", desc: "Gerenciar protocolos terapêuticos" },
    { name: "Dietas", desc: "Planos nutricionais e conteúdos educativos" },
    { name: "Vales Presente", desc: "Criar e gerenciar vales digitais" },
    { name: "Cupons", desc: "Editor de cupons de desconto" },
    { name: "Parceiros", desc: "Gestão de parceiros e comissões" },
    { name: "Social Moments", desc: "Moderação de posts e recompensas" },
    { name: "Clube VIP", desc: "Planos de assinatura e benefícios" },
    { name: "Desafios", desc: "Criar e gerenciar desafios gamificados" },
    { name: "Empresas (B2B)", desc: "Gestão de empresas corporativas" },
    { name: "Google Ads", desc: "Dashboard de métricas de campanhas" },
    { name: "Usuários (Roles)", desc: "Gerenciamento de papéis e permissões" },
    { name: "Notificações", desc: "Envio manual de notificações" },
    { name: "Recompensas Social", desc: "Configuração de recompensas por posts" },
    { name: "Cursos", desc: "CRUD de módulos e aulas" },
    { name: "Financeiro", desc: "Dashboard financeiro com receitas e despesas" },
    { name: "Relatório Técnico", desc: "Relatórios e análises avançadas" },
    { name: "Código", desc: "Documentação técnica da plataforma" },
    { name: "Apresentação", desc: "Pitch deck e estratégia de negócios" },
    { name: "Materiais", desc: "Upload e gerenciamento de mídia" },
    { name: "Analytics", desc: "Dashboard analítico de uso" },
    { name: "Agentes Resi 🆕", desc: "Ativar/desativar e monitorar os 5 agentes de IA da Resi" },
  ];
  md += `| Aba | Descrição |\n|---|---|\n`;
  adminTabs.forEach(t => {
    md += `| ${t.name} | ${t.desc} |\n`;
  });
  md += `\n`;

  // ── 13. Módulos da Plataforma ──
  md += `---\n\n## 🧩 Módulos Funcionais\n\n`;

  md += `### 🛒 E-Commerce (Loja)\n`;
  md += `- Catálogo de produtos com busca e filtros\n`;
  md += `- Pacotes de sessões (combos)\n`;
  md += `- Carrinho de compras persistente\n`;
  md += `- Checkout com PIX, boleto ou cashback\n`;
  md += `- Histórico de pedidos com status\n`;
  md += `- Avaliações e reviews de produtos\n\n`;

  md += `### 💰 Cashback & Fidelidade\n`;
  md += `- Wallet digital com saldo e extrato\n`;
  md += `- 3 Tiers: Bronze (1x), Prata (1.5x), Ouro (2x)\n`;
  md += `- Cashback em compras e sessões\n`;
  md += `- Expiração automática em 90 dias\n`;
  md += `- Transferência entre usuários\n`;
  md += `- Programa de indicação (R$10 + R$5)\n\n`;

  md += `### 📅 Agendamentos\n`;
  md += `- Seleção de serviço, terapeuta e horário\n`;
  md += `- Check-in via QR Code\n`;
  md += `- Lembretes automáticos (WhatsApp/push)\n`;
  md += `- Feedback pós-sessão (emoji + texto)\n`;
  md += `- Histórico completo de sessões\n\n`;

  md += `### 📚 Cursos (35 formações)\n`;
  md += `- 35 cursos (17 base + 18 expansão) com conteúdo completo\n`;
  md += `- Módulos com aulas, quizzes e checklists\n`;
  md += `- Progressão persistente por localStorage\n`;
  md += `- Narração por IA (ElevenLabs TTS)\n`;
  md += `- Certificação automática via jsPDF\n`;
  md += `- Hub unificado com "Continuar Assistindo"\n\n`;

  md += `### 🩺 Protocolos Terapêuticos\n`;
  md += `- Protocolos personalizados por paciente\n`;
  md += `- Fichas de acompanhamento (medidas, EVA)\n`;
  md += `- Fotos de evolução com comparativo\n`;
  md += `- Exames anexados ao prontuário\n`;
  md += `- Checklists de avaliação\n`;
  md += `- Fichas de anamnese por serviço\n\n`;

  md += `### 🥗 Nutrição\n`;
  md += `- Planos de dieta personalizados\n`;
  md += `- Diário alimentar com fotos\n`;
  md += `- Ficha nutricional completa\n`;
  md += `- Conteúdos educativos por categoria\n\n`;

  md += `### 🏆 Gamificação\n`;
  md += `- Sistema de XP e níveis\n`;
  md += `- Badges e conquistas desbloqueáveis\n`;
  md += `- Desafios com prazo e recompensas\n`;
  md += `- Ranking entre usuários\n`;
  md += `- Cromos colecionáveis\n\n`;

  md += `### 📱 Social (Resinkra Moments)\n`;
  md += `- Posts com foto + texto\n`;
  md += `- Moderação por admin\n`;
  md += `- Recompensas em cashback por post aprovado\n`;
  md += `- Feed social na landing page\n\n`;

  md += `### 🏢 Corporativo (B2B)\n`;
  md += `- Planos QVT para empresas\n`;
  md += `- Portal com benefícios, cases e depoimentos\n`;
  md += `- Galeria de mídia corporativa\n`;
  md += `- FAQ interativo\n`;
  md += `- Gestão de colaboradores por empresa\n\n`;

  md += `### 🤖 Resinkra AI (Criação de Conteúdo)\n`;
  md += `- Perfis de marca (nicho, tom, público)\n`;
  md += `- Gerador de roteiros para Reels/Stories\n`;
  md += `- Ganchos virais com score de poder\n`;
  md += `- Gerador de ideias por funil\n`;
  md += `- Análise de potencial viral\n`;
  md += `- Calendário editorial\n\n`;

  md += `### 🧘 Alongamento & Postura\n`;
  md += `- Exercícios com timer e instruções\n`;
  md += `- Lembretes de pausas posturais\n`;
  md += `- Avaliação postural 4 vistas\n`;
  md += `- Anotações por ponto anatômico\n\n`;

  md += `### 🎁 Vale Presente\n`;
  md += `- Criação de vales digitais com valor\n`;
  md += `- QR Code para resgate\n`;
  md += `- Expiração automática\n`;
  md += `- Histórico de uso\n\n`;

  md += `### 🎵 Playlist Musical Terapêutica\n`;
  md += `- 6 categorias: Frequências Hz, Relaxante, Instrumental, SPA, Oriental, Mantras\n`;
  md += `- 15 faixas por categoria (90+ total)\n`;
  md += `- Player integrado com YouTube\n\n`;

  // ── 14. Snippets ──
  md += `---\n\n## 💻 Snippets de Código\n\n`;
  md += `### CRUD com Supabase Client\n\n`;
  md += "```typescript\n";
  md += `import { supabase } from "@/integrations/supabase/client";\n\n`;
  md += `// SELECT\nconst { data } = await supabase\n  .from('produtos').select('*').eq('disponivel', true);\n\n`;
  md += `// INSERT\nawait supabase.from('notificacoes')\n  .insert({ user_id, titulo: 'Olá!', mensagem: '...' });\n\n`;
  md += `// UPDATE\nawait supabase.from('pedidos')\n  .update({ status: 'entregue' }).eq('id', pedidoId);\n\n`;
  md += `// RPC\nconst { data } = await supabase\n  .rpc('has_permission', { p_user_id: userId, p_resource: 'admin', p_action: 'access' });\n`;
  md += "```\n\n";

  md += `### Upload de Arquivos\n\n`;
  md += "```typescript\n";
  md += `const { data } = await supabase.storage\n  .from('admin-uploads')\n  .upload(\`images/\${fileName}\`, file, { upsert: true });\n\n`;
  md += `const { data: { publicUrl } } = supabase.storage\n  .from('admin-uploads').getPublicUrl(filePath);\n`;
  md += "```\n\n";

  md += `### Realtime\n\n`;
  md += "```typescript\n";
  md += `const channel = supabase\n  .channel('notificacoes')\n  .on('postgres_changes', {\n    event: 'INSERT', schema: 'public',\n    table: 'notificacoes',\n    filter: \`user_id=eq.\${userId}\`\n  }, (payload) => {\n    toast.info(payload.new.titulo);\n  })\n  .subscribe();\n`;
  md += "```\n\n";

  md += `### Invocar Edge Function (resi-router)\n\n`;
  md += "```typescript\n";
  md += `const { data } = await supabase.functions.invoke('resi-router', {\n  body: { userId: user.id, message: 'Quero agendar', platform: 'web' }\n});\n// data.response, data.agentName, data.agentEmoji, data.currentAgent, data.showMenu\n`;
  md += "```\n\n";

  // ── Footer ──
  md += `---\n\n`;
  md += `## 📊 Resumo Final (Atualizado 19/02/2026)\n\n`;
  md += `| Item | Quantidade |\n|---|---|\n`;
  md += `| Feature Folders | 29 |\n`;
  md += `| Tabelas DB | 137 |\n`;
  md += `| Políticas RLS | 368 |\n`;
  md += `| Edge Functions | 46 |\n`;
  md += `| Funções SQL | 51 |\n`;
  md += `| Triggers | 57 |\n`;
  md += `| Permissões RBAC | 30 |\n`;
  md += `| Storage Buckets | 11 |\n`;
  md += `| Cursos | 35 |\n`;
  md += `| Agentes Resi IA | 5 |\n`;
  md += `| Abas Admin | 24+ |\n`;
  md += `| Integrações | 6 |\n`;
  md += `| Secrets | 7 |\n\n`;
  md += `> Resinkra — Plataforma completa de saúde, bem-estar e educação com gamificação, IA e B2B.\n`;
  md += `> 🆕 **19/02/2026**: Sistema multi-agente Resi (resi-router + 5 agentes + AdminResiAgents + ResiChat)\n`;

  return md;
}

