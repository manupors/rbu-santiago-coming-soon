interface BrandLogoProps {
  variant?: "color" | "white";
  className?: string;
  showSlogan?: boolean;
}

/**
 * Logo RBU: silueta de bus con las siglas "RBU" y el slogan
 * "Nos movemos contigo" sobre la línea de conectividad.
 */
export function BrandLogo({ variant = "color", className, showSlogan = true }: BrandLogoProps) {
  const bus = variant === "white" ? "#FFFFFF" : "#0047BA";
  const wheel = variant === "white" ? "#FFFFFF" : "#5C6670";
  const text = variant === "white" ? "#0047BA" : "#FFFFFF";
  const line = variant === "white" ? "#FFFFFF" : "#0047BA";
  const slogan = variant === "white" ? "#FFFFFF" : "#5C6670";

  return (
    <div className={className} aria-label="RBU Santiago">
      <svg
        viewBox="0 0 160 70"
        role="img"
        aria-hidden="true"
        className="h-full w-full"
      >
        {/* Bus silhouette */}
        <rect x="10" y="8" width="140" height="38" rx="10" fill={bus} />
        {/* Windshield hint */}
        <rect x="118" y="14" width="26" height="14" rx="4" fill={variant === "white" ? "#0047BA" : "#FFFFFF"} opacity="0.15" />
        {/* RBU text */}
        <text
          x="55"
          y="35"
          fontFamily="Bebas Neue, Impact, sans-serif"
          fontSize="26"
          fontWeight="700"
          fill={text}
          letterSpacing="2"
        >
          RBU
        </text>
        {/* Wheels */}
        <circle cx="35" cy="50" r="7" fill={wheel} />
        <circle cx="35" cy="50" r="3" fill={variant === "white" ? "#0047BA" : "#FFFFFF"} />
        <circle cx="125" cy="50" r="7" fill={wheel} />
        <circle cx="125" cy="50" r="3" fill={variant === "white" ? "#0047BA" : "#FFFFFF"} />
        {/* Connectivity line under bus */}
        <circle cx="6" cy="60" r="3" fill={line} />
        <line x1="9" y1="60" x2="151" y2="60" stroke={line} strokeWidth="1.6" />
        <circle cx="154" cy="60" r="3" fill={line} />
        {showSlogan && (
          <text
            x="80"
            y="68"
            textAnchor="middle"
            fontFamily="Dosis, sans-serif"
            fontSize="7"
            fontWeight="600"
            fill={slogan}
            letterSpacing="0.5"
          >
            NOS MOVEMOS CONTIGO
          </text>
        )}
      </svg>
    </div>
  );
}
