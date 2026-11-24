import type { Metadata } from "next";
import { GuideList } from "@/components/GuideList";
import { breadcrumb, JsonLd } from "@/components/JsonLd";
import { Mascot } from "@/components/Mascot";
import { guides } from "@/data/guides";
import { SITE } from "@/lib/format";

export const metadata: Metadata = {
  title: "Guias de compra",
  description:
    "Guias para escolher console, montar PC gamer, achar o presente certo e comprar relógio sem erro. Explicações diretas e as melhores opções.",
  alternates: { canonical: "/guias" },
};

export default function GuiasPage() {
  const ld = [
    breadcrumb(SITE.url, [
      ["Início", "/"],
      ["Guias", "/guias"],
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      itemListElement: guides.map((g, i) => ({ "@type": "ListItem", position: i + 1, url: `${SITE.url}/guias/${g.slug}`, name: g.title })),
    },
  ];
  return (
    <div className="mx-auto max-w-5xl px-4 py-14">
      <JsonLd data={ld} />
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-end">
        <Mascot scale={5} />
        <div>
          <h1 className="font-pixel text-4xl sm:text-5xl leading-tight">Guias de compra</h1>
          <p className="mt-3 text-lg text-charcoal max-w-xl">
            Antes de comprar, entenda as diferenças. O Léo explica o que importa e mostra as opções que valem a pena.
          </p>
        </div>
      </div>
      <div className="mt-10">
        <GuideList items={guides} headingLevel="h2" />
      </div>
    </div>
  );
}
