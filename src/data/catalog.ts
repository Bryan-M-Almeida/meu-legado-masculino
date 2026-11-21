/**
 * Catálogo estático da loja.
 *
 * Sem banco de dados: todo produto vive aqui. Para adicionar um item, copie um
 * objeto de `products`, troque o `slug` (único) e o link de afiliado.
 *
 * Este arquivo é importado pelo next.config.ts (para gerar os redirects /ir/*),
 * então ele NÃO pode importar nada com alias "@/" nem código React.
 */

export type CategorySlug = "jogos" | "nostalgia" | "roupas" | "relogios" | "computadores";

export type StoreSlug = "amazon" | "mercadolivre" | "magalu" | "shopee" | "kabum" | "hotmart";

export type TagSlug = "gta6" | "lancamento" | "oferta" | "presente-pai" | "familia" | "setup";

export interface Category {
  slug: CategorySlug;
  name: string;
  /** Frase curta que aparece no card de categoria. */
  blurb: string;
  icon: "gamepad" | "cassette" | "shirt" | "watch" | "monitor";
}

export interface Store {
  slug: StoreSlug;
  name: string;
  /** Domínios para onde o /ir/* pode redirecionar. Qualquer outro quebra o build. */
  hosts: string[];
}

export interface Product {
  slug: string;
  title: string;
  category: CategorySlug;
  store: StoreSlug;
  /** Preço em centavos, para evitar erro de ponto flutuante. */
  price: number;
  oldPrice?: number;
  /** ID da foto no Unsplash (parte depois de images.unsplash.com/). */
  image: string;
  imageAlt: string;
  rating: number;
  reviews: number;
  tags: TagSlug[];
  summary: string;
  highlights: string[];
  /** Link de afiliado completo (https). */
  affiliateUrl: string;
}

export const categories: Category[] = [
  { slug: "jogos", name: "Jogos e consoles", blurb: "Lançamentos, consoles e acessórios", icon: "gamepad" },
  { slug: "nostalgia", name: "Nostalgia", blurb: "Fliperama, fita e vinil de volta à sala", icon: "cassette" },
  { slug: "roupas", name: "Roupas", blurb: "Peças que duram mais que a moda", icon: "shirt" },
  { slug: "relogios", name: "Relógios", blurb: "Para usar hoje e passar adiante", icon: "watch" },
  { slug: "computadores", name: "Computadores", blurb: "PCs, notebooks e periféricos", icon: "monitor" },
];

export const stores: Store[] = [
  { slug: "amazon", name: "Amazon", hosts: ["www.amazon.com.br", "amazon.com.br", "amzn.to"] },
  { slug: "mercadolivre", name: "Mercado Livre", hosts: ["www.mercadolivre.com.br", "lista.mercadolivre.com.br", "produto.mercadolivre.com.br", "meli.la"] },
  { slug: "magalu", name: "Magalu", hosts: ["www.magazinevoce.com.br", "www.magazineluiza.com.br", "divulgador.magalu.com"] },
  { slug: "shopee", name: "Shopee", hosts: ["shopee.com.br", "s.shopee.com.br"] },
  { slug: "kabum", name: "KaBuM!", hosts: ["www.kabum.com.br"] },
  { slug: "hotmart", name: "Hotmart", hosts: ["go.hotmart.com", "pay.hotmart.com"] },
];

export const tags: Record<TagSlug, string> = {
  gta6: "GTA VI",
  lancamento: "Lançamento",
  oferta: "Em oferta",
  "presente-pai": "Presente para o pai",
  familia: "Para a família",
  setup: "Monte seu setup",
};

/*
 * Links de exemplo: buscas reais nas lojas com um parâmetro de afiliado fictício.
 * Troque pelos seus links de afiliado antes de publicar.
 */
const qs = (q: string) => encodeURIComponent(q).replace(/%20/g, "+");
const amz = (q: string) => `https://www.amazon.com.br/s?k=${qs(q)}&tag=meulegado-20`;
const ml = (q: string) => `https://lista.mercadolivre.com.br/${encodeURIComponent(q.replace(/\s+/g, "-"))}`;
const kbm = (q: string) => `https://www.kabum.com.br/busca/${encodeURIComponent(q.replace(/\s+/g, "-"))}`;
const shp = (q: string) => `https://shopee.com.br/search?keyword=${qs(q)}`;

export const products: Product[] = [
  // ── Jogos ──────────────────────────────────────────────
  {
    slug: "gta-vi-ps5",
    title: "Grand Theft Auto VI para PS5",
    category: "jogos",
    store: "amazon",
    price: 34990,
    image: "photo-1533106497176-45ae19e68ba2",
    imageAlt: "Fachada de hotel com letreiro de neon numa rua à noite",
    rating: 4.9,
    reviews: 2841,
    tags: ["gta6", "lancamento"],
    summary: "A volta a Vice City, agora no estado de Leonida. Mídia física para PS5.",
    highlights: ["Mídia física", "Lançado em 19/11/2026", "Legendas e menus em português"],
    affiliateUrl: amz("grand theft auto vi ps5"),
  },
  {
    slug: "gta-vi-xbox",
    title: "Grand Theft Auto VI para Xbox Series X|S",
    category: "jogos",
    store: "amazon",
    price: 34990,
    image: "photo-1589066724013-06f34f2cc17c",
    imageAlt: "Carros numa avenida iluminada entre prédios à noite",
    rating: 4.9,
    reviews: 1530,
    tags: ["gta6", "lancamento"],
    summary: "A mesma Leonida, no Xbox Series X ou Series S. Mídia física.",
    highlights: ["Mídia física", "Lançado em 19/11/2026", "Roda no Series X e Series S"],
    affiliateUrl: amz("grand theft auto vi xbox series"),
  },
  {
    slug: "console-ps5-slim",
    title: "Console PlayStation 5 Slim com leitor de disco",
    category: "jogos",
    store: "mercadolivre",
    price: 379900,
    oldPrice: 429900,
    image: "photo-1759493464913-014fdf4b4980",
    imageAlt: "Logotipo PS5 iluminado à noite",
    rating: 4.8,
    reviews: 9120,
    tags: ["gta6", "oferta"],
    summary: "O console para jogar GTA VI no dia em que chega em casa.",
    highlights: ["1 TB de armazenamento", "Leitor de disco", "Controle DualSense incluso"],
    affiliateUrl: ml("playstation 5 slim"),
  },
  {
    slug: "controle-dualsense",
    title: "Controle sem fio DualSense branco",
    category: "jogos",
    store: "amazon",
    price: 44990,
    oldPrice: 49990,
    image: "photo-1768166210760-9c9a4299c436",
    imageAlt: "Controle de videogame branco sobre fundo liso",
    rating: 4.8,
    reviews: 4310,
    tags: ["oferta", "familia"],
    summary: "O segundo controle para jogar com o filho no sofá.",
    highlights: ["Gatilhos adaptáveis", "Bateria recarregável", "Microfone embutido"],
    affiliateUrl: amz("controle dualsense branco"),
  },
  {
    slug: "nintendo-switch-oled",
    title: "Nintendo Switch OLED",
    category: "jogos",
    store: "magalu",
    price: 229900,
    image: "photo-1612036781124-847f8939b154",
    imageAlt: "Console portátil Nintendo Switch com controles vermelho e azul",
    rating: 4.9,
    reviews: 6702,
    tags: ["familia", "presente-pai"],
    summary: "Joga na TV ou no colo. O console que a família inteira usa.",
    highlights: ["Tela OLED de 7 polegadas", "Dois controles destacáveis", "Modo TV e portátil"],
    affiliateUrl: "https://www.magazinevoce.com.br/magazinemeulegado/busca/nintendo+switch+oled/",
  },
  {
    slug: "headset-gamer",
    title: "Headset gamer com microfone removível",
    category: "jogos",
    store: "kabum",
    price: 39900,
    oldPrice: 52900,
    image: "photo-1610041321327-b794c052db27",
    imageAlt: "Headset preto e vermelho apoiado numa mesa",
    rating: 4.6,
    reviews: 1873,
    tags: ["setup", "oferta"],
    summary: "Som posicional para ouvir de onde vem cada passo em Leonida.",
    highlights: ["Som surround 7.1", "Microfone removível", "Funciona no PC e no console"],
    affiliateUrl: kbm("headset gamer"),
  },
  {
    slug: "cadeira-gamer",
    title: "Cadeira gamer reclinável com apoio lombar",
    category: "jogos",
    store: "mercadolivre",
    price: 119900,
    oldPrice: 159900,
    image: "photo-1770194993269-2521ad916c23",
    imageAlt: "Cadeira gamer vermelha e preta com luzes ao fundo",
    rating: 4.5,
    reviews: 2210,
    tags: ["setup", "oferta"],
    summary: "Para as maratonas de fim de semana sem dor nas costas na segunda.",
    highlights: ["Reclina até 180°", "Almofada lombar", "Suporta até 150 kg"],
    affiliateUrl: ml("cadeira gamer reclinavel"),
  },

  // ── Nostalgia ──────────────────────────────────────────
  {
    slug: "console-retro-portatil",
    title: "Console retrô portátil com milhares de jogos",
    category: "nostalgia",
    store: "shopee",
    price: 24900,
    oldPrice: 32900,
    image: "photo-1776490878540-3788d5f87391",
    imageAlt: "Console portátil branco de estilo clássico",
    rating: 4.4,
    reviews: 3550,
    tags: ["presente-pai", "oferta"],
    summary: "A infância do pai cabendo no bolso do filho.",
    highlights: ["Tela de 3,5 polegadas", "Saída para TV", "Bateria para 6 horas"],
    affiliateUrl: shp("console retro portatil"),
  },
  {
    slug: "fliperama-bartop",
    title: "Fliperama bartop para 2 jogadores",
    category: "nostalgia",
    store: "mercadolivre",
    price: 189000,
    image: "photo-1757444838044-d9dcb1bb3017",
    imageAlt: "Máquina de fliperama antiga com luzes acesas",
    rating: 4.7,
    reviews: 640,
    tags: ["familia", "presente-pai"],
    summary: "A ficha agora é por conta da casa. Dois controles, um sofá, uma disputa.",
    highlights: ["Tela de 19 polegadas", "Dois comandos arcade", "Mais de 3 mil jogos"],
    affiliateUrl: ml("fliperama bartop"),
  },
  {
    slug: "vitrola-bluetooth",
    title: "Vitrola retrô com Bluetooth e caixa de som",
    category: "nostalgia",
    store: "amazon",
    price: 45900,
    image: "photo-1616714109948-c74fe5029a4d",
    imageAlt: "Disco de vinil âmbar girando no toca-discos",
    rating: 4.6,
    reviews: 1290,
    tags: ["presente-pai", "familia"],
    summary: "Os discos do seu pai tocando de novo na sala.",
    highlights: ["Toca 33, 45 e 78 rpm", "Bluetooth", "Caixa de som embutida"],
    affiliateUrl: amz("vitrola retro bluetooth"),
  },
  {
    slug: "walkman-bluetooth",
    title: "Toca-fitas portátil com Bluetooth",
    category: "nostalgia",
    store: "shopee",
    price: 28900,
    image: "photo-1494232410401-ad00d5433cfa",
    imageAlt: "Fita cassete sobre uma superfície",
    rating: 4.3,
    reviews: 410,
    tags: ["presente-pai"],
    summary: "Grave a fita da viagem em família, como se fazia antes.",
    highlights: ["Toca e grava fita K7", "Envia som por Bluetooth", "Pilha ou USB"],
    affiliateUrl: shp("toca fitas bluetooth"),
  },

  // ── Roupas ─────────────────────────────────────────────
  {
    slug: "jaqueta-couro",
    title: "Jaqueta de couro legítimo marrom",
    category: "roupas",
    store: "amazon",
    price: 69900,
    oldPrice: 89900,
    image: "photo-1700993443419-b6f067e734e4",
    imageAlt: "Homem vestindo jaqueta de couro marrom",
    rating: 4.7,
    reviews: 880,
    tags: ["oferta"],
    summary: "Fica melhor a cada ano de uso. Um dia vai ser do seu filho.",
    highlights: ["Couro bovino legítimo", "Forro de algodão", "Do P ao GG"],
    affiliateUrl: amz("jaqueta couro masculina marrom"),
  },
  {
    slug: "camisa-flanela",
    title: "Camisa de flanela xadrez",
    category: "roupas",
    store: "shopee",
    price: 15900,
    image: "photo-1782227286076-4f5153a8cdac",
    imageAlt: "Camisas de flanela xadrez penduradas num cabide",
    rating: 4.5,
    reviews: 2120,
    tags: ["presente-pai"],
    summary: "A camisa de sábado de manhã, do churrasco ao cinema.",
    highlights: ["100% algodão", "Botões de pressão", "Várias estampas"],
    affiliateUrl: shp("camisa flanela xadrez masculina"),
  },
  {
    slug: "tenis-casual",
    title: "Tênis casual vermelho de cano baixo",
    category: "roupas",
    store: "mercadolivre",
    price: 49900,
    oldPrice: 59900,
    image: "photo-1542291026-7eec264c27ff",
    imageAlt: "Tênis vermelho sobre fundo vermelho",
    rating: 4.6,
    reviews: 5430,
    tags: ["oferta"],
    summary: "Confortável para o dia todo e discreto o bastante para o trabalho.",
    highlights: ["Solado de borracha", "Palmilha acolchoada", "Do 38 ao 45"],
    affiliateUrl: ml("tenis casual masculino vermelho"),
  },
  {
    slug: "oculos-aviador",
    title: "Óculos de sol aviador com proteção UV400",
    category: "roupas",
    store: "amazon",
    price: 22900,
    image: "photo-1589642380614-4a8c2147b857",
    imageAlt: "Óculos de sol estilo aviador com armação dourada",
    rating: 4.5,
    reviews: 1640,
    tags: ["gta6"],
    summary: "O acessório oficial de quem dirige pela orla de Vice City.",
    highlights: ["Proteção UV400", "Lentes polarizadas", "Estojo rígido"],
    affiliateUrl: amz("oculos aviador polarizado masculino"),
  },
  {
    slug: "carteira-couro",
    title: "Carteira de couro slim",
    category: "roupas",
    store: "amazon",
    price: 12900,
    image: "photo-1775379557015-938546264440",
    imageAlt: "Carteiras de couro em vários tons arrumadas lado a lado",
    rating: 4.7,
    reviews: 3020,
    tags: ["presente-pai"],
    summary: "Fina no bolso, com espaço para a foto da família.",
    highlights: ["Couro legítimo", "Bloqueio RFID", "6 cartões e notas"],
    affiliateUrl: amz("carteira couro slim masculina"),
  },

  // ── Relógios ───────────────────────────────────────────
  {
    slug: "relogio-cronografo",
    title: "Relógio cronógrafo preto em aço",
    category: "relogios",
    store: "amazon",
    price: 129000,
    oldPrice: 159000,
    image: "photo-1542816340-4d3de5047cfd",
    imageAlt: "Relógio cronógrafo preto marcando 5h50",
    rating: 4.8,
    reviews: 720,
    tags: ["presente-pai", "oferta"],
    summary: "Mostrador limpo, caixa de aço. Feito para durar uma geração.",
    highlights: ["Resistente a 100 m", "Vidro de safira", "Caixa de 42 mm"],
    affiliateUrl: amz("relogio cronografo masculino aco preto"),
  },
  {
    slug: "relogio-mergulho",
    title: "Relógio de mergulho automático",
    category: "relogios",
    store: "mercadolivre",
    price: 189000,
    image: "photo-1691865179028-1729b766a5cd",
    imageAlt: "Relógio de mergulho apoiado sobre uma mesa",
    rating: 4.8,
    reviews: 390,
    tags: ["presente-pai"],
    summary: "Movimento automático: não usa pilha, só precisa ser usado.",
    highlights: ["Movimento automático", "Resistente a 200 m", "Luneta giratória"],
    affiliateUrl: ml("relogio mergulho automatico"),
  },
  {
    slug: "relogio-classico-dourado",
    title: "Relógio clássico preto e dourado",
    category: "relogios",
    store: "shopee",
    price: 89900,
    image: "photo-1610897534349-7759782118b9",
    imageAlt: "Relógio analógico preto com detalhes dourados",
    rating: 4.4,
    reviews: 1120,
    tags: ["presente-pai"],
    summary: "Para o casamento, a formatura do filho e as datas que ficam.",
    highlights: ["Pulseira de couro", "Resistente a 30 m", "Caixa de 40 mm"],
    affiliateUrl: shp("relogio classico masculino dourado"),
  },
  {
    slug: "kit-relogio-pai-filho",
    title: "Kit relógios pai e filho",
    category: "relogios",
    store: "amazon",
    price: 49900,
    oldPrice: 64900,
    image: "photo-1600003014755-ba31aa59c4b6",
    imageAlt: "Relógio analógico prata e dourado sobre uma superfície",
    rating: 4.7,
    reviews: 560,
    tags: ["familia", "presente-pai", "oferta"],
    summary: "Dois relógios iguais, um grande e um pequeno. O começo de uma tradição.",
    highlights: ["Dois relógios na caixa", "Pulseiras de aço", "Embalagem para presente"],
    affiliateUrl: amz("kit relogio pai e filho"),
  },

  // ── Computadores ───────────────────────────────────────
  {
    slug: "pc-gamer-rtx",
    title: "PC gamer com placa de vídeo RTX",
    category: "computadores",
    store: "kabum",
    price: 649900,
    oldPrice: 729900,
    image: "photo-1616588589676-62b3bd4ff6d2",
    imageAlt: "Mesa de jogos com computador iluminado e monitor",
    rating: 4.7,
    reviews: 830,
    tags: ["setup", "oferta"],
    summary: "Pronto para jogar no máximo e para quando GTA VI chegar ao PC.",
    highlights: ["Placa de vídeo RTX", "32 GB de RAM", "SSD NVMe de 1 TB"],
    affiliateUrl: kbm("pc gamer rtx"),
  },
  {
    slug: "notebook-gamer",
    title: "Notebook gamer com tela de 144 Hz",
    category: "computadores",
    store: "amazon",
    price: 529900,
    image: "photo-1603302576837-37561b2e2302",
    imageAlt: "Notebook com tela colorida e teclado iluminado",
    rating: 4.6,
    reviews: 1410,
    tags: ["setup"],
    summary: "Joga à noite e trabalha de dia, na mesma mochila.",
    highlights: ["Tela de 15,6 polegadas a 144 Hz", "16 GB de RAM", "SSD de 512 GB"],
    affiliateUrl: amz("notebook gamer 144hz"),
  },
  {
    slug: "teclado-mecanico",
    title: "Teclado mecânico compacto",
    category: "computadores",
    store: "kabum",
    price: 34900,
    oldPrice: 42900,
    image: "photo-1618384887929-16ec33fab9ef",
    imageAlt: "Teclado mecânico preto com teclas laranja",
    rating: 4.7,
    reviews: 2980,
    tags: ["setup", "oferta"],
    summary: "Cada tecla com o clique de uma máquina bem feita.",
    highlights: ["Switches trocáveis", "Layout ABNT2", "Iluminação RGB"],
    affiliateUrl: kbm("teclado mecanico compacto"),
  },
  {
    slug: "mouse-gamer",
    title: "Mouse gamer com sensor de 16.000 DPI",
    category: "computadores",
    store: "amazon",
    price: 18900,
    image: "photo-1605773527852-c546a8584ea3",
    imageAlt: "Mouse com fio preto e vermelho",
    rating: 4.6,
    reviews: 4200,
    tags: ["setup"],
    summary: "Preciso, leve e com botões laterais que você vai usar.",
    highlights: ["16.000 DPI", "6 botões programáveis", "Cabo trançado"],
    affiliateUrl: amz("mouse gamer 16000 dpi"),
  },
  {
    slug: "monitor-165hz",
    title: "Monitor gamer de 27 polegadas a 165 Hz",
    category: "computadores",
    store: "mercadolivre",
    price: 119900,
    oldPrice: 149900,
    image: "photo-1614624532983-4ce03382d63d",
    imageAlt: "Monitor de tela plana sobre a mesa com teclado",
    rating: 4.7,
    reviews: 1760,
    tags: ["setup", "oferta"],
    summary: "Imagem fluida para o jogo e espaço de sobra para o trabalho.",
    highlights: ["165 Hz", "Painel IPS", "Resolução QHD"],
    affiliateUrl: ml("monitor gamer 27 165hz"),
  },
];

// ── Validação no build ───────────────────────────────────
// Quebra o build se um link sair da lista de domínios das lojas
// ou se dois produtos tiverem o mesmo slug. Isso impede que um erro
// de digitação vire um redirect para um site qualquer.
const seen = new Set<string>();
for (const p of products) {
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Slug inválido: ${p.slug}`);
  if (seen.has(p.slug)) throw new Error(`Slug duplicado: ${p.slug}`);
  seen.add(p.slug);
  const url = new URL(p.affiliateUrl);
  const store = stores.find((s) => s.slug === p.store);
  if (url.protocol !== "https:") throw new Error(`Link sem https: ${p.slug}`);
  if (!store || !store.hosts.includes(url.hostname)) {
    throw new Error(`Domínio ${url.hostname} não permitido para ${p.slug} (${p.store})`);
  }
}

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getStore = (slug: StoreSlug) => stores.find((s) => s.slug === slug)!;
export const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
