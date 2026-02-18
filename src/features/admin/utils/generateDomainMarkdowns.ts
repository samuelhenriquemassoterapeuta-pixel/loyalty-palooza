/**
 * Per-domain markdown generators for platform documentation.
 * Each function returns a detailed markdown string for its domain.
 */
import { generateMediaMarkdown } from "./generateMediaMarkdown";

// ── Agendamentos ──
export function generateAgendamentosMarkdown(): string {
  let md = `# 📅 Módulo: Agendamentos\n\n`;
  md += `> Sistema completo de agendamento de sessões terapêuticas com check-in QR, lembretes e feedback.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/agendamentos/\n├── components/\n│   ├── AvaliacaoDialog.tsx      — Dialog de avaliação pós-sessão\n│   ├── PriorityBanner.tsx       — Banner de prioridade (assinantes)\n│   ├── ReagendarDialog.tsx      — Dialog para remarcar sessão\n│   ├── ServicoSelector.tsx      — Seletor de serviço com filtros\n│   └── TerapeutaSelector.tsx    — Seletor de terapeuta disponível\n├── hooks/\n│   └── useAgendamentos.ts       — Hook de CRUD e queries\n└── pages/\n    └── Agendamentos.tsx         — Página principal\n```\n\n";

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição | RLS |\n|---|---|---|\n`;
  md += `| agendamentos | Sessões agendadas com status | ✅ user_id + terapeuta |\n`;
  md += `| servicos | Catálogo de serviços disponíveis | ✅ público leitura |\n`;
  md += `| servicos_detalhes | Detalhes expandidos do serviço | ✅ público leitura |\n`;
  md += `| terapeutas | Terapeutas cadastrados | ✅ público leitura |\n`;
  md += `| horarios_disponiveis | Slots de horário | ✅ público leitura |\n`;
  md += `| feedback_rapido | Feedback pós-sessão (emoji) | ✅ user_id |\n`;
  md += `| checkins | Check-ins via QR Code | ✅ user_id |\n\n`;

  md += `## Fluxo do Usuário\n\n`;
  md += `1. Seleciona serviço (ServicoSelector)\n`;
  md += `2. Escolhe terapeuta (TerapeutaSelector)\n`;
  md += `3. Seleciona data e horário disponível\n`;
  md += `4. Confirma agendamento → INSERT em agendamentos\n`;
  md += `5. Trigger: notificar_novo_agendamento() → notifica terapeuta\n`;
  md += `6. Lembrete automático via WhatsApp (edge function: enviar-lembretes)\n`;
  md += `7. Check-in presencial via QR Code\n`;
  md += `8. Pós-sessão: feedback emoji + comentário (AvaliacaoDialog)\n`;
  md += `9. Cashback creditado via trigger credit_cashback_on_agendamento()\n\n`;

  md += `## Triggers & Funções SQL\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| notificar_novo_agendamento() | Cria notificação para terapeuta |\n`;
  md += `| credit_cashback_on_agendamento() | Cashback automático na confirmação |\n\n`;

  md += `## Edge Functions\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| enviar-lembretes | Lembrete automático pré-sessão |\n`;
  md += `| enviar-whatsapp | Notificação WhatsApp |\n\n`;

  md += `## Componentes React\n\n`;
  md += `| Componente | Descrição |\n|---|---|\n`;
  md += `| ServicoSelector | Grid de serviços com ícones e preços |\n`;
  md += `| TerapeutaSelector | Cards de terapeutas com disponibilidade |\n`;
  md += `| AvaliacaoDialog | Dialog com escala emoji 1-5 + texto |\n`;
  md += `| ReagendarDialog | Formulário de remarcação |\n`;
  md += `| PriorityBanner | Banner para assinantes com prioridade |\n\n`;

  md += `## Snippets\n\n`;
  md += "```typescript\n";
  md += `// Criar agendamento\nawait supabase.from('agendamentos').insert({\n  user_id,\n  servico: 'Head SPA',\n  data_hora: '2025-03-15T14:00:00',\n  terapeuta_id,\n  status: 'pendente'\n});\n\n`;
  md += `// Buscar agendamentos do usuário\nconst { data } = await supabase\n  .from('agendamentos')\n  .select('*, terapeutas(*)')\n  .eq('user_id', userId)\n  .order('data_hora', { ascending: false });\n`;
  md += "```\n";

  return md;
}

// ── Cashback & Fidelidade ──
export function generateCashbackMarkdown(): string {
  let md = `# 💰 Módulo: Cashback & Fidelidade\n\n`;
  md += `> Wallet digital com tiers, cashback automático, indicações e expiração.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/cashback/\n├── components/\n│   ├── BalanceCard.tsx              — Card de saldo principal\n│   ├── CashbackBalanceCard.tsx      — Card detalhado de cashback\n│   ├── CashbackEvolutionChart.tsx   — Gráfico de evolução (Recharts)\n│   ├── CashbackHistoryList.tsx      — Lista de transações\n│   ├── CashbackInteligenteSection.tsx — Sugestões inteligentes\n│   ├── CashbackOffers.tsx           — Ofertas com cashback boost\n│   ├── CashbackTierCard.tsx         — Card do tier atual\n│   ├── ConquistasSection.tsx        — Conquistas relacionadas\n│   ├── StreakCard.tsx               — Streak de uso contínuo\n│   ├── TierCelebration.tsx          — Animação de upgrade de tier\n│   └── TransactionHistory.tsx       — Histórico completo\n├── hooks/\n│   └── useCashback.ts               — Hook de saldo e transações\n└── pages/\n    └── CashbackWallet.tsx           — Página da wallet\n```\n\n";

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| transacoes | Créditos e débitos de cashback |\n`;
  md += `| indicacoes | Programa de indicação |\n`;
  md += `| assinaturas_planos | Planos VIP (tiers) |\n`;
  md += `| assinaturas_usuario | Assinaturas ativas |\n\n`;

  md += `## Sistema de Tiers\n\n`;
  md += `| Tier | Multiplicador | Requisito |\n|---|---|---|\n`;
  md += `| 🥉 Bronze | 1.0x | Padrão |\n`;
  md += `| 🥈 Prata | 1.5x | Plano Prata |\n`;
  md += `| 🥇 Ouro | 2.0x | Plano Ouro |\n\n`;

  md += `## Triggers & Funções\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| credit_cashback_on_order() | Cashback em compras |\n`;
  md += `| credit_cashback_on_agendamento() | Cashback em sessões |\n`;
  md += `| process_referral_on_first_purchase() | R$10 + R$5 indicação |\n`;
  md += `| get_user_tier(uuid) | Retorna tier e multiplicador |\n`;
  md += `| validate_transaction_insert() | Validação server-side |\n`;
  md += `| protect_referral_code() | Impede alteração de código |\n\n`;

  md += `## Edge Functions\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| processar-expiracoes | Expira cashback após 90 dias |\n`;
  md += `| transferir-creditos | Transferência entre usuários |\n\n`;

  md += `## Regras de Negócio\n\n`;
  md += `- Cashback expira em 90 dias\n`;
  md += `- Notificação 7 dias antes do vencimento\n`;
  md += `- Multiplicador aplicado pelo tier do usuário\n`;
  md += `- Indicação: R$10 ao indicador + R$5 ao indicado na 1ª compra\n`;
  md += `- Código de indicação imutável após criação\n`;
  md += `- Transações validadas server-side antes de INSERT\n\n`;

  md += `## Snippets\n\n`;
  md += "```typescript\n";
  md += `// Consultar saldo\nconst { data } = await supabase\n  .from('transacoes')\n  .select('*')\n  .eq('user_id', userId);\nconst saldo = data.reduce((acc, t) => acc + t.valor, 0);\n\n`;
  md += `// Consultar tier\nconst { data } = await supabase\n  .rpc('get_user_tier', { p_user_id: userId });\n`;
  md += "```\n";

  return md;
}

// ── Loja / E-Commerce ──
export function generateLojaMarkdown(): string {
  let md = `# 🛒 Módulo: Loja (E-Commerce)\n\n`;
  md += `> E-commerce interno com produtos, pacotes, carrinho e checkout.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/loja/\n├── components/\n│   ├── ProdutoCard.tsx         — Card de produto com preço e cashback\n│   ├── CarrinhoSheet.tsx       — Sheet lateral do carrinho\n│   └── CarrinhoFlutuante.tsx   — Botão flutuante do carrinho\n├── hooks/\n│   ├── useProdutos.ts          — Query de produtos\n│   ├── useCarrinho.ts          — Estado do carrinho\n│   └── usePedidos.ts           — CRUD de pedidos\n└── pages/\n    ├── Loja.tsx                — Catálogo de produtos\n    └── MeusPedidos.tsx         — Histórico de pedidos\n```\n\n";

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| produtos | Catálogo com preço, estoque, cashback % |\n`;
  md += `| pedidos | Pedidos com status e total |\n`;
  md += `| pedido_itens | Itens de cada pedido |\n`;
  md += `| pacotes | Combos de sessões |\n`;
  md += `| pacotes_usuario | Pacotes adquiridos pelo usuário |\n`;
  md += `| avaliacoes | Reviews de produtos |\n`;
  md += `| favoritos | Produtos favoritados |\n\n`;

  md += `## Fluxo de Compra\n\n`;
  md += `1. Navega no catálogo (Loja.tsx)\n`;
  md += `2. Adiciona ao carrinho (CarrinhoSheet)\n`;
  md += `3. Checkout → escolhe forma de pagamento\n`;
  md += `4. PIX/Boleto: edge function asaas-criar-cobranca\n`;
  md += `5. Cashback: debita do saldo\n`;
  md += `6. Pedido criado → trigger credit_cashback_on_order()\n`;
  md += `7. Webhook Asaas confirma pagamento → atualiza status\n\n`;

  md += `## Snippets\n\n`;
  md += "```typescript\n";
  md += `// Listar produtos\nconst { data } = await supabase\n  .from('produtos')\n  .select('*')\n  .eq('disponivel', true)\n  .order('nome');\n\n`;
  md += `// Criar pedido\nawait supabase.from('pedidos').insert({\n  user_id, total: 150, status: 'pendente', forma_pagamento: 'pix'\n});\n`;
  md += "```\n";

  return md;
}

// ── Protocolos Terapêuticos ──
export function generateProtocolosMarkdown(): string {
  let md = `# 🩺 Módulo: Protocolos Terapêuticos\n\n`;
  md += `> Prontuário digital completo com acompanhamento, fotos de evolução e exames.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/protocolos/\n├── components/\n│   ├── dashboard/               — Dashboard de métricas\n│   ├── DietasSection.tsx        — Seção de dietas vinculadas\n│   ├── EvaScaleInput.tsx        — Escala EVA de dor (0-10)\n│   ├── ExamesSection.tsx        — Upload e listagem de exames\n│   ├── ExportPdfButton.tsx      — Exportar protocolo em PDF\n│   ├── FichaAcompanhamento.tsx  — Ficha com medidas corporais\n│   ├── GaleriaEvolucao.tsx      — Galeria comparativa de fotos\n│   ├── GuiaResumoProtocolo.tsx  — Resumo do protocolo\n│   ├── MedidasChart.tsx         — Gráficos de medidas (Recharts)\n│   ├── MetasSemanais.tsx        — Metas semanais do paciente\n│   ├── ProgressDashboard.tsx    — Dashboard de progresso\n│   ├── ProtocoloCard.tsx        — Card resumo do protocolo\n│   ├── ProtocoloDetail.tsx      — Detalhes completos\n│   ├── SecoesClinicasView.tsx   — Seções clínicas\n│   └── SendToTherapistDialog.tsx — Enviar para terapeuta\n├── hooks/\n│   └── useProtocolos.ts         — Hook de CRUD\n└── pages/\n    └── MeusProtocolos.tsx       — Página principal\n```\n\n";

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| usuario_protocolos | Protocolos atribuídos ao paciente |\n`;
  md += `| fichas_acompanhamento | Medidas corporais periódicas |\n`;
  md += `| fotos_evolucao | Fotos antes/depois com data |\n`;
  md += `| exames_usuario | Exames anexados (PDF, imagens) |\n`;
  md += `| checklists_avaliacao | Checklists de avaliação |\n`;
  md += `| fichas_anamnese | Anamnese completa por serviço |\n`;
  md += `| anamnese_templates | Templates de anamnese configuráveis |\n\n`;

  md += `## Medidas Rastreadas\n\n`;
  md += `- Peso, IMC, gordura corporal\n`;
  md += `- Cintura, quadril, tórax, braço, coxa\n`;
  md += `- Escala EVA (dor 0-10)\n`;
  md += `- Fotos: anterior, posterior, lateral D, lateral E\n\n`;

  md += `## Storage\n\n`;
  md += `| Bucket | Acesso |\n|---|---|\n`;
  md += `| fotos-evolucao | Privado (URLs assinadas 1h) |\n`;
  md += `| exames-arquivos | Privado |\n`;
  md += `| avaliacoes-posturais | Privado |\n\n`;

  return md;
}

// ── Social (Resinkra Moments) ──
export function generateSocialMarkdown(): string {
  let md = `# 📱 Módulo: Resinkra Moments (Social)\n\n`;
  md += `> Rede social interna com posts, moderação e recompensas em cashback.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/social/\n├── components/\n│   ├── SocialPostVisual.tsx      — Renderização visual do post\n│   ├── MomentsMissaoCard.tsx     — Card de missão social\n│   └── MomentsRankingTab.tsx     — Tab de ranking social\n├── hooks/\n│   └── useSocialPosts.ts         — Hook de CRUD e queries\n└── pages/\n    └── SocialMoments.tsx          — Página do feed\n```\n\n";

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| social_posts | Posts com foto, texto e status |\n`;
  md += `| social_posts_config | Configurações globais do módulo |\n`;
  md += `| social_rewards_config | Configuração de recompensas |\n\n`;

  md += `## Fluxo\n\n`;
  md += `1. Usuário cria post (foto + texto)\n`;
  md += `2. Upload para bucket "social-posts"\n`;
  md += `3. Post fica "pendente" para moderação\n`;
  md += `4. Admin aprova → trigger credit_social_post_reward()\n`;
  md += `5. Cashback creditado ao autor\n`;
  md += `6. Post aparece no feed da landing page\n\n`;

  md += `## Storage\n\n`;
  md += `| Bucket | Acesso |\n|---|---|\n`;
  md += `| social-posts | Privado |\n\n`;

  return md;
}

// ── Gamificação & Conquistas ──
export function generateConquistasMarkdown(): string {
  let md = `# 🏆 Módulo: Gamificação & Conquistas\n\n`;
  md += `> Sistema de XP, níveis, badges, desafios e ranking.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/conquistas/\n├── components/\n│   ├── AchievementCelebration.tsx  — Animação de conquista\n│   ├── AchievementDetailCard.tsx   — Card detalhado\n│   ├── AchievementsSummary.tsx     — Resumo de conquistas\n│   ├── LevelRewardsCard.tsx        — Recompensas por nível\n│   ├── LevelUpCelebration.tsx      — Animação de level up\n│   ├── RankingList.tsx             — Lista de ranking\n│   ├── XpLevelCard.tsx             — Card de XP e nível\n│   ├── levelRewardsConfig.ts       — Config de recompensas\n│   └── xpLevelUtils.ts            — Utilitários de XP/nível\n├── hooks/\n│   └── useConquistas.ts            — Hook de conquistas\n└── pages/\n    └── Conquistas.tsx               — Página principal\n```\n\n";

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| conquistas | Catálogo de badges e conquistas |\n`;
  md += `| desafios | Desafios com prazo e meta |\n`;
  md += `| desafio_participantes | Progresso nos desafios |\n`;
  md += `| checkins | Check-ins que geram XP |\n`;
  md += `| cromos_usuarios | Cromos colecionáveis |\n\n`;

  md += `## Fontes de XP\n\n`;
  md += `- Check-in presencial (QR Code)\n`;
  md += `- Conclusão de desafios\n`;
  md += `- Posts sociais aprovados\n`;
  md += `- Compras na loja\n`;
  md += `- Indicações bem-sucedidas\n`;
  md += `- Sessões de alongamento\n\n`;

  md += `## Triggers\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| credit_desafio_reward() | Recompensa ao concluir desafio |\n\n`;

  return md;
}

// ── Corporativo (B2B) ──
export function generateCorporativoMarkdown(): string {
  let md = `# 🏢 Módulo: Corporativo (B2B)\n\n`;
  md += `> Portal empresarial com planos QVT, cases, depoimentos e galeria.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/corporativo/\n├── components/\n│   ├── CorpHeroSection.tsx          — Hero com CTA\n│   ├── CorpBeneficiosSection.tsx    — Cards de benefícios\n│   ├── CorpPlanosSection.tsx        — Planos e preços\n│   ├── CorpCasesSection.tsx         — Cases de sucesso\n│   ├── CorpTestimonialsSection.tsx  — Depoimentos\n│   ├── CorpGaleriaSection.tsx       — Galeria de mídia\n│   ├── CorpFAQSection.tsx           — Perguntas frequentes\n│   ├── CorpSecoesSection.tsx        — Seções dinâmicas CMS\n│   ├── CorpTrustBadges.tsx          — Badges de confiança\n│   ├── CorpCTASection.tsx           — CTA final\n│   └── CorpWhatsAppCTA.tsx          — Botão WhatsApp\n├── hooks/\n│   └── useCorporativo*.ts           — Hooks de dados\n└── pages/\n    └── Corporativo.tsx               — Página principal\n```\n\n";

  md += `## Tabelas do Banco de Dados (11 tabelas)\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| empresas_corporativas | Empresas cadastradas |\n`;
  md += `| colaboradores_empresa | Colaboradores vinculados |\n`;
  md += `| corporativo_beneficios | Benefícios QVT |\n`;
  md += `| corporativo_cases | Cases de sucesso |\n`;
  md += `| corporativo_depoimentos | Depoimentos de clientes |\n`;
  md += `| corporativo_eventos | Eventos corporativos |\n`;
  md += `| corporativo_faq | Perguntas frequentes |\n`;
  md += `| corporativo_galeria | Fotos e vídeos |\n`;
  md += `| corporativo_logos | Logos de parceiros |\n`;
  md += `| corporativo_planos | Planos e preços |\n`;
  md += `| corporativo_secoes | Seções customizáveis CMS |\n\n`;

  md += `## CMS Dinâmico\n\n`;
  md += `Todas as seções são editáveis via painel admin. O conteúdo (textos, imagens, vídeos) é armazenado em tabelas específicas e renderizado dinamicamente.\n\n`;

  return md;
}

// ── Resinkra AI ──
export function generateResinkraAIMarkdown(): string {
  let md = `# 🤖 Módulo: Resinkra AI (Criação de Conteúdo)\n\n`;
  md += `> Plataforma de IA para criação de conteúdo social: roteiros, hooks, ideias e análise viral.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/resinkra-ai/\n├── components/\n│   └── ResinkraAILayout.tsx     — Layout principal com abas\n├── hooks/\n│   ├── useBrandProfile.ts       — Perfil de marca\n│   ├── useScripts.ts            — Roteiros gerados\n│   ├── useHooks.ts              — Ganchos virais\n│   └── useContentIdeas.ts       — Ideias de conteúdo\n└── pages/\n    └── ResinkraAI.tsx            — Página principal\n```\n\n";

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| brand_profiles | Perfis de marca (nicho, tom, público) |\n`;
  md += `| scripts | Roteiros gerados pela IA |\n`;
  md += `| hooks | Ganchos virais com score |\n`;
  md += `| content_ideas | Ideias de conteúdo por funil |\n`;
  md += `| calendar_events | Calendário editorial |\n\n`;

  md += `## Edge Functions (IA)\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| generate-script | Gera roteiros para Reels/Stories |\n`;
  md += `| generate-hooks | Ganchos virais com score 1-10 |\n`;
  md += `| generate-ideas | 10 ideias por nicho e etapa do funil |\n`;
  md += `| analyze-viral | Análise de potencial viral |\n`;
  md += `| chat-assistente | Assistente conversacional 24/7 |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Perfil de marca completo (nicho, tom, público, palavras-chave)\n`;
  md += `- Gerador de roteiros com templates por formato\n`;
  md += `- Ganchos virais com score de poder e emoção\n`;
  md += `- Ideias filtradas por etapa do funil (topo/meio/fundo)\n`;
  md += `- Análise de potencial viral com sugestões\n`;
  md += `- Calendário editorial integrado\n`;
  md += `- Favoritar e reusar conteúdos\n\n`;

  return md;
}

// ── Nutrição / Dietas ──
export function generateDietasMarkdown(): string {
  let md = `# 🥗 Módulo: Nutrição & Dietas\n\n`;
  md += `> Planos nutricionais personalizados, diário alimentar e ficha nutricional.\n\n`;

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| planos_dieta | Planos nutricionais do paciente |\n`;
  md += `| diario_alimentar | Registro diário com fotos |\n`;
  md += `| ficha_nutricional | Dados nutricionais completos |\n`;
  md += `| dietas_conteudo | Conteúdos educativos por categoria |\n`;
  md += `| historico_cirurgico | Histórico cirúrgico do paciente |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Planos de dieta personalizados por protocolo\n`;
  md += `- Diário alimentar com foto e tipo de refeição\n`;
  md += `- Controle de hidratação (ml/dia)\n`;
  md += `- Ficha nutricional completa (alergias, restrições, IMC)\n`;
  md += `- Conteúdos educativos por categoria\n\n`;

  return md;
}

// ── Alongamento & Postura ──
export function generateAlongamentoMarkdown(): string {
  let md = `# 🧘 Módulo: Alongamento & Postura\n\n`;
  md += `> Exercícios com timer, lembretes posturais e avaliação postural 4 vistas.\n\n`;

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| exercicios_alongamento | Catálogo de exercícios |\n`;
  md += `| lembretes_alongamento | Lembretes configurados |\n`;
  md += `| sessoes_alongamento | Sessões realizadas |\n`;
  md += `| avaliacoes_posturais | Avaliações com 4 fotos |\n`;
  md += `| anotacoes_posturais | Anotações por ponto anatômico |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Exercícios com timer, instruções e nível\n`;
  md += `- Lembretes de pausas posturais (dias/horário)\n`;
  md += `- Avaliação postural com 4 vistas (anterior, posterior, laterais)\n`;
  md += `- Anotações interativas por ponto no corpo\n`;
  md += `- Histórico de sessões realizadas\n\n`;

  md += `## Edge Functions\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| lembrete-alongamento | Notifica pausa postural |\n\n`;

  return md;
}

// ── Vale Presente ──
export function generateValePresenteMarkdown(): string {
  let md = `# 🎁 Módulo: Vale Presente\n\n`;
  md += `> Vales digitais com QR Code, resgate e expiração automática.\n\n`;

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| vale_presentes | Vales criados com valor e código |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Criação de vale com valor customizado\n`;
  md += `- QR Code para resgate (react-qr-code)\n`;
  md += `- Design visual para compartilhar\n`;
  md += `- Expiração automática (edge function)\n`;
  md += `- Histórico de uso e status\n\n`;

  md += `## Edge Functions\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| processar-vales-expirados | Expira vales vencidos |\n\n`;

  return md;
}

// ── Pagamentos ──
export function generatePagamentoMarkdown(): string {
  let md = `# 💳 Módulo: Pagamentos\n\n`;
  md += `> Integração completa com Asaas para PIX, boleto e cartão.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/pagamento/\n├── components/\n│   └── PaymentDialog.tsx      — Dialog de pagamento\n└── hooks/\n    └── usePagamento.ts        — Hook de pagamento\n```\n\n";

  md += `## Edge Functions\n\n`;
  md += `| Função | Descrição |\n|---|---|\n`;
  md += `| asaas-criar-cobranca | Cria cobrança PIX/boleto via Asaas |\n`;
  md += `| asaas-webhook | Recebe callback de pagamento |\n`;
  md += `| asaas-status | Consulta status do pagamento |\n\n`;

  md += `## Fluxo de Pagamento\n\n`;
  md += `1. Usuário seleciona forma de pagamento (PIX/boleto)\n`;
  md += `2. Frontend chama edge function asaas-criar-cobranca\n`;
  md += `3. Asaas retorna QR Code PIX ou link do boleto\n`;
  md += `4. Usuário paga → Asaas envia webhook\n`;
  md += `5. Edge function asaas-webhook atualiza status\n`;
  md += `6. Triggers creditam cashback e processam pedido\n\n`;

  md += `## Secrets\n\n`;
  md += `| Secret | Descrição |\n|---|---|\n`;
  md += `| ASAAS_API_KEY | Chave de API do Asaas |\n`;
  md += `| ASAAS_WEBHOOK_TOKEN | Token de validação de webhook |\n\n`;

  return md;
}

// ── Playlist Musical ──
export function generatePlaylistMarkdown(): string {
  let md = `# 🎵 Módulo: Playlist Musical Terapêutica\n\n`;
  md += `> Player musical integrado com YouTube para ambientação terapêutica.\n\n`;

  md += `## Estrutura de Arquivos\n\n`;
  md += "```\nsrc/features/playlist/\n└── pages/\n    └── PlaylistMusical.tsx     — Página com player e categorias\n```\n\n";

  md += `## Categorias (6)\n\n`;
  md += `| Categoria | Faixas | Descrição |\n|---|---|---|\n`;
  md += `| Frequências (Hz) | 15 | 432Hz, 528Hz, Schumann, binaurais |\n`;
  md += `| Relaxante | 15 | Sons da natureza, chuva, fogueira |\n`;
  md += `| Instrumental | 15 | Piano, cello, harpa, handpan |\n`;
  md += `| SPA | 15 | Música para spa, reiki, cristais |\n`;
  md += `| Oriental | 15 | Koto, sitar, flauta de bambu |\n`;
  md += `| Mantras | 15 | Om, Gayatri, mantras budistas |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- 90+ faixas curadas por categoria\n`;
  md += `- Player integrado com YouTube embed\n`;
  md += `- Interface com abas por categoria\n`;
  md += `- Seleção de faixa com título e artista\n\n`;

  return md;
}

// ── Landing Page ──
export function generateLandingMarkdown(): string {
  let md = `# 🌐 Módulo: Landing Page\n\n`;
  md += `> Landing page com parallax, seções dinâmicas e CMS.\n\n`;

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| landing_config | Configurações CMS por seção |\n`;
  md += `| banners_promocionais | Banners com segmentação |\n`;
  md += `| banners_dismissals | Dismissals por usuário |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Hero com parallax e CTA\n`;
  md += `- Seções dinâmicas via landing_config\n`;
  md += `- Banners promocionais com segmentação\n`;
  md += `- Feed social (Resinkra Moments)\n`;
  md += `- Depoimentos e avaliações\n`;
  md += `- Catálogo de serviços e terapias\n\n`;

  md += `## Storage\n\n`;
  md += `| Bucket | Acesso |\n|---|---|\n`;
  md += `| landing-media | Público |\n\n`;

  return md;
}

// ── Perfil do Usuário ──
export function generateProfileMarkdown(): string {
  let md = `# 👤 Módulo: Perfil do Usuário\n\n`;
  md += `> Perfil completo com foto, dados pessoais, ficha nutricional e histórico.\n\n`;

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| profiles | Dados pessoais e avatar |\n`;
  md += `| ficha_nutricional | Peso, altura, alergias, restrições |\n`;
  md += `| historico_cirurgico | Cirurgias anteriores |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Foto de perfil (upload para bucket avatars)\n`;
  md += `- Dados pessoais editáveis\n`;
  md += `- Código de indicação único e imutável\n`;
  md += `- Ficha nutricional completa\n`;
  md += `- Histórico cirúrgico\n`;
  md += `- Nível e XP\n\n`;

  md += `## Storage\n\n`;
  md += `| Bucket | Acesso |\n|---|---|\n`;
  md += `| avatars | Público |\n\n`;

  return md;
}

// ── Terapeuta ──
export function generateTerapeutaMarkdown(): string {
  let md = `# 👨‍⚕️ Módulo: Dashboard do Terapeuta\n\n`;
  md += `> Painel do terapeuta com agenda, pacientes e fichas clínicas.\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Visualização de agenda com agendamentos atribuídos\n`;
  md += `- Acesso às fichas de anamnese dos pacientes\n`;
  md += `- Checklists de avaliação por sessão\n`;
  md += `- Acompanhamento de protocolos\n`;
  md += `- Fotos de evolução dos pacientes\n\n`;

  md += `## Permissões (RBAC)\n\n`;
  md += `- Role "terapeuta" com 13/30 permissões\n`;
  md += `- Acesso a agendamentos atribuídos (RLS)\n`;
  md += `- Função is_terapeuta(uuid) para policies\n\n`;

  return md;
}

// ── Anamnese ──
export function generateAnamneseMarkdown(): string {
  let md = `# 📋 Módulo: Anamnese\n\n`;
  md += `> Fichas de anamnese dinâmicas por serviço com templates configuráveis.\n\n`;

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| fichas_anamnese | Fichas preenchidas por paciente |\n`;
  md += `| anamnese_templates | Templates configuráveis por serviço |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Templates dinâmicos por tipo de serviço\n`;
  md += `- Campos padrão: nome, data nascimento, alergias, doenças\n`;
  md += `- Campos específicos por serviço (JSON)\n`;
  md += `- Assinatura digital do paciente\n`;
  md += `- Vínculo com agendamento e protocolo\n`;
  md += `- Status: rascunho, preenchida, assinada\n\n`;

  return md;
}

// ── Cupom ──
export function generateCupomMarkdown(): string {
  let md = `# 🏷️ Módulo: Cupons de Desconto\n\n`;
  md += `> Sistema de cupons com regras de uso e expiração.\n\n`;

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| cupons | Cupons com código, desconto % e regras |\n`;
  md += `| parceiro_cupons | Cupons vinculados a parceiros |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Criação pelo admin ou parceiro\n`;
  md += `- Desconto por % ou valor fixo\n`;
  md += `- Limite de usos e data de expiração\n`;
  md += `- Vinculação com parceiros (comissão)\n\n`;

  return md;
}

// ── Terapias ──
export function generateTerapiasMarkdown(): string {
  let md = `# 💆 Módulo: Catálogo de Terapias\n\n`;
  md += `> Catálogo completo de serviços terapêuticos com detalhes e agendamento.\n\n`;

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| servicos | Serviços disponíveis |\n`;
  md += `| servicos_detalhes | Detalhes expandidos |\n`;
  md += `| headspa_imagens | Imagens específicas Head SPA |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Cards de serviço com imagem, descrição e preço\n`;
  md += `- Detalhes expandidos (benefícios, contraindicações)\n`;
  md += `- Link direto para agendamento\n`;
  md += `- Imagens geradas por IA (edge function)\n\n`;

  md += `## Storage\n\n`;
  md += `| Bucket | Acesso |\n|---|---|\n`;
  md += `| servico-imagens | Público |\n`;
  md += `| headspa-imagens | Público |\n\n`;

  return md;
}

// ── Guia Clínico ──
export function generateGuiaClinicoMarkdown(): string {
  let md = `# 📖 Módulo: Guia Clínico\n\n`;
  md += `> Guia clínico interativo com protocolos e recomendações terapêuticas.\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Protocolos terapêuticos detalhados\n`;
  md += `- Recomendações baseadas no perfil do paciente\n`;
  md += `- Indicações e contraindicações por serviço\n`;
  md += `- Referências bibliográficas\n\n`;

  return md;
}

// ── Cromos ──
export function generateCromosMarkdown(): string {
  let md = `# 🃏 Módulo: Cromos Colecionáveis\n\n`;
  md += `> Sistema de cromos colecionáveis por elementos.\n\n`;

  md += `## Tabelas do Banco de Dados\n\n`;
  md += `| Tabela | Descrição |\n|---|---|\n`;
  md += `| cromos_usuarios | Cromos coletados por usuário |\n\n`;

  md += `## Funcionalidades\n\n`;
  md += `- Cromos por elemento (água, fogo, terra, ar, éter)\n`;
  md += `- Quantidade acumulada por elemento\n`;
  md += `- Coleção visual com progresso\n\n`;

  return md;
}

// ── Admin ──
export function generateAdminMarkdown(): string {
  let md = `# 🎛️ Módulo: Painel Administrativo\n\n`;
  md += `> Centro de controle com 23+ abas para gerenciar toda a plataforma.\n\n`;

  md += `## Abas do Painel\n\n`;
  md += `| Aba | Descrição |\n|---|---|\n`;
  const tabs = [
    ["Dashboard", "Métricas gerais, KPIs e gráficos"],
    ["Agendamentos", "Gestão de agenda e confirmações"],
    ["Exercícios", "CRUD de exercícios de alongamento"],
    ["Protocolos", "Gerenciar protocolos terapêuticos"],
    ["Dietas", "Planos nutricionais e conteúdos"],
    ["Vales Presente", "Criar e gerenciar vales digitais"],
    ["Cupons", "Editor de cupons de desconto"],
    ["Parceiros", "Gestão de parceiros e comissões"],
    ["Social Moments", "Moderação de posts e recompensas"],
    ["Clube VIP", "Planos de assinatura e benefícios"],
    ["Desafios", "Criar desafios gamificados"],
    ["Empresas (B2B)", "Gestão de empresas corporativas"],
    ["Google Ads", "Dashboard de métricas de campanhas"],
    ["Usuários (Roles)", "Gerenciamento de papéis"],
    ["Notificações", "Envio manual de notificações"],
    ["Recompensas Social", "Configuração de recompensas"],
    ["Cursos", "CRUD de módulos e aulas"],
    ["Financeiro", "Dashboard financeiro"],
    ["Relatório Técnico", "Relatórios avançados"],
    ["Código", "Documentação técnica"],
    ["Apresentação", "Pitch deck e estratégia"],
    ["Materiais", "Upload de mídia"],
    ["Analytics", "Dashboard analítico"],
  ];
  tabs.forEach(([name, desc]) => {
    md += `| ${name} | ${desc} |\n`;
  });
  md += `\n`;

  md += `## Permissões\n\n`;
  md += `- Acesso exclusivo via role "admin"\n`;
  md += `- ProtectedRoute com allowRoles={['admin']}\n`;
  md += `- has_role(auth.uid(), 'admin') em todas as policies\n\n`;

  return md;
}

/**
 * Registry of all domain markdown generators.
 */
export interface DomainMarkdownEntry {
  id: string;
  name: string;
  icon: string;
  generator: () => string;
}

export const allDomainMarkdowns: DomainMarkdownEntry[] = [
  { id: "agendamentos", name: "Agendamentos", icon: "Calendar", generator: generateAgendamentosMarkdown },
  { id: "cashback", name: "Cashback & Fidelidade", icon: "CreditCard", generator: generateCashbackMarkdown },
  { id: "loja", name: "Loja (E-Commerce)", icon: "ShoppingCart", generator: generateLojaMarkdown },
  { id: "protocolos", name: "Protocolos Terapêuticos", icon: "Shield", generator: generateProtocolosMarkdown },
  { id: "social", name: "Resinkra Moments", icon: "MessageSquare", generator: generateSocialMarkdown },
  { id: "conquistas", name: "Gamificação & Conquistas", icon: "Trophy", generator: generateConquistasMarkdown },
  { id: "corporativo", name: "Corporativo (B2B)", icon: "Building2", generator: generateCorporativoMarkdown },
  { id: "resinkra-ai", name: "Resinkra AI", icon: "Bot", generator: generateResinkraAIMarkdown },
  { id: "dietas", name: "Nutrição & Dietas", icon: "Utensils", generator: generateDietasMarkdown },
  { id: "alongamento", name: "Alongamento & Postura", icon: "Activity", generator: generateAlongamentoMarkdown },
  { id: "vale-presente", name: "Vale Presente", icon: "Gift", generator: generateValePresenteMarkdown },
  { id: "pagamento", name: "Pagamentos", icon: "CreditCard", generator: generatePagamentoMarkdown },
  { id: "playlist", name: "Playlist Musical", icon: "Headphones", generator: generatePlaylistMarkdown },
  { id: "landing", name: "Landing Page", icon: "Globe", generator: generateLandingMarkdown },
  { id: "profile", name: "Perfil do Usuário", icon: "Users", generator: generateProfileMarkdown },
  { id: "terapeuta", name: "Dashboard Terapeuta", icon: "Stethoscope", generator: generateTerapeutaMarkdown },
  { id: "anamnese", name: "Anamnese", icon: "FileText", generator: generateAnamneseMarkdown },
  { id: "terapias", name: "Catálogo de Terapias", icon: "Heart", generator: generateTerapiasMarkdown },
  { id: "cupom", name: "Cupons de Desconto", icon: "Tag", generator: generateCupomMarkdown },
  { id: "guia-clinico", name: "Guia Clínico", icon: "BookOpen", generator: generateGuiaClinicoMarkdown },
  { id: "cromos", name: "Cromos Colecionáveis", icon: "Sparkles", generator: generateCromosMarkdown },
  { id: "admin", name: "Painel Administrativo", icon: "Settings", generator: generateAdminMarkdown },
  { id: "media", name: "Imagens & Vídeos", icon: "Image", generator: generateMediaMarkdown },
];
