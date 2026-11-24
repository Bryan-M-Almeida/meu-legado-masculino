import { getProduct } from "./catalog";

/*
 * Guias de compra. Cada guia responde a uma busca que as pessoas fazem no Google
 * e leva aos produtos do catálogo. Regras do conteúdo:
 * - Só fatos que se sustentam (nada de preço, que muda todo dia e a Amazon não
 *   permite copiar). Quando algo não é oficial, o texto diz.
 * - Os produtos citados em `picks` precisam existir no catálogo (o build quebra se não existirem).
 * - Ao revisar um guia, atualize `updated` (aparece na página e no sitemap).
 */

export interface GuideSection {
  heading: string;
  body: string[];
  /** Slugs de produtos do catálogo mostrados no fim da seção. */
  picks?: string[];
}

export interface Guide {
  slug: string;
  /** Título da página (H1). */
  title: string;
  /** Título curto para a aba e o resultado do Google (até ~60 caracteres). */
  seoTitle: string;
  /** Descrição para o Google (até ~155 caracteres). */
  description: string;
  /** Chamada curta no cartão da lista de guias. */
  teaser: string;
  /** Data da última revisão, AAAA-MM-DD. */
  updated: string;
  intro: string[];
  sections: GuideSection[];
  faq: { q: string; a: string }[];
}

export const guides: Guide[] = [
  {
    slug: "gta-6-tudo-sobre",
    title: "GTA 6: data, plataformas, tamanho e o que você precisa para jogar",
    seoTitle: "GTA 6: plataformas, tamanho e o que precisa para jogar",
    description:
      "GTA 6 saiu em 19 de novembro de 2026 para PS5 e Xbox Series. Veja em qual console jogar, quanto espaço ocupa e a situação da versão de PC.",
    teaser: "Em qual console jogar, quanto espaço ocupa e quando sai no PC.",
    updated: "2026-11-24",
    intro: [
      "Grand Theft Auto VI chegou às lojas em 19 de novembro de 2026, para PlayStation 5 e Xbox Series X|S. A história acompanha Jason e Lucia no estado de Leonida, a versão da Rockstar para a Flórida, com Vice City de volta como cidade principal.",
      "Aqui está o que muda na prática para quem quer jogar: os consoles compatíveis, o espaço que o jogo ocupa e o que se sabe sobre a versão de computador.",
    ],
    sections: [
      {
        heading: "Em quais consoles GTA 6 roda",
        body: [
          "GTA 6 saiu só para a geração atual: PS5 (incluindo o Slim e o Pro) e Xbox Series X e Series S. Não existe versão para PS4, Xbox One ou Nintendo Switch.",
          "Se você ainda está no PS4 ou no Xbox One, vai precisar trocar de console. O PS5 Edição Digital e o Xbox Series S são as portas de entrada mais em conta; o PS5 Pro é para quem tem TV 4K e quer a melhor imagem.",
        ],
        picks: ["gta-vi-ps5", "gta-vi-xbox", "bundle-gta-vi-ps5-slim", "console-xbox-series-s"],
      },
      {
        heading: "Quanto espaço GTA 6 ocupa",
        body: [
          "A Rockstar informa até 212 GB de instalação, dependendo do console. A loja do Xbox chega a mostrar um número um pouco maior, e as atualizações podem aumentar esse total com o tempo.",
          "No PS5 de 825 GB e no Xbox Series X de 1 TB cabe com folga junto de outros jogos. O ponto de atenção é o Xbox Series S de 512 GB: sobram cerca de 364 GB livres de fábrica, então GTA 6 cabe, mas ocupa mais da metade do console. Um HD externo ajuda a guardar os outros jogos.",
        ],
        picks: ["hd-externo-toshiba-1tb", "hd-externo-toshiba-4tb"],
      },
      {
        heading: "Edição física ou digital",
        body: [
          "A edição física dá para revender ou emprestar depois, mas exige um console com leitor de disco. O PS5 Edição Digital, o Xbox Series S e o Xbox Series X Digital não leem disco; no PS5 Slim e no PS5 Pro dá para comprar o leitor à parte.",
          "Mesmo na mídia física, o jogo é instalado inteiro no console, então o espaço necessário é o mesmo.",
        ],
        picks: ["drive-disco-ps5"],
      },
      {
        heading: "GTA 6 vai sair para PC?",
        body: [
          "Até agora, a Rockstar não anunciou a versão de PC nem uma data. Em outubro de 2026 surgiram relatos de bastidores apontando o começo de 2027, mas isso não é oficial.",
          "Historicamente, a Rockstar lança no PC depois dos consoles (GTA V levou cerca de um ano e meio). Se você joga no computador e pretende trocar de máquina, vale montar algo que aguente os lançamentos dos próximos anos; nosso guia de PC gamer ajuda nisso.",
        ],
      },
      {
        heading: "Para jogar com conforto",
        body: [
          "Leonida é o maior mapa que a Rockstar já fez, e as sessões costumam ser longas. Um headset faz diferença no som da cidade e nas conversas online; um controle extra resolve quando a família quer revezar.",
        ],
        picks: ["controle-dualsense", "controle-xbox-pulse-red", "headset-redragon-zeus-lite", "suporte-controle-gta-vi"],
      },
    ],
    faq: [
      { q: "Quando GTA 6 foi lançado?", a: "Em 19 de novembro de 2026, para PS5 e Xbox Series X|S." },
      { q: "GTA 6 roda no PS4 ou no Xbox One?", a: "Não. O jogo saiu apenas para PS5 e Xbox Series X|S." },
      {
        q: "Quantos GB tem GTA 6?",
        a: "A Rockstar informa até 212 GB, dependendo do console. Atualizações podem aumentar esse número.",
      },
      {
        q: "GTA 6 tem versão para PC?",
        a: "Ainda não. A Rockstar não anunciou data para o PC; há apenas rumores apontando 2027.",
      },
      {
        q: "GTA 6 cabe no Xbox Series S?",
        a: "Sim. O Series S de 512 GB tem cerca de 364 GB livres, o suficiente para o jogo, mas sobra pouco espaço para outros.",
      },
    ],
  },
  {
    slug: "qual-console-comprar",
    title: "Qual console comprar em 2026: PS5, PS5 Pro, Xbox Series ou Switch 2",
    seoTitle: "Qual console comprar em 2026? PS5, Xbox ou Switch 2",
    description:
      "Comparamos PS5, PS5 Pro, Xbox Series S, Series X e Nintendo Switch 2 para você escolher o console certo para o seu jeito de jogar em 2026.",
    teaser: "PS5, PS5 Pro, Xbox Series ou Switch 2: qual combina com você.",
    updated: "2026-11-24",
    intro: [
      "Não existe o melhor console para todo mundo. Existe o melhor para os jogos que você quer, a TV que você tem e quem vai jogar junto. Este guia resume cada opção em uma frase e depois explica as diferenças.",
    ],
    sections: [
      {
        heading: "Resumo rápido",
        body: [
          "PS5 Edição Digital: o equilíbrio para a maioria, com os exclusivos da Sony e GTA 6.",
          "PS5 Pro: para quem tem TV 4K e quer a melhor imagem do console.",
          "Xbox Series S: o mais compacto e o jeito mais em conta de entrar na geração, com Game Pass.",
          "Xbox Series X: o Xbox mais potente, com mais espaço e imagem 4K.",
          "Nintendo Switch 2: portátil e de sala ao mesmo tempo, ótimo para jogar em família, mas sem GTA 6.",
        ],
      },
      {
        heading: "PlayStation 5: para os exclusivos da Sony",
        body: [
          "O PS5 é a escolha de quem quer jogos como Spider-Man 2, God of War e Ghost of Tsushima, além dos grandes lançamentos como GTA 6 e EA Sports FC. O controle DualSense, com vibração detalhada e gatilhos que fazem força, é um diferencial real.",
          "A Edição Digital não lê disco, e você compra os jogos na loja online. Os modelos Slim aceitam um leitor de disco vendido à parte, caso você mude de ideia depois.",
        ],
        picks: ["console-ps5-digital", "console-ps5-slim-digital-bundle", "bundle-gta-vi-ps5-slim", "bundle-wolverine-ps5-slim"],
      },
      {
        heading: "PS5 Pro: só vale com TV 4K",
        body: [
          "O PS5 Pro roda os mesmos jogos do PS5, com imagem mais nítida e taxa de quadros mais estável nos títulos compatíveis. Ele vem sem leitor de disco e com mais armazenamento.",
          "Se a sua TV é Full HD, a diferença aparece pouco, e o PS5 comum resolve. Com uma TV 4K boa, o Pro é a melhor experiência do console.",
        ],
        picks: ["console-ps5-pro", "drive-disco-ps5"],
      },
      {
        heading: "Xbox Series S e Series X: para quem gosta de Game Pass",
        body: [
          "O grande trunfo do Xbox é o Game Pass, uma assinatura com um catálogo grande de jogos para baixar. Para quem joga muita coisa diferente, ela costuma sair mais barata do que comprar jogo por jogo.",
          "O Series S é pequeno, silencioso e totalmente digital. Funciona muito bem em TVs Full HD, mas o armazenamento enche rápido com jogos grandes como GTA 6. O Series X Digital tem 1 TB e mais potência para TVs 4K.",
        ],
        picks: ["console-xbox-series-s", "console-xbox-series-x-digital", "controle-xbox-pulse-red", "headset-sem-fio-xbox"],
      },
      {
        heading: "Nintendo Switch 2: para jogar em família e em qualquer lugar",
        body: [
          "O Switch 2 encaixa na base para jogar na TV e sai dela para virar portátil. Os jogos da Nintendo, como Mario Kart World, são feitos para jogar junto, o que faz dele o console mais fácil de dividir com crianças e visitas.",
          "Ele não recebe GTA 6 e vários lançamentos grandes de outras empresas. Para muita gente, funciona melhor como segundo console do que como único.",
        ],
        picks: ["bundle-switch-2-mario-kart-world", "console-switch-2", "bundle-switch-oled-mario-wonder"],
      },
      {
        heading: "Vale comprar PS4 ou Xbox One em 2026?",
        body: [
          "Só se o orçamento for o limite e a ideia for curtir a enorme biblioteca de jogos que já existe para eles, como The Last of Us Part II e Ghost of Tsushima. Os lançamentos novos, incluindo GTA 6, não saem mais para essa geração.",
        ],
        picks: ["console-ps4-slim", "console-xbox-one-x"],
      },
    ],
    faq: [
      {
        q: "Qual o melhor console para jogar GTA 6?",
        a: "O PS5 Pro e o Xbox Series X oferecem a melhor imagem. Para a maioria, o PS5 comum é o melhor equilíbrio. O Series S também roda o jogo, com imagem mais simples.",
      },
      {
        q: "Qual a diferença entre o PS5 e o PS5 Pro?",
        a: "Os dois rodam os mesmos jogos. O Pro tem mais potência para imagem mais nítida e estável em TVs 4K, mais armazenamento e vem sem leitor de disco.",
      },
      {
        q: "Xbox Series S ou PS5?",
        a: "O Series S é menor e mais em conta, e brilha com o Game Pass. O PS5 é mais potente e tem os exclusivos da Sony. Com TV 4K ou foco em exclusivos, o PS5 vale mais.",
      },
      {
        q: "O Nintendo Switch 2 roda GTA 6?",
        a: "Não. GTA 6 saiu apenas para PS5 e Xbox Series X|S.",
      },
    ],
  },
  {
    slug: "pc-gamer-custo-beneficio",
    title: "Como montar um PC gamer custo-benefício em 2026",
    seoTitle: "PC gamer custo-benefício em 2026: guia de peças",
    description:
      "Processador, placa de vídeo, memória, SSD e fonte: o que escolher para montar um PC gamer custo-benefício em 2026, peça por peça, sem errar a compatibilidade.",
    teaser: "Peça por peça, sem errar a compatibilidade.",
    updated: "2026-11-24",
    intro: [
      "Montar o próprio PC costuma render mais desempenho pelo mesmo dinheiro do que comprar pronto, e deixa espaço para trocar peças depois. O segredo é gastar onde importa (placa de vídeo) e não errar a compatibilidade entre processador, placa-mãe e memória.",
      "Este guia segue a plataforma AM4 da AMD, que ainda tem o melhor custo-benefício: peças baratas, maduras e fáceis de achar.",
    ],
    sections: [
      {
        heading: "1. Placa de vídeo: onde vai a maior parte do orçamento",
        body: [
          "Em jogos, a placa de vídeo é a peça que mais pesa no resultado. Para jogar em Full HD com qualidade alta, a RTX 5060 e a RX 7600 são as escolhas mais equilibradas. A RTX 5060 Ti de 16 GB tem mais memória de vídeo, o que ajuda nos jogos mais pesados dos próximos anos.",
          "Se o orçamento está apertado, a RTX 3050 ainda roda jogos atuais em Full HD com qualidade média.",
        ],
        picks: ["placa-de-video-msi-rtx-5060", "placa-de-video-asrock-rx-7600", "placa-de-video-zotac-rtx-5060-ti-16gb", "placa-de-video-pcyes-rtx-3050"],
      },
      {
        heading: "2. Processador e placa-mãe: precisam combinar",
        body: [
          "O Ryzen 7 5700X, com 8 núcleos, é o processador mais equilibrado para jogos no AM4. O Ryzen 5 5500 custa menos e dá conta de placas de entrada. Os dois não têm vídeo integrado, então exigem uma placa de vídeo.",
          "Quem quer começar sem placa de vídeo e comprar ela depois pode usar o Ryzen 7 5700G ou o Ryzen 5 5600GT, que têm vídeo integrado.",
          "Todos esses processadores usam o soquete AM4 e funcionam nas placas-mãe B550 e A520. Prefira a B550: ela tem mais recursos e PCIe 4.0, que aproveita melhor as placas de vídeo e SSDs novos com o Ryzen 7 5700X (o 5500, o 5700G e o 5600GT trabalham em PCIe 3.0 em qualquer placa). Atenção: placas-mãe AM5 (B650, B840) não aceitam processadores AM4.",
        ],
        picks: ["processador-ryzen-7-5700x", "processador-ryzen-5-5500", "processador-ryzen-7-5700g", "placa-mae-asus-tuf-b550m-plus", "placa-mae-gigabyte-b550m-aorus-elite"],
      },
      {
        heading: "3. Memória: 16 GB em dois pentes",
        body: [
          "Placas AM4 usam memória DDR4. O ideal é 16 GB em dois pentes de 8 GB (dual channel), a 3200 MHz, o que rende bem mais do que um pente só. Memória DDR5 não serve em placa AM4.",
        ],
        picks: ["memoria-kingston-fury-ddr4-kit-16gb", "memoria-rise-mode-ddr4-16gb"],
      },
      {
        heading: "4. SSD: 1 TB NVMe",
        body: [
          "Jogos atuais passam fácil dos 100 GB. Um SSD NVMe de 1 TB carrega tudo rápido e evita ficar apagando jogo. Se precisar economizar, comece com 500 GB e adicione outro depois.",
        ],
        picks: ["ssd-kingston-nv3-1tb", "ssd-kingston-nv3-500gb"],
      },
      {
        heading: "5. Fonte e refrigeração: não economize na fonte",
        body: [
          "A fonte alimenta todas as peças, e uma fonte ruim pode levar o PC junto quando falha. Para as configurações deste guia, 650 W de marca conhecida com selo 80 Plus Bronze é o suficiente e deixa margem para upgrade.",
          "O Ryzen 5 5500 e o 5700G vêm com cooler na caixa. Para o Ryzen 7 5700X, que vem sem, um air cooler de torre como o AK400 mantém tudo frio e silencioso.",
        ],
        picks: ["fonte-corsair-cx650", "fonte-msi-mag-a650bn", "air-cooler-redragon-ak400"],
      },
      {
        heading: "Prefere comprar pronto?",
        body: [
          "PCs prontos poupam o trabalho de montar e vêm com garantia do conjunto. Confira se a placa de vídeo é dedicada (RTX ou RX) e se a fonte é de marca conhecida. Notebooks gamer são a opção para quem precisa levar a máquina.",
        ],
        picks: ["pc-gamer-ryzen-7-rtx-5060-32gb", "pc-gamer-hertz-ryzen-5-rtx-5060", "notebook-lenovo-loq-essential-rtx-5050", "notebook-acer-nitro-v16"],
      },
    ],
    faq: [
      {
        q: "Qual a peça mais importante de um PC gamer?",
        a: "A placa de vídeo. Ela define quanto o PC aguenta nos jogos; vale colocar a maior parte do orçamento nela.",
      },
      {
        q: "Quanto de memória RAM preciso para jogar?",
        a: "16 GB em dois pentes de 8 GB é o ideal em 2026. 8 GB já limita vários jogos atuais.",
      },
      {
        q: "Posso usar memória DDR5 em placa-mãe AM4?",
        a: "Não. Placas AM4 aceitam apenas DDR4. A DDR5 é para placas AM5 e plataformas Intel mais novas.",
      },
      {
        q: "Qual fonte usar em um PC com RTX 5060?",
        a: "Uma fonte de 650 W de marca conhecida, com selo 80 Plus Bronze ou melhor, atende com folga.",
      },
      {
        q: "GTA 6 vai rodar no PC?",
        a: "A Rockstar ainda não anunciou a versão de PC. Um PC com RTX 5060 ou superior é um bom ponto de partida para os lançamentos dos próximos anos.",
      },
    ],
  },
  {
    slug: "presentes-de-natal-para-homem",
    title: "Presentes de Natal para homem em 2026: ideias por estilo",
    seoTitle: "Presentes de Natal para homem 2026: ideias por estilo",
    description:
      "Ideias de presente de Natal para pai, marido, irmão ou amigo: gamer, nostálgico, elegante ou prático. Escolha pelo estilo dele e acerte no presente.",
    teaser: "Para o gamer, o nostálgico, o elegante e o prático.",
    updated: "2026-11-24",
    intro: [
      "O presente certo é aquele que mostra que você presta atenção em quem ele é. Por isso separamos as ideias por estilo, não por preço. Escolha o grupo que mais combina com ele e veja as opções.",
      "Dica: compre com antecedência. Perto do Natal, os prazos de entrega das lojas ficam mais longos.",
    ],
    sections: [
      {
        heading: "Para o gamer",
        body: [
          "Com GTA 6 recém-lançado, o jogo é o presente mais desejado do ano para quem tem PS5 ou Xbox Series. Para quem já tem o jogo, um controle extra ou um headset melhoram o dia a dia, e a cadeira gamer é o presente para quem passa horas jogando.",
        ],
        picks: ["gta-vi-ps5", "gta-vi-xbox", "controle-dualsense", "headset-redragon-zeus-lite"],
      },
      {
        heading: "Para o nostálgico",
        body: [
          "Para quem cresceu nos fliperamas e nos videogames dos anos 80 e 90, um console retrô é viagem no tempo garantida. A vitrola é para quem guarda os discos do pai ou quer começar uma coleção.",
        ],
        picks: ["cabine-street-fighter-ii", "fliperama-my-arcade-contra", "console-portatil-r36s", "vitrola-raveo-sonetto"],
      },
      {
        heading: "Para o elegante",
        body: [
          "Relógio é o presente que dura décadas e pode passar de pai para filho. Um bom óculos de sol ou uma carteira de couro completam o visual e acompanham o dia a dia.",
        ],
        picks: ["relogio-fossil-nate", "relogio-invicta-pro-diver-automatico", "oculos-ray-ban-aviator", "carteira-couro-rfid"],
      },
      {
        heading: "Para o prático",
        body: [
          "Tem homem que prefere o que vai usar todo dia. Um tênis confortável, uma jaqueta para o inverno ou um kit de camisas dry-fit para o treino quase nunca erram.",
        ],
        picks: ["tenis-mizuno-city-wall-branco", "jaqueta-bomber-couro-sintetico", "kit-4-camisas-dry-fit", "camisa-flanela-legendary-whitetails"],
      },
      {
        heading: "Para a família toda jogar junto",
        body: [
          "Um console da Nintendo é o presente que reúne todo mundo na sala, das crianças aos avós. Mario Kart World é dos jogos mais fáceis de aprender e mais divertidos em grupo.",
        ],
        picks: ["bundle-switch-2-mario-kart-world", "bundle-switch-oled-mario-wonder"],
      },
      {
        heading: "Presente com significado",
        body: [
          "Um relógio de madeira gravado com uma frase ou uma data especial vira lembrança. É o tipo de presente que ele vai mostrar para os outros.",
        ],
        picks: ["relogio-madeira-gravado", "relogio-casio-mw240"],
      },
    ],
    faq: [
      {
        q: "O que dar de presente de Natal para homem que tem tudo?",
        a: "Algo personalizado, como um relógio gravado, ou uma experiência ligada ao hobby dele, como um console retrô ou o lançamento de um jogo esperado.",
      },
      {
        q: "Qual presente para um pai gamer?",
        a: "GTA 6 é o lançamento do ano para PS5 e Xbox Series. Para quem já tem o jogo, um controle extra ou um headset são certeiros.",
      },
      {
        q: "Até quando comprar para chegar antes do Natal?",
        a: "O ideal é comprar até o começo de dezembro. Confira o prazo de entrega na página da loja antes de finalizar.",
      },
    ],
  },
  {
    slug: "relogio-masculino-bom-e-barato",
    title: "Relógio masculino bom e barato: como escolher o seu",
    seoTitle: "Relógio masculino bom e barato: como escolher",
    description:
      "Digital, analógico, cronógrafo ou automático? Entenda as diferenças e escolha um relógio masculino bom e barato, que combine com o seu dia a dia.",
    teaser: "Digital, analógico, cronógrafo ou automático: as diferenças.",
    updated: "2026-11-24",
    intro: [
      "Um bom relógio não precisa custar caro. O que importa é escolher o tipo certo para o seu dia a dia e uma marca que entrega o que promete. Veja as diferenças antes de comprar.",
    ],
    sections: [
      {
        heading: "Digital: o clássico que nunca para",
        body: [
          "Relógios digitais como o Casio A158WA são leves, resistentes, têm alarme, cronômetro e luz, e a bateria dura anos. O visual retrô dos anos 80 voltou com tudo e combina com roupa casual.",
        ],
        picks: ["relogio-casio-a158wa", "relogio-casio-a159wgea"],
      },
      {
        heading: "Analógico simples: vai com tudo",
        body: [
          "Um analógico de ponteiros, como o Casio MW-240, é discreto e fácil de ler. É o relógio para usar todo dia, no trabalho ou no fim de semana, sem pensar.",
        ],
        picks: ["relogio-casio-mw240", "relogio-dourado-quadrado-vintage"],
      },
      {
        heading: "Cronógrafo: mais presença no pulso",
        body: [
          "Cronógrafos têm mostradores menores que funcionam como cronômetro. O visual é mais esportivo e chama atenção, bom para quem gosta de relógio grande. Funcionam com bateria, como a maioria dos relógios.",
        ],
        picks: ["relogio-fossil-nate", "relogio-invicta-i-90242", "relogio-nibosi-2309"],
      },
      {
        heading: "Automático: para quem gosta do mecanismo",
        body: [
          "O relógio automático não usa bateria: ele se dá corda com o movimento do pulso. Se ficar alguns dias parado, ele para e precisa ser acertado. É o tipo preferido de quem gosta de relojoaria e quer algo para passar adiante.",
        ],
        picks: ["relogio-invicta-pro-diver-automatico"],
      },
      {
        heading: "O que olhar antes de comprar",
        body: [
          "Tamanho da caixa: pulsos finos ficam melhor com caixas menores; caixas grandes chamam mais atenção.",
          "Pulseira: aço é durável e vai bem com roupa social; resina e borracha são leves e boas para esporte; couro é elegante, mas não gosta de água.",
          "Resistência à água: confira na página do produto. Muitos relógios aguentam respingos e lavar as mãos, mas não banho de piscina ou mar.",
        ],
      },
    ],
    faq: [
      {
        q: "Qual relógio masculino barato é bom?",
        a: "Os Casio clássicos, como o A158WA (digital) e o MW-240 (analógico), são conhecidos pela durabilidade e pela bateria que dura anos.",
      },
      {
        q: "Qual a diferença entre relógio automático e de quartzo?",
        a: "O de quartzo funciona com bateria e é mais preciso. O automático não usa bateria: se dá corda com o movimento do pulso e para se ficar parado por alguns dias.",
      },
      {
        q: "Posso tomar banho com relógio?",
        a: "Depende da resistência à água do modelo. Confira a especificação na página do produto; relógios só resistentes a respingos não devem ir para o banho.",
      },
    ],
  },
];

for (const g of guides) {
  if (!/^[a-z0-9-]+$/.test(g.slug)) throw new Error(`Slug de guia inválido: ${g.slug}`);
  for (const s of g.sections) {
    for (const slug of s.picks ?? []) {
      if (!getProduct(slug)) throw new Error(`Guia "${g.slug}" cita um produto que não existe: ${slug}`);
    }
  }
}
if (new Set(guides.map((g) => g.slug)).size !== guides.length) throw new Error("Slugs de guia repetidos");

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);

/** "2026-11-24" -> "24 de novembro de 2026" */
export const formatGuideDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });
