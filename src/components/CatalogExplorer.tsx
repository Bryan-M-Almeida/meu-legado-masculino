"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { categories, products, stores, tags, type CategorySlug, type Product, type StoreSlug, type TagSlug } from "@/data/catalog";
import { discount, score, sortLabels, type SortKey } from "@/lib/search";
import { ProductGrid } from "./ProductCard";
import { Mascot } from "./Mascot";

const priceRanges = [
  { id: "ate-200", label: "Até R$ 200", min: 0, max: 20000 },
  { id: "200-500", label: "R$ 200 a R$ 500", min: 20000, max: 50000 },
  { id: "500-1500", label: "R$ 500 a R$ 1.500", min: 50000, max: 150000 },
  { id: "1500-mais", label: "Acima de R$ 1.500", min: 150000, max: Infinity },
] as const;

const isCat = (v: string): v is CategorySlug => categories.some((c) => c.slug === v);
const isStore = (v: string): v is StoreSlug => stores.some((s) => s.slug === v);
const isTag = (v: string): v is TagSlug => v in tags;
// Filtros e ordenações só aparecem quando os dados permitem. Na Amazon não há
// preço nem nota digitados à mão, então sem eles esses controles somem.
const hasPrices = products.some((p) => p.price !== undefined);
const hasDiscounts = products.some((p) => p.oldPrice !== undefined);
const hasRatings = products.some((p) => p.rating !== undefined);
const usedStores = stores.filter((s) => products.some((p) => p.store === s.slug));
const sortKeys = (Object.keys(sortLabels) as SortKey[]).filter(
  (k) =>
    k === "relevancia" ||
    ((k === "menor-preco" || k === "maior-preco") && hasPrices) ||
    (k === "desconto" && hasDiscounts) ||
    (k === "avaliacao" && hasRatings),
);
const isSort = (v: string): v is SortKey => sortKeys.includes(v as SortKey);
const PAGE = 24;

/**
 * Catálogo com busca e filtros. Todo o estado mora na URL
 * (?q=&cat=&loja=&tag=&preco=&ordem=), então dá para compartilhar
 * um filtro por link e o botão Voltar funciona. Valores fora da lista
 * conhecida são ignorados.
 */
export function CatalogExplorer({ lockedCategory }: { lockedCategory?: CategorySlug }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [pending, startTransition] = useTransition();

  const q = (params.get("q") ?? "").slice(0, 80);
  const cats = lockedCategory ? [lockedCategory] : params.getAll("cat").filter(isCat);
  const lojas = params.getAll("loja").filter(isStore);
  const tagSel = params.getAll("tag").filter(isTag);
  const preco = priceRanges.find((r) => r.id === params.get("preco"));
  const ordemRaw = params.get("ordem") ?? "";
  const ordem: SortKey = isSort(ordemRaw) ? ordemRaw : "relevancia";

  // Catálogo pequeno: filtrar a cada render custa menos que memorizar.
  const results = (() => {
    const list = products
      .map((p) => ({ p, s: score(p, q) }))
      .filter(
        ({ p, s }) =>
          s > 0 &&
          (!cats.length || cats.includes(p.category)) &&
          (!lojas.length || lojas.includes(p.store)) &&
          (!tagSel.length || tagSel.every((t) => p.tags.includes(t))) &&
          (!preco || (p.price !== undefined && p.price >= preco.min && p.price < preco.max)),
      );
    const by: Record<SortKey, (a: (typeof list)[0], b: (typeof list)[0]) => number> = {
      // Empate: mantém a ordem do catálogo (a ordem em que você listou os produtos).
      relevancia: (a, b) => b.s - a.s,
      "menor-preco": (a, b) => (a.p.price ?? Infinity) - (b.p.price ?? Infinity),
      "maior-preco": (a, b) => (b.p.price ?? -1) - (a.p.price ?? -1),
      desconto: (a, b) => discount(b.p) - discount(a.p),
      avaliacao: (a, b) => (b.p.rating ?? 0) - (a.p.rating ?? 0),
    };
    return list.sort(by[ordem]).map((r) => r.p);
  })();

  const update = (mut: (sp: URLSearchParams) => void) => {
    const sp = new URLSearchParams(params.toString());
    mut(sp);
    const qs = sp.toString();
    startTransition(() => router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false }));
  };

  const toggle = (key: string, value: string) =>
    update((sp) => {
      const cur = sp.getAll(key);
      sp.delete(key);
      (cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value]).forEach((v) => sp.append(key, v));
    });

  const activeCount = (lockedCategory ? 0 : cats.length) + lojas.length + tagSel.length + (preco ? 1 : 0) + (q ? 1 : 0);
  const clearAll = () => startTransition(() => router.replace(pathname, { scroll: false }));

  const filters = (
    <div className="space-y-6">
      {!lockedCategory && (
        <fieldset>
          <legend className="font-pixel text-lg mb-2">Categoria</legend>
          {categories.map((c) => (
            <Check key={c.slug} label={c.name} checked={cats.includes(c.slug)} onChange={() => toggle("cat", c.slug)} />
          ))}
        </fieldset>
      )}
      {hasPrices && (
        <fieldset>
          <legend className="font-pixel text-lg mb-2">Preço</legend>
          {priceRanges.map((r) => (
            <label key={r.id} className="flex items-center gap-2.5 py-1 cursor-pointer">
              <input
                type="radio"
                name="preco"
                className="size-4 accent-blue"
                checked={preco?.id === r.id}
                onChange={() => update((sp) => sp.set("preco", r.id))}
              />
              {r.label}
            </label>
          ))}
          {preco && (
            <>
              <button type="button" onClick={() => update((sp) => sp.delete("preco"))} className="mt-1 text-sm text-blue underline">
                Qualquer preço
              </button>
              <p className="mt-2 text-sm text-slate">Produtos da Amazon mostram o preço só na loja e não entram neste filtro.</p>
            </>
          )}
        </fieldset>
      )}
      <fieldset>
        <legend className="font-pixel text-lg mb-2">Coleção</legend>
        {(Object.keys(tags) as TagSlug[]).map((t) => (
          <Check key={t} label={tags[t]} checked={tagSel.includes(t)} onChange={() => toggle("tag", t)} />
        ))}
      </fieldset>
      {usedStores.length > 1 && (
        <fieldset>
          <legend className="font-pixel text-lg mb-2">Loja</legend>
          {usedStores.map((s) => (
            <Check key={s.slug} label={s.name} checked={lojas.includes(s.slug)} onChange={() => toggle("loja", s.slug)} />
          ))}
        </fieldset>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
      {/* Filtros: barra lateral no desktop, gaveta recolhível no celular */}
      <aside aria-label="Filtros">
        <details className="lg:hidden px-frame px-4 py-3" open={false}>
          <summary className="font-pixel text-lg cursor-pointer">
            Filtrar {activeCount > 0 && <span className="tag bg-gold ml-1">{activeCount}</span>}
          </summary>
          <div className="pt-4">{filters}</div>
        </details>
        <div className="hidden lg:block sticky top-36">{filters}</div>
      </aside>

      <section aria-labelledby="resultado" aria-busy={pending}>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <p id="resultado" role="status" className="text-slate">
            {results.length === 1 ? "1 produto" : `${results.length} produtos`}
            {q && (
              <>
                {" "}
                para <strong className="text-ink">“{q}”</strong>
              </>
            )}
          </p>
          <div className="flex items-center gap-3">
            {activeCount > 0 && (
              <button type="button" onClick={clearAll} className="text-sm text-blue underline">
                Limpar filtros
              </button>
            )}
            {sortKeys.length > 1 && (
              <label className="flex items-center gap-2 text-sm">
                <span className="text-slate">Ordenar por</span>
                <select
                  value={ordem}
                  onChange={(e) => update((sp) => (e.target.value === "relevancia" ? sp.delete("ordem") : sp.set("ordem", e.target.value)))}
                  className="border-[3px] border-ink bg-surface px-2 py-1.5 font-bold"
                >
                  {sortKeys.map((k) => (
                    <option key={k} value={k}>
                      {sortLabels[k]}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        </div>

        {results.length ? (
          <div className={pending ? "opacity-60" : ""}>
            {/* key: volta para a primeira página quando os filtros mudam */}
            <Paged key={params.toString()} items={results} />
          </div>
        ) : (
          <div className="px-frame p-8 flex flex-col sm:flex-row items-center gap-6">
            <Mascot scale={4} />
            <div>
              <p className="font-pixel text-2xl">Nenhum produto com esses filtros.</p>
              <p className="mt-2 text-slate">Tire um filtro ou busque por outra palavra. O Léo continua procurando.</p>
              <button type="button" onClick={clearAll} className="px-btn px-btn-gold mt-5">
                Ver todos os produtos
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

/** Mostra 24 por vez, com botão para carregar mais. */
function Paged({ items }: { items: Product[] }) {
  const [limit, setLimit] = useState(PAGE);
  const rest = items.length - limit;
  return (
    <>
      <ProductGrid items={items.slice(0, limit)} priorityCount={4} />
      {rest > 0 && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <button type="button" onClick={() => setLimit((l) => l + PAGE)} className="px-btn px-btn-gold">
            Mostrar mais {Math.min(rest, PAGE)}
          </button>
          <p className="text-sm text-slate">
            Mostrando {limit} de {items.length}
          </p>
        </div>
      )}
    </>
  );
}

function Check({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <label className="flex items-center gap-2.5 py-1 cursor-pointer">
      <input type="checkbox" className="size-4 accent-blue" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}
