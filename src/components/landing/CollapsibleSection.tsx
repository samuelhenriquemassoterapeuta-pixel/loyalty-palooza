import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  /** The badge / pill above the title */
  badge?: ReactNode;
  /** The h2 content */
  title: ReactNode;
  /** Subtitle paragraph */
  subtitle?: ReactNode;
  /** Body content that collapses */
  children: ReactNode;
  /** Section HTML id */
  id?: string;
  /** Extra className on the outer <section> */
  className?: string;
  /** Start expanded? default false */
  defaultOpen?: boolean;
}

export const CollapsibleSection = ({
  badge,
  title,
  subtitle,
  children,
  id,
  className = "",
  defaultOpen = false,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section id={id} className={className}>
      {/* Clickable header */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full text-center cursor-pointer group"
        aria-expanded={isOpen}
      >
        {badge && <div className="mb-4 flex justify-center">{badge}</div>}

        <div className="flex items-center justify-center gap-2">
          <div>{title}</div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25 }}
            className="mt-1"
          >
            <ChevronDown
              size={22}
              className="text-muted-foreground group-hover:text-foreground transition-colors"
            />
          </motion.div>
        </div>

        {subtitle && (
          <div className="mt-4 max-w-2xl mx-auto">{subtitle}</div>
        )}
      </button>

      {/* Collapsible body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-6 sm:pt-10">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
