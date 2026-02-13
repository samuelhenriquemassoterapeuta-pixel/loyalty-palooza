import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
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
  },
  {
    pergunta: "Qual o investimento mínimo?",
    resposta: "Para eventos pontuais, o valor é sob consulta e depende do número de profissionais e duração. Para programas recorrentes, os planos começam a partir de R$ 1.900/mês com contrato anual.",
  },
  {
    pergunta: "Vocês atendem em todo o Brasil?",
    resposta: "Atualmente atendemos em São Paulo capital e região metropolitana. Para eventos em outras cidades, consulte disponibilidade e condições especiais.",
  },
  {
    pergunta: "É necessário espaço dedicado na empresa?",
    resposta: "Não! Precisamos apenas de um espaço de 2x2 metros por cadeira. Levamos tudo: cadeiras, toalhas descartáveis, lençóis e música ambiente. Adaptamos qualquer ambiente.",
  },
  {
    pergunta: "Quantos colaboradores podem ser atendidos por dia?",
    resposta: "Cada profissional atende entre 16 e 20 colaboradores por período (4h). Para atender mais pessoas, alocamos profissionais adicionais conforme a demanda.",
  },
  {
    pergunta: "Vocês emitem nota fiscal?",
    resposta: "Sim, emitimos nota fiscal de serviço para todas as operações. Facilitamos o processo junto ao departamento financeiro da sua empresa.",
  },
  {
    pergunta: "Posso cancelar o contrato a qualquer momento?",
    resposta: "Contratos trimestrais têm multa proporcional. Contratos anuais possuem carência de 3 meses. Eventos pontuais podem ser cancelados sem custo até 7 dias antes.",
  },
];

export const CorpFAQSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-card/50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="pill mb-4 inline-flex">
            <HelpCircle size={14} />
            Perguntas frequentes
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Tire suas{" "}
            <span className="font-serif italic text-gradient">dúvidas</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
        >
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
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-4">
                  {faq.resposta}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
