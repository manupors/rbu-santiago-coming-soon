import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Handshake,
  ShieldCheck,
  HeartHandshake,
  BadgeCheck,
  Link2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import heroBus from "@/assets/hero-bus.jpg";
import sectionBus from "@/assets/section-bus.jpg";

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
  { value: "NCh3262", label: "Certificación de igualdad de género" },
  { value: "ISO 9001", label: "Sistema de gestión certificado" },
];

const atributos = [
  {
    icon: Handshake,
    title: "Apoyo",
    desc: "Nos impulsa a dar siempre lo mejor, generando espacios de colaboración y trabajo en equipo.",
  },
  {
    icon: ShieldCheck,
    title: "Seguridad",
    desc: "Nos movemos y tomamos decisiones que cuiden la integridad y bienestar de las personas.",
  },
  {
    icon: HeartHandshake,
    title: "Cercanía",
    desc: "Nos importan las personas y nos movemos proactivamente para construir un buen lugar para trabajar.",
  },
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
            Reinventamos hoy
            <span className="inline-flex items-center gap-4 pl-2 align-middle">
              <RedArrow className="hidden h-6 w-16 sm:inline-block md:h-8 md:w-24" />
            </span>
            la movilidad de Santiago para mañana
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
            <RedArrow className="mt-6 h-3 w-24" />
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
            <RedArrow className="mt-6 h-3 w-24" />
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
            <p className="eyebrow text-accent">— Nuestros valores</p>
            <RedArrow className="mt-6 h-3 w-24" />
            <h2 className="headline-xl mt-6 text-4xl text-primary sm:text-5xl md:text-6xl">
              Nos movemos juntos hacia desafiantes direcciones.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-[color:var(--gray-dark)]">
              Tres atributos guían la forma en que trabajamos día a día para
              entregar un servicio confiable a las personas del nororiente de
              Santiago.
            </p>
          </div>
        </div>
      </section>

      {/* ATRIBUTOS — franja blanca minimal */}
      <section className="bg-background py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-0 border-t border-border md:grid-cols-3">
            {atributos.map((a) => (
              <div
                key={a.title}
                className="group relative border-b border-border p-8 transition-colors hover:bg-[color:var(--muted)] md:border-r md:last:border-r-0"
              >
                <a.icon className="h-9 w-9 text-accent" strokeWidth={1.5} />
                <h3 className="mt-6 font-display text-3xl uppercase text-primary">
                  {a.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[color:var(--gray-dark)]">
                  {a.desc}
                </p>
                <RedArrow className="mt-8 h-2.5 w-14 opacity-0 transition-opacity group-hover:opacity-100" />
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
            <RedArrow color="white" className="mt-6 h-3 w-24" />
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
              <RedArrow className="mt-6 h-3 w-24" />
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
