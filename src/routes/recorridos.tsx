import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ConnectivityLine } from "@/components/brand/ConnectivityLine";
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
const pendientes = new Set(["444", "B43"]);

function Chip({ code, disabled }: { code: string; disabled?: boolean }) {
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
    <a
      href={`https://www.red.cl/mapas-y-horarios/bus/recorrido/?codser=${encodeURIComponent(code)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
    >
      {code}
    </a>
  );
}

function RecorridosPage() {
  return (
    <>
      <PageHero
        eyebrow="Movilidad"
        title="Nuestros recorridos"
        description="Esta sección es tu puerta de entrada para descubrir todas las opciones que ponemos a tu disposición."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
          <iframe
            title="Zona de operación RBU Santiago"
            src="https://www.google.com/maps?q=Las+Condes,+Santiago,+Chile&z=11&output=embed"
            className="h-[420px] w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* UNIDAD 6 */}
        <div className="mt-16">
          <h2 className="font-display text-3xl text-accent">Unidad 6 — Escuela Militar / Las Condes</h2>
          <ConnectivityLine className="mt-3 max-w-[220px]" />
          <p className="mt-3 text-sm text-[color:var(--gray-dark)]">Operan desde enero 2023.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[...unidad6, "444"].map((c) => (
              <Chip key={c} code={c} disabled={pendientes.has(c)} />
            ))}
          </div>
        </div>

        {/* UNIDAD 4 */}
        <div className="mt-16">
          <h2 className="font-display text-3xl text-accent">Unidad 4 — Vital Apoquindo / Ciudad Empresarial</h2>
          <ConnectivityLine className="mt-3 max-w-[220px]" />
          <p className="mt-3 text-sm text-[color:var(--gray-dark)]">Operan desde enero 2023.</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {[...unidad4, "B43"].map((c) => (
              <Chip key={c} code={c} disabled={pendientes.has(c)} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
