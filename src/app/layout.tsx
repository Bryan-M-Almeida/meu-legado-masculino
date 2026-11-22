import type { Metadata, Viewport } from "next";
import { Atkinson_Hyperlegible, Pixelify_Sans } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { SITE } from "@/lib/format";
import "./globals.css";

const pixelify = Pixelify_Sans({ variable: "--font-pixelify", subsets: ["latin"], weight: ["500", "600", "700"] });
const atkinson = Atkinson_Hyperlegible({ variable: "--font-atkinson", subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} | Para que seu legado seja lendário`, template: `%s | ${SITE.name}` },
  description: SITE.description,
  applicationName: SITE.name,
  category: "shopping",
  openGraph: { type: "website", locale: "pt_BR", siteName: SITE.name, url: SITE.url },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  formatDetection: { telephone: false, email: false, address: false },
  // Código do Google Search Console: defina GOOGLE_SITE_VERIFICATION no painel da Vercel.
  verification: process.env.GOOGLE_SITE_VERIFICATION ? { google: process.env.GOOGLE_SITE_VERIFICATION } : undefined,
};

const siteLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}/#org`,
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon.svg`,
    slogan: "Para que seu legado seja lendário",
    ...(SITE.sameAs.length ? { sameAs: SITE.sameAs } : {}),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#site`,
    name: SITE.name,
    url: SITE.url,
    inLanguage: "pt-BR",
    publisher: { "@id": `${SITE.url}/#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE.url}/produtos?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  },
];

export const viewport: Viewport = { themeColor: "#1a1c2c" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${pixelify.variable} ${atkinson.variable} h-full`}>
      <body className="min-h-full flex flex-col bg-grid">
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 px-btn px-btn-gold">
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer />
        <JsonLd data={siteLd} />
      </body>
    </html>
  );
}
