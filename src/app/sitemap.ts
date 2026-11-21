import type { MetadataRoute } from "next";
import { categories, products } from "@/data/catalog";
import { SITE } from "@/lib/format";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", "/produtos", "/gta-6", "/sobre", ...categories.map((c) => `/categoria/${c.slug}`), ...products.map((p) => `/produto/${p.slug}`)];
  return paths.map((p) => ({ url: `${SITE.url}${p}` }));
}
