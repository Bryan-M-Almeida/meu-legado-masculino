/**
 * Dados estruturados (schema.org) para o Google entender a página:
 * organização, busca do site, trilha de navegação e produtos.
 * O "<" é escapado para o JSON nunca fechar a tag <script> antes da hora.
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Trilha de navegação (BreadcrumbList) a partir de pares [nome, caminho]. */
export function breadcrumb(base: string, items: [name: string, path: string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: `${base}${path}` })),
  };
}
