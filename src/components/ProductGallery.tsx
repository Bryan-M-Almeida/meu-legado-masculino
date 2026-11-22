"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { getStore, photoFit, unsplash, type Product } from "@/data/catalog";
import { ProductArt } from "./ProductArt";

/**
 * Galeria da página do produto.
 * - Desktop: passar o mouse amplia a foto no ponto do cursor.
 * - Clique (ou toque): abre em tela cheia. Lá, clique para dar zoom e mova
 *   o mouse ou o dedo para percorrer a foto. Setas trocam de foto, Esc fecha.
 */
export function ProductGallery({ product }: { product: Product }) {
  const photos = product.gallery;
  const title = product.title;
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const hoverImg = useRef<HTMLDivElement>(null);
  const bigImg = useRef<HTMLDivElement>(null);
  const photo = photos[index];
  const many = photos.length > 1;

  // Sem foto do próprio modelo: mostra o cartão do produto, nunca uma foto genérica.
  if (!photo) {
    return (
      <div>
        <div className="px-frame overflow-hidden">
          <div className="relative aspect-square">
            <ProductArt product={product} width={1200} sizes="(min-width: 768px) 50vw, 100vw" priority />
          </div>
        </div>
        <p className="mt-2 text-sm text-slate">
          Ainda não temos uma foto deste modelo que possamos publicar. As fotos oficiais estão na página da {getStore(product.store).name}.
        </p>
      </div>
    );
  }

  const go = (to: number) => {
    setIndex((to + photos.length) % photos.length);
    setZoomed(false);
  };

  // Move o ponto de ampliação para onde está o ponteiro (sem re-renderizar).
  const follow = (el: HTMLDivElement | null, e: React.MouseEvent) => {
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * 100;
    const y = ((e.clientY - r.top) / r.height) * 100;
    el.style.transformOrigin = `${Math.min(100, Math.max(0, x))}% ${Math.min(100, Math.max(0, y))}%`;
  };

  const open = () => {
    setZoomed(false);
    dialog.current?.showModal();
  };

  return (
    <div>
      <div className="px-frame overflow-hidden">
        <button
          type="button"
          onClick={open}
          onPointerMove={(e) => e.pointerType === "mouse" && follow(hoverImg.current, e)}
          className="group relative block w-full aspect-square overflow-hidden cursor-zoom-in"
          aria-label={`Ampliar foto ${index + 1} de ${photos.length}: ${photo.alt}`}
        >
          <div ref={hoverImg} className="absolute inset-0 transition-transform duration-200 ease-out [@media(hover:hover)]:group-hover:scale-[2]">
            <Image
              key={photo.id}
              src={unsplash(photo.id, 1200)}
              alt={photo.alt}
              fill
              preload={index === 0}
              sizes="(min-width: 768px) 50vw, 100vw"
              className={`photo ${photoFit(photo.id)}`}
            />
          </div>
          <span className="tag bg-ink text-paper absolute right-2 bottom-2 flex items-center gap-1.5 pointer-events-none">
            <ZoomIcon /> Ampliar
          </span>
        </button>
      </div>

      {many && (
        <ul className="mt-3 grid grid-cols-4 gap-2" aria-label="Fotos do produto">
          {photos.map((ph, i) => (
            <li key={ph.id}>
              <button
                type="button"
                onClick={() => go(i)}
                aria-label={`Ver foto ${i + 1}: ${ph.alt}`}
                aria-current={i === index}
                className={`relative block w-full aspect-square overflow-hidden border-[3px] ${
                  i === index ? "border-ink shadow-[3px_3px_0_var(--gold)]" : "border-mist hover:border-ink"
                }`}
              >
                <Image src={unsplash(ph.id, 200)} alt="" fill sizes="120px" className={`photo ${photoFit(ph.id)}`} />
              </button>
            </li>
          ))}
        </ul>
      )}
      {photo.credit ? (
        <p className="mt-2 text-sm text-slate">
          Foto do modelo; cor, versão e acessórios podem variar. Foto:{" "}
          <a href={photo.credit.url} target="_blank" rel="noopener noreferrer" className="underline">
            {photo.credit.author}, {photo.credit.license}
          </a>
          , via Wikimedia Commons.
        </p>
      ) : (
        <p className="mt-2 text-sm text-slate">Imagem ilustrativa. As fotos do produto estão na página da loja.</p>
      )}

      <dialog
        ref={dialog}
        aria-label={`Fotos de ${title}`}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-paper backdrop:bg-ink/80"
        onKeyDown={(e) => {
          if (!many) return;
          if (e.key === "ArrowRight") go(index + 1);
          if (e.key === "ArrowLeft") go(index - 1);
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between gap-4 px-4 py-3">
            <p className="font-pixel text-lg" aria-live="polite">
              {index + 1} / {photos.length}
            </p>
            <p className="hidden sm:block text-sm text-mist">{zoomed ? "Mova para percorrer. Clique para afastar." : "Clique na foto para dar zoom."}</p>
            <button type="button" onClick={() => dialog.current?.close()} className="px-btn px-btn-gold !py-1.5 !px-3">
              Fechar <span aria-hidden>✕</span>
            </button>
          </div>

          <div
            className={`relative flex-1 overflow-hidden ${zoomed ? "cursor-zoom-out touch-none" : "cursor-zoom-in"}`}
            onClick={(e) => {
              follow(bigImg.current, e);
              setZoomed((z) => !z);
            }}
            onPointerMove={(e) => zoomed && follow(bigImg.current, e)}
          >
            <p className="absolute inset-0 grid place-items-center font-pixel text-mist" aria-hidden>
              Carregando...
            </p>
            <div ref={bigImg} className={`absolute inset-0 transition-transform duration-200 ease-out ${zoomed ? "scale-[2.5]" : ""}`}>
              <Image key={photo.id} src={unsplash(photo.id, 1600)} alt={photo.alt} fill sizes="100vw" className="object-contain" />
            </div>
          </div>

          {many && (
            <div className="flex items-center justify-center gap-3 px-4 py-3">
              <button type="button" onClick={() => go(index - 1)} className="px-btn px-btn-gold !py-1.5" aria-label="Foto anterior">
                ◀
              </button>
              {photos.map((ph, i) => (
                <button
                  key={ph.id}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Foto ${i + 1}`}
                  aria-current={i === index}
                  className={`relative size-14 overflow-hidden border-[3px] ${i === index ? "border-gold" : "border-slate"}`}
                >
                  <Image src={unsplash(ph.id, 200)} alt="" fill sizes="56px" className={photoFit(ph.id)} />
                </button>
              ))}
              <button type="button" onClick={() => go(index + 1)} className="px-btn px-btn-gold !py-1.5" aria-label="Próxima foto">
                ▶
              </button>
            </div>
          )}
        </div>
      </dialog>
    </div>
  );
}

function ZoomIcon() {
  return (
    <svg viewBox="0 0 8 8" className="size-3.5" shapeRendering="crispEdges" aria-hidden fill="currentColor">
      <path d="M1 0h3v1H1zM0 1h1v3H0zM4 1h1v3H4zM1 4h3v1H1zM5 5h1v1H5zM6 6h1v1H6zM7 7h1v1H7z" />
    </svg>
  );
}
