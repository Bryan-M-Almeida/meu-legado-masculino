import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductCard";
import { ProductSkeleton } from "@/components/Skeleton";
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
    openGraph: { title: p.title, description: p.summary, images: p.image ? [unsplash(p.image, 1200)] : undefined },
  };
}

// A moldura entra no shell instantâneo; o conteúdo depende do endereço
// (params) e fica atrás do <Suspense>.
export default function ProdutoPage({ params }: PageProps<"/produto/[slug]">) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-7xl px-4 py-10"><ProductSkeleton /></div>}>
      <ProdutoContent params={params} />
    </Suspense>
  );
}

async function ProdutoContent({ params }: { params: PageProps<"/produto/[slug]">["params"] }) {
  const p = getProduct((await params).slug);
  if (!p) notFound();
  const cat = getCategory(p.category)!;
  const store = getStore(p.store);
  const off = discount(p);
  const shared = (x: typeof p) => x.tags.filter((t) => p.tags.includes(t)).length + (x.category === p.category ? 1 : 0);
  const related = products
    .filter((x) => x.slug !== p.slug && shared(x) > 0)
    .sort((a, b) => shared(b) - shared(a))
    .slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <nav aria-label="Você está em" className="text-sm text-slate mb-6">
        <Link href="/" className="underline">Início</Link> /{" "}
        <Link href={`/categoria/${cat.slug}`} className="underline">{cat.name}</Link> / <span className="text-ink">{p.title}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2 items-start">
        <ProductGallery product={p} />

        <div>
          <div className="flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Link key={t} href={`/produtos?tag=${t}`} className="tag bg-surface border-2 border-ink hover:bg-gold">
                {tags[t]}
              </Link>
            ))}
          </div>
          <h1 className="font-pixel text-3xl sm:text-4xl leading-tight mt-4">{p.title}</h1>
          {p.rating && p.reviews && (
            <p className="mt-2 text-slate">
              ★ {p.rating.toFixed(1)} de 5, com {p.reviews.toLocaleString("pt-BR")} avaliações na {store.name}
            </p>
          )}
          <p className="mt-5 text-lg text-charcoal">{p.summary}</p>

          <div className="mt-6 px-frame p-5">
            {p.price ? (
              <>
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
              </>
            ) : (
              <>
                <p className="font-pixel text-2xl leading-tight">Preço atualizado na {store.name}</p>
                <p className="mt-2 text-sm text-slate">
                  O preço e as avaliações mudam com frequência. Confira os valores de hoje direto na {store.name}.
                </p>
              </>
            )}
            <a
              href={`/ir/${p.slug}`}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
              className="px-btn px-btn-gold w-full mt-5 text-lg"
            >
              {p.price ? `Ver oferta na ${store.name}` : `Ver preço na ${store.name}`}
              <span className="sr-only">(abre em nova aba)</span>
            </a>
            <p className="mt-3 text-sm text-slate">
              Você finaliza a compra na {store.name}, com o pagamento, a entrega e a garantia deles. Podemos receber uma comissão,
              sem custo extra para você.
            </p>
          </div>

          <h2 className="font-pixel text-xl mt-8">Sobre o produto</h2>
          <p className="mt-3 text-charcoal leading-relaxed">{p.description}</p>

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
