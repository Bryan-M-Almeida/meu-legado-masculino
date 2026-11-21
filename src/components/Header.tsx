import Link from "next/link";
import { Suspense } from "react";
import { categories } from "@/data/catalog";
import { MascotHead } from "./Mascot";
import { SearchBox } from "./SearchBox";

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-ink text-paper border-b-[3px] border-ink">
      <div className="mx-auto max-w-7xl px-4 py-3 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link href="/" className="flex items-center gap-2.5 shrink-0" aria-label="Meu Legado Masculino, página inicial">
          <MascotHead scale={2} />
          <span className="font-pixel text-lg leading-none text-gold">
            Meu Legado
            <span className="block text-paper text-[0.95rem]">Masculino</span>
          </span>
        </Link>

        <div className="order-3 w-full md:order-none md:w-auto md:flex-1">
          <Suspense fallback={<div className="h-12 border-[3px] border-paper/40 bg-charcoal" />}>
            <SearchBox />
          </Suspense>
        </div>

        <nav aria-label="Principal" className="ml-auto md:ml-0">
          <ul className="flex items-center gap-1 font-pixel text-[0.95rem]">
            <li>
              <Link href="/gta-6" className="block px-3 py-2 text-ink bg-sunset hover:bg-gold">
                GTA VI
              </Link>
            </li>
            <li>
              <Link href="/produtos" className="block px-3 py-2 hover:text-gold">
                Produtos
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link href="/sobre" className="block px-3 py-2 hover:text-gold">
                O legado
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <nav aria-label="Categorias" className="border-t-[3px] border-charcoal bg-navy">
        <ul className="mx-auto max-w-7xl px-4 flex gap-1 overflow-x-auto scroll-x text-sm">
          {categories.map((c) => (
            <li key={c.slug} className="shrink-0">
              <Link href={`/categoria/${c.slug}`} className="block px-3 py-2 hover:bg-blue hover:text-white">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
