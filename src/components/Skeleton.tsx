/**
 * Blocos de carregamento no estilo pixel. Aparecem por um instante ao navegar
 * para uma página que depende do endereço (produto, categoria) enquanto o
 * conteúdo dela chega.
 */
function Block({ className = "" }: { className?: string }) {
  return <div className={`bg-mist/40 animate-pulse ${className}`} />;
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <ul className="grid gap-3 sm:gap-5 grid-cols-2 md:grid-cols-3 xl:grid-cols-4" aria-hidden>
      {Array.from({ length: count }, (_, i) => (
        <li key={i} className="product-card">
          <Block className="aspect-square border-b-[3px] border-ink" />
          <div className="p-3 space-y-2">
            <Block className="h-3 w-1/3" />
            <Block className="h-4 w-4/5" />
            <Block className="h-5 w-1/2" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export function CategorySkeleton() {
  return (
    <div role="status" aria-label="Carregando categoria">
      <Block className="h-4 w-48 mb-4" />
      <div className="flex items-center gap-4 mb-8">
        <Block className="size-15" />
        <div className="space-y-2">
          <Block className="h-10 w-64" />
          <Block className="h-4 w-48" />
        </div>
      </div>
      <GridSkeleton />
    </div>
  );
}

export function ProductSkeleton() {
  return (
    <div role="status" aria-label="Carregando produto">
      <Block className="h-4 w-64 mb-6" />
      <div className="grid gap-10 md:grid-cols-2 items-start">
        <Block className="aspect-square border-[3px] border-ink" />
        <div className="space-y-4">
          <Block className="h-6 w-32" />
          <Block className="h-10 w-4/5" />
          <Block className="h-4 w-1/2" />
          <Block className="h-48 w-full border-[3px] border-ink" />
        </div>
      </div>
    </div>
  );
}
