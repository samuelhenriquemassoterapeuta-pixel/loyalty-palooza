import { motion } from "framer-motion";
import { Check, Star, Zap, Crown, Clock, Users, FileText, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

const planos = [
  {
    nome: "Pontual",
    subtitulo: "Eventos e datas especiais",
    icon: Zap,
    preco: "Sob consulta",
    periodo: "por evento",
    destaque: false,
    descricao: "Ideal para SIPATs, convenções, confraternizações e eventos corporativos pontuais.",
    beneficios: [
      "Sessões de quick massage (15-20 min)",
      "1 a 5 profissionais por evento",
      "Equipamentos inclusos (cadeira ergonômica)",
      "Atendimento em qualquer localidade",
      "Relatório pós-evento com métricas",
      "Personalização por tipo de evento",
    ],
    ideal: "SIPATs, feiras, lançamentos, festas corporativas",
    inclusos: [
      { icon: Clock, label: "Sessões de 15-20 min" },
      { icon: Users, label: "1-5 profissionais" },
      { icon: FileText, label: "Relatório pós-evento" },
    ],
    comoFunciona: "Agende com até 7 dias de antecedência. Nossa equipe chega 30 minutos antes para montagem. Ao final, você recebe um relatório com número de atendimentos e feedback dos participantes.",
  },
  {
    nome: "Trimestral",
    subtitulo: "Programa recorrente",
    icon: Star,
    preco: "A partir de R$ 2.500",
    periodo: "/mês",
    destaque: true,
    descricao: "Programa contínuo com visitas semanais. Mais popular entre empresas de médio porte.",
    beneficios: [
      "Tudo do plano Pontual",
      "4 visitas mensais (1x por semana)",
      "Profissional dedicado à empresa",
      "Agenda online para colaboradores",
      "Relatórios mensais de adesão",
      "Palestra mensal sobre saúde",
      "10% de desconto em produtos Resinkra",
      "Renovação trimestral flexível",
    ],
    ideal: "Escritórios com 50-200 colaboradores",
    inclusos: [
      { icon: Clock, label: "4 visitas/mês" },
      { icon: Users, label: "Profissional dedicado" },
      { icon: Headphones, label: "Suporte prioritário" },
    ],
    comoFunciona: "Após assinatura, designamos um profissional exclusivo para sua empresa. Os colaboradores agendam pelo link personalizado. Todo mês você recebe um dashboard com adesão, satisfação e recomendações.",
  },
  {
    nome: "Anual",
    subtitulo: "Programa completo de QVT",
    icon: Crown,
    preco: "A partir de R$ 1.900",
    periodo: "/mês",
    destaque: false,
    descricao: "Programa integrado de Qualidade de Vida no Trabalho com desconto significativo no compromisso anual.",
    beneficios: [
      "Tudo do plano Trimestral",
      "8 visitas mensais (2x por semana)",
      "Equipe de 2+ profissionais",
      "Programa de ergonomia personalizado",
      "Avaliação postural dos colaboradores",
      "Dashboard com métricas de bem-estar",
      "20% de desconto em produtos Resinkra",
      "Prioridade em eventos e datas especiais",
      "Contrato com SLA garantido",
    ],
    ideal: "Empresas com 200+ colaboradores",
    inclusos: [
      { icon: Clock, label: "8 visitas/mês" },
      { icon: Users, label: "Equipe 2+ profissionais" },
      { icon: FileText, label: "Dashboard + avaliação postural" },
    ],
    comoFunciona: "Iniciamos com uma avaliação ergonômica do ambiente de trabalho. Criamos um programa personalizado com cronograma semestral, metas de adesão e indicadores de saúde. Reuniões trimestrais de alinhamento com o RH.",
  },
];

export const CorpPlanosSection = () => {
  const scrollToContato = () => {
    document.querySelector("#orcamento-corporativo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
      {planos.map((plano, index) => (
        <motion.div
          key={plano.nome}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className={`relative rounded-3xl p-6 lg:p-8 ${
            plano.destaque
              ? "bg-primary text-primary-foreground shadow-glow ring-2 ring-primary/20 lg:scale-105"
              : "card-organic"
          }`}
        >
          {plano.destaque && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground text-xs font-bold px-4 py-1 rounded-full shadow-accent">
              Mais popular
            </span>
          )}

          <div className="flex items-center gap-3 mb-4">
            <div className={`p-2.5 rounded-xl ${
              plano.destaque ? "bg-primary-foreground/15" : "bg-primary/10"
            }`}>
              <plano.icon size={20} className={plano.destaque ? "text-primary-foreground" : "text-primary"} />
            </div>
            <div>
              <h3 className="font-bold text-lg">{plano.nome}</h3>
              <p className={`text-xs ${plano.destaque ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                {plano.subtitulo}
              </p>
            </div>
          </div>

          <div className="mb-4">
            <span className="text-2xl font-bold">{plano.preco}</span>
            <span className={`text-sm ${plano.destaque ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
              {plano.periodo}
            </span>
          </div>

          <p className={`text-sm mb-4 leading-relaxed ${
            plano.destaque ? "text-primary-foreground/80" : "text-muted-foreground"
          }`}>
            {plano.descricao}
          </p>

          {/* Inclusos visual */}
          <div className={`grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl ${
            plano.destaque ? "bg-primary-foreground/10" : "bg-muted/50"
          }`}>
            {plano.inclusos.map((item) => (
              <div key={item.label} className="text-center">
                <item.icon size={14} className={`mx-auto mb-1 ${plano.destaque ? "text-primary-foreground/80" : "text-primary"}`} />
                <p className={`text-[10px] leading-tight ${plano.destaque ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <ul className="space-y-2.5 mb-4">
            {plano.beneficios.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm">
                <Check size={16} className={`shrink-0 mt-0.5 ${
                  plano.destaque ? "text-primary-foreground" : "text-primary"
                }`} />
                <span className={plano.destaque ? "text-primary-foreground/90" : "text-foreground"}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          {/* Como funciona */}
          <div className={`text-xs mb-4 p-3 rounded-xl ${
            plano.destaque 
              ? "bg-primary-foreground/10 text-primary-foreground/70" 
              : "bg-muted text-muted-foreground"
          }`}>
            <strong className={plano.destaque ? "text-primary-foreground/90" : "text-foreground"}>Como funciona:</strong>
            <p className="mt-1 leading-relaxed">{plano.comoFunciona}</p>
          </div>

          <div className={`text-xs mb-6 p-3 rounded-xl ${
            plano.destaque 
              ? "bg-primary-foreground/10 text-primary-foreground/70" 
              : "bg-muted text-muted-foreground"
          }`}>
            <strong>Ideal para:</strong> {plano.ideal}
          </div>

          <Button
            onClick={scrollToContato}
            variant={plano.destaque ? "secondary" : "default"}
            className="w-full"
            size="lg"
          >
            Solicitar orçamento
          </Button>
        </motion.div>
      ))}
    </div>
  );
};
