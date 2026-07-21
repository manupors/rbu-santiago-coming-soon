import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import { useState } from "react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/quienes-somos", label: "¿Quiénes somos?" },
  { to: "/recorridos", label: "Recorridos" },
  { to: "/mesa-de-ayuda", label: "Mesa de Ayuda" },
  { to: "/reclamos", label: "Reclamos" },
  { to: "/ofertas-laborales", label: "Ofertas Laborales" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3" aria-label="RBU Santiago — Inicio">
          <BrandLogo className="h-12 w-12" />
          <span className="hidden flex-col leading-none sm:flex">
            <span className="font-display text-xl uppercase tracking-wider text-primary">
              RBU Santiago
            </span>
            <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--gray-dark)]">
              Grupo Transdev
            </span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-none px-3 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-foreground/75 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="xl:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="h-6 w-6 text-primary" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetTitle className="sr-only">Menú</SheetTitle>
              <div className="mt-8 flex flex-col gap-1">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="border-b border-border px-2 py-4 text-sm font-bold uppercase tracking-[0.18em] text-foreground hover:text-accent"
                    activeProps={{ className: "text-accent" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
