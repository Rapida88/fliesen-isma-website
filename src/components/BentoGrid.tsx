import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Crown, Flame, Rocket, Sparkles, Star, TrendingUp } from "lucide-react";
import { PROMPTS } from "../data/prompts";
import SectionHeading from "./SectionHeading";

interface TileProps {
  className?: string;
  children: ReactNode;
  delay?: number;
}

function Tile({ className = "", children, delay = 0 }: TileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative overflow-hidden rounded-3xl glass transition-shadow duration-500 hover:shadow-[0_0_50px_rgba(223,255,79,0.08)] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function TileLabel({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <span className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-chartreuse">
      {icon}
      {text}
    </span>
  );
}

export default function BentoGrid() {
  return (
    <section id="collection" className="relative py-36 md:py-48">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <SectionHeading
          kicker="04 — THE COLLECTION"
          title={
            <>
              Curated like a <em className="not-italic italic text-chartreuse">film festival</em>
            </>
          }
          sub="Six living shelves. Every tile breathes."
        />

        <div className="mt-16 grid auto-rows-[170px] grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {/* Most Popular — large tile with marquee of titles */}
          <Tile className="col-span-2 row-span-2" delay={0}>
            <div
              className="animated-gradient absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-40"
              style={{ background: PROMPTS[11].gradient }}
            />
            <div className="relative flex h-full flex-col justify-between p-7">
              <TileLabel icon={<Crown className="h-3.5 w-3.5" />} text="MOST POPULAR" />
              <div>
                <h3 className="font-serif text-4xl md:text-5xl">Dune Caravan</h3>
                <p className="mt-2 text-sm font-light text-white/55">
                  602K generations and counting. The shot that made everyone believe.
                </p>
              </div>
              <div className="overflow-hidden whitespace-nowrap font-mono text-[11px] text-white/30 [mask-image:linear-gradient(90deg,transparent,#000_15%,#000_85%,transparent)]">
                <div className="marquee inline-block">
                  {[...PROMPTS, ...PROMPTS].map((p, i) => (
                    <span key={i} className="mx-4">
                      {p.title.toUpperCase()} · {p.stat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Tile>

          {/* Newest */}
          <Tile className="col-span-1 row-span-1" delay={0.08}>
            <div
              className="animated-gradient absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-45"
              style={{ background: PROMPTS[5].gradient }}
            />
            <div className="relative flex h-full flex-col justify-between p-5">
              <TileLabel icon={<Sparkles className="h-3.5 w-3.5" />} text="NEWEST" />
              <h3 className="font-serif text-2xl">Midnight Couture</h3>
            </div>
          </Tile>

          {/* Trending — animated pulse */}
          <Tile className="col-span-1 row-span-2" delay={0.14}>
            <div
              className="animated-gradient absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-45"
              style={{ background: PROMPTS[0].gradient }}
            />
            <div className="relative flex h-full flex-col justify-between p-5">
              <TileLabel icon={<TrendingUp className="h-3.5 w-3.5" />} text="TRENDING" />
              {/* live "equalizer" bars */}
              <div className="flex h-20 items-end gap-1.5">
                {[0.4, 0.8, 0.55, 1, 0.7, 0.9, 0.5, 0.75].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-full rounded-t bg-chartreuse/70"
                    animate={{ scaleY: [h, h * 0.45, h] }}
                    style={{ height: "100%", originY: 1 }}
                    transition={{
                      duration: 1.4 + i * 0.18,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
              <div>
                <h3 className="font-serif text-2xl">Neon Rain Chase</h3>
                <p className="mt-1 font-mono text-[10px] text-white/40">+412% THIS WEEK</p>
              </div>
            </div>
          </Tile>

          {/* Staff Picks */}
          <Tile className="col-span-1 row-span-1" delay={0.2}>
            <div
              className="animated-gradient absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-45"
              style={{ background: PROMPTS[1].gradient }}
            />
            <div className="relative flex h-full flex-col justify-between p-5">
              <TileLabel icon={<Star className="h-3.5 w-3.5" />} text="STAFF PICKS" />
              <h3 className="font-serif text-2xl">The Last Glacier</h3>
            </div>
          </Tile>

          {/* Hollywood Style — wide */}
          <Tile className="col-span-2 row-span-1" delay={0.26}>
            <div
              className="animated-gradient absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-45"
              style={{ background: PROMPTS[9].gradient }}
            />
            {/* letterbox bars slide in on hover */}
            <div className="absolute inset-x-0 top-0 h-0 bg-black transition-all duration-500 group-hover:h-5" />
            <div className="absolute inset-x-0 bottom-0 h-0 bg-black transition-all duration-500 group-hover:h-5" />
            <div className="relative flex h-full items-end justify-between p-6">
              <div>
                <TileLabel icon={<Flame className="h-3.5 w-3.5" />} text="HOLLYWOOD STYLE" />
                <h3 className="mt-2 font-serif text-3xl">Monaco Heist</h3>
              </div>
              <span className="font-mono text-[10px] text-white/40">2.39:1</span>
            </div>
          </Tile>

          {/* Viral Concepts — wide */}
          <Tile className="col-span-2 row-span-1" delay={0.32}>
            <div
              className="animated-gradient absolute inset-0 opacity-25 transition-opacity duration-700 group-hover:opacity-45"
              style={{ background: PROMPTS[7].gradient }}
            />
            <div className="relative flex h-full items-end justify-between p-6">
              <div>
                <TileLabel icon={<Rocket className="h-3.5 w-3.5" />} text="VIRAL CONCEPTS" />
                <h3 className="mt-2 font-serif text-3xl">Gravity Drop</h3>
              </div>
              <motion.span
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                className="rounded-full px-3 py-1 font-mono text-[10px] text-chartreuse glass-bright"
              >
                97% SHARE RATE
              </motion.span>
            </div>
          </Tile>
        </div>
      </div>
    </section>
  );
}
