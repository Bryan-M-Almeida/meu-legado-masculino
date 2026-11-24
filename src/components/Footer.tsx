import Link from "next/link";
import { categories } from "@/data/catalog";
import { MascotHead } from "./Mascot";

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-paper border-t-[3px] border-ink">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <MascotHead scale={3} />
            <p className="font-pixel text-xl text-gold leading-tight">
              Para que seu legado
              <br />
              seja lendário.
            </p>
          </div>
          <p className="mt-4 text-mist text-[0.95rem]">
            Legado, confiança, empoderamento e respeito. Escolhemos cada produto pensando em quem vem depois de você.
          </p>
        </div>

        <nav aria-label="Categorias no rodapé">
          <h2 className="font-pixel text-gold mb-3">Categorias</h2>
          <ul className="space-y-1.5 text-[0.95rem]">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/categoria/${c.slug}`} className="hover:text-gold">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Institucional">
          <h2 className="font-pixel text-gold mb-3">O site</h2>
          <ul className="space-y-1.5 text-[0.95rem]">
            <li><Link href="/gta-6" className="hover:text-gold">Especial GTA VI</Link></li>
            <li><Link href="/guias" className="hover:text-gold">Guias de compra</Link></li>
            <li><Link href="/sobre" className="hover:text-gold">O legado</Link></li>
            <li><Link href="/sobre#afiliados" className="hover:text-gold">Como ganhamos dinheiro</Link></li>
          </ul>
        </nav>
      </div>

      <div className="border-t-[3px] border-charcoal">
        <p className="mx-auto max-w-7xl px-4 py-5 text-sm text-mist">
          Os links levam para lojas parceiras e podemos receber uma comissão quando você compra, sem custo extra para você.
          Preços e estoque são das lojas e podem mudar. © 2026 meulegadomasculino.com.br
        </p>
      </div>
    </footer>
  );
}
