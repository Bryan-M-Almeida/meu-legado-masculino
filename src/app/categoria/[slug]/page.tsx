import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { breadcrumb, JsonLd } from "@/components/JsonLd";
import { PixelIcon } from "@/components/PixelIcon";
import { ProductGrid } from "@/components/ProductCard";
import { CategorySkeleton } from "@/components/Skeleton";
import { categories, getCategory, products } from "@/data/catalog";
import { SITE } from "@/lib/format";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/categoria/[slug]">): Promise<Metadata> {
  const cat = getCategory((await params).slug);
  if (!cat) return {};
  const items = products.filter((p) => p.category === cat.slug);
  const examples = items.slice(0, 3).map((p) => p.title.split(/[,(]/)[0].trim());
  return {
    title: cat.name,
    description: `${items.length} produtos em ${cat.name.toLowerCase()}: ${examples.join(", ")} e mais. ${cat.blurb}, com link direto para a Amazon.`.slice(0, 160),
    alternates: { canonical: `/categoria/${cat.slug}` },
  };
}

// A moldura da página é igual para toda categoria e entra no shell instantâneo.
// O conteúdo depende do endereço (params), então fica atrás do <Suspense>.
export default function CategoriaPage({ params }: PageProps<"/categoria/[slug]">) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <Suspense fallback={<CategorySkeleton />}>
        <CategoriaContent params={params} />
      </Suspense>
    </div>
  );
}

async function CategoriaContent({ params }: { params: PageProps<"/categoria/[slug]">["params"] }) {
  const cat = getCategory((await params).slug);
  if (!cat) notFound();
  const items = products.filter((p) => p.category === cat.slug);

  const ld = [
    breadcrumb(SITE.url, [
      ["Início", "/"],
      ["Produtos", "/produtos"],
      [cat.name, `/categoria/${cat.slug}`],
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: cat.name,
      numberOfItems: items.length,
      itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/produto/${p.slug}`, name: p.title })),
    },
  ];

  return (
    <>
      <JsonLd data={ld} />
      <nav aria-label="Você está em" className="text-sm text-slate mb-4">
        <Link href="/" className="underline">Início</Link> / <Link href="/produtos" className="underline">Produtos</Link> / {cat.name}
      </nav>
      <div className="flex items-center gap-4 mb-8">
        <PixelIcon name={cat.icon} scale={5} />
        <div>
          <h1 className="font-pixel text-4xl sm:text-5xl leading-none">{cat.name}</h1>
          <p className="mt-2 text-charcoal">{cat.blurb}</p>
        </div>
      </div>
      {cat.slug === "computadores" && (
        <Link href="/monte-seu-pc" className="product-card mb-8 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
          <span>
            <span className="product-title font-pixel text-xl block">Monte seu PC peça por peça</span>
            <span className="text-charcoal">Escolha as peças e veja na hora se tudo encaixa.</span>
          </span>
          <span className="px-btn px-btn-gold !py-1.5" aria-hidden>Montar ▶</span>
        </Link>
      )}
      <Suspense fallback={<ProductGrid items={items} priorityCount={4} />}>
        <CatalogExplorer lockedCategory={cat.slug} />
      </Suspense>
    </>
  );
}
