"use client";

import { useEffect, useState } from "react";

/**
 * Caixa de diálogo de RPG: o texto aparece letra por letra e o botão
 * avança para a próxima fala. Com "reduzir movimento" ligado, o texto
 * aparece inteiro de uma vez.
 */
export function DialogBox({ speaker, lines }: { speaker: string; lines: string[] }) {
  const [i, setI] = useState(0);
  // Quantas letras da fala `line` já apareceram. Ao trocar de fala, `line`
  // deixa de bater com `i` e a contagem volta a zero sem precisar de reset.
  const [typed, setTyped] = useState({ line: 0, n: 0 });
  const text = lines[i];
  const shown = typed.line === i ? typed.n : 0;
  const done = shown >= text.length;

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setInterval(() => {
      setTyped((s) => {
        const n = reduced ? text.length : (s.line === i ? s.n : 0) + 1;
        if (n >= text.length) clearInterval(t);
        return { line: i, n: Math.min(n, text.length) };
      });
    }, reduced ? 0 : 28);
    return () => clearInterval(t);
  }, [i, text]);

  const next = () => {
    if (!done) return setTyped({ line: i, n: text.length });
    setI((n) => (n + 1) % lines.length);
  };

  return (
    <div className="relative">
      <p className="absolute -top-4 left-4 z-10 tag bg-gold text-ink border-[3px] border-ink">{speaker}</p>
      <div className="bg-ink text-paper border-[3px] border-ink px-cut px-6 pt-7 pb-5" style={{ boxShadow: "inset 0 0 0 3px #f4f4f4" }}>
        {/* Texto completo para leitores de tela; a versão animada é só visual */}
        <p className="sr-only" aria-live="polite">{text}</p>
        <p aria-hidden className="font-pixel text-xl sm:text-2xl leading-snug min-h-[4.5em]">
          {text.slice(0, shown)}
          {done && <span className="caret" />}
        </p>
        <div className="mt-3 flex items-center justify-between gap-4">
          <span className="text-sm text-mist" aria-hidden>
            {i + 1}/{lines.length}
          </span>
          <button type="button" onClick={next} className="font-pixel text-gold hover:text-white underline-offset-4 hover:underline">
            {done ? (i === lines.length - 1 ? "Ouvir de novo" : "Próxima fala") : "Pular"}
          </button>
        </div>
      </div>
    </div>
  );
}
