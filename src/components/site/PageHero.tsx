import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[color:var(--primary-dark)] text-white">
      {/* Textura sutil con líneas diagonales */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, #ffffff 0 1px, transparent 1px 22px)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8">
        {eyebrow && (
          <p className="eyebrow text-white/80">
            <span className="text-accent">—</span>&nbsp;&nbsp;{eyebrow}
          </p>
        )}
        <RedArrow className="mt-6 h-3 w-24" />
        <h1 className="headline-xl mt-6 max-w-5xl text-4xl sm:text-6xl md:text-7xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-10">{children}</div>}
      </div>
    </section>
  );
}
