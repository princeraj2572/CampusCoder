import Link from "next/link";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

/** A plain, readable page for the privacy policy and terms. */
export function LegalPage({
  title,
  intro,
  updated,
  sections,
}: {
  title: string;
  intro: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <Link
        href="/"
        className="text-muted-foreground hover:text-foreground focus-visible:ring-ring rounded-sm text-sm underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
      >
        Back to CampusCoders
      </Link>
      <header className="mt-6 mb-8 flex flex-col gap-3">
        <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
          {title}
        </h1>
        <span aria-hidden="true" className="flex h-1.5 w-24 overflow-hidden rounded-full">
          <span className="flex-1" style={{ background: "var(--board-dsa)" }} />
          <span className="flex-1" style={{ background: "var(--board-contests)" }} />
          <span className="flex-1" style={{ background: "var(--board-github)" }} />
        </span>
        <p className="text-muted-foreground max-w-prose">{intro}</p>
        <p className="text-muted-foreground text-sm">Last updated {updated}</p>
      </header>

      <div className="flex flex-col gap-8">
        {sections.map((s) => (
          <section
            key={s.heading}
            className="border-border flex flex-col gap-3 border-t pt-6"
          >
            <h2 className="font-display text-xl font-semibold">{s.heading}</h2>
            <div className="text-muted-foreground [&_strong]:text-foreground flex max-w-prose flex-col gap-3 leading-relaxed [&_li]:ml-5 [&_li]:list-disc [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1.5">
              {s.body}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
