import { cn } from "@/lib/utils";

/**
 * Ícono decorativo "rueda de bus": fragmento de círculo azul estilizado.
 * Se usa como acento gráfico en esquinas y secciones destacadas.
 */
export function BusWheel({
  className,
  color = "white",
  size = 320,
}: {
  className?: string;
  color?: "white" | "blue" | "red";
  size?: number;
}) {
  const stroke =
    color === "white" ? "#FFFFFF" : color === "red" ? "#F42534" : "#0047BA";
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={cn("pointer-events-none", className)}
      aria-hidden="true"
    >
      <circle
        cx="100"
        cy="100"
        r="90"
        stroke={stroke}
        strokeWidth="18"
        fill="none"
        strokeDasharray="80 500"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle
        cx="100"
        cy="100"
        r="60"
        stroke={stroke}
        strokeWidth="14"
        fill="none"
        strokeDasharray="55 400"
        strokeLinecap="round"
        strokeDashoffset="60"
        opacity="0.55"
      />
      <circle
        cx="100"
        cy="100"
        r="30"
        stroke={stroke}
        strokeWidth="10"
        fill="none"
        strokeDasharray="30 200"
        strokeLinecap="round"
        strokeDashoffset="20"
        opacity="0.75"
      />
    </svg>
  );
}
