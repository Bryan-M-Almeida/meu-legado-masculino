import { ImageResponse } from "next/og";
import { getProduct, getStore, products, unsplash } from "@/data/catalog";
import { C, fetchAsDataUri, lionDataUri, ogSize } from "@/lib/og";

export const alt = "Produto do Meu Legado Masculino";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const p = getProduct((await params).slug);
  const lion = await lionDataUri();
  const photo = p?.image ? await fetchAsDataUri(unsplash(p.image, 800)) : null;
  const title = p?.title ?? "Meu Legado Masculino";

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: C.ink, color: C.paper }}>
        <div style={{ width: 560, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: photo ? "#ffffff" : C.navy }}>
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="" style={{ maxWidth: 480, maxHeight: 520, objectFit: "contain" }} />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={lion} width={300} height={300} alt="" />
          )}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 56 }}>
          <div style={{ display: "flex" }}>
            <div style={{ background: C.gold, color: C.ink, fontSize: 28, fontWeight: 700, padding: "6px 16px" }}>{p?.label ?? "Loja"}</div>
          </div>
          <div style={{ fontSize: title.length > 60 ? 44 : 54, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ fontSize: 32, color: C.gold }}>{p ? `Ver preço na ${getStore(p.store).name}` : ""}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 24, color: C.mist }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={lion} width={48} height={48} alt="" />
              meulegadomasculino.com.br
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
