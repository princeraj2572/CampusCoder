export interface StatCard {
  label: string;
  value: string | number;
  note?: string;
}

/** A row of headline numbers. Each card is one figure and one line of context. */
export function StatCards({ items }: { items: StatCard[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="border-border bg-foreground/[0.03] flex flex-col gap-1 rounded-xl border p-4"
        >
          <dt className="text-muted-foreground text-sm">{item.label}</dt>
          <dd className="numeral text-4xl leading-none font-extrabold">{item.value}</dd>
          {item.note && <p className="text-muted-foreground text-xs">{item.note}</p>}
        </div>
      ))}
    </dl>
  );
}
