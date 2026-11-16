import { LitElement, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { findDefaultPrimaryEntity, resolveWeeklyEntities } from "./discovery";
import { getStrings, resolveLanguage } from "./localize";
import {
  formatHourReadout,
  renderDtekHeaderRow,
  renderDtekHourCell,
  renderDtekLegend,
  resolveActiveTheme,
} from "./render-helpers";
import {
  addDaysIso,
  buildWeeklyMatrix,
  DEFAULT_TIMEZONE,
  extractDaySchedule,
  formatDateShort,
  getLocalDateAndSlot,
} from "./schedule-parser";
import { cardStyles } from "./styles";
import {
  CalendarApiEvent,
  HomeAssistant,
  LovelaceGridOptions,
  UaOutagesWeeklyCardConfig,
  WeeklyDayRow,
} from "./types";

const CALENDAR_CACHE_TTL_MS = 300_000;

@customElement("ua-outages-weekly-card")
export class UaOutagesWeeklyCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UaOutagesWeeklyCardConfig;
  @state() private _events: CalendarApiEvent[] = [];
  @state() private _hoverCell: { dayIdx: number; hour: number } | null = null;

  private _lastFetchKey = "";
  private _lastFetchMs = 0;
  private _fetching = false;

  public static getStubConfig(hass?: HomeAssistant): UaOutagesWeeklyCardConfig {
    const entity = hass ? findDefaultPrimaryEntity(hass, "calendar") : undefined;
    return {
      type: "custom:ua-outages-weekly-card",
      entity: entity ?? "calendar.ua_outages_outages",
      theme: "auto",
      row_order: "mon_sun",
    };
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("ua-outages-weekly-card-editor");
  }

  public setConfig(config: UaOutagesWeeklyCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = {
      theme: "auto",
      row_order: "mon_sun",
      language: "auto",
      show_legend: true,
      ...config,
    };
    this._hoverCell = null;
    this._lastFetchKey = "";
  }

  public getCardSize(): number {
    return 5;
  }

  public getGridOptions(): LovelaceGridOptions {
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto",
      min_rows: 4,
    };
  }

  protected updated(): void {
    void this._maybeFetchCalendar();
  }

  private async _maybeFetchCalendar(): Promise<void> {
    if (!this.hass || !this._config || this._fetching) return;
    const entities = resolveWeeklyEntities(this.hass, this._config);
    const calId = entities.calendar;
    if (!calId || !this.hass.states[calId]) return;

    const tz = this.hass.config?.time_zone || DEFAULT_TIMEZONE;
    const { dateIso: todayIso } = getLocalDateAndSlot(new Date(), tz);
    const lastUpd = entities.lastUpdate ? (this.hass.states[entities.lastUpdate]?.state ?? "") : "";
    const cacheKey = `${calId}|${todayIso}|${lastUpd}`;
    const nowMs = Date.now();

    if (cacheKey === this._lastFetchKey && nowMs - this._lastFetchMs < CALENDAR_CACHE_TTL_MS) {
      return;
    }

    this._fetching = true;
    // Start 1 day earlier in UTC so Europe/Kyiv 00:00-03:00 slots are never clipped.
    const startIso = `${addDaysIso(todayIso, -1)}T00:00:00Z`;
    const endIso = `${addDaysIso(todayIso, 8)}T23:59:59Z`;
    const apiPath = `calendars/${encodeURIComponent(calId)}?start=${encodeURIComponent(startIso)}&end=${encodeURIComponent(endIso)}`;

    try {
      const events = await this.hass.callApi<CalendarApiEvent[]>("GET", apiPath);
      this._events = Array.isArray(events) ? events : [];
      this._lastFetchKey = cacheKey;
      this._lastFetchMs = Date.now();
    } catch {
      // Keep prior cached events when transient HA API errors occur.
    } finally {
      this._fetching = false;
    }
  }

  protected render(): TemplateResult {
    const cfg = this._config;
    const hass = this.hass;
    const lang = resolveLanguage(cfg?.language, hass?.locale?.language ?? hass?.language);
    const t = getStrings(lang);

    if (!cfg || !hass) {
      return html`<ha-card><div class="empty-state">${t.noEntity}</div></ha-card>`;
    }

    const theme = resolveActiveTheme(cfg.theme, Boolean(hass.themes?.darkMode));
    this.setAttribute("data-theme", theme);

    const entities = resolveWeeklyEntities(hass, cfg);
    if (!entities.calendar && !entities.today) {
      return html`<ha-card><div class="empty-state">${t.noEntity}</div></ha-card>`;
    }

    const tz = hass.config?.time_zone || DEFAULT_TIMEZONE;
    const now = new Date();
    const { dateIso: todayIso, slotIndex: nowSlot } = getLocalDateAndSlot(now, tz);
    const tomorrowIso = addDaysIso(todayIso, 1);

    const todaySchedule = entities.today
      ? extractDaySchedule(hass.states[entities.today], todayIso, tz)
      : undefined;
    const tomorrowSchedule = entities.tomorrow
      ? extractDaySchedule(hass.states[entities.tomorrow], tomorrowIso, tz)
      : undefined;

    const rows: WeeklyDayRow[] = buildWeeklyMatrix({
      events: this._events,
      todayDate: now,
      todaySchedule,
      tomorrowSchedule,
      rowOrder: cfg.row_order ?? "mon_sun",
      timeZone: tz,
    });

    const groupEntity = entities.group ? hass.states[entities.group] : undefined;
    const groupVal =
      groupEntity && groupEntity.state !== "unknown" && groupEntity.state !== "unavailable"
        ? groupEntity.state
        : null;

    const nowHour = Math.floor(nowSlot / 2);
    const todayRowIdx = Math.max(
      0,
      rows.findIndex((r) => r.isToday),
    );
    const activeDayIdx = this._hoverCell?.dayIdx ?? todayRowIdx;
    const activeHour = this._hoverCell?.hour ?? nowHour;
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

    const hours = Array.from({ length: 24 }, (_, h) => h);

    return html`
      <ha-card>
        <div class="wrap">
          <div class="header">
            <div class="header-left">
              <div class="header-title-row">
                <span class="title">${cfg.title || t.weeklyDefaultTitle}</span>
                ${
                  groupVal
                    ? html`<span class="badge-group dtek-pill">${t.groupPrefix} ${groupVal}</span>`
                    : nothing
                }
              </div>
            </div>
          </div>
          ${
            readout
              ? html`<div class="readout-row"><span class="hover-readout">${readout}</span></div>`
              : nothing
          }

          <div class="table-scroll" @mouseleave=${() => (this._hoverCell = null)}>
            <table class="dtek-table">
              ${renderDtekHeaderRow(t.daysHeader)}
              <tbody>
                ${rows.map(
                  (row, dayIdx) => html`
                    <tr class=${row.isToday ? "is-today-row" : ""}>
                      <td class="dtek-day-cell ${row.isToday ? "today-highlight" : ""}">
                        ${t.weekdays[row.weekdayIndex]}
                      </td>
                      ${hours.map((h) =>
                        renderDtekHourCell({
                          slots: row.slots,
                          hour: h,
                          isNowHour: row.isToday && h === nowHour,
                          highlightRow: row.isToday,
                          compactRow: true,
                          onSelect: (hour) => {
                            this._hoverCell = { dayIdx, hour };
                          },
                        }),
                      )}
                    </tr>
                  `,
                )}
              </tbody>
            </table>
          </div>

          ${
            cfg.show_legend !== false
              ? html`<div class="footer">${renderDtekLegend(t, true)}</div>`
              : nothing
          }
        </div>
      </ha-card>
    `;
  }
}
