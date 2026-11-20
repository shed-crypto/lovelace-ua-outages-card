import { html, nothing, TemplateResult } from "lit";
import { TranslationStrings } from "./localize";
import {
  formatHourReadout,
  renderDtekHeaderRow,
  renderDtekHourCell,
  renderDtekLegend,
  renderIntervalChips,
  renderTimelineHoursAxis,
  renderTimelineLegend,
  renderTimelineTrack,
} from "./render-helpers";
import { formatDateShort, extractMergedIntervals, summarizeSlotHours } from "./schedule-parser";
import {
  CalendarApiEvent,
  EmptyDaysMode,
  HomeAssistant,
  MobileWeeklyViewMode,
  SupportedLanguage,
  WeeklyDayRow,
  WeeklyViewMode,
} from "./types";

export function filterVisibleWeeklyRows(
  rows: readonly WeeklyDayRow[],
  mode: EmptyDaysMode,
): { visible: WeeklyDayRow[]; collapsed: WeeklyDayRow[] } {
  if (mode === "show_all") {
    return { visible: [...rows], collapsed: [] };
  }
  const visible = rows.filter((r) => r.hasSchedule || r.isToday);
  const collapsed = rows.filter((r) => !r.hasSchedule && !r.isToday);
  if (visible.length === 0 && rows.length > 0) {
    return { visible: [rows[0]], collapsed: rows.slice(1) };
  }
  return { visible, collapsed };
}

export async function fetchCalendarWeek(options: {
  hass: HomeAssistant;
  calendarId: string;
  startIso: string;
  endIso: string;
}): Promise<CalendarApiEvent[]> {
  const apiPath = `calendars/${encodeURIComponent(options.calendarId)}?start=${encodeURIComponent(options.startIso)}&end=${encodeURIComponent(options.endIso)}`;
  const events = await options.hass.callApi<CalendarApiEvent[]>("GET", apiPath);
  return Array.isArray(events) ? events : [];
}

function renderWeeklyIntervalsSummary(
  rows: readonly WeeklyDayRow[],
  t: TranslationStrings,
): TemplateResult | typeof nothing {
  const activeRows = rows.filter(
    (r) => r.isToday || r.source === "tomorrow" || extractMergedIntervals(r.slots, "0").length > 0,
  );
  if (activeRows.length === 0) return nothing;
  return html`
    <div class="weekly-intervals">
      ${activeRows.map((row) => {
        const offs = extractMergedIntervals(row.slots, "0");
        const hours = summarizeSlotHours(row.slots);
        return html`
          <div class="weekly-iv-row">
            <span class="weekly-iv-day">
              ${t.weekdays[row.weekdayIndex]} ${formatDateShort(row.dateIso)}:
            </span>
            ${
              offs.length > 0
                ? html`
                    ${offs.map(
                      (iv) => html`<span class="iv-chip">+ ${iv.startLabel}–${iv.endLabel}</span>`,
                    )}
                    <span class="weekly-iv-hours"
                      >(${hours.outageHours.toFixed(1)} ${t.hourUnit})</span
                    >
                  `
                : html`<span class="iv-chip ok">${t.noOutagesToday}</span>`
            }
          </div>
        `;
      })}
    </div>
  `;
}

function renderWeeklyTable(options: {
  allRows: readonly WeeklyDayRow[];
  rows: readonly WeeklyDayRow[];
  collapsed: readonly WeeklyDayRow[];
  emptyDaysMode: EmptyDaysMode;
  t: TranslationStrings;
  nowHour: number | null;
  nowMinuteRatio: number | null;
  selectedCell?: { dayIdx: number; hour: number } | null;
  showIntervals: boolean;
  onHover: (cell: { dayIdx: number; hour: number } | null) => void;
  onSelect?: (cell: { dayIdx: number; hour: number }) => void;
}): TemplateResult {
  const {
    allRows,
    rows,
    collapsed,
    emptyDaysMode,
    t,
    nowHour,
    nowMinuteRatio,
    selectedCell,
    showIntervals,
  } = options;
  const hours = Array.from({ length: 24 }, (_, h) => h);
  return html`
    <div class="table-scroll" @mouseleave=${() => options.onHover(null)}>
      <table class="dtek-table dtek-table-weekly">
        ${renderDtekHeaderRow(t.daysHeader, nowHour)}
        <tbody>
          ${rows.map((row) => {
            const fullIdx = Math.max(0, allRows.indexOf(row));
            return html`
              <tr class=${row.isToday ? "is-today-row" : ""}>
                <td class="dtek-day-cell ${row.isToday ? "today-highlight" : ""}">
                  <span class="day-lbl-full">${t.weekdays[row.weekdayIndex]}</span>
                  <span class="day-lbl-short">${t.weekdaysShort[row.weekdayIndex]}</span>
                </td>
                ${hours.map((h) =>
                  renderDtekHourCell({
                    slots: row.slots,
                    hour: h,
                    isNowCol: nowHour !== null && h === nowHour,
                    isNowHour: nowHour !== null && row.isToday && h === nowHour,
                    isSelected: selectedCell?.dayIdx === fullIdx && selectedCell.hour === h,
                    nowMinuteRatio:
                      nowHour !== null && row.isToday && h === nowHour ? nowMinuteRatio : null,
                    highlightRow: row.isToday,
                    compactRow: true,
                    onHover: (hour) => options.onHover({ dayIdx: fullIdx, hour }),
                    onSelect: (hour) =>
                      (options.onSelect ?? options.onHover)({ dayIdx: fullIdx, hour }),
                  }),
                )}
              </tr>
            `;
          })}
        </tbody>
      </table>
    </div>
    ${showIntervals ? renderWeeklyIntervalsSummary(rows, t) : nothing}
    ${
      emptyDaysMode === "compact_empty" && collapsed.length > 0
        ? html`
            <div class="collapsed-days">
              ${t.collapsedDaysPrefix}:
              ${collapsed.map((r) => `${t.weekdaysShort[r.weekdayIndex]} ${formatDateShort(r.dateIso)}`).join(", ")}
            </div>
          `
        : nothing
    }
  `;
}

function renderWeeklyBars(options: {
  allRows: readonly WeeklyDayRow[];
  rows: readonly WeeklyDayRow[];
  collapsed: readonly WeeklyDayRow[];
  emptyDaysMode: EmptyDaysMode;
  t: TranslationStrings;
  nowPercent: number | null;
  nowTimeBadge: string;
  selectedCell?: { dayIdx: number; hour: number } | null;
  showIntervals: boolean;
  onHover: (cell: { dayIdx: number; hour: number } | null) => void;
  onSelect?: (cell: { dayIdx: number; hour: number }) => void;
}): TemplateResult {
  const {
    allRows,
    rows,
    collapsed,
    emptyDaysMode,
    t,
    nowPercent,
    nowTimeBadge,
    selectedCell,
    showIntervals,
  } = options;
  return html`
    <div class="wbar-wrap" @mouseleave=${() => options.onHover(null)}>
      <div class="wbar-axis-row">
        <span></span>
        <div
          style="position: relative; padding-top: ${nowPercent !== null && nowTimeBadge ? "16px" : "0"}"
        >
          ${
            nowPercent !== null && nowTimeBadge
              ? html`
                  <span
                    class="tl-now-badge"
                    style="left: clamp(26px, ${nowPercent}%, calc(100% - 26px))"
                  >
                    ${nowTimeBadge}
                  </span>
                `
              : nothing
          }
          ${renderTimelineHoursAxis()}
        </div>
      </div>

      <div class="wbar-rows-area">
        ${rows.map((row, dayIdx) => {
          const fullIdx = Math.max(0, allRows.indexOf(row));
          return html`
            <div
              class="wbar-day ${row.isToday ? "today-highlight" : ""}"
              style="grid-column: 1; grid-row: ${dayIdx + 1}; ${
                row.isToday
                  ? "background: var(--ua-today-row-bg); color: var(--ua-today-row-fg);"
                  : ""
              }"
            >
              ${t.weekdaysShort[row.weekdayIndex]} ${formatDateShort(row.dateIso).slice(0, 2)}
            </div>
            <div
              class="${row.hasSchedule ? "" : "is-empty"}"
              style="grid-column: 2; grid-row: ${dayIdx + 1};"
            >
              ${renderTimelineTrack({
                slots: row.slots,
                mini: true,
                nowPercent: null,
                selectedHour: selectedCell?.dayIdx === fullIdx ? selectedCell.hour : null,
                onHoverHour: (hour) => options.onHover({ dayIdx: fullIdx, hour }),
                onSelectHour: (hour) =>
                  (options.onSelect ?? options.onHover)({ dayIdx: fullIdx, hour }),
              })}
            </div>
          `;
        })}
        ${
          nowPercent !== null
            ? html`
                <div
                  class="wbar-overlay-col"
                  style="grid-row: 1 / span ${Math.max(1, rows.length)}"
                >
                  <span class="wbar-now-line" style="left: ${nowPercent}%"></span>
                </div>
              `
            : nothing
        }
      </div>
    </div>
    ${showIntervals ? renderWeeklyIntervalsSummary(rows, t) : nothing}
    ${
      emptyDaysMode === "compact_empty" && collapsed.length > 0
        ? html`
            <div class="collapsed-days">
              ${t.collapsedDaysPrefix}:
              ${collapsed.map((r) => `${t.weekdaysShort[r.weekdayIndex]} ${formatDateShort(r.dateIso)}`).join(", ")}
            </div>
          `
        : nothing
    }
  `;
}

function renderWeeklyList(options: {
  allRows: readonly WeeklyDayRow[];
  rows: readonly WeeklyDayRow[];
  collapsed: readonly WeeklyDayRow[];
  emptyDaysMode: EmptyDaysMode;
  t: TranslationStrings;
  nowPercent: number | null;
  selectedCell?: { dayIdx: number; hour: number } | null;
  showIntervals: boolean;
  onHover: (cell: { dayIdx: number; hour: number } | null) => void;
  onSelect?: (cell: { dayIdx: number; hour: number }) => void;
}): TemplateResult {
  const { allRows, rows, collapsed, emptyDaysMode, t, nowPercent, selectedCell, showIntervals } =
    options;
  return html`
    <div class="wlist" @mouseleave=${() => options.onHover(null)}>
      ${rows.map((row) => {
        const fullIdx = Math.max(0, allRows.indexOf(row));
        const hours = summarizeSlotHours(row.slots);
        return html`
          <div
            class="wlist-card ${row.isToday ? "is-today" : ""} ${!row.hasSchedule && !row.isToday ? "is-empty" : ""}"
          >
            <div class="wlist-top">
              <div class="wlist-day">
                <span>${t.weekdays[row.weekdayIndex]} ${formatDateShort(row.dateIso)}</span>
                ${row.isToday ? html`<span class="wlist-today-tag">${t.todayTag}</span>` : nothing}
              </div>
              <span class="wlist-hours">
                ${
                  row.hasSchedule || row.isToday
                    ? `${hours.outageHours.toFixed(1)} ${t.hourUnit}`
                    : t.dayUnscheduledLabel
                }
              </span>
            </div>
            ${renderTimelineTrack({
              slots: row.slots,
              mini: true,
              nowPercent: row.isToday ? nowPercent : null,
              selectedHour: selectedCell?.dayIdx === fullIdx ? selectedCell.hour : null,
              onHoverHour: (hour) => options.onHover({ dayIdx: fullIdx, hour }),
              onSelectHour: (hour) =>
                (options.onSelect ?? options.onHover)({ dayIdx: fullIdx, hour }),
            })}
            ${
              showIntervals && (row.hasSchedule || row.isToday)
                ? renderIntervalChips(row.slots, t, true)
                : nothing
            }
          </div>
        `;
      })}
      ${
        (emptyDaysMode === "compact_empty" || emptyDaysMode === "auto") && collapsed.length > 0
          ? html`
              <div class="collapsed-days">
                ${t.collapsedDaysPrefix}:
                ${collapsed.map((r) => `${t.weekdaysShort[r.weekdayIndex]} ${formatDateShort(r.dateIso)}`).join(", ")}
              </div>
            `
          : nothing
      }
    </div>
  `;
}

export function renderWeeklyScheduleContent(options: {
  rows: readonly WeeklyDayRow[];
  t: TranslationStrings;
  lang: SupportedLanguage;
  weeklyView: WeeklyViewMode;
  mobileWeeklyView: MobileWeeklyViewMode;
  emptyDaysMode: EmptyDaysMode;
  preferBarsOnDesktop: boolean;
  nowHour: number;
  nowMinuteRatio?: number | null;
  nowPercent: number | null;
  nowTimeBadge: string;
  hoverCell: { dayIdx: number; hour: number } | null;
  selectedCell?: { dayIdx: number; hour: number } | null;
  onHover: (cell: { dayIdx: number; hour: number } | null) => void;
  onSelectCell?: (cell: { dayIdx: number; hour: number }) => void;
  showReadout: boolean;
  showNowLine: boolean;
  showPossible: boolean;
  showIntervals: boolean;
  showLegend: boolean;
  weeklyPlanDisabled: boolean;
}): TemplateResult {
  const {
    rows,
    t,
    lang,
    weeklyView,
    mobileWeeklyView,
    emptyDaysMode,
    preferBarsOnDesktop,
    nowHour,
    nowMinuteRatio,
    nowPercent,
    nowTimeBadge,
    hoverCell,
    selectedCell,
    onHover,
    onSelectCell,
    showReadout,
    showNowLine,
    showPossible,
    showIntervals,
    showLegend,
    weeklyPlanDisabled,
  } = options;

  const { visible, collapsed } = filterVisibleWeeklyRows(rows, emptyDaysMode);
  const matrixRows =
    emptyDaysMode === "compact_empty" || emptyDaysMode === "hide_unscheduled" ? visible : rows;
  const todayIdx = Math.max(
    0,
    rows.findIndex((r) => r.isToday),
  );
  const activeDayIdx = hoverCell && hoverCell.dayIdx < rows.length ? hoverCell.dayIdx : todayIdx;
  const activeHour = hoverCell?.hour ?? nowHour;
  const activeRow = rows[activeDayIdx];

  const readout = activeRow
    ? formatHourReadout({
        slots: activeRow.slots,
        hour: activeHour,
        lang,
        prefix: `${t.weekdays[activeRow.weekdayIndex]} ${formatDateShort(activeRow.dateIso)}`,
        tag: activeRow.isToday && activeHour === nowHour ? t.nowTag : undefined,
      })
    : "";

  const effectiveNowPct = showNowLine ? nowPercent : null;
  const effectiveNowHour = showNowLine ? nowHour : null;
  const effectiveNowRatio = showNowLine ? (nowMinuteRatio ?? null) : null;
  const usesBarsLegend =
    weeklyView === "timeline_bars" ||
    weeklyView === "list" ||
    (weeklyView === "auto" && preferBarsOnDesktop);

  let body: TemplateResult;
  if (weeklyView === "table") {
    body = renderWeeklyTable({
      allRows: rows,
      rows: matrixRows,
      collapsed,
      emptyDaysMode,
      t,
      nowHour: effectiveNowHour,
      nowMinuteRatio: effectiveNowRatio,
      selectedCell,
      showIntervals,
      onHover,
      onSelect: onSelectCell,
    });
  } else if (weeklyView === "timeline_bars") {
    body = renderWeeklyBars({
      allRows: rows,
      rows: matrixRows,
      collapsed,
      emptyDaysMode,
      t,
      nowPercent: effectiveNowPct,
      nowTimeBadge,
      selectedCell,
      showIntervals,
      onHover,
      onSelect: onSelectCell,
    });
  } else if (weeklyView === "list") {
    body = renderWeeklyList({
      allRows: rows,
      rows: visible,
      collapsed,
      emptyDaysMode,
      t,
      nowPercent: effectiveNowPct,
      selectedCell,
      showIntervals,
      onHover,
      onSelect: onSelectCell,
    });
  } else {
    const desktopNode = preferBarsOnDesktop
      ? renderWeeklyBars({
          allRows: rows,
          rows: matrixRows,
          collapsed,
          emptyDaysMode,
          t,
          nowPercent: effectiveNowPct,
          nowTimeBadge,
          selectedCell,
          showIntervals,
          onHover,
          onSelect: onSelectCell,
        })
      : renderWeeklyTable({
          allRows: rows,
          rows: matrixRows,
          collapsed,
          emptyDaysMode,
          t,
          nowHour: effectiveNowHour,
          nowMinuteRatio: effectiveNowRatio,
          selectedCell,
          showIntervals,
          onHover,
          onSelect: onSelectCell,
        });

    const mobileNode =
      mobileWeeklyView === "compact_bars"
        ? renderWeeklyBars({
            allRows: rows,
            rows: matrixRows,
            collapsed,
            emptyDaysMode,
            t,
            nowPercent: effectiveNowPct,
            nowTimeBadge,
            selectedCell,
            showIntervals,
            onHover,
            onSelect: onSelectCell,
          })
        : renderWeeklyList({
            allRows: rows,
            rows: visible,
            collapsed,
            emptyDaysMode,
            t,
            nowPercent: effectiveNowPct,
            selectedCell,
            showIntervals,
            onHover,
            onSelect: onSelectCell,
          });

    body = html`
      <div class="weekly-responsive">
        <div class="weekly-desktop-view">${desktopNode}</div>
        <div class="weekly-mobile-view">${mobileNode}</div>
      </div>
    `;
  }

  const hasUnscheduledDays = rows.some((r) => !r.hasSchedule && !r.isToday);

  return html`
    ${
      showReadout && readout
        ? html`<div class="readout-row"><span class="hover-readout">${readout}</span></div>`
        : nothing
    }
    ${
      showPossible && weeklyPlanDisabled && hasUnscheduledDays
        ? html`<div class="notice-banner">${t.weeklyPlanDisabledNotice}</div>`
        : nothing
    }
    ${body}
    ${
      showLegend
        ? html`<div class="footer">
            ${
              usesBarsLegend
                ? renderTimelineLegend(t, showPossible)
                : renderDtekLegend(t, showPossible)
            }
          </div>`
        : nothing
    }
  `;
}
