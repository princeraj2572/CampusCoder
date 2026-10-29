import Link from "next/link";
import { RoadmapProgress, RoadmapSteps } from "@/components/roadmap-steps";
import { Block, RoadmapShell, focus } from "@/components/roadmap-shell";
import { ink } from "@/lib/boards/theme";
import { ROADMAP_GROUPS, ROADMAP_TABS, roadmapHref } from "@/lib/roadmap/pages";
import type { RoadmapPage as Page, RoadmapSection } from "@/lib/roadmap/types";

function Body({ s, slug, color }: { s: RoadmapSection; slug: string; color: string }) {
  return (
    <div className="flex flex-col gap-4">
      {(s.paragraphs || s.steps || s.bullets) && (
        <div className="text-muted-foreground flex max-w-3xl flex-col gap-3 leading-relaxed">
          {s.paragraphs?.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {s.steps && (
            <RoadmapSteps id={`${slug}/${s.heading}`} steps={s.steps} color={color} />
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
        <ul className="divide-border border-border divide-y border-y">
          {s.links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`hover:bg-foreground/[0.05] flex flex-col gap-0.5 px-1 py-2.5 transition-colors sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${focus}`}
              >
                <span className="text-foreground font-medium">{l.label}</span>
                {l.note && (
                  <span className="text-muted-foreground text-sm sm:text-right">
                    {l.note}
                  </span>
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
                      className={`px-3 py-2.5 align-top ${i === 0 ? `text-foreground font-medium ${c.length <= 32 ? "whitespace-nowrap" : ""}` : "text-muted-foreground"}`}
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
        <dl className="grid gap-x-10 md:grid-cols-2">
          {s.qa.map((x) => (
            <div key={x.q} className="border-border border-t py-3">
              <dt className="text-foreground font-medium">{x.q}</dt>
              <dd className="text-muted-foreground mt-1.5 leading-relaxed">{x.a}</dd>
            </div>
          ))}
        </dl>
      )}
    </div>
  );
}

const ALL_TOPICS = "All topics";

/** One topic page of the learning roadmap, with a link to the next page at the end. */
export function RoadmapPage({ page }: { page: Page }) {
  const href = roadmapHref(page.slug);
  const i = ROADMAP_TABS.findIndex((t) => t.href === href);
  const prev = ROADMAP_TABS[i - 1];
  const next = ROADMAP_TABS[i + 1];
  const color =
    ROADMAP_GROUPS.find((g) => g.tabs.some((t) => t.href === href))?.color ??
    "var(--board-dsa)";
  const totalSteps = page.sections.reduce((n, s) => n + (s.steps?.length ?? 0), 0);

  return (
    <RoadmapShell
      active={href}
      title={page.title}
      intro={page.intro}
      progress={
        totalSteps > 0 ? (
          <RoadmapProgress slug={page.slug} total={totalSteps} color={color} />
        ) : undefined
      }
      toc={[
        ...(page.slug === "" ? [ALL_TOPICS] : []),
        ...page.sections.map((s) => s.heading),
      ]}
    >
      {page.slug === "" && (
        <Block title={ALL_TOPICS} note="Pick a topic, or follow the pages in order.">
          <div className="flex flex-col gap-6">
            {ROADMAP_GROUPS.filter((g) => g.label !== "Start").map((g) => (
              <div key={g.label} className="flex flex-col gap-2">
                <h3
                  className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
                  style={{ color: ink(g.color) }}
                >
                  <span
                    aria-hidden="true"
                    className="size-2.5 rounded-full"
                    style={{ background: g.color }}
                  />
                  {g.label}
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
                  {g.tabs.map((t) => (
                    <li key={t.href}>
                      <Link
                        href={t.href}
                        className={`hover:bg-foreground/[0.05] flex h-full flex-col gap-0.5 border-l-4 py-1.5 pr-2 pl-3 transition-colors ${focus}`}
                        style={{ borderLeftColor: g.color }}
                      >
                        <span className="text-foreground font-medium">{t.label}</span>
                        <span className="text-muted-foreground text-sm">{t.blurb}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Block>
      )}

      {page.sections.map((s) => (
        <Block key={s.heading} title={s.heading}>
          <Body s={s} slug={page.slug} color={color} />
        </Block>
      ))}

      <nav aria-label="Previous and next page" className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.href}
            className={`border-border hover:bg-foreground/[0.06] lift flex flex-col gap-0.5 rounded-lg border px-4 py-3 transition-colors ${focus}`}
          >
            <span className="text-muted-foreground text-sm">Previous</span>
            <span className="text-foreground font-medium">{prev.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={next.href}
            className={`border-border hover:bg-foreground/[0.06] lift flex flex-col gap-0.5 rounded-lg border px-4 py-3 transition-colors sm:text-right ${focus}`}
          >
            <span className="text-muted-foreground text-sm">Next</span>
            <span className="text-foreground font-medium">{next.title}</span>
          </Link>
        )}
      </nav>
    </RoadmapShell>
  );
}
