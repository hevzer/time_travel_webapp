type SectionTitleProps = {
  eyebrow: string;
  title: string;
  subtitle: string;
};

export function SectionTitle({ eyebrow, title, subtitle }: SectionTitleProps) {
  return (
    <div className="max-w-2xl">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-soft">{eyebrow}</p>
      <h2 className="mt-3 font-serif text-4xl leading-tight text-white md:text-5xl">{title}</h2>
      <p className="mt-4 text-base text-muted">{subtitle}</p>
    </div>
  );
}
