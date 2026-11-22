const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const formatPrice = (cents: number) => brl.format(cents / 100);

export const SITE = {
  name: "Meu Legado Masculino",
  url: "https://meulegadomasculino.com.br",
  description:
    "Loja de achados para homens e famílias: jogos e consoles, GTA VI, fliperamas e itens retrô, roupas, relógios, PCs gamer e peças. Compre direto na Amazon.",
  /** Usado no Google para ligar o site à marca. Preencha quando criar as redes sociais. */
  sameAs: [] as string[],
};
