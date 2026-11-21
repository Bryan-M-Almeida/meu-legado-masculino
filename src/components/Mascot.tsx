import { mirror, P, Sprite, type Palette } from "./Sprite";

/**
 * Léo, o mascote.
 * Um leão de coroa: o rei que cuida do próprio bando (em inglês, "pride" é
 * tanto o grupo de leões quanto orgulho). Segura um controle porque legado
 * também se constrói no sofá, jogando com quem você ama.
 */

const palette: Palette = {
  k: P.ink,
  g: P.gold,
  G: P.sunset,
  r: P.crimson,
  b: P.blue,
  B: P.navy,
  m: P.sunset,
  M: P.crimson,
  f: P.gold,
  w: P.white,
  c: P.charcoal,
  s: P.slate,
  l: P.lime,
};

// Metade esquerda de cada linha (12 colunas). A direita é espelhada.
const half = [
  "........k..k",
  ".......kgkkg",
  ".......kgggg",
  ".......kgrgb",
  "....kkkkGGGG",
  "...kmmmkkkkk",
  "..kmMmmmmmmm",
  ".kmMmmmmmmmm",
  ".kmMmmkkkkkk",
  "kmMmmkffffff",
  "kmMmkfffffff",
  "kmMmkffwkfff",
  "kmMmkffkkfff",
  "kmMmkfffffff",
  "kmMmkffffwww",
  "kmMmkfffwwkk",
  ".kmMkfffwwwk",
  ".kmMmkffwwww",
  "..kmMmkfffff",
  "...kmmmkkkkk",
  "...kkbbbbbbb",
  "..kbbbbbbbgg",
  "..kbbkkkkkkk",
  "..kbkffccccc",
  "..kbkffccccc",
  "..kbkffccccc",
  "..kbbkkkkkkk",
  "..kkkkkkkkkk",
];

/** Troca pixels específicos depois do espelhamento (detalhes assimétricos). */
function patch(rows: string[], cells: [x: number, y: number, c: string][]) {
  const out = rows.map((r) => [...r]);
  for (const [x, y, c] of cells) out[y][x] = c;
  return out.map((r) => r.join(""));
}

const base = patch(mirror(half), [
  // direcional à esquerda
  [8, 23, "k"], [7, 24, "k"], [8, 24, "k"], [9, 24, "k"], [8, 25, "k"],
  // botões à direita
  [15, 23, "r"], [16, 24, "l"], [14, 24, "l"], [15, 25, "r"],
]);

// Quadro de piscar: olhos fechados (linha fina).
const blink = base.map((row, y) => {
  if (y === 11) return row.replace(/wk/, "ff").replace(/kw/, "ff");
  if (y === 12) return row;
  return ".".repeat(row.length);
});
const blinkOnly = blink.map((row, y) => (y === 11 ? row.replace(/[^f]/g, ".") : row));

export function Mascot({ scale = 8, className = "" }: { scale?: number; className?: string }) {
  return (
    <span className={`mascot ${className}`} style={{ width: 24 * scale, height: 28 * scale }}>
      <Sprite rows={base} palette={palette} scale={scale} title="Léo, o leão de coroa mascote do Meu Legado Masculino" />
      <Sprite rows={blinkOnly} palette={palette} scale={scale} className="mascot-blink" />
    </span>
  );
}

/** Só a cabeça do Léo (linhas 0–19), para logo e avatar. */
export function MascotHead({ scale = 2, className = "" }: { scale?: number; className?: string }) {
  return <Sprite rows={base.slice(0, 20)} palette={palette} scale={scale} className={className} />;
}
