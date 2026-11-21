import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogExplorer } from "@/components/CatalogExplorer";
import { ProductGrid } from "@/components/ProductCard";
import { products } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Todos os produtos",
  description: "Busque e filtre jogos, itens nostálgicos, roupas, relógios e computadores por preço, loja e ocasião.",
  alternates: { canonical: "/produtos" },
};

export default function ProdutosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="font-pixel text-4xl sm:text-5xl mb-8">Todos os produtos</h1>
      {/* O fallback é a lista completa já renderizada no servidor: o Google e quem
          está sem JavaScript veem os produtos mesmo antes dos filtros carregarem. */}
      <Suspense fallback={<ProductGrid items={products} priorityCount={4} />}>
        <CatalogExplorer />
      </Suspense>
    </div>
  );
}
