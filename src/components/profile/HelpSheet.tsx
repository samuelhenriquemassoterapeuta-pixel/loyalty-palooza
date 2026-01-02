import { useState } from "react";
import { HelpCircle, MessageCircle, Mail, Phone, ChevronDown, ExternalLink } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "sonner";

interface HelpSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const faqItems = [
  {
    question: "Como faço para agendar um serviço?",
    answer: "Acesse a aba 'Agenda' no menu inferior, escolha o serviço desejado, selecione a data e horário disponíveis e confirme o agendamento.",
  },
  {
    question: "Como funciona o cashback?",
    answer: "A cada compra ou serviço, você acumula cashback que fica disponível na sua carteira. O valor pode ser usado para abater em futuras compras.",
  },
  {
    question: "Posso cancelar um agendamento?",
    answer: "Sim! Você pode cancelar até 24 horas antes do horário agendado sem cobrança. Acesse 'Meus Agendamentos' e clique em cancelar.",
  },
  {
    question: "Como uso meus pacotes de sessões?",
    answer: "Ao agendar um serviço incluso no seu pacote, o sistema automaticamente desconta uma sessão. Você pode ver o saldo na aba 'Pacotes'.",
  },
  {
    question: "Como alterar meus dados pessoais?",
    answer: "Acesse seu perfil e clique em 'Dados pessoais'. Lá você pode atualizar seu nome, telefone e foto de perfil.",
  },
  {
    question: "Os produtos da loja são entregues?",
    answer: "Os produtos devem ser retirados na clínica. Ao finalizar a compra, você receberá uma notificação quando estiver pronto para retirada.",
  },
];

const contactOptions = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    description: "Resposta rápida",
    action: () => window.open("https://wa.me/5511999999999", "_blank"),
  },
  {
    icon: Mail,
    label: "E-mail",
    description: "contato@resinkra.com",
    action: () => {
      navigator.clipboard.writeText("contato@resinkra.com");
      toast.success("E-mail copiado!");
    },
  },
  {
    icon: Phone,
    label: "Telefone",
    description: "(11) 99999-9999",
    action: () => window.open("tel:+5511999999999", "_blank"),
  },
];

export const HelpSheet = ({ open, onOpenChange }: HelpSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-secondary">
              <HelpCircle size={20} className="text-foreground" />
            </div>
            <SheetTitle className="text-xl">Ajuda</SheetTitle>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* FAQ */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Perguntas frequentes</h3>
            <Accordion type="single" collapsible className="space-y-2">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-card rounded-xl px-4 border-0 shadow-card"
                >
                  <AccordionTrigger className="text-left text-sm font-medium hover:no-underline py-4">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Contato */}
          <div className="pt-4 border-t border-border">
            <h3 className="font-semibold text-foreground mb-3">Fale conosco</h3>
            <div className="space-y-2">
              {contactOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={option.action}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all"
                >
                  <div className="p-2 rounded-lg bg-secondary">
                    <option.icon size={18} className="text-foreground" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-medium text-foreground text-sm">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                  <ExternalLink size={16} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>

          {/* Horário de Atendimento */}
          <div className="pt-4 border-t border-border">
            <div className="p-4 rounded-xl bg-secondary/50">
              <h4 className="font-semibold text-foreground text-sm mb-2">Horário de atendimento</h4>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>Segunda a Sexta: 9h às 18h</p>
                <p>Sábado: 9h às 13h</p>
                <p>Domingo: Fechado</p>
              </div>
            </div>
          </div>

          {/* Versão */}
          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              Versão 1.0.0 • Resinkra App
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
