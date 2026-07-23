import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin } from "lucide-react";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { ConnectivityLine } from "@/components/brand/ConnectivityLine";

export function Footer() {
  return (
    <footer className="mt-24 bg-[color:var(--primary-dark)] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <BrandLogo variant="white" className="h-20 w-20" />
          <p className="mt-4 max-w-xs text-sm text-white/80">
            Empresa de transporte público del sector nororiente de Santiago.
            Nos movemos contigo hacia la calidad, conectividad y disposición.
          </p>
          <ConnectivityLine color="white" className="mt-6 max-w-[220px]" />
        </div>

        <div>
          <h3 className="font-display text-xl">Enlaces rápidos</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-accent">Inicio</Link></li>
            <li><Link to="/quienes-somos" className="hover:text-accent">¿Quiénes somos?</Link></li>
            <li><Link to="/recorridos" className="hover:text-accent">Recorridos</Link></li>
            <li><Link to="/politica-sgi" className="hover:text-accent">Política SGI</Link></li>
            <li><Link to="/mesa-de-ayuda" className="hover:text-accent">Speak Up</Link></li>
            <li><Link to="/reclamos" className="hover:text-accent">Reclamos, sugerencias y felicitaciones</Link></li>
            <li><Link to="/ofertas-laborales" className="hover:text-accent">Ofertas Laborales</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl">Contacto</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>Santiago de Chile — Sector nororiente</span>
            </li>
            <li className="flex items-start gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>dataprivacy@transdev.com</span>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href="https://www.instagram.com/rbusantiago/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/40 hover:bg-white hover:text-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/40 hover:bg-white hover:text-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      <ConnectivityLine color="white" className="mx-auto max-w-7xl px-4 opacity-40" />

      <div className="mx-auto max-w-7xl px-4 py-6 text-center text-xs text-white/70 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} RBU Santiago. Todos los derechos reservados.
      </div>
    </footer>
  );
}
