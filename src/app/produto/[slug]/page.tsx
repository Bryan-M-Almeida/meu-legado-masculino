import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGrid } from "@/components/ProductCard";
import { getCategory, getProduct, getStore, products, tags, unsplash } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { discount } from "@/lib/search";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/produto/[slug]">): Promise<Metadata> {
  const p = getProduct((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/produto/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, images: [unsplash(p.image, 1200)] },
  };
}

export default async function ProdutoPage({ params }: PageProps<"/produto/[slug]">) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const store = getStore(p.store);
  const off = discount(p);
  const related = products.filter((x) => x.slug !== p.slug && (x.category === p.category || x.tags.some((t) => p.tags.includes(t)))).slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav aria-label="Você está em" className="text-sm text-slate mb-6">
        <Link href="/" className="underline">Início</Link> /{" "}
        <Link href={`/categoria/${cat.slug}`} className="underline">{cat.name}</Link> / <span className="text-ink">{p.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 items-start">
        <div className="px-frame overflow-hidden">
          <div className="relative aspect-square">
            <Image src={unsplash(p.image, 1200)} alt={p.imageAlt} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="photo object-cover" />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Link key={t} href={`/produtos?tag=${t}`} className="tag bg-surface border-2 border-ink hover:bg-gold">
                {tags[t]}
              </Link>
            ))}
          </div>
          <h1 className="font-pixel text-3xl sm:text-4xl leading-tight mt-4">{p.title}</h1>
          <p className="mt-2 text-slate">
            ★ {p.rating.toFixed(1)} de 5, com {p.reviews.toLocaleString("pt-BR")} avaliações na {store.name}
          </p>
          <p className="mt-5 text-lg text-charcoal">{p.summary}</p>

          <div className="mt-6 px-frame p-5">
            <div className="flex items-end gap-3 flex-wrap">
              <span className="font-pixel text-4xl leading-none">{formatPrice(p.price)}</span>
              {p.oldPrice && (
                <>
                  <s className="text-slate">{formatPrice(p.oldPrice)}</s>
                  <span className="tag bg-crimson text-white">-{off}%</span>
                </>
              )}
            </div>
            <p className="mt-2 text-sm text-slate">Preço visto na {store.name}. Pode mudar a qualquer momento.</p>
            <a
              href={`/ir/${p.slug}`}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="px-btn px-btn-gold w-full mt-5 text-lg"
            >
              Ver oferta na {store.name}
              <span className="sr-only">(abre em nova aba)</span>
            </a>
            <p className="mt-3 text-sm text-slate">
              Você finaliza a compra na {store.name}, com o pagamento, a entrega e a garantia deles. Podemos receber uma comissão,
              sem custo extra para você.
            </p>
          </div>

          <h2 className="font-pixel text-xl mt-8">O que vale saber</h2>
          <ul className="mt-3 space-y-2">
            {p.highlights.map((h) => (
              <li key={h} className="flex gap-3">
                <span aria-hidden className="mt-2 size-2.5 shrink-0 bg-blue" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-20">
          <h2 id="related" className="font-pixel text-3xl mb-5">Combina com</h2>
          <ProductGrid items={related} />
        </section>
      )}
    </div>
  );
}
