import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Mascot } from "@/components/Mascot";
import { ProductGrid } from "@/components/ProductCard";
import { getProduct, unsplash, type Product } from "@/data/catalog";

export const metadata: Metadata = {
  title: "Especial GTA VI: jogo, console e setup",
  description: "GTA VI chegou ao PS5 e ao Xbox Series. Veja onde comprar o jogo, o console e o setup para jogar com conforto.",
  alternates: { canonical: "/gta-6" },
};

const pick = (...slugs: string[]) => slugs.map(getProduct).filter(Boolean) as Product[];

// O setup é montado em ordem: primeiro o jogo, depois onde rodar, depois o conforto.
const steps = [
  { title: "Garanta o jogo", text: "Para PS5 ou Xbox Series X|S.", items: pick("gta-vi-ps5", "gta-vi-xbox") },
  { title: "Escolha onde jogar", text: "Ainda sem console da geração atual? Comece por aqui.", items: pick("console-ps5-digital", "console-xbox-series-s", "controle-dualsense") },
  { title: "Deixe a maratona confortável", text: "Leonida é grande. Suas costas e seus ouvidos agradecem.", items: pick("headset-gamer", "cadeira-gamer", "oculos-aviador") },
];

export default function GtaPage() {
  return (
    <>
      <section className="relative border-b-[3px] border-ink overflow-hidden">
        <Image
          src={unsplash("photo-1535392432937-a27c36ec07b5", 1800)}
          alt="Coqueiros vistos de baixo contra o céu do pôr do sol"
          fill
          priority
          sizes="100vw"
          className="photo object-cover"
        />
        <div className="absolute inset-0 dither-sunset opacity-80 mix-blend-multiply" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:py-24 grid gap-8 md:grid-cols-[1fr_auto] items-end">
          <div className="max-w-2xl">
            <p className="tag bg-ink text-gold">Nas lojas desde 19 de novembro de 2026</p>
            <h1 className="font-pixel text-white text-5xl sm:text-7xl leading-[0.95] mt-4 [text-shadow:5px_5px_0_var(--ink)]">
              GTA VI chegou. Monte seu setup.
            </h1>
            <p className="mt-6 text-lg text-white max-w-lg [text-shadow:2px_2px_0_var(--ink)]">
              Disponível para PS5 e Xbox Series X|S. A versão de PC ainda não tem data oficial. Abaixo, o caminho do sofá até Vice
              City em três passos.
            </p>
          </div>
          <div className="hidden md:block">
            <Mascot scale={7} />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-14 space-y-16">
        {steps.map((s, i) => (
          <section key={s.title} aria-labelledby={`passo-${i}`}>
            <div className="flex items-start gap-4 mb-5">
              <span className="font-pixel text-2xl bg-ink text-gold size-12 shrink-0 grid place-items-center" aria-hidden>
                {i + 1}
              </span>
              <div>
                <h2 id={`passo-${i}`} className="font-pixel text-3xl leading-tight">
                  <span className="sr-only">Passo {i + 1}: </span>
                  {s.title}
                </h2>
                <p className="text-charcoal mt-1">{s.text}</p>
              </div>
            </div>
            <ProductGrid items={s.items} priorityCount={i === 0 ? 2 : 0} />
          </section>
        ))}

        <section className="px-frame p-6 sm:p-8 grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div>
            <h2 className="font-pixel text-2xl">Joga no PC?</h2>
            <p className="mt-2 text-charcoal max-w-xl">
              A Rockstar ainda não anunciou a versão de PC. Se for montar ou trocar de máquina, escolha uma que segure os próximos
              anos de lançamentos.
            </p>
          </div>
          <Link href="/categoria/computadores" className="px-btn px-btn-blue">
            Ver computadores
          </Link>
        </section>
      </div>
    </>
  );
}
