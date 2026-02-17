import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Instagram, X } from "lucide-react";
import { useLandingConfig } from "@/features/landing/hooks/useLandingConfig";

export const FloatingContactButtons = () => {
  const [open, setOpen] = useState(false);
  const { config } = useLandingConfig("contato");

  const whatsapp = config?.whatsapp || "5511999999999";
  const instagram = config?.instagram || "@resinkra";
  const instagramUser = instagram.replace("@", "");

  const whatsappUrl = `https://wa.me/${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent("Olá! Gostaria de tirar uma dúvida 😊")}`;
  const instagramUrl = `https://instagram.com/${instagramUser}`;

  return (
    <div className="fixed bottom-28 right-4 z-40 flex flex-col-reverse items-end gap-3 lg:bottom-6 lg:right-6">
      <AnimatePresence>
        {open && (
          <>
            {/* WhatsApp */}
            <motion.a
              key="whatsapp"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.3, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.3, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.05 }}
              className="flex items-center gap-2 rounded-full bg-[hsl(142,70%,38%)] text-white px-4 py-2.5 shadow-lg hover:shadow-xl hover:bg-[hsl(142,70%,32%)] transition-all active:scale-95 text-sm font-semibold"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </motion.a>

            {/* Instagram */}
            <motion.a
              key="instagram"
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.3, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.3, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.1 }}
              className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[hsl(280,70%,50%)] via-[hsl(330,80%,55%)] to-[hsl(30,90%,55%)] text-white px-4 py-2.5 shadow-lg hover:shadow-xl hover:brightness-110 transition-all active:scale-95 text-sm font-semibold"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
              <span>{instagram}</span>
            </motion.a>
          </>
        )}
      </AnimatePresence>

      {/* Toggle button — smaller, right-aligned, no pulse animation */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        className={`w-10 h-10 rounded-full shadow-md flex items-center justify-center transition-all active:scale-95 ${
          open
            ? "bg-muted text-muted-foreground"
            : "gradient-primary text-primary-foreground"
        }`}
        whileTap={{ scale: 0.85 }}
        aria-label={open ? "Fechar contato" : "Fale conosco"}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-4 h-4" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
