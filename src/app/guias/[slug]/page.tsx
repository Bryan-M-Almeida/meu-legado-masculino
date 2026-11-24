import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { GuideList } from "@/components/GuideList";
import { breadcrumb, JsonLd } from "@/components/JsonLd";
import { ProductGrid } from "@/components/ProductCard";
import { getProduct, type Product } from "@/data/catalog";
import { formatGuideDate, getGuide, guides } from "@/data/guides";
import { SITE } from "@/lib/format";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: PageProps<"/guias/[slug]">): Promise<Metadata> {
  const g = getGuide((await params).slug);
  if (!g) return {};
  return {
    title: g.seoTitle,
    description: g.description,
    alternates: { canonical: `/guias/${g.slug}` },
    openGraph: { type: "article", title: g.title, description: g.description, modifiedTime: g.updated },
  };
}

export default function GuiaPage({ params }: PageProps<"/guias/[slug]">) {
  return (
    <Suspense fallback={<div className="mx-auto max-w-3xl px-4 py-14 h-screen" />}>
      <GuiaContent params={params} />
    </Suspense>
  );
}

const anchor = (i: number) => `secao-${i + 1}`;

async function GuiaContent({ params }: { params: PageProps<"/guias/[slug]">["params"] }) {
  const g = getGuide((await params).slug);
  if (!g) notFound();
  const others = guides.filter((x) => x.slug !== g.slug);
  const url = `${SITE.url}/guias/${g.slug}`;

  const ld = [
    breadcrumb(SITE.url, [
      ["Início", "/"],
      ["Guias", "/guias"],
      [g.title, `/guias/${g.slug}`],
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: g.title,
      description: g.description,
      url,
      mainEntityOfPage: url,
      image: `${url}/opengraph-image`,
      dateModified: g.updated,
      inLanguage: "pt-BR",
      author: { "@id": `${SITE.url}/#org` },
      publisher: { "@id": `${SITE.url}/#org` },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: g.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <article>
      <JsonLd data={ld} />
      <header className="bg-navy text-paper border-b-[3px] border-ink">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
          <nav aria-label="Você está em" className="text-sm text-mist mb-6">
            <Link href="/" className="underline">Início</Link> /{" "}
            <Link href="/guias" className="underline">Guias</Link>
          </nav>
          <p className="tag bg-gold text-ink">Guia de compra</p>
          <h1 className="font-pixel text-4xl sm:text-5xl leading-tight mt-4 text-white">{g.title}</h1>
          <p className="mt-4 text-mist">
            Atualizado em <time dateTime={g.updated}>{formatGuideDate(g.updated)}</time>
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="space-y-4 text-lg text-charcoal leading-relaxed">
          {g.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        <nav aria-labelledby="indice" className="mt-10 px-frame p-5 sm:p-6">
          <h2 id="indice" className="font-pixel text-xl">Neste guia</h2>
          <ol className="mt-3 space-y-1.5 list-decimal pl-6">
            {g.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#${anchor(i)}`} className="underline hover:text-blue">{s.heading}</a>
              </li>
            ))}
            <li>
              <a href="#perguntas" className="underline hover:text-blue">Perguntas frequentes</a>
            </li>
          </ol>
        </nav>
      </div>

      {g.sections.map((s, i) => {
        const picks = (s.picks ?? []).map(getProduct).filter(Boolean) as Product[];
        return (
          <section key={s.heading} aria-labelledby={anchor(i)} className="mb-14">
            <div className="mx-auto max-w-3xl px-4">
              <h2 id={anchor(i)} className="font-pixel text-3xl leading-tight scroll-mt-40">{s.heading}</h2>
              <div className="mt-4 space-y-4 text-lg text-charcoal leading-relaxed">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
            {picks.length > 0 && (
              <div className="mx-auto max-w-5xl px-4 mt-6">
                <ProductGrid items={picks} cols="grid-cols-2 md:grid-cols-4" />
              </div>
            )}
          </section>
        );
      })}

      <section aria-labelledby="perguntas" className="mx-auto max-w-3xl px-4">
        <h2 id="perguntas" className="font-pixel text-3xl scroll-mt-40">Perguntas frequentes</h2>
        <div className="mt-5 space-y-3">
          {g.faq.map((f) => (
            <details key={f.q} className="px-frame group">
              <summary className="cursor-pointer list-none p-4 font-bold flex justify-between gap-4">
                {f.q}
                <span aria-hidden className="font-pixel text-blue group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-4 pb-4 text-charcoal">{f.a}</p>
            </details>
          ))}
        </div>

        <p className="mt-10 text-sm text-slate">
          Os links levam para lojas parceiras e podemos receber uma comissão quando você compra, sem custo extra. Preços e
          disponibilidade são das lojas e podem mudar.{" "}
          <Link href="/sobre#afiliados" className="underline">Saiba como ganhamos dinheiro</Link>.
        </p>
      </section>

      <aside aria-labelledby="outros-guias" className="mx-auto max-w-5xl px-4 mt-16">
        <h2 id="outros-guias" className="font-pixel text-3xl mb-5">Outros guias</h2>
        <GuideList items={others} />
      </aside>
    </article>
  );
}
