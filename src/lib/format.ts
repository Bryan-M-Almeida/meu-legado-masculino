const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export const formatPrice = (cents: number) => brl.format(cents / 100);

export const SITE = {
  name: "Meu Legado Masculino",
  url: "https://meulegadomasculino.com.br",
  description:
    "Jogos, nostalgia, roupas, relógios e computadores escolhidos a dedo. Para que seu legado seja lendário.",
};
