import { describe, expect, it } from "vitest";
import {
  buildWeeklyMatrix,
  classifyCalendarSummary,
  computeActiveTiming,
  extractDaySchedule,
  formatIntervalsText,
  getLocalDateAndSlot,
  parseSlotString,
  slotsFromIntervals,
  summarizeSlotHours,
} from "../src/schedule-parser";
import { HassEntity } from "../src/types";

function makeEntity(
  entityId: string,
  state: string,
  attrs: Record<string, unknown> = {},
): HassEntity {
  return {
    entity_id: entityId,
    state,
    attributes: attrs,
  };
}

describe("parseSlotString and interval helpers", () => {
  it("parses valid 48-slot strings and rejects invalid lengths or symbols", () => {
    const valid = "0".repeat(5) + "1".repeat(19) + "?".repeat(4) + "1".repeat(20);
    const parsed = parseSlotString(valid);
    expect(parsed).toHaveLength(48);
    if (!parsed) throw new Error("Expected parsed slots");
    expect(parsed.slice(0, 5)).toEqual(["0", "0", "0", "0", "0"]);
    expect(summarizeSlotHours(parsed)).toEqual({ outageHours: 2.5, possibleHours: 2.0 });
    expect(formatIntervalsText(parsed)).toBe("00:00-02:30");

    expect(parseSlotString("101")).toBeNull();
    expect(parseSlotString("x".repeat(48))).toBeNull();
    expect(parseSlotString(null)).toBeNull();
  });

  it("reconstructs 48 slots from attributes.outages fallback", () => {
    const slots = slotsFromIntervals(
      [
        {
          start: "2026-11-16T12:00:00+02:00",
          end: "2026-11-16T14:30:00+02:00",
          kind: "outage",
        },
        {
          start: "2026-11-16T18:00:00+02:00",
          end: "2026-11-16T19:00:00+02:00",
          kind: "possible",
        },
      ],
      "2026-11-16",
      "Europe/Kyiv",
    );
    expect(slots).not.toBeNull();
    if (!slots) throw new Error("Expected interval slots");
    expect(formatIntervalsText(slots, "0")).toBe("12:00-14:30");
    expect(formatIntervalsText(slots, "?")).toBe("18:00-19:00");
  });

  it("handles Europe/Kyiv spring DST transition accurately", () => {
    const dt = new Date("2026-03-29T00:00:00Z"); // 02:00 local (UTC+2)
    const beforeJump = getLocalDateAndSlot(dt, "Europe/Kyiv");
    expect(beforeJump.dateIso).toBe("2026-03-29");
    expect(beforeJump.slotIndex).toBe(4);

    const afterJump = getLocalDateAndSlot(new Date("2026-03-29T01:00:00Z"), "Europe/Kyiv"); // 04:00 local (UTC+3)
    expect(afterJump.slotIndex).toBe(8);
  });
});

describe("extractDaySchedule and computeActiveTiming", () => {
  it("handles unpublished tomorrow and fallback cross-midnight active outage", () => {
    const todaySlots = "1".repeat(44) + "0".repeat(4); // 22:00-24:00 Kyiv (20:00-22:00 UTC)
    const tomorrowSlots = "0".repeat(4) + "1".repeat(44); // 00:00-02:00 Kyiv (22:00-00:00 UTC)

    const today = extractDaySchedule(
      makeEntity("sensor.home_outages_today", "2.0", {
        date: "2026-11-16",
        published: true,
        schedule: todaySlots,
        data_status: "fresh",
      }),
      "2026-11-16",
    );
    const tomorrow = extractDaySchedule(
      makeEntity("sensor.home_outages_tomorrow", "2.0", {
        date: "2026-11-17",
        published: true,
        schedule: tomorrowSlots,
        data_status: "fresh",
      }),
      "2026-11-17",
    );

    const now = new Date("2026-11-16T21:00:00Z"); // 23:00 Kyiv
    const timing = computeActiveTiming({ today, tomorrow, now });
    expect(timing.currentKind).toBe("0");
    expect(timing.currentStart?.toISOString()).toBe("2026-11-16T20:00:00.000Z");
    expect(timing.currentEnd?.toISOString()).toBe("2026-11-17T00:00:00.000Z");
    expect(timing.remainingMinutes).toBe(180);
    expect(timing.progressPercent).toBe(25);
  });

  it("prefers explicit HA timestamp sensors for next_outage and outage_end", () => {
    const today = extractDaySchedule(
      makeEntity("sensor.home_outages_today", "4.0", {
        date: "2026-11-16",
        published: true,
        schedule: "1".repeat(20) + "0".repeat(8) + "1".repeat(20),
      }),
      "2026-11-16",
    );
    const unpublishedTomorrow = extractDaySchedule(
      makeEntity("sensor.home_outages_tomorrow", "0", {
        date: "2026-11-17",
        published: false,
        schedule: "",
      }),
      "2026-11-17",
    );
    expect(unpublishedTomorrow.published).toBe(false);
    expect(unpublishedTomorrow.slots).toBeNull();

    const timing = computeActiveTiming({
      today,
      tomorrow: unpublishedTomorrow,
      now: new Date("2026-11-16T07:00:00Z"),
      nextOutageEntity: makeEntity("sensor.home_next_outage", "2026-11-16T08:00:00Z", {
        duration_minutes: 240,
      }),
    });
    expect(timing.currentKind).toBe("1");
    expect(timing.nextOutageMinutesUntil).toBe(60);
    expect(timing.nextOutageDurationMinutes).toBe(240);
  });

  it("measures cross-midnight next_outage duration when spanning today and tomorrow", () => {
    const today = extractDaySchedule(
      makeEntity("sensor.home_outages_today", "1.0", {
        date: "2026-11-16",
        published: true,
        schedule: "1".repeat(46) + "00", // 23:00-24:00 Kyiv
      }),
      "2026-11-16",
    );
    const tomorrow = extractDaySchedule(
      makeEntity("sensor.home_outages_tomorrow", "1.5", {
        date: "2026-11-17",
        published: true,
        schedule: "000" + "1".repeat(45), // 00:00-01:30 Kyiv
      }),
      "2026-11-17",
    );
    const timing = computeActiveTiming({
      today,
      tomorrow,
      now: new Date("2026-11-16T20:00:00Z"), // 22:00 Kyiv
    });
    expect(timing.currentKind).toBe("1");
    expect(timing.nextOutageDurationMinutes).toBe(150);
  });
});

describe("weekly calendar builder", () => {
  it("classifies localized calendar summaries and merges factual today with calendar forecast", () => {
    expect(classifyCalendarSummary("Відключення електроенергії")).toBe("0");
    expect(classifyCalendarSummary("Можливе відключення")).toBe("?");
    expect(classifyCalendarSummary("Possible outage")).toBe("?");
    expect(classifyCalendarSummary("Emergency outage")).toBe("0");
    expect(classifyCalendarSummary("Unrelated event")).toBeNull();

    const todaySchedule = extractDaySchedule(
      makeEntity("sensor.home_outages_today", "2", {
        date: "2026-11-16", // Monday
        published: true,
        schedule: "0".repeat(4) + "1".repeat(44),
      }),
      "2026-11-16",
    );

    const rows = buildWeeklyMatrix({
      events: [
        {
          summary: "Можливе відключення",
          start: { dateTime: "2026-11-18T10:00:00+02:00" },
          end: { dateTime: "2026-11-18T12:30:00+02:00" },
        },
        {
          summary: "Power outage",
          start: "2026-11-16T14:00:00+02:00",
          end: "2026-11-16T16:00:00+02:00",
        },
      ],
      todayDate: new Date("2026-11-16T09:00:00Z"),
      todaySchedule,
      rowOrder: "mon_sun",
    });

    expect(rows).toHaveLength(7);
    expect(rows[0].isToday).toBe(true);
    // Today factual schedule overrides calendar event on Monday 14:00-16:00.
    expect(rows[0].slots[0]).toBe("0");
    expect(rows[0].slots[28]).toBe("1");
    // Wednesday (index 2) picks up possible outage 10:00-12:30 (slots 20..24).
    expect(rows[2].dateIso).toBe("2026-11-18");
    expect(rows[2].slots[20]).toBe("?");
    expect(rows[2].slots[24]).toBe("?");
    expect(rows[2].slots[25]).toBe("1");
  });

  it("supports rolling 7-day order starting from current weekday", () => {
    // 2026-11-18 is Wednesday (weekdayIndex = 2)
    const rows = buildWeeklyMatrix({
      events: [],
      todayDate: new Date("2026-11-18T09:00:00Z"),
      rowOrder: "rolling",
    });
    expect(rows.map((r) => r.weekdayIndex)).toEqual([2, 3, 4, 5, 6, 0, 1]);
    expect(rows[0].isToday).toBe(true);
  });
});
