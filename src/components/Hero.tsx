import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import SceneBackdrop from "./SceneBackdrop";
import MagneticButton from "./MagneticButton";

const LINE_1 = "AI VIDEO PROMPTS";
const LINE_2 = "THAT CREATE MOVIES";

/** One headline letter that drifts apart and dissolves as the user scrolls. */
function DissolvingLetter({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  // Letters scatter outward from the center of the line, each on its own vector.
  const fromCenter = (index - (total - 1) / 2) / total;
  const seed = Math.sin(index * 12.9898) * 43758.5453;
  const jitter = seed - Math.floor(seed); // deterministic pseudo-random 0..1

  const x = useTransform(progress, [0, 1], [0, fromCenter * 380]);
  const y = useTransform(progress, [0, 1], [0, (jitter - 0.5) * 260]);
  const rotate = useTransform(progress, [0, 1], [0, (jitter - 0.5) * 50]);
  const opacity = useTransform(progress, [0, 0.25 + jitter * 0.5, 1], [1, 1, 0]);
  const blur = useTransform(progress, (v) => `blur(${v * 14}px)`);

  return (
    <motion.span
      className="inline-block will-change-transform"
      style={{ x, y, rotate, opacity, filter: blur }}
      initial={{ opacity: 0, y: 90, rotateX: 60 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.35 + index * 0.028, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {char === " " ? " " : char}
    </motion.span>
  );
}

function HeadlineLine({
  text,
  progress,
  italicWord,
}: {
  text: string;
  progress: MotionValue<number>;
  italicWord?: string;
}) {
  const words = text.split(" ");
  let letterIndex = 0;
  const total = text.length;

  return (
    <span className="block">
      {words.map((word, wi) => {
        const start = letterIndex;
        letterIndex += word.length + 1;
        const italic = word === italicWord;
        return (
          <span
            key={wi}
            className={`inline-block whitespace-nowrap ${wi < words.length - 1 ? "mr-[0.26em]" : ""} ${italic ? "italic text-chartreuse text-glow" : ""}`}
          >
            {word.split("").map((char, ci) => (
              <DissolvingLetter
                key={ci}
                char={char}
                index={start + ci}
                total={total}
                progress={progress}
              />
            ))}
          </span>
        );
      })}
    </span>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scrub the dissolve across the first 70% of the hero's exit.
  const dissolve = useTransform(scrollYProgress, [0.05, 0.7], [0, 1], { clamp: true });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const bgOpacity = useTransform(scrollYProgress, [0.4, 0.95], [1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.05, 0.3], [1, 0]);
  const subY = useTransform(scrollYProgress, [0.05, 0.3], [0, -50]);

  return (
    <section ref={ref} id="top" className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ scale: bgScale, opacity: bgOpacity }}>
          <SceneBackdrop />
        </motion.div>

        <div className="relative z-10 flex flex-col items-center px-6 text-center" style={{ perspective: 900 }}>
          <motion.div style={{ opacity: subOpacity }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className="mb-8 flex items-center gap-3 rounded-full px-5 py-2 font-mono text-[11px] tracking-[0.3em] text-chartreuse glass"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-chartreuse" />
              THE 2026 COLLECTION
            </motion.p>
          </motion.div>

          <h1 className="font-serif text-[clamp(3rem,9.5vw,9rem)] leading-[0.95] tracking-tight">
            <HeadlineLine text={LINE_1} progress={dissolve} italicWord="PROMPTS" />
            <HeadlineLine text={LINE_2} progress={dissolve} italicWord="MOVIES" />
          </h1>

          <motion.div style={{ opacity: subOpacity, y: subY }}>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.9 }}
              className="mt-8 max-w-xl text-balance text-lg font-light text-white/55"
            >
              The prompts behind thousands of cinematic AI creations.
            </motion.p>
          </motion.div>

          <motion.div style={{ opacity: subOpacity }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.55, duration: 0.9 }}
              className="mt-12"
            >
              <MagneticButton
                className="group flex items-center gap-3 rounded-full bg-chartreuse px-9 py-4 text-[15px] font-semibold text-void transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(223,255,79,0.5)]"
                onClick={() =>
                  document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Play className="h-4 w-4 fill-void transition-transform duration-300 group-hover:scale-125" />
                Explore The Collection
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: subOpacity }}
          className="absolute bottom-10 z-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
            className="flex flex-col items-center gap-3 text-white/40"
          >
            <span className="font-mono text-[10px] tracking-[0.35em]">SCROLL TO BEGIN</span>
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
              <ArrowDown className="h-4 w-4" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
