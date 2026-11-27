const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const formatPrice = (cents: number) => brl.format(cents / 100);

export const SITE = {
  name: "Meu Legado Masculino",
  url: "https://www.meulegadomasculino.com.br",
  description:
    "Loja de achados para homens e famílias: jogos e consoles, GTA VI, fliperamas e itens retrô, roupas, relógios, PCs gamer e peças. Compre direto na Amazon.",
  /** Usado no Google para ligar o site à marca. Preencha quando criar as redes sociais. */
  sameAs: [] as string[],
};

/**
 * Faixa de campanha no topo de todas as páginas. Para tirar do ar quando a
 * campanha acabar, troque por `null` e publique de novo.
 */
export const PROMO: { href: string; label: string; cta: string } | null = {
  href: "/black-friday",
  label: "Black Friday 2026: o que vale a pena comprar",
  cta: "Ver seleção",
};
