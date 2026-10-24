import Link from "next/link";
import { Block, RoadmapShell, focus } from "@/components/roadmap-shell";
import { ink } from "@/lib/boards/theme";
import { ROLES, type Role } from "@/lib/roadmap/roles";

const LEVEL_COLOR: Record<Role["projects"][number]["level"], string> = {
  Starter: "var(--tier-green)",
  Intermediate: "var(--tier-orange)",
  Advanced: "var(--tier-red)",
};

const card = "border-border rounded-xl border p-4";

function Tint({ color, children }: { color: string; children: React.ReactNode }) {
  return (
    <span
      className="rounded-full border px-2.5 py-0.5 text-xs font-semibold"
      style={{
        color: ink(color),
        borderColor: `color-mix(in oklab, ${color} 50%, transparent)`,
        backgroundColor: `color-mix(in oklab, ${color} 12%, transparent)`,
      }}
    >
      {children}
    </span>
  );
}

function List({ items, mark, color }: { items: string[]; mark: string; color: string }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((x) => (
        <li key={x} className="text-muted-foreground flex gap-2.5 leading-relaxed">
          <span aria-hidden="true" className="mt-px shrink-0 font-bold" style={{ color }}>
            {mark}
          </span>
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

/** A full roadmap for one job: the role, a staged plan, projects, a senior's advice and where it leads. */
export function RoleDetail({ role }: { role: Role }) {
  const i = ROLES.findIndex((r) => r.slug === role.slug);
  const prev = ROLES[i - 1];
  const next = ROLES[i + 1];
  const c = role.color;

  return (
    <RoadmapShell
      active="/roadmap/roles"
      title={role.name}
      intro={role.tagline}
      accent={c}
      eyebrow={
        <Link
          href="/roadmap/roles"
          className={`text-muted-foreground hover:text-foreground w-fit text-sm underline underline-offset-4 ${focus}`}
        >
          All roles
        </Link>
      }
      toc={[
        "The job",
        "Where you will work",
        "Study plan",
        "What to build",
        "Tools",
        "A week of study",
        "A senior's advice",
        "Mistakes and questions",
        "Myths and reality",
        "First 90 days",
        "Career ladder",
        "Interview preparation",
        "Resources",
      ]}
    >
      <Block title="The job">
        <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
          {role.job}
        </p>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={card}>
            <h3 className="font-display mb-3 font-semibold">A day in the job</h3>
            <List items={role.daily} mark="•" color={c} />
          </div>
          <div className={`${card} flex flex-col gap-4`}>
            <div>
              <h3 className="font-display mb-1.5 font-semibold">Good if</h3>
              <p className="text-muted-foreground leading-relaxed">{role.suits}</p>
            </div>
            <div>
              <h3 className="font-display mb-1.5 font-semibold">Main tools</h3>
              <p className="text-muted-foreground leading-relaxed">{role.stack}</p>
            </div>
          </div>
        </div>
      </Block>

      <Block
        title="Where you will work"
        note="The kinds of employer that hire for this role."
      >
        <ul className="grid gap-3 sm:grid-cols-2">
          {role.where.map((w) => (
            <li key={w.type} className={card}>
              <h3 className="font-display font-semibold">{w.type}</h3>
              <p className="text-muted-foreground mt-1 leading-relaxed">{w.what}</p>
            </li>
          ))}
        </ul>
      </Block>

      <Block
        title="Study plan"
        note="Move through the stages in order. Do not start the next stage until you have built the project in the current one."
      >
        <ol className="flex flex-col">
          {role.stages.map((s, n) => (
            <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0">
              {n < role.stages.length - 1 && (
                <span
                  aria-hidden="true"
                  className="bg-border absolute top-10 bottom-0 left-[1.1rem] w-px"
                />
              )}
              <span
                aria-hidden="true"
                className="flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                style={{ background: c, color: "var(--on-board)" }}
              >
                {n + 1}
              </span>
              <div className={`${card} min-w-0 flex-1`}>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                  <Tint color={c}>{s.time}</Tint>
                </div>
                <h4 className="text-muted-foreground mb-1.5 text-xs font-semibold tracking-wider uppercase">
                  Study
                </h4>
                <ul className="grid gap-x-6 gap-y-1.5 md:grid-cols-2">
                  {s.study.map((x) => (
                    <li
                      key={x}
                      className="text-muted-foreground flex gap-2.5 leading-relaxed"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-px shrink-0 font-bold"
                        style={{ color: c }}
                      >
                        ✓
                      </span>
                      <span>{x}</span>
                    </li>
                  ))}
                </ul>
                <p
                  className="mt-4 rounded-lg border-l-4 px-3 py-2"
                  style={{
                    borderColor: c,
                    background: `color-mix(in oklab, ${c} 10%, transparent)`,
                  }}
                >
                  <span className="text-foreground font-semibold">Build: </span>
                  <span className="text-muted-foreground">{s.build}</span>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </Block>

      <Block
        title="What to build"
        note="Three projects, in order. Together they show a reviewer how you have grown."
      >
        <ul className="grid gap-4 lg:grid-cols-3">
          {role.projects.map((p) => (
            <li key={p.name} className={`${card} flex flex-col gap-3`}>
              <div>
                <Tint color={LEVEL_COLOR[p.level]}>{p.level}</Tint>
              </div>
              <h3 className="font-display text-lg font-semibold">{p.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{p.what}</p>
              <p className="mt-auto border-t pt-3 text-sm">
                <span className="text-foreground font-semibold">Shows: </span>
                <span className="text-muted-foreground">{p.proves}</span>
              </p>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Tools" note="Install these early and get comfortable with them.">
        <ul className="flex flex-wrap gap-2">
          {role.tools.map((t) => (
            <li
              key={t}
              className="border-border text-muted-foreground rounded-lg border px-3 py-1.5 text-sm"
            >
              {t}
            </li>
          ))}
        </ul>
      </Block>

      <Block
        title="A week of study"
        note="About 6–7 hours alongside college. Adjust the hours, but keep the rhythm."
      >
        <div className="border-border overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <tbody className="divide-border divide-y">
              {role.week.map((w) => (
                <tr key={w.when}>
                  <th
                    scope="row"
                    className="w-32 px-3 py-2.5 align-top font-semibold whitespace-nowrap"
                  >
                    {w.when}
                  </th>
                  <td className="text-muted-foreground px-3 py-2.5">{w.what}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block
        title="A senior's advice"
        note="What an experienced engineer would tell a junior on day one."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={card}>
            <h3
              className="font-display mb-3 font-semibold"
              style={{ color: ink("var(--tier-green)") }}
            >
              Do
            </h3>
            <List items={role.senior.do} mark="✓" color="var(--tier-green)" />
          </div>
          <div className={card}>
            <h3
              className="font-display mb-3 font-semibold"
              style={{ color: ink("var(--tier-red)") }}
            >
              Avoid
            </h3>
            <List items={role.senior.avoid} mark="✕" color="var(--tier-red)" />
          </div>
        </div>
      </Block>

      <Block title="Mistakes and questions">
        <div className="grid gap-4 lg:grid-cols-2">
          <div className={card}>
            <h3 className="font-display mb-3 font-semibold">Mistakes juniors make</h3>
            <List items={role.mistakes} mark="•" color={c} />
          </div>
          <div className={card}>
            <h3 className="font-display mb-3 font-semibold">Questions to ask a senior</h3>
            <List items={role.ask} mark="?" color={c} />
          </div>
        </div>
      </Block>

      <Block
        title="Myths and reality"
        note="Things students often believe about this job."
      >
        <ul className="grid gap-4 lg:grid-cols-3">
          {role.myths.map((m) => (
            <li key={m.myth} className={`${card} flex flex-col gap-3`}>
              <p>
                <span className="font-semibold" style={{ color: ink("var(--tier-red)") }}>
                  Myth:{" "}
                </span>
                <span className="text-foreground">{m.myth}</span>
              </p>
              <p>
                <span
                  className="font-semibold"
                  style={{ color: ink("var(--tier-green)") }}
                >
                  Reality:{" "}
                </span>
                <span className="text-muted-foreground leading-relaxed">{m.truth}</span>
              </p>
            </li>
          ))}
        </ul>
      </Block>

      <Block
        title="First 90 days"
        note="What to aim for in your first internship or job."
      >
        <ol className="grid gap-4 lg:grid-cols-3">
          {role.first90.map((d) => (
            <li key={d.days} className={card}>
              <Tint color={c}>{d.days}</Tint>
              <p className="text-muted-foreground mt-3 leading-relaxed">{d.goal}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block
        title="Career ladder"
        note="Where the road leads, so you know what you are building towards."
      >
        <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {role.ladder.map((l, n) => (
            <li key={l.level} className={`${card} flex flex-col gap-2`}>
              <span
                aria-hidden="true"
                className="h-1 rounded-full"
                style={{ background: c, width: `${(n + 1) * 25}%` }}
              />
              <h3 className="font-display font-semibold">{l.level}</h3>
              <p className="text-muted-foreground leading-relaxed">{l.focus}</p>
            </li>
          ))}
        </ol>
      </Block>

      <Block title="Interview preparation">
        <div className={card}>
          <List items={role.interview} mark="→" color={c} />
        </div>
      </Block>

      <Block title="Resources">
        <ul className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {role.links.map((l) => (
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
      </Block>

      <nav aria-label="Other roles" className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={`/roadmap/roles/${prev.slug}`}
            className={`border-border hover:bg-foreground/[0.06] flex flex-col gap-0.5 rounded-lg border px-4 py-3 transition-colors ${focus}`}
          >
            <span className="text-muted-foreground text-sm">Previous role</span>
            <span className="text-foreground font-medium">{prev.name}</span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/roadmap/roles/${next.slug}`}
            className={`border-border hover:bg-foreground/[0.06] flex flex-col gap-0.5 rounded-lg border px-4 py-3 transition-colors sm:text-right ${focus}`}
          >
            <span className="text-muted-foreground text-sm">Next role</span>
            <span className="text-foreground font-medium">{next.name}</span>
          </Link>
        )}
      </nav>
    </RoadmapShell>
  );
}
