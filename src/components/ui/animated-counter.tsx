import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  /** Format function applied to the animated number */
  format?: (n: number) => string;
  /** Duration in seconds (default 1.2) */
  duration?: number;
  /** Extra className on the <span> */
  className?: string;
  /** If true the counter always starts from 0 when it enters the viewport */
  alwaysAnimate?: boolean;
}

/**
 * Animated number counter with spring easing.
 * Automatically triggers when the element enters the viewport.
 *
 * Usage:
 * ```tsx
 * <AnimatedCounter value={1234.56} format={formatCurrency} className="text-4xl font-bold" />
 * ```
 */
export const AnimatedCounter = ({
  value,
  format,
  duration = 1.2,
  className = "",
  alwaysAnimate = false,
}: AnimatedCounterProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: !alwaysAnimate, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState(isInView ? value : 0);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const rounded = useTransform(spring, (latest) => {
    // Determine decimal places from the target value
    const decimals = value % 1 !== 0 ? 2 : 0;
    return parseFloat(latest.toFixed(decimals));
  });

  useEffect(() => {
    if (isInView) {
      spring.set(value);
    } else {
      spring.set(0);
    }
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return unsubscribe;
  }, [rounded]);

  const formatted = format ? format(displayValue) : String(displayValue);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
    >
      {formatted}
    </motion.span>
  );
};
