import Image from "next/image";
import { photoFit, unsplash, type CategorySlug, type Product } from "@/data/catalog";
import { PixelIcon, type IconName } from "./PixelIcon";

const look: Record<CategorySlug, { icon: IconName; bg: string; fg: string }> = {
  jogos: { icon: "gamepad", bg: "bg-navy", fg: "text-gold" },
  nostalgia: { icon: "cassette", bg: "bg-plum", fg: "text-gold" },
  roupas: { icon: "shirt", bg: "bg-charcoal", fg: "text-paper" },
  relogios: { icon: "watch", bg: "bg-ink", fg: "text-gold" },
  computadores: { icon: "monitor", bg: "bg-blue", fg: "text-paper" },
};

/**
 * Imagem do produto. Mostra a foto do próprio modelo quando existe; sem ela,
 * um cartão no estilo da loja com o tipo e o nome do produto, para nunca exibir
 * uma foto que não seja do item vendido.
 * Precisa de um pai com position relative e tamanho definido.
 */
export function ProductArt({
  product: p,
  width,
  sizes,
  priority = false,
  compact = false,
}: {
  product: Product;
  width: number;
  sizes: string;
  priority?: boolean;
  /** Versão mínima (miniaturas da busca): só o ícone. */
  compact?: boolean;
}) {
  if (p.image) {
    return (
      <Image
        src={unsplash(p.image, width)}
        alt={p.imageAlt ?? p.title}
        fill
        sizes={sizes}
        priority={priority}
        className={`photo ${compact ? photoFit(p.image).replace("p-[6%]", "p-0.5") : photoFit(p.image)}`}
      />
    );
  }
  const l = look[p.category];
  if (compact) {
    return (
      <div className={`absolute inset-0 grid place-items-center ${l.bg}`} aria-hidden>
        <PixelIcon name={l.icon} scale={2} />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`${p.label}: ${p.title}`}
      className={`absolute inset-0 flex flex-col justify-between p-[8%] ${l.bg} ${l.fg} bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:8px_8px]`}
    >
      <span className="self-end tag bg-gold text-ink">{p.label}</span>
      <div className="grid place-items-center">
        <PixelIcon name={l.icon} scale={5} />
      </div>
      <p className="font-pixel text-[clamp(0.85rem,2.4vw,1.35rem)] leading-tight line-clamp-3">{p.title}</p>
    </div>
  );
}
