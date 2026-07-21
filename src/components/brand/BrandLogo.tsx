import logoUrl from "@/assets/rbu-logo.png";

interface BrandLogoProps {
  variant?: "color" | "white";
  className?: string;
  showSlogan?: boolean;
}

/**
 * Logo oficial RBU Santiago.
 * En variante "white" (sobre fondos oscuros) el logo se muestra sobre
 * un fondo blanco redondeado para respetar la zona de protección.
 */
export function BrandLogo({ variant = "color", className }: BrandLogoProps) {
  if (variant === "white") {
    return (
      <div
        className={`inline-flex items-center justify-center rounded-xl bg-white p-2 ${className ?? ""}`}
        aria-label="RBU Santiago"
      >
        <img
          src={logoAsset.url}
          alt="RBU Santiago"
          className="h-full w-auto object-contain"
        />
      </div>
    );
  }

  return (
    <img
      src={logoAsset.url}
      alt="RBU Santiago"
      className={`object-contain ${className ?? ""}`}
    />
  );
}
