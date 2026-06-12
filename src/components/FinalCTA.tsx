import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";

function Particles({ count = 26 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        size: 2 + ((i * 13) % 4),
        duration: 9 + ((i * 7) % 10),
        delay: -((i * 11) % 14),
        opacity: 0.15 + ((i * 17) % 40) / 100,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-chartreuse"
          style={{ left: p.left, width: p.size, height: p.size, opacity: p.opacity }}
          initial={{ y: "110vh" }}
          animate={{ y: "-10vh" }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [80, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden py-40 md:py-56">
      {/* animated backdrop */}
      <div
        className="animated-gradient absolute inset-0 opacity-30"
        style={{
          background:
            "linear-gradient(120deg, #050505 0%, #1a2402 30%, #3a4d08 50%, #1a2402 70%, #050505 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(223,255,79,0.12), transparent 70%)",
        }}
      />
      <Particles />

      <motion.div style={{ scale, y }} className="relative mx-auto w-[min(1100px,92vw)] text-center">
        <p className="font-mono text-[11px] tracking-[0.45em] text-chartreuse">07 — ROLL CAMERA</p>
        <h2 className="mt-8 font-serif text-[clamp(3rem,9vw,8.5rem)] leading-[0.95] tracking-tight">
          YOUR NEXT FILM
          <br />
          STARTS WITH A{" "}
          <em className="not-italic italic text-chartreuse text-glow">PROMPT.</em>
        </h2>
        <p className="mx-auto mt-8 max-w-md text-balance font-light text-white/50">
          Every frame in this collection began as a sentence. Write yours.
        </p>
        <div className="mt-14 flex justify-center">
          <MagneticButton
            strength={0.45}
            className="group flex items-center gap-3 rounded-full bg-chartreuse px-12 py-5 text-lg font-semibold text-void transition-shadow duration-500 hover:shadow-[0_0_90px_rgba(223,255,79,0.55)]"
            onClick={() => document.querySelector("#top")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Creating
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>
        </div>
      </motion.div>
    </section>
  );
}
