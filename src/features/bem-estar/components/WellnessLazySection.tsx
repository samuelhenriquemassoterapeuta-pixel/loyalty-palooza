import { useRef, useState, useEffect, ReactNode, Suspense, lazy, ComponentType } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface WellnessLazySectionProps {
  children: ReactNode;
  rootMargin?: string;
}

/**
 * Renders children only when the section is near the viewport.
 * Uses IntersectionObserver to defer rendering of off-screen widgets.
 */
export const WellnessLazySection = ({ children, rootMargin = "200px" }: WellnessLazySectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className="min-h-[60px]">
      {isVisible ? children : null}
    </div>
  );
};

interface WellnessCollapsibleGroupProps {
  title: string;
  icon: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/**
 * Groups multiple widgets under a collapsible section header.
 * Combines with WellnessLazySection for maximum performance.
 */
export const WellnessCollapsibleGroup = ({ title, icon, children, defaultOpen = false }: WellnessCollapsibleGroupProps) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-muted/50 hover:bg-muted/80 transition-colors text-left"
      >
        <span className="text-base">{icon}</span>
        <span className="text-xs font-semibold text-foreground flex-1">{title}</span>
        <ChevronDown
          size={14}
          className={`text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-2 space-y-0"
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};
