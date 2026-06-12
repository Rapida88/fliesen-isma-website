import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SCENES = [
  {
    base: "radial-gradient(120% 90% at 70% 20%, #1c0533 0%, #050505 60%)",
    orbs: [
      { c: "#c9184a", w: 520, t: "8%", l: "55%", d: 0 },
      { c: "#3b0a59", w: 640, t: "45%", l: "5%", d: 4 },
    ],
  },
  {
    base: "radial-gradient(120% 90% at 30% 80%, #03304e 0%, #050505 60%)",
    orbs: [
      { c: "#0077b6", w: 600, t: "50%", l: "50%", d: 2 },
      { c: "#48cae4", w: 380, t: "10%", l: "15%", d: 6 },
    ],
  },
  {
    base: "radial-gradient(120% 90% at 50% 10%, #3a1402 0%, #050505 60%)",
    orbs: [
      { c: "#e85d04", w: 560, t: "15%", l: "40%", d: 1 },
      { c: "#6a040f", w: 620, t: "55%", l: "0%", d: 5 },
    ],
  },
  {
    base: "radial-gradient(120% 90% at 80% 70%, #112d1e 0%, #050505 60%)",
    orbs: [
      { c: "#2d6a4f", w: 580, t: "40%", l: "55%", d: 3 },
      { c: "#dfff4f", w: 300, t: "8%", l: "25%", d: 7 },
    ],
  },
];

/**
 * Stand-in for the hero's AI-video montage: full-bleed animated light fields
 * that crossfade between cinematic "scenes" on a timer.
 */
export default function SceneBackdrop({ interval = 6000 }: { interval?: number }) {
  const [scene, setScene] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setScene((s) => (s + 1) % SCENES.length), interval);
    return () => clearInterval(id);
  }, [interval]);

  const s = SCENES[scene];

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={scene}
          className="absolute inset-0"
          style={{ background: s.base }}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        >
          {s.orbs.map((o, i) => (
            <div
              key={i}
              className="orb"
              style={{
                background: o.c,
                width: o.w,
                height: o.w,
                top: o.t,
                left: o.l,
                opacity: 0.32,
                animationDelay: `${o.d}s`,
              }}
            />
          ))}
        </motion.div>
      </AnimatePresence>
      {/* vignette to keep edges cinematic */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(5,5,5,0.85) 100%)",
        }}
      />
    </div>
  );
}
