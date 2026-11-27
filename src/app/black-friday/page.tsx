import type { Metadata } from "next";
import Link from "next/link";
import { breadcrumb, JsonLd } from "@/components/JsonLd";
import { Mascot } from "@/components/Mascot";
import { ProductGrid } from "@/components/ProductCard";
import { getProduct, type Product } from "@/data/catalog";
import { SITE } from "@/lib/format";

export const metadata: Metadata = {
  title: "Black Friday 2026: o que vale a pena comprar",
  description:
    "Black Friday 2026 é em 27 de novembro. Veja os consoles, jogos, peças de PC e presentes que valem a pena e como saber se o desconto é real.",
  alternates: { canonical: "/black-friday" },
};

const pick = (...slugs: string[]) =>
  slugs.map((s) => {
    const p = getProduct(s);
    if (!p) throw new Error(`Produto da Black Friday não existe no catálogo: ${s}`);
    return p;
  }) as Product[];

const sections: { id: string; title: string; text: string; items: Product[]; more?: { href: string; label: string } }[] = [
  {
    id: "consoles",
    title: "Consoles e GTA VI",
    text: "GTA VI acabou de sair, e a Black Friday é a hora de quem ainda não tem console da geração atual. Bundles com jogo costumam valer mais do que comprar separado.",
    items: pick("bundle-gta-vi-ps5-slim", "console-ps5-digital", "console-xbox-series-s", "bundle-switch-2-mario-kart-world", "gta-vi-ps5", "gta-vi-xbox", "console-ps5-pro", "controle-dualsense"),
    more: { href: "/guias/qual-console-comprar", label: "Em dúvida? Veja qual console comprar" },
  },
  {
    id: "pc",
    title: "PC gamer e peças",
    text: "Placa de vídeo, SSD e memória estão entre os itens que mais caem de preço nessa época. Antes de comprar, confira se as peças combinam no Monte seu PC.",
    items: pick("placa-de-video-msi-rtx-5060", "placa-de-video-zotac-rtx-5060-ti-16gb", "ssd-kingston-nv3-1tb", "memoria-kingston-fury-ddr4-kit-16gb", "processador-ryzen-7-5700x", "pc-gamer-ryzen-7-rtx-5060-32gb", "notebook-lenovo-loq-essential-rtx-5050", "monitor-aoc-agon-q27g4f"),
    more: { href: "/monte-seu-pc", label: "Monte seu PC peça por peça" },
  },
  {
    id: "setup",
    title: "Setup gamer",
    text: "Headset, teclado, mouse e cadeira: o que deixa as horas de jogo mais confortáveis.",
    items: pick("headset-redragon-zeus-lite", "headset-sem-fio-xbox", "teclado-redragon-kumara", "mouse-redragon-k1ng", "cadeira-gamer-branca", "controle-gamesir-g7-pro", "hd-externo-toshiba-1tb", "volante-dazz-force-driving"),
  },
  {
    id: "presentes",
    title: "Para adiantar o Natal",
    text: "A Black Friday é a melhor época para comprar os presentes de fim de ano com folga no prazo de entrega.",
    items: pick("relogio-fossil-nate", "relogio-casio-a158wa", "oculos-ray-ban-aviator", "carteira-couro-rfid", "jaqueta-bomber-couro-sintetico", "tenis-mizuno-city-wall-branco", "cabine-street-fighter-ii", "vitrola-raveo-sonetto"),
    more: { href: "/guias/presentes-de-natal-para-homem", label: "Mais ideias de presente de Natal" },
  },
];

const tips = [
  ["Acompanhe o preço antes", "Desconto real é em relação ao preço das últimas semanas, não ao preço “de” da etiqueta. Se puder, veja o histórico de preço do produto antes de comprar."],
  ["Confira quem vende", "Na Amazon, prefira ofertas vendidas e entregues pela própria Amazon ou por vendedores bem avaliados. Isso facilita troca e garantia."],
  ["Confira o modelo exato", "PS5 Slim, Pro ou Edição Digital; Xbox Series S ou X; RTX 5060 ou 5060 Ti. Nomes parecidos escondem diferenças grandes."],
  ["Olhe o prazo de entrega", "Com o volume de pedidos, as entregas demoram mais. Se é presente de Natal, compre com folga."],
  ["Desconfie de preço bom demais", "Anúncio muito abaixo do normal, fora da loja oficial, pode ser golpe. Compre pelos links da própria loja."],
];

const faq = [
  { q: "Quando é a Black Friday 2026?", a: "Na sexta-feira, 27 de novembro de 2026. A Cyber Monday, focada em eletrônicos, vem logo depois, em 30 de novembro. Muitas lojas começam as ofertas dias antes." },
  { q: "Vale a pena comprar console na Black Friday?", a: "Costuma valer, principalmente os bundles com jogo. Com GTA VI recém-lançado, os consoles da geração atual estão entre os itens mais procurados." },
  { q: "Como saber se o desconto da Black Friday é real?", a: "Compare com o preço das semanas anteriores e não só com o preço riscado. Confira também o vendedor e o modelo exato do produto." },
  { q: "Os preços aparecem aqui no site?", a: "Não. Os preços mudam o tempo todo, então cada produto leva direto para a Amazon, onde você vê o preço de hoje antes de decidir." },
];

export default function BlackFridayPage() {
  const ld = [
    breadcrumb(SITE.url, [
      ["Início", "/"],
      ["Black Friday", "/black-friday"],
    ]),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <JsonLd data={ld} />
      <section className="relative overflow-hidden bg-ink text-paper border-b-[3px] border-ink">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,205,117,0.12)_1px,transparent_1px)] bg-[length:10px_10px]" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:py-16 grid gap-8 md:grid-cols-[1fr_auto] items-end">
          <div className="max-w-2xl">
            <p className="tag bg-gold text-ink">Sexta, 27 de novembro · Cyber Monday 30/11</p>
            <h1 className="font-pixel text-5xl sm:text-7xl leading-[0.95] mt-4">
              <span className="text-gold">Black Friday</span> 2026
            </h1>
            <p className="mt-5 text-lg text-mist max-w-xl">
              O que vale a pena comprar, separado pelo Léo. Os preços mudam a toda hora durante a Black Friday, então cada item leva
              direto para a Amazon, onde você vê o preço de hoje.
            </p>
            <nav aria-label="Seções da página" className="mt-6">
              <ul className="flex flex-wrap gap-2">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="block border-[3px] border-gold px-3 py-1.5 font-pixel text-gold hover:bg-gold hover:text-ink">
                      {s.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#dicas" className="block border-[3px] border-paper px-3 py-1.5 font-pixel hover:bg-paper hover:text-ink">
                    Dicas
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="hidden md:block">
            <Mascot scale={7} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 space-y-16">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} aria-labelledby={`${s.id}-titulo`} className="scroll-mt-36">
            <div className="flex flex-wrap items-end justify-between gap-3 mb-5">
              <div className="max-w-2xl">
                <h2 id={`${s.id}-titulo`} className="font-pixel text-3xl sm:text-4xl leading-tight">{s.title}</h2>
                <p className="mt-2 text-charcoal">{s.text}</p>
              </div>
              {s.more && (
                <Link href={s.more.href} className="text-blue font-bold underline underline-offset-4">
                  {s.more.label}
                </Link>
              )}
            </div>
            <ProductGrid items={s.items} priorityCount={i === 0 ? 4 : 0} />
          </section>
        ))}

        <section id="dicas" aria-labelledby="dicas-titulo" className="scroll-mt-36 px-frame p-6 sm:p-8">
          <h2 id="dicas-titulo" className="font-pixel text-3xl">Como não cair em cilada</h2>
          <ol className="mt-5 grid gap-5 md:grid-cols-2">
            {tips.map(([title, text], i) => (
              <li key={title} className="flex gap-4">
                <span aria-hidden className="font-pixel text-xl bg-ink text-gold size-10 shrink-0 grid place-items-center">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold">{title}</h3>
                  <p className="mt-1 text-charcoal">{text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="faq-titulo" className="max-w-3xl">
          <h2 id="faq-titulo" className="font-pixel text-3xl">Perguntas frequentes</h2>
          <div className="mt-5 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="px-frame group">
                <summary className="cursor-pointer list-none p-4 font-bold flex justify-between gap-4">
                  {f.q}
                  <span aria-hidden className="font-pixel text-blue group-open:rotate-45 transition-transform">+</span>
                </summary>
                <p className="px-4 pb-4 text-charcoal">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-sm text-slate">
            Os links levam para a Amazon e podemos receber uma comissão quando você compra, sem custo extra.{" "}
            <Link href="/sobre#afiliados" className="underline">Saiba como ganhamos dinheiro</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
