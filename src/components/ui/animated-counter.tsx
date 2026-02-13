import { useEffect, useRef, useState, useCallback, forwardRef } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  /** Format function applied to the animated number */
  format?: (n: number) => string;
  /** Duration in seconds (default 1.2) */
  duration?: number;
  /** Delay in ms before starting animation (default 0) */
  startDelay?: number;
  /** Extra className on the <span> */
  className?: string;
}

/**
 * Animated number counter with easing.
 * Triggers when the element enters the viewport.
 */
export const AnimatedCounter = forwardRef<HTMLSpanElement, AnimatedCounterProps>(({
  value,
  format,
  duration = 1.2,
  startDelay = 0,
  className = "",
}, forwardedRef) => {
  const internalRef = useRef<HTMLSpanElement>(null);
  const ref = (forwardedRef as React.RefObject<HTMLSpanElement>) || internalRef;
  const isInView = useInView(ref, { once: true, amount: 0 });
  const [displayValue, setDisplayValue] = useState(0);
  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = performance.now();
    }

    const elapsed = performance.now() - startTimeRef.current;
    const progress = Math.min(elapsed / (duration * 1000), 1);

    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = eased * value;

    // Match decimal precision of the target value
    const decimals = value % 1 !== 0 ? 2 : 0;
    setDisplayValue(parseFloat(current.toFixed(decimals)));

    if (progress < 1) {
      rafRef.current = requestAnimationFrame(animate);
    }
  }, [value, duration]);

  useEffect(() => {
    const trigger = isInView || startDelay > 0;
    if (trigger && value !== 0) {
      const timeout = setTimeout(() => {
        startTimeRef.current = null;
        rafRef.current = requestAnimationFrame(animate);
      }, startDelay);
      return () => {
        clearTimeout(timeout);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, value, animate, startDelay]);

  // If value is 0, just show it directly
  const finalValue = value === 0 ? 0 : displayValue;
  const formatted = format ? format(finalValue) : String(finalValue);

  return (
    <span ref={ref} className={className}>
      {formatted}
    </span>
  );
});

AnimatedCounter.displayName = "AnimatedCounter";
