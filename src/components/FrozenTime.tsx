import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Orbit, Snowflake } from "lucide-react";
import { PROMPTS } from "../data/prompts";
import SectionHeading from "./SectionHeading";

const HERO = PROMPTS.find((p) => p.id === "frozen-shibuya")!;

/** The five blocks that make up a single-prompt freeze, with the Shibuya snippet for each. */
const ANATOMY = [
  {
    tag: "SUBJECT",
    color: "#22d3ee",
    note: "Name everything in frame — and call each element “frozen”, “suspended” or “hovering”.",
    text: "frozen pedestrians in colorful raincoats, stopped cars, hovering raindrops, birds suspended mid-flight",
  },
  {
    tag: "ACTION",
    color: "#f72585",
    note: "The whole trick. One unambiguous instruction that the world does not move.",
    text: "stays perfectly frozen with absolute zero motion from any element",
  },
  {
    tag: "ENVIRONMENT",
    color: "#dfff4f",
    note: "Light, weather and atmosphere — what makes the frozen instant feel real.",
    text: "rainy Shibuya crossing at twilight, neon reflections on wet pavement, soft volumetric fog",
  },
  {
    tag: "CAMERA",
    color: "#9d8bff",
    note: "The only thing allowed to move. Orbit, dolly-zoom, crane — give it energy.",
    text: "high-energy dynamic orbiting dolly zoom weaving between every frozen object",
  },
  {
    tag: "STYLE",
    color: "#f4a261",
    note: "Finish and grade, then lock it with “smooth motion, stable framing”.",
    text: "hyper-realistic, cinematic, dramatic lighting · smooth motion, stable framing",
  },
];

/** Deterministic pseudo-random so the frozen droplets never reflow between renders. */
function frozenDroplets(count: number) {
  let seed = 1337;
  const rand = () => {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    return seed / 0x7fffffff;
  };
  return Array.from({ length: count }, () => ({
    left: rand() * 100,
    top: rand() * 100,
    h: 6 + rand() * 14,
    o: 0.25 + rand() * 0.5,
  }));
}

export default function FrozenTime() {
  const [copied, setCopied] = useState(false);
  const droplets = useMemo(() => frozenDroplets(46), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(HERO.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="frozen" className="relative py-36 md:py-48">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <SectionHeading
          kicker="06 — FROZEN TIME"
          title={
            <>
              One prompt that freezes <em className="not-italic italic text-chartreuse">the world</em>
            </>
          }
          sub="Seedance 2.0 is uncannily good at bullet-time: a single prompt locks every pedestrian, raindrop and spark in place while the camera alone flies through the moment — no keyframes, no editing, one continuous shot."
        />

        {/* the freeze, demonstrated */}
        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-[1.05fr_1fr]">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative aspect-video overflow-hidden rounded-[28px] glass shadow-[0_40px_120px_rgba(0,0,0,0.6)]"
          >
            {/* the world — deliberately static, not an animated gradient */}
            <div className="absolute inset-0" style={{ background: HERO.gradient }} />
            <div className="absolute inset-0 bg-black/35" />

            {/* suspended raindrops, perfectly still */}
            {droplets.map((d, i) => (
              <span
                key={i}
                className="absolute w-[2px] rounded-full bg-white"
                style={{
                  left: `${d.left}%`,
                  top: `${d.top}%`,
                  height: d.h,
                  opacity: d.o,
                  transform: "rotate(12deg)",
                }}
              />
            ))}

            {/* frozen crowd silhouettes along the crossing */}
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-center gap-2 px-6 pb-5">
              {[20, 34, 26, 40, 30, 22, 36, 28, 32].map((h, i) => (
                <span
                  key={i}
                  className="w-3 rounded-t-full bg-black/55"
                  style={{ height: h }}
                />
              ))}
            </div>

            {/* the ONLY moving element — an orbiting camera reticle */}
            <div className="absolute inset-0 grid place-items-center">
              <motion.div
                className="relative h-2 w-2"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <motion.div
                  className="absolute"
                  style={{ left: "min(34vw, 240px)", top: 0 }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
                >
                  <div className="relative h-16 w-16 -translate-x-1/2 -translate-y-1/2">
                    {/* corner brackets */}
                    <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-chartreuse" />
                    <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-chartreuse" />
                    <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-chartreuse" />
                    <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-chartreuse" />
                    <span className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-chartreuse" />
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* HUD */}
            <span className="absolute left-5 top-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-cyan-300">
              <Snowflake className="h-3.5 w-3.5" /> WORLD · FROZEN
            </span>
            <motion.span
              className="absolute right-5 top-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-chartreuse"
              animate={{ opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            >
              <Orbit className="h-3.5 w-3.5" /> CAMERA · LIVE
            </motion.span>
            <span className="absolute bottom-5 left-5 font-mono text-[10px] tracking-[0.3em] text-white/70">
              00:00:00 — ONE CONTINUOUS SHOT
            </span>
          </motion.div>

          {/* the prompt, taken apart */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col rounded-[28px] glass p-7 md:p-9"
          >
            <span className="font-mono text-[10px] tracking-[0.3em] text-chartreuse">
              &gt; ANATOMY OF A SINGLE-PROMPT FREEZE
            </span>
            <div className="mt-5 space-y-4">
              {ANATOMY.map((b) => (
                <div key={b.tag} className="border-l-2 pl-4" style={{ borderColor: b.color }}>
                  <span
                    className="font-mono text-[11px] tracking-[0.25em]"
                    style={{ color: b.color }}
                  >
                    [{b.tag}]
                  </span>
                  <p className="mt-1 text-[13px] font-light leading-relaxed text-white/75">
                    {b.text}
                  </p>
                  <p className="mt-1 text-[11px] font-light leading-relaxed text-white/40">
                    {b.note}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* the full hero prompt + copy */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 overflow-hidden rounded-[28px] glass"
        >
          <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/45">
              FROZEN_SHIBUYA.TXT — SEEDANCE 2.0
            </span>
            <button
              onClick={copy}
              className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-white/70 transition-colors duration-300 hover:border-chartreuse/50 hover:text-chartreuse"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "COPIED" : "COPY PROMPT"}
            </button>
          </div>
          <p className="bg-black/40 p-7 font-mono text-[12px] leading-[1.9] text-white/80 md:text-[13px]">
            {HERO.prompt}
          </p>
        </motion.div>

        {/* why Seedance 2.0 nails it */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            {
              k: "ZERO DRIFT",
              t: "Frozen means frozen",
              d: "“absolute zero motion from any element” holds faces, fabric and droplets locked — none of the micro-jitter that betrays other models.",
            },
            {
              k: "CAMERA-ONLY MOTION",
              t: "It separates world from lens",
              d: "Seedance 2.0 reads [Camera] as the sole moving actor, so an orbit or dolly-zoom sweeps a dead-still scene cleanly.",
            },
            {
              k: "ONE CONTINUOUS SHOT",
              t: "No cuts, no keyframes",
              d: "The whole bullet-time move renders from a single prompt — one unbroken take instead of stitched clips.",
            },
          ].map((c, i) => (
            <motion.div
              key={c.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl glass p-6"
            >
              <span className="font-mono text-[10px] tracking-[0.3em] text-chartreuse">{c.k}</span>
              <h4 className="mt-3 font-serif text-2xl">{c.t}</h4>
              <p className="mt-2 text-[13px] font-light leading-relaxed text-white/50">{c.d}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
