import { useEffect, useRef } from "react";
import { animate, motion, useInView } from "framer-motion";
import SectionHeading from "./SectionHeading";

interface MetricProps {
  to: number;
  prefix?: string;
  suffix?: string;
  display?: string;
  label: string;
  delay?: number;
}

function Metric({ to, suffix = "", display, label, delay = 0 }: MetricProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inView = useInView(wrapRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView || !ref.current || display) return;
    const el = ref.current;
    const controls = animate(0, to, {
      duration: 2.2,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = Math.round(v).toLocaleString("en-US");
      },
    });
    return () => controls.stop();
  }, [inView, to, delay, display]);

  return (
    <motion.div
      ref={wrapRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl p-8 text-center glass transition-shadow duration-500 hover:shadow-[0_0_60px_rgba(223,255,79,0.1)] md:p-12"
    >
      <div className="pointer-events-none absolute -top-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-chartreuse/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-40" />
      <p className="font-serif text-[clamp(2.8rem,6vw,5.5rem)] leading-none text-white">
        {display ? (
          <span className="italic text-chartreuse text-glow">{display}</span>
        ) : (
          <>
            <span ref={ref}>0</span>
            <span className="text-chartreuse">{suffix}</span>
          </>
        )}
      </p>
      <p className="mt-4 font-mono text-[11px] tracking-[0.35em] text-white/45">{label}</p>
    </motion.div>
  );
}

export default function Metrics() {
  return (
    <section className="relative py-36 md:py-48">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <SectionHeading
          align="center"
          kicker="06 — THE PROOF"
          title={
            <>
              A community that <em className="not-italic italic text-chartreuse">ships films</em>
            </>
          }
        />
        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <Metric to={250000} suffix="+" label="PROMPTS GENERATED" delay={0} />
          <Metric to={50000} suffix="+" label="CREATORS" delay={0.15} />
          <Metric to={0} display="Millions" label="OF AI VIDEOS CREATED" delay={0.3} />
        </div>
      </div>
    </section>
  );
}
