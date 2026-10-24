import Link from "next/link";
import { ROADMAP_PAGES, roadmapHref } from "@/lib/roadmap/pages";
import type { RoadmapPage as Page, RoadmapSection } from "@/lib/roadmap/types";

const focus =
  "focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none";

function Section({ s }: { s: RoadmapSection }) {
  return (
    <section className="border-border flex flex-col gap-3 border-t pt-6">
      <h2 className="font-display text-xl font-semibold">{s.heading}</h2>
      <div className="text-muted-foreground [&_strong]:text-foreground flex max-w-prose flex-col gap-3 leading-relaxed">
        {s.paragraphs?.map((p) => (
          <p key={p}>{p}</p>
        ))}
        {s.steps && (
          <ol className="flex list-decimal flex-col gap-1.5 pl-5">
            {s.steps.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
        )}
        {s.bullets && (
          <ul className="flex list-disc flex-col gap-1.5 pl-5">
            {s.bullets.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        )}
      </div>

      {s.links && (
        <ul className="grid gap-2 sm:grid-cols-2">
          {s.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`border-border hover:bg-foreground/[0.06] flex h-full flex-col gap-0.5 rounded-lg border px-3 py-2 transition-colors ${focus}`}
              >
                <span className="text-foreground font-medium">{l.label}</span>
                {l.note && (
                  <span className="text-muted-foreground text-sm">{l.note}</span>
                )}
              </a>
            </li>
          ))}
        </ul>
      )}

      {s.table && (
        <div className="border-border overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-foreground/[0.05]">
              <tr>
                {s.table.head.map((h) => (
                  <th key={h} scope="col" className="px-3 py-2 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {s.table.rows.map((r) => (
                <tr key={r.join("|")}>
                  {r.map((c, i) => (
                    <td
                      key={i}
                      className={`px-3 py-2 align-top ${i === 0 ? "text-foreground font-medium whitespace-nowrap" : "text-muted-foreground"}`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {s.qa && (
        <dl className="flex max-w-prose flex-col gap-4">
          {s.qa.map((x) => (
            <div key={x.q}>
              <dt className="text-foreground font-medium">{x.q}</dt>
              <dd className="text-muted-foreground mt-1 leading-relaxed">{x.a}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}

/** One page of the learning roadmap, with a switcher between pages and a link to the next one. */
export function RoadmapPage({ page }: { page: Page }) {
  const i = ROADMAP_PAGES.findIndex((p) => p.slug === page.slug);
  const next = ROADMAP_PAGES[i + 1];

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-10 sm:py-14">
      <nav aria-label="Roadmap" className="mb-8">
        <ul className="flex [scrollbar-width:none] gap-1 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {ROADMAP_PAGES.map((p) => {
            const on = p.slug === page.slug;
            return (
              <li key={p.slug} className="shrink-0">
                <Link
                  href={roadmapHref(p.slug)}
                  aria-current={on ? "page" : undefined}
                  className={`rounded-full border px-3 py-1 text-sm font-medium transition-colors ${focus} ${
                    on
                      ? "border-foreground/30 bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.06] border-transparent"
                  }`}
                >
                  {p.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <header className="mb-8 flex flex-col gap-3">
        <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
          {page.title}
        </h1>
        <span aria-hidden="true" className="flex h-1.5 w-24 overflow-hidden rounded-full">
          <span className="flex-1" style={{ background: "var(--board-dsa)" }} />
          <span className="flex-1" style={{ background: "var(--board-contests)" }} />
          <span className="flex-1" style={{ background: "var(--board-github)" }} />
        </span>
        <p className="text-muted-foreground max-w-prose">{page.intro}</p>
      </header>

      <div className="flex flex-col gap-8">
        {page.sections.map((s) => (
          <Section key={s.heading} s={s} />
        ))}
      </div>

      {next && (
        <Link
          href={roadmapHref(next.slug)}
          className={`border-border hover:bg-foreground/[0.06] mt-10 flex flex-col gap-0.5 rounded-lg border px-4 py-3 transition-colors ${focus}`}
        >
          <span className="text-muted-foreground text-sm">Next</span>
          <span className="text-foreground font-medium">{next.title}</span>
        </Link>
      )}
    </main>
  );
}
