"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { pcParts, presets, type RamType, type Socket, type StepId } from "@/data/pcParts";
import { MascotHead } from "./Mascot";
import { P, Sprite, type Palette } from "./Sprite";

/**
 * Monte seu PC: escolha peça por peça, com a compatibilidade checada na hora.
 * Peças que não encaixam ficam travadas com o motivo; o Léo dá a dica do passo.
 * A montagem fica no endereço da página, para compartilhar.
 */

type Titles = Record<string, string>;
type Build = Partial<Record<StepId, string>>;
const NONE = "nenhum";

const steps: { id: StepId; name: string; short: string }[] = [
  { id: "cpu", name: "Processador", short: "CPU" },
  { id: "mb", name: "Placa-mãe", short: "Placa-mãe" },
  { id: "ram", name: "Memória", short: "Memória" },
  { id: "gpu", name: "Placa de vídeo", short: "Vídeo" },
  { id: "ssd", name: "Armazenamento", short: "SSD" },
  { id: "psu", name: "Fonte", short: "Fonte" },
  { id: "cooler", name: "Cooler", short: "Cooler" },
];

const levels = ["", "Tarefas e jogos leves", "Full HD no médio", "Full HD no alto", "Full HD no máximo e 1440p"];

const find = <T extends { slug: string }>(list: T[], slug?: string) => list.find((x) => x.slug === slug);
const sockets = (s: Socket) => (s === "LGA1700" ? "LGA 1700" : s);

export function PcBuilder({ titles }: { titles: Titles }) {
  const [build, setBuild] = useState<Build>({});
  const [ramQty, setRamQty] = useState<1 | 2>(1);
  const [active, setActive] = useState<StepId>("cpu");
  const [copied, setCopied] = useState(false);

  // Abre a montagem compartilhada pelo link (?cpu=...&gpu=...).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const next: Build = {};
    for (const s of steps) {
      const v = q.get(s.id);
      if (v && (v === NONE || find(pcParts[s.id] as { slug: string }[], v))) next[s.id] = v;
    }
    if (Object.keys(next).length) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- leitura única do endereço ao abrir
      setBuild(next);
      setRamQty(q.get("qtd") === "2" ? 2 : 1);
      setActive(steps.find((s) => !next[s.id])?.id ?? "cpu");
    }
  }, []);

  // Mantém o endereço igual à montagem, sem criar histórico.
  useEffect(() => {
    const q = new URLSearchParams();
    for (const s of steps) if (build[s.id]) q.set(s.id, build[s.id]!);
    if (build.ram && ramQty === 2) q.set("qtd", "2");
    const qs = q.toString();
    window.history.replaceState(null, "", qs ? `?${qs}` : window.location.pathname);
  }, [build, ramQty]);

  const cpu = find(pcParts.cpu, build.cpu);
  const mb = find(pcParts.mb, build.mb);
  const ram = find(pcParts.ram, build.ram);
  const gpu = find(pcParts.gpu, build.gpu);
  const ssd = find(pcParts.ssd, build.ssd);
  const psu = find(pcParts.psu, build.psu);
  const cooler = find(pcParts.cooler, build.cooler);

  const cpuSockets = new Set<Socket>(pcParts.cpu.map((c) => c.socket));
  const mbSockets = new Set<Socket>(pcParts.mb.filter((b) => cpuSockets.has(b.socket)).map((b) => b.socket));
  const usableRam = new Set<RamType>(pcParts.mb.filter((b) => cpuSockets.has(b.socket)).map((b) => b.ram));
  const ramType = mb?.ram ?? (cpu?.socket === "AM4" ? "DDR4" : undefined);

  const gpuNeeded = !cpu || !cpu.igpu;
  const coolerNeeded = !!cpu && !cpu.cooler;
  const draw = (cpu?.watts ?? 0) + (gpu?.watts ?? 0) + 60;
  const recommended = Math.max(450, Math.ceil((draw * 1.4) / 50) * 50);
  const ramSticks = ram ? (ram.sticks === 2 ? 2 : ramQty) : 0;
  const ramGb = ram ? (ram.sticks === 2 ? ram.gb : ram.gb * ramQty) : 0;

  /** Motivo para a peça não poder ser escolhida, ou null se encaixa. */
  const blocked = (step: StepId, slug: string): string | null => {
    switch (step) {
      case "cpu": {
        const c = find(pcParts.cpu, slug)!;
        if (!mbSockets.has(c.socket)) return `Ainda não temos placa-mãe ${sockets(c.socket)} no catálogo.`;
        if (mb && mb.socket !== c.socket) return `Não encaixa na placa-mãe escolhida (${sockets(mb.socket)}).`;
        return null;
      }
      case "mb": {
        const b = find(pcParts.mb, slug)!;
        if (!cpuSockets.has(b.socket)) return `Precisa de processador ${sockets(b.socket)} (Ryzen 7000 ou mais novo), que ainda não temos no catálogo.`;
        if (cpu && cpu.socket !== b.socket) return `Não encaixa no processador escolhido (${sockets(cpu.socket)}).`;
        if (ram && ram.type !== b.ram) return `Usa ${b.ram}, e a memória escolhida é ${ram.type}.`;
        return null;
      }
      case "ram": {
        const r = find(pcParts.ram, slug)!;
        if (!usableRam.has(r.type)) return `Só serve em placa-mãe ${r.type}, que ainda não tem processador compatível no catálogo.`;
        if (ramType && r.type !== ramType) return `Sua placa-mãe usa ${ramType}.`;
        return null;
      }
      case "cooler": {
        const k = find(pcParts.cooler, slug)!;
        if (cpu && !k.sockets.includes(cpu.socket)) return `Não é compatível com o soquete ${sockets(cpu.socket)}.`;
        return null;
      }
      default:
        return null;
    }
  };

  const required: StepId[] = ["cpu", "mb", "ram", ...(gpuNeeded ? (["gpu"] as const) : []), "ssd", "psu", ...(coolerNeeded ? (["cooler"] as const) : [])];
  const filled = (s: StepId) => !!build[s] && (build[s] !== NONE || (s === "gpu" ? !gpuNeeded : !coolerNeeded));
  const missing = required.filter((s) => !filled(s));
  const psuShort = !!psu && psu.watts < recommended;
  const done = missing.length === 0 && !psuShort;
  const chosen = steps.filter((s) => build[s.id] && build[s.id] !== NONE).length;
  const level = gpu ? gpu.tier : cpu?.igpu ? 1 : 0;

  const pick = (step: StepId, slug: string) => {
    const next = { ...build, [step]: slug };
    setBuild(next);
    // Vai para o próximo passo que ainda falta.
    const order = steps.map((s) => s.id);
    const after = [...order.slice(order.indexOf(step) + 1), ...order.slice(0, order.indexOf(step))];
    const todo = after.find((s) => !next[s]);
    if (todo) setActive(todo);
  };
  const clear = (step: StepId) => {
    setBuild(({ [step]: _gone, ...rest }) => rest);
    setActive(step);
  };
  const applyPreset = (b: Build) => {
    setBuild({ ...b, gpu: b.gpu ?? NONE, cooler: b.cooler ?? NONE });
    setRamQty(1);
    setActive("cpu");
  };
  const reset = () => {
    setBuild({});
    setRamQty(1);
    setActive("cpu");
  };
  const share = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* sem permissão para a área de transferência: o endereço da página já é o link */
    }
  };

  // Dica do Léo: avisos primeiro, depois o que fazer no passo atual.
  const tip = (() => {
    if (!chosen) return "Bora montar! Comece pelo processador, ou escolha uma montagem pronta logo abaixo.";
    if (psuShort) return `Essa fonte está no limite. Pelas peças, o ideal é pelo menos ${recommended} W.`;
    if (done) return "PC montado e tudo encaixando! Falta só escolher um gabinete. Confira os preços de cada peça no resumo.";
    const tips: Record<StepId, string> = {
      cpu: "O processador define o resto da montagem. Os Ryzen com G no nome têm vídeo integrado.",
      mb: cpu ? `A placa-mãe precisa ser ${sockets(cpu.socket)}, igual ao processador. As que não encaixam ficam travadas.` : "A placa-mãe precisa ter o mesmo soquete do processador.",
      ram: "Dois pentes iguais rendem mais que um só: é o tal do dual channel.",
      gpu: cpu?.igpu
        ? "Seu processador tem vídeo integrado, então a placa de vídeo é opcional. Mas é ela que faz o PC voar nos jogos."
        : "Seu processador não tem vídeo integrado: a placa de vídeo é obrigatória.",
      ssd: "Jogos atuais passam de 100 GB. Com 1 TB você não fica apagando jogo.",
      psu: `Pelas peças escolhidas, recomendo uma fonte de pelo menos ${recommended} W. Não economize nela.`,
      cooler: cpu && !cpu.cooler ? "Esse processador vem sem cooler na caixa. Escolha um." : "Seu processador já vem com cooler. Trocar é opcional, para um PC mais frio e silencioso.",
    };
    return tips[active];
  })();

  const notes: { ok: boolean; text: string }[] = [];
  if (cpu && mb) notes.push({ ok: true, text: `Processador e placa-mãe encaixam (${sockets(cpu.socket)})` });
  if (ram) notes.push({ ok: true, text: `Memória ${ram.type}, ${ramGb} GB em ${ramSticks} ${ramSticks > 1 ? "pentes" : "pente"}` });
  if (ram && ramSticks === 1) notes.push({ ok: false, text: "Com 2 pentes iguais o PC ganha desempenho (dual channel)" });
  if (cpu && build.gpu) notes.push({ ok: true, text: gpu ? "Vídeo dedicado" : "Vídeo integrado do processador" });
  if (cpu?.pcie === 3 && gpu && gpu.tier >= 3) notes.push({ ok: false, text: "Esse processador usa PCIe 3.0: a placa de vídeo rende um pouco menos, nada que impeça jogar" });
  if (psu) notes.push({ ok: !psuShort, text: `Fonte de ${psu.watts} W para cerca de ${draw} W de consumo` });
  if (cooler?.kind === "water") notes.push({ ok: false, text: "Confira se o gabinete tem espaço para radiador de 360 mm" });

  const stepList = pcParts[active] as { slug: string; specs: string[] }[];
  const optional = (active === "gpu" && !gpuNeeded) || (active === "cooler" && !coolerNeeded);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] items-start">
      <div className="min-w-0">
        {/* Léo dá a dica */}
        <div className="flex items-end gap-3">
          <MascotHead scale={4} className="shrink-0" />
          <p
            aria-live="polite"
            className="relative flex-1 bg-ink text-paper border-[3px] border-ink px-4 py-3 shadow-[inset_0_0_0_3px_var(--paper)] before:absolute before:-left-3 before:bottom-4 before:border-y-[8px] before:border-r-[12px] before:border-y-transparent before:border-r-ink"
          >
            {tip}
          </p>
        </div>

        {/* Montagens prontas */}
        <div className="mt-8">
          <h2 className="font-pixel text-xl">Montagens prontas</h2>
          <ul className="mt-3 grid gap-3 sm:grid-cols-3">
            {presets.map((p) => (
              <li key={p.id}>
                <button type="button" onClick={() => applyPreset(p.build)} className="product-card h-full w-full p-4 text-left flex flex-col items-start justify-start gap-1">
                  <span className="font-pixel text-lg block">{p.name}</span>
                  <span className="text-sm text-charcoal">{p.text}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Passos */}
        <nav aria-label="Peças" className="mt-8">
          <ol className="flex gap-2 overflow-x-auto scroll-x pb-2">
            {steps.map((s, i) => {
              const has = !!build[s.id];
              const isActive = s.id === active;
              return (
                <li key={s.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(s.id)}
                    aria-current={isActive ? "step" : undefined}
                    className={`flex items-center gap-2 border-[3px] px-3 py-2 font-pixel ${
                      isActive ? "border-ink bg-gold text-ink shadow-[3px_3px_0_var(--ink)]" : has ? "border-ink bg-surface" : "border-mist bg-surface text-slate hover:border-ink"
                    }`}
                  >
                    <span aria-hidden className={`grid size-6 place-items-center text-sm ${has ? "bg-green text-white" : "bg-mist text-ink"}`}>
                      {has ? "✓" : i + 1}
                    </span>
                    {s.short}
                    {has && <span className="sr-only">(escolhido)</span>}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Opções do passo */}
        <section aria-labelledby="passo-atual" className="mt-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="passo-atual" className="font-pixel text-3xl flex items-center gap-3">
              <PartIcon step={active} scale={4} />
              {steps.find((s) => s.id === active)!.name}
            </h2>
            {optional && (
              <button
                type="button"
                onClick={() => pick(active, NONE)}
                aria-pressed={build[active] === NONE}
                className={`px-btn !py-1.5 !text-base ${build[active] === NONE ? "px-btn-ink" : "px-btn-ghost"}`}
              >
                {active === "gpu" ? "Usar o vídeo integrado" : "Usar o cooler da caixa"}
              </button>
            )}
          </div>

          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {stepList.map((part) => {
              const reason = blocked(active, part.slug);
              const selected = build[active] === part.slug;
              const title = titles[part.slug];
              const isSingleRam = active === "ram" && (part as { sticks?: number }).sticks === 1;
              return (
                <li key={part.slug}>
                  <div
                    className={`h-full border-[3px] p-4 flex flex-col gap-3 ${
                      selected ? "border-ink bg-gold/30 shadow-[4px_4px_0_var(--ink)]" : reason ? "border-mist bg-paper text-slate" : "border-ink bg-surface"
                    }`}
                  >
                    <div className="flex gap-3">
                      <div className={`shrink-0 grid size-14 place-items-center border-[3px] ${reason ? "border-mist bg-paper opacity-60" : "border-ink bg-paper"}`}>
                        <PartIcon step={active} scale={3} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold leading-snug">{title}</p>
                        <ul className="mt-1.5 flex flex-wrap gap-1.5">
                          {part.specs.map((s) => (
                            <li key={s} className={`text-xs px-1.5 py-0.5 border-2 ${reason ? "border-mist" : "border-ink"}`}>
                              {s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {reason && (
                      <p className="text-sm flex gap-2">
                        <span aria-hidden>🔒</span>
                        {reason}
                      </p>
                    )}
                    {selected && isSingleRam && (
                      <fieldset className="flex items-center gap-2 text-sm">
                        <legend className="sr-only">Quantidade de pentes</legend>
                        <span>Quantidade:</span>
                        {([1, 2] as const).map((n) => (
                          <button
                            key={n}
                            type="button"
                            onClick={() => setRamQty(n)}
                            aria-pressed={ramQty === n}
                            className={`border-2 border-ink px-2.5 py-0.5 font-pixel ${ramQty === n ? "bg-ink text-gold" : "bg-surface"}`}
                          >
                            {n}x
                          </button>
                        ))}
                      </fieldset>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <Link href={`/produto/${part.slug}`} className="text-sm underline" target="_blank">
                        Detalhes<span className="sr-only"> de {title} (abre em nova aba)</span>
                      </Link>
                      <button
                        type="button"
                        disabled={!!reason}
                        onClick={() => (selected ? clear(active) : pick(active, part.slug))}
                        aria-pressed={selected}
                        aria-label={`${selected ? "Remover" : "Escolher"} ${title}`}
                        className={`px-btn !py-1.5 !text-base disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:translate-y-0 ${
                          selected ? "px-btn-ink" : "px-btn-gold"
                        }`}
                      >
                        {selected ? "Escolhido ✓" : "Escolher"}
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Resumo */}
      <aside id="resumo" aria-labelledby="resumo-titulo" className="lg:sticky lg:top-36 scroll-mt-36">
        <div className="px-frame">
          <div className="bg-ink text-paper px-4 py-3 flex items-center justify-between">
            <h2 id="resumo-titulo" className="font-pixel text-xl text-gold">Seu PC</h2>
            <span className="font-pixel text-sm">{chosen}/7 peças</span>
          </div>

          <div className="p-4 space-y-5">
            {/* Nível */}
            <div>
              <p className="flex justify-between text-sm font-bold">
                <span>Nível para jogos</span>
                <span className="font-pixel">{level ? `${level}/4` : "-"}</span>
              </p>
              <div className="mt-1.5 grid grid-cols-4 gap-1" aria-hidden>
                {[1, 2, 3, 4].map((n) => (
                  <span key={n} className={`h-4 border-2 border-ink ${n <= level ? ["", "bg-sky", "bg-green", "bg-gold", "bg-sunset"][level] : "bg-paper"}`} />
                ))}
              </div>
              <p className="mt-1 text-sm text-charcoal">{level ? levels[level] : "Escolha o processador e a placa de vídeo"}</p>
            </div>

            {/* Energia */}
            <div>
              <p className="flex justify-between text-sm font-bold">
                <span>Consumo estimado</span>
                <span className="font-pixel">
                  {cpu ? `${draw} W` : "-"}
                  {psu ? ` / ${psu.watts} W` : ""}
                </span>
              </p>
              <div className="mt-1.5 h-4 border-2 border-ink bg-paper" aria-hidden>
                <div
                  className={`h-full ${psuShort ? "bg-crimson" : "bg-lime"} transition-[width] duration-300 ease-[steps(6)]`}
                  style={{ width: cpu ? `${Math.min(100, (draw / (psu?.watts ?? recommended)) * 100)}%` : 0 }}
                />
              </div>
              {cpu && <p className="mt-1 text-sm text-charcoal">Fonte recomendada: {recommended} W ou mais</p>}
            </div>

            {/* Peças */}
            <ul className="divide-y-2 divide-mist border-y-2 border-mist">
              {steps.map((s) => {
                const slug = build[s.id];
                const extra = s.id === "ram" && ram && ram.sticks === 1 && ramQty === 2 ? " (2x)" : "";
                return (
                  <li key={s.id} className="py-2.5 flex gap-3 items-start">
                    <span className="mt-0.5 shrink-0 grid size-9 place-items-center bg-paper border-2 border-ink">
                      <PartIcon step={s.id} scale={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs text-slate">{s.name}</p>
                      {slug && slug !== NONE ? (
                        <>
                          <p className="text-sm font-bold leading-snug">
                            {titles[slug]}
                            {extra}
                          </p>
                          <a href={`/ir/${slug}`} target="_blank" rel="sponsored nofollow noopener noreferrer" className="text-sm text-blue underline">
                            Ver preço na Amazon<span className="sr-only"> de {titles[slug]} (abre em nova aba)</span>
                          </a>
                        </>
                      ) : slug === NONE ? (
                        <p className="text-sm">{s.id === "gpu" ? "Vídeo integrado" : "Cooler da caixa"}</p>
                      ) : (
                        <button type="button" onClick={() => setActive(s.id)} className="text-sm text-slate underline">
                          {required.includes(s.id) ? "Escolher" : "Opcional"}
                        </button>
                      )}
                    </div>
                    {slug && (
                      <button type="button" onClick={() => clear(s.id)} className="text-slate hover:text-crimson px-1" aria-label={`Remover ${s.name}`}>
                        ✕
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>

            {notes.length > 0 && (
              <ul className="space-y-1.5 text-sm">
                {notes.map((n) => (
                  <li key={n.text} className="flex gap-2">
                    <span aria-hidden className={`mt-0.5 shrink-0 grid size-4 place-items-center text-[0.65rem] font-bold ${n.ok ? "bg-green text-white" : "bg-gold text-ink"}`}>
                      {n.ok ? "✓" : "!"}
                    </span>
                    <span>
                      <span className="sr-only">{n.ok ? "OK: " : "Atenção: "}</span>
                      {n.text}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            {done && (
              <p className="bg-lime/40 border-2 border-ink p-3 text-sm">
                <strong className="font-pixel">Tudo encaixa!</strong> Falta só o gabinete: escolha um com espaço para a placa de vídeo
                {cooler?.kind === "water" ? " e para o radiador de 360 mm" : ""}.
              </p>
            )}

            <div className="flex flex-wrap gap-3">
              <button type="button" onClick={share} disabled={!chosen} className="px-btn px-btn-gold flex-1 !text-base disabled:opacity-50">
                {copied ? "Link copiado!" : "Copiar link da montagem"}
              </button>
              <button type="button" onClick={reset} disabled={!chosen} className="px-btn px-btn-ghost !text-base disabled:opacity-50">
                Recomeçar
              </button>
            </div>
            <p className="text-xs text-slate">
              Consumo e nível são estimativas para ajudar na escolha. Preços e estoque são da Amazon e podem mudar.
            </p>
          </div>
        </div>
      </aside>

      {/* Barra do celular: progresso e atalho para o resumo */}
      <a
        href="#resumo"
        className="lg:hidden fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-3 bg-ink text-paper border-t-[3px] border-gold px-4 py-3 font-pixel"
      >
        <span>
          {chosen}/7 peças{done ? " · tudo encaixa!" : ""}
        </span>
        <span className="text-gold">Ver resumo ▼</span>
      </a>
    </div>
  );
}

/* Ícones das peças em pixel art */
const pal: Palette = { k: P.ink, g: P.gold, m: P.mist, c: P.charcoal, n: P.navy, b: P.sky, s: P.slate, l: P.lime, w: P.white };
const partIcons: Record<StepId, string[]> = {
  cpu: [".g.g.g.g.", "kkkkkkkkk", "gkmmmmmkg", "kkmcccmkk", "gkmcwcmkg", "kkmcccmkk", "gkmmmmmkg", "kkkkkkkkk", ".g.g.g.g."],
  mb: ["kkkkkkkkkk", "kcccccccck", "kckkkccmck", "kckwkccmck", "kckkkccmck", "kcccccccck", "kcbbbbbbck", "kcccccccck", "kclclclcck", "kkkkkkkkkk"],
  ram: ["kkkkkkkkkkkk", "kclclcclclck", "kclclcclclck", "kcccccccccck", "kgggggkggggk", "kkkkkkkkkkkk"],
  gpu: ["kkkkkkkkkkkk", "kcccccccccck", "kcmmcccmmcck", "kmkkmcmkkmck", "kcmmcccmmcck", "kcccccccccck", "kkkkkkkkkkkk", "..kgggggk..."],
  ssd: ["kkkkkkkkkkkk", "kgkcccwcccck", "kgkcccccmmck", "kgkcccwcccck", "kkkkkkkkkkkk"],
  psu: ["kkkkkkkkkk", "kcckkkkcck", "kckmmmmkck", "kckmkkmkck", "kckmmmmkck", "kcckkkkcck", "kccccccgck", "kkkkkkkkkk"],
  cooler: ["kkkkkkkkk", "kmmmkmmmk", "kmmbkbmmk", "kmbbkbbmk", "kkkkgkkkk", "kmbbkbbmk", "kmmbkbmmk", "kmmmkmmmk", "kkkkkkkkk"],
};

function PartIcon({ step, scale = 3 }: { step: StepId; scale?: number }) {
  return <Sprite rows={partIcons[step]} palette={pal} scale={scale} />;
}
