export interface StatCard {
  label: string;
  value: string | number;
  note?: string;
  /** CSS colour for the card's accent bar, tint and number. */
  color?: string;
}

/** A row of headline numbers. Each card is one figure and one line of context. */
export function StatCards({ items }: { items: StatCard[] }) {
  return (
    <dl className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="border-border relative flex flex-col gap-1 overflow-hidden rounded-xl border p-4 pt-5"
          style={
            item.color
              ? {
                  borderColor: `color-mix(in oklab, ${item.color} 35%, transparent)`,
                  backgroundColor: `color-mix(in oklab, ${item.color} 8%, transparent)`,
                }
              : {
                  backgroundColor:
                    "color-mix(in oklab, var(--foreground) 3%, transparent)",
                }
          }
        >
          {item.color && (
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-1.5"
              style={{ background: item.color }}
            />
          )}
          <dt className="text-muted-foreground text-sm">{item.label}</dt>
          <dd
            className="numeral text-4xl leading-none font-extrabold"
            style={item.color ? { color: item.color } : undefined}
          >
            {item.value}
          </dd>
          {item.note && <p className="text-muted-foreground text-xs">{item.note}</p>}
        </div>
      ))}
    </dl>
  );
}
