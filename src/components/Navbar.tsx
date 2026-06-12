import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Clapperboard } from "lucide-react";
import MagneticButton from "./MagneticButton";

const LINKS = [
  { label: "Featured", href: "#featured" },
  { label: "Viewer", href: "#viewer" },
  { label: "Search", href: "#search" },
  { label: "Collection", href: "#collection" },
  { label: "Showcase", href: "#showcase" },
];

export default function Navbar() {
  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.3 });
  // The progress bar only fades in once the hero starts dissolving.
  const barOpacity = useTransform(scrollY, [0, 300], [0, 1]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        className="h-[2px] origin-left bg-chartreuse"
        style={{ scaleX: progress, opacity: barOpacity }}
      />
      <nav className="mx-auto mt-4 flex w-[min(1200px,92vw)] items-center justify-between rounded-2xl px-5 py-3 glass">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-chartreuse">
            <Clapperboard className="h-4.5 w-4.5 text-void" strokeWidth={2.2} />
          </span>
          <span className="font-mono text-sm tracking-[0.2em] text-white">
            PROMPT<span className="text-chartreuse">/</span>CINEMA
          </span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] font-medium text-white/60 transition-colors duration-300 hover:text-chartreuse"
            >
              {l.label}
            </a>
          ))}
        </div>
        <MagneticButton
          className="rounded-full bg-chartreuse px-5 py-2 text-[13px] font-semibold text-void transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(223,255,79,0.4)]"
          onClick={() =>
            document.querySelector("#featured")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          Explore
        </MagneticButton>
      </nav>
    </header>
  );
}
