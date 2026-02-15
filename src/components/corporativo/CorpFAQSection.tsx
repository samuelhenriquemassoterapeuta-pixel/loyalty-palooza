import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    pergunta: "Como funciona a massoterapia corporativa?",
    resposta: "Levamos cadeiras ergonômicas e profissionais certificados até sua empresa. As sessões de quick massage duram de 15 a 20 minutos por colaborador, sem necessidade de deslocamento da equipe.",
    detalhes: [
      "Cada profissional atende de 16 a 20 pessoas por período de 4 horas",
      "Equipamentos inclusos: cadeira ergonômica, lençóis descartáveis, álcool em gel e música ambiente",
      "Espaço necessário: apenas 2x2 metros por cadeira",
      "Técnicas utilizadas: quick massage, shiatsu adaptado e reflexologia",
    ],
  },
  {
    pergunta: "Qual o investimento mínimo?",
    resposta: "Para eventos pontuais, o valor é sob consulta e depende do número de profissionais e duração. Para programas recorrentes, os planos começam a partir de R$ 1.900/mês com contrato anual.",
    detalhes: [
      "Evento pontual (SIPAT, festa): a partir de R$ 800 por profissional/dia",
      "Plano trimestral: a partir de R$ 2.500/mês (4 visitas mensais)",
      "Plano anual: a partir de R$ 1.900/mês (8 visitas mensais)",
      "ROI médio: R$ 3 para cada R$ 1 investido em redução de absenteísmo",
    ],
  },
  {
    pergunta: "Vocês atendem em todo o Brasil?",
    resposta: "Atualmente atendemos em São Paulo capital e região metropolitana. Para eventos em outras cidades, consulte disponibilidade e condições especiais.",
    detalhes: [
      "Cobertura principal: São Paulo capital, ABC, Osasco, Guarulhos, Campinas",
      "Eventos especiais: atendemos em todo o estado de SP com taxa de deslocamento",
      "Outras capitais: consulte disponibilidade via parceiros certificados",
    ],
  },
  {
    pergunta: "É necessário espaço dedicado na empresa?",
    resposta: "Não! Precisamos apenas de um espaço de 2x2 metros por cadeira. Levamos tudo: cadeiras, toalhas descartáveis, lençóis e música ambiente. Adaptamos qualquer ambiente.",
    detalhes: [
      "Sala de reunião, hall de entrada ou área de convivência são ideais",
      "Temperatura agradável e iluminação suave são recomendados",
      "Tomada elétrica próxima para som ambiente",
      "Montagem e desmontagem em 15 minutos, sem interferir na rotina",
    ],
  },
  {
    pergunta: "Quantos colaboradores podem ser atendidos por dia?",
    resposta: "Cada profissional atende entre 16 e 20 colaboradores por período (4h). Para atender mais pessoas, alocamos profissionais adicionais conforme a demanda.",
    detalhes: [
      "Sessão de 15 minutos: até 20 pessoas por período de 4h",
      "Sessão de 20 minutos: até 16 pessoas por período de 4h",
      "Sessão de 30 minutos: até 12 pessoas por período de 4h",
      "Para grandes empresas, enviamos equipes de 3-5 profissionais simultâneos",
    ],
  },
  {
    pergunta: "Vocês emitem nota fiscal?",
    resposta: "Sim, emitimos nota fiscal de serviço para todas as operações. Facilitamos o processo junto ao departamento financeiro da sua empresa.",
    detalhes: [
      "NFS-e emitida para cada faturamento (mensal ou por evento)",
      "CNAE compatível com serviços de saúde e bem-estar",
      "Aceita dedução como benefício de saúde ocupacional",
      "Contrato formal com todas as cláusulas legais necessárias",
    ],
  },
  {
    pergunta: "Posso cancelar o contrato a qualquer momento?",
    resposta: "Contratos trimestrais têm multa proporcional. Contratos anuais possuem carência de 3 meses. Eventos pontuais podem ser cancelados sem custo até 7 dias antes.",
    detalhes: [
      "Evento pontual: cancelamento grátis até 7 dias antes; 50% até 3 dias antes",
      "Trimestral: multa de 1 mensalidade para cancelamento antecipado",
      "Anual: carência de 3 meses, após isso multa de 2 mensalidades",
      "Pausa temporária: até 30 dias sem custo adicional (1x por contrato)",
    ],
  },
  {
    pergunta: "Os profissionais são qualificados?",
    resposta: "Todos os nossos massoterapeutes possuem formação técnica reconhecida pelo MEC, seguro de responsabilidade civil e certificações em ergonomia e saúde ocupacional.",
    detalhes: [
      "Formação mínima: curso técnico de 1.200 horas em massoterapia",
      "Certificações complementares em quick massage e ergonomia",
      "Registro no CREFITO ou certificação equivalente",
      "Treinamento interno obrigatório e avaliação periódica de qualidade",
    ],
  },
  {
    pergunta: "Como funciona o agendamento dos colaboradores?",
    resposta: "Disponibilizamos um sistema de agendamento online onde cada colaborador pode escolher seu horário preferido, garantindo organização e pontualidade.",
    detalhes: [
      "Link de agendamento personalizado para cada empresa",
      "Colaborador escolhe data, horário e tipo de massagem",
      "Lembretes automáticos por e-mail e WhatsApp",
      "Dashboard para o RH acompanhar adesão e métricas em tempo real",
    ],
  },
  {
    pergunta: "Quais os benefícios fiscais para a empresa?",
    resposta: "A massoterapia corporativa pode ser enquadrada como benefício de saúde ocupacional, permitindo deduções fiscais e redução de encargos trabalhistas.",
    detalhes: [
      "Enquadramento como despesa operacional de saúde",
      "Pode compor o PCMSO (Programa de Controle Médico de Saúde Ocupacional)",
      "Auxilia no cumprimento da NR-17 (Ergonomia)",
      "Empresas do Simples Nacional também podem deduzir como despesa operacional",
    ],
  },
];

export const CorpFAQSection = () => {
  return (
    <Accordion type="single" collapsible className="space-y-3">
      {faqs.map((faq, index) => (
        <AccordionItem
          key={index}
          value={`faq-${index}`}
          className="card-organic border-none px-5"
        >
          <AccordionTrigger className="text-sm font-medium text-foreground hover:text-primary hover:no-underline py-4">
            {faq.pergunta}
          </AccordionTrigger>
          <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4 space-y-3">
            <p>{faq.resposta}</p>
            {faq.detalhes && (
              <ul className="space-y-1.5 mt-2 p-3 rounded-xl bg-muted/30 border border-border/30">
                {faq.detalhes.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="text-primary mt-0.5 shrink-0">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
