import { categories, products, stores, tags, type Product } from "@/data/catalog";

/** Remove acentos e caixa: "Relógio" e "relogio" viram a mesma coisa. */
export const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

// Índice de busca montado uma vez: título, categoria, loja, tags e resumo.
const index = new Map<string, string>(
  products.map((p) => [
    p.slug,
    normalize(
      [
        p.title,
        categories.find((c) => c.slug === p.category)?.name,
        stores.find((s) => s.slug === p.store)?.name,
        ...p.tags.map((t) => tags[t]),
        p.summary,
        p.highlights.join(" "),
        p.description,
      ].join(" "),
    ),
  ]),
);

/** Pontua um produto: título vale mais que o resto. 0 = não bate. */
export function score(p: Product, query: string): number {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (!terms.length) return 1;
  const title = normalize(p.title);
  const haystack = index.get(p.slug) ?? "";
  let total = 0;
  for (const t of terms) {
    if (title.includes(t)) total += 3;
    else if (haystack.includes(t)) total += 1;
    else return 0; // todos os termos precisam aparecer
  }
  return total;
}

export type SortKey = "relevancia" | "menor-preco" | "maior-preco" | "desconto" | "avaliacao";

export const sortLabels: Record<SortKey, string> = {
  relevancia: "Mais relevantes",
  "menor-preco": "Menor preço",
  "maior-preco": "Maior preço",
  desconto: "Maior desconto",
  avaliacao: "Melhor avaliados",
};

export const discount = (p: Product) =>
  p.oldPrice && p.price ? Math.round((1 - p.price / p.oldPrice) * 100) : 0;

export function searchProducts(query: string, limit?: number) {
  const out = products
    .map((p) => ({ p, s: score(p, query) }))
    .filter((r) => r.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((r) => r.p);
  return limit ? out.slice(0, limit) : out;
}
