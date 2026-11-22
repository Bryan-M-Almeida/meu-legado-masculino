import { ImageResponse } from "next/og";
import { C, lionDataUri, ogSize } from "@/lib/og";

export const alt = "Meu Legado Masculino: para que seu legado seja lendário";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  const lion = await lionDataUri();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", gap: 60, padding: 80, background: C.ink, color: C.paper }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lion} width={260} height={260} alt="" />
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: C.gold, lineHeight: 1 }}>Meu Legado Masculino</div>
          <div style={{ fontSize: 40, lineHeight: 1.2 }}>Para que seu legado seja lendário.</div>
          <div style={{ fontSize: 28, color: C.mist }}>Jogos · GTA VI · Nostalgia · Roupas · Relógios · PCs</div>
        </div>
      </div>
    ),
    size,
  );
}
