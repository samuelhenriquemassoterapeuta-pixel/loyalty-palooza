import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  /** Delay before starting (seconds) */
  delay?: number;
  /** If true, animate word by word; otherwise character by character */
  byWord?: boolean;
}

/**
 * Staggered text reveal animation — words or characters fade-up one by one.
 */
export const TextReveal = ({
  text,
  className = "",
  delay = 0,
  byWord = true,
}: TextRevealProps) => {
  const parts = byWord ? text.split(" ") : text.split("");

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: byWord ? 0.06 : 0.025,
            delayChildren: delay,
          },
        },
      }}
    >
      {parts.map((part, i) => (
        <motion.span
          key={i}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 8, filter: "blur(4px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { type: "spring", stiffness: 300, damping: 24 },
            },
          }}
        >
          {part}
          {byWord && i < parts.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );
};
