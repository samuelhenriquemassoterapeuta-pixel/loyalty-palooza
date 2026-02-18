import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Database,
  FolderTree,
  Plug,
  FileCode,
  Copy,
  Check,
  ChevronDown,
  Server,
  Shield,
  Layers,
  Terminal,
  BookOpen,
  KeyRound,
  Cpu,
  HardDrive,
  Globe,
  Zap,
  Users,
  Lock,
  CreditCard,
  Bot,
  MessageSquare,
  BarChart3,
  Bell,
  Image,
  GraduationCap,
  TrendingUp,
  Megaphone,
  DollarSign,
  Target,
  Sparkles,
  Calendar,
  ShoppingCart,
  Trophy,
  Building2,
  Activity,
  Gift,
  Headphones,
  Heart,
  Tag,
  Settings,
  FileText,
  Stethoscope,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { generateAllCoursesMarkdown } from "@/features/cursos/utils/generateCourseMarkdown";
import { generatePlatformMarkdown } from "@/features/admin/utils/generatePlatformMarkdown";
import { allDomainMarkdowns } from "@/features/admin/utils/generateDomainMarkdowns";
import { generateMediaMarkdown } from "@/features/admin/utils/generateMediaMarkdown";

// ── Reusable Components ──

const CodeBlock = ({ code, language = "typescript", title }: { code: string; language?: string; title?: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Código copiado!");
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-3 py-1.5 bg-muted/50 border-b border-border">
          <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1.5">
            <FileCode size={12} />
            {title}
          </span>
          <Badge variant="secondary" className="text-[9px]">{language}</Badge>
        </div>
      )}
      <div className="relative">
        <pre className="p-3 text-[11px] overflow-x-auto bg-card text-foreground leading-relaxed">
          <code>{code}</code>
        </pre>
        <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-6 w-6" onClick={handleCopy}>
          {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
        </Button>
      </div>
    </div>
  );
};

const SectionCollapsible = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  children,
  defaultOpen = false,
}: {
  title: string;
  subtitle?: string;
  icon: React.ElementType;
  badge?: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-border/60 bg-card/50 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-muted/30 transition-colors"
      >
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Icon size={20} className="text-primary" />
        </div>
        <div className="flex-1 text-left min-w-0">
          <span className="text-sm font-semibold text-foreground block">{title}</span>
          {subtitle && <span className="text-[11px] text-muted-foreground">{subtitle}</span>}
        </div>
        {badge && (
          <Badge variant="secondary" className="text-[10px] shrink-0">{badge}</Badge>
        )}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="p-1.5 rounded-full bg-primary/10 shrink-0"
        >
          <ChevronDown size={14} className="text-primary" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc: string }) => (
  <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-muted/30 border border-border/40">
    <Icon size={14} className="text-primary mt-0.5 shrink-0" />
    <div className="min-w-0">
      <span className="text-xs font-semibold text-foreground block">{title}</span>
      <span className="text-[10px] text-muted-foreground leading-tight">{desc}</span>
    </div>
  </div>
);

const FeatureGrid = ({ items }: { items: { icon: React.ElementType; title: string; desc: string }[] }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
    {items.map((item) => (
      <InfoCard key={item.title} {...item} />
    ))}
  </div>
);

const CourseMarkdownBlock = () => {
  const [copied, setCopied] = useState(false);
  const markdown = generateAllCoursesMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success("Markdown copiado! Cole em outra plataforma para verificar.");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Clique para copiar o markdown completo da estrutura de todos os cursos</p>
        <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2">
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? "Copiado!" : "Copiar Tudo"}
        </Button>
      </div>
      <CodeBlock title="Estrutura Completa dos Cursos (Markdown)" language="markdown" code={markdown} />
    </div>
  );
};

const MediaMarkdownBlock = () => {
  const [copied, setCopied] = useState(false);
  const markdown = generateMediaMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success("Markdown de mídia copiado!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">Catálogo completo de todas as imagens e vídeos da plataforma</p>
        <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2">
          {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
          {copied ? "Copiado!" : "Copiar Tudo"}
        </Button>
      </div>
      <CodeBlock title="Catálogo de Imagens & Vídeos (Markdown)" language="markdown" code={markdown} />
    </div>
  );
};

// ── Icon map for domain sections ──
const domainIconMap: Record<string, React.ElementType> = {
  Calendar, CreditCard, ShoppingCart, Shield, MessageSquare,
  Trophy, Building2, Bot, Activity, Gift, Headphones, Globe,
  Users, Stethoscope, FileText, Heart, Tag, BookOpen, Sparkles, Settings, Image,
};

const DomainMarkdownSection = ({ domain }: { domain: typeof allDomainMarkdowns[0] }) => {
  const [copied, setCopied] = useState(false);
  const IconComponent = domainIconMap[domain.icon] || Code2;

  const handleCopy = () => {
    const md = domain.generator();
    navigator.clipboard.writeText(md);
    setCopied(true);
    toast.success(`Markdown de "${domain.name}" copiado!`);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <SectionCollapsible
      title={domain.name}
      icon={IconComponent}
      defaultOpen={false}
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">Documentação completa do módulo em Markdown</p>
          <Button size="sm" variant="outline" onClick={handleCopy} className="gap-2">
            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
            {copied ? "Copiado!" : "Copiar"}
          </Button>
        </div>
        <CodeBlock title={`${domain.name} (Markdown)`} language="markdown" code={domain.generator()} />
      </div>
    </SectionCollapsible>
  );
};

// ── Main Component ──

const PlatformMarkdownBlock = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const markdown = generatePlatformMarkdown();
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    toast.success("Markdown completo da plataforma copiado!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="flex items-center gap-3 p-4 rounded-2xl border border-primary/30 bg-primary/5">
      <div className="p-2.5 rounded-xl bg-primary/10">
        <BookOpen size={20} className="text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-sm font-semibold text-foreground block">Exportar Plataforma Completa</span>
        <span className="text-[11px] text-muted-foreground">Gera um documento Markdown com toda a documentação da plataforma</span>
      </div>
      <Button size="sm" onClick={handleCopy} className="gap-2 shrink-0">
        {copied ? <Check size={14} /> : <Copy size={14} />}
        {copied ? "Copiado!" : "Copiar Tudo"}
      </Button>
    </div>
  );
};

export const CodigoPlataformaTab = () => {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="text-center py-2">
        <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-2">
          <Code2 size={28} className="text-primary" />
        </div>
        <h3 className="text-lg font-bold text-foreground">Código da Plataforma</h3>
        <p className="text-xs text-muted-foreground">Arquitetura, banco de dados, backend e integrações</p>
      </div>

      {/* Export Full Platform Markdown */}
      <PlatformMarkdownBlock />

      {/* Métricas resumo */}
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {[
          { label: "Tabelas DB", value: "95+" },
          { label: "Políticas RLS", value: "262+" },
          { label: "Edge Functions", value: "24" },
          { label: "Permissões", value: "30" },
          { label: "Componentes", value: "200+" },
          { label: "Funções SQL", value: "27+" },
          { label: "Storage", value: "11" },
          { label: "Triggers", value: "17+" },
        ].map((m) => (
          <Card key={m.label} className="p-2.5 text-center">
            <div className="text-base font-bold text-primary">{m.value}</div>
            <div className="text-[9px] text-muted-foreground">{m.label}</div>
          </Card>
        ))}
      </div>

      {/* 1. Estrutura do Projeto */}
      <SectionCollapsible
        title="Estrutura do Projeto"
        subtitle="Feature Folders com 21 domínios isolados"
        icon={FolderTree}
        badge="React + Vite"
      >
        <FeatureGrid items={[
          { icon: Layers, title: "React 18 + TypeScript", desc: "UI reativa com tipagem estática completa" },
          { icon: Zap, title: "Vite + Tailwind CSS", desc: "Build ultrarrápido com utility-first styling" },
          { icon: Cpu, title: "Shadcn/UI + Framer Motion", desc: "Componentes acessíveis com animações fluidas" },
          { icon: Globe, title: "Capacitor (Android/iOS)", desc: "PWA nativo com push notifications" },
          { icon: Database, title: "TanStack Query", desc: "Cache, invalidação e fetching declarativo" },
          { icon: Shield, title: "Zod + React Hook Form", desc: "Validação server/client-side type-safe" },
        ]} />
        <CodeBlock
          language="text"
          title="src/features/ — 21 Feature Folders"
          code={`admin/          → Painel administrativo (39+ componentes)
agendamentos/   → Fluxo de agendamento com check-in QR
alongamento/    → Exercícios e pausas posturais
avaliacao-postural/ → Fotos, ângulos e anotações
cashback/       → Wallet, tiers, transações
conquistas/     → Gamificação, XP, ranking
corporativo/    → Portal B2B para empresas
cupom/          → Editor de cupons de desconto
cursos/         → 17 cursos com módulos e progresso
dietas/         → Planos nutricionais personalizados
guia-clinico/   → Guia clínico interativo
landing/        → Landing page com parallax
loja/           → E-commerce interno (produtos + pacotes)
pagamento/      → Integração Asaas (PIX, boleto)
profile/        → Perfil do usuário + ficha nutricional
protocolos/     → Protocolos terapêuticos completos
resinkra-ai/    → IA para criação de conteúdo social
social/         → Resinkra Moments (social proof)
terapeuta/      → Dashboard do terapeuta
terapias/       → Catálogo de terapias
vale-presente/  → Sistema de vales digitais`}
        />
      </SectionCollapsible>

      {/* 2. Autenticação e RBAC */}
      <SectionCollapsible
        title="Autenticação & Permissões"
        subtitle="RBAC granular com 4 roles e 30 permissões"
        icon={KeyRound}
        badge="RBAC"
      >
        <FeatureGrid items={[
          { icon: Lock, title: "Email/Senha + Verificação", desc: "Rate limiting (5 tentativas/15min) + check HIBP" },
          { icon: Users, title: "4 Roles: Admin, User, Terapeuta, Parceiro", desc: "Tabela user_roles separada com anti-escalação" },
          { icon: Shield, title: "30 Permissões Granulares", desc: "Mapeadas em role_permissions com cache MV" },
          { icon: Cpu, title: "Materialized View Cache", desc: "user_permissions_mv auto-refresh via triggers" },
        ]} />
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-foreground">Distribuição por Role:</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { role: "Admin", perms: "30/30", desc: "Acesso total" },
              { role: "User", perms: "21/30", desc: "Básico + social" },
              { role: "Terapeuta", perms: "13/30", desc: "Clínico + cursos" },
              { role: "Parceiro", perms: "4/30", desc: "Loja + cashback" },
            ].map((r) => (
              <div key={r.role} className="p-2 rounded-lg bg-muted/30 border border-border/40">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-foreground">{r.role}</span>
                  <Badge variant="secondary" className="text-[9px]">{r.perms}</Badge>
                </div>
                <span className="text-[10px] text-muted-foreground">{r.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <CodeBlock
          title="Funções SQL de Permissão"
          language="sql"
          code={`-- Verificar papel
SELECT has_role('user-uuid', 'admin');        -- boolean

-- Verificar permissão granular
SELECT has_permission('user-uuid', 'admin', 'access');

-- Listar permissões do usuário
SELECT * FROM get_user_permissions('user-uuid');

-- Frontend: ProtectedRoute
<ProtectedRoute allowRoles={['admin']}>
  <Admin />
</ProtectedRoute>`}
        />
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-foreground">Módulos de Permissão (11):</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { mod: "admin", n: 1 }, { mod: "appointments", n: 4 }, { mod: "exercises", n: 3 },
              { mod: "cashback", n: 3 }, { mod: "courses", n: 4 }, { mod: "diets", n: 2 },
              { mod: "store", n: 2 }, { mod: "protocols", n: 2 }, { mod: "ai", n: 2 },
              { mod: "social", n: 4 }, { mod: "gift_card", n: 3 },
            ].map((m) => (
              <div key={m.mod} className="text-center p-1.5 rounded bg-muted/30 text-[10px]">
                <span className="font-mono font-bold text-foreground">{m.mod}</span>
                <span className="text-muted-foreground block">{m.n} ações</span>
              </div>
            ))}
          </div>
        </div>
      </SectionCollapsible>

      {/* 3. Banco de Dados */}
      <SectionCollapsible
        title="Banco de Dados"
        subtitle="95+ tabelas com RLS em todas, 262+ políticas"
        icon={Database}
        badge="95+ tabelas"
      >
        <div className="space-y-2">
          {[
            { group: "👤 Usuários & Auth", tables: "profiles, user_roles, roles, login_attempts, audit_logs", count: 5 },
            { group: "🔑 Permissões", tables: "permissions, role_permissions, user_permissions_mv", count: 3 },
            { group: "📅 Serviços", tables: "servicos, servicos_detalhes, agendamentos, terapeutas", count: 4 },
            { group: "🛒 Produtos", tables: "produtos, pedidos, pedido_itens, pacotes, pacotes_usuario", count: 5 },
            { group: "💰 Financeiro", tables: "transacoes, indicacoes, vale_presentes, pagamentos_asaas, cupons", count: 5 },
            { group: "🏆 Gamificação", tables: "desafios, desafio_participantes, checkins, conquistas", count: 4 },
            { group: "🩺 Saúde", tables: "protocolos, usuario_protocolos, fichas_acompanhamento, avaliacoes_posturais", count: 4 },
            { group: "🥗 Nutrição", tables: "planos_dieta, diario_alimentar, ficha_nutricional, dietas_conteudo", count: 4 },
            { group: "📚 Educação", tables: "curso_modulos, curso_aulas, curso_progresso", count: 3 },
            { group: "📱 Social", tables: "social_posts, social_posts_config, notificacoes, banners_promocionais", count: 4 },
            { group: "🏢 Corporativo", tables: "empresas_corporativas, colaboradores_empresa, corporativo_*", count: "8+" },
            { group: "📣 Marketing", tables: "campanhas_marketing, google_ads_metrics, landing_config", count: 3 },
            { group: "🤝 Parceiros", tables: "parceiros, parceiro_cupons, parceiro_comissoes, parceiro_faixas_comissao", count: 4 },
          ].map((g) => (
            <div key={g.group} className="p-2.5 rounded-lg bg-muted/30 border border-border/40">
              <div className="flex items-center justify-between mb-0.5">
                <span className="text-xs font-semibold text-foreground">{g.group}</span>
                <Badge variant="outline" className="text-[9px]">{g.count}</Badge>
              </div>
              <p className="text-[10px] text-muted-foreground font-mono leading-relaxed">{g.tables}</p>
            </div>
          ))}
        </div>
        <CodeBlock
          title="Exemplos de Políticas RLS"
          language="sql"
          code={`-- Usuários só veem seus dados
CREATE POLICY "Users see own data"
ON profiles FOR SELECT USING (auth.uid() = id);

-- Admins gerenciam tudo
CREATE POLICY "Admins manage servicos"
ON servicos FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Terapeutas veem agendamentos atribuídos
CREATE POLICY "Terapeutas see appointments"
ON agendamentos FOR SELECT
USING (auth.uid() = user_id OR is_terapeuta(auth.uid()));`}
        />
      </SectionCollapsible>

      {/* 4. Funções SQL & Triggers */}
      <SectionCollapsible
        title="Funções SQL & Triggers"
        subtitle="27+ funções e 17+ triggers automáticos"
        icon={Terminal}
        badge="27+ funções"
      >
        <FeatureGrid items={[
          { icon: CreditCard, title: "credit_cashback_on_order()", desc: "Cashback automático em pedidos com multiplicador de tier" },
          { icon: CreditCard, title: "credit_cashback_on_agendamento()", desc: "Cashback em sessões terapêuticas" },
          { icon: Users, title: "process_referral_on_first_purchase()", desc: "R$10 indicador + R$5 indicado na 1ª compra" },
          { icon: Zap, title: "credit_desafio_reward()", desc: "Creditação automática ao concluir desafios" },
          { icon: MessageSquare, title: "credit_social_post_reward()", desc: "Recompensa por posts aprovados" },
          { icon: Shield, title: "validate_transaction_insert()", desc: "Validação server-side de transações" },
          { icon: Lock, title: "protect_referral_code()", desc: "Impede alteração de código de indicação" },
          { icon: Bell, title: "notificar_novo_agendamento()", desc: "Notificação automática ao agendar" },
        ]} />
        <CodeBlock
          title="Trigger: Cashback automático"
          language="sql"
          code={`CREATE OR REPLACE FUNCTION credit_cashback_on_order()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  total_cashback NUMERIC := 0;
  v_multiplier NUMERIC := 1.0;
BEGIN
  SELECT gt.tier_multiplier INTO v_multiplier
  FROM get_user_tier(NEW.user_id) gt;

  -- Calcula cashback por item com % do produto
  -- Multiplica pelo tier (Bronze 1x, Prata 1.5x, Ouro 2x)
  -- Insere em transacoes com expiração de 90 dias
  RETURN NEW;
END; $$;`}
        />
      </SectionCollapsible>

      {/* 5. Edge Functions */}
      <SectionCollapsible
        title="Edge Functions (Backend)"
        subtitle="24 funções serverless em Deno/TypeScript"
        icon={Server}
        badge="24 funções"
      >
        <div className="space-y-2">
          <p className="text-[11px] font-semibold text-foreground">💳 Pagamentos (Asaas)</p>
          <FeatureGrid items={[
            { icon: CreditCard, title: "asaas-criar-cobranca", desc: "Cria cobranças PIX/boleto via Asaas" },
            { icon: CreditCard, title: "asaas-webhook", desc: "Recebe callbacks de pagamento confirmado" },
            { icon: CreditCard, title: "asaas-status", desc: "Consulta status de pagamentos" },
          ]} />

          <p className="text-[11px] font-semibold text-foreground">💬 Comunicação</p>
          <FeatureGrid items={[
            { icon: MessageSquare, title: "enviar-whatsapp", desc: "Envia mensagens via Z-API" },
            { icon: MessageSquare, title: "whatsapp-webhook", desc: "Recebe mensagens WhatsApp" },
            { icon: Bell, title: "enviar-campanha", desc: "Dispara campanhas de marketing" },
            { icon: Bell, title: "enviar-lembretes", desc: "Lembretes de agendamento" },
            { icon: Bell, title: "lembrete-alongamento", desc: "Notifica pausas posturais" },
            { icon: Bell, title: "notificacoes-inteligentes", desc: "Notificações contextuais IA" },
          ]} />

          <p className="text-[11px] font-semibold text-foreground">🤖 Inteligência Artificial</p>
          <FeatureGrid items={[
            { icon: Bot, title: "chat-assistente", desc: "Assistente IA conversacional 24/7" },
            { icon: Bot, title: "generate-script", desc: "Gera roteiros para Reels/Stories" },
            { icon: Bot, title: "generate-hooks", desc: "Ganchos virais com score de poder" },
            { icon: Bot, title: "generate-ideas", desc: "10 ideias por nicho e funil" },
            { icon: Bot, title: "analyze-viral", desc: "Análise de potencial viral" },
            { icon: Bot, title: "gerar-recomendacoes", desc: "Recomendações personalizadas" },
          ]} />

          <p className="text-[11px] font-semibold text-foreground">⚙️ Infraestrutura</p>
          <FeatureGrid items={[
            { icon: BarChart3, title: "fetch-google-ads", desc: "Coleta métricas Google Ads" },
            { icon: Image, title: "gerar-imagem-servico", desc: "Gera imagens com IA" },
            { icon: Cpu, title: "curso-tts", desc: "Text-to-Speech para cursos" },
            { icon: Zap, title: "processar-expiracoes", desc: "Expira cashback vencido" },
            { icon: Zap, title: "processar-vales-expirados", desc: "Expira vales presente" },
            { icon: Users, title: "transferir-creditos", desc: "Transferência entre usuários" },
            { icon: Shield, title: "check-rate-limit", desc: "Rate limiting de login" },
            { icon: Users, title: "buscar-usuario", desc: "Busca por email/telefone" },
          ]} />
        </div>
      </SectionCollapsible>

      {/* 6. Storage */}
      <SectionCollapsible
        title="Storage (Buckets)"
        subtitle="11 buckets para arquivos e mídia"
        icon={HardDrive}
        badge="11 buckets"
      >
        <div className="grid grid-cols-1 gap-1.5">
          {[
            { name: "avatars", desc: "Fotos de perfil", access: "público" },
            { name: "fotos-evolucao", desc: "Fotos de tratamento", access: "privado (URLs assinadas)" },
            { name: "avaliacoes-posturais", desc: "Fotos posturais", access: "privado" },
            { name: "exercise-videos", desc: "Vídeos de exercícios", access: "público" },
            { name: "social-posts", desc: "Posts Resinkra Moments", access: "privado" },
            { name: "exames-arquivos", desc: "Exames do paciente", access: "privado" },
            { name: "admin-uploads", desc: "Uploads administrativos", access: "público" },
            { name: "corporativo-media", desc: "Mídia corporativa", access: "público" },
            { name: "landing-media", desc: "Mídia da landing page", access: "público" },
            { name: "headspa-imagens", desc: "Imagens head spa", access: "público" },
            { name: "servico-imagens", desc: "Imagens de serviços", access: "público" },
          ].map((b) => (
            <div key={b.name} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/40">
              <HardDrive size={12} className="text-primary shrink-0" />
              <span className="text-[11px] font-mono font-bold text-foreground flex-1">{b.name}</span>
              <span className="text-[10px] text-muted-foreground hidden sm:inline">{b.desc}</span>
              <Badge variant={b.access.includes("privado") ? "destructive" : "secondary"} className="text-[8px]">
                {b.access.includes("privado") ? "🔒" : "🌐"} {b.access.split(" ")[0]}
              </Badge>
            </div>
          ))}
        </div>
      </SectionCollapsible>

      {/* 7. Integrações & APIs */}
      <SectionCollapsible
        title="Integrações & APIs"
        subtitle="Pagamentos, WhatsApp, Google Ads e IA"
        icon={Plug}
        badge="7 secrets"
      >
        <FeatureGrid items={[
          { icon: CreditCard, title: "Asaas (Pagamentos)", desc: "PIX, boleto, cartão. Webhook para confirmação automática" },
          { icon: MessageSquare, title: "Z-API (WhatsApp)", desc: "Envio de mensagens, bot de prospecção regional" },
          { icon: BarChart3, title: "Google Ads", desc: "Coleta automática de métricas de campanhas" },
          { icon: Bot, title: "Lovable AI", desc: "Scripts, hooks, ideias, análise viral" },
          { icon: Bell, title: "Resend (Email)", desc: "Envio transacional de emails" },
          { icon: Cpu, title: "ElevenLabs (TTS)", desc: "Text-to-Speech para aulas de cursos" },
        ]} />
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold text-foreground">🔐 Secrets Configurados:</p>
          <div className="grid grid-cols-1 gap-1">
            {[
              { name: "ASAAS_API_KEY", desc: "Pagamentos" },
              { name: "ASAAS_WEBHOOK_TOKEN", desc: "Webhook" },
              { name: "ZAPI_INSTANCE_ID", desc: "WhatsApp" },
              { name: "ZAPI_TOKEN", desc: "WhatsApp" },
              { name: "RESEND_API_KEY", desc: "Email" },
              { name: "ELEVENLABS_API_KEY", desc: "TTS" },
              { name: "LOVABLE_API_KEY", desc: "IA" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-2 p-1.5 rounded bg-muted/30 text-[10px]">
                <Lock size={10} className="text-green-500 shrink-0" />
                <span className="font-mono font-bold text-foreground">{s.name}</span>
                <span className="text-muted-foreground">— {s.desc}</span>
              </div>
            ))}
          </div>
        </div>
        <CodeBlock
          title="Exemplos de invocação"
          code={`// Enviar WhatsApp
await supabase.functions.invoke('enviar-whatsapp', {
  body: { telefone: '5511999999999', mensagem: 'Olá!' }
});

// Criar cobrança PIX
await supabase.functions.invoke('asaas-criar-cobranca', {
  body: { valor: 150, descricao: 'Sessão', tipo: 'PIX' }
});

// Gerar conteúdo IA
await supabase.functions.invoke('generate-script', {
  body: { topic: 'Benefícios da massagem', brandId: '...' }
});`}
        />
      </SectionCollapsible>

      {/* 8. Snippets de Código */}
      <SectionCollapsible
        title="Snippets de Código"
        subtitle="Exemplos práticos de uso da plataforma"
        icon={Code2}
      >
        <CodeBlock
          title="CRUD com Supabase Client"
          code={`import { supabase } from "@/integrations/supabase/client";

// SELECT
const { data } = await supabase
  .from('produtos').select('*').eq('disponivel', true);

// INSERT
await supabase.from('notificacoes')
  .insert({ user_id, titulo: 'Olá!', mensagem: '...' });

// UPDATE
await supabase.from('pedidos')
  .update({ status: 'entregue' }).eq('id', pedidoId);

// RPC
const { data } = await supabase
  .rpc('has_permission', { 
    p_user_id: userId, p_resource: 'admin', p_action: 'access' 
  });`}
        />
        <CodeBlock
          title="Upload de arquivos"
          code={`// Upload
const { data } = await supabase.storage
  .from('admin-uploads')
  .upload(\`images/\${fileName}\`, file, { upsert: true });

// URL pública
const { data: { publicUrl } } = supabase.storage
  .from('admin-uploads').getPublicUrl(filePath);`}
        />
        <CodeBlock
          title="Realtime (tempo real)"
          code={`const channel = supabase
  .channel('notificacoes')
  .on('postgres_changes', {
    event: 'INSERT', schema: 'public',
    table: 'notificacoes',
    filter: \`user_id=eq.\${userId}\`
  }, (payload) => {
    toast.info(payload.new.titulo);
  })
  .subscribe();`}
        />
      </SectionCollapsible>

      {/* 9. Arquitetura de Segurança */}
      <SectionCollapsible
        title="Arquitetura de Segurança"
        subtitle="5 camadas de proteção enterprise-grade"
        icon={Shield}
        badge="Enterprise"
      >
        <CodeBlock
          title="Camadas de Proteção"
          language="text"
          code={`1. AUTENTICAÇÃO
   → Email/senha com verificação obrigatória
   → Rate limiting (5 tentativas / 15 min)
   → Proteção HIBP (senhas vazadas)

2. AUTORIZAÇÃO (RBAC + Permissões Granulares)
   → user_roles separada (anti-escalação)
   → has_role() + has_permission() SECURITY DEFINER
   → Cache via user_permissions_mv + auto-refresh
   → ProtectedRoute + AdminRoute no frontend

3. ROW LEVEL SECURITY (RLS)
   → 262+ políticas em todas as tabelas
   → Políticas RESTRICTIVE para bloquear anon
   → Admins via has_role(), users via auth.uid()

4. PROTEÇÃO DE DADOS
   → Fotos sensíveis via URLs assinadas (1h)
   → Triggers protegem código de indicação
   → Validação server-side em transações
   → Audit logs em tabelas críticas

5. INTEGRAÇÕES SEGURAS
   → API keys em Secrets (nunca no código)
   → Webhooks com token de validação
   → Edge Functions com CORS configurado`}
        />
      </SectionCollapsible>

      {/* 10. Fluxos de Negócio */}
      <SectionCollapsible
        title="Fluxos de Negócio"
        subtitle="Automações de cashback, indicações e desafios"
        icon={Layers}
      >
        <CodeBlock
          title="Fluxos Automáticos"
          language="text"
          code={`COMPRA/SESSÃO
  └→ Trigger calcula cashback (% do produto)
  └→ Multiplica pelo tier (Bronze 1x, Prata 1.5x, Ouro 2x)
  └→ Insere em transacoes (expira: 90 dias)
  └→ Notificação automática

INDICAÇÃO
  └→ Amigo se cadastra com código
  └→ Amigo faz primeira compra
  └→ R$ 10 ao indicador + R$ 5 ao indicado

DESAFIO CONCLUÍDO
  └→ Trigger credita recompensa
  └→ Notificação de parabéns

CASHBACK EXPIRANDO
  └→ Notifica 7 dias antes
  └→ Debita automaticamente após vencimento`}
        />
      </SectionCollapsible>

      {/* 11. Estrutura dos Cursos — Auditoria de Conteúdo */}
      <SectionCollapsible
        title="Estrutura dos Cursos"
        subtitle="Markdown completo para auditoria de direitos autorais"
        icon={GraduationCap}
      >
        <CourseMarkdownBlock />
      </SectionCollapsible>

      {/* 12. Imagens & Vídeos */}
      <SectionCollapsible
        title="Imagens & Vídeos"
        subtitle="Catálogo completo de mídia estática e dinâmica"
        icon={Image}
        badge="~363 arquivos"
      >
        <MediaMarkdownBlock />
      </SectionCollapsible>

      {/* 13. Documentação por Módulo */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 px-1 pt-4 pb-2">
          <div className="p-2 rounded-xl bg-accent/10">
            <Layers size={18} className="text-accent" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-foreground">Documentação por Módulo</h4>
            <p className="text-[10px] text-muted-foreground">Clique em cada módulo para ver e copiar o markdown específico</p>
          </div>
          <Badge variant="secondary" className="text-[10px] ml-auto">{allDomainMarkdowns.length} módulos</Badge>
        </div>
        {allDomainMarkdowns.map((domain) => (
          <DomainMarkdownSection key={domain.id} domain={domain} />
        ))}
      </div>
    </div>
  );
};
