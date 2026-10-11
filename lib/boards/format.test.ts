import { describe, expect, it } from "vitest";
import { describeUpdated } from "@/lib/boards/format";

const NOW = new Date("2026-10-07T12:00:00Z");
const ago = (minutes: number) => new Date(NOW.getTime() - minutes * 60_000);

describe("describeUpdated", () => {
  it("says nothing has been fetched when there is no date", () => {
    expect(describeUpdated(null, NOW)).toEqual({ text: "Not updated yet", stale: true });
  });
  it("describes recent updates in minutes, hours and days", () => {
    expect(describeUpdated(ago(0), NOW).text).toBe("Updated just now");
    expect(describeUpdated(ago(1), NOW).text).toBe("Updated 1 min ago");
    expect(describeUpdated(ago(25), NOW).text).toBe("Updated 25 min ago");
    expect(describeUpdated(ago(60), NOW).text).toBe("Updated 1 hour ago");
    expect(describeUpdated(ago(180), NOW).text).toBe("Updated 3 hours ago");
    expect(describeUpdated(ago(60 * 24), NOW).text).toBe("Updated 1 day ago");
    expect(describeUpdated(ago(60 * 24 * 3), NOW).text).toBe("Updated 3 days ago");
  });
  it("marks data older than two hours as stale", () => {
    expect(describeUpdated(ago(119), NOW).stale).toBe(false);
    expect(describeUpdated(ago(121), NOW).stale).toBe(true);
  });
  it("treats a date slightly in the future as just now", () => {
    expect(describeUpdated(ago(-3), NOW).text).toBe("Updated just now");
  });
});
