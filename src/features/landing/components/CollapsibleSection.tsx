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
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Clickable header */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="w-full text-center cursor-pointer group"
        aria-expanded={isOpen}
      >
        {badge && (
          <motion.div
            className="mb-4 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {badge}
          </motion.div>
        )}

        <div className="flex items-start justify-center gap-3">
          <div className="flex-1 min-w-0">{title}</div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="shrink-0 mt-2 p-1.5 rounded-full bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:shadow-md transition-all duration-300"
          >
            <ChevronDown
              size={18}
              className="text-primary"
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
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="pt-6 sm:pt-10"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
