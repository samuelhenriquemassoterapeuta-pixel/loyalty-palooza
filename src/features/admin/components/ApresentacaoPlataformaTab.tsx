import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ChevronLeft, ChevronRight, Rocket, DollarSign, Clock, Users, 
  Shield, Sparkles, BookOpen, Building2, Handshake, TrendingUp,
  Zap, Brain, Heart, Star, Award, Globe, Target, BarChart3,
  CheckCircle2, ArrowRight, Smartphone, Layers, Bot, GraduationCap,
  ChevronDown
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

/* ─── Ferramenta type + data ─── */
interface FerramentaItem {
  icon: string;
  title: string;
  desc: string;
  details: string[];
}

const ferramentasCore: FerramentaItem[] = [
  { icon: "📅", title: "Agendamento Online", desc: "Com check-in QR Code", details: [
    "Agenda interativa com visualização diária/semanal",
    "Check-in automático via QR Code na recepção",
    "Lista de espera inteligente com cashback extra",
    "Notificações de lembrete 24h antes da sessão",
    "Integração direta com dashboard do terapeuta",
  ]},
  { icon: "💰", title: "Cashback & Fidelização", desc: "Gamificação completa", details: [
    "Cashback automático por agendamento e compra",
    "Sistema de XP, níveis e ranking motivacional",
    "Programa de indicação com recompensa para ambos",
    "Clube VIP com descontos e prioridade exclusiva",
    "Dashboard de saldo e histórico para o usuário",
  ]},
  { icon: "📊", title: "Dashboard Financeiro", desc: "KPIs em tempo real", details: [
    "Receitas, despesas e ticket médio em tempo real",
    "Gráficos de evolução mensal e comparativo",
    "Filtros por terapeuta, serviço e período",
    "Métricas de recorrência e taxa de retenção",
    "Exportação de relatórios para contabilidade",
  ]},
  { icon: "🛒", title: "E-commerce Interno", desc: "Produtos e pacotes", details: [
    "Catálogo de produtos com fotos e descrições",
    "Pacotes de sessões com desconto progressivo",
    "Carrinho de compras e checkout integrado",
    "Pagamento via PIX, cartão e cashback",
    "Controle de estoque e alertas de reposição",
  ]},
  { icon: "🤖", title: "Chat IA Interno", desc: "Atendimento 24/7", details: [
    "Assistente IA com streaming em tempo real",
    "Tool calling para agendar sessões automaticamente",
    "Respostas contextualizadas sobre serviços e preços",
    "Suporte 24/7 sem necessidade de atendente humano",
    "Histórico de conversas salvo por sessão",
  ]},
  { icon: "📱", title: "WhatsApp Bot", desc: "Prospecção automática", details: [
    "Prospecção regional automática via Z-API",
    "Qualificação de leads com perguntas inteligentes",
    "Agendamento direto pelo WhatsApp com tool calling",
    "Envio de confirmações e lembretes automáticos",
    "Relatório de conversão de leads por campanha",
  ]},
  { icon: "🏆", title: "Desafios & XP", desc: "Engajamento gamificado", details: [
    "Desafios semanais/mensais com metas personalizadas",
    "Sistema de XP com progresso visual e níveis",
    "Recompensas automáticas (cashback, desconto, bônus)",
    "Ranking competitivo entre participantes",
    "Histórico de desafios concluídos e conquistas",
  ]},
  { icon: "📋", title: "Protocolos Clínicos", desc: "Acompanhamento completo", details: [
    "Protocolos personalizados por tipo de tratamento",
    "Fichas de acompanhamento com métricas corporais",
    "Fotos de evolução com comparativo antes/depois",
    "Checklists de avaliação por sessão",
    "Upload de exames e laudos médicos",
  ]},
  { icon: "🍽️", title: "Planos de Dieta", desc: "Nutrição integrada", details: [
    "Ficha nutricional completa do paciente",
    "Diário alimentar com registro de refeições",
    "Controle de hidratação com meta diária",
    "Histórico semanal com visualização gráfica",
    "Conteúdos educativos sobre nutrição",
  ]},
  { icon: "🧘", title: "Exercícios & Alongamento", desc: "Pausas posturais", details: [
    "Biblioteca de exercícios por categoria e nível",
    "Vídeos demonstrativos com instruções detalhadas",
    "Lembretes inteligentes de pausa e alongamento",
    "Rotinas personalizadas por objetivo",
    "Registro de sessões concluídas com XP",
  ]},
  { icon: "📸", title: "Avaliação Postural", desc: "Fotos e anotações", details: [
    "Captura de fotos em 4 vistas (anterior, posterior, laterais)",
    "Anotações visuais sobre desvios posturais",
    "Comparativo de evolução entre avaliações",
    "Relatório automático para o paciente",
    "Integração com protocolos de tratamento",
  ]},
  { icon: "🎁", title: "Vale Presente Digital", desc: "Vendas recorrentes", details: [
    "Criação de vales com valores customizados",
    "QR Code único para resgate seguro",
    "Personalização com mensagem e remetente",
    "Vendas recorrentes em datas comemorativas",
    "Dashboard de vendas e resgates por período",
  ]},
];

const ferramentasAvancadas: FerramentaItem[] = [
  { icon: "🏢", title: "Portal Corporativo B2B", desc: "QVT para empresas", details: [
    "Planos corporativos de Qualidade de Vida no Trabalho",
    "Gestão de colaboradores por empresa com limites",
    "Dashboard B2B com métricas de uso e engajamento",
    "Landing page profissional com cases e depoimentos",
    "Galeria, FAQ e planos configuráveis pelo admin",
  ]},
  { icon: "🤝", title: "Programa de Parceiros", desc: "Comissões multinível", details: [
    "Faixas de comissão: Bronze, Prata, Ouro, Diamante",
    "Cupons exclusivos com rastreamento de uso",
    "Dashboard de vendas e ganhos por parceiro",
    "Materiais de divulgação personalizados",
    "Pagamento automático de comissões",
  ]},
  { icon: "👑", title: "Clube VIP / Assinaturas", desc: "Receita recorrente", details: [
    "Planos de assinatura com créditos mensais",
    "Descontos exclusivos em serviços e produtos",
    "Prioridade no agendamento para assinantes",
    "Cashback bônus e benefícios progressivos",
    "Renovação automática e gestão de cancelamento",
  ]},
  { icon: "📣", title: "Campanhas Marketing", desc: "Segmentação avançada", details: [
    "Criação de campanhas por tipo (email, push, WhatsApp)",
    "Segmentação por perfil, frequência e gasto",
    "Agendamento de envio com métricas de abertura",
    "Templates prontos para datas comemorativas",
    "A/B testing de mensagens para otimização",
  ]},
  { icon: "🎯", title: "Banners Dinâmicos", desc: "A/B testing nativo", details: [
    "Banners promocionais com data de expiração",
    "Segmentação por tipo de cliente",
    "Métricas de visualização e cliques",
    "Suporte a imagens, vídeos e CTAs",
    "Controle de prioridade e rotação automática",
  ]},
  { icon: "📈", title: "Google Ads Integrado", desc: "ROI em tempo real", details: [
    "Dashboard com métricas de campanhas em tempo real",
    "CPC, CTR, conversões e ROAS por campanha",
    "Comparativo de performance entre períodos",
    "Alertas automáticos de performance anormal",
    "Integração direta com Google Ads API",
  ]},
  { icon: "🔔", title: "Notificações Push", desc: "PWA nativo", details: [
    "Push notifications via Service Worker (PWA)",
    "Segmentação por perfil e comportamento",
    "Envio manual pelo admin ou automático por triggers",
    "Histórico de notificações enviadas e lidas",
    "Suporte a deep linking para ações específicas",
  ]},
  { icon: "📊", title: "Segmentação Clientes", desc: "CRM inteligente", details: [
    "Classificação automática por frequência e gasto",
    "Tags e filtros personalizados por comportamento",
    "Identificação de clientes em risco de churn",
    "Exportação de listas para campanhas direcionadas",
    "Dashboard de lifetime value por segmento",
  ]},
  { icon: "⭐", title: "Avaliações & Feedback", desc: "NPS automático", details: [
    "Feedback rápido por emoji após cada sessão",
    "Avaliações com notas e comentários detalhados",
    "Cálculo automático de NPS por terapeuta/serviço",
    "Alertas para avaliações negativas em tempo real",
    "Relatórios de satisfação por período",
  ]},
  { icon: "🔐", title: "Segurança Enterprise", desc: "RLS + Audit Logs", details: [
    "366 políticas RLS protegendo todas as 134 tabelas",
    "Audit logs completos de operações sensíveis",
    "Rate limiting para proteção contra abuso",
    "Permissões granulares (30 permissões distintas)",
    "RBAC com 4 roles e materialização de cache",
  ]},
  { icon: "📄", title: "Lista de Espera", desc: "Cashback de fidelidade", details: [
    "Inscrição com preferência de dia e horário",
    "Cashback bônus para quem espera pacientemente",
    "Notificação automática quando vaga abre",
    "Priorização por tempo de espera e plano VIP",
    "Dashboard admin com fila e métricas de conversão",
  ]},
  { icon: "🧠", title: "Resinkra AI", desc: "Conteúdo IA para social", details: [
    "Geração de roteiros para Reels, Stories e Lives",
    "Criação de carrosséis com estrutura pronta",
    "Ganchos virais com score de poder e emoção",
    "Banco de ideias por nicho e etapa do funil",
    "Calendário editorial com agendamento de posts",
  ]},
];

const ferramentasIA: FerramentaItem[] = [
  { icon: "🤖", title: "Chat IA Interno", desc: "Assistente 24/7 com streaming e tool calling", details: [
    "Assistente inteligente com respostas em streaming (tempo real)",
    "Tool calling para agendar sessões automaticamente via chat",
    "Consulta disponibilidade de terapeutas e horários livres",
    "Respostas contextualizadas sobre serviços, preços e protocolos",
    "Histórico de conversas salvo por sessão do usuário",
    "Modelo: Google Gemini 3 Flash via Lovable AI Gateway",
    "Suporte 24/7 sem necessidade de atendente humano",
  ]},
  { icon: "📱", title: "WhatsApp Bot", desc: "Prospecção regional e agendamento via Z-API", details: [
    "Prospecção automática de leads regionais via WhatsApp",
    "Qualificação inteligente com perguntas personalizadas",
    "Agendamento direto pelo WhatsApp com tool calling",
    "Integração nativa com Z-API para envio/recebimento",
    "Painel admin (/chat-whatsapp) para monitorar conversas",
    "Transbordo para atendimento humano quando necessário",
    "Relatórios de conversão de leads por campanha",
  ]},
  { icon: "🧠", title: "Resinkra AI Studio", desc: "Roteirização profissional para Instagram", details: [
    "Geração de roteiros para Reels com gancho + desenvolvimento + CTA",
    "Criação de Carrosséis com estrutura slide-a-slide",
    "Roteiros para Stories com sequência de telas e CTAs",
    "Scripts para Lives com pauta, timestamps e interações",
    "Score de viralidade automático para cada conteúdo",
    "Prompts especializados por formato e perfil da marca",
    "Edge Function dedicada: generate-script (Gemini 3 Flash)",
  ]},
  { icon: "⚡", title: "Ganchos Virais", desc: "Geração de hooks com score de poder", details: [
    "Geração de ganchos persuasivos por tópico e nicho",
    "Score de poder (1-10) para cada gancho gerado",
    "Emoção principal identificada (curiosidade, medo, desejo, etc.)",
    "Sugestão de complemento para finalizar o gancho",
    "Categorização: pergunta, afirmação chocante, estatística, etc.",
    "Recomendação de melhor uso (Reels, Stories, Carrossel)",
    "Edge Function dedicada: generate-hooks (Gemini 3 Flash)",
  ]},
  { icon: "🎯", title: "Banco de Ideias", desc: "10 ideias por nicho distribuídas pelo funil", details: [
    "Geração de 10 ideias de conteúdo por solicitação",
    "Distribuição pelo funil: 4 Topo, 3 Meio, 3 Fundo",
    "Cada ideia com título, descrição e tipo de conteúdo",
    "Marcação de ideias já utilizadas para não repetir",
    "Filtros por nicho, etapa do funil e tipo de conteúdo",
    "Integração com calendário editorial para agendamento",
    "Edge Function dedicada: generate-ideas (Gemini 3 Flash)",
  ]},
  { icon: "📊", title: "Análise de Viralidade", desc: "Análise de conteúdos externos com IA", details: [
    "Cole a URL ou texto de um conteúdo para análise",
    "Score de viralidade com métricas detalhadas",
    "Identificação de pontos fortes e fracos do conteúdo",
    "Sugestões de melhoria baseadas em padrões virais",
    "Comparativo com benchmarks do nicho",
    "Edge Function dedicada: analyze-viral (Gemini 3 Flash)",
  ]},
  { icon: "💡", title: "Recomendações Clínicas", desc: "Motor baseado em regras para protocolos", details: [
    "Análise automática da ficha nutricional do paciente",
    "Cruzamento com histórico cirúrgico e objetivos",
    "Sugestão de tratamentos e protocolos personalizados",
    "Gatilhos clínicos e de estilo de vida mapeados",
    "Arquitetura rule-based (sem custo de créditos de IA)",
    "Rota dedicada: /recomendacoes para o usuário final",
  ]},
];

const faturamentoItems: FerramentaItem[] = [
  { icon: "🔄", title: "+40% Recorrência", desc: "Cashback mantém clientes voltando", details: [
    "Sistema de cashback automático em cada agendamento e compra",
    "Créditos acumulados incentivam retorno frequente",
    "Clube VIP com benefícios exclusivos para assinantes",
    "Lembretes inteligentes de retorno baseados no protocolo",
    "Taxa de retenção média 40% superior ao mercado",
  ]},
  { icon: "📈", title: "+25% Ticket Médio", desc: "Upsell inteligente de pacotes e produtos", details: [
    "Sugestão automática de pacotes complementares no checkout",
    "E-commerce integrado com produtos e combos exclusivos",
    "Recomendações personalizadas baseadas no histórico do cliente",
    "Descontos progressivos em pacotes de múltiplas sessões",
    "Cross-sell entre serviços, cursos e produtos",
  ]},
  { icon: "🤝", title: "+60% Indicações", desc: "Programa de indicação com recompensas", details: [
    "Cashback automático para quem indica e para o indicado",
    "Link de indicação único por usuário com rastreamento",
    "Recompensas creditadas automaticamente após primeira sessão",
    "Dashboard de indicações com métricas de conversão",
    "Programa de parceiros com comissões multinível",
  ]},
  { icon: "🆕", title: "+35% Novos Clientes", desc: "Bot WhatsApp prospecta automaticamente", details: [
    "WhatsApp Bot com prospecção regional automática",
    "Qualificação de leads com perguntas inteligentes",
    "Agendamento direto pelo WhatsApp sem intervenção humana",
    "Campanhas de marketing segmentadas por perfil",
    "Banners dinâmicos com A/B testing para conversão",
  ]},
  { icon: "🏆", title: "3x Engajamento", desc: "Gamificação com XP e desafios", details: [
    "Sistema de XP com níveis e progressão visual",
    "Desafios semanais e mensais com recompensas reais",
    "Ranking motivacional entre participantes",
    "Conquistas e badges desbloqueáveis por atividade",
    "Notificações push personalizadas para manter engajamento",
  ]},
];

const monetizacaoItems: FerramentaItem[] = [
  { icon: "💰", title: "Tabela de Preços", desc: "17 cursos de R$ 497 a R$ 1.497", details: [
    "Fitoterapia Clínica (140h) — R$ 1.497 (Premium)",
    "Óleos Essenciais (150h) — R$ 1.497 (Premium)",
    "Massagem Modeladora (128h) — R$ 1.297 (Premium)",
    "Drenagem Linfática (116h) — R$ 1.097 (Intermediário)",
    "Saboaria Artesanal (99h) — R$ 897 (Intermediário)",
    "Head SPA Coreano (65h) — R$ 797 (Intermediário)",
    "Aromaterapia dōTERRA (58h) — R$ 597 (Essencial)",
    "Método Resinkra (24h) — R$ 497 (Essencial)",
    "Valor total do catálogo: R$ 18.370 · Ticket médio: R$ 1.080",
  ]},
  { icon: "📊", title: "Projeção de Faturamento", desc: "De R$ 3.985 a R$ 54.850/mês", details: [
    "Conservador: 5 alunos/mês · Ticket R$ 797 → R$ 3.985/mês (R$ 47.820/ano)",
    "Moderado: 15 alunos/mês · Ticket R$ 897 → R$ 13.455/mês (R$ 161.460/ano)",
    "Otimista: 30 alunos/mês · Ticket R$ 1.097 → R$ 32.910/mês (R$ 394.920/ano)",
    "Agressivo: 50 alunos/mês · Ticket R$ 1.097 → R$ 54.850/mês (R$ 658.200/ano)",
    "Potencial com 20 alunos/curso: R$ 367.400 em receita total",
  ]},
  { icon: "🛒", title: "Modelos de Venda", desc: "Individual, combos, assinatura e formação", details: [
    "Curso Individual: venda avulsa com acesso vitalício + certificado",
    "Combo Temático: 3+ cursos relacionados com 20-30% de desconto",
    "Assinatura Mensal: acesso total por R$ 197-297/mês",
    "Formação Completa: catálogo + mentoria por R$ 4.997-6.997",
  ]},
  { icon: "🎯", title: "Tráfego Pago (Ads)", desc: "Google/Meta com ROI 3-5x", details: [
    "Campanhas de conversão com público lookalike de clientes",
    "Retargeting para visitantes que não compraram",
    "Anúncios em vídeo curto (Reels/Shorts) com bastidores",
    "Budget sugerido: R$ 1.500-3.000/mês para ROI 3-5x",
  ]},
  { icon: "📱", title: "Conteúdo Orgânico", desc: "Resinkra AI para Reels e Stories", details: [
    "Roteiros de Reels educativos gerados pela Resinkra AI",
    "3-5 posts/semana com dicas do conteúdo dos cursos",
    "Stories com enquetes sobre temas dos cursos",
    "Lives semanais com mini-aulas gratuitas como isca",
  ]},
  { icon: "💬", title: "WhatsApp Bot", desc: "Nutrição automática de leads via Z-API", details: [
    "Sequência automática: 7 mensagens em 14 dias",
    "Oferta especial para leads que interagiram mas não compraram",
    "Disparos segmentados por interesse (saúde, beleza, empreendedorismo)",
    "Certificados de mini-curso gratuito como isca de captura",
  ]},
  { icon: "🤝", title: "Programa de Afiliados", desc: "Comissões de 20-30% para parceiros", details: [
    "Comissão de 20-30% por aluno indicado",
    "Material pronto (banners, textos, vídeos) para divulgação",
    "Dashboard de acompanhamento no painel do parceiro",
    "Bônus escalonado: +5% a cada 10 vendas no mês",
  ]},
  { icon: "🎁", title: "Estratégias de Conversão", desc: "Degustação, cupons e garantia", details: [
    "Aula gratuita de degustação (1º módulo liberado)",
    "Cupom de R$ 100 OFF para primeiras 48h após cadastro",
    "Garantia de 7 dias ou dinheiro de volta",
    "Bônus exclusivos: checklist + grupo VIP no WhatsApp",
  ]},
  { icon: "📧", title: "Email Marketing (Resend)", desc: "Sequências automatizadas de nutrição", details: [
    "Sequência de boas-vindas: 5 emails em 10 dias",
    "Newsletter semanal com dicas e depoimentos de alunos",
    "Campanhas sazonais: Black Friday, volta às aulas, datas comemorativas",
    "Segmentação: leads frios → aquecidos → compradores → upsell",
  ]},
  { icon: "🔄", title: "Funil de Vendas", desc: "5 etapas: atração ao upsell", details: [
    "1. Atração: Reels/Ads → Landing page do curso",
    "2. Captura: Mini-curso grátis → Coleta email/WhatsApp",
    "3. Nutrição: Sequência WhatsApp + Email (7-14 dias)",
    "4. Conversão: Oferta com urgência + bônus exclusivos",
    "5. Upsell: Combo/assinatura para quem já comprou",
  ]},
];

/* ─── Collapsible Tool Item ─── */
const FerramentaCollapsibleItem = ({ item }: { item: FerramentaItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2 p-2.5 text-left"
      >
        <span className="text-base">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-semibold text-foreground leading-tight">{item.title}</p>
          <p className="text-[9px] text-muted-foreground">{item.desc}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown size={12} className="text-muted-foreground" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-2.5 pb-2.5 space-y-1">
              {item.details.map((d, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <span className="text-[9px] text-muted-foreground leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FerramentasCollapsible = ({ items }: { items: FerramentaItem[] }) => (
  <div className="grid grid-cols-1 gap-1.5 max-h-[55vh] overflow-y-auto pr-1">
    {items.map(item => (
      <FerramentaCollapsibleItem key={item.title} item={item} />
    ))}
  </div>
);

/* ─── Investimento Collapsible ─── */
interface InvestimentoOption {
  label: string;
  badge: string;
  badgeColor: "destructive" | "primary";
  valor: string;
  prazo: string;
  cardStyle: string;
  details: string[];
}

const investimentoOptions: InvestimentoOption[] = [
  {
    label: "Freelancer Sênior",
    badge: "Tradicional",
    badgeColor: "destructive",
    valor: "R$ 1.450.000+",
    prazo: "30-40 meses de desenvolvimento",
    cardStyle: "border-destructive/20 bg-destructive/5",
    details: [
      "100+ páginas e 300+ componentes React/TypeScript",
      "134 tabelas com 366 políticas RLS de segurança",
      "44 Edge Functions para integrações e IA",
      "Sistema completo de IA (Resinkra AI, Chat, Análise Viral, Wellness)",
      "PWA mobile-first com suporte offline e Capacitor",
      "29 módulos de funcionalidades (academy, marketplace, liga, etc.)",
      "Risco crítico: dependência de único profissional, burnout provável",
      "Sem garantia de escalabilidade — reescrita provável após 18 meses",
    ],
  },
  {
    label: "Agência Digital",
    badge: "Tradicional",
    badgeColor: "destructive",
    valor: "R$ 2.200.000+",
    prazo: "36-48 meses de desenvolvimento",
    cardStyle: "border-destructive/30 bg-destructive/5",
    details: [
      "Equipe de 10-15 profissionais (devs, designers, PMs, QA)",
      "Custo mensal médio de R$ 45.000-75.000 com equipe",
      "17 cursos profissionalizantes (1.886h de conteúdo educacional)",
      "Módulo corporativo B2B completo com dashboard RH e métricas",
      "51 database functions + 57 triggers automáticos",
      "Integrações: Z-API, Resend, Asaas, Google Ads, IA generativa",
      "Overhead de gestão: reuniões, sprints, documentação, deploys",
      "Manutenção mensal pós-entrega: R$ 25.000-45.000",
    ],
  },
  {
    label: "Software House Enterprise",
    badge: "Tradicional",
    badgeColor: "destructive",
    valor: "R$ 3.200.000+",
    prazo: "24-30 meses com equipe dedicada",
    cardStyle: "border-destructive/40 bg-destructive/5",
    details: [
      "Arquitetura enterprise com microsserviços e multi-tenant",
      "QA dedicado, DevOps, CI/CD, monitoramento 24/7",
      "Licenciamento White-Label com personalização total",
      "SLA contratual com penalidades e suporte premium",
      "Custo mensal de manutenção: R$ 55.000-90.000",
      "Contrato mínimo de 18 meses obrigatório",
      "Total 3 anos (dev + manutenção): R$ 5.5M+",
      "Fonte: Quiker.com.br e B2Bit — pesquisa mercado 2025",
    ],
  },
  {
    label: "Com Resinkra + IA",
    badge: "97% economia",
    badgeColor: "primary",
    valor: "Fração do custo",
    prazo: "Desenvolvimento acelerado por IA em semanas",
    cardStyle: "border-primary/30 bg-primary/5",
    details: [
      "100+ páginas entregues e funcionando em produção",
      "300+ componentes com design system consistente",
      "134 tabelas + 366 RLS policies — segurança enterprise",
      "44 Edge Functions ativas com deploy automático",
      "51 database functions + 57 triggers para automação",
      "17 cursos (1.886h) + certificação automática",
      "IA nativa: roteiros virais, wellness, análise de conteúdo",
      "29 módulos integrados — manutenção contínua por IA",
      "Iterações em tempo real — ajustes em minutos, não semanas",
    ],
  },
];

const InvestimentoCollapsibleCard = ({ opt }: { opt: InvestimentoOption }) => {
  const [open, setOpen] = useState(false);
  const isResinkra = opt.badgeColor === "primary";
  return (
    <Card className={opt.cardStyle}>
      <CardContent className="p-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full p-4 flex flex-col gap-1 text-left"
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${isResinkra ? "text-primary" : "text-destructive"}`}>{opt.label}</span>
            <div className="flex items-center gap-1.5">
              <Badge variant={isResinkra ? "default" : "destructive"} className={`text-[10px] ${isResinkra ? "bg-primary/20 text-primary border-primary/30" : ""}`}>
                {opt.badge}
              </Badge>
              <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={14} className="text-muted-foreground" />
              </motion.div>
            </div>
          </div>
          <p className={`text-2xl font-bold ${isResinkra ? "text-primary" : "text-destructive"}`}>{opt.valor}</p>
          <p className="text-[10px] text-muted-foreground">{opt.prazo}</p>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-1.5 border-t border-border/50 pt-3">
                {opt.details.map((d, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className={`w-3 h-3 shrink-0 mt-0.5 ${isResinkra ? "text-primary" : "text-muted-foreground"}`} />
                    <span className="text-[10px] text-muted-foreground leading-relaxed">{d}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

const InvestimentoContent = () => (
  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
    <div className="grid grid-cols-2 gap-2 text-center mb-1">
      <div className="bg-destructive/10 rounded-xl p-2">
        <p className="text-sm font-bold text-destructive">R$ 1.4M–3.2M</p>
        <p className="text-[9px] text-muted-foreground">Custo tradicional</p>
      </div>
      <div className="bg-primary/10 rounded-xl p-2">
        <p className="text-sm font-bold text-primary">97% economia</p>
        <p className="text-[9px] text-muted-foreground">Com Resinkra + IA</p>
      </div>
    </div>
    <div className="grid gap-2.5">
      {investimentoOptions.map(opt => (
        <InvestimentoCollapsibleCard key={opt.label} opt={opt} />
      ))}
    </div>
    <div className="bg-accent/10 rounded-xl p-3 space-y-1.5">
      <p className="text-xs text-accent font-semibold text-center">💡 Custos de manutenção no mercado (2025)</p>
      <div className="grid grid-cols-2 gap-2 text-center">
        <div>
          <p className="text-[10px] font-semibold text-destructive">R$ 25.000–45.000</p>
          <p className="text-[8px] text-muted-foreground">Freelancer/Agência por mês</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold text-destructive">R$ 55.000–90.000</p>
          <p className="text-[8px] text-muted-foreground">Software House por mês</p>
        </div>
      </div>
      <p className="text-[8px] text-muted-foreground text-center italic">Fonte: Quiker.com.br, B2Bit — pesquisa mercado 2025</p>
    </div>
  </div>
);

/* ─── Slide Data ─── */
const slides = [
  {
    id: "hero",
    title: "Resinkra",
    subtitle: "A Plataforma Completa para Clínicas de Bem-Estar, Estética & Saúde Integrativa",
    content: (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-2 justify-center">
          {["SaaS Enterprise", "IA Integrada", "100% Mobile-First", "White-Label"].map(tag => (
            <Badge key={tag} className="bg-primary/10 text-primary border-primary/20 px-3 py-1 text-xs font-medium">{tag}</Badge>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center max-w-md mx-auto leading-relaxed">
          Ecossistema digital completo que conecta <strong className="text-foreground">clínicas, terapeutas, pacientes e parceiros</strong> em uma única plataforma inteligente, com automação de processos, gamificação e inteligência artificial.
        </p>
        <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
          {[
            { n: "100+", l: "Páginas" },
            { n: "300+", l: "Componentes" },
            { n: "134", l: "Tabelas DB" },
            { n: "44", l: "Edge Functions" },
          ].map(m => (
            <div key={m.l} className="bg-card border rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-primary">{m.n}</p>
              <p className="text-[10px] text-muted-foreground">{m.l}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    icon: Rocket,
    color: "primary",
  },
  {
    id: "custo",
    title: "Investimento Tradicional vs. Resinkra",
    subtitle: "Quanto custaria desenvolver tudo isso do zero?",
    content: <InvestimentoContent />,
    icon: DollarSign,
    color: "accent",
  },
  {
    id: "tempo",
    title: "Tempo de Desenvolvimento",
    subtitle: "Comparativo de prazos reais de mercado",
    content: (
      <div className="space-y-4">
        {[
          { label: "Freelancer Sênior", meses: 36, pct: 100 },
          { label: "Equipe Pequena (3-5)", meses: 24, pct: 67 },
          { label: "Agência Digital", meses: 42, pct: 100 },
          { label: "Software House", meses: 28, pct: 78 },
        ].map(item => (
          <div key={item.label} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-semibold text-destructive">{item.meses} meses</span>
            </div>
            <Progress value={item.pct} className="h-2 [&>div]:bg-destructive/60" />
          </div>
        ))}
        <div className="space-y-1 mt-2 p-3 bg-primary/5 rounded-xl border border-primary/20">
          <div className="flex justify-between text-xs">
            <span className="text-primary font-semibold">Resinkra + IA ⚡</span>
            <span className="font-bold text-primary">Semanas</span>
          </div>
          <Progress value={8} className="h-3 [&>div]:bg-primary" />
        </div>
      </div>
    ),
    icon: Clock,
    color: "primary",
  },
  {
    id: "ferramentas",
    title: "Ferramentas Completas",
    subtitle: "Toque em cada ferramenta para ver detalhes",
    content: <FerramentasCollapsible items={ferramentasCore} />,
    icon: Layers,
    color: "primary",
  },
  {
    id: "ferramentas2",
    title: "Mais Ferramentas",
    subtitle: "Toque em cada recurso para ver detalhes",
    content: <FerramentasCollapsible items={ferramentasAvancadas} />,
    icon: Sparkles,
    color: "accent",
  },
  {
    id: "ia",
    title: "Inteligência Artificial",
    subtitle: "Toque em cada ferramenta IA para ver detalhes",
    content: <FerramentasCollapsible items={ferramentasIA} />,
    icon: Brain,
    color: "primary",
  },
  {
    id: "cursos",
    title: "Catálogo de Cursos",
    subtitle: "17 cursos profissionalizantes com certificação",
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center mb-2">
          <div className="bg-primary/10 rounded-xl p-2">
            <p className="text-lg font-bold text-primary">17</p>
            <p className="text-[9px] text-muted-foreground">Cursos</p>
          </div>
          <div className="bg-accent/10 rounded-xl p-2">
            <p className="text-lg font-bold text-accent">190</p>
            <p className="text-[9px] text-muted-foreground">Módulos</p>
          </div>
          <div className="bg-primary/10 rounded-xl p-2">
            <p className="text-lg font-bold text-primary">1.886h</p>
            <p className="text-[9px] text-muted-foreground">Conteúdo</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
          {[
            "Método Resinkra — 120h", "Aromaterapia Clínica — 100h", "Head SPA Japonês — 90h",
            "Anatomia Humana — 130h", "Yūgen Face SPA — 80h", "Perfumaria Natural — 80h",
            "Velas Aromáticas — 98h", "Saboaria Artesanal — 99h", "Difusor de Ambientes — 105h",
            "Fitoterapia Aplicada — 140h", "Óleos Essenciais — 150h", "Massagem Modeladora — 128h",
            "Drenagem Linfática — 116h", "Gastronomia Saudável — 130h", "Vendas & Negócios — 75h",
            "Seitai e New Seitai — 125h", "Bandagem Elástica — 120h"
          ].map(c => (
            <div key={c} className="flex items-center gap-2 bg-card border rounded-lg px-2.5 py-1.5">
              <GraduationCap className="w-3 h-3 text-primary shrink-0" />
              <span className="text-[10px] text-foreground">{c}</span>
            </div>
          ))}
        </div>
        <div className="bg-accent/10 rounded-xl p-2 text-center">
          <p className="text-[10px] text-accent font-semibold">✅ Progressão desbloqueável por níveis + Quizzes + Certificação automática</p>
        </div>
      </div>
    ),
    icon: GraduationCap,
    color: "accent",
  },
  {
    id: "beneficios-usuario",
    title: "Benefícios para Usuários",
    subtitle: "Por que os clientes adoram a plataforma",
    content: (
      <div className="space-y-2.5">
        {[
          { icon: "⭐", text: "Sistema de cashback que fideliza — cada sessão vira crédito" },
          { icon: "🏆", text: "Gamificação com XP, desafios e ranking motivacional" },
          { icon: "📱", text: "Agendamento 24/7 pelo app, sem precisar ligar" },
          { icon: "🎁", text: "Vale presente digital para presentear com saúde" },
          { icon: "📋", text: "Acompanhamento completo: dieta, exercícios e evolução" },
          { icon: "🤖", text: "Chat IA para dúvidas e suporte instantâneo" },
          { icon: "📸", text: "Registro fotográfico de evolução com comparativos" },
          { icon: "👑", text: "Clube VIP com descontos exclusivos e prioridade" },
          { icon: "📚", text: "Acesso a cursos profissionalizantes com certificação" },
          { icon: "🔔", text: "Lembretes inteligentes de alongamento e consultas" },
        ].map(b => (
          <div key={b.text} className="flex items-start gap-2 bg-card border rounded-lg px-3 py-2">
            <span className="text-sm">{b.icon}</span>
            <span className="text-[10px] text-foreground leading-relaxed">{b.text}</span>
          </div>
        ))}
      </div>
    ),
    icon: Heart,
    color: "primary",
  },
  {
    id: "beneficios-terapeuta",
    title: "Benefícios para Terapeutas",
    subtitle: "Aumente sua produtividade e renda",
    content: (
      <div className="space-y-2.5">
        {[
          { icon: "📊", text: "Dashboard pessoal com métricas de atendimentos e faturamento" },
          { icon: "📅", text: "Agenda inteligente com slots automáticos e lista de espera" },
          { icon: "📋", text: "Fichas de acompanhamento e checklists por sessão" },
          { icon: "📸", text: "Registro de evolução fotográfica do paciente" },
          { icon: "⭐", text: "Avaliações dos clientes para construir reputação" },
          { icon: "📱", text: "Check-in por QR Code automatizado" },
          { icon: "🤖", text: "IA para gerar conteúdo e atrair novos clientes" },
          { icon: "💰", text: "Aumento de até 40% na recorrência com cashback" },
        ].map(b => (
          <div key={b.text} className="flex items-start gap-2 bg-card border rounded-lg px-3 py-2">
            <span className="text-sm">{b.icon}</span>
            <span className="text-[10px] text-foreground leading-relaxed">{b.text}</span>
          </div>
        ))}
      </div>
    ),
    icon: Users,
    color: "accent",
  },
  {
    id: "beneficios-parceiro",
    title: "Benefícios para Parceiros",
    subtitle: "Programa de parcerias com comissões",
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          {[
            { icon: "💎", title: "Faixas de Comissão", desc: "Bronze → Prata → Ouro → Diamante" },
            { icon: "🎫", title: "Cupons Exclusivos", desc: "Crie cupons com sua marca" },
            { icon: "📊", title: "Dashboard Próprio", desc: "Acompanhe vendas e ganhos" },
            { icon: "🎁", title: "Vales Presente", desc: "Venda vales para seus clientes" },
          ].map(f => (
            <div key={f.title} className="bg-card border rounded-xl p-3 text-center">
              <span className="text-xl">{f.icon}</span>
              <p className="text-xs font-semibold text-foreground mt-1">{f.title}</p>
              <p className="text-[9px] text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
        <Card className="border-accent/20 bg-accent/5">
          <CardContent className="p-3">
            <p className="text-xs font-semibold text-accent text-center">
              🤝 Comissões automáticas + rastreamento completo de indicações
            </p>
          </CardContent>
        </Card>
      </div>
    ),
    icon: Handshake,
    color: "primary",
  },
  {
    id: "faturamento",
    title: "Aumento de Faturamento",
    subtitle: "Toque em cada métrica para ver detalhes",
    content: <FerramentasCollapsible items={faturamentoItems} />,
    icon: TrendingUp,
    color: "accent",
  },
  {
    id: "diferencial",
    title: "Diferenciais Competitivos",
    subtitle: "O que nenhum concorrente oferece junto",
    content: (
      <div className="space-y-2">
        {[
          "Ecossistema completo (não precisa de 10 ferramentas separadas)",
          "IA nativa para conteúdo, atendimento e prospecção",
          "Gamificação real com XP, desafios e ranking",
          "Portal Corporativo B2B para contratos empresariais",
          "15 cursos com certificação (receita passiva)",
          "Programa de parceiros com comissões multinível",
          "WhatsApp Bot com tool calling (agenda sozinho)",
          "PWA instalável — funciona como app nativo",
          "CRM com segmentação automática de clientes",
          "Cashback + VIP + Indicações = tripla fidelização",
          "Painel admin com 30+ abas de controle total",
          "Segurança enterprise: RLS, audit logs, rate limiting",
        ].map((d, i) => (
          <div key={i} className="flex items-start gap-2 px-2 py-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
            <span className="text-[10px] text-foreground leading-relaxed">{d}</span>
          </div>
        ))}
      </div>
    ),
    icon: Award,
    color: "primary",
  },
  {
    id: "concorrentes",
    title: "Vantagens sobre Concorrentes",
    subtitle: "Comparativo com soluções do mercado",
    content: (
      <div className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full text-[9px]">
            <thead>
              <tr className="border-b">
                <th className="text-left py-1.5 text-muted-foreground font-medium">Recurso</th>
                <th className="text-center py-1.5 text-primary font-bold">Resinkra</th>
                <th className="text-center py-1.5 text-muted-foreground font-medium">Outros</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Agendamento + CRM", "✅", "✅"],
                ["Cashback & Gamificação", "✅", "❌"],
                ["IA Nativa (Chat + Bot)", "✅", "❌"],
                ["Cursos com Certificação", "✅", "❌"],
                ["Portal B2B Corporativo", "✅", "❌"],
                ["Programa de Parceiros", "✅", "⚠️"],
                ["WhatsApp Bot + Tool Calling", "✅", "❌"],
                ["Avaliação Postural + Fotos", "✅", "❌"],
                ["Conteúdo IA para Redes", "✅", "❌"],
                ["E-commerce Integrado", "✅", "⚠️"],
                ["PWA Instalável", "✅", "⚠️"],
                ["Audit Logs + Segurança", "✅", "⚠️"],
              ].map(([recurso, resinkra, outros]) => (
                <tr key={recurso} className="border-b border-border/50">
                  <td className="py-1.5 text-foreground">{recurso}</td>
                  <td className="text-center">{resinkra}</td>
                  <td className="text-center">{outros}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-[9px] text-muted-foreground text-center">⚠️ = parcial ou add-on pago</p>
      </div>
    ),
    icon: BarChart3,
    color: "accent",
  },
  {
    id: "seguranca",
    title: "Segurança & Infraestrutura",
    subtitle: "Enterprise-grade desde o dia 1",
    content: (
      <div className="space-y-2.5">
        {[
          { icon: Shield, title: "Row Level Security", desc: "316 políticas RLS protegendo 96 tabelas" },
          { icon: Shield, title: "Audit Logs", desc: "Registro completo de operações sensíveis" },
          { icon: Shield, title: "Rate Limiting", desc: "Proteção contra abuso de login e API" },
          { icon: Globe, title: "Edge Functions", desc: "24 funções serverless com deploy automático" },
          { icon: Shield, title: "Autenticação", desc: "Login seguro com verificação de email" },
          { icon: Smartphone, title: "PWA", desc: "Service Worker + push notifications" },
        ].map(item => (
          <div key={item.title} className="flex gap-3 items-center bg-card border rounded-xl p-3">
            <item.icon className="w-4 h-4 text-primary shrink-0" />
            <div>
              <p className="text-xs font-semibold text-foreground">{item.title}</p>
              <p className="text-[10px] text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    icon: Shield,
    color: "primary",
  },
  {
    id: "monetizacao",
    title: "Monetização de Cursos",
    subtitle: "Toque para ver preços, projeções e estratégias",
    content: <FerramentasCollapsible items={monetizacaoItems} />,
    icon: GraduationCap,
    color: "accent",
  },
  {
    id: "pitch-estrategico",
    title: "Pitch Estratégico",
    subtitle: "A Nova Era da Resinkra — Do consultório ao ecossistema global",
    content: (
      <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
        {/* Quote hero */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-primary italic">"Deixamos de ser uma clínica para nos tornarmos uma plataforma global de bem-estar."</p>
        </div>

        {/* Pilares tecnológicos */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-wide">🏗 Pilares da Tecnologia</p>
          {[
            { icon: "🔐", label: "Segurança Máxima", desc: "366 políticas RLS protegendo todos os dados" },
            { icon: "⚡", label: "Automação Total", desc: "46 Edge Functions (pagamentos, notificações, IA)" },
            { icon: "🤖", label: "Inteligência Artificial", desc: "Roteador Multi-Agente com Google Gemini 2.0 Flash" },
          ].map(p => (
            <div key={p.label} className="flex items-center gap-2.5 bg-card border rounded-lg px-3 py-2">
              <span className="text-base">{p.icon}</span>
              <div>
                <p className="text-[10px] font-semibold text-foreground">{p.label}</p>
                <p className="text-[9px] text-muted-foreground">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Resi AI 5 frentes */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-wide">🤖 Resi AI — 5 Frentes Estratégicas</p>
          {[
            { num: "1", nome: "Agente Agenda", desc: "Gerencia horários e sessões sem erro humano" },
            { num: "2", nome: "Agente Creator", desc: "Cria roteiros virais e ganchos de venda para redes sociais" },
            { num: "3", nome: "Agente Wellness", desc: "Insights de saúde baseados nos dados das pacientes" },
            { num: "4", nome: "Agente Loja", desc: "Recomenda produtos e pacotes personalizados" },
            { num: "5", nome: "Agente Core", desc: "Suporte 24/7 para cashback, plataforma e dúvidas gerais" },
          ].map(a => (
            <div key={a.num} className="flex items-center gap-2.5 bg-card border rounded-lg px-3 py-1.5">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-[9px] font-bold flex items-center justify-center shrink-0">{a.num}</span>
              <div>
                <p className="text-[10px] font-semibold text-foreground">{a.nome}</p>
                <p className="text-[9px] text-muted-foreground">{a.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Gamificação */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-wide">🏆 Máquina de Fidelização</p>
          {[
            { icon: "💎", label: "Cashback Inteligente", desc: "Tiers Bronze → Prata → Ouro que premia a fidelidade" },
            { icon: "📸", label: "Resinkra Moments", desc: "Rede social interna onde posts geram recompensas reais" },
            { icon: "🎮", label: "Desafios & Conquistas", desc: "Gamificação completa com XP, Badges e Cromos Éther" },
          ].map(g => (
            <div key={g.label} className="flex items-center gap-2.5 bg-card border rounded-lg px-3 py-2">
              <span className="text-base">{g.icon}</span>
              <div>
                <p className="text-[10px] font-semibold text-foreground">{g.label}</p>
                <p className="text-[9px] text-muted-foreground">{g.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Monetização */}
        <div className="space-y-1">
          <p className="text-[10px] font-bold text-foreground uppercase tracking-wide">💰 Potencial de Monetização (ROI)</p>
          {[
            { icon: "🏢", label: "B2B Corporativo", desc: "Portal pronto para vender planos QVT para grandes empresas" },
            { icon: "🎓", label: "Resinkra Academy", desc: "17 cursos prontos para certificação e monetização" },
            { icon: "🛒", label: "E-commerce Integrado", desc: "Produtos, pacotes e vales-presente digitais" },
            { icon: "👑", label: "Assinaturas VIP", desc: "Modelo de receita recorrente com Clube VIP" },
          ].map(m => (
            <div key={m.label} className="flex items-center gap-2.5 bg-card border rounded-lg px-3 py-2">
              <span className="text-base">{m.icon}</span>
              <div>
                <p className="text-[10px] font-semibold text-foreground">{m.label}</p>
                <p className="text-[9px] text-muted-foreground">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Próximos passos */}
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-3 space-y-2">
          <p className="text-[10px] font-bold text-accent uppercase tracking-wide">🚀 Próximos Passos</p>
          {[
            "Lançamento do App Mobile (Capacitor iOS & Android)",
            "Ativação das campanhas de IA com Resi Multi-Agente",
            "Expansão para o mercado B2B Corporativo",
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <ArrowRight className="w-3 h-3 text-accent shrink-0" />
              <span className="text-[10px] text-foreground">{s}</span>
            </div>
          ))}
        </div>

        {/* Legado */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-center">
          <p className="text-[10px] text-primary font-semibold leading-relaxed">O ecossistema Resinkra não é apenas um software — é o <strong>maior ativo da empresa</strong>, escalável para qualquer lugar do mundo. 🌍</p>
        </div>
      </div>
    ),
    icon: Target,
    color: "accent",
  },
  {
    id: "conclusao",
    title: "Resumo Executivo",
    subtitle: "A plataforma mais completa do mercado",
    content: (
      <div className="space-y-4">
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-center">
            <div>
              <p className="text-xl font-bold text-primary">R$ 1M+</p>
              <p className="text-[9px] text-muted-foreground">Valor de mercado</p>
            </div>
            <div>
              <p className="text-xl font-bold text-accent">95%</p>
              <p className="text-[9px] text-muted-foreground">Economia com IA</p>
            </div>
          </div>
        </div>
        <div className="space-y-2">
          {[
            "Plataforma completa pronta para escalar",
            "IA como motor de crescimento real",
            "Receitas diversificadas: serviços, cursos, e-commerce, B2B",
            "Fidelização tripla: cashback + VIP + gamificação",
            "Time-to-market imbatível com IA generativa",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-card border rounded-lg px-3 py-2">
              <Star className="w-3.5 h-3.5 text-accent shrink-0" />
              <span className="text-[10px] text-foreground font-medium">{item}</span>
            </div>
          ))}
        </div>
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground italic">"Tecnologia que transforma clínicas em ecossistemas digitais inteligentes."</p>
        </div>
      </div>
    ),
    icon: Rocket,
    color: "accent",
  },
];

/* ─── Component ─── */
const ApresentacaoPlataformaTab = () => {
  const [current, setCurrent] = useState(0);
  const total = slides.length;
  const slide = slides[current];

  const next = () => setCurrent(c => Math.min(c + 1, total - 1));
  const prev = () => setCurrent(c => Math.max(c - 1, 0));

  return (
    <div className="space-y-3">
      {/* Progress */}
      <div className="flex items-center gap-2">
        <span className="text-[10px] text-muted-foreground font-medium">{current + 1}/{total}</span>
        <Progress value={((current + 1) / total) * 100} className="flex-1 h-1.5" />
      </div>

      {/* Slide */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
        >
          <Card className="border-primary/10">
            <CardContent className="pt-5 pb-4 px-4">
              {/* Header */}
              <div className="text-center mb-4">
                <div className={`w-10 h-10 rounded-xl bg-${slide.color}/10 flex items-center justify-center mx-auto mb-2`}>
                  <slide.icon className={`w-5 h-5 text-${slide.color}`} />
                </div>
                <h3 className="text-base font-bold text-foreground">{slide.title}</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">{slide.subtitle}</p>
              </div>

              {/* Content */}
              <div className="max-h-[55vh] overflow-y-auto pr-1">
                {slide.content}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={prev}
          disabled={current === 0}
          className="text-xs"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Anterior
        </Button>

        {/* Dots */}
        <div className="flex gap-1 overflow-x-auto max-w-[140px] px-1">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full shrink-0 transition-all ${
                i === current ? "bg-primary w-4" : "bg-muted-foreground/30"
              }`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={next}
          disabled={current === total - 1}
          className="text-xs"
        >
          Próximo
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default ApresentacaoPlataformaTab;
