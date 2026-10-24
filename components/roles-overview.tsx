import Link from "next/link";
import { Block, RoadmapShell, focus } from "@/components/roadmap-shell";
import { ROLES } from "@/lib/roadmap/roles";
import { ink } from "@/lib/boards/theme";

const CHOOSE: { like: string; roles: string }[] = [
  { like: "Logic, data and making systems reliable", roles: "Backend, Data" },
  { like: "How things look and feel; quick visual feedback", roles: "Frontend, Mobile" },
  { like: "Seeing a whole feature finished by yourself", roles: "Full-stack" },
  { like: "Maths, experiments and measuring results", roles: "AI / ML, Data" },
  { like: "Automating work and keeping systems running", roles: "DevOps / cloud" },
  { like: "Finding how things break, within the rules", roles: "Security, QA" },
  { like: "Electronics and making hardware do things", roles: "Embedded / IoT" },
  { like: "Games, maths and real-time graphics", roles: "Game developer" },
];

const RULES = [
  "Every role needs DSA, SQL and Git. Learn those first and the role choice can wait until the second year.",
  "Choose one role for six months before judging it. Switching weekly means you never get past the beginner stage.",
  "Build before you read more. Each role page lists three projects for exactly this reason.",
  "Roles overlap. A backend developer who understands the frontend, or a data engineer who knows DevOps, is worth more than either alone.",
  "You can change later. Most senior engineers have worked in two or three of these areas.",
];

/** The overview of every role: how to choose, a card for each, and a side-by-side table. */
export function RolesOverview() {
  return (
    <RoadmapShell
      active="/roadmap/roles"
      title="Roles and jobs"
      intro="Pick a direction, see what the job is, what to study, what to build and what a senior would tell you. Every role page follows the same layout so you can compare them."
      toc={["How to choose", "The roles", "Side by side", "Rules for any role"]}
    >
      <Block
        title="How to choose"
        note="You do not need to be sure. Read what you enjoy, and start with the closest match."
      >
        <div className="border-border overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-foreground/[0.05]">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold">
                  If you enjoy
                </th>
                <th scope="col" className="px-3 py-2 font-semibold">
                  Look at
                </th>
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {CHOOSE.map((c) => (
                <tr key={c.like}>
                  <td className="text-foreground px-3 py-2.5 font-medium">{c.like}</td>
                  <td className="text-muted-foreground px-3 py-2.5">{c.roles}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="The roles">
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {ROLES.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/roadmap/roles/${r.slug}`}
                className={`border-border hover:bg-foreground/[0.04] flex h-full flex-col overflow-hidden rounded-xl border transition-colors ${focus}`}
              >
                <span
                  aria-hidden="true"
                  className="h-1.5"
                  style={{ background: r.color }}
                />
                <span className="flex flex-1 flex-col gap-3 p-4">
                  <span className="font-display text-xl font-semibold">{r.name}</span>
                  <span className="text-muted-foreground">{r.tagline}</span>
                  <span className="text-muted-foreground mt-auto border-t pt-3 text-sm">
                    <span className="text-foreground font-medium">Good if: </span>
                    {r.suits}
                  </span>
                  <span className="text-sm font-medium" style={{ color: ink(r.color) }}>
                    See the roadmap
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Side by side">
        <div className="border-border overflow-x-auto rounded-lg border">
          <table className="w-full text-left text-sm">
            <thead className="bg-foreground/[0.05]">
              <tr>
                {["Role", "Main tools", "First project"].map((h) => (
                  <th key={h} scope="col" className="px-3 py-2 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-border divide-y">
              {ROLES.map((r) => (
                <tr key={r.slug}>
                  <td className="px-3 py-2.5 align-top font-medium whitespace-nowrap">
                    <Link
                      href={`/roadmap/roles/${r.slug}`}
                      className={`inline-flex items-center gap-2 underline-offset-4 hover:underline ${focus}`}
                    >
                      <span
                        aria-hidden="true"
                        className="size-2.5 rounded-full"
                        style={{ background: r.color }}
                      />
                      {r.name}
                    </Link>
                  </td>
                  <td className="text-muted-foreground px-3 py-2.5 align-top">
                    {r.stack}
                  </td>
                  <td className="text-muted-foreground px-3 py-2.5 align-top">
                    {r.projects[0].name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Block>

      <Block title="Rules for any role">
        <ul className="text-muted-foreground flex max-w-3xl list-disc flex-col gap-2 pl-5 leading-relaxed">
          {RULES.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </Block>
    </RoadmapShell>
  );
}
