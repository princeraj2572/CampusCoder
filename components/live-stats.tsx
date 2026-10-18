import { StatCards, type StatCard } from "@/components/stat-cards";
import { getLandingSnapshot } from "@/lib/boards/landing";
import { BOARD_ACCENT } from "@/lib/boards/theme";
import { ratingTier } from "@/lib/scoring/tier";

/** Department-wide numbers, shown only once somebody is on the board. */
export async function LiveStats() {
  const { stats } = await getLandingSnapshot();
  if (stats.students === 0) return null;

  const tier = ratingTier(stats.topRating);
  const items: StatCard[] = [
    {
      label: "Students on the board",
      value: stats.students,
      note: "Registered and ranked",
      color: "var(--brand-codeforces)",
    },
    {
      label: "Problems solved",
      value: stats.solved.toLocaleString("en-IN"),
      note: "LeetCode, Codeforces and CodeChef",
      color: BOARD_ACCENT["problem-solving"],
    },
    {
      label: "GitHub contributions",
      value: stats.contributions.toLocaleString("en-IN"),
      note: "Over the last 12 months",
      color: BOARD_ACCENT.github,
    },
    {
      label: "Top contest rating",
      value: stats.topRating ?? "–",
      note: stats.topRating === null ? "No ratings yet" : `${tier.label} tier`,
      color: tier.key === "unrated" ? BOARD_ACCENT.contests : `var(--tier-${tier.key})`,
    },
  ];

  return (
    <section
      aria-label="Campus numbers"
      className="mx-auto w-full max-w-6xl px-4 pb-10 sm:pb-14"
    >
      <StatCards items={items} />
    </section>
  );
}
