import type { NextConfig } from "next";
import { products } from "./src/data/catalog";

const isDev = process.env.NODE_ENV === "development";

// CSP sem nonce: mantém todas as páginas estáticas (rápidas e baratas de servir).
// Não há formulário que envie dados nem conteúdo de usuário, então o risco de XSS é baixo.
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://images.unsplash.com",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  poweredByHeader: false,
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-**" },
      // Fotos reais de produtos com licença livre (domínio público ou Creative Commons).
      { protocol: "https", hostname: "thumb.wikimedia.org", pathname: "/wikipedia/commons/**" },
    ],
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
    ];
  },
  // /ir/<slug> → link de afiliado. Gerado no build a partir do catálogo,
  // então não existe parâmetro que alguém possa trocar para criar um open redirect.
  async redirects() {
    return products.map((p) => ({
      source: `/ir/${p.slug}`,
      destination: p.affiliateUrl,
      permanent: false,
    }));
  },
};

export default nextConfig;
