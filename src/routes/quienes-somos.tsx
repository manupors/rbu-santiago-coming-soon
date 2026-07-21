import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/quienes-somos")({
  head: () => ({
    meta: [
      { title: "¿Quiénes somos? — RBU Santiago" },
      { name: "description", content: "Historia, misión y visión de RBU Santiago, parte del grupo Transdev." },
      { property: "og:title", content: "¿Quiénes somos? — RBU Santiago" },
      { property: "og:description", content: "Historia, misión y visión de RBU Santiago, parte del grupo Transdev." },
      { property: "og:url", content: "https://rbusantiago.cl/quienes-somos" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/quienes-somos" }],
  }),
  component: QuienesSomosPage,
});

const timeline = [
  {
    year: "2003",
    text: "Fundada como “Redbus” (grupo Prospecta). Servicios alimentadores del Metro. Flota: 366 buses, +900 conductores.",
  },
  {
    year: "2004",
    text: "Se transforma en Redbus Urbano (RBU). Concesión zona C Transantiago. ~330 buses en zona oriente.",
  },
  {
    year: "2007",
    text: "Adquirida por el grupo francés Transdev. Presente en 19 países, +100.000 profesionales, +10.000 millones de pasajeros al año.",
  },
  {
    year: "2011",
    text: "Asume operación de Zona B en la reestructuración de Red Movilidad. +320 buses, sector norte de Santiago.",
  },
  {
    year: "Hoy",
    text: "931 buses, +400.000 pasajeros diarios, +4.000 trabajadores, +2.000 conductores. 11% del equipo conductor son mujeres.",
  },
];

function QuienesSomosPage() {
  return (
    <>
      <PageHero
        eyebrow="Nuestra historia"
        title="Nos movemos contigo"
        description="Somos parte del grupo Transdev, un operador global de transporte público con presencia en 19 países."
      />

      {/* Timeline */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="font-display text-3xl text-primary">Nuestra historia</h2>
        <div className="relative mt-10 pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-primary/40" aria-hidden="true" />
          <div className="absolute left-[3px] -top-1 h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
          <div className="absolute left-[3px] -bottom-1 h-3 w-3 rounded-full bg-primary" aria-hidden="true" />

          <ul className="space-y-10">
            {timeline.map((t) => (
              <li key={t.year} className="relative">
                <span
                  className="absolute -left-[26px] top-1.5 h-4 w-4 rounded-full bg-accent ring-4 ring-background"
                  aria-hidden="true"
                />
                <p className="font-display text-2xl text-primary">{t.year}</p>
                <p className="mt-1 text-sm text-[color:var(--gray-dark)]">{t.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Misión & Visión */}
      <section className="bg-[color:var(--muted)]/50 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <article className="rounded-2xl border-t-4 border-accent bg-card p-8 shadow-sm">
            <h3 className="font-display text-3xl text-primary">Misión</h3>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--gray-dark)]">
              RBU Santiago S.A. es una empresa de transporte público de pasajeros
              que opera en la Red Metropolitana de Movilidad y que cuenta con una
              flota de buses de alto estándar que, junto a un equipo humano de
              excelencia, contribuyen a mejorar la experiencia de viaje de las
              personas mediante una propuesta de valor basada en la seguridad, la
              mejora continua y la calidad.
            </p>
          </article>
          <article className="rounded-2xl border-t-4 border-accent bg-card p-8 shadow-sm">
            <h3 className="font-display text-3xl text-primary">Visión</h3>
            <p className="mt-4 text-sm leading-relaxed text-[color:var(--gray-dark)]">
              Ser referentes del sistema Red Movilidad por la calidad, cumplimiento
              operacional y seguridad. Aumentar nuestra participación en el
              transporte público metropolitano y contribuir a mejorar la calidad
              de vida de las personas.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
