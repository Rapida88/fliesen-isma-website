import { useEffect, useState } from "react";

/** Reveals `text` character-by-character once `active` becomes true. */
export function useTypewriter(text: string, active: boolean, speed = 12) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
    if (!active) return;
    let i = 0;
    const id = setInterval(() => {
      // Type in small bursts so long prompts stay snappy.
      i = Math.min(i + 2, text.length);
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, active, speed]);

  return { typed: text.slice(0, count), done: count >= text.length };
}
