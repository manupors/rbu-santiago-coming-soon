import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RBU Santiago - Sitio en Mantención" },
      { name: "description", content: "RBU Santiago se encuentra en mantención. Estamos trabajando para volver con nuestros servicios en línea." },
      { property: "og:title", content: "RBU Santiago - Sitio en Mantención" },
      { property: "og:description", content: "RBU Santiago se encuentra en mantención. Estamos trabajando para volver con nuestros servicios en línea." },
    ],
  }),
  component: MaintenancePage,
});

function MaintenancePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background px-6 py-12 text-center">
      <div className="mx-auto max-w-xl rounded-3xl bg-card p-8 shadow-lg ring-1 ring-border sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
          <WrenchIcon className="h-8 w-8" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Sitio en Mantención
        </h1>

        <p className="mt-4 text-lg text-muted-foreground">
          Estamos realizando mejoras en <strong className="text-accent">RBU Santiago</strong>.
          Volveremos pronto con nuestros servicios en línea.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            Trabajando en ello
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-8">
          <p className="text-sm text-muted-foreground">
            Si necesitas contactarnos urgentemente, escríbenos a{" "}
            <a
              href="mailto:contacto@rbusantiago.cl"
              className="font-medium text-primary underline underline-offset-4 hover:text-accent"
            >
              contacto@rbusantiago.cl
            </a>
          </p>
        </div>
      </div>

      <footer className="mt-12 text-sm text-muted-foreground">
        © {new Date().getFullYear()} RBU Santiago. Todos los derechos reservados.
      </footer>
    </main>
  );
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}
