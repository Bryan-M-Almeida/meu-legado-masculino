import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { PixelIcon } from "@/components/PixelIcon";
import { ProductGrid } from "@/components/ProductCard";
import { categories, getCategory, products } from "@/data/catalog";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps<"/categoria/[slug]">): Promise<Metadata> {
  const cat = getCategory((await params).slug);
  if (!cat) return {};
  return { title: cat.name, description: `${cat.blurb}. Seleção do Meu Legado Masculino.`, alternates: { canonical: `/categoria/${cat.slug}` } };
}

export default async function CategoriaPage({ params }: PageProps<"/categoria/[slug]">) {
  const cat = getCategory((await params).slug);
  if (!cat) notFound();
  const items = products.filter((p) => p.category === cat.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
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
      <Suspense fallback={<ProductGrid items={items} priorityCount={4} />}>
        <CatalogExplorer lockedCategory={cat.slug} />
      </Suspense>
    </div>
  );
}
