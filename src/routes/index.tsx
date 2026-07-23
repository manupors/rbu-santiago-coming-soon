import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Link2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import heroBus from "@/assets/hero-bus.jpg";
import proposito1 from "@/assets/proposito-1.jpg.asset.json";
import proposito2 from "@/assets/proposito-2.jpg.asset.json";
import proposito3 from "@/assets/proposito-3.jpg.asset.json";
import valorCuidar from "@/assets/valor-cuidar.png";
import valorCompartir from "@/assets/valor-compartir.png";
import valorAtreverse from "@/assets/valor-atreverse.png";
import valorContribuir from "@/assets/valor-contribuir.png";

const propositoSlides = [
  { src: proposito1.url, alt: "Flota de buses RBU en terminal de Santiago" },
  { src: proposito2.url, alt: "Buses Marcopolo Torino de RBU alineados en terminal" },
  { src: proposito3.url, alt: "Vista aérea del terminal de buses RBU" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RBU Santiago — Nos movemos contigo" },
      { name: "description", content: "Transporte público del sector nororiente de Santiago. Más de 930 buses, +3.700 personas y 50 recorridos." },
      { property: "og:title", content: "RBU Santiago — Nos movemos contigo" },
      { property: "og:description", content: "Transporte público del sector nororiente de Santiago. Más de 930 buses, +3.700 personas y 50 recorridos." },
      { property: "og:url", content: "https://rbusantiago.cl/" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/" }],
  }),
  component: HomePage,
});

const stats = [
  { value: "+3.700", label: "Trabajadoras y trabajadores comprometidos" },
  { value: "+930", label: "Buses en operación" },
  { value: "+258", label: "Buses eléctricos" },
  { value: "+673", label: "Buses diésel" },
  { value: "+50", label: "Recorridos" },
  { value: "6", label: "Terminales en la RM" },
];

const certificaciones = [
  { code: "ISO 9001", label: "Gestión de Calidad" },
  { code: "ISO 39001", label: "Seguridad Vial" },
  { code: "ISO 50001", label: "Gestión de la Energía" },
  { code: "ISO 55001", label: "Gestión de Activos" },
];

const valores = [
  { icon: valorCuidar, title: "Cuidar", desc: "Cuidamos a las personas, a nuestros equipos y al entorno en cada decisión." },
  { icon: valorCompartir, title: "Compartir", desc: "Compartimos conocimiento, experiencias y logros para crecer juntos." },
  { icon: valorAtreverse, title: "Atreverse", desc: "Nos atrevemos a innovar y a desafiar lo establecido para mejorar el servicio." },
  { icon: valorContribuir, title: "Contribuir", desc: "Contribuimos a la movilidad y calidad de vida de las personas de Santiago." },
];

const destinos = [
  {
    icon: BadgeCheck,
    title: "Calidad",
    desc: "Sentimos orgullo de lo que hacemos, conocemos nuestro rubro.",
  },
  {
    icon: Link2,
    title: "Conectividad",
    desc: "Lograr conectar a quienes usan nuestro servicio con todo aquello que les importa.",
  },
  {
    icon: Sparkles,
    title: "Disposición",
    desc: "Tenemos la voluntad, motivación y determinación para desafiarnos mutuamente.",
  },
];

function HomePage() {
  return (
    <>
      {/* HERO cinematográfico full-bleed */}
      <section className="relative -mt-[1px] overflow-hidden bg-black text-white">
        <img
          src={heroBus}
          alt="Vista desde el interior de un bus recorriendo Santiago"
          width={1920}
          height={1200}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--primary-dark)]/70 via-transparent to-transparent" />

        <div className="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-end px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-40 lg:px-8">
          <p className="eyebrow mb-6 text-white/80">
            <span className="text-accent">—</span>&nbsp;&nbsp;Grupo Transdev · Santiago de Chile
          </p>
          <h1 className="headline-xl max-w-5xl text-5xl sm:text-7xl md:text-[5.5rem] lg:text-[6.5rem]">
            Reinventamos hoy la movilidad de Santiago para mañana
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            En RBU nos movemos por las personas. Más de 3.700 trabajadoras y
            trabajadores, 930 buses y 50 recorridos que conectan el sector
            nororiente de la capital, con la calidad y seguridad del Grupo
            Transdev.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/recorridos"
              className="inline-flex items-center gap-3 bg-accent px-7 py-4 text-sm font-bold uppercase tracking-widest text-accent-foreground transition-colors hover:bg-white hover:text-primary"
            >
              Conoce nuestros recorridos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/ofertas-laborales"
              className="inline-flex items-center gap-3 border border-white/70 px-7 py-4 text-sm font-bold uppercase tracking-widest text-white transition-colors hover:bg-white hover:text-primary"
            >
              Únete al equipo
            </Link>
          </div>
        </div>

        {/* Barra inferior estilo Transdev */}
        <div className="relative border-t border-white/15 bg-black/40 backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-5 text-xs uppercase tracking-widest text-white/70 sm:px-6 lg:px-8">
            <span>Nos movemos contigo</span>
            <span className="hidden sm:inline">·</span>
            <span>Sector nororiente de Santiago</span>
            <span className="hidden sm:inline">·</span>
            <span>Parte del Grupo Transdev</span>
          </div>
        </div>
      </section>

      {/* Manifiesto — editorial */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
          <div className="lg:col-span-4">
            <p className="eyebrow text-accent">— Quiénes somos</p>
          </div>
          <div className="lg:col-span-8">
            <h2 className="headline-xl text-4xl text-primary sm:text-5xl md:text-6xl">
              Somos parte del Grupo&nbsp;Transdev,
              <br />
              líder mundial en movilidad sostenible.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-[color:var(--gray-dark)]">
              En RBU queremos ser mejores en lo que hacemos, siempre. Nos
              movemos gracias a personas que buscan hacer bien su trabajo, para
              prestar un servicio de calidad, con la conectividad que la
              comunidad necesita y la disposición que nos caracteriza.
            </p>
            <Link
              to="/quienes-somos"
              className="mt-10 inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-primary transition-colors hover:text-accent"
            >
              Descubre nuestra historia
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STATS — banda azul oscura estilo Transdev */}
      <section className="relative overflow-hidden bg-[color:var(--primary-dark)] py-24 text-white sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-white/70">— En cifras</p>
            <h2 className="headline-xl mt-6 text-4xl sm:text-5xl md:text-6xl">
              Un equipo humano y tecnología
              <br />
              de última generación.
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-white/20 pt-5">
                <div className="font-display text-5xl leading-none text-white sm:text-6xl">
                  {s.value}
                </div>
                <p className="mt-3 text-sm leading-snug text-white/75">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMAGEN + intro valores (split editorial) */}
      <section className="bg-background">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[380px] overflow-hidden lg:min-h-[560px]">
            <img
              src={sectionBus}
              alt="Pasajeros abordando un bus RBU al atardecer en Santiago"
              width={1600}
              height={1008}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center bg-background px-6 py-20 sm:px-12 lg:px-16">
            <p className="eyebrow text-accent">— Nuestro propósito</p>
            <h2 className="headline-xl mt-6 text-4xl text-primary sm:text-5xl md:text-6xl">
              Avanzamos sin parar para ser elegidos por clientes, pasajeros y empleados.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[color:var(--gray-dark)]">
              Cuatro valores guían la forma en que trabajamos día a día para
              entregar un servicio confiable a las personas del nororiente de
              Santiago.
            </p>
          </div>
        </div>
      </section>

      {/* VALORES — franja blanca minimal */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-accent">— Nuestros valores</p>
          <div className="mt-10 grid gap-0 border-t border-border md:grid-cols-2 lg:grid-cols-4">
            {valores.map((v) => (
              <div
                key={v.title}
                className="group relative border-b border-border p-8 transition-colors hover:bg-[color:var(--muted)] lg:border-r lg:last:border-r-0"
              >
                <img
                  src={v.icon}
                  alt={v.title}
                  className="h-14 w-14 object-contain"
                />
                <h3 className="mt-6 font-display text-3xl uppercase text-primary">
                  {v.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[color:var(--gray-dark)]">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CERTIFICACIONES */}
      <section className="bg-[color:var(--muted)]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="eyebrow text-accent">— Certificaciones</p>
          <h2 className="headline-xl mt-6 text-3xl text-primary sm:text-4xl md:text-5xl">
            Un sistema de gestión integrado y certificado.
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certificaciones.map((c) => (
              <div
                key={c.code}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <p className="font-display text-2xl text-primary">{c.code}</p>
                <p className="mt-2 text-sm text-[color:var(--gray-dark)]">{c.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* DESTINOS — banda roja de acento */}
      <section className="bg-accent py-24 text-accent-foreground sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="eyebrow text-white/80">— Nuestros destinos</p>
            <h2 className="headline-xl mt-6 text-4xl sm:text-5xl md:text-6xl">
              Calidad, conectividad y disposición.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-white/90">
              Los destinos que perseguimos como equipo, en cada recorrido y en
              cada interacción con nuestras usuarias y usuarios.
            </p>
          </div>

          <div className="mt-16 grid gap-0 border-t border-white/25 md:grid-cols-3">
            {destinos.map((d) => (
              <div
                key={d.title}
                className="border-b border-white/25 p-8 md:border-r md:last:border-r-0"
              >
                <d.icon className="h-9 w-9 text-white" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-3xl uppercase">
                  {d.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/90">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final — invitación laboral */}
      <section className="bg-background py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="eyebrow text-accent">— Súmate</p>
              <h2 className="headline-xl mt-6 text-4xl text-primary sm:text-5xl md:text-6xl">
                Mueve Santiago con nosotros.
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[color:var(--gray-dark)]">
                Buscamos conductores, mecánicos y equipos de operación
                comprometidos con la seguridad y la calidad de servicio.
              </p>
            </div>
            <div className="lg:col-span-4 lg:justify-self-end">
              <Link
                to="/ofertas-laborales"
                className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-sm font-bold uppercase tracking-widest text-primary-foreground transition-colors hover:bg-accent"
              >
                Ver ofertas laborales
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
