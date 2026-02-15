import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleDashboardSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  badge?: ReactNode;
}

export const CollapsibleDashboardSection = ({
  title,
  icon,
  children,
  defaultOpen = false,
  badge,
}: CollapsibleDashboardSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center gap-2 py-2 px-1 group"
        aria-expanded={isOpen}
      >
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex-1 text-left">
          {title}
        </span>
        {badge}
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="p-1 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/20 transition-colors"
        >
          <ChevronDown size={14} className="text-primary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="space-y-3 pt-1">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
