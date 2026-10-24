import Link from "next/link";
import { Block, RoadmapShell, focus } from "@/components/roadmap-shell";
import { ROADMAP_TABS, roadmapHref } from "@/lib/roadmap/pages";
import type { RoadmapPage as Page, RoadmapSection } from "@/lib/roadmap/types";

function Body({ s }: { s: RoadmapSection }) {
  return (
    <div className="flex flex-col gap-4">
      {(s.paragraphs || s.steps || s.bullets) && (
        <div className="text-muted-foreground flex max-w-3xl flex-col gap-3 leading-relaxed">
          {s.paragraphs?.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {s.steps && (
            <ol className="flex flex-col gap-2">
              {s.steps.map((x, i) => (
                <li key={x} className="flex gap-3">
                  <span
                    aria-hidden="true"
                    className="bg-foreground/10 text-foreground mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-xs font-bold"
                  >
                    {i + 1}
                  </span>
                  <span>{x}</span>
                </li>
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
      )}

      {s.links && (
        <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {s.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`border-border hover:bg-foreground/[0.06] flex h-full flex-col gap-0.5 rounded-lg border px-3 py-2.5 transition-colors ${focus}`}
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
                      className={`px-3 py-2.5 align-top ${i === 0 ? "text-foreground font-medium whitespace-nowrap" : "text-muted-foreground"}`}
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
        <dl className="grid gap-3 md:grid-cols-2">
          {s.qa.map((x) => (
            <div key={x.q} className="border-border rounded-lg border p-4">
              <dt className="text-foreground font-medium">{x.q}</dt>
              <dd className="text-muted-foreground mt-1.5 leading-relaxed">{x.a}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

/** One topic page of the learning roadmap, with a link to the next page at the end. */
export function RoadmapPage({ page }: { page: Page }) {
  const href = roadmapHref(page.slug);
  const i = ROADMAP_TABS.findIndex((t) => t.href === href);
  const next = ROADMAP_TABS[i + 1];

  return (
    <RoadmapShell
      active={href}
      title={page.title}
      intro={page.intro}
      toc={page.sections.map((s) => s.heading)}
    >
      {page.sections.map((s) => (
        <Block key={s.heading} title={s.heading}>
          <Body s={s} />
        </Block>
      ))}

      {next && (
        <Link
          href={next.href}
          className={`border-border hover:bg-foreground/[0.06] flex flex-col gap-0.5 rounded-lg border px-4 py-3 transition-colors ${focus}`}
        >
          <span className="text-muted-foreground text-sm">Next</span>
          <span className="text-foreground font-medium">{next.title}</span>
        </Link>
      )}
    </RoadmapShell>
  );
}
