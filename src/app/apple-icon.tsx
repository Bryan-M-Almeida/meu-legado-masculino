import { ImageResponse } from "next/og";
import { C, lionDataUri } from "@/lib/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Ícone da tela inicial do iPhone: o leão sobre fundo escuro.
export default async function AppleIcon() {
  const lion = await lionDataUri();
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: C.ink }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={lion} width={150} height={150} alt="" />
      </div>
    ),
    size,
  );
}
