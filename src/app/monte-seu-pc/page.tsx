import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumb, JsonLd } from "@/components/JsonLd";
import { PcBuilder } from "@/components/PcBuilder";
import { getProduct } from "@/data/catalog";
import { pcParts } from "@/data/pcParts";
import { SITE } from "@/lib/format";

export const metadata: Metadata = {
  title: "Monte seu PC gamer",
  description:
    "Monte seu PC gamer peça por peça: processador, placa-mãe, memória, placa de vídeo, SSD, fonte e cooler, com a compatibilidade checada na hora.",
  alternates: { canonical: "/monte-seu-pc" },
};

// Nome de cada peça vindo do catálogo. O navegador recebe só isso, não o catálogo inteiro.
const titles: Record<string, string> = {};
for (const list of Object.values(pcParts)) {
  for (const { slug } of list) {
    const p = getProduct(slug);
    if (!p) throw new Error(`Peça do Monte seu PC não existe no catálogo: ${slug}`);
    titles[slug] = p.title;
  }
}

export default function MonteSeuPcPage() {
  return (
    <>
      <JsonLd
        data={breadcrumb(SITE.url, [
          ["Início", "/"],
          ["Monte seu PC", "/monte-seu-pc"],
        ])}
      />
      <section className="bg-navy text-paper border-b-[3px] border-ink">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
          <p className="tag bg-gold text-ink">Ferramenta</p>
          <h1 className="font-pixel text-4xl sm:text-6xl leading-tight mt-4 text-white">Monte seu PC</h1>
          <p className="mt-4 text-lg text-mist max-w-2xl">
            Escolha peça por peça. O que não encaixa fica travado, a fonte é calculada pelo consumo e o Léo avisa o que falta. No
            fim, cada peça tem o link para ver o preço na Amazon.
          </p>
        </div>
      </section>
      <div className="mx-auto max-w-7xl px-4 py-10 pb-24 lg:pb-10">
        <PcBuilder titles={titles} />
        <p className="mt-12 text-charcoal">
          Quer entender cada peça antes de escolher? Leia o{" "}
          <Link href="/guias/pc-gamer-custo-beneficio" className="underline font-bold">
            guia de PC gamer custo-benefício
          </Link>
          .
        </p>
      </div>
    </>
  );
}
