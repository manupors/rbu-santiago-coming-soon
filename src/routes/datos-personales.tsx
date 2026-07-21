import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/datos-personales")({
  head: () => ({
    meta: [
      { title: "Datos Personales — RBU Santiago" },
      { name: "description", content: "Política de tratamiento de datos personales de RBU Santiago." },
      { property: "og:title", content: "Datos Personales — RBU Santiago" },
      { property: "og:description", content: "Política de tratamiento de datos personales de RBU Santiago." },
      { property: "og:url", content: "https://rbusantiago.cl/datos-personales" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/datos-personales" }],
  }),
  component: DatosPersonalesPage,
});

const items = [
  {
    title: "Nuestros compromisos",
    body:
      "Solo recopilamos la información necesaria para prestar nuestros servicios. Ningún dato se comparte sin consentimiento explícito. Cumplimos con el Reglamento General de Protección de Datos (RGPD) y con la normativa chilena aplicable.",
  },
  {
    title: "¿Qué información se recopila y por qué?",
    body:
      "Recopilamos datos desde formularios de contacto (Departamento de Atención a Usuarios y Usuarias), solicitudes de trabajo (Recursos Humanos) y para el correcto funcionamiento del sitio (cookies).",
  },
  {
    title: "¿Quién usa esta información?",
    body:
      "Solo empleados y empleadas de RBU Santiago y proveedores autorizados que colaboran con la operación del servicio pueden acceder a los datos, siempre bajo estrictas obligaciones de confidencialidad.",
  },
  {
    title: "¿Cuánto tiempo se conservan los datos?",
    body: "Máximo 2 años desde la última interacción, salvo obligación legal que requiera un plazo mayor.",
  },
  {
    title: "Tus derechos",
    body:
      "Puedes ejercer tus derechos de acceso, eliminación, oposición y rectificación en cualquier momento escribiéndonos a dataprivacy@transdev.com.",
  },
  {
    title: "Cookies",
    body:
      "Utilizamos cookies internas (sesión y estadísticas anónimas) y externas (Google Analytics, Google Maps, YouTube y redes sociales). Al ingresar al sitio verás un banner de consentimiento. Duración máxima de las cookies: 13 meses.",
  },
];

function DatosPersonalesPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacidad"
        title="Política de datos personales"
        description="Cuidar tus datos es parte de cuidarte. Aquí explicamos qué recopilamos, para qué y qué derechos tienes."
      />
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full">
          {items.map((it, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-semibold text-primary">
                {it.title}
              </AccordionTrigger>
              <AccordionContent className="text-[color:var(--gray-dark)]">
                {it.body}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
