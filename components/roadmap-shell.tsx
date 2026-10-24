import Link from "next/link";
import { ink } from "@/lib/boards/theme";
import { ROADMAP_GROUPS, ROADMAP_TABS, type RoadmapTab } from "@/lib/roadmap/pages";

export const focus =
  "focus-visible:ring-ring rounded-sm focus-visible:ring-2 focus-visible:outline-none";

/** The id a heading's section gets, so the index can link to it. */
export function anchor(heading: string): string {
  return heading
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The three-colour rule used under every page title. */
export function Rule({ colors }: { colors?: string[] }) {
  const c = colors ?? [
    "var(--board-dsa)",
    "var(--board-contests)",
    "var(--board-github)",
  ];
  return (
    <span aria-hidden="true" className="flex h-1.5 w-24 overflow-hidden rounded-full">
      {c.map((x, i) => (
        <span key={i} className="flex-1" style={{ background: x }} />
      ))}
    </span>
  );
}

/** One link in the page switcher, tinted with its group's colour when active. */
function TabLink({
  t,
  on,
  color,
  className,
  pill,
}: {
  t: RoadmapTab;
  on: boolean;
  color: string;
  className: string;
  pill?: boolean;
}) {
  return (
    <Link
      href={t.href}
      aria-current={on ? "page" : undefined}
      className={`${pill ? "inline-block rounded-full border text-sm font-medium transition-colors" : "text-sm"} ${
        on
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground"
      } ${pill && !on ? "border-transparent hover:bg-(--tab)" : ""} ${className} ${focus}`}
      style={
        {
          "--tab": `color-mix(in oklab, ${color} 12%, transparent)`,
          ...(on && pill
            ? {
                borderColor: `color-mix(in oklab, ${color} 55%, transparent)`,
                backgroundColor: `color-mix(in oklab, ${color} 16%, transparent)`,
              }
            : {}),
        } as React.CSSProperties
      }
    >
      {t.label}
    </Link>
  );
}

/**
 * The frame every roadmap page shares: the page switcher, a title block, a sticky
 * "on this page" index on wide screens, and the content beside it.
 */
export function RoadmapShell({
  active,
  title,
  intro,
  toc,
  accent,
  eyebrow,
  children,
}: {
  /** The href of the tab to highlight. */
  active: string;
  title: string;
  intro: string;
  toc: string[];
  accent?: string;
  eyebrow?: React.ReactNode;
  children: React.ReactNode;
}) {
  const current = ROADMAP_TABS.find((t) => t.href === active);
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:py-12">
      <nav aria-label="Roadmap" className="mb-8">
        <details className="border-border rounded-lg border px-3 py-2 md:hidden">
          <summary className={`cursor-pointer text-sm font-semibold ${focus}`}>
            Roadmap menu: {current?.label}
          </summary>
          <div className="mt-2 flex flex-col gap-3">
            {ROADMAP_GROUPS.map((g) => (
              <div key={g.label}>
                <p
                  className="mb-1 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase"
                  style={{ color: ink(g.color) }}
                >
                  <span
                    aria-hidden="true"
                    className="size-2 rounded-full"
                    style={{ background: g.color }}
                  />
                  {g.label}
                </p>
                <ul className="flex flex-col">
                  {g.tabs.map((t) => (
                    <li key={t.href}>
                      <TabLink
                        t={t}
                        on={t.href === active}
                        color={g.color}
                        className="block py-1.5"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>

        <div className="border-border hidden flex-wrap gap-x-10 gap-y-4 border-b pb-5 md:flex">
          {ROADMAP_GROUPS.map((g) => (
            <div key={g.label}>
              <p
                className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase"
                style={{ color: ink(g.color) }}
              >
                <span
                  aria-hidden="true"
                  className="size-2 rounded-full"
                  style={{ background: g.color }}
                />
                {g.label}
              </p>
              <ul className="-ml-3 flex flex-wrap gap-1">
                {g.tabs.map((t) => (
                  <li key={t.href}>
                    <TabLink
                      t={t}
                      on={t.href === active}
                      color={g.color}
                      className="px-3 py-1"
                      pill
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <header className="mb-10 flex flex-col gap-3">
        {eyebrow}
        <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <Rule colors={accent ? [accent, accent, accent] : undefined} />
        <p className="text-muted-foreground max-w-3xl text-lg">{intro}</p>
      </header>

      <details className="border-border mb-8 rounded-lg border px-3 py-2 lg:hidden">
        <summary className={`cursor-pointer text-sm font-semibold ${focus}`}>
          On this page
        </summary>
        <ul className="mt-2 flex flex-col">
          {toc.map((h) => (
            <li key={h}>
              <a
                href={`#${anchor(h)}`}
                className={`text-muted-foreground hover:text-foreground block py-1.5 text-sm ${focus}`}
              >
                {h}
              </a>
            </li>
          ))}
        </ul>
      </details>

      <div className="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-20">
            <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
              On this page
            </p>
            <ul className="border-border flex flex-col gap-0.5 border-l">
              {toc.map((h) => (
                <li key={h}>
                  <a
                    href={`#${anchor(h)}`}
                    className={`text-muted-foreground hover:text-foreground -ml-px block border-l border-transparent py-1 pl-3 text-sm hover:border-current ${focus}`}
                  >
                    {h}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="flex min-w-0 flex-col gap-12">{children}</div>
      </div>
    </main>
  );
}

/** A titled block that the index can jump to. */
export function Block({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={anchor(title)} className="flex scroll-mt-24 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        {note && <p className="text-muted-foreground max-w-3xl">{note}</p>}
      </div>
      {children}
    </section>
  );
}
