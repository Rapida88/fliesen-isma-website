import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  CATEGORIES,
  MODELS,
  PROMPTS,
  type Category,
  type Model,
  type Prompt,
} from "../data/prompts";
import PromptCard from "./PromptCard";
import SectionHeading from "./SectionHeading";

interface SearchSectionProps {
  onOpen: (p: Prompt) => void;
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.94 }}
      className={`rounded-full border px-4 py-2 text-[13px] font-medium transition-colors duration-300 ${
        active
          ? "border-chartreuse bg-chartreuse text-void shadow-[0_0_24px_rgba(223,255,79,0.35)]"
          : "border-white/12 text-white/60 hover:border-white/35 hover:text-white"
      }`}
    >
      {label}
    </motion.button>
  );
}

export default function SearchSection({ onOpen }: SearchSectionProps) {
  const [query, setQuery] = useState("");
  const [models, setModels] = useState<Set<Model>>(new Set());
  const [categories, setCategories] = useState<Set<Category>>(new Set());

  const toggle = <T,>(set: Set<T>, value: T, apply: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    apply(next);
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (models.size && !models.has(p.model)) return false;
      if (categories.size && !categories.has(p.category)) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.prompt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [query, models, categories]);

  const hasFilters = query.trim() !== "" || models.size > 0 || categories.size > 0;

  return (
    <section id="search" className="relative py-36 md:py-48">
      <div className="mx-auto w-[min(1200px,92vw)]">
        <SectionHeading
          align="center"
          kicker="03 — SEARCH"
          title={
            <>
              Find your next <em className="not-italic italic text-chartreuse">scene</em>
            </>
          }
          sub="Filter the collection by model and genre. Results respond in real time."
        />

        {/* floating search bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-14 max-w-2xl"
        >
          <div className="group flex items-center gap-4 rounded-2xl px-6 py-5 glass-bright transition-shadow duration-500 focus-within:shadow-[0_0_60px_rgba(223,255,79,0.12)]">
            <Search className="h-5 w-5 shrink-0 text-white/40 transition-colors duration-300 group-focus-within:text-chartreuse" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search prompts, moods, camera moves…"
              className="w-full bg-transparent text-[15px] text-white placeholder:text-white/30 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-white/40 transition-colors hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* filters */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-10 space-y-5"
        >
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="mr-2 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-white/35">
              <SlidersHorizontal className="h-3.5 w-3.5" /> MODEL
            </span>
            {MODELS.map((m) => (
              <FilterChip
                key={m}
                label={m}
                active={models.has(m)}
                onClick={() => toggle(models, m, setModels)}
              />
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="mr-2 font-mono text-[10px] tracking-[0.3em] text-white/35">GENRE</span>
            {CATEGORIES.map((c) => (
              <FilterChip
                key={c}
                label={c}
                active={categories.has(c)}
                onClick={() => toggle(categories, c, setCategories)}
              />
            ))}
          </div>
        </motion.div>

        {/* results */}
        <div className="mt-14 flex min-h-[300px] flex-wrap justify-center gap-6">
          <AnimatePresence mode="popLayout">
            {results.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -20 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
              >
                <PromptCard prompt={p} onOpen={onOpen} />
              </motion.div>
            ))}
          </AnimatePresence>

          {results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid place-items-center py-20 text-center"
            >
              <p className="font-serif text-3xl text-white/60">No scenes found.</p>
              <button
                onClick={() => {
                  setQuery("");
                  setModels(new Set());
                  setCategories(new Set());
                }}
                className="mt-4 font-mono text-xs tracking-[0.2em] text-chartreuse hover:underline"
              >
                RESET FILTERS
              </button>
            </motion.div>
          )}
        </div>

        {hasFilters && results.length > 0 && (
          <p className="mt-10 text-center font-mono text-[11px] tracking-[0.25em] text-white/35">
            {results.length} {results.length === 1 ? "RESULT" : "RESULTS"}
          </p>
        )}
      </div>
    </section>
  );
}
