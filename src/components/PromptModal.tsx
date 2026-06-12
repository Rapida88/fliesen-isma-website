import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Heart, Sparkles, X } from "lucide-react";
import type { Prompt } from "../data/prompts";
import { useTypewriter } from "../hooks/useTypewriter";
import MagneticButton from "./MagneticButton";

interface PromptModalProps {
  prompt: Prompt | null;
  onClose: () => void;
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
}

export default function PromptModal({
  prompt,
  onClose,
  favorites,
  onToggleFavorite,
}: PromptModalProps) {
  const [copied, setCopied] = useState(false);
  const [generating, setGenerating] = useState(false);
  const { typed, done } = useTypewriter(prompt?.prompt ?? "", prompt !== null, 10);

  useEffect(() => {
    setCopied(false);
    setGenerating(false);
    if (!prompt) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [prompt, onClose]);

  const copy = async () => {
    if (!prompt) return;
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  const generate = () => {
    setGenerating(true);
    setTimeout(() => setGenerating(false), 2400);
  };

  return (
    <AnimatePresence>
      {prompt && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* blurred cinematic backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/70"
            style={{ backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)" }}
            onClick={onClose}
          />

          <motion.div
            layoutId={`card-${prompt.id}`}
            initial={{ opacity: 0, y: 80, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 60, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 220, damping: 26 }}
            className="relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-[28px] glass-bright"
          >
            {/* header scene */}
            <div className="relative h-52 overflow-hidden rounded-t-[28px] sm:h-64">
              <div className="animated-gradient absolute inset-0" style={{ background: prompt.gradient }} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
              <button
                onClick={onClose}
                className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-white/80 transition-all duration-300 glass-bright hover:rotate-90 hover:text-chartreuse"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-6 flex items-center gap-3">
                <span className="rounded-full px-3 py-1 font-mono text-[10px] tracking-widest glass-bright">
                  {prompt.model.toUpperCase()}
                </span>
                <span className="rounded-full bg-chartreuse px-3 py-1 font-mono text-[10px] font-semibold tracking-widest text-void">
                  {prompt.category.toUpperCase()}
                </span>
                <span className="font-mono text-[10px] text-white/70">{prompt.difficulty}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="font-serif text-4xl sm:text-5xl">{prompt.title}</h3>
              <p className="mt-3 max-w-xl font-light leading-relaxed text-white/55">
                {prompt.description}
              </p>

              {/* full prompt with typewriter reveal */}
              <div className="relative mt-6 rounded-2xl border border-white/10 bg-black/40 p-5">
                <span className="absolute -top-2.5 left-4 bg-[#101208] px-2 font-mono text-[10px] tracking-[0.3em] text-chartreuse">
                  FULL PROMPT
                </span>
                <p className="min-h-28 font-mono text-[13px] leading-relaxed text-white/85">
                  {typed}
                  {!done && <span className="caret" />}
                </p>
              </div>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <MagneticButton
                  onClick={copy}
                  className="flex items-center gap-2 rounded-full bg-chartreuse px-6 py-3 text-sm font-semibold text-void transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(223,255,79,0.45)]"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy Prompt"}
                </MagneticButton>

                <MagneticButton
                  onClick={() => onToggleFavorite(prompt.id)}
                  className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-colors duration-300 ${
                    favorites.has(prompt.id)
                      ? "border-chartreuse/60 text-chartreuse"
                      : "border-white/15 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 transition-transform duration-300 ${
                      favorites.has(prompt.id) ? "scale-110 fill-chartreuse" : ""
                    }`}
                  />
                  {favorites.has(prompt.id) ? "Favorited" : "Favorite"}
                </MagneticButton>

                <MagneticButton
                  onClick={generate}
                  className="group flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white/70 transition-colors duration-300 hover:border-chartreuse/50 hover:text-chartreuse"
                >
                  <Sparkles
                    className={`h-4 w-4 ${generating ? "animate-spin text-chartreuse" : "transition-transform duration-300 group-hover:rotate-12"}`}
                  />
                  {generating ? "Rendering…" : "Generate"}
                </MagneticButton>

                <span className="ml-auto hidden font-mono text-[11px] text-white/35 sm:block">
                  {prompt.stat}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
