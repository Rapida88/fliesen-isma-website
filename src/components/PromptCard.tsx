import { useRef, type MouseEvent } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Clapperboard, Gauge } from "lucide-react";
import type { Prompt } from "../data/prompts";

interface PromptCardProps {
  prompt: Prompt;
  onOpen: (p: Prompt) => void;
  index?: number;
}

const DIFFICULTY_DOTS: Record<Prompt["difficulty"], number> = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Master: 4,
};

/** 3D-tilting glass card with glow, depth and animated border on hover. */
export default function PromptCard({ prompt, onOpen, index = 0 }: PromptCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [9, -9]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-9, 9]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, [0, 1], ["20%", "80%"]);
  const glowY = useTransform(my, [0, 1], ["20%", "80%"]);

  const handleMove = (e: MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={() => onOpen(prompt)}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03 }}
      className="group relative w-[320px] shrink-0 cursor-pointer overflow-hidden rounded-3xl glass md:w-[380px]"
    >
      {/* animated border sweep */}
      <div
        className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(120deg, transparent 30%, rgba(223,255,79,0.45) 50%, transparent 70%)",
          backgroundSize: "250% 250%",
          animation: "pan-gradient 2.4s linear infinite",
          maskImage: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          padding: 1.5,
        }}
      />
      {/* cursor-tracked glow */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: useTransform(
            [glowX, glowY],
            ([gx, gy]) =>
              `radial-gradient(400px circle at ${gx} ${gy}, rgba(223,255,79,0.12), transparent 65%)`,
          ),
        }}
      />

      {/* "thumbnail" — living gradient scene */}
      <div className="relative m-2 h-48 overflow-hidden rounded-2xl" style={{ transform: "translateZ(30px)" }}>
        <div
          className="animated-gradient absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{ background: prompt.gradient }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
        <span className="absolute left-3 top-3 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest text-white glass-bright">
          {prompt.model.toUpperCase()}
        </span>
        <span className="absolute bottom-3 right-3 font-mono text-[10px] text-white/80">
          {prompt.stat}
        </span>
        <motion.div
          className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full glass-bright">
            <Clapperboard className="h-5 w-5 text-chartreuse" />
          </span>
        </motion.div>
      </div>

      <div className="relative px-5 pb-5 pt-3" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] tracking-[0.25em] text-chartreuse">
            {prompt.category.toUpperCase()}
          </span>
          <span className="flex items-center gap-1.5 text-white/50" title={prompt.difficulty}>
            <Gauge className="h-3.5 w-3.5" />
            <span className="flex gap-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1 w-3 rounded-full ${
                    i < DIFFICULTY_DOTS[prompt.difficulty] ? "bg-chartreuse" : "bg-white/15"
                  }`}
                />
              ))}
            </span>
          </span>
        </div>
        <h3 className="mt-2 font-serif text-2xl text-white transition-colors duration-300 group-hover:text-chartreuse">
          {prompt.title}
        </h3>
        <p className="mt-1.5 line-clamp-2 text-sm font-light leading-relaxed text-white/50">
          {prompt.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {prompt.tags.slice(0, 3).map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/55 transition-colors duration-300 group-hover:border-chartreuse/40 group-hover:text-white/80"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
