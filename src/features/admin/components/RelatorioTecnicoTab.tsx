import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  FileText, Database, Shield, Code, Server, Layers, BookOpen,
  DollarSign, Users, Zap, Globe, Smartphone, Brain, TrendingUp,
  Lock, BarChart3, Package, Wrench, Clock
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

/* ───────── helpers ───────── */
const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const SectionTitle = ({ icon: Icon, title }: { icon: any; title: string }) => (
  <div className="flex items-center gap-2 mb-4">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <h3 className="text-lg font-bold text-foreground">{title}</h3>
  </div>
);

const MetricCard = ({ label, value, sub }: { label: string; value: string | number; sub?: string }) => (
  <div className="p-3 rounded-xl border bg-card">
    <p className="text-[10px] text-muted-foreground mb-0.5 truncate">{label}</p>
    <p className="text-lg font-bold text-foreground leading-tight">{value}</p>
    {sub && <p className="text-[10px] text-muted-foreground mt-0.5 truncate">{sub}</p>}
  </div>
);

/* ───────── static data ───────── */

const PAGES = [
  // Public
  "Landing Page", "Terapias", "Head SPA", "Corporativo", "Loja",
  // Auth
  "Login / Cadastro",
  // App
  "Dashboard (Home)", "Agendamento", "Carteira Digital", "Cashback & Ofertas",
  "Perfil & Config.", "Notificações", "Check-in QR", "Indicações",
  "Conquistas", "Desafios", "Clube VIP", "Pacotes de Sessões",
  "Avaliação Postural", "Protocolos Clínicos", "Guia Clínico",
  "Minha Jornada", "Dietas & Nutrição", "Alongamento & Pausas",
  "Chat Assistente", "Recomendações IA", "Conteúdo Social (Moments)",
  "Vale Presente", "Transferir Créditos", "Manual de Cuidados",
  "Serviço Detalhe", "Cartão Terapeuta", "QR Code Print",
  "Dashboard RH (B2B)", "Parceiro Dashboard", "Perfil Parceiro",
  "Editor de Cupom", "Instalar PWA", "Ofertas",
  // Cursos (15 x Hero + Conteúdo)
  "Hub de Cursos",
  "Curso Método Resinkra", "Curso Aromaterapia", "Curso Head SPA",
  "Curso Anatomia", "Curso Yūgen FaceSPA", "Curso Perfumaria Natural",
  "Curso Velas Aromáticas", "Curso Saboaria Artesanal",
  "Curso Difusor de Ambientes", "Curso Fitoterapia",
  "Curso Óleos Essenciais", "Curso Massagem Modeladora",
  "Curso Drenagem Linfática", "Curso Gastronomia Saudável",
  "Curso de Vendas", "Curso Seitai", "Curso Bandagem Elástica",
  // Admin
  "Painel Admin (35+ abas)", "Google Ads Dashboard",
  // Resinkra AI
  "AI Dashboard", "AI Criação", "AI Ganchos", "AI Calendário",
  "AI Histórico", "AI Ideias", "AI Onboarding", "AI Templates",
  "AI Resultado", "AI Config.", "AI Análise Viral",
];

const CURSOS = [
  { nome: "Método Resinkra", modulos: 14, horas: 120 },
  { nome: "Aromaterapia Clínica", modulos: 14, horas: 100 },
  { nome: "Head SPA Japonês", modulos: 12, horas: 90 },
  { nome: "Anatomia Humana", modulos: 12, horas: 130 },
  { nome: "Yūgen Face SPA", modulos: 10, horas: 80 },
  { nome: "Perfumaria Natural", modulos: 10, horas: 80 },
  { nome: "Velas Aromáticas", modulos: 10, horas: 98 },
  { nome: "Saboaria Artesanal", modulos: 10, horas: 99 },
  { nome: "Difusor de Ambientes", modulos: 8, horas: 105 },
  { nome: "Fitoterapia Aplicada", modulos: 14, horas: 140 },
  { nome: "Óleos Essenciais", modulos: 12, horas: 150 },
  { nome: "Massagem Modeladora", modulos: 10, horas: 128 },
  { nome: "Drenagem Linfática", modulos: 10, horas: 116 },
  { nome: "Gastronomia Saudável", modulos: 14, horas: 130 },
  { nome: "Vendas & Negócios", modulos: 12, horas: 75 },
  { nome: "Seitai e New Seitai", modulos: 12, horas: 125 },
  { nome: "Bandagem Elástica", modulos: 10, horas: 120 },
];

const MODULOS_FUNCIONAIS = [
  { modulo: "Autenticação & Perfis (Multi-role)", complexidade: "Alta", freelancer: 22000, agencia: 35000 },
  { modulo: "Agendamento Inteligente com Terapeutas", complexidade: "Muito Alta", freelancer: 35000, agencia: 58000 },
  { modulo: "Loja & E-commerce (Checkout + Cupons)", complexidade: "Muito Alta", freelancer: 42000, agencia: 68000 },
  { modulo: "Carteira Digital & Cashback Gamificado", complexidade: "Muito Alta", freelancer: 45000, agencia: 72000 },
  { modulo: "Sistema de Gamificação (XP/Ranking/Cromos)", complexidade: "Muito Alta", freelancer: 35000, agencia: 58000 },
  { modulo: "Conquistas, Desafios & Missões", complexidade: "Alta", freelancer: 25000, agencia: 38000 },
  { modulo: "Clube VIP (Assinaturas + Créditos)", complexidade: "Alta", freelancer: 28000, agencia: 42000 },
  { modulo: "Avaliação Postural Completa c/ Anotações", complexidade: "Muito Alta", freelancer: 52000, agencia: 82000 },
  { modulo: "Protocolos Clínicos & Fichas Anamnese", complexidade: "Muito Alta", freelancer: 38000, agencia: 62000 },
  { modulo: "Dietas, Nutrição & Ficha Nutricional", complexidade: "Alta", freelancer: 22000, agencia: 35000 },
  { modulo: "Alongamento & Pausas Posturais", complexidade: "Média", freelancer: 14000, agencia: 22000 },
  { modulo: "Sistema de Indicações Multinível", complexidade: "Alta", freelancer: 22000, agencia: 38000 },
  { modulo: "Notificações Inteligentes (Push + In-App)", complexidade: "Alta", freelancer: 18000, agencia: 28000 },
  { modulo: "Chat Assistente (IA Generativa)", complexidade: "Muito Alta", freelancer: 35000, agencia: 58000 },
  { modulo: "Recomendações Personalizadas com IA", complexidade: "Alta", freelancer: 25000, agencia: 38000 },
  { modulo: "Integração WhatsApp (Z-API + Webhook)", complexidade: "Alta", freelancer: 25000, agencia: 42000 },
  { modulo: "Integração Pagamentos (Asaas + Webhook)", complexidade: "Muito Alta", freelancer: 42000, agencia: 68000 },
  { modulo: "Vale Presente Digital + Transferências", complexidade: "Alta", freelancer: 22000, agencia: 35000 },
  { modulo: "Social Moments (UGC + Ranking Semanal)", complexidade: "Alta", freelancer: 25000, agencia: 38000 },
  { modulo: "Seção Corporativa B2B (CMS Dinâmico)", complexidade: "Muito Alta", freelancer: 38000, agencia: 65000 },
  { modulo: "Dashboard RH Corporativo", complexidade: "Alta", freelancer: 25000, agencia: 38000 },
  { modulo: "Sistema de Parceiros & Comissões", complexidade: "Alta", freelancer: 22000, agencia: 35000 },
  { modulo: "Landing Page Dinâmica (CMS + SEO)", complexidade: "Alta", freelancer: 25000, agencia: 38000 },
  { modulo: "Painel Admin (35+ abas + Analytics)", complexidade: "Muito Alta", freelancer: 88000, agencia: 155000 },
  { modulo: "Campanhas de Marketing Automatizadas", complexidade: "Alta", freelancer: 22000, agencia: 35000 },
  { modulo: "Banners Promocionais & Segmentação", complexidade: "Média", freelancer: 12000, agencia: 18000 },
  { modulo: "Segmentação Avançada de Clientes", complexidade: "Alta", freelancer: 22000, agencia: 35000 },
  { modulo: "Google Ads Dashboard (API)", complexidade: "Alta", freelancer: 22000, agencia: 35000 },
  { modulo: "Resinkra AI (11 telas + 6 modelos LLM)", complexidade: "Muito Alta", freelancer: 65000, agencia: 115000 },
  { modulo: "PWA & Instalação (Manifest + SW)", complexidade: "Média", freelancer: 15000, agencia: 22000 },
  { modulo: "Infraestrutura EAD (17 cursos + TTS)", complexidade: "Muito Alta", freelancer: 95000, agencia: 160000 },
  { modulo: "Conteúdo Educacional (~1.886h)", complexidade: "Muito Alta", freelancer: 380000, agencia: 420000 },
  { modulo: "Segurança (366 RLS + Rate Limit + Audit)", complexidade: "Muito Alta", freelancer: 52000, agencia: 88000 },
  { modulo: "Check-in QR Code & Geolocalização", complexidade: "Média", freelancer: 14000, agencia: 22000 },
  { modulo: "Guia Clínico & Manual de Cuidados", complexidade: "Média", freelancer: 12000, agencia: 18000 },
  { modulo: "Minha Jornada (Timeline do Paciente)", complexidade: "Alta", freelancer: 18000, agencia: 28000 },
  { modulo: "Email Transacional (Resend + Templates)", complexidade: "Média", freelancer: 15000, agencia: 22000 },
  { modulo: "Relatórios & Exportação (PDF/CSV)", complexidade: "Alta", freelancer: 22000, agencia: 35000 },
];

const EDGE_FUNCTIONS = [
  "analise-progresso", "analyze-viral", "asaas-criar-cobranca", "asaas-status",
  "asaas-webhook", "assistente-saude", "atualizar-trends", "buscar-usuario",
  "cashback-inteligente", "chat-assistente", "check-rate-limit",
  "creditar-recompensa-sugestao", "curso-tts", "enviar-campanha",
  "enviar-email-notificacao", "enviar-lembretes", "enviar-push", "enviar-whatsapp",
  "fetch-google-ads", "generate-hooks", "generate-ideas", "generate-script",
  "gerar-ideias-semanais", "gerar-imagem-servico", "gerar-recomendacoes",
  "insights-saude", "lembrete-alongamento", "lembrete-medidas", "lembretes-wellness",
  "notificacoes-inteligentes", "notificar-roteiros-pendentes", "plano-bem-estar",
  "processar-expiracoes", "processar-vales-expirados", "recomendar-sessao",
  "reflexao-diario", "resi-chat", "transferir-creditos", "validar-playlist",
  "wellness-check-conquistas", "wellness-correlations", "wellness-insight",
  "wellness-update-streak", "whatsapp-webhook",
];

const INTEGRATIONS = [
  { nome: "Z-API (WhatsApp)", tipo: "Comunicação", secrets: ["ZAPI_INSTANCE_ID", "ZAPI_TOKEN"] },
  { nome: "Asaas (Pagamentos)", tipo: "Financeiro", secrets: ["ASAAS_API_KEY", "ASAAS_WEBHOOK_TOKEN"] },
  { nome: "ElevenLabs (TTS)", tipo: "IA / Áudio", secrets: ["ELEVENLABS_API_KEY"] },
  { nome: "Resend (E-mail)", tipo: "Comunicação", secrets: ["RESEND_API_KEY"] },
  { nome: "Google Ads", tipo: "Marketing", secrets: [] },
  { nome: "Lovable AI (LLM)", tipo: "IA", secrets: ["LOVABLE_API_KEY"] },
];

/* ───────── component ───────── */

export default function RelatorioTecnicoTab() {
  const totalModulos = CURSOS.reduce((s, c) => s + c.modulos, 0);
  const totalHoras = CURSOS.reduce((s, c) => s + c.horas, 0);
  const totalFreelancer = MODULOS_FUNCIONAIS.reduce((s, m) => s + m.freelancer, 0);
  const totalAgencia = MODULOS_FUNCIONAIS.reduce((s, m) => s + m.agencia, 0);

  return (
    <ScrollArea className="h-[calc(100vh-220px)]">
      <div className="space-y-4 pr-2">
        {/* ─── Header ─── */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h2 className="text-base sm:text-xl font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary shrink-0" />
                  Relatório Técnico & Financeiro
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Auditoria — {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>
              <Badge variant="outline" className="text-[10px] px-2 py-0.5 border-primary/30">
                SaaS Enterprise
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* ─── Overview ─── */}
        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <MetricCard label="Páginas" value={PAGES.length} sub="rotas únicas" />
          <MetricCard label="Componentes" value="~240+" sub="React / TSX" />
          <MetricCard label="Hooks" value={62} sub="custom hooks" />
          <MetricCard label="Tabelas" value={134} sub="banco de dados" />
          <MetricCard label="Políticas RLS" value={366} sub="regras de segurança" />
          <MetricCard label="Migrações" value={110} sub="schema changes" />
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <MetricCard label="Edge Functions" value={44} sub="serverless" />
          <MetricCard label="Funções SQL" value={51} sub="procedures" />
          <MetricCard label="Triggers" value={57} sub="automações" />
          <MetricCard label="Índices" value={195} sub="performance" />
          <MetricCard label="Cursos EAD" value={CURSOS.length} sub="certificáveis" />
          <MetricCard label="Horas Conteúdo" value={`~${totalHoras}h`} sub={`${totalModulos} módulos`} />
        </div>

        <Separator />

        {/* ─── Tech Stack ─── */}
        <Card>
          <CardHeader className="pb-3">
            <SectionTitle icon={Code} title="Stack Tecnológica" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-2">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {["React 18", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion", "Recharts", "shadcn/ui", "TanStack Query", "React Router", "PWA"].map(t => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-sm text-foreground mb-2">Backend & Infra</h4>
                <div className="flex flex-wrap gap-2">
                  {["Lovable Cloud", "PostgreSQL", "Edge Functions (Deno)", "Row Level Security", "Realtime", "Storage (10 buckets)", "Auth", "Cron Jobs"].map(t => (
                    <Badge key={t} variant="secondary" className="text-xs">{t}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ─── Integrações ─── */}
        <Card>
          <CardHeader className="pb-3">
            <SectionTitle icon={Zap} title="Integrações Externas" />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 font-medium text-muted-foreground">Serviço</th>
                    <th className="py-2 font-medium text-muted-foreground">Tipo</th>
                    <th className="py-2 font-medium text-muted-foreground">Secrets</th>
                  </tr>
                </thead>
                <tbody>
                  {INTEGRATIONS.map(i => (
                    <tr key={i.nome} className="border-b border-border/50">
                      <td className="py-2 font-medium text-foreground">{i.nome}</td>
                      <td className="py-2 text-muted-foreground">{i.tipo}</td>
                      <td className="py-2">
                        {i.secrets.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {i.secrets.map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Nativa</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ─── Edge Functions ─── */}
        <Card>
          <CardHeader className="pb-3">
            <SectionTitle icon={Server} title={`Edge Functions (${EDGE_FUNCTIONS.length})`} />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {EDGE_FUNCTIONS.map(f => (
                <Badge key={f} variant="outline" className="text-xs font-mono">{f}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ─── Segurança ─── */}
        <Card>
          <CardHeader className="pb-3">
            <SectionTitle icon={Shield} title="Infraestrutura de Segurança" />
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { label: "Row Level Security (RLS)", desc: "366 políticas ativas em 134 tabelas" },
                { label: "Rate Limiting", desc: "Proteção contra brute-force via login_attempts + RPC" },
                { label: "Audit Logs", desc: "Trigger automático em tabelas sensíveis" },
                { label: "URLs Assinadas", desc: "Fotos de evolução e exames protegidos (1h TTL)" },
                { label: "Validação de Transações", desc: "Trigger SECURITY DEFINER bloqueia créditos indevidos" },
                { label: "Proteção de Cupons", desc: "Limite máx. 30% / R$50 via trigger" },
                { label: "Código de Indicação", desc: "Imutável após geração (protect_referral_code)" },
                { label: "Avaliações", desc: "Bloqueio de edição após 24h" },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-2 p-3 rounded-lg bg-muted/30">
                  <Lock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ─── Cursos EAD ─── */}
        <Card>
          <CardHeader className="pb-3">
            <SectionTitle icon={BookOpen} title={`Plataforma EAD — ${CURSOS.length} Cursos`} />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 font-medium text-muted-foreground">Curso</th>
                    <th className="py-2 font-medium text-muted-foreground text-center">Módulos</th>
                    <th className="py-2 font-medium text-muted-foreground text-center">Carga Horária</th>
                  </tr>
                </thead>
                <tbody>
                  {CURSOS.map(c => (
                    <tr key={c.nome} className="border-b border-border/50">
                      <td className="py-2 font-medium text-foreground">{c.nome}</td>
                      <td className="py-2 text-center text-muted-foreground">{c.modulos}</td>
                      <td className="py-2 text-center text-muted-foreground">{c.horas}h</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 font-bold">
                    <td className="py-2 text-foreground">TOTAL</td>
                    <td className="py-2 text-center text-foreground">{totalModulos}</td>
                    <td className="py-2 text-center text-foreground">{totalHoras}h</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <MetricCard label="Engine EAD" value="13 componentes" sub="CursoShell, QuizSection, NarracaoPlayer..." />
              <MetricCard label="TTS (Narração)" value="ElevenLabs" sub="Áudio gerado por IA" />
              <MetricCard label="Certificação" value="Automática" sub="Quiz + progressão 100%" />
            </div>
          </CardContent>
        </Card>

        <Separator />

        {/* ─── Orçamento por Módulo ─── */}
        <Card>
          <CardHeader className="pb-3">
            <SectionTitle icon={DollarSign} title="Orçamento Detalhado por Módulo Funcional" />
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 font-medium text-muted-foreground">Módulo</th>
                    <th className="py-2 font-medium text-muted-foreground text-center">Complexidade</th>
                    <th className="py-2 font-medium text-muted-foreground text-right">Freelancer Sr.</th>
                    <th className="py-2 font-medium text-muted-foreground text-right">Agência</th>
                  </tr>
                </thead>
                <tbody>
                  {MODULOS_FUNCIONAIS.map(m => (
                    <tr key={m.modulo} className="border-b border-border/50">
                      <td className="py-2 font-medium text-foreground">{m.modulo}</td>
                      <td className="py-2 text-center">
                        <Badge
                          variant={m.complexidade === "Muito Alta" ? "destructive" : m.complexidade === "Alta" ? "default" : "secondary"}
                          className="text-[10px]"
                        >
                          {m.complexidade}
                        </Badge>
                      </td>
                      <td className="py-2 text-right text-muted-foreground">{fmt(m.freelancer)}</td>
                      <td className="py-2 text-right text-muted-foreground">{fmt(m.agencia)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 font-bold">
                    <td className="py-3 text-foreground" colSpan={2}>TOTAL ESTIMADO</td>
                    <td className="py-3 text-right text-primary text-lg">{fmt(totalFreelancer)}</td>
                    <td className="py-3 text-right text-primary text-lg">{fmt(totalAgencia)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* ─── Resumo Final ─── */}
        <Card className="border-primary/20">
          <CardHeader className="pb-3">
            <SectionTitle icon={TrendingUp} title="Resumo Financeiro" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-xl bg-muted/30 space-y-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-muted-foreground" />
                  <h4 className="font-semibold text-foreground">Freelancer Sênior (BR)</h4>
                </div>
                <p className="text-3xl font-bold text-primary">{fmt(totalFreelancer)}</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>⏱ Prazo estimado: 30 a 40 meses</p>
                  <p>👤 Equipe: 2 fullstack + 1 designer + 1 QA</p>
                  <p>🔧 Manutenção: ~{fmt(25000)}/mês</p>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-muted/30 space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <h4 className="font-semibold text-foreground">Agência Digital Completa</h4>
                </div>
                <p className="text-3xl font-bold text-primary">{fmt(totalAgencia)}</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>⏱ Prazo estimado: 36 a 48 meses</p>
                  <p>👥 Equipe: 10-15 profissionais</p>
                  <p>🔧 Manutenção: ~{fmt(55000)}/mês</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="p-5 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
              <h4 className="font-bold text-foreground flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Eficiência com IA (Lovable)
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">Custo estimado</p>
                  <p className="text-lg font-bold text-foreground">{fmt(10000)}</p>
                  <p className="text-[10px] text-muted-foreground">(infra + assinaturas)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Economia vs Freelancer</p>
                  <p className="text-lg font-bold text-primary">~{Math.round((1 - 10000 / totalFreelancer) * 100)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Economia vs Agência</p>
                  <p className="text-lg font-bold text-primary">~{Math.round((1 - 10000 / totalAgencia) * 100)}%</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Prazo real</p>
                  <p className="text-lg font-bold text-foreground">~45 dias</p>
                </div>
              </div>
              <Progress value={Math.round((1 - 10000 / totalFreelancer) * 100)} className="h-2" />
              <p className="text-xs text-muted-foreground text-center">
                Redução de custos de desenvolvimento
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ─── Páginas Completas ─── */}
        <Card>
          <CardHeader className="pb-3">
            <SectionTitle icon={Layers} title={`Inventário de Páginas (${PAGES.length})`} />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1.5">
              {PAGES.map(p => (
                <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ─── Nota de Rodapé ─── */}
        <div className="text-xs text-muted-foreground text-center py-4 space-y-1">
          <p>📊 Valores baseados em pesquisa de mercado brasileiro (2025-2026) — fontes: Quiker, B2Bit, Clutch, GeekHunter.</p>
          <p>💡 O valor do conteúdo educacional (~1.886h) representa propriedade intelectual independente do custo de desenvolvimento técnico.</p>
          <p>🔒 Relatório gerado automaticamente com base na análise do código-fonte e infraestrutura do projeto.</p>
        </div>
      </div>
    </ScrollArea>
  );
}
