import Image from "next/image";
import Link from "next/link";
import { categories, getProduct, products, unsplash, type Product } from "@/data/catalog";
import { DialogBox } from "@/components/DialogBox";
import { Mascot } from "@/components/Mascot";
import { PixelIcon, type IconName } from "@/components/PixelIcon";
import { ProductArt } from "@/components/ProductArt";
import { ProductGrid } from "@/components/ProductCard";

const values: { icon: IconName; name: string; text: string }[] = [
  { icon: "crown", name: "Legado", text: "O que você compra hoje pode estar no pulso do seu filho daqui a 30 anos." },
  { icon: "shield", name: "Confiança", text: "Só indicamos o que compraríamos. Preço e loja sempre à vista, sem letra miúda." },
  { icon: "bolt", name: "Empoderamento", text: "Ferramentas para trabalhar melhor, aprender mais e jogar sem travar." },
  { icon: "hands", name: "Respeito", text: "Por quem divide o sofá, a mesa e o controle com você." },
];

export default function Home() {
  const gta = products.filter((p) => p.tags.includes("gta6"));
  // Vitrine da home: um destaque de cada canto da loja.
  const featured = [
    "console-ps5-digital",
    "bundle-switch-2-mario-kart-world",
    "pc-gamer-ryzen-7-rtx-5060-32gb",
    "monitor-aoc-agon-q27g4f",
    "cabine-street-fighter-ii",
    "vitrola-raveo-sonetto",
    "relogio-casio-a158wa",
    "oculos-ray-ban-aviator",
  ]
    .map(getProduct)
    .filter(Boolean) as Product[];
  const family = products.filter((p) => p.tags.includes("familia")).slice(0, 4);

  return (
    <>
      {/* ── Abertura: o Léo apresenta a loja ── */}
      <section className="mx-auto max-w-7xl px-4 pt-10 pb-16 md:pt-16">
        <div className="grid items-end gap-10 md:grid-cols-[auto_1fr]">
          <div className="flex justify-center md:block">
            <Mascot scale={9} />
          </div>
          <div className="max-w-2xl">
            <h1 className="font-pixel text-[2.6rem] leading-[1.05] sm:text-6xl">Para que seu legado seja lendário.</h1>
            <p className="mt-4 text-lg text-charcoal max-w-xl">
              Jogos, nostalgia, roupas, relógios e computadores escolhidos a dedo nas melhores lojas do Brasil. Você compra direto
              com elas, com a garantia delas.
            </p>
            <div className="mt-8">
              <DialogBox
                speaker="Léo"
                lines={[
                  "Bem-vindo, jogador. Eu sou o Léo, guardião deste reino.",
                  "Aqui não tem carrinho: eu encontro o produto e te levo direto para a loja.",
                  "GTA VI chegou. Já separei o jogo, o console e o setup na ala especial.",
                  "Um bom legado se constrói em casa. Que tal um controle a mais para jogar com quem você ama?",
                ]}
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/produtos" className="px-btn px-btn-gold">
                Ver todos os produtos
              </Link>
              <Link href="/gta-6" className="px-btn px-btn-ghost">
                Especial GTA VI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Categorias como seleção de fase ── */}
      <section aria-labelledby="cat-title" className="mx-auto max-w-7xl px-4">
        <h2 id="cat-title" className="font-pixel text-3xl mb-5">Escolha sua fase</h2>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={`/categoria/${c.slug}`}
                className="product-card flex h-full flex-col gap-3 p-4 hover:bg-gold focus-visible:bg-gold"
              >
                <PixelIcon name={c.icon} scale={4} />
                <span className="font-pixel text-xl leading-tight">{c.name}</span>
                <span className="text-sm text-charcoal">{c.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── GTA VI ── */}
      <section aria-labelledby="gta-title" className="mt-20 dither-sunset border-y-[3px] border-ink text-ink">
        <div className="mx-auto max-w-7xl px-4 py-14 grid gap-10 lg:grid-cols-[1fr_1.4fr] items-center">
          <div>
            <p className="tag bg-ink text-gold">Nas lojas desde 19/11 para PS5 e Xbox Series</p>
            <h2 id="gta-title" className="font-pixel text-5xl sm:text-6xl mt-4 text-white leading-none [text-shadow:4px_4px_0_var(--ink)]">
              Leonida
              <br />
              te espera.
            </h2>
            <p className="mt-5 text-lg text-white max-w-md [text-shadow:2px_2px_0_var(--ink)]">
              GTA VI chegou aos consoles. Separamos o jogo, o console para rodar e o que deixa a maratona confortável.
            </p>
            <Link href="/gta-6" className="px-btn px-btn-ink mt-7">
              Montar meu setup GTA VI
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:gap-5">
            {gta.slice(0, 4).map((p) => (
              <li key={p.slug}>
                <Link href={`/produto/${p.slug}`} className="product-card block">
                  <div className="relative aspect-[4/3] border-b-[3px] border-ink">
                    <ProductArt product={p} width={600} sizes="(min-width: 1024px) 320px, 45vw" />
                  </div>
                  <p className="p-3 font-bold leading-snug line-clamp-2">{p.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Destaques ── */}
      <section aria-labelledby="featured-title" className="mx-auto max-w-7xl px-4 mt-20">
        <div className="flex items-end justify-between gap-4 mb-5">
          <h2 id="featured-title" className="font-pixel text-3xl">Escolhas do Léo</h2>
          <Link href="/produtos" className="text-blue font-bold underline underline-offset-4 shrink-0">
            Ver todos os {products.length}
          </Link>
        </div>
        <ProductGrid items={featured} />
      </section>

      {/* ── Família ── */}
      <section aria-labelledby="family-title" className="mx-auto max-w-7xl px-4 mt-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.6fr] items-start">
          <div className="px-frame overflow-hidden">
            <div className="relative aspect-[4/3]">
              <Image
                src={unsplash("photo-1560328055-e938bb2ed50a", 1000)}
                alt="Pai carregando o filho no colo"
                fill
                sizes="(min-width: 1024px) 460px, 100vw"
                className="photo object-cover"
              />
            </div>
            <div className="p-5">
              <h2 id="family-title" className="font-pixel text-3xl leading-tight">O maior legado joga do seu lado.</h2>
              <p className="mt-3 text-charcoal">
                Ser lendário começa em casa: no segundo controle, no relógio que vai passar de pai para filho, na mesa do jantar.
              </p>
              <Link href="/produtos?tag=familia" className="px-btn px-btn-blue mt-5">
                Ver presentes para a família
              </Link>
            </div>
          </div>
          <ProductGrid items={family} cols="grid-cols-2" />
        </div>
      </section>

      {/* ── Valores ── */}
      <section aria-labelledby="values-title" className="mx-auto max-w-7xl px-4 mt-24">
        <h2 id="values-title" className="font-pixel text-3xl mb-6">O código do legado</h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <li key={v.name} className="flex gap-4 items-start">
              <PixelIcon name={v.icon} scale={4} className="shrink-0" />
              <div>
                <h3 className="font-pixel text-xl">{v.name}</h3>
                <p className="mt-1 text-charcoal">{v.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
