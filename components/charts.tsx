"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { ActivityCalendar } from "react-activity-calendar";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { ActivityDay } from "@/lib/boards/heatmap";

const axis = { fontSize: 12, fill: "var(--muted-foreground)" };

function shortDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

/** A single line over time. Used for contest rating and for problems solved. */
export function TrendChart({
  points,
  label,
  color = "var(--foreground)",
}: {
  points: { date: string; value: number }[];
  label: string;
  color?: string;
}) {
  const min = Math.min(...points.map((p) => p.value));
  const max = Math.max(...points.map((p) => p.value));
  const pad = Math.max(10, Math.round((max - min) * 0.15));
  return (
    <figure className="m-0" aria-label={`${label} over time`}>
      <div className="h-48 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={points} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
            <CartesianGrid stroke="var(--border)" vertical={false} />
            <XAxis
              dataKey="date"
              tickFormatter={shortDate}
              tick={axis}
              stroke="var(--border)"
              minTickGap={24}
            />
            <YAxis
              domain={[min - pad, max + pad]}
              tick={axis}
              stroke="var(--border)"
              width={44}
              allowDecimals={false}
            />
            <Tooltip
              formatter={(value) => [value, label]}
              labelFormatter={(d) => shortDate(String(d))}
              contentStyle={{
                background: "var(--background)",
                border: "1px solid var(--border)",
                borderRadius: 6,
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2.5}
              dot={{ r: 3, fill: color }}
              activeDot={{ r: 5 }}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </figure>
  );
}

/** 12-month contribution heatmap. */
export function Heatmap({ data }: { data: ActivityDay[] }) {
  const { resolvedTheme } = useTheme();
  // The theme is unknown on the server, so draw the calendar only after mounting.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  if (data.length === 0) return null;
  if (!mounted) return <div className="h-[115px]" aria-hidden="true" />;
  return (
    <div
      className="overflow-x-auto"
      role="img"
      aria-label="Contributions over the last 12 months"
    >
      <ActivityCalendar
        data={data}
        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
        theme={{
          light: ["#e3e7ee", "#b7dfc7", "#74c795", "#2f9d5f", "#1a6b3f"],
          dark: ["#2a2a2a", "#245f3e", "#2f8a59", "#45b97a", "#7ae6ab"],
        }}
        blockSize={11}
        blockMargin={3}
        fontSize={12}
        showWeekdayLabels={["mon", "wed", "fri"]}
        labels={{
          totalCount: "{{count}} contributions in the last year",
        }}
      />
    </div>
  );
}
