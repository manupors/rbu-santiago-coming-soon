import { cn } from "@/lib/utils";

type Color = "blue" | "red" | "gray-dark" | "gray-light" | "white";

const colorMap: Record<Color, string> = {
  blue: "bg-primary",
  red: "bg-accent",
  "gray-dark": "bg-[color:var(--gray-dark)]",
  "gray-light": "bg-[color:var(--gray-light)]",
  white: "bg-white",
};

/**
 * Línea de conectividad RBU: línea horizontal con círculos en los extremos
 * (representa paradas de bus). Usar para separar secciones o subrayar títulos.
 */
export function ConnectivityLine({
  color = "blue",
  className,
}: {
  color?: Color;
  className?: string;
}) {
  const bg = colorMap[color];
  return (
    <div className={cn("flex items-center gap-1 w-full", className)} aria-hidden="true">
      <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", bg)} />
      <span className={cn("h-[2px] flex-1", bg)} />
      <span className={cn("h-2.5 w-2.5 rounded-full shrink-0", bg)} />
    </div>
  );
}
