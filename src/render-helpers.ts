import { html, TemplateResult } from "lit";
import { renderCrossedBolt } from "./icons";
import { slotLabel, TranslationStrings } from "./localize";
import { CardTheme, SlotState, SupportedLanguage } from "./types";

export function pad2(n: number): string {
  return String(n).padStart(2, "0");
}

export function resolveActiveTheme(theme: CardTheme | undefined, darkMode: boolean): CardTheme {
  if (theme === "dtek_light" || theme === "dtek_dark") {
    return theme;
  }
  if (theme === "auto" || !theme) {
    return "auto";
  }
  return darkMode ? "dtek_dark" : "dtek_light";
}

export function dtekHalfBackground(ch: SlotState, highlightRow: boolean): string {
  if (highlightRow) {
    if (ch === "0") return "var(--ua-today-off-bg)";
    if (ch === "?") return "var(--ua-today-maybe-bg)";
    return "var(--ua-today-on-bg)";
  }
  if (ch === "0") return "var(--ua-off-bg)";
  if (ch === "?") return "var(--ua-maybe-bg)";
  return "var(--ua-bg)";
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
