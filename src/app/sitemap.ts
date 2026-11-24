import type { MetadataRoute } from "next";
import { categories, products, unsplash } from "@/data/catalog";
import { guides } from "@/data/guides";
import { SITE } from "@/lib/format";

// Data da última publicação: o Google usa para saber quando voltar a rastrear.
const updated = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, images?: string[]): MetadataRoute.Sitemap[number] => ({
    url: `${SITE.url}${path}`,
    lastModified: updated,
    changeFrequency: "weekly",
    priority,
    ...(images?.length ? { images } : {}),
  });
  return [
    page("", 1),
    page("/produtos", 0.9),
    page("/gta-6", 0.9),
    page("/guias", 0.8),
    page("/monte-seu-pc", 0.8),
    ...guides.map((g) => ({ ...page(`/guias/${g.slug}`, 0.8), lastModified: new Date(`${g.updated}T12:00:00Z`) })),
    ...categories.map((c) => page(`/categoria/${c.slug}`, 0.8)),
    ...products.map((p) => page(`/produto/${p.slug}`, 0.7, p.gallery.map((ph) => unsplash(ph.id, 1200)))),
    page("/sobre", 0.4),
  ];
}
