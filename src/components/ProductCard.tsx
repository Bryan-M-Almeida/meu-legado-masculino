import Link from "next/link";
import { getStore, tags, type Product } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { discount } from "@/lib/search";
import { ProductArt } from "./ProductArt";

export function ProductCard({ product: p, priority = false }: { product: Product; priority?: boolean }) {
  const off = discount(p);
  return (
    <article className="product-card group relative flex flex-col h-full">
      <div className="relative aspect-square overflow-hidden border-b-[3px] border-ink bg-mist">
        <ProductArt product={p} width={700} sizes="(min-width: 1280px) 280px, (min-width: 768px) 30vw, 50vw" priority={priority} />
        <div className="absolute left-0 top-0 flex flex-col items-start">
          {p.tags.includes("gta6") && <span className="tag bg-sunset text-ink">GTA VI</span>}
          {off > 0 && <span className="tag bg-crimson text-white">-{off}%</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <p className="text-sm text-slate">{getStore(p.store).name}</p>
        <h3 className="product-title font-bold leading-snug line-clamp-2">
          <Link href={`/produto/${p.slug}`} prefetch className="after:absolute after:inset-0">
            {p.title}
          </Link>
        </h3>
        <div className="mt-auto flex items-end justify-between gap-2 pt-1">
          {p.price ? (
            <div>
              {p.oldPrice && <s className="block text-sm text-slate">{formatPrice(p.oldPrice)}</s>}
              <span className="font-pixel text-xl leading-none">{formatPrice(p.price)}</span>
            </div>
          ) : (
            <span className="font-pixel text-blue leading-tight">Ver preço na {getStore(p.store).name}</span>
          )}
          {p.rating && (
            <span className="text-sm text-slate" aria-label={`Nota ${p.rating} de 5`}>
              ★ {p.rating.toFixed(1)}
            </span>
          )}
        </div>
      </div>
      <span className="sr-only">{p.tags.map((t) => tags[t]).join(", ")}</span>
    </article>
  );
}

export function ProductGrid({ items, priorityCount = 0, cols = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" }: { items: Product[]; priorityCount?: number; cols?: string }) {
  return (
    <ul className={`grid gap-3 sm:gap-5 ${cols}`}>
      {items.map((p, i) => (
        <li key={p.slug}>
          <ProductCard product={p} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
