import type { Metadata } from "next";
import Link from "next/link";
import { Mascot } from "@/components/Mascot";
import { PixelIcon } from "@/components/PixelIcon";

export const metadata: Metadata = {
  title: "O legado",
  description: "Quem somos, o que defendemos e como o Meu Legado Masculino ganha dinheiro.",
  alternates: { canonical: "/sobre" },
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-14">
      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-end">
        <Mascot scale={6} />
        <div>
          <h1 className="font-pixel text-4xl sm:text-5xl leading-tight">Um bom homem deixa mais do que coisas.</h1>
        </div>
      </div>

      <div className="mt-10 space-y-5 text-lg text-charcoal">
        <p>
          O Meu Legado Masculino nasceu de uma ideia simples: o que você escolhe hoje, do relógio ao jogo que divide com o filho,
          conta a história de quem você é. Legado não é só herança. É presença, palavra cumprida e uma casa onde todo mundo se
          sente respeitado.
        </p>
        <p>
          Por isso a loja vai além do público masculino. Tem o presente para o pai, o controle extra para a família jogar junto e o
          computador que ajuda a trabalhar melhor. Se ajuda você a ser lendário para quem vem depois, tem lugar aqui.
        </p>
      </div>

      <h2 className="font-pixel text-3xl mt-14">Quem é o Léo</h2>
      <p className="mt-3 text-lg text-charcoal">
        Nosso mascote é um leão de coroa. O leão cuida do próprio bando; a coroa é o legado que passa de geração para geração. E
        o controle na mão lembra que dá para ser referência e ainda assim sentar no chão para jogar.
      </p>

      <section id="afiliados" className="mt-14 px-frame p-6 sm:p-8 scroll-mt-40">
        <div className="flex items-center gap-3">
          <PixelIcon name="shield" scale={4} />
          <h2 className="font-pixel text-3xl">Como ganhamos dinheiro</h2>
        </div>
        <ul className="mt-5 space-y-3 text-charcoal">
          <li>Não vendemos nada diretamente e não guardamos estoque.</li>
          <li>
            Quando você clica em “Ver oferta”, vai para a loja (Amazon, Mercado Livre, Magalu, Shopee, KaBuM! e outras). Se comprar,
            a loja pode nos pagar uma comissão.
          </li>
          <li>Você paga o mesmo preço. Pagamento, entrega, troca e garantia são da loja.</li>
          <li>Não pedimos cadastro, não usamos cookies de rastreamento e não coletamos seus dados neste site.</li>
        </ul>
      </section>

      <Link href="/produtos" className="px-btn px-btn-gold mt-12">
        Ver os produtos
      </Link>
    </div>
  );
}
