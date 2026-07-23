import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const Route = createFileRoute("/politica-sgi")({
  head: () => ({
    meta: [
      { title: "Política del Sistema de Gestión Integrada — RBU Santiago" },
      { name: "description", content: "Política del Sistema de Gestión Integrada de RBU Santiago basada en las normas ISO 9001, 14001, 45001, 39001, 50001 y 55001." },
      { property: "og:title", content: "Política del Sistema de Gestión Integrada — RBU Santiago" },
      { property: "og:description", content: "Política del Sistema de Gestión Integrada de RBU Santiago basada en las normas ISO 9001, 14001, 45001, 39001, 50001 y 55001." },
      { property: "og:url", content: "https://rbusantiago.cl/politica-sgi" },
    ],
    links: [{ rel: "canonical", href: "https://rbusantiago.cl/politica-sgi" }],
  }),
  component: PoliticaSGIPage,
});

const pilares = [
  {
    norma: "ISO 9.001",
    titulo: "Sistema de Gestión de Calidad",
    texto: "Mantener, reparar y preservar el estado de conservación de nuestra flota, de acuerdo con su antigüedad y uso, de manera de asegurar que cumpla con su ciclo de vida, respetando la seguridad de nuestros colaboradores y del medio ambiente, buscando constantemente la eficiencia y el cumplimiento de los compromisos contractuales.",
  },
  {
    norma: "ISO 14.001",
    titulo: "Sistema de Gestión Ambiental",
    texto: "Cumplir con la legislación vigente en materia medioambiental y proteger el medio ambiente, identificando, evaluando y controlando los aspectos ambientales, con el propósito de prevenir la contaminación, disminuyendo constantemente el impacto de nuestras actividades.",
  },
  {
    norma: "ISO 39.001",
    titulo: "Sistema de Gestión de Seguridad Vial",
    texto: "Disminuir los accidentes graves y fatales en accidentes viales, fomentando las buenas prácticas en la conducción de acuerdo con la normativa legal vigente en el ámbito de la seguridad vial y contribuyendo con la mejora continua del sistema de gestión de seguridad vial.",
  },
  {
    norma: "ISO 45.001",
    titulo: "Sistema de Gestión de Seguridad y Salud en el Trabajo",
    texto: "Mantener un firme compromiso con la protección de la vida y salud de las personas colaboradoras, promoviendo una cultura de seguridad y autocuidado, incentivando la excelencia operativa y el cumplimiento de los requisitos legales.",
  },
  {
    norma: "ISO 50.001",
    titulo: "Sistema de Gestión de Energía",
    texto: "Promover el uso eficiente de la energía mediante el cumplimiento de los requisitos legales y otros aplicables, asegurando la disponibilidad de información y recursos necesarios para alcanzar los objetivos y metas energéticas.",
  },
  {
    norma: "ISO 55.001",
    titulo: "Sistema de Gestión de Activos",
    texto: "Mantener una oferta de transporte sostenible, que nos permita cumplir con la satisfacción de nuestros clientes y usuarios de manera segura y rentable, capacitando constantemente a nuestro personal.",
  },
];

function PoliticaSGIPage() {
  return (
    <>
      <PageHero
        eyebrow="Compromiso corporativo"
        title="Política del Sistema de Gestión Integrada"
        description="Nuestro compromiso con la calidad, el medio ambiente, la seguridad, la energía y la gestión de activos."
      />

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6 text-base leading-relaxed text-[color:var(--gray-dark)]">
          <p>
            RBU Santiago S.A. es una empresa de transporte público de pasajeros
            que opera en el sistema RED Metropolitana de Movilidad. En RBU
            Santiago nos comprometemos a entregar un servicio de calidad
            cumpliendo con los requisitos, necesidades y expectativas de
            nuestros clientes, usuarios y partes interesadas. Asimismo, nuestro
            compromiso es el mejorar constantemente nuestro servicio para
            mantener el cumplimiento y continuidad operacional, atención de
            calidad para nuestros usuarios, la preservación de los activos y el
            uso eficiente de la energía.
          </p>
          <p>
            Para lo anterior, hemos implementado un sistema de gestión
            integrado que considera las Normas Internacionales{" "}
            <strong>ISO 9.001:2015; ISO 14.001:2015; ISO 45.001:2018; ISO
            39.001:2012; ISO 50.001:2018 e ISO 55.001:2014</strong>, que en
            complemento con las declaraciones estratégicas de la compañía se
            traduce en los siguientes pilares:
          </p>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {pilares.map((p) => (
            <AccordionItem key={p.norma} value={p.norma}>
              <AccordionTrigger className="text-left">
                <span>
                  <span className="font-display text-lg text-primary">{p.norma}</span>
                  <span className="ml-2 text-sm text-[color:var(--gray-dark)]">— {p.titulo}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-sm leading-relaxed text-[color:var(--gray-dark)]">
                {p.texto}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </>
  );
}
