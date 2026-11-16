import {
  ActiveTimingInfo,
  BatteryStatusInfo,
  CalendarApiEvent,
  DayScheduleData,
  HassEntity,
  HomeAssistant,
  MergedSlotInterval,
  RawOutageInterval,
  SlotState,
  WeeklyDayRow,
  WeeklyRowOrder,
} from "./types";

export const SLOTS_PER_DAY = 48;
export const SLOT_MINUTES = 30;
export const DEFAULT_TIMEZONE = "Europe/Kyiv";

const partsFormatterCache = new Map<string, Intl.DateTimeFormat>();
const hmFormatterCache = new Map<string, Intl.DateTimeFormat>();
const timePartsFormatterCache = new Map<string, Intl.DateTimeFormat>();

function getPartsFormatter(timeZone: string): Intl.DateTimeFormat {
  let fmt = partsFormatterCache.get(timeZone);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
      weekday: "short",
    });
    partsFormatterCache.set(timeZone, fmt);
  }
  return fmt;
}

function getTimePartsFormatter(timeZone: string): Intl.DateTimeFormat {
  let fmt = timePartsFormatterCache.get(timeZone);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat("en-CA", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    timePartsFormatterCache.set(timeZone, fmt);
  }
  return fmt;
}

function getHmFormatter(timeZone: string): Intl.DateTimeFormat {
  let fmt = hmFormatterCache.get(timeZone);
  if (!fmt) {
    fmt = new Intl.DateTimeFormat("uk-UA", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hourCycle: "h23",
    });
    hmFormatterCache.set(timeZone, fmt);
  }
  return fmt;
}

export function parseSlotString(raw: unknown): SlotState[] | null {
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (trimmed.length !== SLOTS_PER_DAY) return null;

  const result: SlotState[] = [];
  for (let i = 0; i < SLOTS_PER_DAY; i++) {
    const ch = trimmed[i];
    if (ch !== "1" && ch !== "0" && ch !== "?") {
      return null;
    }
    result.push(ch);
  }
  return result;
}

export function getLocalDateAndSlot(
  date: Date,
  timeZone: string = DEFAULT_TIMEZONE,
): { dateIso: string; slotIndex: number; weekdayIndex: number } {
  const parts = getPartsFormatter(timeZone).formatToParts(date);

  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") {
      map[part.type] = part.value;
    }
  }
  const hour = Number(map.hour ?? "0");
  const minute = Number(map.minute ?? "0");
  const slotIndex = Math.min(SLOTS_PER_DAY - 1, Math.max(0, hour * 2 + (minute >= 30 ? 1 : 0)));
  const weekdayMap: Record<string, number> = {
    Mon: 0,
    Tue: 1,
    Wed: 2,
    Thu: 3,
    Fri: 4,
    Sat: 5,
    Sun: 6,
  };
  return {
    dateIso: `${map.year}-${map.month}-${map.day}`,
    slotIndex,
    weekdayIndex: weekdayMap[map.weekday ?? "Mon"] ?? 0,
  };
}

export function getMinuteOfDay(
  date: Date,
  timeZone: string = DEFAULT_TIMEZONE,
): { hour: number; minute: number; totalMinutes: number; percent: number } {
  const parts = getTimePartsFormatter(timeZone).formatToParts(date);
  const map: Record<string, string> = {};
  for (const part of parts) {
    if (part.type !== "literal") map[part.type] = part.value;
  }
  const hour = Math.min(23, Math.max(0, Number(map.hour ?? "0") || 0));
  const minute = Math.min(59, Math.max(0, Number(map.minute ?? "0") || 0));
  const totalMinutes = hour * 60 + minute;
  return {
    hour,
    minute,
    totalMinutes,
    percent: Number(((totalMinutes / 1440) * 100).toFixed(2)),
  };
}

export function addDaysIso(baseIso: string, offsetDays: number): string {
  const [y, m, d] = baseIso.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + offsetDays));
  const yy = dt.getUTCFullYear();
  const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
  const dd = String(dt.getUTCDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
}

export function formatDateShort(dateIso: string): string {
  const parts = dateIso.split("-");
  if (parts.length !== 3) return dateIso;
  return `${parts[2]}.${parts[1]}`;
}

export function formatTimeHm(date: Date, timeZone: string = DEFAULT_TIMEZONE): string {
  return getHmFormatter(timeZone).format(date);
}

function tzOffsetMinutes(instant: Date, timeZone: string): number {
  const utcParts = getLocalDateAndSlot(instant, "UTC");
  const tzParts = getLocalDateAndSlot(instant, timeZone);
  const utcTimeParts = getTimePartsFormatter("UTC").formatToParts(instant);
  const locTimeParts = getTimePartsFormatter(timeZone).formatToParts(instant);

  const readHm = (parts: Intl.DateTimeFormatPart[]): number => {
    const map: Record<string, string> = {};
    for (const p of parts) {
      if (p.type !== "literal") map[p.type] = p.value;
    }
    return Number(map.hour ?? "0") * 60 + Number(map.minute ?? "0");
  };

  const [uy, um, ud] = utcParts.dateIso.split("-").map(Number);
  const [ly, lm, ld] = tzParts.dateIso.split("-").map(Number);
  const dayDiffMin = Math.round((Date.UTC(ly, lm - 1, ld) - Date.UTC(uy, um - 1, ud)) / 60000);
  return dayDiffMin + readHm(locTimeParts) - readHm(utcTimeParts);
}

function getSlotBoundsUtc(
  dateIso: string,
  slotIndex: number,
  timeZone: string,
): { start: Date; end: Date } {
  const [y, m, d] = dateIso.split("-").map(Number);
  const hour = Math.floor(slotIndex / 2);
  const min = (slotIndex % 2) * 30;
  const approxUtc = new Date(Date.UTC(y, m - 1, d, hour, min, 0));
  const firstOffset = tzOffsetMinutes(approxUtc, timeZone);
  const pass1 = new Date(approxUtc.getTime() - firstOffset * 60000);
  // Two-pass adjustment handles slots around a DST transition boundary.
  const secondOffset = tzOffsetMinutes(pass1, timeZone);
  const start =
    secondOffset !== firstOffset ? new Date(approxUtc.getTime() - secondOffset * 60000) : pass1;
  const end = new Date(start.getTime() + SLOT_MINUTES * 60000);
  return { start, end };
}

export function slotsFromIntervals(
  outagesAttr: unknown,
  dateIso: string,
  timeZone: string = DEFAULT_TIMEZONE,
): SlotState[] | null {
  if (!Array.isArray(outagesAttr)) return null;
  const parsed: Array<{ startMs: number; endMs: number; kind: SlotState }> = [];

  for (const item of outagesAttr) {
    if (!item || typeof item !== "object") continue;
    const raw = item as RawOutageInterval;
    if (typeof raw.start !== "string" || typeof raw.end !== "string") continue;
    const startMs = Date.parse(raw.start);
    const endMs = Date.parse(raw.end);
    if (Number.isNaN(startMs) || Number.isNaN(endMs) || endMs <= startMs) continue;
    const kind: SlotState = raw.kind === "possible" ? "?" : "0";
    parsed.push({ startMs, endMs, kind });
  }

  const slots: SlotState[] = new Array<SlotState>(SLOTS_PER_DAY).fill("1");
  for (let i = 0; i < SLOTS_PER_DAY; i++) {
    const bounds = getSlotBoundsUtc(dateIso, i, timeZone);
    const midMs = (bounds.start.getTime() + bounds.end.getTime()) / 2;
    for (const iv of parsed) {
      if (midMs >= iv.startMs && midMs < iv.endMs) {
        slots[i] = iv.kind === "0" || slots[i] === "1" ? iv.kind : slots[i];
      }
    }
  }
  return slots;
}

export function summarizeSlotHours(slots: readonly SlotState[]): {
  outageHours: number;
  possibleHours: number;
} {
  let offSlots = 0;
  let maybeSlots = 0;
  for (const ch of slots) {
    if (ch === "0") offSlots += 1;
    else if (ch === "?") maybeSlots += 1;
  }
  return {
    outageHours: offSlots * 0.5,
    possibleHours: maybeSlots * 0.5,
  };
}

function slotToHhMm(slotIdx: number): string {
  const totalMin = slotIdx * SLOT_MINUTES;
  const hh = String(Math.floor(totalMin / 60)).padStart(2, "0");
  const mm = String(totalMin % 60).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function extractMergedIntervals(
  slots: readonly SlotState[],
  target: "0" | "?" = "0",
): MergedSlotInterval[] {
  const result: MergedSlotInterval[] = [];
  let start: number | null = null;
  for (let i = 0; i <= SLOTS_PER_DAY; i++) {
    const matches = i < SLOTS_PER_DAY && slots[i] === target;
    if (matches && start === null) {
      start = i;
    } else if (!matches && start !== null) {
      result.push({
        startSlot: start,
        endSlot: i,
        startLabel: slotToHhMm(start),
        endLabel: slotToHhMm(i),
        durationMinutes: (i - start) * SLOT_MINUTES,
        kind: target,
      });
      start = null;
    }
  }
  return result;
}

export function formatIntervalsText(slots: readonly SlotState[], target: "0" | "?" = "0"): string {
  return extractMergedIntervals(slots, target)
    .map((iv) => `${iv.startLabel}-${iv.endLabel}`)
    .join(", ");
}

function parseRuntimeMinutes(entity: HassEntity | undefined): number | null {
  if (!entity || entity.state === "unknown" || entity.state === "unavailable") {
    return null;
  }
  const raw = entity.state.trim();
  const hmMatch = /^(\d{1,3}):(\d{2})(?::\d{2})?$/.exec(raw);
  if (hmMatch) {
    return Number(hmMatch[1]) * 60 + Number(hmMatch[2]);
  }
  const num = Number.parseFloat(raw);
  if (!Number.isFinite(num) || num < 0) return null;
  const unit =
    typeof entity.attributes.unit_of_measurement === "string"
      ? entity.attributes.unit_of_measurement.trim().toLowerCase()
      : "";
  if (
    unit === "h" ||
    unit === "hr" ||
    unit === "hrs" ||
    unit.startsWith("hour") ||
    unit.startsWith("год") ||
    unit === "ч"
  ) {
    return Math.round(num * 60);
  }
  if (unit === "s" || unit === "sec" || unit.startsWith("сек")) {
    return Math.round(num / 60);
  }
  return Math.round(num);
}

export function parseBatteryStatus(options: {
  hass?: HomeAssistant;
  socEntityId?: string;
  runtimeEntityId?: string;
  lowThreshold?: number;
  nextOutageDurationMinutes?: number | null;
}): BatteryStatusInfo | null {
  const { hass, socEntityId, runtimeEntityId, lowThreshold, nextOutageDurationMinutes } = options;
  if (!hass) return null;

  let soc: number | null = null;
  const socId = socEntityId?.trim();
  if (socId && hass.states[socId]) {
    const val = Number.parseFloat(hass.states[socId]?.state ?? "");
    if (Number.isFinite(val)) {
      soc = Math.max(0, Math.min(100, Math.round(val)));
    }
  }

  const rtId = runtimeEntityId?.trim();
  const runtimeMinutes = rtId ? parseRuntimeMinutes(hass.states[rtId]) : null;
  if (soc === null && runtimeMinutes === null) {
    return null;
  }

  const threshold = Number.isFinite(lowThreshold)
    ? Math.max(1, Math.min(99, Number(lowThreshold)))
    : 20;
  const isLow =
    (soc !== null && soc <= threshold) || (runtimeMinutes !== null && runtimeMinutes <= 30);
  const willLastNextOutage =
    runtimeMinutes !== null &&
    nextOutageDurationMinutes !== null &&
    nextOutageDurationMinutes !== undefined
      ? runtimeMinutes >= nextOutageDurationMinutes
      : null;

  return {
    soc,
    runtimeMinutes,
    isLow,
    willLastNextOutage,
  };
}

export function extractDaySchedule(
  entity: HassEntity | undefined,
  fallbackDateIso: string,
  timeZone: string = DEFAULT_TIMEZONE,
): DayScheduleData {
  if (!entity || entity.state === "unavailable" || entity.state === "unknown") {
    return {
      dateIso: fallbackDateIso,
      published: false,
      slots: null,
      outageHours: 0,
      possibleHours: 0,
      outagesText: "",
      dataStatus: "stale",
    };
  }

  const attrs = entity.attributes;
  const dateIso = typeof attrs.date === "string" && attrs.date ? attrs.date : fallbackDateIso;
  const explicitSlots = parseSlotString(attrs.schedule);
  const fallbackSlots =
    explicitSlots ??
    (Array.isArray(attrs.outages) ? slotsFromIntervals(attrs.outages, dateIso, timeZone) : null);

  const published = typeof attrs.published === "boolean" ? attrs.published : fallbackSlots !== null;
  const hours = fallbackSlots ? summarizeSlotHours(fallbackSlots) : null;
  const numericState = Number.parseFloat(entity.state);
  const outageHours = hours ? hours.outageHours : Number.isFinite(numericState) ? numericState : 0;
  const outagesText =
    typeof attrs.outages_text === "string" && attrs.outages_text
      ? attrs.outages_text
      : fallbackSlots
        ? formatIntervalsText(fallbackSlots, "0")
        : "";

  return {
    dateIso,
    published: published && fallbackSlots !== null,
    slots: published ? fallbackSlots : null,
    outageHours,
    possibleHours: hours ? hours.possibleHours : 0,
    outagesText,
    dataStatus: typeof attrs.data_status === "string" ? attrs.data_status : "fresh",
  };
}

function parseEntityDate(entity: HassEntity | undefined): Date | null {
  if (!entity || entity.state === "unavailable" || entity.state === "unknown") {
    return null;
  }
  const ms = Date.parse(entity.state);
  return Number.isNaN(ms) ? null : new Date(ms);
}

export function computeActiveTiming(options: {
  today: DayScheduleData;
  tomorrow: DayScheduleData;
  now: Date;
  nextOutageEntity?: HassEntity;
  outageEndEntity?: HassEntity;
  timeZone?: string;
}): ActiveTimingInfo {
  const tz = options.timeZone ?? DEFAULT_TIMEZONE;
  const nowMs = options.now.getTime();
  const { dateIso: todayIso, slotIndex } = getLocalDateAndSlot(options.now, tz);

  let currentKind: SlotState = "1";
  if (options.today.slots && options.today.dateIso === todayIso) {
    currentKind = options.today.slots[slotIndex] ?? "1";
  }

  let currentStart: Date | null = null;
  let currentEnd = parseEntityDate(options.outageEndEntity);
  if (options.outageEndEntity && typeof options.outageEndEntity.attributes.start === "string") {
    const ms = Date.parse(options.outageEndEntity.attributes.start);
    if (!Number.isNaN(ms)) {
      currentStart = new Date(ms);
    }
  }

  // Fallback to local 48-slot contiguous run when dedicated timestamp sensors are absent.
  if (
    currentKind === "0" &&
    options.today.slots &&
    (currentStart === null || currentEnd === null)
  ) {
    let runStart = slotIndex;
    while (runStart > 0 && options.today.slots[runStart - 1] === "0") {
      runStart -= 1;
    }
    let runEnd = slotIndex + 1;
    while (runEnd < SLOTS_PER_DAY && options.today.slots[runEnd] === "0") {
      runEnd += 1;
    }
    if (currentStart === null) {
      currentStart = getSlotBoundsUtc(options.today.dateIso, runStart, tz).start;
    }
    if (currentEnd === null) {
      const tomorrowIso = addDaysIso(options.today.dateIso, 1);
      if (
        runEnd === SLOTS_PER_DAY &&
        options.tomorrow.slots &&
        options.tomorrow.dateIso === tomorrowIso &&
        options.tomorrow.slots[0] === "0"
      ) {
        let tmrEnd = 0;
        while (tmrEnd < SLOTS_PER_DAY && options.tomorrow.slots[tmrEnd] === "0") {
          tmrEnd += 1;
        }
        currentEnd = getSlotBoundsUtc(tomorrowIso, tmrEnd - 1, tz).end;
      } else {
        currentEnd = getSlotBoundsUtc(options.today.dateIso, runEnd - 1, tz).end;
      }
    }
  }

  let remainingMinutes: number | null = null;
  let progressPercent: number | null = null;
  if (currentEnd !== null && currentEnd.getTime() > nowMs) {
    remainingMinutes = Math.max(0, Math.ceil((currentEnd.getTime() - nowMs) / 60000));
    if (currentStart !== null && currentEnd.getTime() > currentStart.getTime()) {
      const total = currentEnd.getTime() - currentStart.getTime();
      const elapsed = Math.min(total, Math.max(0, nowMs - currentStart.getTime()));
      progressPercent = Math.round((elapsed / total) * 100);
    }
  }

  let nextOutageStart = parseEntityDate(options.nextOutageEntity);
  let nextOutageDurationMinutes =
    typeof options.nextOutageEntity?.attributes.duration_minutes === "number"
      ? options.nextOutageEntity.attributes.duration_minutes
      : null;

  if (nextOutageStart === null) {
    const combinedDays: DayScheduleData[] = [options.today, options.tomorrow];
    outer: for (let dIdx = 0; dIdx < combinedDays.length; dIdx++) {
      const day = combinedDays[dIdx];
      if (!day.slots) continue;
      const startSlot = day.dateIso === todayIso ? slotIndex + 1 : 0;
      for (let i = startSlot; i < SLOTS_PER_DAY; i++) {
        if (day.slots[i] === "0" || day.slots[i] === "?") {
          nextOutageStart = getSlotBoundsUtc(day.dateIso, i, tz).start;
          const kind = day.slots[i];
          let run = 1;
          while (i + run < SLOTS_PER_DAY && day.slots[i + run] === kind) {
            run += 1;
          }
          if (
            dIdx === 0 &&
            i + run === SLOTS_PER_DAY &&
            options.tomorrow.slots &&
            options.tomorrow.dateIso === addDaysIso(day.dateIso, 1)
          ) {
            let tmrIdx = 0;
            while (tmrIdx < SLOTS_PER_DAY && options.tomorrow.slots[tmrIdx] === kind) {
              run += 1;
              tmrIdx += 1;
            }
          }
          nextOutageDurationMinutes = run * SLOT_MINUTES;
          break outer;
        }
      }
    }
  }

  const nextOutageMinutesUntil =
    nextOutageStart !== null && nextOutageStart.getTime() > nowMs
      ? Math.max(0, Math.ceil((nextOutageStart.getTime() - nowMs) / 60000))
      : null;

  return {
    currentKind,
    currentStart,
    currentEnd,
    remainingMinutes,
    progressPercent,
    nextOutageStart,
    nextOutageMinutesUntil,
    nextOutageDurationMinutes,
  };
}

export function classifyCalendarSummary(summary: string | undefined): SlotState | null {
  if (!summary) return null;
  const s = summary.toLowerCase();
  if (s.includes("можлив") || s.includes("possible") || s.includes("возможн")) {
    return "?";
  }
  if (
    s.includes("відключ") ||
    s.includes("планов") ||
    s.includes("аварій") ||
    s.includes("outage") ||
    s.includes("works") ||
    s.includes("отключ") ||
    s.includes("работ")
  ) {
    return "0";
  }
  return null;
}

function parseCalTimestamp(val: { dateTime?: string; date?: string } | string): number | null {
  if (typeof val === "string") {
    const ms = Date.parse(val);
    return Number.isNaN(ms) ? null : ms;
  }
  const str = val.dateTime ?? val.date;
  if (!str) return null;
  const ms = Date.parse(str);
  return Number.isNaN(ms) ? null : ms;
}

export function buildWeeklyMatrix(options: {
  events: readonly CalendarApiEvent[];
  todayDate: Date;
  todaySchedule?: DayScheduleData;
  tomorrowSchedule?: DayScheduleData;
  rowOrder: WeeklyRowOrder;
  timeZone?: string;
}): WeeklyDayRow[] {
  const tz = options.timeZone ?? DEFAULT_TIMEZONE;
  const { dateIso: todayIso, weekdayIndex: todayWeekday } = getLocalDateAndSlot(
    options.todayDate,
    tz,
  );
  const tomorrowIso = addDaysIso(todayIso, 1);

  const dayMap = new Map<
    string,
    { slots: SlotState[]; hasSchedule: boolean; source: WeeklyDayRow["source"] }
  >();
  const parsedEvents = options.events
    .map((ev) => {
      const kind = classifyCalendarSummary(ev.summary);
      const startMs = parseCalTimestamp(ev.start);
      const endMs = parseCalTimestamp(ev.end);
      return kind && startMs !== null && endMs !== null && endMs > startMs
        ? { kind, startMs, endMs }
        : null;
    })
    .filter((item): item is { kind: SlotState; startMs: number; endMs: number } => item !== null);

  for (let offset = 0; offset < 7; offset++) {
    const dateIso = addDaysIso(todayIso, offset);
    if (
      dateIso === options.todaySchedule?.dateIso &&
      options.todaySchedule.published &&
      options.todaySchedule.slots
    ) {
      dayMap.set(dateIso, {
        slots: [...options.todaySchedule.slots],
        hasSchedule: true,
        source: "today",
      });
      continue;
    }
    if (
      dateIso === options.tomorrowSchedule?.dateIso &&
      options.tomorrowSchedule.published &&
      options.tomorrowSchedule.slots
    ) {
      dayMap.set(dateIso, {
        slots: [...options.tomorrowSchedule.slots],
        hasSchedule: true,
        source: "tomorrow",
      });
      continue;
    }

    const slots: SlotState[] = new Array<SlotState>(SLOTS_PER_DAY).fill("1");
    let matchedAny = false;
    for (let s = 0; s < SLOTS_PER_DAY; s++) {
      const bounds = getSlotBoundsUtc(dateIso, s, tz);
      const midMs = (bounds.start.getTime() + bounds.end.getTime()) / 2;
      for (const ev of parsedEvents) {
        if (midMs >= ev.startMs && midMs < ev.endMs) {
          matchedAny = true;
          if (ev.kind === "0" || slots[s] === "1") {
            slots[s] = ev.kind;
          }
        }
      }
    }
    dayMap.set(dateIso, {
      slots,
      hasSchedule: matchedAny,
      source: matchedAny ? "calendar" : "empty",
    });
  }

  const rowsByWeekday: WeeklyDayRow[] = [];
  for (let offset = 0; offset < 7; offset++) {
    const dateIso = addDaysIso(todayIso, offset);
    const weekdayIndex = (todayWeekday + offset) % 7;
    const entry = dayMap.get(dateIso);
    rowsByWeekday.push({
      weekdayIndex,
      dateIso,
      isToday: dateIso === todayIso || (offset === 0 && dateIso !== tomorrowIso),
      hasSchedule: entry?.hasSchedule ?? false,
      source: entry?.source ?? "empty",
      slots: entry?.slots ?? new Array<SlotState>(SLOTS_PER_DAY).fill("1"),
    });
  }

  if (options.rowOrder === "mon_sun") {
    return [...rowsByWeekday].sort((a, b) => a.weekdayIndex - b.weekdayIndex);
  }
  return rowsByWeekday;
}
