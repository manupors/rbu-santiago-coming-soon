import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { AlertTriangle, ExternalLink } from "lucide-react";

export const Route = createFileRoute("/mesa-de-ayuda")({
  head: () => ({
    meta: [
      { title: "Speak Up — RBU Santiago" },
      { name: "description", content: "Canal de integridad SpeakUp. Tu voz importa para construir un entorno más seguro y respetuoso." },
      { property: "og:title", content: "Speak Up — RBU Santiago" },
      { property: "og:description", content: "Canal de integridad SpeakUp. Tu voz importa para construir un entorno más seguro y respetuoso." },
      { property: "og:url", content: "https://rbusantiago.cl/mesa-de-ayuda" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/mesa-de-ayuda" }],
  }),
  component: SpeakUpPage,
});

function SpeakUpPage() {
  return (
    <>
      <PageHero
        eyebrow="Canal de integridad"
        title="Speak Up"
        description="Tu voz importa."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-base leading-relaxed text-[color:var(--gray-dark)]">
          ¿Has sido testigo de situaciones que van en contra de nuestros
          valores y principios? En RBU Santiago, creemos que la voz de cada
          persona importa y puede contribuir a un entorno más seguro y
          respetuoso.
        </p>

        <a
          href="https://www.speakupfeedback.eu/web/transdev"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 rounded-full border-2 border-primary bg-white px-8 py-4 font-display text-xl text-primary shadow-sm transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Deja constancia de esta acción aquí
          <ExternalLink className="h-5 w-5" />
        </a>

        <p className="mt-6 text-xs text-muted-foreground">
          Se abrirá el portal externo SpeakUp en una nueva pestaña.
        </p>

        <div className="mt-12 rounded-xl border-2 border-[#F42534] bg-[#F42534]/5 p-6 text-left">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 text-[#F42534]" />
            <div className="text-sm leading-relaxed text-[color:var(--gray-dark)]">
              <p className="font-bold text-[#F42534]">ATENCIÓN</p>
              <p className="mt-2">
                Si su reporte está relacionado con accidentes, conducción de
                buses o consultas y reclamos sobre nuestro servicio de
                transporte (recorridos, paradas u otros), diríjase a{" "}
                <Link to="/reclamos" className="font-semibold text-primary underline">
                  Reclamos
                </Link>
                .
              </p>
              <p className="mt-2">
                <strong>Importante:</strong> Estos casos no son gestionados por
                SpeakUp y no serán procesados por este canal.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
