import { ImageResponse } from "next/og";
import { getGuide, guides } from "@/data/guides";
import { C, lionDataUri, ogSize } from "@/lib/og";

export const alt = "Guia de compra do Meu Legado Masculino";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const g = getGuide((await params).slug);
  const lion = await lionDataUri();
  const title = g?.title ?? "Guias de compra";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 64, background: C.navy, color: C.paper }}>
        <div style={{ display: "flex" }}>
          <div style={{ background: C.gold, color: C.ink, fontSize: 30, fontWeight: 700, padding: "6px 18px" }}>Guia de compra</div>
        </div>
        <div style={{ fontSize: title.length > 60 ? 56 : 66, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 28, color: C.mist }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lion} width={64} height={64} alt="" />
          meulegadomasculino.com.br
        </div>
      </div>
    ),
    size,
  );
}
