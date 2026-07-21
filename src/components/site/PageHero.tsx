import type { ReactNode } from "react";
import { BusWheel } from "@/components/brand/BusWheel";
import { ConnectivityLine } from "@/components/brand/ConnectivityLine";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-primary text-white">
      <BusWheel className="absolute -top-16 -right-24 opacity-30" size={380} />
      <BusWheel className="absolute -bottom-24 -left-24 opacity-20" size={260} color="red" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-white/80">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-4xl leading-tight sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-3xl text-base text-white/90 sm:text-lg">
            {description}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
        <ConnectivityLine color="white" className="mt-10 max-w-md opacity-70" />
      </div>
    </section>
  );
}
