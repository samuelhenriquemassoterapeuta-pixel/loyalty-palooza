import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Instagram, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useParallax } from "@/hooks/useParallax";
import { useLandingConfig } from "@/hooks/useLandingConfig";
import contatoBg from "@/assets/hero-options/contato-bg.jpg";

const contactItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.3 + i * 0.1, duration: 0.5, ease: [0, 0, 0.2, 1] as const },
  }),
};

export const ContatoSection = () => {
  const navigate = useNavigate();
  const { ref, y } = useParallax({ speed: 0.1 });
  const { config } = useLandingConfig("contato");

  const tituloParte1 = config?.titulo_parte1 || "Pronto para";
  const tituloDestaque = config?.titulo_destaque || "começar";
  const subtitulo = config?.subtitulo || "Crie sua conta gratuitamente e comece a acumular cashback em suas sessões de terapia. Seu bem-estar merece ser recompensado.";
  const botao = config?.botao || "Criar minha conta";

  const contactInfo = [
    { icon: MapPin, label: "Endereço", value: config?.endereco || "Rua das Terapias, 123 - Centro" },
    { icon: Phone, label: "Telefone", value: config?.telefone || "(11) 99999-9999" },
    { icon: Mail, label: "Email", value: config?.email || "contato@resinkra.com.br" },
    { icon: Instagram, label: "Instagram", value: config?.instagram || "@resinkra" },
  ];

  return (
    <section id="contato" ref={ref} className="py-14 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={contatoBg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[2px]" />
      </div>
      <motion.div
        style={{ y }}
        className="absolute bottom-0 right-[5%] w-80 h-80 bg-primary/4 rounded-full blur-3xl pointer-events-none hidden lg:block"
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              {tituloParte1}{" "}
              <span className="font-serif italic text-gradient">{tituloDestaque}</span>?
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-md">
              {subtitulo}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="xl" onClick={() => navigate("/auth")} className="group">
                {botao}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="card-organic p-8"
          >
            <h3 className="text-lg font-bold text-foreground mb-6">Fale conosco</h3>
            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  custom={i}
                  variants={contactItemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ x: 4, transition: { duration: 0.2 } }}
                  className="flex items-start gap-4 cursor-default"
                >
                  <div className="shrink-0 p-2 rounded-xl bg-primary/10">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
