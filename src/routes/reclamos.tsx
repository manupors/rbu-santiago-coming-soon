import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";

export const Route = createFileRoute("/reclamos")({
  head: () => ({
    meta: [
      { title: "Reclamos, sugerencias y felicitaciones — RBU Santiago" },
      { name: "description", content: "Canales de atención RBU y opciones para ingresar reclamos en segunda instancia." },
      { property: "og:title", content: "Reclamos, sugerencias y felicitaciones — RBU Santiago" },
      { property: "og:description", content: "Canales de atención RBU y opciones para ingresar reclamos en segunda instancia." },
      { property: "og:url", content: "https://rbusantiago.cl/reclamos" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/reclamos" }],
  }),
  component: ReclamosPage,
});

function ReclamosPage() {
  return (
    <>
      <PageHero
        eyebrow="Atención a usuarias y usuarios"
        title="Escuchamos tu experiencia"
        description="Comunícate con nosotros a través de nuestros canales de atención."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="rounded-r-xl rounded-l-none border-l-4 border-[#0047BA] bg-[#A4A9AD]/20 p-5 text-sm text-[color:var(--gray-dark)]">
            <p className="font-semibold text-primary">Canales de atención RBU:</p>
            <ul className="mt-2 space-y-1">
              <li>📞 <strong>Teléfono:</strong> 600 488 1800</li>
              <li>✉️ <strong>Correo:</strong> consultas.rbu@transdev.cl</li>
            </ul>

            <p className="mt-4 font-semibold text-primary">Para ingresar un reclamo en segunda instancia, puede realizarlo en los siguientes canales:</p>
            <ul className="mt-2 space-y-1">
              <li>
                <strong>OIRS Transportescucha:</strong>{" "}
                <a href="https://www.transportescucha.cl" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.transportescucha.cl</a>,
                {" "}o al teléfono (+562) 22362222
              </li>
              <li>
                <strong>Directorio de Transporte Público Metropolitano:</strong>{" "}
                <a href="https://www.red.cl" target="_blank" rel="noopener noreferrer" className="text-primary underline">www.red.cl</a>,
                {" "}o al Call center 600 730 00 73 (desde celulares) o al 800 73 00 73 (desde teléfono fijo)
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
