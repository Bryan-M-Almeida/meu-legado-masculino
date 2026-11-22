import type { MetadataRoute } from "next";
import { SITE } from "@/lib/format";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE.name,
    short_name: "Meu Legado",
    description: SITE.description,
    lang: "pt-BR",
    start_url: "/",
    display: "standalone",
    background_color: "#f4f4f4",
    theme_color: "#1a1c2c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
