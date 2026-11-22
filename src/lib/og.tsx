import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Tamanho padrão das imagens de compartilhamento (Open Graph). */
export const ogSize = { width: 1200, height: 630 };

/** Leão pixel do favicon, embutido como data URI para o gerador de imagens. */
export async function lionDataUri() {
  const svg = await readFile(join(process.cwd(), "src/app/icon.svg"), "utf8");
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

/** Baixa uma foto para embutir na imagem; se falhar, a imagem sai sem a foto. */
export async function fetchAsDataUri(url: string) {
  try {
    const res = await fetch(url, { headers: { "User-Agent": "meulegadomasculino-og/1.0" }, signal: AbortSignal.timeout(8000) });
    if (!res.ok) return null;
    const type = res.headers.get("content-type") ?? "image/jpeg";
    if (!/^image\/(png|jpe?g)/.test(type)) return null;
    return `data:${type};base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`;
  } catch {
    return null;
  }
}

export const C = { ink: "#1a1c2c", navy: "#29366f", gold: "#ffcd75", sunset: "#ef7d57", paper: "#f4f4f4", mist: "#94b0c2" };
