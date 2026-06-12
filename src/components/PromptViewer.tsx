import { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Check, ChevronLeft, ChevronRight, Copy, Heart, Sparkles } from "lucide-react";
import { PROMPTS } from "../data/prompts";
import { useTypewriter } from "../hooks/useTypewriter";
import MagneticButton from "./MagneticButton";
import SectionHeading from "./SectionHeading";

interface PromptViewerProps {
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

const VIEWER_PROMPTS = [PROMPTS[3], PROMPTS[0], PROMPTS[6]];

/** Section 3 — a floating glass panel that types prompts out live. */
export default function PromptViewer({ favorites, onToggleFavorite }: PromptViewerProps) {
  const ref = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const inView = useInView(panelRef, { margin: "-25% 0px" });
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);

  const prompt = VIEWER_PROMPTS[index];
  const { typed, done } = useTypewriter(prompt.prompt, inView, 14);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const panelY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const glowY = useTransform(scrollYProgress, [0, 1], [160, -160]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const step = (dir: number) => {
    setCopied(false);
    setIndex((i) => (i + dir + VIEWER_PROMPTS.length) % VIEWER_PROMPTS.length);
  };

  return (
    <section ref={ref} id="viewer" className="relative py-36 md:py-48">
      {/* parallax glow behind the panel */}
      <motion.div
        className="orb pointer-events-none"
        style={{
          y: glowY,
          background: prompt.accent,
          width: 500,
          height: 500,
          top: "20%",
          left: "55%",
          opacity: 0.14,
        }}
      />

      <div className="mx-auto w-[min(1100px,92vw)]">
        <SectionHeading
          kicker="02 — LIVE VIEWER"
          title={
            <>
              Watch a prompt <em className="not-italic italic text-chartreuse">think</em>
            </>
          }
          sub="Every prompt in the collection is written like a shot list — camera, light, lens, mood. Watch one assemble itself."
        />

        <motion.div
          ref={panelRef}
          style={{ y: panelY }}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 overflow-hidden rounded-[32px] glass shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
        >
          {/* faux window chrome */}
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-white/15" />
              <span className="h-3 w-3 rounded-full bg-white/15" />
              <span className="h-3 w-3 rounded-full bg-chartreuse/80" />
            </div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
              PROMPT_{String(index + 1).padStart(2, "0")}.TXT — {prompt.model.toUpperCase()}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => step(-1)}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/60 transition-colors duration-300 hover:border-chartreuse/50 hover:text-chartreuse"
                aria-label="Previous prompt"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={() => step(1)}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/10 text-white/60 transition-colors duration-300 hover:border-chartreuse/50 hover:text-chartreuse"
                aria-label="Next prompt"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="grid gap-0 md:grid-cols-[1.1fr_1fr]">
            <div className="p-7 md:p-10">
              <motion.h3
                key={prompt.id + "-title"}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7 }}
                className="font-serif text-4xl md:text-5xl"
              >
                {prompt.title}
              </motion.h3>
              <motion.p
                key={prompt.id + "-desc"}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.12 }}
                className="mt-4 font-light leading-relaxed text-white/55"
              >
                {prompt.description}
              </motion.p>

              <div className="mt-8 flex flex-wrap gap-3">
                <MagneticButton
                  onClick={copy}
                  className="flex items-center gap-2 rounded-full bg-chartreuse px-6 py-3 text-sm font-semibold text-void transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(223,255,79,0.45)]"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </MagneticButton>
                <MagneticButton
                  onClick={() => onToggleFavorite(prompt.id)}
                  className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors duration-300 ${
                    favorites.has(prompt.id)
                      ? "border-chartreuse/60 text-chartreuse"
                      : "border-white/15 text-white/70 hover:border-white/40"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${favorites.has(prompt.id) ? "fill-chartreuse" : ""}`} />
                  {favorites.has(prompt.id) ? "Saved" : "Favorite"}
                </MagneticButton>
                <MagneticButton
                  onClick={() => {
                    setGenerating(true);
                    setTimeout(() => setGenerating(false), 2400);
                  }}
                  className="flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/70 transition-colors duration-300 hover:border-chartreuse/50 hover:text-chartreuse"
                >
                  <Sparkles className={`h-4 w-4 ${generating ? "animate-spin text-chartreuse" : ""}`} />
                  {generating ? "Rendering…" : "Generate"}
                </MagneticButton>
              </div>
            </div>

            {/* terminal pane with typewriter */}
            <div className="relative border-t border-white/8 bg-black/45 p-7 md:border-l md:border-t-0 md:p-10">
              <span className="font-mono text-[10px] tracking-[0.3em] text-chartreuse">
                &gt; FULL PROMPT
              </span>
              <p className="mt-4 min-h-56 font-mono text-[13px] leading-[1.8] text-white/80">
                {typed}
                {inView && !done && <span className="caret" />}
              </p>
              <div className="mt-6 flex items-center justify-between font-mono text-[10px] text-white/35">
                <span>{prompt.prompt.length} CHARS</span>
                <span>{done ? "READY TO RENDER" : "WRITING…"}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
