import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-surface border-b border-border">
      <div className="container-page relative pt-16 pb-12 sm:pt-24 sm:pb-20 lg:pt-32 lg:pb-28 text-center">

        {eyebrow && <span className="eyebrow justify-center">{eyebrow}</span>}
        <h1 className="heading-xl mt-4 sm:mt-5 max-w-4xl mx-auto">{title}</h1>
        {description && (
          <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}
        {children && <div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-3">{children}</div>}
      </div>
    </section>
  );
}
