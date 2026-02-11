import { useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  /** Speed multiplier: positive = moves with scroll, negative = against */
  speed?: number;
  /** Input scroll range [start, end] as fractions of element visibility (0-1) */
  inputRange?: [number, number];
}

export const useParallax = (options: ParallaxOptions = {}) => {
  const { speed = 0.3, inputRange = [0, 1] } = options;
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    inputRange,
    [speed * 100, -speed * 100]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.95, 1, 1, 0.95]
  );

  return { ref, y, opacity, scale, scrollYProgress };
};

export const useParallaxLayer = (
  scrollYProgress: MotionValue<number>,
  speed: number
) => {
  return useTransform(
    scrollYProgress,
    [0, 1],
    [speed * 120, -speed * 120]
  );
};
