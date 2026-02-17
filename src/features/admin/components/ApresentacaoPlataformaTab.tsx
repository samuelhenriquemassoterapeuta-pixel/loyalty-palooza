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
    "262+ políticas RLS protegendo todas as tabelas",
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
            { n: "91", l: "Páginas" },
            { n: "220+", l: "Componentes" },
            { n: "92", l: "Tabelas DB" },
            { n: "24", l: "Edge Functions" },
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
    content: (
      <div className="space-y-4">
        <div className="grid gap-3">
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-destructive">Freelancer Sênior</span>
                <Badge variant="destructive" className="text-[10px]">Tradicional</Badge>
              </div>
              <p className="text-2xl font-bold text-destructive">R$ 748.000</p>
              <p className="text-[10px] text-muted-foreground mt-1">18-24 meses de desenvolvimento</p>
            </CardContent>
          </Card>
          <Card className="border-destructive/30 bg-destructive/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-destructive">Agência Digital</span>
                <Badge variant="destructive" className="text-[10px]">Tradicional</Badge>
              </div>
              <p className="text-2xl font-bold text-destructive">R$ 1.076.000</p>
              <p className="text-[10px] text-muted-foreground mt-1">24-36 meses de desenvolvimento</p>
            </CardContent>
          </Card>
          <Card className="border-primary/30 bg-primary/5">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary">Com Resinkra + IA</span>
                <Badge className="text-[10px] bg-primary/20 text-primary border-primary/30">95% economia</Badge>
              </div>
              <p className="text-2xl font-bold text-primary">Fração do custo</p>
              <p className="text-[10px] text-muted-foreground mt-1">Desenvolvimento acelerado por IA em semanas</p>
            </CardContent>
          </Card>
        </div>
        <div className="bg-accent/10 rounded-xl p-3 text-center">
          <p className="text-xs text-accent font-semibold">💡 Manutenção mensal estimada no mercado: R$ 13.800 a R$ 29.000/mês</p>
        </div>
      </div>
    ),
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
          { label: "Freelancer Solo", meses: 24, pct: 100 },
          { label: "Equipe Pequena (3-5)", meses: 14, pct: 58 },
          { label: "Agência Digital", meses: 18, pct: 75 },
          { label: "Software House", meses: 12, pct: 50 },
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
    subtitle: "IA como diferencial competitivo real",
    content: (
      <div className="space-y-3">
        {[
          { icon: Bot, title: "Chat IA Interno", desc: "Assistente 24/7 com streaming e tool calling para agendamentos automáticos", color: "text-primary" },
          { icon: Smartphone, title: "WhatsApp Bot", desc: "Prospecção regional, qualificação de leads e agendamento direto via Z-API", color: "text-accent" },
          { icon: Brain, title: "Resinkra AI Studio", desc: "Roteirização para Reels, Carrosséis, Stories e Lives com análise de viralidade", color: "text-primary" },
          { icon: Zap, title: "Ganchos Virais", desc: "Geração de hooks com score de poder e sugestão de complemento", color: "text-accent" },
          { icon: Target, title: "Banco de Ideias", desc: "10 ideias por nicho distribuídas pelo funil: Topo, Meio e Fundo", color: "text-primary" },
        ].map(item => (
          <div key={item.title} className="flex gap-3 items-start bg-card border rounded-xl p-3">
            <item.icon className={`w-5 h-5 ${item.color} shrink-0 mt-0.5`} />
            <div>
              <p className="text-xs font-semibold text-foreground">{item.title}</p>
              <p className="text-[10px] text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
    icon: Brain,
    color: "primary",
  },
  {
    id: "cursos",
    title: "Catálogo de Cursos",
    subtitle: "15 cursos profissionalizantes com certificação",
    content: (
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center mb-2">
          <div className="bg-primary/10 rounded-xl p-2">
            <p className="text-lg font-bold text-primary">15</p>
            <p className="text-[9px] text-muted-foreground">Cursos</p>
          </div>
          <div className="bg-accent/10 rounded-xl p-2">
            <p className="text-lg font-bold text-accent">154</p>
            <p className="text-[9px] text-muted-foreground">Módulos</p>
          </div>
          <div className="bg-primary/10 rounded-xl p-2">
            <p className="text-lg font-bold text-primary">1.388h</p>
            <p className="text-[9px] text-muted-foreground">Conteúdo</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-1.5 max-h-[220px] overflow-y-auto pr-1">
          {[
            "Head SPA Coreano — 65h", "Aromaterapia — 58h", "Alta Perfumaria Natural — 70h",
            "Massagem Modeladora — 128h", "Drenagem Linfática — 116h", "Fitoterapia — 140h",
            "Óleos Essenciais — 150h", "Velas Aromáticas — 98h", "Saboaria Artesanal — 99h",
            "Difusor de Ambientes — 105h", "Gastronomia Saudável — 130h", "Vendas — 75h",
            "Yūgen FaceSPA — 70h", "Anatomia Humana — 7 módulos", "Método Resinkra — 24h"
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
    subtitle: "Impacto direto nos resultados da clínica",
    content: (
      <div className="space-y-3">
        {[
          { metric: "+40%", label: "Recorrência", desc: "Cashback mantém clientes voltando", color: "bg-primary/10 text-primary" },
          { metric: "+25%", label: "Ticket Médio", desc: "Upsell inteligente de pacotes e produtos", color: "bg-accent/10 text-accent" },
          { metric: "+60%", label: "Indicações", desc: "Programa de indicação com recompensas", color: "bg-primary/10 text-primary" },
          { metric: "+35%", label: "Novos Clientes", desc: "Bot WhatsApp prospecta automaticamente", color: "bg-accent/10 text-accent" },
          { metric: "3x", label: "Engajamento", desc: "Gamificação com XP e desafios", color: "bg-primary/10 text-primary" },
        ].map(item => (
          <div key={item.label} className="flex items-center gap-3 bg-card border rounded-xl p-3">
            <div className={`rounded-xl px-3 py-2 ${item.color} font-bold text-lg min-w-[60px] text-center`}>
              {item.metric}
            </div>
            <div>
              <p className="text-xs font-semibold text-foreground">{item.label}</p>
              <p className="text-[10px] text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    ),
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
          { icon: Shield, title: "Row Level Security", desc: "262 políticas RLS protegendo 92 tabelas" },
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
