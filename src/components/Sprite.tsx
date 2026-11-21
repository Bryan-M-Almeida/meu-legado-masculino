/**
 * Desenha pixel art a partir de uma matriz de caracteres.
 * Cada caractere é uma cor da paleta; "." é transparente.
 * Pixels vizinhos da mesma cor viram um único <rect> (SVG menor).
 */

export type Palette = Record<string, string>;

export const P = {
  ink: "#1a1c2c",
  plum: "#5d275d",
  crimson: "#b13e53",
  sunset: "#ef7d57",
  gold: "#ffcd75",
  lime: "#a7f070",
  green: "#38b764",
  teal: "#257179",
  navy: "#29366f",
  blue: "#3b5dc9",
  sky: "#41a6f6",
  cyan: "#73eff7",
  white: "#f4f4f4",
  mist: "#94b0c2",
  slate: "#566c86",
  charcoal: "#333c57",
} as const;

/** Espelha meias-linhas (metade esquerda) para formar um sprite simétrico. */
export const mirror = (half: string[]) => half.map((r) => r + [...r].reverse().join(""));

interface SpriteProps {
  rows: string[];
  palette: Palette;
  /** Tamanho de cada pixel em px na tela. */
  scale?: number;
  className?: string;
  title?: string;
}

export function Sprite({ rows, palette, scale = 4, className, title }: SpriteProps) {
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  const rects: React.ReactNode[] = [];
  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const c = row[x];
      let run = 1;
      while (row[x + run] === c) run++;
      if (c !== "." && palette[c]) {
        rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={run} height={1} fill={palette[c]} />);
      }
      x += run;
    }
  });
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title ? <title>{title}</title> : null}
      {rects}
    </svg>
  );
}
