/**
 * Catálogo estático da loja.
 *
 * Sem banco de dados: todo produto vive aqui. Para adicionar um item, copie um
 * objeto da lista `drafts`, troque o `slug` (único), o `link` de afiliado e os textos.
 * O campo `kind` escolhe as fotos ilustrativas (veja `photoSets`).
 *
 * Este arquivo é importado pelo next.config.ts (para gerar os redirects /ir/*),
 * então ele NÃO pode importar nada com alias "@/" nem código React.
 */

export type CategorySlug = "jogos" | "nostalgia" | "roupas" | "relogios" | "computadores";

export type StoreSlug = "amazon" | "mercadolivre" | "magalu" | "shopee" | "kabum" | "hotmart";

export type TagSlug =
  | "gta6"
  | "lancamento"
  | "playstation"
  | "xbox"
  | "nintendo"
  | "upgrade-pc"
  | "presente-pai"
  | "familia"
  | "setup";

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
  /**
   * Se a loja permite exibir preço e nota digitados à mão.
   * A Amazon só aceita preço vindo da API oficial (PA-API), então lá fica false
   * e o site mostra "Ver preço na Amazon".
   */
  manualPrices: boolean;
}

export interface Photo {
  /** ID da foto no Unsplash (parte depois de images.unsplash.com/). */
  id: string;
  alt: string;
}

export interface Product {
  slug: string;
  title: string;
  category: CategorySlug;
  store: StoreSlug;
  /** Preço em centavos. Deixe vazio em lojas com manualPrices: false. */
  price?: number;
  oldPrice?: number;
  /** Foto principal (a primeira da galeria). */
  image: string;
  imageAlt: string;
  /** Todas as fotos da página do produto, a principal primeiro. */
  gallery: Photo[];
  rating?: number;
  reviews?: number;
  tags: TagSlug[];
  /** Uma linha: aparece nos cards e na busca. */
  summary: string;
  /** Texto da página do produto. */
  description: string;
  highlights: string[];
  /** Link de afiliado completo (https). */
  affiliateUrl: string;
}

export const categories: Category[] = [
  { slug: "jogos", name: "Jogos e consoles", blurb: "Lançamentos, consoles e acessórios", icon: "gamepad" },
  { slug: "nostalgia", name: "Nostalgia", blurb: "Fliperama, fita e vinil de volta à sala", icon: "cassette" },
  { slug: "roupas", name: "Roupas", blurb: "Peças que duram mais que a moda", icon: "shirt" },
  { slug: "relogios", name: "Relógios", blurb: "Para usar hoje e passar adiante", icon: "watch" },
  { slug: "computadores", name: "Computadores", blurb: "PCs, notebooks, periféricos e peças", icon: "monitor" },
];

export const stores: Store[] = [
  // link.amazon = links curtos oficiais do SiteStripe da Amazon.
  { slug: "amazon", name: "Amazon", hosts: ["www.amazon.com.br", "amazon.com.br", "amzn.to", "link.amazon"], manualPrices: false },
  { slug: "mercadolivre", name: "Mercado Livre", hosts: ["www.mercadolivre.com.br", "lista.mercadolivre.com.br", "produto.mercadolivre.com.br", "meli.la"], manualPrices: true },
  { slug: "magalu", name: "Magalu", hosts: ["www.magazinevoce.com.br", "www.magazineluiza.com.br", "divulgador.magalu.com"], manualPrices: true },
  { slug: "shopee", name: "Shopee", hosts: ["shopee.com.br", "s.shopee.com.br"], manualPrices: true },
  { slug: "kabum", name: "KaBuM!", hosts: ["www.kabum.com.br"], manualPrices: true },
  { slug: "hotmart", name: "Hotmart", hosts: ["go.hotmart.com", "pay.hotmart.com"], manualPrices: true },
];

export const tags: Record<TagSlug, string> = {
  gta6: "GTA VI",
  lancamento: "Lançamento",
  playstation: "PlayStation",
  xbox: "Xbox",
  nintendo: "Nintendo",
  "upgrade-pc": "Upgrade de PC",
  "presente-pai": "Presente para o pai",
  familia: "Para a família",
  setup: "Monte seu setup",
};

/*
 * Fotos ilustrativas do Unsplash, agrupadas por tipo de produto.
 * A Amazon só permite usar as fotos dela pela API oficial (PA-API), então,
 * até lá, a página do produto mostra estas e avisa que são ilustrativas.
 * Produtos do mesmo tipo começam em fotos diferentes para a grade não repetir.
 */
const photoSets = {
  ps5: [
    ["photo-1622297845775-5ff3fef71d13", "Console PlayStation 5 branco com controle"],
    ["photo-1607853202273-797f1c22a38e", "Console de videogame e controle sobre a mesa"],
    ["photo-1731405858377-6de0070d8d65", "Console de videogame branco sobre uma mesa"],
  ],
  "ps-controller": [
    ["photo-1768166210760-9c9a4299c436", "Controle de videogame branco sobre fundo liso"],
    ["photo-1774105416183-5058512ec5f0", "Controle branco sobre fundo laranja"],
    ["photo-1664092815283-19c6196f5319", "Controle de videogame em destaque"],
  ],
  ps4: [
    ["photo-1507457379470-08b800bebc67", "Console PlayStation 4 com controle"],
    ["photo-1592840496694-26d035b52b48", "Controle preto de PlayStation 4"],
    ["photo-1518908336710-4e1cf821d3d1", "Console PlayStation 4 sobre a estante"],
  ],
  xbox: [
    ["photo-1621259182978-fbf93132d53d", "Console Xbox preto com controle"],
    ["photo-1604586376807-f73185cf5867", "Controle de Xbox branco"],
    ["photo-1612287230202-1ff1d85d1bdf", "Controle sem fio iluminado por luz colorida"],
  ],
  "xbox-controller": [
    ["photo-1606144042614-b2417e99c4e3", "Controle de Xbox preto e branco"],
    ["photo-1600861194942-f883de0dfe96", "Pessoa segurando um controle preto"],
    ["photo-1612287230202-1ff1d85d1bdf", "Controle sem fio iluminado por luz colorida"],
  ],
  switch: [
    ["photo-1612036781124-847f8939b154", "Nintendo Switch com controles vermelho e azul"],
    ["photo-1578303512597-81e6cc155b3e", "Nintendo Switch ligado com os Joy-Con"],
    ["photo-1585427795543-33cf23ea2853", "Pessoa jogando no Nintendo Switch"],
  ],
  switch2: [
    ["photo-1749138149339-b744bb979317", "Nintendo Switch 2 com a tela acesa"],
    ["photo-1578303512597-81e6cc155b3e", "Console da Nintendo com os Joy-Con"],
    ["photo-1585427795543-33cf23ea2853", "Pessoa jogando num console portátil"],
  ],
  game: [
    ["photo-1593305841991-05c297ba4575", "Tela mostrando um videogame"],
    ["photo-1534423861386-85a16f5d13fd", "Pessoa jogando um jogo de tiro no computador"],
    ["photo-1542751371-adc38448a05e", "Pessoa jogando videogame numa cadeira gamer"],
  ],
  gta: [
    ["photo-1533106497176-45ae19e68ba2", "Fachada de hotel com letreiro de neon numa rua à noite"],
    ["photo-1589066724013-06f34f2cc17c", "Carros numa avenida iluminada entre prédios à noite"],
    ["photo-1535392432937-a27c36ec07b5", "Coqueiros contra o céu do pôr do sol"],
  ],
  headset: [
    ["photo-1610041321327-b794c052db27", "Headset preto e vermelho apoiado numa mesa"],
    ["photo-1560419015-7c427e8ae5ba", "Pessoa usando headset laranja e preto"],
    ["photo-1610041321420-a596dd14ebc9", "Homem de capuz usando headset preto"],
  ],
  chair: [
    ["photo-1770194993269-2521ad916c23", "Cadeira gamer vermelha e preta com luzes ao fundo"],
    ["photo-1770195483917-b3bb444b7a29", "Cadeira gamer com luzes azuis ao fundo"],
    ["photo-1670946839270-cc4febd43b09", "Cadeira de escritório preta e branca"],
  ],
  wheel: [
    ["photo-1760553121003-93afc4d88ae0", "Homem jogando simulador de corrida com volante"],
    ["photo-1771920800290-53f22e5ac3f8", "Mãos com luvas segurando um volante de simulador"],
    ["photo-1771440571270-e27b63085a48", "Simulador de corrida com várias telas"],
  ],
  handheld: [
    ["photo-1776490878540-3788d5f87391", "Console portátil branco de estilo clássico"],
    ["photo-1597840900616-664e930c29df", "Console portátil retrô preto"],
    ["photo-1581198321428-cd65cfc898e5", "Pessoa segurando um console portátil cinza"],
  ],
  arcade: [
    ["photo-1757444838044-d9dcb1bb3017", "Máquina de fliperama antiga com luzes acesas"],
    ["photo-1572289758057-3e0f4327833b", "Gabinete de fliperama retrô"],
    ["photo-1511512578047-dfb367046420", "Sala de jogos com máquinas de fliperama"],
  ],
  vinyl: [
    ["photo-1616714109948-c74fe5029a4d", "Disco de vinil âmbar girando no toca-discos"],
    ["photo-1526394931762-90052e97b376", "Toca-discos preto sobre mesa de madeira"],
    ["photo-1603850121303-d4ade9e5ba65", "Toca-discos de vinil preto e marrom"],
  ],
  cassette: [
    ["photo-1494232410401-ad00d5433cfa", "Fita cassete sobre uma superfície"],
    ["photo-1585435669168-f4cc3f5d1b8e", "Fita cassete cinza sobre fundo amarelo"],
    ["photo-1784751657147-d5a24d71e4c0", "Fita cassete preta sobre fundo de madeira"],
  ],
  pc: [
    ["photo-1616588589676-62b3bd4ff6d2", "Mesa de jogos com computador iluminado e monitor"],
    ["photo-1779452525206-b3bb841dd4e6", "PC gamer branco com iluminação interna"],
    ["photo-1597872200969-2b65d56bd16b", "Gabinete de computador preto com luz azul"],
  ],
  laptop: [
    ["photo-1603302576837-37561b2e2302", "Notebook com tela colorida e teclado iluminado"],
    ["photo-1640955014216-75201056c829", "Pessoa jogando videogame num notebook"],
    ["photo-1782917439464-7d7be18e8912", "Notebook preto com a tela acesa"],
  ],
  keyboard: [
    ["photo-1618384887929-16ec33fab9ef", "Teclado mecânico preto com teclas laranja"],
    ["photo-1635987391914-cb84b567e68f", "Teclado preto e branco com teclas vermelhas"],
    ["photo-1777259113729-9bda92fb8ce8", "Close de um teclado mecânico"],
  ],
  mouse: [
    ["photo-1605773527852-c546a8584ea3", "Mouse com fio preto e vermelho"],
    ["photo-1771444700533-ff7aa34d29fe", "Mouse gamer preto com detalhes azuis"],
    ["photo-1629429408209-1f912961dbd8", "Mouse com fio preto e azul"],
  ],
  monitor: [
    ["photo-1614624532983-4ce03382d63d", "Monitor de tela plana sobre a mesa com teclado"],
    ["photo-1626218174358-7769486c4b79", "Monitor de computador ligado sobre a mesa"],
    ["photo-1775410631936-7de96322df0b", "Setup gamer com vários monitores"],
  ],
  gpu: [
    ["photo-1778621962156-f9b3d255fb5f", "Placa de vídeo preta com três ventoinhas"],
    ["photo-1762838362452-fea83ce9c34c", "Placa de vídeo de três ventoinhas"],
    ["photo-1660855551740-4474188debdb", "Computador por dentro com luz azul"],
  ],
  ssd: [
    ["photo-1591799264318-7e6ef8ddb7ea", "Unidade de armazenamento de computador"],
    ["photo-1518770660439-4636190af475", "Placa de circuito preta em close"],
    ["photo-1562408590-e32931084e23", "Placa de circuito azul"],
  ],
  hd: [
    ["photo-1601737487795-dab272f52420", "Disco rígido prateado e preto"],
    ["photo-1581725645226-92ad3b4c16d8", "Disco rígido preto e prateado"],
    ["photo-1589995186011-a7b485edc4bf", "Disco rígido branco e prateado"],
  ],
  motherboard: [
    ["photo-1782330136040-533166d0c792", "Placa-mãe de computador com processador"],
    ["photo-1712701815718-29f5fe510c0e", "Close de uma placa-mãe de computador"],
    ["photo-1515630278258-407f66498911", "Placa-mãe verde e preta em close"],
  ],
  psu: [
    ["photo-1762508346277-7938c42e2eef", "Gabinete aberto com os componentes à mostra"],
    ["photo-1716062890647-60feae0609d0", "Caixa preta de computador sobre a mesa"],
    ["photo-1675893857450-783969c8922f", "Gabinete de computador preto"],
  ],
  cooler: [
    ["photo-1765824142326-8e9046b1f935", "Cooler branco com três ventoinhas"],
    ["photo-1705614232873-190b1770c6be", "Par de coolers sobre a mesa"],
    ["photo-1759836096416-de8379281362", "Componentes de computador com ventoinha"],
  ],
  ram: [
    ["photo-1541029071515-84cc54f84dc5", "Pente de memória RAM em close"],
    ["photo-1542978709-19c95dc3bc7e", "Pente de memória RAM"],
    ["photo-1562976540-1502c2145186", "Placa de circuito verde em close"],
  ],
  cpu: [
    ["photo-1555616635-640b71bdb185", "Pessoa segurando um processador"],
    ["photo-1540829917886-91ab031b1764", "Processador de computador em close"],
    ["photo-1682068548081-50aa8b92c8c1", "Processador sobre a mesa"],
  ],
  jacket: [
    ["photo-1700993443419-b6f067e734e4", "Homem vestindo jaqueta de couro marrom"],
    ["photo-1602525582399-7ef5f604ff7e", "Homem de jaqueta de couro preta"],
    ["photo-1564628175829-afb5078c0779", "Camisa branca e jaqueta preta"],
  ],
  shirt: [
    ["photo-1782227286076-4f5153a8cdac", "Camisas de flanela xadrez penduradas num cabide"],
    ["photo-1617662408044-cda3ab7134c9", "Homem de camisa xadrez vermelha e branca"],
    ["photo-1630355734650-55fe91e1e5c7", "Camisa xadrez vermelha e preta"],
  ],
  sneakers: [
    ["photo-1542291026-7eec264c27ff", "Tênis vermelho sobre fundo vermelho"],
    ["photo-1571008887538-b36bb32f4571", "Par de tênis azul e branco"],
    ["photo-1709258228137-19a8c193be39", "Par de tênis sobre a mesa"],
  ],
  sport: [
    ["photo-1780398683040-fce0ccbd5ef2", "Homem de roupa esportiva preta sorrindo"],
    ["photo-1785355146243-6a944d173298", "Homem de camiseta esportiva preta"],
    ["photo-1667890786608-8b2f8c60afa6", "Homem de camiseta branca"],
  ],
  sunglasses: [
    ["photo-1589642380614-4a8c2147b857", "Óculos de sol aviador com armação prateada"],
    ["photo-1567473810954-507d59716c25", "Óculos de sol aviador com armação dourada"],
    ["photo-1759227922040-0ca4d3cbe42e", "Óculos de sol aviador sobre fundo amarelo"],
  ],
  wallet: [
    ["photo-1775379557015-938546264440", "Carteiras de couro em vários tons lado a lado"],
    ["photo-1579014134953-1580d7f123f3", "Carteira de couro preta"],
    ["photo-1614260938313-a7fc1a7ad0d2", "Mãos segurando uma carteira e um celular"],
  ],
  chrono: [
    ["photo-1542816340-4d3de5047cfd", "Relógio cronógrafo preto"],
    ["photo-1524805444758-089113d48a6d", "Relógio cronógrafo prateado com pulseira de couro"],
    ["photo-1539874754764-5a96559165b0", "Relógio cronógrafo preto e branco"],
  ],
  dive: [
    ["photo-1691865179028-1729b766a5cd", "Relógio de mergulho apoiado sobre a mesa"],
    ["photo-1612817159949-195b6eb9e31a", "Relógio analógico preto e prateado"],
    ["photo-1773755060442-6d128b70dd20", "Close de um relógio de pulso cronógrafo"],
  ],
  classic: [
    ["photo-1610897534349-7759782118b9", "Relógio analógico preto com detalhes dourados"],
    ["photo-1614703418052-d5b893d495bc", "Relógio redondo dourado e preto"],
    ["photo-1592865239912-7153891acf4a", "Relógio analógico dourado e branco"],
  ],
  digital: [
    ["photo-1579116971616-ea6ab3fff959", "Relógio digital preto e prateado"],
    ["photo-1605583972719-30bd2ca0705a", "Relógio digital preto"],
    ["photo-1684823026928-a4c4e160bec2", "Relógio sobre uma mesa vermelha"],
  ],
  wood: [
    ["photo-1564594995086-b32b7c7f4cd6", "Relógio de madeira sobre uma pedra"],
    ["photo-1594576722512-582bcd46fba3", "Relógio analógico marrom e branco"],
    ["photo-1600003014755-ba31aa59c4b6", "Relógio analógico prata e dourado"],
  ],
  cd: [
    ["photo-1618034100983-e1d78be0dc80", "CD verde, azul e preto"],
    ["photo-1528721602843-51bfb35c8ba8", "Pessoa segurando um CD"],
    ["photo-1533106497176-45ae19e68ba2", "Fachada com letreiro de neon à noite"],
  ],
} satisfies Record<string, [string, string][]>;

type Kind = keyof typeof photoSets;

interface Draft {
  slug: string;
  title: string;
  category: CategorySlug;
  kind: Kind;
  tags: TagSlug[];
  summary: string;
  description: string;
  highlights: string[];
  /** Link de afiliado (link.amazon do SiteStripe, ou outro link https da loja). */
  link: string;
  store?: StoreSlug;
}

/** Busca na Amazon já com a sua tag, para itens sem link próprio. */
const AMAZON_TAG = "meulegadomasc-20";
const amz = (q: string) => `https://www.amazon.com.br/s?k=${encodeURIComponent(q).replace(/%20/g, "+")}&tag=${AMAZON_TAG}`;

const drafts: Draft[] = [
  // ── Jogos: GTA VI ──────────────────────────────────────
  {
    slug: "gta-vi-ps5", title: "Grand Theft Auto VI para PS5", category: "jogos", kind: "gta",
    tags: ["gta6", "lancamento", "playstation"],
    summary: "A volta a Vice City, agora no estado de Leonida, no PS5.",
    description: "O novo GTA leva a série de volta a Vice City, dentro do estado fictício de Leonida, com Jason e Lucia como protagonistas. Esta é a versão para PlayStation 5.",
    highlights: ["Para PlayStation 5", "Lançado em 19/11/2026", "Protagonistas: Jason e Lucia"],
    link: "https://link.amazon/B0djSTu1A",
  },
  {
    slug: "gta-vi-xbox", title: "Grand Theft Auto VI para Xbox Series X|S", category: "jogos", kind: "gta",
    tags: ["gta6", "lancamento", "xbox"],
    summary: "A mesma Leonida, no Xbox Series X ou Series S.",
    description: "A versão de GTA VI para a família Xbox Series. Roda tanto no Series X quanto no Series S. O link abre a busca da Amazon com as ofertas disponíveis.",
    highlights: ["Para Xbox Series X e Series S", "Lançado em 19/11/2026", "Abre a busca com as ofertas do dia"],
    link: amz("grand theft auto vi xbox series"),
  },
  {
    slug: "bundle-gta-vi-ps5-slim", title: "PS5 Slim Digital 825 GB com GTA VI, Astro Bot e Gran Turismo 7", category: "jogos", kind: "ps5",
    tags: ["gta6", "playstation", "lancamento"],
    summary: "O console e o jogo do ano na mesma caixa.",
    description: "Pacote com o PlayStation 5 Slim Edição Digital de 825 GB, GTA VI e os jogos Astro Bot e Gran Turismo 7. Edição digital: não tem leitor de disco, os jogos vêm em código para baixar.",
    highlights: ["PS5 Slim Edição Digital, 825 GB", "Inclui GTA VI, Astro Bot e Gran Turismo 7", "Sem leitor de disco"],
    link: "https://link.amazon/B0fr1U0RN",
  },
  {
    slug: "superposter-gta-vi", title: "Superpôster GTA 6: Jason e Lucia (Arte 2)", category: "jogos", kind: "gta",
    tags: ["gta6"],
    summary: "Jason e Lucia na parede do quarto gamer.",
    description: "Superpôster da revista PlayGames com a arte de Jason e Lucia, os protagonistas de GTA VI. Um jeito barato de deixar o setup com cara de Leonida.",
    highlights: ["Arte oficial de Jason e Lucia", "Superpôster PlayGames", "Bom para decorar o setup"],
    link: "https://link.amazon/B0h9DTOsn",
  },
  {
    slug: "cd-gta-vi-the-album", title: "Grand Theft Auto VI: The Album (CD)", category: "jogos", kind: "cd",
    tags: ["gta6", "lancamento"],
    summary: "A trilha de Leonida em mídia física.",
    description: "O álbum da trilha de GTA VI em CD. Para ouvir no carro, na vitrola de CD de casa ou guardar na coleção.",
    highlights: ["Trilha sonora de GTA VI", "Mídia física em CD", "Item de coleção"],
    link: "https://link.amazon/B094sLGeB",
  },
  {
    slug: "suporte-controle-gta-vi", title: "Suporte de controle GTA VI para PS5", category: "jogos", kind: "ps-controller",
    tags: ["gta6", "playstation", "setup"],
    summary: "Um lugar para o DualSense descansar entre as missões.",
    description: "Suporte de mesa com tema de GTA VI, feito em impressão 3D e com várias cores. Mantém o controle do PS5 organizado no setup.",
    highlights: ["Tema GTA VI", "Impressão 3D multicolorida", "Compatível com o controle do PS5"],
    link: "https://link.amazon/B0cFEosyk",
  },
  {
    slug: "gta-v-ps5", title: "GTA V para PlayStation 5", category: "jogos", kind: "gta",
    tags: ["playstation"],
    summary: "Los Santos para matar a saudade antes de Leonida.",
    description: "Grand Theft Auto V na versão de PS5, com o GTA Online. Um clássico para jogar enquanto não termina o VI, ou para apresentar a série a quem nunca jogou.",
    highlights: ["Versão para PlayStation 5", "Inclui GTA Online", "Mídia física"],
    link: "https://link.amazon/B05rs25T9",
  },
  {
    slug: "gta-v-premium-online", title: "Grand Theft Auto V: Premium Online Edition", category: "jogos", kind: "gta",
    tags: [],
    summary: "GTA V com o pacote inicial do modo online.",
    description: "Edição de GTA V que inclui o jogo completo e o Pacote Criminal Enterprise para começar o GTA Online com mais dinheiro e propriedades.",
    highlights: ["Jogo completo de GTA V", "Pacote Criminal Enterprise", "Confira a plataforma na página da loja"],
    link: "https://link.amazon/B0hSbigPm",
  },

  // ── Jogos: PlayStation ─────────────────────────────────
  {
    slug: "console-ps5-digital", title: "Console PlayStation 5 Edição Digital 825 GB", category: "jogos", kind: "ps5",
    tags: ["gta6", "playstation"],
    summary: "O console para jogar GTA VI, sem leitor de disco.",
    description: "PlayStation 5 Edição Digital, branco, com 825 GB e um controle DualSense. Os jogos são comprados e baixados pela PlayStation Store.",
    highlights: ["Edição Digital, sem leitor de disco", "825 GB de armazenamento", "Controle DualSense incluso"],
    link: "https://link.amazon/B0iVXWUE7",
  },
  {
    slug: "console-ps5-pro", title: "Console PlayStation 5 Pro", category: "jogos", kind: "ps5",
    tags: ["gta6", "playstation"],
    summary: "A versão mais potente do PS5, para TVs 4K.",
    description: "O PS5 Pro é a versão mais forte do console, pensada para quem tem TV 4K e quer mais qualidade de imagem e taxa de quadros nos jogos compatíveis.",
    highlights: ["O PS5 mais potente", "Pensado para TVs 4K", "Roda GTA VI"],
    link: "https://link.amazon/B00AZlGE5",
  },
  {
    slug: "console-ps5-slim-digital-bundle", title: "PS5 Slim Digital 825 GB com Astro Bot e Gran Turismo 7", category: "jogos", kind: "ps5",
    tags: ["playstation", "familia"],
    summary: "Console mais compacto com dois jogos para começar.",
    description: "PlayStation 5 Slim Edição Digital de 825 GB com os jogos Astro Bot e Gran Turismo 7. Astro Bot agrada as crianças; Gran Turismo, quem gosta de carro.",
    highlights: ["PS5 Slim Edição Digital, 825 GB", "Inclui Astro Bot e Gran Turismo 7", "Sem leitor de disco"],
    link: "https://link.amazon/B020eFl8p",
  },
  {
    slug: "bundle-wolverine-ps5-slim", title: "PS5 Slim com disco + Marvel's Wolverine, Astro Bot e Gran Turismo 7", category: "jogos", kind: "ps5",
    tags: ["playstation", "lancamento"],
    summary: "PS5 com leitor de disco e três jogos.",
    description: "Pacote com o PlayStation 5 Slim com leitor de disco, Marvel's Wolverine, Astro Bot e Gran Turismo 7. Com leitor, dá para comprar jogos físicos e usados.",
    highlights: ["PS5 Slim com leitor de disco", "Inclui Marvel's Wolverine", "Também traz Astro Bot e Gran Turismo 7"],
    link: "https://link.amazon/B09qZrW4b",
  },
  {
    slug: "console-ps5-slim-disc-2-controles", title: "PS5 Slim com disco e 2 controles DualSense (importado)", category: "jogos", kind: "ps5",
    tags: ["playstation", "familia"],
    summary: "Já vem com o segundo controle para jogar a dois.",
    description: "PlayStation 5 Slim com leitor de disco e dois controles DualSense, um branco e um preto. É a versão importada da Arábia Saudita (KSA): confira na loja a tomada e a garantia antes de comprar.",
    highlights: ["Leitor de disco", "Dois controles DualSense", "Versão importada (KSA): confira tomada e garantia"],
    link: "https://link.amazon/B01lWGDNG",
  },
  {
    slug: "controle-dualsense", title: "Controle sem fio DualSense branco", category: "jogos", kind: "ps-controller",
    tags: ["playstation", "familia"],
    summary: "O segundo controle para jogar com o filho no sofá.",
    description: "Controle oficial do PS5, na cor branca. Tem gatilhos adaptáveis, resposta tátil, microfone embutido e bateria recarregável.",
    highlights: ["Controle oficial do PS5", "Gatilhos adaptáveis e resposta tátil", "Bateria recarregável"],
    link: "https://link.amazon/B01bAjkCZ",
  },
  {
    slug: "controle-dualsense-wolverine", title: "Controle DualSense Edição Limitada Marvel's Wolverine", category: "jogos", kind: "ps-controller",
    tags: ["playstation", "lancamento"],
    summary: "O DualSense amarelo do Wolverine, edição limitada.",
    description: "Controle sem fio DualSense em edição limitada amarela, com tema de Marvel's Wolverine. Funciona como o DualSense comum e chama atenção na estante.",
    highlights: ["Edição limitada", "Tema Marvel's Wolverine", "Mesmos recursos do DualSense"],
    link: "https://link.amazon/B06T2eLve",
  },
  {
    slug: "base-carregamento-dualsense", title: "Base de carregamento do DualSense", category: "jogos", kind: "ps-controller",
    tags: ["playstation", "setup"],
    summary: "Dois controles carregando sem ocupar o console.",
    description: "Base oficial para carregar dois controles DualSense ao mesmo tempo, sem precisar deixar o PS5 ligado nem ocupar as portas USB.",
    highlights: ["Carrega dois controles", "Não ocupa o console", "Acessório oficial"],
    link: "https://link.amazon/B0dpNha09",
  },
  {
    slug: "drive-disco-ps5", title: "Drive de disco para PS5 Slim e PS5 Pro", category: "jogos", kind: "ps5",
    tags: ["playstation"],
    summary: "Transforma o PS5 digital em versão com disco.",
    description: "Leitor de disco oficial que encaixa no PS5 Slim Digital e no PS5 Pro. Com ele você passa a jogar mídia física e assistir Blu-ray.",
    highlights: ["Para PS5 Slim Digital e PS5 Pro", "Lê jogos em disco e Blu-ray", "Acessório oficial"],
    link: "https://link.amazon/B05pnYLol",
  },
  {
    slug: "marvels-spider-man-2", title: "Marvel's Spider-Man 2 para PS5", category: "jogos", kind: "game",
    tags: ["playstation", "familia"],
    summary: "Peter Parker e Miles Morales na mesma Nova York.",
    description: "Marvel's Spider-Man 2, exclusivo de PS5, com Peter Parker e Miles Morales. Mundo aberto em Nova York e uma história que dá para jogar com a família assistindo.",
    highlights: ["Exclusivo de PS5", "Peter Parker e Miles Morales", "Mundo aberto em Nova York"],
    link: "https://link.amazon/B0brTMNF4",
  },
  {
    slug: "bundle-spider-man-2-miles-morales", title: "Bundle Marvel's Spider-Man 2 + Miles Morales para PS5", category: "jogos", kind: "game",
    tags: ["playstation", "familia"],
    summary: "Dois jogos do Homem-Aranha num pacote só.",
    description: "Pacote com Marvel's Spider-Man 2 e Marvel's Spider-Man: Miles Morales para PlayStation 5.",
    highlights: ["Dois jogos no pacote", "Para PlayStation 5", "Ação em mundo aberto"],
    link: "https://link.amazon/B03mykHl9",
  },
  {
    slug: "god-of-war-laufey", title: "God of War Laufey para PS5", category: "jogos", kind: "game",
    tags: ["playstation", "lancamento"],
    summary: "O novo capítulo da série God of War.",
    description: "God of War Laufey, novo jogo da série, para PlayStation 5. Confira na página da loja a data de lançamento e o conteúdo da edição.",
    highlights: ["Para PlayStation 5", "Série God of War", "Lançamento"],
    link: "https://link.amazon/B09lhyUIS",
  },
  {
    slug: "resident-evil-requiem", title: "Resident Evil Requiem para PS5", category: "jogos", kind: "game",
    tags: ["playstation", "lancamento"],
    summary: "O novo Resident Evil, para jogar de luz acesa.",
    description: "Resident Evil Requiem, novo capítulo da série de terror da Capcom, na versão para PlayStation 5.",
    highlights: ["Para PlayStation 5", "Terror e sobrevivência", "Série Resident Evil"],
    link: "https://link.amazon/B0gVCtSs8",
  },
  {
    slug: "resident-evil-3-remake", title: "Resident Evil 3 Remake para PS5", category: "jogos", kind: "game",
    tags: ["playstation"],
    summary: "Jill Valentine contra o Nemesis, refeito do zero.",
    description: "O remake de Resident Evil 3 na versão para PlayStation 5. A fuga de Raccoon City com gráficos atuais.",
    highlights: ["Para PlayStation 5", "Remake do clássico de 1999", "Terror e ação"],
    link: "https://link.amazon/B019pgyou",
  },
  {
    slug: "pragmata", title: "Pragmata para PS5", category: "jogos", kind: "game",
    tags: ["playstation", "lancamento"],
    summary: "Ficção científica da Capcom numa estação lunar.",
    description: "Pragmata, jogo de ação e ficção científica da Capcom, na versão para PlayStation 5.",
    highlights: ["Para PlayStation 5", "Ação e ficção científica", "Da Capcom"],
    link: "https://link.amazon/B07WhUQ2d",
  },
  {
    slug: "colecao-nioh", title: "Coleção Nioh para PS5", category: "jogos", kind: "game",
    tags: ["playstation"],
    summary: "Nioh 1 e 2 remasterizados para quem gosta de desafio.",
    description: "A Coleção Nioh reúne Nioh e Nioh 2 remasterizados para PlayStation 5, com as expansões. Ação difícil no Japão feudal.",
    highlights: ["Nioh e Nioh 2 remasterizados", "Para PlayStation 5", "Ação no Japão feudal"],
    link: "https://link.amazon/B0cppere2",
  },
  {
    slug: "ea-sports-fc-27", title: "EA Sports FC 27 para PS5", category: "jogos", kind: "game",
    tags: ["playstation", "familia", "lancamento"],
    summary: "O futebol da temporada para jogar com os amigos.",
    description: "EA Sports FC 27 para PlayStation 5. O jogo de futebol da temporada, bom para disputas no sofá com a família e os amigos.",
    highlights: ["Para PlayStation 5", "Temporada 27", "Multiplayer local e online"],
    link: "https://link.amazon/B0aQGQikh",
  },

  // ── Jogos: PlayStation 4 ───────────────────────────────
  {
    slug: "console-ps4-slim", title: "Console PlayStation 4 Slim 500 GB", category: "jogos", kind: "ps4",
    tags: ["playstation", "familia"],
    summary: "Um console com biblioteca enorme e preço menor.",
    description: "PlayStation 4 Slim preto com 500 GB. Uma porta de entrada mais barata, com milhares de jogos já lançados, muitos deles a preço baixo.",
    highlights: ["500 GB de armazenamento", "Biblioteca enorme de jogos", "Versão Slim, mais compacta"],
    link: "https://link.amazon/B0fmLkGHQ",
  },
  {
    slug: "controle-dualshock-4", title: "Controle DualShock 4 preto para PS4", category: "jogos", kind: "ps4",
    tags: ["playstation", "familia"],
    summary: "O controle oficial do PS4, para jogar a dois.",
    description: "Controle sem fio DualShock 4, oficial do PlayStation 4, na cor preta. Também funciona no PC.",
    highlights: ["Controle oficial do PS4", "Sem fio, com bateria recarregável", "Também funciona no PC"],
    link: "https://link.amazon/B064Uat9e",
  },
  {
    slug: "the-last-of-us-part-ii-ps4", title: "The Last of Us Part II para PS4", category: "jogos", kind: "game",
    tags: ["playstation"],
    summary: "Uma das histórias mais marcantes do videogame.",
    description: "The Last of Us Part II para PlayStation 4. Também roda no PS5 pela retrocompatibilidade.",
    highlights: ["Para PS4, roda no PS5", "Aventura e sobrevivência", "Da Naughty Dog"],
    link: "https://link.amazon/B09SvXYQg",
  },
  {
    slug: "ghost-of-tsushima-ps4", title: "Ghost of Tsushima para PS4", category: "jogos", kind: "game",
    tags: ["playstation"],
    summary: "Um samurai contra a invasão mongol.",
    description: "Ghost of Tsushima, Edição Padrão, para PlayStation 4. Mundo aberto no Japão feudal. Também roda no PS5.",
    highlights: ["Para PS4, roda no PS5", "Mundo aberto no Japão feudal", "Edição Padrão"],
    link: "https://link.amazon/B03c9Imjg",
  },
  {
    slug: "god-of-war-iii-remasterizado", title: "God of War III Remasterizado para PS4", category: "jogos", kind: "game",
    tags: ["playstation"],
    summary: "O fim da saga grega de Kratos.",
    description: "God of War III Remasterizado, da linha Hits, para PlayStation 4. A conclusão da fase grega da série.",
    highlights: ["Para PS4, roda no PS5", "Linha PlayStation Hits", "Remasterizado"],
    link: "https://link.amazon/B0iYg5DVM",
  },
  {
    slug: "death-stranding-ps4", title: "Death Stranding para PS4", category: "jogos", kind: "game",
    tags: ["playstation"],
    summary: "A jornada de Hideo Kojima pelos Estados Unidos.",
    description: "Death Stranding, Edição Padrão, para PlayStation 4. Também roda no PS5.",
    highlights: ["Para PS4, roda no PS5", "De Hideo Kojima", "Edição Padrão"],
    link: "https://link.amazon/B09zI4bTx",
  },

  // ── Jogos: Xbox ────────────────────────────────────────
  {
    slug: "console-xbox-series-x-digital", title: "Console Xbox Series X Digital 1 TB", category: "jogos", kind: "xbox",
    tags: ["gta6", "xbox"],
    summary: "O Xbox mais potente, sem leitor de disco.",
    description: "Xbox Series X Digital, branco, com SSD de 1 TB e controle sem fio. Jogos em 4K e até 120 quadros por segundo nos títulos compatíveis. Sem leitor de disco.",
    highlights: ["SSD de 1 TB", "Jogos em 4K, até 120 FPS", "Controle sem fio incluso"],
    link: "https://link.amazon/B0ilBXXcX",
  },
  {
    slug: "console-xbox-series-s", title: "Console Xbox Series S", category: "jogos", kind: "xbox",
    tags: ["gta6", "xbox", "familia"],
    summary: "O jeito mais compacto de jogar GTA VI no Xbox.",
    description: "Xbox Series S, o menor console da geração. Totalmente digital, sem leitor de disco. Roda GTA VI e os jogos do Game Pass.",
    highlights: ["Console digital, sem leitor de disco", "Compacto", "Roda GTA VI"],
    link: "https://link.amazon/B0hQJQkzq",
  },
  {
    slug: "controle-xbox-pulse-red", title: "Controle sem fio Xbox (2025) Pulse Red", category: "jogos", kind: "xbox-controller",
    tags: ["xbox", "familia"],
    summary: "O controle oficial do Xbox em vermelho.",
    description: "Controle sem fio oficial do Xbox, modelo 2025, na cor Pulse Red. Funciona no Xbox, no Windows, no Android, no iOS, em Fire TV Sticks e smart TVs.",
    highlights: ["Controle oficial do Xbox", "Funciona no PC, celular e TV", "Cor Pulse Red"],
    link: "https://link.amazon/B059fSu1Z",
  },
  {
    slug: "headset-sem-fio-xbox", title: "Headset sem fio Xbox", category: "jogos", kind: "headset",
    tags: ["xbox", "setup"],
    summary: "O headset oficial, sem fio, para Xbox e PC.",
    description: "Headset sem fio oficial do Xbox, compatível com Xbox Series X|S, Xbox One e Windows.",
    highlights: ["Sem fio", "Para Xbox Series, Xbox One e Windows", "Acessório oficial"],
    link: "https://link.amazon/B0dehe722",
  },
  {
    slug: "controle-gamesir-g7-pro", title: "Controle GameSir G7 Pro sem fio para Xbox e PC", category: "jogos", kind: "xbox-controller",
    tags: ["xbox", "setup"],
    summary: "Controle profissional com analógicos que não sofrem drift.",
    description: "Controle tri-mode (2.4G, Bluetooth e cabo) para Xbox, PC e Android. Tem joysticks Hall Effect e TMR contra drift, polling de 1000 Hz, botões de macro, giroscópio e vibração com quatro motores.",
    highlights: ["Joysticks Hall Effect e TMR, contra drift", "Sem fio 2.4G, Bluetooth ou cabo", "Polling de 1000 Hz e botões de macro"],
    link: "https://link.amazon/A0dNJ0m8C",
  },
  {
    slug: "controle-gamesir-g7-se", title: "Controle GameSir G7 SE com fio para Xbox e PC", category: "jogos", kind: "xbox-controller",
    tags: ["xbox", "setup"],
    summary: "Controle com fio e joysticks Hall por um preço menor.",
    description: "Controle com fio para Xbox One, Xbox Series X|S e PC, plug and play. Joysticks e gatilhos Hall Effect e entrada de fone de 3,5 mm.",
    highlights: ["Joysticks e gatilhos Hall Effect", "Para Xbox e PC", "Entrada de fone de 3,5 mm"],
    link: "https://link.amazon/A02Xldxo9",
  },
  {
    slug: "console-xbox-one-x", title: "Console Xbox One X 1 TB preto", category: "jogos", kind: "xbox",
    tags: ["xbox"],
    summary: "O Xbox One mais forte, com leitor de disco.",
    description: "Xbox One X preto com 1 TB. A versão mais potente da geração passada, com leitor de disco.",
    highlights: ["1 TB de armazenamento", "Leitor de disco", "Geração Xbox One"],
    link: "https://link.amazon/B0b0HfGj5",
  },
  {
    slug: "console-xbox-one-s-battlefield", title: "Console Xbox One S 1 TB + Battlefield V", category: "jogos", kind: "xbox",
    tags: ["xbox"],
    summary: "Xbox One S com um jogo de guerra na caixa.",
    description: "Xbox One S de 1 TB, versão nacional, com o jogo Battlefield V.",
    highlights: ["1 TB de armazenamento", "Inclui Battlefield V", "Versão nacional"],
    link: "https://link.amazon/B0dOOVcQh",
  },
  {
    slug: "console-xbox-one-s-branco", title: "Console Xbox One S branco 1 TB", category: "jogos", kind: "xbox",
    tags: ["xbox", "familia"],
    summary: "Um Xbox barato para a família começar a jogar.",
    description: "Xbox One S branco com 1 TB e leitor de disco. Bom primeiro console para quem quer gastar menos.",
    highlights: ["1 TB de armazenamento", "Leitor de disco", "Cor branca"],
    link: "https://link.amazon/B05NRPEVF",
  },
  {
    slug: "fonte-xbox-one", title: "Fonte de alimentação para Xbox One bivolt", category: "jogos", kind: "xbox",
    tags: ["xbox"],
    summary: "Fonte de reposição para o Xbox One.",
    description: "Fonte de alimentação bivolt para Xbox One. Confira na página da loja se é compatível com o seu modelo (One, One S ou One X).",
    highlights: ["Bivolt", "Reposição para Xbox One", "Confira a compatibilidade com o seu modelo"],
    link: "https://link.amazon/B08ERxIDC",
  },
  {
    slug: "suporte-vertical-xbox-one-s", title: "Suporte vertical para Xbox One S", category: "jogos", kind: "xbox",
    tags: ["xbox", "setup"],
    summary: "Deixa o console em pé e libera espaço na estante.",
    description: "Suporte preto para deixar o Xbox One S na vertical, sobre a mesa ou o rack.",
    highlights: ["Para Xbox One S", "Console na vertical", "Cor preta"],
    link: "https://link.amazon/B06DWfoAX",
  },

  // ── Jogos: Nintendo ────────────────────────────────────
  {
    slug: "bundle-switch-2-mario-kart-world", title: "Nintendo Switch 2 + Mario Kart World + 3 meses de Online", category: "jogos", kind: "switch2",
    tags: ["nintendo", "familia", "presente-pai"],
    summary: "O novo Switch com o jogo que a família inteira joga junto.",
    description: "Pacote com o Nintendo Switch 2, o jogo Mario Kart World e 3 meses de Nintendo Switch Online. Corrida para até quatro no mesmo console.",
    highlights: ["Nintendo Switch 2", "Inclui Mario Kart World", "3 meses de Nintendo Switch Online"],
    link: "https://link.amazon/B018BtoNv",
  },
  {
    slug: "console-switch-2", title: "Console Nintendo Switch 2 (modelo nacional)", category: "jogos", kind: "switch2",
    tags: ["nintendo", "familia"],
    summary: "O Switch 2 com tomada brasileira.",
    description: "Nintendo Switch 2, modelo nacional com tomada brasileira. Bateria de até 9 horas e Joy-Con com suporte inclusos.",
    highlights: ["Modelo nacional", "Bateria de até 9 horas", "Joy-Con com suporte inclusos"],
    link: "https://link.amazon/B00OhPxoi",
  },
  {
    slug: "bundle-switch-oled-mario-wonder", title: "Nintendo Switch OLED + Super Mario Bros. Wonder + 3 meses de Online", category: "jogos", kind: "switch",
    tags: ["nintendo", "familia", "presente-pai"],
    summary: "Joga na TV ou no colo. O console que a família inteira usa.",
    description: "Pacote com o Nintendo Switch OLED, o jogo Super Mario Bros. Wonder e 3 meses de Nintendo Switch Online. Tela OLED de 7 polegadas e controles destacáveis.",
    highlights: ["Tela OLED de 7 polegadas", "Inclui Super Mario Bros. Wonder", "3 meses de Nintendo Switch Online"],
    link: "https://link.amazon/B04in7BJo",
  },

  // ── Jogos: setup e acessórios ──────────────────────────
  {
    slug: "headset-redragon-zeus-lite", title: "Headset gamer Redragon Zeus Lite H510-LT", category: "jogos", kind: "headset",
    tags: ["setup", "gta6"],
    summary: "Headset com fio P3 que funciona no PC e no console.",
    description: "Headset Redragon Zeus Lite preto, com conector P3. Funciona no PC, no PS5, no Xbox e no celular.",
    highlights: ["Conector P3", "Funciona no PC e nos consoles", "Microfone embutido"],
    link: "https://link.amazon/B01jcnQMj",
  },
  {
    slug: "headset-havit-h2232d", title: "Headset gamer Havit H2232d RGB", category: "jogos", kind: "headset",
    tags: ["setup"],
    summary: "Falantes de 50 mm e iluminação RGB.",
    description: "Headset Havit H2232d com microfone, falantes de 50 mm, conector de 3,5 mm e cabo USB só para a iluminação RGB.",
    highlights: ["Falantes de 50 mm", "Conector 3,5 mm", "Iluminação RGB por USB"],
    link: "https://link.amazon/B090IFYU7",
  },
  {
    slug: "headset-havit-h2002d", title: "Headset gamer Havit H2002d", category: "jogos", kind: "headset",
    tags: ["setup", "xbox", "playstation"],
    summary: "Um clássico de custo-benefício para console.",
    description: "Headset Havit H2002d com microfone, falantes de 53 mm e conector de 3,5 mm. Compatível com Xbox One, PS4 e PC.",
    highlights: ["Falantes de 53 mm", "Conector 3,5 mm", "Para Xbox, PlayStation e PC"],
    link: "https://link.amazon/B03FSxdT2",
  },
  {
    slug: "headset-qcy-heroad-vt200", title: "Headset gamer sem fio QCY Heroad VT200", category: "jogos", kind: "headset",
    tags: ["setup"],
    summary: "Sem fio, com 2.4 GHz e Bluetooth 6.0.",
    description: "Headset sem fio QCY Heroad VT200, com conexão 2.4 GHz e Bluetooth 6.0, som surround 7.1 e drivers de neodímio.",
    highlights: ["Sem fio 2.4 GHz e Bluetooth 6.0", "Som surround 7.1", "Drivers de neodímio"],
    link: "https://link.amazon/B09FgUuW9",
  },
  {
    slug: "cadeira-gamer-branca", title: "Cadeira gamer branca com encosto alto", category: "jogos", kind: "chair",
    tags: ["setup", "gta6"],
    summary: "Para as maratonas de fim de semana.",
    description: "Cadeira de jogos branca com encosto alto, apoios de braço fixos e altura ajustável.",
    highlights: ["Encosto alto", "Altura ajustável", "Cor branca"],
    link: "https://link.amazon/B01YCw2eE",
  },
  {
    slug: "cadeira-gamer-rosa", title: "Cadeira gamer ergonômica rosa com apoio para os pés", category: "jogos", kind: "chair",
    tags: ["setup", "familia"],
    summary: "Para o setup da filha, da esposa ou de quem gosta de rosa.",
    description: "Cadeira gamer ergonômica na cor rosa, com apoio retrátil para os pés.",
    highlights: ["Apoio para os pés", "Ergonômica", "Cor rosa"],
    link: "https://link.amazon/B0au7zAqQ",
  },
  {
    slug: "volante-dazz-force-driving", title: "Volante e pedal Dazz Force Driving", category: "jogos", kind: "wheel",
    tags: ["setup", "familia"],
    summary: "Para jogar corrida como se estivesse dirigindo.",
    description: "Volante com pedais Dazz Force Driving, compatível com PS4, PS3, PC, Xbox One e Xbox 360. Confira na loja a compatibilidade com o jogo que você quer.",
    highlights: ["Volante e pedais", "Para PS4, PS3, PC, Xbox One e 360", "Cor preta"],
    link: "https://link.amazon/B02Wq5sZX",
  },

  // ── Nostalgia ──────────────────────────────────────────
  {
    slug: "cabine-street-fighter-ii", title: "Cabine retrô Street Fighter II Champion Edition (Micro Player)", category: "nostalgia", kind: "arcade",
    tags: ["presente-pai"],
    summary: "O fliperama da padaria em miniatura, na estante.",
    description: "Cabine portátil colecionável de Street Fighter II Champion Edition, da linha Micro Player. Uma réplica pequena do fliperama, que funciona de verdade.",
    highlights: ["Street Fighter II Champion Edition", "Réplica colecionável que funciona", "Linha Micro Player"],
    link: "https://link.amazon/B00dKQ3RB",
  },
  {
    slug: "fliperama-my-arcade-contra", title: "Fliperama portátil My Arcade Contra, edição premium", category: "nostalgia", kind: "arcade",
    tags: ["presente-pai"],
    summary: "Contra num fliperama de 17 cm.",
    description: "Fliperama portátil da My Arcade com o tema de Contra, edição premium de 17 cm, em cinza e preto.",
    highlights: ["Tema Contra", "17 cm de altura", "Edição premium My Arcade"],
    link: "https://link.amazon/B0fzQBFJi",
  },
  {
    slug: "fliperama-duplo-ventura-ryu", title: "Fliperama arcade duplo portátil Ventura Games (Ryu)", category: "nostalgia", kind: "arcade",
    tags: ["familia", "presente-pai"],
    summary: "Dois comandos e milhares de jogos para disputar no sofá.",
    description: "Fliperama portátil para dois jogadores da Ventura Games, com arte do Ryu e 7.200 jogos.",
    highlights: ["Para dois jogadores", "7.200 jogos", "Arte do Ryu"],
    link: "https://link.amazon/B0dAOsr5M",
  },
  {
    slug: "console-portatil-x9", title: "Console portátil X9 com mais de 10.000 jogos retrô", category: "nostalgia", kind: "handheld",
    tags: ["presente-pai", "familia"],
    summary: "Tela de 5,5 polegadas e a infância inteira dentro.",
    description: "Console portátil X9 com tela de 5,5 polegadas e mais de 10 mil jogos retrô já instalados.",
    highlights: ["Tela de 5,5 polegadas", "Mais de 10.000 jogos", "Portátil"],
    link: "https://link.amazon/B0eF5HENm",
  },
  {
    slug: "console-portatil-r36s", title: "Console portátil retrô R36S com 15.000 jogos", category: "nostalgia", kind: "handheld",
    tags: ["presente-pai"],
    summary: "O portátil retrô queridinho, com cartão de 64 GB.",
    description: "Console portátil R36S preto com sistema Linux, tela IPS de 3,5 polegadas e cartão TF de 64 GB com mais de 15 mil jogos. Também toca vídeo.",
    highlights: ["Tela IPS de 3,5 polegadas", "Mais de 15.000 jogos", "Cartão de 64 GB incluso"],
    link: "https://link.amazon/B042LTkIp",
  },
  {
    slug: "vitrola-raveo-sonetto", title: "Vitrola Raveo Sonetto Wood com Bluetooth", category: "nostalgia", kind: "vinyl",
    tags: ["presente-pai", "familia"],
    summary: "Os discos do seu pai tocando de novo na sala.",
    description: "Vitrola Raveo Sonetto em madeira marrom, com USB, Bluetooth e caixa de som de 10 W.",
    highlights: ["Bluetooth e USB", "Caixa de som de 10 W", "Acabamento em madeira"],
    link: "https://link.amazon/B07zk9IpB",
  },
  {
    slug: "vitrola-chrome-black", title: "Vitrola Chrome Black com USB e Bluetooth", category: "nostalgia", kind: "vinyl",
    tags: ["presente-pai"],
    summary: "Vinil, Bluetooth e USB num visual cromado.",
    description: "Vitrola Chrome Black com entrada USB e Bluetooth, bivolt.",
    highlights: ["Bluetooth e USB", "Bivolt", "Acabamento cromado e preto"],
    link: "https://link.amazon/B000DckoX",
  },
  {
    slug: "toca-fitas-portatil", title: "Gravador e tocador de fita cassete portátil", category: "nostalgia", kind: "cassette",
    tags: ["presente-pai"],
    summary: "Grave a fita da viagem em família, como se fazia antes.",
    description: "Gravador e tocador de fita cassete portátil, azul, com alto-falante, microfone e entrada para fone embutidos. Mede 11,6 x 9 x 3,5 cm.",
    highlights: ["Toca e grava fita K7", "Alto-falante e microfone embutidos", "Entrada para fone"],
    link: "https://link.amazon/B0fWHJrb2",
  },

  // ── Roupas ─────────────────────────────────────────────
  {
    slug: "jaqueta-bomber-couro-sintetico", title: "Jaqueta bomber masculina de couro sintético EKROTOK", category: "roupas", kind: "jacket",
    tags: ["presente-pai"],
    summary: "A jaqueta de motoqueiro para o inverno.",
    description: "Jaqueta bomber masculina de couro sintético, leve, para o inverno e para andar de moto.",
    highlights: ["Couro sintético", "Modelo bomber", "Leve"],
    link: "https://link.amazon/B0a9vVgJG",
  },
  {
    slug: "jaqueta-couro-pu-impermeavel", title: "Jaqueta masculina de couro PU impermeável", category: "roupas", kind: "jacket",
    tags: [],
    summary: "Corta o vento e segura a chuva fina.",
    description: "Jaqueta masculina de couro PU, à prova de vento e impermeável, com zíper duplo.",
    highlights: ["Couro PU", "Corta vento e impermeável", "Zíper duplo"],
    link: "https://link.amazon/B0dRRUZuM",
  },
  {
    slug: "camisa-flanela-legendary-whitetails", title: "Camisa de flanela Legendary Whitetails Buck Camp", category: "roupas", kind: "shirt",
    tags: ["presente-pai"],
    summary: "A camisa de sábado de manhã, do churrasco ao cinema.",
    description: "Camisa de flanela xadrez masculina Legendary Whitetails, modelo Buck Camp, com punho de veludo cotelê.",
    highlights: ["Flanela xadrez", "Punho de veludo cotelê", "Manga longa"],
    link: "https://link.amazon/B08fuYe2u",
  },
  {
    slug: "camisa-xadrez-gola-italiana", title: "Camisa masculina xadrez manga longa gola italiana", category: "roupas", kind: "shirt",
    tags: ["presente-pai"],
    summary: "Xadrez com gola italiana para o dia a dia.",
    description: "Camisa masculina xadrez de manga longa, gola italiana e ajuste regular.",
    highlights: ["Gola italiana", "Ajuste regular", "Manga longa"],
    link: "https://link.amazon/B0h5bWGUZ",
  },
  {
    slug: "tenis-mizuno-city-wall-branco", title: "Tênis Mizuno City Wall branco", category: "roupas", kind: "sneakers",
    tags: [],
    summary: "Tênis branco que combina com tudo.",
    description: "Tênis Mizuno City Wall adulto, todo branco. Escolha o número na página da loja.",
    highlights: ["Mizuno City Wall", "Branco", "Escolha o número na loja"],
    link: "https://link.amazon/B08KsuyY0",
  },
  {
    slug: "tenis-mizuno-city-wall-preto", title: "Tênis Mizuno City Wall preto e branco", category: "roupas", kind: "sneakers",
    tags: [],
    summary: "O mesmo City Wall, em preto e branco.",
    description: "Tênis Mizuno City Wall adulto, preto com branco. Escolha o número na página da loja.",
    highlights: ["Mizuno City Wall", "Preto e branco", "Escolha o número na loja"],
    link: "https://link.amazon/B0dTDzK0x",
  },
  {
    slug: "kit-4-camisas-dry-fit", title: "Kit 4 camisas dry-fit masculinas Sandrini", category: "roupas", kind: "sport",
    tags: [],
    summary: "Quatro camisetas para a academia e o treino.",
    description: "Kit com quatro camisetas dry-fit masculinas Sandrini, com proteção UV, em cores sortidas.",
    highlights: ["Quatro camisetas", "Tecido dry-fit com proteção UV", "Cores sortidas"],
    link: "https://link.amazon/B0e5Pger6",
  },
  {
    slug: "bermuda-esportiva-froog", title: "Bermuda esportiva masculina Froog com bolsos", category: "roupas", kind: "sport",
    tags: [],
    summary: "Short de tactel para corrida e academia.",
    description: "Bermuda esportiva masculina Froog de tactel, dry fit e respirável, com bolsos.",
    highlights: ["Tactel dry fit", "Com bolsos", "Para corrida e academia"],
    link: "https://link.amazon/B0dQ7rHTs",
  },
  {
    slug: "oculos-ray-ban-aviator", title: "Óculos de sol Ray-Ban Aviator RB3025L", category: "roupas", kind: "sunglasses",
    tags: ["gta6", "presente-pai"],
    summary: "O aviador original, para usar por décadas.",
    description: "Óculos de sol Ray-Ban Aviator RB3025L, unissex, preto, tamanho 58.",
    highlights: ["Ray-Ban Aviator RB3025L", "Unissex", "Tamanho 58"],
    link: "https://link.amazon/B0bHWlE3c",
  },
  {
    slug: "oculos-aviador-luke-sports", title: "Óculos de sol aviador polarizado Luke Sports", category: "roupas", kind: "sunglasses",
    tags: ["gta6"],
    summary: "O acessório oficial de quem dirige pela orla de Vice City.",
    description: "Óculos de sol aviador unissex Luke Sports, polarizado, com armação de metal e proteção UV400.",
    highlights: ["Lentes polarizadas", "Proteção UV400", "Armação de metal"],
    link: "https://link.amazon/B09bDxI4g",
  },
  {
    slug: "oculos-aviador-cacife", title: "Óculos de sol aviador Cacife Brand", category: "roupas", kind: "sunglasses",
    tags: ["gta6"],
    summary: "Aviador clássico com proteção UV400.",
    description: "Óculos de sol aviador unissex Cacife Brand, armação de metal preta e lentes UV400.",
    highlights: ["Proteção UV400", "Armação de metal", "Unissex"],
    link: "https://link.amazon/B0aBOq3Za",
  },
  {
    slug: "carteira-couro-rfid", title: "Carteira masculina de couro legítimo com RFID", category: "roupas", kind: "wallet",
    tags: ["presente-pai"],
    summary: "Espaço para RG, CNH, cartões e notas.",
    description: "Carteira masculina Couro50 em couro legítimo preto, com proteção RFID e espaço para RG, CNH, cartões e notas.",
    highlights: ["Couro legítimo", "Proteção RFID", "Espaço para documentos"],
    link: "https://link.amazon/B05XRhO7i",
  },
  {
    slug: "carteira-couro-slim", title: "Carteira masculina slim de couro legítimo", category: "roupas", kind: "wallet",
    tags: ["presente-pai"],
    summary: "Fina no bolso, com espaço para a foto da família.",
    description: "Carteira masculina slim em couro legítimo preto. Para quem não gosta de volume no bolso.",
    highlights: ["Couro legítimo", "Modelo slim", "Cor preta"],
    link: "https://link.amazon/B0aUp2KNF",
  },

  // ── Relógios ───────────────────────────────────────────
  {
    slug: "relogio-fossil-nate", title: "Relógio cronógrafo Fossil Nate em aço", category: "relogios", kind: "chrono",
    tags: ["presente-pai"],
    summary: "Mostrador grande e caixa de aço. Feito para durar.",
    description: "Relógio cronógrafo masculino Fossil Nate, de quartzo, em aço inoxidável preto.",
    highlights: ["Cronógrafo de quartzo", "Aço inoxidável preto", "Mostrador grande"],
    link: "https://link.amazon/B049VtMZj",
  },
  {
    slug: "relogio-invicta-i-90242", title: "Relógio Invicta I 90242 cronógrafo preto", category: "relogios", kind: "chrono",
    tags: ["presente-pai"],
    summary: "Cronógrafo social com pulseira de couro.",
    description: "Relógio social masculino Invicta I 90242, com cronógrafo, mostrador preto, pulseira de couro preta e caixa de 44 mm.",
    highlights: ["Cronógrafo", "Pulseira de couro", "Caixa de 44 mm"],
    link: "https://link.amazon/B01hrt29n",
  },
  {
    slug: "relogio-nibosi-2309", title: "Relógio Nibosi 2309 cronógrafo preto em aço", category: "relogios", kind: "chrono",
    tags: [],
    summary: "Cronógrafo com subdiais funcionais e estojo.",
    description: "Relógio masculino Nibosi 2309 preto em aço inoxidável, com cronógrafo e ponteiros pequenos funcionais. Vem com estojo.",
    highlights: ["Subdiais funcionais", "Aço inoxidável", "Vem com estojo"],
    link: "https://link.amazon/B08QUIpJx",
  },
  {
    slug: "relogio-invicta-pro-diver-automatico", title: "Relógio Invicta Pro Diver automático", category: "relogios", kind: "dive",
    tags: ["presente-pai"],
    summary: "Movimento automático: não usa pilha, só precisa ser usado.",
    description: "Relógio masculino Invicta Pro Diver automático, em aço inoxidável, preto com azul-petróleo.",
    highlights: ["Movimento automático", "Estilo mergulhador", "Aço inoxidável"],
    link: "https://link.amazon/B0dnAcrtk",
  },
  {
    slug: "relogio-dourado-quadrado-vintage", title: "Relógio dourado quadrado vintage com couro preto", category: "relogios", kind: "classic",
    tags: ["presente-pai"],
    summary: "Para o casamento, a formatura e as datas que ficam.",
    description: "Relógio masculino dourado, quadrado, de estilo vintage, com pulseira de couro preta.",
    highlights: ["Caixa quadrada dourada", "Pulseira de couro", "Estilo vintage"],
    link: "https://link.amazon/B091AR9gX",
  },
  {
    slug: "relogio-casio-a158wa", title: "Relógio Casio Vintage A158WA prateado", category: "relogios", kind: "digital",
    tags: ["presente-pai", "familia"],
    summary: "O digital clássico que o seu pai usava.",
    description: "Relógio digital unissex Casio Vintage A158WA, com pulseira de aço, cronômetro, alarme diário, luz de LED e bateria de cerca de 7 anos.",
    highlights: ["Cronômetro e alarme", "Luz de LED", "Bateria de cerca de 7 anos"],
    link: "https://link.amazon/B07wh8moc",
  },
  {
    slug: "relogio-casio-a159wgea", title: "Relógio Casio A159WGEA preto e dourado", category: "relogios", kind: "digital",
    tags: ["presente-pai"],
    summary: "O Casio vintage em versão dourada.",
    description: "Relógio digital unissex Casio A159WGEA, preto com dourado.",
    highlights: ["Digital", "Preto e dourado", "Unissex"],
    link: "https://link.amazon/B0iva7gAW",
  },
  {
    slug: "relogio-casio-mw240", title: "Relógio Casio MW-240 analógico", category: "relogios", kind: "digital",
    tags: ["familia"],
    summary: "Números grandes e fáceis de ler.",
    description: "Relógio masculino Casio MW-240 de quartzo, com caixa e pulseira de resina, números arábicos grandes e resistência à água de 50 m.",
    highlights: ["Resistente a 50 m", "Números grandes", "Caixa e pulseira de resina"],
    link: "https://link.amazon/B0fb6c203",
  },
  {
    slug: "relogio-madeira-gravado", title: "Relógio de madeira gravado e personalizado", category: "relogios", kind: "wood",
    tags: ["presente-pai", "familia"],
    summary: "Uma mensagem gravada para o pai, o filho ou o marido.",
    description: "Relógio de madeira com gravação personalizada, para dar de presente ao pai, ao filho, ao marido ou ao namorado. Escolha a mensagem na página da loja.",
    highlights: ["Gravação personalizada", "Caixa de madeira", "Escolha a mensagem na loja"],
    link: "https://link.amazon/B0e26uDLY",
  },

  // ── Computadores: PCs e notebooks ──────────────────────
  {
    slug: "pc-gamer-ryzen-7-rtx-5060-32gb", title: "PC gamer Ryzen 7 5700G, RTX 5060 8 GB, 32 GB de RAM", category: "computadores", kind: "pc",
    tags: ["setup", "gta6"],
    summary: "32 GB de RAM e RTX 5060 para jogar e trabalhar.",
    description: "PC gamer com processador AMD Ryzen 7 5700G, placa de vídeo NVIDIA GeForce RTX 5060 de 8 GB, 32 GB de RAM e SSD NVMe de 500 GB.",
    highlights: ["Ryzen 7 5700G", "RTX 5060 8 GB", "32 GB de RAM e SSD NVMe de 500 GB"],
    link: "https://link.amazon/B05YfDAhe",
  },
  {
    slug: "pc-gamer-hertz-ryzen-5-rtx-5060", title: "PC gamer Hertz Ryzen 5 5500, RTX 5060 8 GB, 16 GB", category: "computadores", kind: "pc",
    tags: ["setup"],
    summary: "RTX 5060 com Ryzen 5 num gabinete gamer.",
    description: "PC gamer Hertz com Ryzen 5 5500, RTX 5060 de 8 GB, 16 GB de RAM e SSD NVMe de 500 GB.",
    highlights: ["Ryzen 5 5500", "RTX 5060 8 GB", "16 GB de RAM e SSD NVMe de 500 GB"],
    link: "https://link.amazon/B0gFyZCPg",
  },
  {
    slug: "pc-gamer-ryzen-7-monitor-24", title: "PC gamer Ryzen 7, RTX 3050 6 GB, SSD 1 TB + monitor 24\"", category: "computadores", kind: "pc",
    tags: ["setup"],
    summary: "Já vem com monitor de 24 polegadas.",
    description: "Kit com PC gamer Ryzen 7, 16 GB de RAM DDR4, SSD de 1 TB, RTX 3050 de 6 GB, Wi-Fi e Windows 11, mais um monitor de 24 polegadas.",
    highlights: ["Monitor de 24\" incluso", "RTX 3050 6 GB e SSD de 1 TB", "Wi-Fi e Windows 11"],
    link: "https://link.amazon/B0a41JSj3",
  },
  {
    slug: "pc-gamer-live-ryzen-5-rtx-3050", title: "PC gamer Live Ryzen 5 5500, RTX 3050 6 GB, 16 GB", category: "computadores", kind: "pc",
    tags: ["setup"],
    summary: "Gabinete com 4 ventoinhas RGB.",
    description: "PC gamer Live com Ryzen 5 5500, 16 GB de RAM RGB, SSD NVMe M.2 de 500 GB, RTX 3050 de 6 GB e gabinete com quatro ventoinhas RGB.",
    highlights: ["Ryzen 5 5500", "RTX 3050 6 GB", "Gabinete com 4 ventoinhas RGB"],
    link: "https://link.amazon/B050OmT9i",
  },
  {
    slug: "pc-gamer-arvex-i7-rtx-3050", title: "PC gamer Arvex branco Intel i7, RTX 3050, 16 GB", category: "computadores", kind: "pc",
    tags: ["setup"],
    summary: "PC branco com Intel i7.",
    description: "PC gamer Arvex branco com Intel i7, GeForce RTX 3050, 16 GB de RAM e SSD de 480 GB.",
    highlights: ["Intel i7", "GeForce RTX 3050", "16 GB de RAM e SSD de 480 GB"],
    link: "https://link.amazon/B0hrgqcZJ",
  },
  {
    slug: "notebook-acer-nitro-v16", title: "Notebook gamer Acer Nitro V16 Core 7 240H, RTX 5050", category: "computadores", kind: "laptop",
    tags: ["setup"],
    summary: "Tela de 16 polegadas a 165 Hz.",
    description: "Notebook gamer Acer Nitro V16 com Intel Core 7 240H, RTX 5050 de 8 GB GDDR7, SSD de 512 GB e tela WUXGA IPS de 16 polegadas a 165 Hz.",
    highlights: ["Tela de 16\" IPS a 165 Hz", "RTX 5050 8 GB", "Core 7 240H e SSD de 512 GB"],
    link: "https://link.amazon/B0iV9C47e",
  },
  {
    slug: "notebook-lenovo-loq-essential-rtx-5050", title: "Notebook gamer Lenovo LOQ Essential i5-13450HX, RTX 5050, 16 GB", category: "computadores", kind: "laptop",
    tags: ["setup"],
    summary: "Joga à noite e trabalha de dia, na mesma mochila.",
    description: "Notebook gamer Lenovo LOQ Essential com Core i5-13450HX, 16 GB de RAM, SSD de 512 GB, RTX 5050 e tela de 15,6 polegadas, com Windows 11.",
    highlights: ["Core i5-13450HX", "RTX 5050 e 16 GB de RAM", "Windows 11"],
    link: "https://link.amazon/B02ZEVSRI",
  },
  {
    slug: "notebook-lenovo-loq-rtx-3050", title: "Notebook gamer Lenovo LOQ i5-13450HX, RTX 3050, 144 Hz", category: "computadores", kind: "laptop",
    tags: ["setup"],
    summary: "Tela de 144 Hz por um preço menor.",
    description: "Notebook gamer Lenovo LOQ com Core i5-13450HX, 8 GB de RAM, SSD de 512 GB, RTX 3050 de 6 GB e tela de 15,6 polegadas a 144 Hz. Vem com Linux.",
    highlights: ["Tela de 15,6\" a 144 Hz", "RTX 3050 6 GB", "Vem com Linux, não Windows"],
    link: "https://link.amazon/B02P1qfr0",
  },

  // ── Computadores: periféricos ──────────────────────────
  {
    slug: "monitor-aoc-agon-q27g4f", title: "Monitor gamer AOC AGON 27\" QHD 180 Hz", category: "computadores", kind: "monitor",
    tags: ["setup"],
    summary: "QHD a 180 Hz com base ajustável.",
    description: "Monitor gamer AOC AGON QUAD Q27G4F de 27 polegadas, resolução QHD, 180 Hz, 0,5 ms, painel IPS, HDR10 e base ajustável.",
    highlights: ["27\" QHD a 180 Hz", "Painel IPS, 0,5 ms", "Base ajustável"],
    link: "https://link.amazon/B02upOB4T",
  },
  {
    slug: "monitor-z-edge-curvo-280hz", title: "Monitor gamer curvo Z-Edge 27\" 280 Hz", category: "computadores", kind: "monitor",
    tags: ["setup"],
    summary: "Curvo e com 280 Hz para jogos competitivos.",
    description: "Monitor gamer curvo Z-Edge de 27 polegadas, Full HD, 280 Hz, curvatura 1500R e 1 ms MPRT. Tem duas DisplayPort, duas HDMI e suporte VESA.",
    highlights: ["27\" Full HD a 280 Hz", "Curvo 1500R", "2 DisplayPort e 2 HDMI"],
    link: "https://link.amazon/B01BNv8kL",
  },
  {
    slug: "monitor-aoc-27b35h", title: "Monitor AOC 27\" 120 Hz IPS 27B35H", category: "computadores", kind: "monitor",
    tags: ["setup", "familia"],
    summary: "27 polegadas a 120 Hz para jogar e estudar.",
    description: "Monitor AOC 27B35H de 27 polegadas, 120 Hz, 1 ms, painel IPS e Adaptive-Sync.",
    highlights: ["27\" a 120 Hz", "Painel IPS", "Adaptive-Sync"],
    link: "https://link.amazon/B00SxIU6B",
  },
  {
    slug: "teclado-redragon-kumara", title: "Teclado mecânico Redragon Kumara ABNT2", category: "computadores", kind: "keyboard",
    tags: ["setup"],
    summary: "O teclado mecânico de entrada mais famoso.",
    description: "Teclado mecânico Redragon Kumara K552-2, layout ABNT2, switch Outemu Brown e iluminação vermelha.",
    highlights: ["Layout ABNT2", "Switch Outemu Brown", "Compacto, sem teclado numérico"],
    link: "https://link.amazon/B00Zkesds",
  },
  {
    slug: "teclado-redragon-dark-avenger", title: "Teclado mecânico Redragon Dark Avenger K568R", category: "computadores", kind: "keyboard",
    tags: ["setup"],
    summary: "Formato 75% com iluminação rainbow.",
    description: "Teclado mecânico Redragon Dark Avenger K568R, preto, com iluminação rainbow e switch marrom.",
    highlights: ["Switch marrom", "Iluminação rainbow", "USB-A"],
    link: "https://link.amazon/B073EBdyQ",
  },
  {
    slug: "teclado-redragon-valheim", title: "Teclado mecânico Redragon Valheim K608-R", category: "computadores", kind: "keyboard",
    tags: ["setup"],
    summary: "Mecânico com switch brown e luz rainbow.",
    description: "Teclado mecânico gamer Redragon Valheim K608-R, preto, switch brown e iluminação rainbow.",
    highlights: ["Switch brown", "Iluminação rainbow", "Cor preta"],
    link: "https://link.amazon/B0b1jRKWt",
  },
  {
    slug: "kit-teclado-mouse-gamer", title: "Kit teclado e mouse gamer RGB para PC e console", category: "computadores", kind: "keyboard",
    tags: ["setup", "familia"],
    summary: "Teclado e mouse juntos para começar o setup.",
    description: "Kit de teclado e mouse gamer com LED RGB rainbow, USB, compatível com PC, PS4, PS5 e Xbox.",
    highlights: ["Teclado e mouse", "LED RGB rainbow", "Para PC e consoles"],
    link: "https://link.amazon/B0dh7ifrV",
  },
  {
    slug: "mouse-redragon-k1ng", title: "Mouse gamer Redragon K1ng 1K M724", category: "computadores", kind: "mouse",
    tags: ["setup"],
    summary: "Sensor PAW3327 de 12.400 DPI e cabo removível.",
    description: "Mouse gamer Redragon K1ng 1K M724 preto, com sensor PAW3327 de 12.400 DPI e cabo USB tipo C removível.",
    highlights: ["Sensor PAW3327, 12.400 DPI", "Cabo USB-C removível", "Cor preta"],
    link: "https://link.amazon/B0btSuRz8",
  },
  {
    slug: "mouse-redragon-predator", title: "Mouse gamer Redragon Predator M612-RGB", category: "computadores", kind: "mouse",
    tags: ["setup"],
    summary: "Mouse com RGB e botões laterais.",
    description: "Mouse gamer Redragon Predator M612-RGB, preto.",
    highlights: ["Iluminação RGB", "Botões laterais", "Cor preta"],
    link: "https://link.amazon/B08HeDfUK",
  },
  {
    slug: "mouse-gamer-rgb-1200dpi", title: "Mouse gamer com fio RGB 1200 DPI", category: "computadores", kind: "mouse",
    tags: ["familia"],
    summary: "Um mouse simples e barato para começar.",
    description: "Mouse gamer com fio USB, iluminação LED RGB e 1.200 DPI. Plug and play, não usa pilha.",
    highlights: ["1.200 DPI", "Iluminação RGB", "Plug and play"],
    link: "https://link.amazon/B049LQKjE",
  },
  {
    slug: "hd-externo-toshiba-4tb", title: "HD externo Toshiba Canvio Basics 4 TB", category: "computadores", kind: "hd",
    tags: ["familia"],
    summary: "Espaço para guardar as fotos da família inteira.",
    description: "HD externo Toshiba Canvio Basics de 4 TB, preto. Bom para backup das fotos e vídeos da família ou para expandir o espaço do console.",
    highlights: ["4 TB", "USB", "Bom para backup"],
    link: "https://link.amazon/B00VmePeB",
  },
  {
    slug: "hd-externo-toshiba-1tb", title: "HD externo Toshiba Canvio Basics 1 TB", category: "computadores", kind: "hd",
    tags: ["familia"],
    summary: "1 TB de backup no bolso.",
    description: "HD externo Toshiba Canvio Basics de 1 TB, preto.",
    highlights: ["1 TB", "USB", "Compacto"],
    link: "https://link.amazon/B06NRVDxu",
  },

  // ── Computadores: peças (upgrade) ──────────────────────
  {
    slug: "placa-de-video-msi-rtx-5060", title: "Placa de vídeo MSI RTX 5060 Shadow 2X OC 8 GB", category: "computadores", kind: "gpu",
    tags: ["upgrade-pc"],
    summary: "RTX 5060 com 8 GB de GDDR7.",
    description: "Placa de vídeo MSI GeForce RTX 5060 Shadow 2X OC, 8 GB GDDR7 de 128 bits e PCIe 5.0.",
    highlights: ["RTX 5060", "8 GB GDDR7", "PCIe 5.0"],
    link: "https://link.amazon/B0biBaQTE",
  },
  {
    slug: "placa-de-video-zotac-rtx-5060-ti-16gb", title: "Placa de vídeo Zotac RTX 5060 Ti Twin Edge OC 16 GB", category: "computadores", kind: "gpu",
    tags: ["upgrade-pc"],
    summary: "16 GB de memória para durar mais anos.",
    description: "Placa de vídeo Zotac GeForce RTX 5060 Ti Twin Edge OC com 16 GB GDDR7 de 128 bits.",
    highlights: ["RTX 5060 Ti", "16 GB GDDR7", "Twin Edge OC"],
    link: "https://link.amazon/B0awcnPbd",
  },
  {
    slug: "placa-de-video-asrock-rx-7600", title: "Placa de vídeo ASRock RX 7600 Challenger Pro OC 8 GB", category: "computadores", kind: "gpu",
    tags: ["upgrade-pc"],
    summary: "Radeon RX 7600 com 8 GB de GDDR6.",
    description: "Placa de vídeo ASRock Radeon RX 7600 Challenger Pro OC, 8 GB GDDR6.",
    highlights: ["Radeon RX 7600", "8 GB GDDR6", "Challenger Pro OC"],
    link: "https://link.amazon/B0hfK9MB6",
  },
  {
    slug: "placa-de-video-gigabyte-rx-9050", title: "Placa de vídeo Gigabyte Radeon RX 9050 Gaming OC 8 GB", category: "computadores", kind: "gpu",
    tags: ["upgrade-pc"],
    summary: "Radeon RX 9050 com refrigeração Windforce.",
    description: "Placa de vídeo Gigabyte Radeon RX 9050 Gaming OC, 8 GB GDDR6, refrigeração Windforce e boost de 2760 MHz.",
    highlights: ["Radeon RX 9050", "8 GB GDDR6", "Refrigeração Windforce"],
    link: "https://link.amazon/B05kGh6D2",
  },
  {
    slug: "placa-de-video-pcyes-rtx-3050", title: "Placa de vídeo PCYES RTX 3050 6 GB", category: "computadores", kind: "gpu",
    tags: ["upgrade-pc"],
    summary: "RTX 3050 de 6 GB para o primeiro upgrade.",
    description: "Placa de vídeo PCYES GeForce RTX 3050, 6 GB GDDR6 de 96 bits, linha Projeto Edge.",
    highlights: ["RTX 3050", "6 GB GDDR6", "Projeto Edge"],
    link: "https://link.amazon/B04ppPPtN",
  },
  {
    slug: "placa-de-video-pcyes-rx-550", title: "Placa de vídeo PCYES RX 550 4 GB", category: "computadores", kind: "gpu",
    tags: ["upgrade-pc"],
    summary: "Para dar vídeo a um PC de escritório.",
    description: "Placa de vídeo PCYES Radeon RX 550, 4 GB GDDR5 de 128 bits, com duas ventoinhas. Serve para jogos leves e para PCs sem vídeo integrado.",
    highlights: ["Radeon RX 550", "4 GB GDDR5", "Duas ventoinhas"],
    link: "https://link.amazon/B0j9XE8q7",
  },
  {
    slug: "processador-ryzen-7-5700x", title: "Processador AMD Ryzen 7 5700X", category: "computadores", kind: "cpu",
    tags: ["upgrade-pc"],
    summary: "8 núcleos para quem já tem placa AM4.",
    description: "Processador AMD Ryzen 7 5700X, 3,4 GHz (até 4,6 GHz), 36 MB de cache, soquete AM4. Não tem vídeo integrado nem cooler na caixa.",
    highlights: ["8 núcleos, até 4,6 GHz", "Soquete AM4", "Sem vídeo integrado e sem cooler"],
    link: "https://link.amazon/B0efYA7sT",
  },
  {
    slug: "processador-ryzen-7-5700g", title: "Processador AMD Ryzen 7 5700G", category: "computadores", kind: "cpu",
    tags: ["upgrade-pc"],
    summary: "8 núcleos com vídeo integrado Vega 8.",
    description: "Processador AMD Ryzen 7 5700G, 8 núcleos e 16 threads, até 4,6 GHz, 16 MB de cache, vídeo integrado Vega 8 e cooler Wraith Stealth.",
    highlights: ["8 núcleos e 16 threads", "Vídeo integrado Vega 8", "Cooler na caixa"],
    link: "https://link.amazon/B02Yn4hQb",
  },
  {
    slug: "processador-ryzen-5-5600gt", title: "Processador AMD Ryzen 5 5600GT", category: "computadores", kind: "cpu",
    tags: ["upgrade-pc"],
    summary: "6 núcleos com vídeo integrado Radeon.",
    description: "Processador AMD Ryzen 5 5600GT, 6 núcleos e 12 threads, até 4,6 GHz, 19 MB de cache, vídeo integrado Radeon e cooler Wraith Stealth.",
    highlights: ["6 núcleos e 12 threads", "Vídeo integrado Radeon", "Cooler na caixa"],
    link: "https://link.amazon/B09P9vsjb",
  },
  {
    slug: "processador-ryzen-5-5500", title: "Processador AMD Ryzen 5 5500", category: "computadores", kind: "cpu",
    tags: ["upgrade-pc"],
    summary: "O processador de custo-benefício do AM4.",
    description: "Processador AMD Ryzen 5 5500, soquete AM4. Não tem vídeo integrado: precisa de placa de vídeo.",
    highlights: ["6 núcleos", "Soquete AM4", "Precisa de placa de vídeo"],
    link: "https://link.amazon/B08DPtTrF",
  },
  {
    slug: "processador-intel-i5-14400f", title: "Processador Intel Core i5-14400F", category: "computadores", kind: "cpu",
    tags: ["upgrade-pc"],
    summary: "Core i5 de 14ª geração, soquete LGA 1700.",
    description: "Processador Intel Core i5-14400F, soquete LGA 1700. O sufixo F indica que não tem vídeo integrado.",
    highlights: ["14ª geração", "Soquete LGA 1700", "Sem vídeo integrado"],
    link: "https://link.amazon/B08oG7bzU",
  },
  {
    slug: "processador-intel-i5-12400f", title: "Processador Intel Core i5-12400F", category: "computadores", kind: "cpu",
    tags: ["upgrade-pc"],
    summary: "Core i5 de 12ª geração com ótimo custo-benefício.",
    description: "Processador Intel Core i5-12400F, 2,5 GHz (até 4,4 GHz), 18 MB de cache, soquete LGA 1700. Sem vídeo integrado.",
    highlights: ["12ª geração, até 4,4 GHz", "Soquete LGA 1700", "Sem vídeo integrado"],
    link: "https://link.amazon/B02AUBKHw",
  },
  {
    slug: "placa-mae-asus-tuf-b650m-e", title: "Placa-mãe Asus TUF Gaming B650M-E Wi-Fi (AM5)", category: "computadores", kind: "motherboard",
    tags: ["upgrade-pc"],
    summary: "AM5 com DDR5 e Wi-Fi.",
    description: "Placa-mãe Asus TUF Gaming B650M-E Wi-Fi, chipset B650, soquete AM5, formato mATX e memória DDR5.",
    highlights: ["Soquete AM5, DDR5", "Wi-Fi", "Formato mATX"],
    link: "https://link.amazon/B0dI7djwY",
  },
  {
    slug: "placa-mae-gigabyte-b650m-gaming-wifi", title: "Placa-mãe Gigabyte B650M Gaming Wi-Fi (AM5)", category: "computadores", kind: "motherboard",
    tags: ["upgrade-pc"],
    summary: "Para Ryzen das séries 7000, 8000 e 9000.",
    description: "Placa-mãe Gigabyte B650M Gaming Wi-Fi, Micro-ATX, soquete AM5 e DDR5, para processadores AMD Ryzen 7000, 8000 e 9000.",
    highlights: ["Soquete AM5, DDR5", "Wi-Fi", "Micro-ATX"],
    link: "https://link.amazon/B0cEBMxIQ",
  },
  {
    slug: "placa-mae-msi-b840m-gaming-wifi6e", title: "Placa-mãe MSI B840M Gaming Wi-Fi 6E (AM5)", category: "computadores", kind: "motherboard",
    tags: ["upgrade-pc"],
    summary: "AM5 com Wi-Fi 6E.",
    description: "Placa-mãe MSI B840M Gaming Wi-Fi 6E, soquete AM5, dois slots DDR5, HDMI, DisplayPort, M.2 e USB 3.2.",
    highlights: ["Soquete AM5, DDR5", "Wi-Fi 6E", "M.2 e USB 3.2"],
    link: "https://link.amazon/B034XimHy",
  },
  {
    slug: "placa-mae-gigabyte-b550m-aorus-elite", title: "Placa-mãe Gigabyte B550M Aorus Elite (AM4)", category: "computadores", kind: "motherboard",
    tags: ["upgrade-pc"],
    summary: "B550 com M.2 NVMe para Ryzen AM4.",
    description: "Placa-mãe Gigabyte B550M Aorus Elite, soquete AM4, DDR4, HDMI, M.2 (PCIe, NVMe e SATA3) e USB 3.2.",
    highlights: ["Soquete AM4, DDR4", "M.2 NVMe", "Chipset B550"],
    link: "https://link.amazon/B0aQBBqdy",
  },
  {
    slug: "placa-mae-asus-tuf-b550m-plus", title: "Placa-mãe Asus TUF Gaming B550M-Plus (AM4)", category: "computadores", kind: "motherboard",
    tags: ["upgrade-pc"],
    summary: "B550 com PCIe 4.0 e LAN Gigabit.",
    description: "Placa-mãe Asus TUF Gaming B550M-Plus, soquete AM4, mATX, PCIe 4.0, M.2 NVMe, DDR4, HDMI e DisplayPort, LAN Gigabit.",
    highlights: ["Soquete AM4, DDR4", "PCIe 4.0 e M.2 NVMe", "HDMI e DisplayPort"],
    link: "https://link.amazon/B04sByHKQ",
  },
  {
    slug: "placa-mae-asus-tuf-a520m-plus-ii", title: "Placa-mãe Asus TUF Gaming A520M-Plus II (AM4)", category: "computadores", kind: "motherboard",
    tags: ["upgrade-pc"],
    summary: "A520 com quatro slots de memória.",
    description: "Placa-mãe Asus TUF Gaming A520M-Plus II, soquete AM4, quatro slots DDR4, HDMI, DisplayPort, D-Sub, M.2 e USB 3.2.",
    highlights: ["Soquete AM4", "Quatro slots DDR4", "HDMI, DisplayPort e D-Sub"],
    link: "https://link.amazon/B03J3LmUy",
  },
  {
    slug: "placa-mae-msi-a520m-a-pro", title: "Placa-mãe MSI A520M-A Pro (AM4)", category: "computadores", kind: "motherboard",
    tags: ["upgrade-pc"],
    summary: "Placa de entrada para Ryzen AM4.",
    description: "Placa-mãe MSI A520M-A Pro, soquete AM4, dois slots DDR4, HDMI, DVI-D, M.2 e USB 3.2.",
    highlights: ["Soquete AM4", "Dois slots DDR4", "M.2 e USB 3.2"],
    link: "https://link.amazon/B03zY9JDA",
  },
  {
    slug: "memoria-corsair-ddr5-6000", title: "Memória Corsair Vengeance DDR5 16 GB 6000 MHz", category: "computadores", kind: "ram",
    tags: ["upgrade-pc"],
    summary: "DDR5 rápida para plataformas AM5 e Intel novas.",
    description: "Memória Corsair Vengeance DDR5 de 16 GB a 6000 MHz, cinza.",
    highlights: ["DDR5", "16 GB", "6000 MHz"],
    link: "https://link.amazon/B03a67PYH",
  },
  {
    slug: "memoria-corsair-ddr5-5200", title: "Memória Corsair Vengeance DDR5 16 GB 5200 MHz", category: "computadores", kind: "ram",
    tags: ["upgrade-pc"],
    summary: "DDR5 com AMD Expo e Intel XMP 3.0.",
    description: "Memória Corsair Vengeance DDR5 de 16 GB (1x16 GB) a 5200 MHz, CL40, com AMD Expo e Intel XMP 3.0.",
    highlights: ["DDR5, 16 GB", "5200 MHz", "AMD Expo e Intel XMP 3.0"],
    link: "https://link.amazon/B055MT5Oc",
  },
  {
    slug: "memoria-kingston-fury-ddr5-8gb-rgb", title: "Memória Kingston Fury Beast DDR5 8 GB 6000 MT/s RGB", category: "computadores", kind: "ram",
    tags: ["upgrade-pc"],
    summary: "DDR5 com RGB sincronizado.",
    description: "Memória Kingston Fury Beast DDR5 de 8 GB a 6000 MT/s, CL36, com RGB e AMD Expo.",
    highlights: ["DDR5, 8 GB", "6000 MT/s", "RGB e AMD Expo"],
    link: "https://link.amazon/B04hkZIxm",
  },
  {
    slug: "memoria-kingston-fury-ddr4-kit-16gb", title: "Kit de memória Kingston Fury Beast DDR4 16 GB (2x8) 3200 MHz", category: "computadores", kind: "ram",
    tags: ["upgrade-pc"],
    summary: "Dois pentes de 8 GB para dual channel.",
    description: "Kit com dois pentes Kingston Fury Beast DDR4 de 8 GB a 3200 MHz, total de 16 GB, para desktop.",
    highlights: ["DDR4, 2x8 GB", "3200 MHz", "Dual channel"],
    link: "https://link.amazon/B04SCcqUZ",
  },
  {
    slug: "memoria-rise-mode-ddr4-16gb", title: "Memória Rise Mode Z DDR4 16 GB 3200 MHz branca", category: "computadores", kind: "ram",
    tags: ["upgrade-pc"],
    summary: "16 GB num pente só, na cor branca.",
    description: "Memória Rise Mode Z Series DDR4 de 16 GB a 3200 MHz, CL19, branca, para desktop.",
    highlights: ["DDR4, 16 GB", "3200 MHz", "Cor branca"],
    link: "https://link.amazon/B0etr95NT",
  },
  {
    slug: "memoria-kingston-fury-ddr4-8gb", title: "Memória Kingston Fury Beast DDR4 8 GB 3200 MHz", category: "computadores", kind: "ram",
    tags: ["upgrade-pc"],
    summary: "8 GB a mais para o PC respirar.",
    description: "Memória Kingston Fury Beast DDR4 de 8 GB a 3200 MHz para desktop.",
    highlights: ["DDR4, 8 GB", "3200 MHz", "Para desktop"],
    link: "https://link.amazon/B01QSEyJq",
  },
  {
    slug: "ssd-kingston-nv3-1tb", title: "SSD Kingston NV3 1 TB M.2 NVMe Gen4", category: "computadores", kind: "ssd",
    tags: ["upgrade-pc", "playstation"],
    summary: "1 TB rápido para o PC ou o notebook.",
    description: "SSD Kingston NV3 de 1 TB, M.2 2280, NVMe PCIe Gen4.",
    highlights: ["1 TB", "M.2 2280 NVMe Gen4", "Para PC e notebook"],
    link: "https://link.amazon/B08AXgNyF",
  },
  {
    slug: "ssd-kingston-nv3-500gb", title: "SSD Kingston NV3 500 GB M.2 NVMe Gen4", category: "computadores", kind: "ssd",
    tags: ["upgrade-pc"],
    summary: "O upgrade que mais acelera um PC antigo.",
    description: "SSD Kingston NV3 de 500 GB, M.2 2280, NVMe PCIe Gen4, para PC ou notebook.",
    highlights: ["500 GB", "M.2 2280 NVMe Gen4", "Para PC e notebook"],
    link: "https://link.amazon/B0fqFXJL2",
  },
  {
    slug: "ssd-wd-green-sn3000-500gb", title: "SSD WD Green SN3000 500 GB NVMe Gen4", category: "computadores", kind: "ssd",
    tags: ["upgrade-pc"],
    summary: "Até 5.000 MB/s de leitura.",
    description: "SSD interno Western Digital WD Green SN3000 de 500 GB, NVMe PCIe Gen4, M.2 2280, com leitura de até 5.000 MB/s.",
    highlights: ["500 GB", "Até 5.000 MB/s", "M.2 2280 NVMe Gen4"],
    link: "https://link.amazon/B08SvMkSL",
  },
  {
    slug: "fonte-corsair-cx650", title: "Fonte Corsair CX650 650 W 80 Plus Bronze", category: "computadores", kind: "psu",
    tags: ["upgrade-pc"],
    summary: "650 W de uma marca confiável.",
    description: "Fonte de alimentação ATX Corsair CX650, 650 W, certificação 80 Plus Bronze.",
    highlights: ["650 W", "80 Plus Bronze", "Padrão ATX"],
    link: "https://link.amazon/B0isyCtA3",
  },
  {
    slug: "fonte-msi-mag-a650bn", title: "Fonte MSI MAG A650BN 650 W 80 Plus Bronze", category: "computadores", kind: "psu",
    tags: ["upgrade-pc"],
    summary: "650 W com PFC ativo.",
    description: "Fonte de alimentação MSI MAG A650BN, 650 W, 80 Plus Bronze, PFC ativo, preta.",
    highlights: ["650 W", "80 Plus Bronze", "PFC ativo"],
    link: "https://link.amazon/B02DlkJm5",
  },
  {
    slug: "water-cooler-kalkan-alpha-360", title: "Water cooler Kalkan Alpha 360 ARGB branco", category: "computadores", kind: "cooler",
    tags: ["upgrade-pc"],
    summary: "Radiador de 360 mm com display de temperatura.",
    description: "Water cooler Kalkan Alpha 360 ARGB branco, com display de temperatura, compatível com Intel e AMD.",
    highlights: ["Radiador de 360 mm", "Display de temperatura", "Intel e AMD"],
    link: "https://link.amazon/B07X4MTd6",
  },
  {
    slug: "air-cooler-redragon-ak400", title: "Air cooler GamerStorm x Redragon AK400", category: "computadores", kind: "cooler",
    tags: ["upgrade-pc"],
    summary: "Quatro heatpipes e ventoinha de 120 mm.",
    description: "Air cooler GamerStorm x Redragon AK400, preto, com quatro heatpipes e ventoinha de 120 mm.",
    highlights: ["4 heatpipes", "Ventoinha de 120 mm", "Cor preta"],
    link: "https://link.amazon/B014qFLYV",
  },
  {
    slug: "cooler-brx-glow-ice", title: "Cooler BRX Glow Ice RGB para Intel e AMD", category: "computadores", kind: "cooler",
    tags: ["upgrade-pc"],
    summary: "Troca simples do cooler original.",
    description: "Cooler BRX Glow Ice RGB, compatível com Intel 1366, 115X e 1700 e AMD AM2, AM3 e AM4.",
    highlights: ["Iluminação RGB", "Intel 1366, 115X e 1700", "AMD AM2, AM3 e AM4"],
    link: "https://link.amazon/B0dqyHsBj",
  },
];

// Monta os produtos: fotos por tipo (girando para não repetir) e o link final.
const used = new Map<Kind, number>();
export const products: Product[] = drafts.map(({ kind, link, store = "amazon", ...d }) => {
  const set = photoSets[kind];
  const n = used.get(kind) ?? 0;
  used.set(kind, n + 1);
  const gallery = set.map((_, i) => {
    const [id, alt] = set[(i + n) % set.length];
    return { id, alt };
  });
  return { ...d, store, gallery, image: gallery[0].id, imageAlt: gallery[0].alt, affiliateUrl: link };
});

// ── Validação no build ───────────────────────────────────
// Quebra o build se um link sair da lista de domínios das lojas
// ou se dois produtos tiverem o mesmo slug ou o mesmo link. Isso impede que um erro
// de digitação vire um redirect para um site qualquer.
const seen = new Set<string>();
const links = new Set<string>();
for (const p of products) {
  if (!/^[a-z0-9-]+$/.test(p.slug)) throw new Error(`Slug inválido: ${p.slug}`);
  if (seen.has(p.slug)) throw new Error(`Slug duplicado: ${p.slug}`);
  seen.add(p.slug);
  if (links.has(p.affiliateUrl)) throw new Error(`Link repetido em ${p.slug}: ${p.affiliateUrl}`);
  links.add(p.affiliateUrl);
  const url = new URL(p.affiliateUrl);
  const store = stores.find((s) => s.slug === p.store);
  if (url.protocol !== "https:") throw new Error(`Link sem https: ${p.slug}`);
  if (!store || !store.hosts.includes(url.hostname)) {
    throw new Error(`Domínio ${url.hostname} não permitido para ${p.slug} (${p.store})`);
  }
  if (!store.manualPrices && (p.price || p.oldPrice || p.rating || p.reviews)) {
    throw new Error(`${p.slug}: a ${store.name} não permite preço ou nota digitados à mão. Remova esses campos.`);
  }
}

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
export const getStore = (slug: StoreSlug) => stores.find((s) => s.slug === slug)!;
export const unsplash = (id: string, w = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
