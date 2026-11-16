import { html, nothing, TemplateResult } from "lit";
import { renderCrossedBolt } from "./icons";
import { slotLabel, TranslationStrings } from "./localize";
import { extractMergedIntervals } from "./schedule-parser";
import { CardTheme, SlotState, SupportedLanguage } from "./types";

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function resolveActiveTheme(theme: CardTheme | undefined, darkMode: boolean): CardTheme {
  if (
    theme === "dtek_light" ||
    theme === "dtek_dark" ||
    theme === "kiosk_dark" ||
    theme === "oled_black"
  ) {
    return theme;
  }
  if (theme === "auto" || !theme) {
    return "auto";
  }
  return darkMode ? "dtek_dark" : "dtek_light";
}

export function dtekHalfBackground(ch: SlotState, highlightRow: boolean): string {
  // Keep outage ("0") and possible ("?") distinct from today's yellow row highlight.
  if (ch === "0") return "var(--ua-off-bg)";
  if (ch === "?") return "var(--ua-maybe-bg)";
  return highlightRow ? "var(--ua-today-on-bg)" : "var(--ua-bg)";
}

export function cleanAutoTitle(options: {
  friendlyName: unknown;
  fallbackTitle: string;
  groupVal: string | null;
  showGroupBadge: boolean;
}): string {
  const { friendlyName, fallbackTitle, groupVal, showGroupBadge } = options;
  if (typeof friendlyName !== "string" || !friendlyName.trim()) {
    return fallbackTitle;
  }
  let cleaned = friendlyName
    .replace(/\s+(Outages today|Відключень сьогодні|Отключений сегодня)$/i, "")
    .trim();
  if (groupVal && showGroupBadge) {
    const escaped = groupVal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const dupPattern = new RegExp(
      `\\s*(?:[·•\\-|]\\s*|\\()(?:Черга|Group|Queue|Группа)\\s+${escaped}\\)?$`,
      "i",
    );
    cleaned = cleaned.replace(dupPattern, "").trim();
  }
  return cleaned || fallbackTitle;
}

export function renderDtekHeaderRow(cornerLabel: string): TemplateResult {
  const hours = Array.from({ length: 24 }, (_, h) => h);
  return html`
    <thead>
      <tr>
        <th class="dtek-corner">${cornerLabel}</th>
        ${hours.map(
          (h) => html`
            <th class="dtek-vhead-cell">
              <span class="dtek-vhead">${pad2(h)}-${pad2(h + 1)}</span>
            </th>
          `,
        )}
      </tr>
    </thead>
  `;
}

export function renderDtekHourCell(options: {
  slots: readonly SlotState[];
  hour: number;
  isNowHour: boolean;
  highlightRow?: boolean;
  compactRow?: boolean;
  onSelect?: (hour: number) => void;
}): TemplateResult {
  const s1: SlotState = options.slots[options.hour * 2] ?? "1";
  const s2: SlotState = options.slots[options.hour * 2 + 1] ?? "1";
  const highlight = Boolean(options.highlightRow);

  let icon: TemplateResult | string = "";
  if (s1 === "0" && s2 === "0") {
    icon = renderCrossedBolt({ size: 12, accent: false, faded: false });
  } else if (s1 === "?" && s2 === "?") {
    icon = renderCrossedBolt({ size: 12, accent: false, faded: true });
  } else if (s1 !== "1" || s2 !== "1") {
    icon = renderCrossedBolt({ size: 12, accent: true, faded: false });
  }

  return html`
    <td>
      <button
        type="button"
        class="dtek-cell ${options.isNowHour ? "is-now" : ""} ${options.compactRow ? "compact-row" : ""}"
        aria-label="${pad2(options.hour)}:00-${pad2(options.hour + 1)}:00"
        @mouseenter=${() => options.onSelect?.(options.hour)}
        @click=${() => options.onSelect?.(options.hour)}
      >
        <span class="dtek-cell-bg">
          <span style="background: ${dtekHalfBackground(s1, highlight)}"></span>
          <span style="background: ${dtekHalfBackground(s2, highlight)}"></span>
        </span>
        <span class="dtek-cell-icon">${icon}</span>
      </button>
    </td>
  `;
}

export function renderDtekLegend(t: TranslationStrings, includeMaybe: boolean): TemplateResult {
  return html`
    <div class="legend">
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-bg)"></span>
        <span>${t.legOn}</span>
      </span>
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-off-bg)">
          ${renderCrossedBolt({ size: 10 })}
        </span>
        <span>${t.legOff}</span>
      </span>
      ${
        includeMaybe
          ? html`
              <span class="legend-item">
                <span class="legend-swatch" style="background: var(--ua-maybe-bg)">
                  ${renderCrossedBolt({ size: 10, faded: true })}
                </span>
                <span>${t.legMaybe}</span>
              </span>
            `
          : ""
      }
      <span class="legend-item">
        <span
          class="legend-swatch"
          style="background: linear-gradient(90deg, var(--ua-off-bg) 50%, var(--ua-bg) 50%)"
        >
          ${renderCrossedBolt({ size: 10, accent: true })}
        </span>
        <span>${t.legFirst}</span>
      </span>
      <span class="legend-item">
        <span
          class="legend-swatch"
          style="background: linear-gradient(90deg, var(--ua-bg) 50%, var(--ua-off-bg) 50%)"
        >
          ${renderCrossedBolt({ size: 10, accent: true })}
        </span>
        <span>${t.legSecond}</span>
      </span>
    </div>
  `;
}

export function formatHourReadout(options: {
  slots: readonly SlotState[];
  hour: number;
  lang: SupportedLanguage;
  prefix?: string;
  tag?: string;
}): string {
  const s1: SlotState = options.slots[options.hour * 2] ?? "1";
  const s2: SlotState = options.slots[options.hour * 2 + 1] ?? "1";
  const detail =
    s1 === s2
      ? slotLabel(s1, options.lang)
      : `:00 ${slotLabel(s1, options.lang)} / :30 ${slotLabel(s2, options.lang)}`;
  const prefix = options.prefix ? `${options.prefix} • ` : "";
  const tag = options.tag ? ` (${options.tag})` : "";
  return `${prefix}${pad2(options.hour)}:00–${pad2(options.hour + 1)}:00${tag} • ${detail}`;
}

export function timelineSlotClass(ch: SlotState): string {
  if (ch === "0") return "st-off";
  if (ch === "?") return "st-maybe";
  return "st-on";
}

export function renderTimelineHoursAxis(): TemplateResult {
  const hours = Array.from({ length: 24 }, (_, h) => h);
  return html`
    <div class="tl-hours">
      ${hours.map((h) => html`<span class="tl-hour-lbl">${pad2(h)}</span>`)}
    </div>
  `;
}

export function renderTimelineTrack(options: {
  slots: readonly SlotState[];
  mini?: boolean;
  nowPercent?: number | null;
  onSelectHour?: (hour: number) => void;
}): TemplateResult {
  const slots = options.slots;
  const nowPct =
    options.nowPercent !== undefined && options.nowPercent !== null
      ? Math.min(100, Math.max(0, options.nowPercent))
      : null;

  return html`
    <div class="tl-track-wrap">
      <div class="tl-track ${options.mini ? "mini" : ""}">
        ${Array.from({ length: 48 }, (_, idx) => {
          const ch: SlotState = slots[idx] ?? "1";
          const hour = Math.floor(idx / 2);
          const isHourEnd = idx % 2 === 1 && idx < 47;
          const startStr = `${pad2(hour)}:${idx % 2 === 0 ? "00" : "30"}`;
          const endHour = idx % 2 === 0 ? hour : hour + 1;
          const endMin = idx % 2 === 0 ? "30" : "00";
          return html`
            <button
              type="button"
              class="tl-slot ${timelineSlotClass(ch)} ${isHourEnd ? "hour-end" : ""}"
              aria-label="${startStr}-${pad2(endHour)}:${endMin}"
              @mouseenter=${() => options.onSelectHour?.(hour)}
              @click=${() => options.onSelectHour?.(hour)}
            ></button>
          `;
        })}
      </div>
      ${nowPct !== null ? html`<span class="tl-now-line" style="left: ${nowPct}%"></span>` : nothing}
    </div>
  `;
}

export function renderTimelineDailyBox(options: {
  slots: readonly SlotState[];
  nowPercent?: number | null;
  nowTimeLabel?: string;
  showNowBadge?: boolean;
  mini?: boolean;
  onSelectHour?: (hour: number) => void;
  onLeave?: () => void;
}): TemplateResult {
  const nowPct =
    options.nowPercent !== undefined && options.nowPercent !== null
      ? Math.min(100, Math.max(0, options.nowPercent))
      : null;
  const badgeText = options.nowTimeLabel ? `${options.nowTimeLabel}` : "";

  return html`
    <div class="tl-box" @mouseleave=${() => options.onLeave?.()}>
      ${
        options.showNowBadge && nowPct !== null && badgeText
          ? html`
              <span class="tl-now-badge" style="left: clamp(26px, ${nowPct}%, calc(100% - 26px))">
                ${badgeText}
              </span>
            `
          : nothing
      }
      ${renderTimelineHoursAxis()}
      ${renderTimelineTrack({
        slots: options.slots,
        mini: options.mini,
        nowPercent: nowPct,
        onSelectHour: options.onSelectHour,
      })}
    </div>
  `;
}

export function renderIntervalChips(
  slots: readonly SlotState[],
  t: TranslationStrings,
  showOkFallback: boolean = true,
): TemplateResult {
  const offs = extractMergedIntervals(slots, "0");
  const maybes = extractMergedIntervals(slots, "?");
  if (offs.length === 0 && maybes.length === 0) {
    return showOkFallback
      ? html`<div class="chip-row"><span class="iv-chip ok">${t.noOutagesToday}</span></div>`
      : html``;
  }
  return html`
    <div class="chip-row">
      ${offs.map((iv) => html`<span class="iv-chip">+ ${iv.startLabel}–${iv.endLabel}</span>`)}
      ${maybes.map(
        (iv) => html`<span class="iv-chip maybe">? ${iv.startLabel}–${iv.endLabel}</span>`,
      )}
    </div>
  `;
}

export function renderTimelineLegend(t: TranslationStrings, includeMaybe: boolean): TemplateResult {
  return html`
    <div class="legend">
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-tl-on)"></span>
        <span>${t.legOn}</span>
      </span>
      <span class="legend-item">
        <span class="legend-swatch" style="background: var(--ua-tl-off)"></span>
        <span>${t.legOff}</span>
      </span>
      ${
        includeMaybe
          ? html`
              <span class="legend-item">
                <span class="legend-swatch" style="background: var(--ua-tl-maybe)"></span>
                <span>${t.legMaybe}</span>
              </span>
            `
          : nothing
      }
    </div>
  `;
}
