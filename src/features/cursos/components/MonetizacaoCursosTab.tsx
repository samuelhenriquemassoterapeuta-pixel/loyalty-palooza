import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronDown, DollarSign } from "lucide-react";

interface FerramentaItem {
  icon: string;
  title: string;
  desc: string;
  details: string[];
}

const monetizacaoItems: FerramentaItem[] = [
  { icon: "💰", title: "Tabela de Preços", desc: "17 cursos de R$ 497 a R$ 1.497", details: [
    "Óleos Essenciais (150h) — R$ 1.497 (Premium)",
    "Fitoterapia Clínica (140h) — R$ 1.497 (Premium)",
    "Gastronomia Saudável (130h) — R$ 1.397 (Premium)",
    "Anatomia Humana (130h) — R$ 1.397 (Premium)",
    "Massagem Modeladora (128h) — R$ 1.297 (Premium)",
    "Seitai e New Seitai (125h) — R$ 1.297 (Premium)",
    "Bandagem Elástica (120h) — R$ 1.197 (Premium)",
    "Drenagem Linfática (116h) — R$ 1.097 (Intermediário)",
    "Difusor de Ambientes (105h) — R$ 997 (Intermediário)",
    "Saboaria Artesanal (99h) — R$ 897 (Intermediário)",
    "Velas Aromáticas (98h) — R$ 897 (Intermediário)",
    "Vendas (75h) — R$ 797 (Intermediário)",
    "Alta Perfumaria Natural (70h) — R$ 797 (Intermediário)",
    "Yūgen FaceSPA (70h) — R$ 797 (Intermediário)",
    "Head SPA Coreano (65h) — R$ 797 (Intermediário)",
    "Aromaterapia dōTERRA (58h) — R$ 597 (Essencial)",
    "Método Resinkra (24h) — R$ 497 (Essencial)",
    "Valor total do catálogo: R$ 17.459 · Ticket médio: R$ 1.027",
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

const CollapsibleItem = ({ item }: { item: FerramentaItem }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 p-3 text-left"
      >
        <span className="text-lg">{item.icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground leading-tight">{item.title}</p>
          <p className="text-xs text-muted-foreground">{item.desc}</p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="shrink-0">
          <ChevronDown size={14} className="text-muted-foreground" />
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
            <div className="px-3 pb-3 space-y-1.5">
              {item.details.map((d, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground leading-relaxed">{d}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const MonetizacaoCursosTab = () => {
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <DollarSign className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Monetização de Cursos</h2>
      </div>
      <p className="text-xs text-muted-foreground">
        Preços, projeções financeiras e estratégias de venda para os 17 cursos da plataforma.
      </p>
      <div className="grid grid-cols-1 gap-2">
        {monetizacaoItems.map(item => (
          <CollapsibleItem key={item.title} item={item} />
        ))}
      </div>
    </div>
  );
};
