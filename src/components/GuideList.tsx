import Link from "next/link";
import type { Guide } from "@/data/guides";

/** Cartões de guias de compra (lista de guias, home e "outros guias"). */
export function GuideList({ items, headingLevel = "h3" }: { items: Guide[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {items.map((g) => (
        <li key={g.slug}>
          <article className="product-card relative h-full p-5">
            <p className="tag bg-gold text-ink">Guia</p>
            <H className="product-title font-pixel text-xl leading-tight mt-3">
              <Link href={`/guias/${g.slug}`} className="after:absolute after:inset-0">
                {g.title}
              </Link>
            </H>
            <p className="mt-2 text-charcoal">{g.teaser}</p>
          </article>
        </li>
      ))}
    </ul>
  );
}
