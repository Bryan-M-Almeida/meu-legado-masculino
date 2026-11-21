import Link from "next/link";
import { Mascot } from "@/components/Mascot";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 flex flex-col sm:flex-row items-center gap-10">
      <Mascot scale={6} />
      <div>
        <p className="font-pixel text-7xl leading-none text-crimson">404</p>
        <h1 className="font-pixel text-3xl mt-3">Essa fase não existe.</h1>
        <p className="mt-3 text-charcoal">O link pode estar errado ou o produto saiu do catálogo. Use a busca no topo ou volte ao início.</p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Link href="/" className="px-btn px-btn-gold">Voltar ao início</Link>
          <Link href="/produtos" className="px-btn px-btn-ghost">Ver produtos</Link>
        </div>
      </div>
    </div>
  );
}
