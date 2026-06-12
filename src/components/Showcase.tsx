import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Camera, Film, Terminal, Wand2 } from "lucide-react";
import { PROMPTS } from "../data/prompts";

const STORY = PROMPTS[6]; // Tokyo Noir Diner

const STAGES = [
  { icon: Camera, label: "01 / THE STILL", title: "It starts as a frame" },
  { icon: Film, label: "02 / THE MOTION", title: "The frame learns to move" },
  { icon: Terminal, label: "03 / THE PROMPT", title: "The words behind it" },
  { icon: Wand2, label: "04 / THE FILM", title: "And the words become film" },
];

function Stage({
  index,
  progress,
  children,
}: {
  index: number;
  progress: MotionValue<number>;
  children: React.ReactNode;
}) {
  const n = STAGES.length;
  const start = index / n;
  const end = (index + 1) / n;
  const fade = 0.18 / n;

  const opacity = useTransform(
    progress,
    index === 0
      ? [start, end - fade, end]
      : index === n - 1
        ? [start, start + fade, end]
        : [start, start + fade, end - fade, end],
    index === 0 ? [1, 1, 0] : index === n - 1 ? [0, 1, 1] : [0, 1, 1, 0],
  );
  const scale = useTransform(progress, [start, end], [1.04, 0.98]);
  const blur = useTransform(opacity, (o) => `blur(${(1 - o) * 12}px)`);

  return (
    <motion.div
      className="absolute inset-0 grid place-items-center will-change-transform"
      style={{ opacity, scale, filter: blur }}
    >
      {children}
    </motion.div>
  );
}

/** Section 5 — scroll-scrubbed journey: still → motion → prompt → film. */
export default function Showcase() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const stageIndex = useTransform(scrollYProgress, (v) =>
    Math.min(STAGES.length - 1, Math.floor(v * STAGES.length)),
  );

  return (
    <section ref={ref} id="showcase" className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        {/* stage labels */}
        <div className="absolute inset-x-0 top-24 z-20 text-center md:top-28">
          <p className="font-mono text-[11px] tracking-[0.4em] text-chartreuse">
            05 — THE JOURNEY
          </p>
          {STAGES.map((s, i) => {
            return (
              <StageTitle key={i} index={i} stageIndex={stageIndex} title={s.title} label={s.label} />
            );
          })}
        </div>

        {/* canvas */}
        <div className="relative aspect-video w-[min(900px,90vw)] overflow-hidden rounded-3xl glass shadow-[0_60px_140px_rgba(0,0,0,0.7)]">
          {/* Stage 1 — the still: static gradient frame */}
          <Stage index={0} progress={scrollYProgress}>
            <div className="absolute inset-0" style={{ background: STORY.gradient }} />
            <div className="absolute inset-0 bg-black/30" />
            <span className="absolute bottom-5 left-6 font-mono text-[11px] tracking-[0.25em] text-white/70">
              FRAME 001 — STILL IMAGE
            </span>
          </Stage>

          {/* Stage 2 — the motion: same scene, alive */}
          <Stage index={1} progress={scrollYProgress}>
            <div className="animated-gradient absolute inset-0" style={{ background: STORY.gradient }} />
            <div className="orb" style={{ background: "#d00000", width: 360, height: 360, top: "15%", left: "55%", opacity: 0.4 }} />
            <div className="orb" style={{ background: "#52b788", width: 300, height: 300, top: "45%", left: "5%", opacity: 0.35, animationDelay: "3s" }} />
            <div className="absolute inset-0 bg-black/25" />
            <motion.span
              className="absolute right-6 top-5 flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-red-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
            >
              ● REC
            </motion.span>
            <span className="absolute bottom-5 left-6 font-mono text-[11px] tracking-[0.25em] text-white/70">
              FRAME 001–240 — IN MOTION
            </span>
          </Stage>

          {/* Stage 3 — the prompt */}
          <Stage index={2} progress={scrollYProgress}>
            <div className="absolute inset-0 bg-black/85" />
            <div className="relative max-w-xl px-8">
              <span className="font-mono text-[11px] tracking-[0.3em] text-chartreuse">
                &gt; {STORY.model.toUpperCase()} / {STORY.category.toUpperCase()}
              </span>
              <p className="mt-4 font-mono text-[12px] leading-[1.9] text-white/85 md:text-[13px]">
                {STORY.prompt}
              </p>
            </div>
          </Stage>

          {/* Stage 4 — the film: letterboxed result */}
          <Stage index={3} progress={scrollYProgress}>
            <div className="animated-gradient absolute inset-0" style={{ background: STORY.gradient }} />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-x-0 top-0 h-[12%] bg-black" />
            <div className="absolute inset-x-0 bottom-0 h-[12%] bg-black" />
            <div className="absolute inset-x-0 bottom-[14%] text-center">
              <p className="font-serif text-3xl italic text-white md:text-4xl">Tokyo Noir Diner</p>
              <p className="mt-1 font-mono text-[10px] tracking-[0.4em] text-white/60">
                A FILM BY YOU × {STORY.model.toUpperCase()}
              </p>
            </div>
          </Stage>
        </div>

        {/* vertical progress dots */}
        <div className="absolute right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-3 md:right-12">
          {STAGES.map((_, i) => (
            <StageDot key={i} index={i} stageIndex={stageIndex} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StageTitle({
  index,
  stageIndex,
  title,
  label,
}: {
  index: number;
  stageIndex: MotionValue<number>;
  title: string;
  label: string;
}) {
  const opacity = useTransform(stageIndex, (v) => (v === index ? 1 : 0));
  const y = useTransform(stageIndex, (v) => (v === index ? 0 : 14));
  return (
    <motion.div className="absolute inset-x-0 top-8 mx-auto w-[80vw]" style={{ opacity, y }}>
      <p className="font-mono text-[10px] tracking-[0.35em] text-white/40">{label}</p>
      <h3 className="mt-1 font-serif text-3xl md:text-4xl">{title}</h3>
    </motion.div>
  );
}

function StageDot({ index, stageIndex }: { index: number; stageIndex: MotionValue<number> }) {
  const scale = useTransform(stageIndex, (v) => (v === index ? 1 : 0.55));
  const bg = useTransform(stageIndex, (v) =>
    v === index ? "#DFFF4F" : "rgba(255,255,255,0.25)",
  );
  return <motion.span className="h-2.5 w-2.5 rounded-full" style={{ scale, backgroundColor: bg }} />;
}
