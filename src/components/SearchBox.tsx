"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { unsplash } from "@/data/catalog";
import { formatPrice } from "@/lib/format";
import { searchProducts } from "@/lib/search";

/**
 * Busca do topo: mostra sugestões enquanto você digita (sem ir ao servidor,
 * o catálogo inteiro já está no navegador) e, ao apertar Enter, abre a página
 * de produtos com o termo. Navegável por teclado (setas, Enter, Esc).
 */
export function SearchBox() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [q, setQ] = useState(() => (pathname === "/produtos" ? params.get("q") ?? "" : ""));
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const listId = useId();
  const wrap = useRef<HTMLDivElement>(null);

  const results = useMemo(() => (q.trim().length >= 2 ? searchProducts(q, 6) : []), [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (active >= 0 && results[active]) return go(`/produto/${results[active].slug}`);
    const term = q.trim().slice(0, 80);
    go(term ? `/produtos?q=${encodeURIComponent(term)}` : "/produtos");
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i <= 0 ? results.length - 1 : i - 1));
    } else if (e.key === "Escape") {
      setOpen(false);
      setActive(-1);
    }
  };

  const showList = open && q.trim().length >= 2;

  return (
    <div ref={wrap} className="relative">
      <form role="search" onSubmit={submit} className="flex border-[3px] border-paper bg-paper">
        <label htmlFor="busca" className="sr-only">
          Buscar produtos
        </label>
        <input
          id="busca"
          type="search"
          value={q}
          maxLength={80}
          autoComplete="off"
          placeholder="Busque por GTA VI, relógio, teclado..."
          role="combobox"
          aria-expanded={showList}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={active >= 0 ? `${listId}-${active}` : undefined}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKey}
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-ink placeholder:text-slate outline-none"
        />
        <button type="submit" className="bg-gold text-ink font-pixel px-4 border-l-[3px] border-ink hover:bg-sunset">
          Buscar
        </button>
      </form>

      {showList && (
        <ul
          id={listId}
          role="listbox"
          aria-label="Sugestões"
          className="absolute left-0 right-0 top-full mt-2 px-frame text-ink z-50 max-h-[70vh] overflow-auto"
        >
          {results.length === 0 ? (
            <li className="px-4 py-3 text-slate">
              Nada com “{q.trim()}”. Tente outra palavra, como “console” ou “couro”.
            </li>
          ) : (
            results.map((p, i) => (
              <li
                key={p.slug}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  go(`/produto/${p.slug}`);
                }}
                className={`flex items-center gap-3 px-3 py-2 cursor-pointer border-b-2 border-paper last:border-0 ${
                  i === active ? "bg-gold" : ""
                }`}
              >
                <Image src={unsplash(p.image, 120)} alt="" width={44} height={44} className="photo size-11 object-cover border-2 border-ink" />
                <span className="flex-1 min-w-0 truncate">{p.title}</span>
                <span className="font-pixel shrink-0">{p.price ? formatPrice(p.price) : "Ver preço"}</span>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
