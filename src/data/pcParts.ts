/*
 * Ficha técnica das peças de PC do catálogo, usada pelo "Monte seu PC".
 * Cada entrada aponta para um produto do catálogo pelo slug (a página
 * /monte-seu-pc quebra o build se o produto não existir). Este arquivo não
 * importa o catálogo para não pesar no navegador. O consumo (watts) é uma estimativa de pico, usada só
 * para sugerir a fonte, com folga.
 */

export type Socket = "AM4" | "AM5" | "LGA1700";
export type RamType = "DDR4" | "DDR5";
export type StepId = "cpu" | "mb" | "ram" | "gpu" | "ssd" | "psu" | "cooler";

interface Base {
  slug: string;
  /** Duas a três características curtas mostradas no cartão. */
  specs: string[];
}

export interface Cpu extends Base {
  socket: Socket;
  igpu: boolean;
  /** Vem com cooler na caixa. */
  cooler: boolean;
  watts: number;
  pcie: 3 | 4;
}
export interface Board extends Base {
  socket: Socket;
  ram: RamType;
}
export interface Ram extends Base {
  type: RamType;
  gb: number;
  /** Quantos pentes vêm na embalagem. */
  sticks: number;
}
export interface Gpu extends Base {
  watts: number;
  /** 1 = básico ... 4 = forte. Define o "nível" do PC. */
  tier: 1 | 2 | 3 | 4;
}
export interface Ssd extends Base {
  gb: number;
}
export interface Psu extends Base {
  watts: number;
}
export interface Cooler extends Base {
  sockets: Socket[];
  kind: "air" | "water";
}

export const pcParts = {
  cpu: [
    { slug: "processador-ryzen-5-5500", socket: "AM4", igpu: false, cooler: true, watts: 90, pcie: 3, specs: ["6 núcleos", "Cooler na caixa", "Precisa de placa de vídeo"] },
    { slug: "processador-ryzen-5-5600gt", socket: "AM4", igpu: true, cooler: true, watts: 90, pcie: 3, specs: ["6 núcleos", "Vídeo integrado", "Cooler na caixa"] },
    { slug: "processador-ryzen-7-5700g", socket: "AM4", igpu: true, cooler: true, watts: 90, pcie: 3, specs: ["8 núcleos", "Vídeo integrado", "Cooler na caixa"] },
    { slug: "processador-ryzen-7-5700x", socket: "AM4", igpu: false, cooler: false, watts: 90, pcie: 4, specs: ["8 núcleos", "Sem cooler na caixa", "Precisa de placa de vídeo"] },
    { slug: "processador-intel-i5-12400f", socket: "LGA1700", igpu: false, cooler: true, watts: 120, pcie: 4, specs: ["6 núcleos", "Soquete LGA 1700", "Precisa de placa de vídeo"] },
    { slug: "processador-intel-i5-14400f", socket: "LGA1700", igpu: false, cooler: true, watts: 150, pcie: 4, specs: ["10 núcleos", "Soquete LGA 1700", "Precisa de placa de vídeo"] },
  ] satisfies Cpu[],
  mb: [
    { slug: "placa-mae-msi-a520m-a-pro", socket: "AM4", ram: "DDR4", specs: ["AM4", "DDR4", "Entrada"] },
    { slug: "placa-mae-asus-tuf-a520m-plus-ii", socket: "AM4", ram: "DDR4", specs: ["AM4", "DDR4", "Entrada"] },
    { slug: "placa-mae-asus-tuf-b550m-plus", socket: "AM4", ram: "DDR4", specs: ["AM4", "DDR4", "PCIe 4.0"] },
    { slug: "placa-mae-gigabyte-b550m-aorus-elite", socket: "AM4", ram: "DDR4", specs: ["AM4", "DDR4", "PCIe 4.0"] },
    { slug: "placa-mae-asus-tuf-b650m-e", socket: "AM5", ram: "DDR5", specs: ["AM5", "DDR5", "Wi-Fi"] },
    { slug: "placa-mae-gigabyte-b650m-gaming-wifi", socket: "AM5", ram: "DDR5", specs: ["AM5", "DDR5", "Wi-Fi"] },
    { slug: "placa-mae-msi-b840m-gaming-wifi6e", socket: "AM5", ram: "DDR5", specs: ["AM5", "DDR5", "Wi-Fi 6E"] },
  ] satisfies Board[],
  ram: [
    { slug: "memoria-kingston-fury-ddr4-kit-16gb", type: "DDR4", gb: 16, sticks: 2, specs: ["DDR4", "16 GB (2 x 8)", "3200 MHz"] },
    { slug: "memoria-rise-mode-ddr4-16gb", type: "DDR4", gb: 16, sticks: 1, specs: ["DDR4", "16 GB", "3200 MHz"] },
    { slug: "memoria-kingston-fury-ddr4-8gb", type: "DDR4", gb: 8, sticks: 1, specs: ["DDR4", "8 GB", "3200 MHz"] },
    { slug: "memoria-corsair-ddr5-6000", type: "DDR5", gb: 16, sticks: 1, specs: ["DDR5", "16 GB", "6000 MHz"] },
    { slug: "memoria-corsair-ddr5-5200", type: "DDR5", gb: 16, sticks: 1, specs: ["DDR5", "16 GB", "5200 MHz"] },
    { slug: "memoria-kingston-fury-ddr5-8gb-rgb", type: "DDR5", gb: 8, sticks: 1, specs: ["DDR5", "8 GB", "RGB"] },
  ] satisfies Ram[],
  gpu: [
    { slug: "placa-de-video-pcyes-rx-550", watts: 50, tier: 1, specs: ["4 GB", "Para tarefas e jogos leves"] },
    { slug: "placa-de-video-pcyes-rtx-3050", watts: 75, tier: 2, specs: ["6 GB", "Full HD no médio"] },
    { slug: "placa-de-video-asrock-rx-7600", watts: 165, tier: 3, specs: ["8 GB", "Full HD no alto"] },
    { slug: "placa-de-video-gigabyte-rx-9050", watts: 170, tier: 3, specs: ["8 GB", "Full HD no alto"] },
    { slug: "placa-de-video-msi-rtx-5060", watts: 145, tier: 3, specs: ["8 GB", "Full HD no alto", "DLSS 4"] },
    { slug: "placa-de-video-zotac-rtx-5060-ti-16gb", watts: 180, tier: 4, specs: ["16 GB", "Full HD no máximo e 1440p", "DLSS 4"] },
  ] satisfies Gpu[],
  ssd: [
    { slug: "ssd-kingston-nv3-500gb", gb: 500, specs: ["500 GB", "NVMe Gen4"] },
    { slug: "ssd-wd-green-sn3000-500gb", gb: 500, specs: ["500 GB", "NVMe Gen4"] },
    { slug: "ssd-kingston-nv3-1tb", gb: 1000, specs: ["1 TB", "NVMe Gen4"] },
  ] satisfies Ssd[],
  psu: [
    { slug: "fonte-corsair-cx650", watts: 650, specs: ["650 W", "80 Plus Bronze"] },
    { slug: "fonte-msi-mag-a650bn", watts: 650, specs: ["650 W", "80 Plus Bronze"] },
  ] satisfies Psu[],
  cooler: [
    { slug: "cooler-brx-glow-ice", sockets: ["AM4", "LGA1700"], kind: "air", specs: ["Air cooler", "RGB"] },
    { slug: "air-cooler-redragon-ak400", sockets: ["AM4", "AM5", "LGA1700"], kind: "air", specs: ["Air cooler de torre", "Silencioso"] },
    { slug: "water-cooler-kalkan-alpha-360", sockets: ["AM4", "AM5", "LGA1700"], kind: "water", specs: ["Water cooler 360 mm", "Display de temperatura"] },
  ] satisfies Cooler[],
};

/** Montagens prontas para começar com um clique. */
export const presets: { id: string; name: string; text: string; build: Partial<Record<StepId, string>> }[] = [
  {
    id: "economico",
    name: "Econômico",
    text: "Sem placa de vídeo: usa o vídeo do processador. Dá para colocar uma depois.",
    build: {
      cpu: "processador-ryzen-5-5600gt",
      mb: "placa-mae-msi-a520m-a-pro",
      ram: "memoria-kingston-fury-ddr4-kit-16gb",
      ssd: "ssd-kingston-nv3-500gb",
      psu: "fonte-corsair-cx650",
    },
  },
  {
    id: "equilibrado",
    name: "Equilibrado",
    text: "Full HD no alto na maioria dos jogos.",
    build: {
      cpu: "processador-ryzen-5-5500",
      mb: "placa-mae-asus-tuf-b550m-plus",
      ram: "memoria-kingston-fury-ddr4-kit-16gb",
      gpu: "placa-de-video-msi-rtx-5060",
      ssd: "ssd-kingston-nv3-1tb",
      psu: "fonte-corsair-cx650",
    },
  },
  {
    id: "forte",
    name: "Forte",
    text: "8 núcleos e 16 GB de vídeo para os próximos anos.",
    build: {
      cpu: "processador-ryzen-7-5700x",
      mb: "placa-mae-gigabyte-b550m-aorus-elite",
      ram: "memoria-kingston-fury-ddr4-kit-16gb",
      gpu: "placa-de-video-zotac-rtx-5060-ti-16gb",
      ssd: "ssd-kingston-nv3-1tb",
      psu: "fonte-msi-mag-a650bn",
      cooler: "air-cooler-redragon-ak400",
    },
  },
];
