import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const contactInfo = [
  { icon: MapPin, label: "Endereço", value: "Rua das Terapias, 123 - Centro" },
  { icon: Phone, label: "Telefone", value: "(11) 99999-9999" },
  { icon: Mail, label: "Email", value: "contato@resinkra.com.br" },
  { icon: Instagram, label: "Instagram", value: "@resinkra" },
];

export const ContatoSection = () => {
  const navigate = useNavigate();

  return (
    <section id="contato" className="py-20 lg:py-28 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* CTA side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Pronto para{" "}
              <span className="font-serif italic text-gradient">começar</span>?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              Crie sua conta gratuitamente e comece a acumular cashback 
              em suas sessões de terapia. Seu bem-estar merece ser recompensado.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                size="xl"
                onClick={() => navigate("/auth")}
                className="group"
              >
                Criar minha conta
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="card-organic p-8"
          >
            <h3 className="text-lg font-bold text-foreground mb-6">Fale conosco</h3>
            <div className="space-y-5">
              {contactInfo.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="shrink-0 p-2 rounded-xl bg-primary/10">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
