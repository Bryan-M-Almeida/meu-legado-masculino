import type { Photo } from "./catalog";

/*
 * Fotos reais dos produtos, todas do Wikimedia Commons com licença livre
 * (domínio público ou Creative Commons). Fotos CC exigem crédito: o site mostra
 * autor, licença e link do arquivo embaixo da galeria.
 *
 * Só entra aqui foto do mesmo modelo do produto. Quando não existe foto livre do
 * modelo, o produto usa as fotos ilustrativas do catálogo (photoSets).
 * Fotos próprias: salve em public/produtos/ e adicione aqui, por exemplo
 *   "gta-vi-ps5": [{ id: "/produtos/gta-vi-ps5.jpg", alt: "Capa de GTA VI para PS5" }],
 * Para usar as fotos oficiais da Amazon, é preciso a API dela (PA-API).
 */

const commons = {
  ps5d: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/03/PS5DigitalEdition.png/960px-PS5DigitalEdition.png",
    alt: "PlayStation 5 Edição Digital em pé com controle DualSense",
    credit: { author: "Wfrmsf", license: "CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:PS5DigitalEdition.png" },
  },
  ds: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Playstation_DualSense_Controller.png/1920px-Playstation_DualSense_Controller.png",
    alt: "Controle DualSense branco",
    credit: {
      author: "Alex Cochrane",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Playstation_DualSense_Controller.png",
    },
  },
  ps5pro: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/PlayStation_5_Pro_no_disc_drive.jpg/1280px-PlayStation_5_Pro_no_disc_drive.jpg",
    alt: "PlayStation 5 Pro sem leitor de disco",
    credit: {
      author: "BeatEmUps",
      license: "CC BY 3.0",
      url: "https://commons.wikimedia.org/wiki/File:PlayStation_5_Pro_no_disc_drive.jpg",
    },
  },
  ds4: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/DualShock_4.jpg/1920px-DualShock_4.jpg",
    alt: "Controle DualShock 4 preto",
    credit: { author: "Evan-Amos", license: "domínio público", url: "https://commons.wikimedia.org/wiki/File:DualShock_4.jpg" },
  },
  ps4: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/PlayStation_4_Slim_video_game_console.jpg/1920px-PlayStation_4_Slim_video_game_console.jpg",
    alt: "PlayStation 4 Slim preto",
    credit: {
      author: "Mtsan43558918",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:PlayStation_4_Slim_video_game_console.jpg",
    },
  },
  xss1: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Xbox_Series_S_with_controller.jpg/1920px-Xbox_Series_S_with_controller.jpg",
    alt: "Xbox Series S com controle branco",
    credit: {
      author: "AsmodeanUnderscore",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Xbox_Series_S_with_controller.jpg",
    },
  },
  xss2: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6b/Xbox_Series_S_with_controller_and_box.jpg/1920px-Xbox_Series_S_with_controller_and_box.jpg",
    alt: "Xbox Series S com controle e caixa",
    credit: {
      author: "AsmodeanUnderscore",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Xbox_Series_S_with_controller_and_box.jpg",
    },
  },
  xox: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/81/Microsoft-Xbox-One-X-Console-Set.jpg/1920px-Microsoft-Xbox-One-X-Console-Set.jpg",
    alt: "Xbox One X preto com controle",
    credit: {
      author: "Evan-Amos",
      license: "domínio público",
      url: "https://commons.wikimedia.org/wiki/File:Microsoft-Xbox-One-X-Console-Set.jpg",
    },
  },
  xos1: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Microsoft-Xbox-One-S-Console-wController-L.jpg/1920px-Microsoft-Xbox-One-S-Console-wController-L.jpg",
    alt: "Xbox One S branco com controle",
    credit: {
      author: "Evan-Amos",
      license: "domínio público",
      url: "https://commons.wikimedia.org/wiki/File:Microsoft-Xbox-One-S-Console-wController-L.jpg",
    },
  },
  xos2: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/Microsoft-Xbox-One-S-Console-FL.png/1920px-Microsoft-Xbox-One-S-Console-FL.png",
    alt: "Xbox One S branco",
    credit: {
      author: "Evan-Amos, modified by Gunnar.offel",
      license: "domínio público",
      url: "https://commons.wikimedia.org/wiki/File:Microsoft-Xbox-One-S-Console-FL.png",
    },
  },
  sw2d: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4e/Nintendo_Switch_2_in_Docking_Console.jpg/1920px-Nintendo_Switch_2_in_Docking_Console.jpg",
    alt: "Nintendo Switch 2 na base",
    credit: {
      author: "Crisco 1492",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Nintendo_Switch_2_in_Docking_Console.jpg",
    },
  },
  sw2h: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/50/Nintendo_Switch_2_in_Handheld_Mode.jpg/1920px-Nintendo_Switch_2_in_Handheld_Mode.jpg",
    alt: "Nintendo Switch 2 no modo portátil",
    credit: {
      author: "Crisco 1492",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Nintendo_Switch_2_in_Handheld_Mode.jpg",
    },
  },
  oledd: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Nintendo_Switch_%E2%80%93_OLED-Modell_mit_gedockter_Konsole_20230506_HOF01624_RAW-Export.png/1920px-Nintendo_Switch_%E2%80%93_OLED-Modell_mit_gedockter_Konsole_20230506_HOF01624_RAW-Export.png",
    alt: "Nintendo Switch OLED branco na base",
    credit: {
      author: "PantheraLeo1359531",
      license: "CC BY 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Nintendo_Switch_%E2%80%93_OLED-Modell_mit_gedockter_Konsole_20230506_HOF01624_RAW-Export.png",
    },
  },
  oledh: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/Nintendo_Switch_%E2%80%93_OLED-Modell-Konsole_20230506_HOF01643_RAW-Export.png/1920px-Nintendo_Switch_%E2%80%93_OLED-Modell-Konsole_20230506_HOF01643_RAW-Export.png",
    alt: "Nintendo Switch OLED branco no modo portátil",
    credit: {
      author: "PantheraLeo1359531",
      license: "CC BY 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Nintendo_Switch_%E2%80%93_OLED-Modell-Konsole_20230506_HOF01643_RAW-Export.png",
    },
  },
  rb: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4b/RayBanAviator.jpg/1920px-RayBanAviator.jpg",
    alt: "Óculos Ray-Ban Aviator com lentes verdes",
    credit: { author: "Rich Niewiroski Jr.", license: "CC BY 2.5", url: "https://commons.wikimedia.org/wiki/File:RayBanAviator.jpg" },
  },
  inv: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Invicta_Mens_Automatic_Pro_Diver_Watch_8926.jpg/1920px-Invicta_Mens_Automatic_Pro_Diver_Watch_8926.jpg",
    alt: "Relógio Invicta Pro Diver automático",
    credit: {
      author: "Stefan Bellini",
      license: "CC0 (domínio público)",
      url: "https://commons.wikimedia.org/wiki/File:Invicta_Mens_Automatic_Pro_Diver_Watch_8926.jpg",
    },
  },
  mw1: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Casio_General_MW-240-1BV_Black_Resin_Ban.jpg/1920px-Casio_General_MW-240-1BV_Black_Resin_Ban.jpg",
    alt: "Relógio Casio MW-240 preto",
    credit: {
      author: "Kimaragang24",
      license: "CC BY 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Casio_General_MW-240-1BV_Black_Resin_Ban.jpg",
    },
  },
  mw2: {
    id: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Casio_watch_MW-240_and_MQ-24_in_201804.jpg/1920px-Casio_watch_MW-240_and_MQ-24_in_201804.jpg",
    alt: "Relógios Casio MW-240 lado a lado",
    credit: {
      author: "Mc681",
      license: "CC BY-SA 4.0",
      url: "https://commons.wikimedia.org/wiki/File:Casio_watch_MW-240_and_MQ-24_in_201804.jpg",
    },
  },
} satisfies Record<string, Photo>;

export const productPhotos: Record<string, Photo[]> = {
  "console-ps5-digital": [commons.ps5d, commons.ds],
  "console-ps5-pro": [commons.ps5pro, commons.ds],
  "controle-dualsense": [commons.ds],
  "controle-dualshock-4": [commons.ds4],
  "console-ps4-slim": [commons.ps4, commons.ds4],
  "console-xbox-series-s": [commons.xss1, commons.xss2],
  "console-xbox-one-x": [commons.xox],
  "console-xbox-one-s-branco": [commons.xos1, commons.xos2],
  "console-xbox-one-s-battlefield": [commons.xos2, commons.xos1],
  "console-switch-2": [commons.sw2d, commons.sw2h],
  "bundle-switch-2-mario-kart-world": [commons.sw2h, commons.sw2d],
  "bundle-switch-oled-mario-wonder": [commons.oledd, commons.oledh],
  "oculos-ray-ban-aviator": [commons.rb],
  "relogio-invicta-pro-diver-automatico": [commons.inv],
  "relogio-casio-mw240": [commons.mw1, commons.mw2],
};
