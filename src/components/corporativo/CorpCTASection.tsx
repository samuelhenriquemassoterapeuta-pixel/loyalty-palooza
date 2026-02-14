import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Building2, User, Mail, Phone, MessageSquare, CheckCircle } from "lucide-react";
import heroBg from "@/assets/hero-options/hero-spa-resinkra.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export const CorpCTASection = () => {
  const { toast } = useToast();
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    plano: "",
    funcionarios: "",
    mensagem: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome || !formData.empresa || !formData.email) {
      toast({
        title: "Preencha os campos obrigatórios",
        description: "Nome, empresa e email são obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Build WhatsApp message
    const msg = encodeURIComponent(
      `Olá! Gostaria de solicitar um orçamento corporativo.\n\n` +
      `*Nome:* ${formData.nome}\n` +
      `*Empresa:* ${formData.empresa}\n` +
      `*Email:* ${formData.email}\n` +
      `*Telefone:* ${formData.telefone || "Não informado"}\n` +
      `*Plano de interesse:* ${formData.plano || "A definir"}\n` +
      `*Nº de funcionários:* ${formData.funcionarios || "Não informado"}\n` +
      `*Mensagem:* ${formData.mensagem || "Sem mensagem adicional"}`
    );

    window.open(`https://wa.me/5511999999999?text=${msg}`, "_blank");
    setEnviado(true);

    toast({
      title: "Redirecionando para o WhatsApp! ✅",
      description: "Nosso time entrará em contato em até 24h.",
    });
  };

  if (enviado) {
    return (
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="card-organic p-10"
        >
          <CheckCircle size={48} className="text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-foreground mb-2">Mensagem enviada!</h3>
          <p className="text-muted-foreground mb-6">
            Nosso time comercial entrará em contato em até 24h úteis para elaborar uma proposta personalizada.
          </p>
          <Button variant="outline" onClick={() => setEnviado(false)}>
            Enviar outra solicitação
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-16 items-start">
      {/* Left side - Info */}
      <div className="space-y-4">
        <div className="space-y-4">
          {[
            "Proposta personalizada em 24h",
            "Visita técnica sem compromisso",
            "Flexibilidade nos contratos",
            "Equipe certificada e especializada",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3">
              <CheckCircle size={16} className="text-primary shrink-0" />
              <span className="text-sm text-foreground">{item}</span>
            </div>
          ))}
        </div>
      </div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <form onSubmit={handleSubmit} className="card-organic p-6 lg:p-8 space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Nome *
                  </label>
                  <div className="relative">
                    <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Seu nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Empresa *
                  </label>
                  <div className="relative">
                    <Building2 size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Nome da empresa"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="email@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Plano de interesse
                  </label>
                  <Select
                    value={formData.plano}
                    onValueChange={(v) => setFormData({ ...formData, plano: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pontual">Pontual (Eventos)</SelectItem>
                      <SelectItem value="trimestral">Trimestral</SelectItem>
                      <SelectItem value="anual">Anual</SelectItem>
                      <SelectItem value="personalizado">Personalizado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">
                    Nº de funcionários
                  </label>
                  <Select
                    value={formData.funcionarios}
                    onValueChange={(v) => setFormData({ ...formData, funcionarios: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-50">1 - 50</SelectItem>
                      <SelectItem value="50-100">50 - 100</SelectItem>
                      <SelectItem value="100-200">100 - 200</SelectItem>
                      <SelectItem value="200-500">200 - 500</SelectItem>
                      <SelectItem value="500+">500+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">
                  Mensagem
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3 top-3 text-muted-foreground" />
                  <Textarea
                    placeholder="Conte-nos sobre sua necessidade..."
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="pl-10 min-h-[100px]"
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full group">
                <Send size={16} className="group-hover:translate-x-0.5 transition-transform" />
                Enviar solicitação
              </Button>
            </form>
          </motion.div>
        </div>
  );
};
