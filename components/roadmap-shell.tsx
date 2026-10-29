import Link from "next/link";
import { BackToTop } from "@/components/back-to-top";
import { RoadmapToc } from "@/components/roadmap-toc";
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

type LinkStyle = "pill" | "side" | "list";

/** One link in the page switcher, tinted with its group's colour when active. */
function TabLink({
  t,
  on,
  color,
  look,
}: {
  t: RoadmapTab;
  on: boolean;
  color: string;
  look: LinkStyle;
}) {
  const shape = {
    pill: "inline-block rounded-full border px-3 py-1 text-sm font-medium",
    side: "block rounded-md border-l-2 py-1.5 pr-2 pl-3 text-sm",
    list: "block py-1.5 text-sm",
  }[look];
  const tinted = look !== "list";
  return (
    <Link
      href={t.href}
      aria-current={on ? "page" : undefined}
      className={`${shape} transition-colors ${
        on
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground"
      } ${tinted && !on ? "border-transparent hover:bg-(--tab)" : ""} ${focus}`}
      style={
        {
          "--tab": `color-mix(in oklab, ${color} 12%, transparent)`,
          ...(on && tinted
            ? {
                borderColor:
                  look === "pill"
                    ? `color-mix(in oklab, ${color} 55%, transparent)`
                    : color,
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

function GroupHeading({ label, color }: { label: string; color: string }) {
  return (
    <p
      className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase"
      style={{ color: ink(color) }}
    >
      <span
        aria-hidden="true"
        className="size-2 rounded-full"
        style={{ background: color }}
      />
      {label}
    </p>
  );
}

/**
 * The frame every roadmap page shares. On wide screens the page switcher is a sticky
 * sidebar on the left and the "on this page" index a sticky column on the right. On
 * smaller screens the switcher sits above the title, and the index collapses.
 */
export function RoadmapShell({
  active,
  title,
  intro,
  toc,
  accent,
  eyebrow,
  progress,
  children,
}: {
  /** The href of the tab to highlight. */
  active: string;
  title: string;
  intro: string;
  toc: string[];
  accent?: string;
  eyebrow?: React.ReactNode;
  /** A progress meter shown under the intro. */
  progress?: React.ReactNode;
  children: React.ReactNode;
}) {
  const current = ROADMAP_TABS.find((t) => t.href === active);
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:py-12 2xl:max-w-[90rem]">
      <nav aria-label="Roadmap" className="mb-8 lg:hidden">
        <details className="border-border rounded-lg border px-3 py-2 md:hidden">
          <summary className={`cursor-pointer text-sm font-semibold ${focus}`}>
            Roadmap menu: {current?.label}
          </summary>
          <div className="mt-2 flex flex-col gap-3">
            {ROADMAP_GROUPS.map((g) => (
              <div key={g.label}>
                <GroupHeading label={g.label} color={g.color} />
                <ul className="flex flex-col">
                  {g.tabs.map((t) => (
                    <li key={t.href}>
                      <TabLink t={t} on={t.href === active} color={g.color} look="list" />
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
              <GroupHeading label={g.label} color={g.color} />
              <ul className="-ml-3 flex flex-wrap gap-1">
                {g.tabs.map((t) => (
                  <li key={t.href}>
                    <TabLink t={t} on={t.href === active} color={g.color} look="pill" />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>

      <div className="grid gap-10 lg:grid-cols-[13rem_minmax(0,1fr)] xl:grid-cols-[13rem_minmax(0,1fr)_13rem]">
        <aside className="hidden lg:block">
          <nav
            aria-label="Roadmap"
            className="sticky top-20 flex max-h-[calc(100vh-6rem)] flex-col gap-5 overflow-y-auto pr-1"
          >
            {ROADMAP_GROUPS.map((g) => (
              <div key={g.label}>
                <GroupHeading label={g.label} color={g.color} />
                <ul className="flex flex-col gap-0.5">
                  {g.tabs.map((t) => (
                    <li key={t.href}>
                      <TabLink t={t} on={t.href === active} color={g.color} look="side" />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <header className="mb-10 flex flex-col gap-3">
            {eyebrow}
            <h1 className="numeral text-5xl leading-none font-extrabold sm:text-6xl">
              {title}
            </h1>
            <Rule colors={accent ? [accent, accent, accent] : undefined} />
            <p className="text-muted-foreground max-w-3xl text-lg">{intro}</p>
            {progress}
          </header>

          <details className="border-border mb-8 rounded-lg border px-3 py-2 xl:hidden">
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

          <div
            className="flex flex-col gap-12"
            style={accent ? ({ "--role": accent } as React.CSSProperties) : undefined}
          >
            {children}
          </div>
        </div>

        <aside className="hidden xl:block">
          <nav aria-label="On this page" className="sticky top-20">
            <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-wider uppercase">
              On this page
            </p>
            <RoadmapToc
              items={toc.map((h) => ({ id: anchor(h), label: h }))}
              focus={focus}
            />
          </nav>
        </aside>
      </div>
      <BackToTop />
    </main>
  );
}

/** A titled block that the index can jump to. */
export function Block({
  title,
  note,
  accent,
  children,
}: {
  title: string;
  note?: string;
  /** Colours a bar beside the heading. */
  accent?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={anchor(title)} className="reveal flex scroll-mt-24 flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2
          className={`font-display text-2xl font-semibold ${accent ? "border-l-4 pl-3" : ""}`}
          style={accent ? { borderColor: accent } : undefined}
        >
          {title}
        </h2>
        {note && <p className="text-muted-foreground max-w-3xl">{note}</p>}
      </div>
      {children}
    </section>
  );
}
