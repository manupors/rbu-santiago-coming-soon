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
import { BusWheel } from "@/components/brand/BusWheel";
import { ConnectivityLine } from "@/components/brand/ConnectivityLine";

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
  { value: "+3.700", label: "Trabajadores y trabajadoras comprometidos con el transporte" },
  { value: "+930", label: "Buses en operación" },
  { value: "+258", label: "Buses eléctricos" },
  { value: "+673", label: "Buses diésel" },
  { value: "+50", label: "Recorridos" },
  { value: "6", label: "Terminales en la Región Metropolitana" },
  { value: "NCh3262", label: "Certificación de igualdad de género — ISO 9001" },
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
      {/* HERO */}
      <section className="relative overflow-hidden bg-primary text-white">
        <BusWheel className="absolute -top-20 -right-24 opacity-30" size={460} />
        <BusWheel className="absolute -bottom-32 -left-20 opacity-20" size={320} color="red" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-white/85">
            RBU Santiago
          </p>
          <h1 className="font-display text-4xl leading-[1.05] sm:text-6xl md:text-7xl max-w-4xl">
            ¡Nos movemos contigo hacia la calidad, conectividad y disposición!
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/90 sm:text-lg">
            En RBU queremos ser mejores en lo que hacemos, siempre. Nos movemos
            gracias a personas que buscan hacer bien su trabajo, para prestar un
            servicio de calidad, con la conectividad que la comunidad necesita.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/recorridos"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-md transition-transform hover:scale-[1.02]"
            >
              Conoce nuestros recorridos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/ofertas-laborales"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/90 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white hover:text-primary"
            >
              Únete a nuestro equipo
            </Link>
          </div>

          <ConnectivityLine color="white" className="mt-14 max-w-xl opacity-80" />
        </div>
      </section>

      {/* STATS */}
      <section className="bg-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl text-primary sm:text-4xl">
              Contamos con un gran equipo humano y tecnología de última generación
            </h2>
            <ConnectivityLine color="red" className="mt-4 max-w-[240px]" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="font-display text-4xl text-primary sm:text-5xl">{s.value}</div>
                <p className="mt-3 text-sm text-[color:var(--gray-dark)]">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="bg-[color:var(--muted)]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ConnectivityLine color="red" className="mx-auto max-w-[220px]" />
          <h2 className="mt-6 text-center font-display text-3xl text-primary sm:text-4xl">
            Nos movemos juntos hacia desafiantes direcciones
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {atributos.map((a) => (
              <div key={a.title} className="rounded-2xl bg-card p-8 shadow-sm ring-1 ring-border">
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-primary text-white">
                  <a.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl text-primary">{a.title}</h3>
                <p className="mt-2 text-sm text-[color:var(--gray-dark)]">{a.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {destinos.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl bg-accent p-8 text-accent-foreground shadow-sm"
              >
                <div className="mb-5 grid h-14 w-14 place-items-center rounded-full bg-white/15">
                  <d.icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl">{d.title}</h3>
                <p className="mt-2 text-sm text-white/90">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
