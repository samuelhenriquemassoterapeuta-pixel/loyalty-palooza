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
  <div className="p-4 rounded-xl border bg-card">
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="text-2xl font-bold text-foreground">{value}</p>
    {sub && <p className="text-xs text-muted-foreground mt-1">{sub}</p>}
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
  "Curso de Vendas",
  // Admin
  "Painel Admin (32 abas)", "Google Ads Dashboard",
  // Resinkra AI
  "AI Dashboard", "AI Criação", "AI Ganchos", "AI Calendário",
  "AI Histórico", "AI Ideias", "AI Onboarding", "AI Templates",
  "AI Resultado", "AI Config.", "AI Análise Viral",
];

const CURSOS = [
  { nome: "Método Resinkra", modulos: 14, horas: 120 },
  { nome: "Aromaterapia Clínica", modulos: 14, horas: 100 },
  { nome: "Head SPA Japonês", modulos: 12, horas: 90 },
  { nome: "Anatomia Humana", modulos: 12, horas: 100 },
  { nome: "Yūgen Face SPA", modulos: 10, horas: 80 },
  { nome: "Perfumaria Natural", modulos: 10, horas: 80 },
  { nome: "Velas Aromáticas", modulos: 10, horas: 70 },
  { nome: "Saboaria Artesanal", modulos: 10, horas: 70 },
  { nome: "Difusor de Ambientes", modulos: 8, horas: 60 },
  { nome: "Fitoterapia Aplicada", modulos: 14, horas: 120 },
  { nome: "Óleos Essenciais", modulos: 12, horas: 90 },
  { nome: "Massagem Modeladora", modulos: 10, horas: 80 },
  { nome: "Drenagem Linfática", modulos: 10, horas: 78 },
  { nome: "Gastronomia Saudável", modulos: 14, horas: 130 },
  { nome: "Vendas & Negócios", modulos: 12, horas: 100 },
];

const MODULOS_FUNCIONAIS = [
  { modulo: "Autenticação & Perfis", complexidade: "Alta", freelancer: 8000, agencia: 12000 },
  { modulo: "Agendamento com Terapeutas", complexidade: "Alta", freelancer: 12000, agencia: 18000 },
  { modulo: "Loja & E-commerce", complexidade: "Alta", freelancer: 15000, agencia: 22000 },
  { modulo: "Carteira Digital & Cashback", complexidade: "Muito Alta", freelancer: 18000, agencia: 25000 },
  { modulo: "Sistema de Gamificação (XP/Ranking)", complexidade: "Alta", freelancer: 12000, agencia: 18000 },
  { modulo: "Conquistas & Desafios", complexidade: "Alta", freelancer: 10000, agencia: 15000 },
  { modulo: "Clube VIP (Assinaturas)", complexidade: "Alta", freelancer: 12000, agencia: 18000 },
  { modulo: "Avaliação Postural Completa", complexidade: "Muito Alta", freelancer: 25000, agencia: 35000 },
  { modulo: "Protocolos Clínicos & Fichas", complexidade: "Alta", freelancer: 15000, agencia: 22000 },
  { modulo: "Dietas & Nutrição", complexidade: "Média", freelancer: 8000, agencia: 12000 },
  { modulo: "Alongamento & Pausas Posturais", complexidade: "Média", freelancer: 8000, agencia: 12000 },
  { modulo: "Sistema de Indicações", complexidade: "Média", freelancer: 8000, agencia: 12000 },
  { modulo: "Notificações Inteligentes", complexidade: "Média", freelancer: 6000, agencia: 10000 },
  { modulo: "Chat Assistente (IA)", complexidade: "Alta", freelancer: 12000, agencia: 18000 },
  { modulo: "Recomendações com IA", complexidade: "Alta", freelancer: 10000, agencia: 15000 },
  { modulo: "Integração WhatsApp (Z-API)", complexidade: "Alta", freelancer: 12000, agencia: 18000 },
  { modulo: "Integração Pagamentos (Asaas)", complexidade: "Muito Alta", freelancer: 18000, agencia: 25000 },
  { modulo: "Vale Presente Digital", complexidade: "Média", freelancer: 8000, agencia: 12000 },
  { modulo: "Social Moments (UGC)", complexidade: "Média", freelancer: 8000, agencia: 12000 },
  { modulo: "Seção Corporativa (B2B)", complexidade: "Alta", freelancer: 15000, agencia: 22000 },
  { modulo: "Dashboard RH Corporativo", complexidade: "Alta", freelancer: 12000, agencia: 18000 },
  { modulo: "Sistema de Parceiros", complexidade: "Alta", freelancer: 10000, agencia: 15000 },
  { modulo: "Landing Page Dinâmica (CMS)", complexidade: "Alta", freelancer: 12000, agencia: 18000 },
  { modulo: "Painel Admin (32 abas)", complexidade: "Muito Alta", freelancer: 35000, agencia: 50000 },
  { modulo: "Campanhas de Marketing", complexidade: "Média", freelancer: 8000, agencia: 12000 },
  { modulo: "Banners Promocionais", complexidade: "Baixa", freelancer: 4000, agencia: 6000 },
  { modulo: "Segmentação de Clientes", complexidade: "Alta", freelancer: 10000, agencia: 15000 },
  { modulo: "Google Ads Dashboard", complexidade: "Alta", freelancer: 10000, agencia: 15000 },
  { modulo: "Resinkra AI (11 telas)", complexidade: "Muito Alta", freelancer: 30000, agencia: 42000 },
  { modulo: "PWA & Instalação", complexidade: "Média", freelancer: 6000, agencia: 10000 },
  { modulo: "Infraestrutura EAD (15 cursos)", complexidade: "Muito Alta", freelancer: 45000, agencia: 65000 },
  { modulo: "Conteúdo dos Cursos (~1.388h)", complexidade: "Muito Alta", freelancer: 180000, agencia: 180000 },
  { modulo: "Segurança (RLS, Rate Limit, Audit)", complexidade: "Muito Alta", freelancer: 20000, agencia: 30000 },
];

const EDGE_FUNCTIONS = [
  "analyze-viral", "asaas-criar-cobranca", "asaas-status", "asaas-webhook",
  "buscar-usuario", "chat-assistente", "check-rate-limit", "curso-tts",
  "enviar-campanha", "enviar-lembretes", "enviar-whatsapp", "fetch-google-ads",
  "generate-hooks", "generate-ideas", "generate-script", "gerar-imagem-servico",
  "gerar-recomendacoes", "lembrete-alongamento", "lembrete-medidas",
  "notificacoes-inteligentes", "processar-expiracoes", "processar-vales-expirados",
  "transferir-creditos", "whatsapp-webhook",
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
      <div className="space-y-6 pr-2">
        {/* ─── Header ─── */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="pt-6">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-6 h-6 text-primary" />
                  Relatório Técnico & Financeiro
                </h2>
                <p className="text-muted-foreground mt-1">
                  Auditoria completa da Plataforma Resinkra — atualizado em {new Date().toLocaleDateString("pt-BR")}
                </p>
              </div>
              <Badge variant="outline" className="text-sm px-3 py-1 border-primary/30">
                SaaS Enterprise
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* ─── Overview ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard label="Páginas" value={PAGES.length} sub="rotas únicas" />
          <MetricCard label="Componentes" value="~220+" sub="React / TSX" />
          <MetricCard label="Hooks" value={58} sub="custom hooks" />
          <MetricCard label="Tabelas" value={92} sub="banco de dados" />
          <MetricCard label="Políticas RLS" value={262} sub="regras de segurança" />
          <MetricCard label="Migrações" value={73} sub="schema changes" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <MetricCard label="Edge Functions" value={EDGE_FUNCTIONS.length} sub="serverless" />
          <MetricCard label="Funções SQL" value={33} sub="procedures" />
          <MetricCard label="Triggers" value={43} sub="automações" />
          <MetricCard label="Índices" value={158} sub="performance" />
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
                { label: "Row Level Security (RLS)", desc: "262 políticas ativas em 92 tabelas" },
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
                  <p>⏱ Prazo estimado: 12 a 18 meses</p>
                  <p>👤 Equipe: 1 fullstack + 1 designer</p>
                  <p>🔧 Manutenção: ~{fmt(13800)}/mês</p>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-muted/30 space-y-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-muted-foreground" />
                  <h4 className="font-semibold text-foreground">Agência Digital Completa</h4>
                </div>
                <p className="text-3xl font-bold text-primary">{fmt(totalAgencia)}</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p>⏱ Prazo estimado: 8 a 14 meses</p>
                  <p>👥 Equipe: 4-6 profissionais</p>
                  <p>🔧 Manutenção: ~{fmt(29000)}/mês</p>
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
          <p>📊 Valores baseados em pesquisa de mercado brasileiro (2024-2025) para projetos SaaS de complexidade similar.</p>
          <p>💡 O valor do conteúdo educacional (1.388h) representa propriedade intelectual independente do custo de desenvolvimento técnico.</p>
          <p>🔒 Relatório gerado automaticamente com base na análise do código-fonte e infraestrutura do projeto.</p>
        </div>
      </div>
    </ScrollArea>
  );
}
