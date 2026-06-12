import { useCallback, useState } from "react";
import type { Prompt } from "./data/prompts";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedPrompts from "./components/FeaturedPrompts";
import PromptViewer from "./components/PromptViewer";
import SearchSection from "./components/SearchSection";
import BentoGrid from "./components/BentoGrid";
import Showcase from "./components/Showcase";
import Metrics from "./components/Metrics";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";
import PromptModal from "./components/PromptModal";

export default function App() {
  const [active, setActive] = useState<Prompt | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const closeModal = useCallback(() => setActive(null), []);

  return (
    <div className="relative bg-void text-white">
      <div className="grain" aria-hidden />
      <Navbar />
      <main>
        <Hero />
        <FeaturedPrompts onOpen={setActive} />
        <PromptViewer favorites={favorites} onToggleFavorite={toggleFavorite} />
        <SearchSection onOpen={setActive} />
        <BentoGrid />
        <Showcase />
        <Metrics />
        <FinalCTA />
      </main>
      <Footer />
      <PromptModal
        prompt={active}
        onClose={closeModal}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
