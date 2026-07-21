interface RedArrowProps {
  className?: string;
  color?: "red" | "white" | "blue";
}

/**
 * Flecha horizontal roja — motivo tipográfico inspirado en Transdev.
 * Se usa entre palabras y como separador de sección.
 */
export function RedArrow({ className, color = "red" }: RedArrowProps) {
  const stroke =
    color === "white" ? "#FFFFFF" : color === "blue" ? "#0047BA" : "#F42534";
  return (
    <svg
      viewBox="0 0 80 12"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="none"
    >
      <line x1="0" y1="6" x2="70" y2="6" stroke={stroke} strokeWidth="2.5" />
      <polyline
        points="62,1 74,6 62,11"
        fill="none"
        stroke={stroke}
        strokeWidth="2.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
