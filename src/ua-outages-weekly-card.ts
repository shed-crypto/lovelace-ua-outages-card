import { LitElement, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { findDefaultPrimaryEntity, resolveWeeklyEntities } from "./discovery";
import { getStrings, resolveLanguage } from "./localize";
import { resolveActiveTheme, resolveVisibleTitle } from "./render-helpers";
import {
  addDaysIso,
  buildWeeklyMatrix,
  DEFAULT_TIMEZONE,
  extractDaySchedule,
  getLocalDateAndSlot,
  getMinuteOfDay,
} from "./schedule-parser";
import { cardStyles } from "./styles";
import {
  CalendarApiEvent,
  CardLayout,
  EmptyDaysMode,
  HomeAssistant,
  LovelaceGridOptions,
  MobileWeeklyViewMode,
  UaOutagesWeeklyCardConfig,
  WeeklyDayRow,
  WeeklyViewMode,
} from "./types";
import { fetchCalendarWeek, renderWeeklyScheduleContent } from "./weekly-renderer";

const CALENDAR_CACHE_TTL_MS = 300_000;

@customElement("ua-outages-weekly-card")
export class UaOutagesWeeklyCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UaOutagesWeeklyCardConfig;
  @state() private _events: CalendarApiEvent[] = [];
  @state() private _hoverCell: { dayIdx: number; hour: number } | null = null;
  @state() private _pinnedCell: { dayIdx: number; hour: number } | null = null;

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
      layout: "full",
      weekly_view: "auto",
      mobile_weekly_view: "list",
      empty_days_mode: "auto",
      row_order: "mon_sun",
      language: "auto",
      show_header: true,
      show_title: true,
      show_group_badge: true,
      show_readout: true,
      show_now_line: true,
      show_possible: true,
      show_intervals_text: true,
      show_legend: true,
      ...config,
    };
    this._hoverCell = null;
    this._pinnedCell = null;
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

    try {
      this._events = await fetchCalendarWeek({
        hass: this.hass,
        calendarId: calId,
        startIso,
        endIso,
      });
      this._lastFetchKey = cacheKey;
      this._lastFetchMs = Date.now();
    } catch {
      // Keep prior cached events when transient HA API errors occur.
    } finally {
      this._fetching = false;
    }
  }

  private _toggleCell(cell: { dayIdx: number; hour: number }): void {
    if (this._pinnedCell?.dayIdx === cell.dayIdx && this._pinnedCell.hour === cell.hour) {
      this._pinnedCell = null;
      this._hoverCell = null;
      return;
    }
    this._pinnedCell = cell;
    this._hoverCell = cell;
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
    const layout: CardLayout = cfg.layout ?? "full";
    this.setAttribute("data-theme", theme);
    this.setAttribute("data-layout", layout);

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

    const showPossible = cfg.show_possible !== false;
    const rows: WeeklyDayRow[] = buildWeeklyMatrix({
      events: this._events,
      todayDate: now,
      todaySchedule,
      tomorrowSchedule,
      rowOrder: cfg.row_order ?? "mon_sun",
      timeZone: tz,
      showPossible,
    });

    const groupEntity = entities.group ? hass.states[entities.group] : undefined;
    const groupVal =
      groupEntity && groupEntity.state !== "unknown" && groupEntity.state !== "unavailable"
        ? groupEntity.state
        : null;
    const connEntity = entities.connection ? hass.states[entities.connection] : undefined;
    const weeklyPlanDisabled = connEntity?.attributes.weekly_schedule_shown === false;

    const minuteInfo = getMinuteOfDay(now, tz);
    const nowHour = Math.floor(nowSlot / 2);
    const nowTimeBadge = `${String(minuteInfo.hour).padStart(2, "0")}:${String(minuteInfo.minute).padStart(2, "0")}`;

    const showHeader = cfg.show_header !== false;
    const showGroupBadge = cfg.show_group_badge !== false;
    const title = resolveVisibleTitle(cfg.title, cfg.show_title, () => t.weeklyDefaultTitle);
    const hasTitleRow = Boolean(title) || (showGroupBadge && Boolean(groupVal));
    const weeklyView: WeeklyViewMode = cfg.weekly_view ?? "auto";
    const mobileWeeklyView: MobileWeeklyViewMode = cfg.mobile_weekly_view ?? "list";
    const emptyDaysMode: EmptyDaysMode = cfg.empty_days_mode ?? "auto";
    const preferBars = theme === "kiosk_dark" || theme === "oled_black";

    return html`
      <ha-card>
        <div class="wrap">
          ${
            showHeader && hasTitleRow
              ? html`
                  <div class="header">
                    <div class="header-left">
                      <div class="header-title-row">
                        ${title ? html`<span class="title">${title}</span>` : nothing}
                        ${
                          showGroupBadge && groupVal
                            ? html`<span class="badge-group dtek-pill"
                                >${t.groupPrefix} ${groupVal}</span
                              >`
                            : nothing
                        }
                      </div>
                    </div>
                  </div>
                `
              : nothing
          }
          ${renderWeeklyScheduleContent({
            rows,
            t,
            lang,
            weeklyView,
            mobileWeeklyView,
            emptyDaysMode,
            preferBarsOnDesktop: preferBars,
            nowHour,
            nowMinuteRatio: minuteInfo.minute / 60,
            nowPercent: minuteInfo.percent,
            nowTimeBadge,
            hoverCell: this._hoverCell ?? this._pinnedCell,
            selectedCell: this._pinnedCell,
            onHover: (cell) => {
              this._hoverCell = cell;
            },
            onSelectCell: (cell) => this._toggleCell(cell),
            showReadout: cfg.show_readout !== false,
            showNowLine: cfg.show_now_line !== false,
            showPossible,
            showIntervals: cfg.show_intervals_text !== false,
            showLegend: cfg.show_legend !== false,
            weeklyPlanDisabled,
          })}
        </div>
      </ha-card>
    `;
  }
}
