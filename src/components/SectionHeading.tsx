import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  kicker: string;
  title: ReactNode;
  sub?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ kicker, title, sub, align = "left" }: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <div className={centered ? "text-center" : ""}>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="font-mono text-[11px] tracking-[0.4em] text-chartreuse"
      >
        {kicker}
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 font-serif text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.02] tracking-tight"
      >
        {title}
      </motion.h2>
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className={`mt-4 max-w-lg text-[15px] font-light leading-relaxed text-white/50 ${centered ? "mx-auto" : ""}`}
        >
          {sub}
        </motion.p>
      )}
    </div>
  );
}
