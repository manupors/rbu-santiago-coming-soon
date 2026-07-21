import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { RouteMap } from "@/components/site/RouteMap";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


export const Route = createFileRoute("/recorridos")({
  head: () => ({
    meta: [
      { title: "Recorridos — RBU Santiago" },
      { name: "description", content: "Descubre todos los recorridos de RBU Santiago en las Unidades 4 y 6 de Red Movilidad." },
      { property: "og:title", content: "Recorridos — RBU Santiago" },
      { property: "og:description", content: "Descubre todos los recorridos de RBU Santiago en las Unidades 4 y 6 de Red Movilidad." },
      { property: "og:url", content: "https://rbusantiago.cl/recorridos" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/recorridos" }],
  }),
  component: RecorridosPage,
});

const unidad6 = [
  "401c","402","403","404","404c","412","414e","415e","418","421",
  "422c","425","428","428e","429","429C","430","430y","435","486",
];
const unidad4 = [
  "B05","B06","B11","B12","B12C","B15","B21","B22","B27","B31N",
  "C02c","C03","C03c","C05","C06","C06c","C07","C09","C10e","C11",
  "C13","C14","C15","C16","C17","C19","C20","C22","C27","C28","C37","C37y",
];
const pendientes = new Set(["421", "444", "430y", "B31N", "B43", "C27", "C28", "C37", "C37y"]);

interface ChipProps {
  code: string;
  disabled?: boolean;
  active?: boolean;
  onClick?: () => void;
}

function Chip({ code, disabled, active, onClick }: ChipProps) {
  if (disabled) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="inline-flex cursor-help select-none items-center justify-center rounded-full bg-[color:var(--gray-light)] px-4 py-2 text-sm font-semibold text-white opacity-80">
              {code}
            </span>
          </TooltipTrigger>
          <TooltipContent>Mapa próximamente</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        "inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-semibold transition-colors " +
        (active
          ? "bg-accent text-accent-foreground shadow-md ring-2 ring-accent/40 ring-offset-2"
          : "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground")
      }
      aria-pressed={active}
    >
      {code}
    </button>
  );
}


function RecorridosPage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <>
      <PageHero
        eyebrow="Movilidad"
        title="Nuestros recorridos"
        description="Selecciona un recorrido para verlo en el mapa. Esta sección es tu puerta de entrada para descubrir todas las opciones que ponemos a tu disposición."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* MAP */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-[color:var(--muted)] px-5 py-4">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-accent" />
              <div>
                <p className="eyebrow text-[color:var(--gray-dark)]">Mapa del recorrido</p>
                <p className="font-display text-xl uppercase text-primary">
                  {selected ? `Recorrido ${selected}` : "Zona de operación RBU"}
                </p>
              </div>
            </div>
            {selected && (
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`https://www.red.cl/mapas-y-horarios/bus/recorrido/?codser=${encodeURIComponent(selected)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
                >
                  Ver en red.cl
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-widest text-[color:var(--gray-dark)] transition-colors hover:border-accent hover:text-accent"
                >
                  Limpiar
                </button>
              </div>
            )}
          </div>
          <RouteMap code={selected} />

        </div>

        {/* UNIDAD 6 */}
        <div className="mt-16">
          <h2 className="font-display text-3xl uppercase text-accent">
            Unidad 6 — Escuela Militar / Las Condes
          </h2>
          <p className="mt-3 text-sm text-[color:var(--gray-dark)]">Operan desde enero 2023.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[...unidad6, "444"].map((c) => (
              <Chip
                key={c}
                code={c}
                disabled={pendientes.has(c)}
                active={selected === c}
                onClick={() => setSelected(c)}
              />
            ))}
          </div>
        </div>

        {/* UNIDAD 4 */}
        <div className="mt-16">
          <h2 className="font-display text-3xl uppercase text-accent">
            Unidad 4 — Vital Apoquindo / Ciudad Empresarial
          </h2>
          <p className="mt-3 text-sm text-[color:var(--gray-dark)]">Operan desde enero 2023.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[...unidad4, "B43"].map((c) => (
              <Chip
                key={c}
                code={c}
                disabled={pendientes.has(c)}
                active={selected === c}
                onClick={() => setSelected(c)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
