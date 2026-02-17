import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, DollarSign, Palette, Rocket, Target, Users, Zap, Shield, HeadphonesIcon, TrendingUp, CheckCircle2, Star, Building2, Layers, Monitor, Smartphone } from "lucide-react";

const Section = ({ icon: Icon, title, children, defaultOpen = false }: { icon: any; title: string; children: React.ReactNode; defaultOpen?: boolean }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/30 transition-colors">
        <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon size={18} className="text-primary" />
        </div>
        <span className="flex-1 font-semibold text-foreground">{title}</span>
        <ChevronDown size={18} className={`text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
            <div className="px-5 pb-5 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PricingCard = ({ nome, preco, descricao, features, destaque = false }: { nome: string; preco: string; descricao: string; features: string[]; destaque?: boolean }) => (
  <div className={`rounded-2xl border-2 p-5 space-y-4 ${destaque ? "border-primary bg-primary/5 shadow-lg" : "border-border bg-card"}`}>
    {destaque && <span className="text-[10px] font-bold uppercase tracking-wider bg-primary text-primary-foreground px-2.5 py-1 rounded-full">Mais Popular</span>}
    <h4 className="text-lg font-bold text-foreground">{nome}</h4>
    <p className="text-2xl font-bold text-primary">{preco}</p>
    <p className="text-sm text-muted-foreground">{descricao}</p>
    <ul className="space-y-2">
      {features.map((f, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-foreground">
          <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
          <span>{f}</span>
        </li>
      ))}
    </ul>
  </div>
);

const VendaPlataformaTab = () => {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">Plano de Venda da Plataforma</h2>
        <p className="text-muted-foreground mt-1">Estratégia completa para licenciar a estrutura para outras clínicas</p>
      </div>

      {/* Proposta de Valor */}
      <Section icon={Rocket} title="Proposta de Valor" defaultOpen>
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            A plataforma Resinkra é um ecossistema SaaS completo para clínicas de terapias, estética e bem-estar. Com <strong>91 páginas, ~240 componentes, 96 tabelas e 24 Edge Functions</strong>, ela entrega em semanas o que custaria <strong>R$ 853 mil a R$ 1,21 milhão</strong> em desenvolvimento tradicional.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Páginas", value: "91+" },
              { label: "Componentes", value: "~240" },
              { label: "Tabelas", value: "96+" },
              { label: "Horas de Cursos", value: "1.886h" },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-muted/50">
                <p className="text-lg font-bold text-primary">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Personalização da Identidade Visual */}
      <Section icon={Palette} title="Personalização da Identidade Visual">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Cada clínica recebe uma instância com sua própria identidade visual, incluindo:</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              { icon: Palette, title: "Paleta de Cores", desc: "Troca completa de cores primárias, secundárias e acentos via variáveis CSS (HSL). Modo claro e escuro adaptados." },
              { icon: Star, title: "Logotipo & Ícones", desc: "Substituição de logo, favicon, ícone PWA e splash screens. Suporte a SVG e PNG." },
              { icon: Layers, title: "Tipografia", desc: "Troca de fontes de título (display) e corpo (sans). Google Fonts ou fontes customizadas." },
              { icon: Monitor, title: "Landing Page", desc: "Hero, slogan, textos, imagens e vídeos totalmente editáveis pelo painel CMS sem código." },
              { icon: Smartphone, title: "PWA & App", desc: "Nome do app, ícones, cor de tema e manifest personalizados para instalação mobile." },
              { icon: Building2, title: "Marca White-Label", desc: "Remoção completa de referências à Resinkra. A clínica opera como se fosse sua própria plataforma." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3 p-3 rounded-xl bg-muted/30">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <item.icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <p className="text-sm font-semibold text-primary mb-1">⏱ Tempo estimado de personalização</p>
            <p className="text-xs text-muted-foreground">White-label básico (cores + logo): <strong>2-4 horas</strong> | Completo (tipografia + landing + PWA): <strong>1-2 dias</strong></p>
          </div>
        </div>
      </Section>

      {/* Tabela de Preços */}
      <Section icon={DollarSign} title="Sugestão de Preços (Baseado no Mercado)">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Valores baseados em concorrentes como Clinicorp (R$ 600-1.200/mês), Feegow (R$ 500-900/mês), Doctoralia (R$ 400-800/mês) e soluções White-Label SaaS internacionais.</p>

          <div className="grid gap-4 sm:grid-cols-3">
            <PricingCard
              nome="Essencial"
              preco="R$ 1.497/mês"
              descricao="Para clínicas pequenas (1-3 profissionais)"
              features={[
                "Agendamento online + check-in QR",
                "Loja virtual com cashback (Resinks)",
                "Protocolos e fichas clínicas",
                "Landing page personalizável",
                "App PWA com marca própria",
                "Suporte por email",
              ]}
            />
            <PricingCard
              nome="Profissional"
              preco="R$ 2.997/mês"
              descricao="Para clínicas médias (4-10 profissionais)"
              destaque
              features={[
                "Tudo do Essencial +",
                "IA integrada (scripts, conteúdo, roteiros)",
                "Cursos e certificações (até 5 cursos)",
                "Sistema de indicações e gamificação",
                "Dashboard de terapeutas",
                "Campanhas de marketing automatizadas",
                "Suporte prioritário via WhatsApp",
              ]}
            />
            <PricingCard
              nome="Enterprise"
              preco="R$ 5.997/mês"
              descricao="Para redes e franquias (10+ profissionais)"
              features={[
                "Tudo do Profissional +",
                "Catálogo completo (17 cursos, 1.886h)",
                "Módulo corporativo B2B",
                "Dashboard de RH para empresas parceiras",
                "Google Ads integrado",
                "Relatórios avançados e auditoria",
                "Gerente de conta dedicado",
                "SLA 99.9% com suporte 24/7",
              ]}
            />
          </div>

          <div className="p-4 rounded-xl bg-muted/50 space-y-3">
            <h4 className="font-semibold text-foreground text-sm">💰 Opções de Implantação (Setup Fee)</h4>
            <div className="grid gap-2 sm:grid-cols-3">
              {[
                { plano: "Essencial", setup: "R$ 4.997", desc: "Personalização básica + migração de dados" },
                { plano: "Profissional", setup: "R$ 9.997", desc: "White-label completo + treinamento da equipe" },
                { plano: "Enterprise", setup: "R$ 19.997", desc: "Setup completo + integrações customizadas + consultoria" },
              ].map((s) => (
                <div key={s.plano} className="p-3 rounded-xl bg-card border border-border">
                  <p className="text-xs text-muted-foreground">{s.plano}</p>
                  <p className="text-lg font-bold text-primary">{s.setup}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <h4 className="font-semibold text-primary text-sm mb-2">📊 Comparativo de Mercado</h4>
            <div className="space-y-2">
              {[
                { concorrente: "Clinicorp", preco: "R$ 600-1.200/mês", obs: "Foco odonto, sem IA, sem cursos" },
                { concorrente: "Feegow Clinic", preco: "R$ 500-900/mês", obs: "Médico, sem cashback, sem PWA" },
                { concorrente: "Doctoralia", preco: "R$ 400-800/mês", obs: "Apenas agendamento + marketing básico" },
                { concorrente: "Zenklub (B2B)", preco: "R$ 80-150/colaborador", obs: "Só terapia online, sem loja" },
                { concorrente: "Desenvolvimento custom", preco: "R$ 853K-1,2M (uma vez)", obs: "+ R$ 16-34K/mês manutenção" },
                { concorrente: "Resinkra Platform", preco: "R$ 1.497-5.997/mês", obs: "Ecossistema completo, IA, cursos, cashback, B2B" },
              ].map((c) => (
                <div key={c.concorrente} className="flex items-center gap-3 text-xs">
                  <span className="font-medium text-foreground w-32 shrink-0">{c.concorrente}</span>
                  <span className="font-bold text-primary w-36 shrink-0">{c.preco}</span>
                  <span className="text-muted-foreground">{c.obs}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Modelo de Receita */}
      <Section icon={TrendingUp} title="Projeção de Receita">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Simulação conservadora com crescimento gradual de clientes:</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-muted-foreground font-medium">Período</th>
                  <th className="text-center py-2 text-muted-foreground font-medium">Clientes</th>
                  <th className="text-center py-2 text-muted-foreground font-medium">Ticket Médio</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">MRR</th>
                  <th className="text-right py-2 text-muted-foreground font-medium">ARR</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { periodo: "Mês 6", clientes: "5", ticket: "R$ 2.500", mrr: "R$ 12.500", arr: "R$ 150.000" },
                  { periodo: "Mês 12", clientes: "15", ticket: "R$ 2.800", mrr: "R$ 42.000", arr: "R$ 504.000" },
                  { periodo: "Mês 18", clientes: "30", ticket: "R$ 3.200", mrr: "R$ 96.000", arr: "R$ 1.152.000" },
                  { periodo: "Mês 24", clientes: "50", ticket: "R$ 3.500", mrr: "R$ 175.000", arr: "R$ 2.100.000" },
                ].map((r) => (
                  <tr key={r.periodo} className="border-b border-border/50">
                    <td className="py-2 font-medium text-foreground">{r.periodo}</td>
                    <td className="py-2 text-center text-foreground">{r.clientes}</td>
                    <td className="py-2 text-center text-muted-foreground">{r.ticket}</td>
                    <td className="py-2 text-right font-semibold text-primary">{r.mrr}</td>
                    <td className="py-2 text-right font-bold text-primary">{r.arr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-muted-foreground italic">* Sem contar receita de setup fees (R$ 5K-20K por cliente) e upsells de cursos avulsos</p>
        </div>
      </Section>

      {/* Público-alvo */}
      <Section icon={Target} title="Público-Alvo Ideal">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { titulo: "Clínicas de Estética", desc: "Harmonização, skincare, procedimentos faciais e corporais. Precisam de agendamento, protocolos e fidelização." },
            { titulo: "Clínicas de Terapias Holísticas", desc: "Massoterapia, aromaterapia, acupuntura, reiki. Valorizam cursos e certificações." },
            { titulo: "Spas & Day Spas", desc: "Experiências premium, pacotes, vale-presente. Alto ticket médio." },
            { titulo: "Redes e Franquias", desc: "Múltiplas unidades, padronização de processos, dashboards consolidados." },
            { titulo: "Clínicas de Fisioterapia", desc: "Avaliação postural, protocolos de reabilitação, acompanhamento de evolução." },
            { titulo: "Centros de Bem-Estar Corporativo", desc: "Programas QVT, relatórios para RH, gestão de colaboradores." },
          ].map((p) => (
            <div key={p.titulo} className="p-3 rounded-xl bg-muted/30">
              <p className="text-sm font-semibold text-foreground">{p.titulo}</p>
              <p className="text-xs text-muted-foreground mt-1">{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Estratégia Comercial */}
      <Section icon={Users} title="Estratégia Comercial">
        <div className="space-y-4">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">Funil de Vendas B2B</h4>
            {[
              { etapa: "1. Atração", desc: "Google Ads, LinkedIn Ads, conteúdo educativo sobre gestão de clínicas, SEO para 'sistema para clínica de estética'", cor: "bg-blue-500/10 text-blue-600" },
              { etapa: "2. Demonstração", desc: "Demo ao vivo da plataforma (30min), tour guiado pelas funcionalidades, case Resinkra como prova social", cor: "bg-purple-500/10 text-purple-600" },
              { etapa: "3. Trial", desc: "14 dias grátis com dados de exemplo, onboarding assistido, suporte dedicado durante o trial", cor: "bg-amber-500/10 text-amber-600" },
              { etapa: "4. Conversão", desc: "Proposta personalizada, desconto para pagamento anual (2 meses grátis), bônus de cursos para early adopters", cor: "bg-green-500/10 text-green-600" },
              { etapa: "5. Expansão", desc: "Upsell de cursos individuais, módulo corporativo B2B, integrações premium, consultoria de marketing", cor: "bg-primary/10 text-primary" },
            ].map((e) => (
              <div key={e.etapa} className="flex gap-3 items-start">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${e.cor}`}>{e.etapa.split(".")[0]}.</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{e.etapa.split(". ")[1]}</p>
                  <p className="text-xs text-muted-foreground">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Diferenciais Competitivos */}
      <Section icon={Zap} title="Diferenciais Competitivos">
        <div className="grid gap-2">
          {[
            "IA generativa integrada (scripts, roteiros, conteúdo de marketing) — nenhum concorrente oferece",
            "1.886 horas de cursos com certificação automática — monetização adicional para a clínica",
            "Sistema de cashback gamificado (Resinks) — retenção 3x maior que programas tradicionais",
            "Módulo corporativo B2B pronto — acesso ao mercado de bem-estar empresarial",
            "PWA instalável como app nativo — sem custos de App Store/Google Play",
            "White-label completo — a clínica opera como se fosse sua própria tecnologia",
            "Avaliação postural com anotações visuais — exclusivo no mercado",
            "CMS completo sem código — o cliente gerencia todo o conteúdo sozinho",
          ].map((d, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" />
              <span className="text-foreground">{d}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Suporte e SLA */}
      <Section icon={HeadphonesIcon} title="Suporte & Garantias">
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            { titulo: "Onboarding Assistido", desc: "Treinamento completo da equipe (4-8h), migração de dados, configuração inicial supervisionada." },
            { titulo: "Suporte Técnico", desc: "Essencial: email (48h). Profissional: WhatsApp (8h). Enterprise: dedicado 24/7 + gerente de conta." },
            { titulo: "Atualizações Contínuas", desc: "Novas features, correções de segurança e melhorias de performance incluídas em todos os planos." },
            { titulo: "SLA de Disponibilidade", desc: "99.5% (Essencial), 99.9% (Profissional/Enterprise). Créditos automáticos em caso de downtime." },
          ].map((s) => (
            <div key={s.titulo} className="p-3 rounded-xl bg-muted/30">
              <p className="text-sm font-semibold text-foreground">{s.titulo}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Segurança */}
      <Section icon={Shield} title="Segurança & Compliance">
        <div className="space-y-2">
          {[
            "316 políticas RLS (Row Level Security) — isolamento total de dados entre clínicas",
            "Criptografia AES-256 em repouso + TLS 1.3 em trânsito",
            "Autenticação com email verificado + suporte a 2FA",
            "Audit logs completos de todas as operações administrativas",
            "Backups automáticos diários com retenção de 30 dias",
            "Conformidade com LGPD — gestão de consentimento e direito ao esquecimento",
          ].map((s, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <Shield size={14} className="text-primary shrink-0 mt-0.5" />
              <span className="text-foreground">{s}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

export default VendaPlataformaTab;
