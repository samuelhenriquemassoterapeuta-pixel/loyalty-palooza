import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, X } from "lucide-react";
import { useLandingConfig } from "@/hooks/useLandingConfig";

export const FloatingContactButtons = () => {
  const [open, setOpen] = useState(false);
  const { config } = useLandingConfig("contato");

  const whatsapp = config?.whatsapp || "5511999999999";
  const instagram = config?.instagram || "@resinkra";
  const instagramUser = instagram.replace("@", "");

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de tirar uma dúvida 😊")}`;
  const instagramUrl = `https://instagram.com/${instagramUser}`;

  return (
    <div className="fixed bottom-24 left-4 z-50 flex flex-col-reverse items-start gap-3 lg:bottom-6">
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp */}
            <motion.a
              key="whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.3, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.3, x: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.05 }}
              className="flex items-center gap-2.5 rounded-full bg-[hsl(142,70%,38%)] text-white px-5 py-3 shadow-lg hover:shadow-xl hover:bg-[hsl(142,70%,32%)] transition-all active:scale-95 text-base font-semibold"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-6 h-6" />
              <span>WhatsApp</span>
            </motion.a>

            {/* Instagram */}
            <motion.a
              key="instagram"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.3, x: -20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.3, x: -20 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
              className="flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[hsl(280,70%,50%)] via-[hsl(330,80%,55%)] to-[hsl(30,90%,55%)] text-white px-5 py-3 shadow-lg hover:shadow-xl hover:brightness-110 transition-all active:scale-95 text-base font-semibold"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6" />
              <span>{instagram}</span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className={`w-11 h-11 rounded-full shadow-md flex items-center justify-center transition-all active:scale-95 ${
          open
            ? "bg-muted text-muted-foreground"
            : "bg-[hsl(142,70%,38%)] text-white animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"
        }`}
        whileTap={{ scale: 0.85 }}
        aria-label={open ? "Fechar contato" : "Fale conosco"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
