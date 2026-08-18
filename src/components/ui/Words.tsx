"use client";

import { motion, useReducedMotion } from "motion/react";

type Props = {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

/** Word-by-word staggered rise on enter. Each word animates independently so it
 *  fires reliably even when already in view on load. */
export default function Words({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  as = "span",
}: Props) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  const Tag = as;

  if (reduce) return <Tag className={className}>{text}</Tag>;

  return (
    <Tag className={className}>
      {words.map((w, i) => (
        <span key={i} style={{ display: "inline" }}>
          <motion.span
            className={wordClassName}
            style={{ display: "inline-block", willChange: "transform" }}
            initial={{ opacity: 0, y: "0.55em" }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -8% 0px" }}
            transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
