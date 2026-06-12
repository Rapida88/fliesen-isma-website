import { Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-white/8 py-10">
      <div className="mx-auto flex w-[min(1200px,92vw)] flex-col items-center justify-between gap-5 md:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-chartreuse">
            <Clapperboard className="h-4 w-4 text-void" strokeWidth={2.2} />
          </span>
          <span className="font-mono text-xs tracking-[0.2em] text-white/70">
            PROMPT<span className="text-chartreuse">/</span>CINEMA
          </span>
        </div>
        <p className="font-mono text-[10px] tracking-[0.25em] text-white/30">
          SHOT ENTIRELY ON WORDS — © 2026
        </p>
      </div>
    </footer>
  );
}
