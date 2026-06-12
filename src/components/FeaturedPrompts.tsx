import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { PROMPTS, type Prompt } from "../data/prompts";
import PromptCard from "./PromptCard";
import SectionHeading from "./SectionHeading";

interface FeaturedPromptsProps {
  onOpen: (p: Prompt) => void;
}

const FEATURED = PROMPTS.slice(0, 8);

/** Pinned section: vertical scroll is scrubbed into a horizontal card track. */
export default function FeaturedPrompts({ onOpen }: FeaturedPromptsProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const x = useTransform(smooth, [0.08, 0.95], ["2%", "-72%"]);

  return (
    <section ref={ref} id="featured" className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-[min(1200px,92vw)]">
          <SectionHeading
            kicker="01 — FEATURED"
            title={
              <>
                The prompts everyone <em className="not-italic text-chartreuse">steals</em>
              </>
            }
            sub="Scroll to move through the reel. Click any frame to open it."
          />
        </div>

        <motion.div style={{ x }} className="mt-12 flex gap-6 pl-[4vw] will-change-transform">
          {FEATURED.map((p, i) => (
            <PromptCard key={p.id} prompt={p} index={i} onOpen={onOpen} />
          ))}
          {/* end card */}
          <div className="grid w-[320px] shrink-0 place-items-center rounded-3xl border border-dashed border-white/15 md:w-[380px]">
            <a
              href="#search"
              className="font-mono text-sm tracking-[0.2em] text-white/40 transition-colors duration-300 hover:text-chartreuse"
            >
              VIEW ALL →
            </a>
          </div>
        </motion.div>

        {/* horizontal progress */}
        <div className="mx-auto mt-12 h-px w-[min(400px,60vw)] bg-white/10">
          <motion.div className="h-full origin-left bg-chartreuse" style={{ scaleX: smooth }} />
        </div>
      </div>
    </section>
  );
}
