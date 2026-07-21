import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ExternalLink } from "lucide-react";

export const Route = createFileRoute("/mesa-de-ayuda")({
  head: () => ({
    meta: [
      { title: "Mesa de Ayuda — RBU Santiago" },
      { name: "description", content: "Canal de denuncias SpeakUp. Tu voz importa para construir un entorno más seguro y respetuoso." },
      { property: "og:title", content: "Mesa de Ayuda — RBU Santiago" },
      { property: "og:description", content: "Canal de denuncias SpeakUp. Tu voz importa para construir un entorno más seguro y respetuoso." },
      { property: "og:url", content: "https://rbusantiago.cl/mesa-de-ayuda" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/mesa-de-ayuda" }],
  }),
  component: MesaAyudaPage,
});

function MesaAyudaPage() {
  return (
    <>
      <PageHero
        eyebrow="Canal de integridad"
        title="Tu voz importa"
        description="¿Has sido testigo de situaciones que van en contra de nuestros valores y principios? En RBU Santiago, creemos que la voz de cada persona importa y puede contribuir a un entorno más seguro y respetuoso."
      />

      <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <p className="text-base text-[color:var(--gray-dark)]">
          Deja constancia de manera segura y confidencial a través de nuestro canal
          externo <strong className="text-primary">SpeakUp</strong>, gestionado por Transdev.
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
      </section>
    </>
  );
}
