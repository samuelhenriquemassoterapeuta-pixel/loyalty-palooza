import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  BookOpen, 
  Calendar, 
  ShoppingBag, 
  Package, 
  Send, 
  Gift, 
  Wallet,
  HelpCircle,
  Download,
  ChevronRight,
  ChevronDown,
  Sparkles,
  Clock,
  CreditCard,
  Users,
  Bell,
  Shield,
  Smartphone
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNavigation } from "@/components/BottomNavigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ManualSection {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  content: {
    title: string;
    steps: string[];
  }[];
}

const manualSections: ManualSection[] = [
  {
    id: "inicio",
    icon: Sparkles,
    title: "Primeiros Passos",
    description: "Como começar a usar o Resinkra",
    color: "from-primary/20 to-primary/5",
    content: [
      {
        title: "Criando sua conta",
        steps: [
          "Acesse a tela de login e clique em 'Criar conta'",
          "Preencha seu email e crie uma senha segura",
          "Confirme seu email clicando no link enviado",
          "Complete seu perfil com nome e telefone"
        ]
      },
      {
        title: "Navegando pelo app",
        steps: [
          "Use a barra inferior para navegar entre as seções",
          "O ícone de casa leva à página inicial",
          "Acesse seu perfil clicando no ícone de engrenagem",
          "Veja suas notificações no ícone do sino"
        ]
      }
    ]
  },
  {
    id: "agendamentos",
    icon: Calendar,
    title: "Agendamentos",
    description: "Como agendar suas sessões",
    color: "from-primary/20 to-accent/10",
    content: [
      {
        title: "Fazer um agendamento",
        steps: [
          "Na tela inicial, toque em 'Agendar'",
          "Escolha o serviço desejado",
          "Selecione a data e horário disponível",
          "Confirme o agendamento e aguarde a confirmação"
        ]
      },
      {
        title: "Cancelar ou reagendar",
        steps: [
          "Vá até 'Meus Agendamentos' no menu",
          "Encontre o agendamento que deseja alterar",
          "Toque em 'Cancelar' ou 'Reagendar'",
          "Cancelamentos devem ser feitos com 24h de antecedência"
        ]
      }
    ]
  },
  {
    id: "loja",
    icon: ShoppingBag,
    title: "Loja",
    description: "Compre produtos exclusivos",
    color: "from-accent/20 to-accent/5",
    content: [
      {
        title: "Comprando produtos",
        steps: [
          "Acesse a Loja pelo menu inferior",
          "Navegue pelas categorias ou use a busca",
          "Toque no '+' para adicionar ao carrinho",
          "Finalize clicando em 'Reservar' no carrinho"
        ]
      },
      {
        title: "Usando cashback na compra",
        steps: [
          "No carrinho, ative 'Usar meu cashback'",
          "O valor será descontado automaticamente",
          "Você pode usar todo ou parte do cashback",
          "O saldo restante fica disponível para futuras compras"
        ]
      }
    ]
  },
  {
    id: "pacotes",
    icon: Package,
    title: "Pacotes",
    description: "Planos e sessões",
    color: "from-highlight/20 to-highlight/5",
    content: [
      {
        title: "Adquirindo um pacote",
        steps: [
          "Acesse 'Planos' no menu principal",
          "Veja os pacotes disponíveis e benefícios",
          "Escolha o pacote ideal para você",
          "Confirme a compra e receba suas sessões"
        ]
      },
      {
        title: "Usando suas sessões",
        steps: [
          "Ao agendar, suas sessões do pacote são usadas automaticamente",
          "Acompanhe o saldo de sessões na tela de pacotes",
          "Pacotes têm validade - fique atento às datas",
          "Sessões não utilizadas não são reembolsáveis"
        ]
      }
    ]
  },
  {
    id: "transferencias",
    icon: Send,
    title: "Transferências",
    description: "Envie créditos para amigos",
    color: "from-info/20 to-info/5",
    content: [
      {
        title: "Transferindo créditos",
        steps: [
          "Toque em 'Transferir' na tela inicial",
          "Digite o email do destinatário",
          "Informe o valor que deseja enviar",
          "Confirme a transferência"
        ]
      },
      {
        title: "Recebendo créditos",
        steps: [
          "Você será notificado quando receber créditos",
          "O valor é creditado automaticamente em seu saldo",
          "Veja o histórico na seção de transações",
          "Use os créditos para serviços ou produtos"
        ]
      }
    ]
  },
  {
    id: "indicacoes",
    icon: Gift,
    title: "Programa de Indicações",
    description: "Indique amigos e ganhe",
    color: "from-accent/20 to-highlight/10",
    content: [
      {
        title: "Como indicar",
        steps: [
          "Acesse 'Indique e Ganhe' na tela inicial",
          "Copie seu código de indicação exclusivo",
          "Compartilhe com amigos via WhatsApp ou redes sociais",
          "Ganhe R$ 10 quando seu amigo fizer a primeira compra"
        ]
      },
      {
        title: "Usando código de indicação",
        steps: [
          "Se você foi indicado, acesse a tela de indicações",
          "Cole o código no campo 'Usar código'",
          "O bônus será creditado após sua primeira compra",
          "Você também pode indicar outros amigos"
        ]
      }
    ]
  },
  {
    id: "cashback",
    icon: Wallet,
    title: "Cashback",
    description: "Entenda como funciona",
    color: "from-green-500/20 to-green-500/5",
    content: [
      {
        title: "Ganhando cashback",
        steps: [
          "Cada compra gera um percentual de cashback",
          "O percentual varia conforme o produto/serviço",
          "O cashback é creditado após a confirmação do pedido",
          "Acompanhe seu saldo na tela inicial"
        ]
      },
      {
        title: "Usando seu cashback",
        steps: [
          "Use em compras na loja ativando a opção no carrinho",
          "Use para pagar agendamentos (parcial ou total)",
          "O cashback não expira enquanto sua conta estiver ativa",
          "Não é possível transferir cashback para outros usuários"
        ]
      }
    ]
  }
];

const faqItems = [
  {
    question: "Esqueci minha senha, o que faço?",
    answer: "Na tela de login, clique em 'Esqueci a senha'. Digite seu email e você receberá um link para criar uma nova senha."
  },
  {
    question: "Posso cancelar um agendamento?",
    answer: "Sim, você pode cancelar com até 24 horas de antecedência. Cancelamentos em cima da hora podem ter penalidades."
  },
  {
    question: "Como funciona o cashback?",
    answer: "Você recebe um percentual de volta em cada compra. Esse valor fica disponível para usar em futuras compras ou agendamentos."
  },
  {
    question: "Meu pacote tem validade?",
    answer: "Sim, cada pacote tem uma validade específica. Você pode ver a data de expiração na tela de pacotes."
  },
  {
    question: "Como entro em contato com o suporte?",
    answer: "Acesse seu perfil, vá em 'Ajuda' e você encontrará opções de contato via WhatsApp, email ou telefone."
  },
  {
    question: "Posso usar o app offline?",
    answer: "O app precisa de conexão para funcionar. Mas você pode instalá-lo como PWA para ter uma experiência melhor."
  }
];

export default function Manual() {
  const navigate = useNavigate();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const handleExportPDF = () => {
    // Create printable content
    const printContent = `
      <html>
        <head>
          <title>Manual Resinkra</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
            h1 { color: #4A7C59; border-bottom: 2px solid #4A7C59; padding-bottom: 10px; }
            h2 { color: #4A7C59; margin-top: 30px; }
            h3 { color: #333; margin-top: 20px; }
            ul { margin-left: 20px; }
            li { margin-bottom: 8px; }
            .section { page-break-inside: avoid; margin-bottom: 30px; }
            .faq { background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
            .faq-q { font-weight: bold; color: #4A7C59; }
          </style>
        </head>
        <body>
          <h1>📖 Manual do Usuário - Resinkra</h1>
          <p>Bem-vindo ao Resinkra! Este manual vai te ajudar a aproveitar todas as funcionalidades do nosso aplicativo.</p>
          
          ${manualSections.map(section => `
            <div class="section">
              <h2>${section.title}</h2>
              <p>${section.description}</p>
              ${section.content.map(item => `
                <h3>${item.title}</h3>
                <ul>
                  ${item.steps.map(step => `<li>${step}</li>`).join('')}
                </ul>
              `).join('')}
            </div>
          `).join('')}
          
          <h2>❓ Perguntas Frequentes</h2>
          ${faqItems.map(item => `
            <div class="faq">
              <p class="faq-q">${item.question}</p>
              <p>${item.answer}</p>
            </div>
          `).join('')}
          
          <p style="margin-top: 40px; text-align: center; color: #666;">
            © ${new Date().getFullYear()} Resinkra - Todos os direitos reservados
          </p>
        </body>
      </html>
    `;

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 safe-top">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />
        
        <div className="max-w-lg mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="shrink-0"
            >
              <ArrowLeft size={20} />
            </Button>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                <BookOpen size={24} />
                Manual do Usuário
              </h1>
              <p className="text-sm text-muted-foreground">Aprenda a usar o Resinkra</p>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleExportPDF}
            className="gap-2"
          >
            <Download size={16} />
            Baixar PDF
          </Button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Sections Grid */}
        <div className="grid grid-cols-2 gap-3">
          {manualSections.map((section, index) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
              className={`p-4 rounded-2xl bg-gradient-to-br ${section.color} border border-border/50 text-left transition-all hover:shadow-lg ${
                expandedSection === section.id ? 'ring-2 ring-primary' : ''
              }`}
            >
              <section.icon size={28} className="text-primary mb-2" />
              <h3 className="font-semibold text-sm">{section.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
            </motion.button>
          ))}
        </div>

        {/* Expanded Section Content */}
        <AnimatePresence>
          {expandedSection && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-4 border-primary/20">
                {manualSections
                  .find(s => s.id === expandedSection)
                  ?.content.map((item, idx) => (
                    <div key={idx} className={idx > 0 ? "mt-6 pt-6 border-t border-border" : ""}>
                      <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                        <ChevronRight size={16} />
                        {item.title}
                      </h4>
                      <ul className="space-y-2">
                        {item.steps.map((step, stepIdx) => (
                          <motion.li
                            key={stepIdx}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: stepIdx * 0.1 }}
                            className="flex items-start gap-3 text-sm"
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                              {stepIdx + 1}
                            </span>
                            <span className="text-muted-foreground">{step}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ Section */}
        <section>
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <HelpCircle size={20} className="text-primary" />
            Perguntas Frequentes
          </h2>
          
          <Accordion type="single" collapsible className="space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`faq-${index}`}
                className="bg-card rounded-xl border border-border px-4"
              >
                <AccordionTrigger className="text-sm font-medium text-left hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-lg font-bold mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-3 gap-2">
            {[
              { icon: Calendar, label: "Agendar", path: "/agendamento" },
              { icon: ShoppingBag, label: "Loja", path: "/loja" },
              { icon: Gift, label: "Indicar", path: "/indicacoes" },
            ].map((item) => (
              <Button
                key={item.label}
                variant="outline"
                className="flex-col h-auto py-4 gap-2"
                onClick={() => navigate(item.path)}
              >
                <item.icon size={20} className="text-primary" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </section>
      </div>

      <BottomNavigation />
    </div>
  );
}
