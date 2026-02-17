import { forwardRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const CorpWhatsAppCTA = forwardRef<HTMLButtonElement>((_, ref) => {
  const handleClick = () => {
    const msg = encodeURIComponent(
      "Olá! Gostaria de saber mais sobre os programas de massoterapia corporativa da Resinkra."
    );
    window.open(`https://wa.me/5511999999999?text=${msg}`, "_blank");
  };

  return (
    <motion.button
      ref={ref}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[hsl(142,70%,40%)] text-white px-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
      aria-label="Falar com consultor via WhatsApp"
    >
      <MessageCircle size={20} />
      <span className="text-sm font-medium hidden sm:inline">Falar com consultor</span>
    </motion.button>
  );
});

CorpWhatsAppCTA.displayName = "CorpWhatsAppCTA";
