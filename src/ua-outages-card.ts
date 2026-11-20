import { LitElement, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { findDefaultPrimaryEntity, resolveDailyEntities } from "./discovery";
import { formatDuration, getStrings, resolveLanguage, TranslationStrings } from "./localize";
import {
  cleanAutoTitle,
  formatHourReadout,
  pad2,
  renderDtekHeaderRow,
  renderDtekHourCell,
  renderDtekLegend,
  renderIntervalChips,
  renderTimelineDailyBox,
  renderTimelineLegend,
  resolveActiveTheme,
  resolveVisibleTitle,
} from "./render-helpers";
import {
  addDaysIso,
  buildWeeklyMatrix,
  computeActiveTiming,
  DEFAULT_TIMEZONE,
  extractDaySchedule,
  formatDateShort,
  formatTimeHm,
  getLocalDateAndSlot,
  getMinuteOfDay,
  parseBatteryStatus,
  stripPossibleSlots,
} from "./schedule-parser";
import { cardStyles } from "./styles";
import {
  ActiveScheduleView,
  ActiveTimingInfo,
  CalendarApiEvent,
  CardLayout,
  CardStyle,
  CardTheme,
  CardViewMode,
  DayScheduleData,
  EmptyDaysMode,
  HassEntity,
  HomeAssistant,
  IntervalDisplayMode,
  LovelaceGridOptions,
  MobileWeeklyViewMode,
  ModernGridMode,
  ResolvedEntities,
  SlotState,
  SupportedLanguage,
  UaOutagesCardConfig,
  WeeklyViewMode,
} from "./types";
import { fetchCalendarWeek, renderWeeklyScheduleContent } from "./weekly-renderer";

const TICK_INTERVAL_MS = 30_000;
const CALENDAR_CACHE_TTL_MS = 300_000;

@customElement("ua-outages-card")
export class UaOutagesCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UaOutagesCardConfig;
  @state() private _now: Date = new Date();
  @state() private _hoverTarget: { day: "today" | "tomorrow"; hour: number } | null = null;
  @state() private _pinnedTarget: { day: "today" | "tomorrow"; hour: number } | null = null;
  @state() private _activeView: ActiveScheduleView = "today";
  @state() private _weeklyEvents: CalendarApiEvent[] = [];
  @state() private _weeklyHoverCell: { dayIdx: number; hour: number } | null = null;
  @state() private _weeklyPinnedCell: { dayIdx: number; hour: number } | null = null;

  private _weeklyFetchKey = "";
  private _weeklyLastFetchMs = 0;
  private _weeklyFetching = false;
  private _timerId: number | null = null;
  private _onVisibility = (): void => {
    if (document.visibilityState === "visible") {
      this._now = new Date();
    }
  };

  public static getStubConfig(hass?: HomeAssistant): UaOutagesCardConfig {
    const entity = hass ? findDefaultPrimaryEntity(hass, "sensor") : undefined;
    return {
      type: "custom:ua-outages-card",
      entity: entity ?? "sensor.ua_outages_outages_today",
      style: "dtek",
      theme: "auto",
      layout: "full",
    };
  }

  public static getConfigElement(): HTMLElement {
    return document.createElement("ua-outages-card-editor");
  }

  public setConfig(config: UaOutagesCardConfig): void {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = {
      style: "dtek",
      theme: "auto",
      layout: "full",
      view_mode: "daily_only",
      default_view: "today",
      modern_grid: "2x12",
      interval_display: "auto",
      weekly_view: "auto",
      mobile_weekly_view: "list",
      empty_days_mode: "auto",
      row_order: "mon_sun",
      language: "auto",
      show_header: true,
      show_title: true,
      show_group_badge: true,
      show_connection: true,
      show_countdown: true,
      show_readout: true,
      show_now_line: true,
      show_today: true,
      show_possible: true,
      ...config,
    };
    this._hoverTarget = null;
    this._pinnedTarget = null;
    this._weeklyHoverCell = null;
    this._weeklyPinnedCell = null;
    this._activeView = this._config.default_view ?? "today";
    this._weeklyFetchKey = "";
  }

  protected updated(): void {
    void this._maybeFetchWeeklyCalendar();
  }

  private async _maybeFetchWeeklyCalendar(): Promise<void> {
    if (!this.hass || !this._config || this._weeklyFetching) return;
    const viewMode = this._config.view_mode ?? "daily_only";
    const needsWeek =
      viewMode === "both" || (viewMode === "switchable" && this._activeView === "week");
    if (!needsWeek) return;

    const entities = resolveDailyEntities(this.hass, this._config);
    const calId = entities.calendar;
    if (!calId || !this.hass.states[calId]) return;

    const tz = this.hass.config?.time_zone || DEFAULT_TIMEZONE;
    const { dateIso: todayIso } = getLocalDateAndSlot(new Date(), tz);
    const lastUpd = entities.lastUpdate ? (this.hass.states[entities.lastUpdate]?.state ?? "") : "";
    const cacheKey = `${calId}|${todayIso}|${lastUpd}`;
    const nowMs = Date.now();
    if (
      cacheKey === this._weeklyFetchKey &&
      nowMs - this._weeklyLastFetchMs < CALENDAR_CACHE_TTL_MS
    ) {
      return;
    }

    this._weeklyFetching = true;
    const startIso = `${addDaysIso(todayIso, -1)}T00:00:00Z`;
    const endIso = `${addDaysIso(todayIso, 8)}T23:59:59Z`;
    try {
      this._weeklyEvents = await fetchCalendarWeek({
        hass: this.hass,
        calendarId: calId,
        startIso,
        endIso,
      });
      this._weeklyFetchKey = cacheKey;
      this._weeklyLastFetchMs = Date.now();
    } catch {
      // Keep prior cached events when transient HA API errors occur.
    } finally {
      this._weeklyFetching = false;
    }
  }

  public getCardSize(): number {
    return this._config?.layout === "compact" ? 2 : 4;
  }

  public getGridOptions(): LovelaceGridOptions {
    const isCompact = this._config?.layout === "compact";
    return {
      columns: 12,
      min_columns: 6,
      rows: "auto",
      min_rows: isCompact ? 2 : 3,
    };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._now = new Date();
    this._timerId = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        this._now = new Date();
      }
    }, TICK_INTERVAL_MS);
    document.addEventListener("visibilitychange", this._onVisibility);
  }

  public disconnectedCallback(): void {
    if (this._timerId !== null) {
      window.clearInterval(this._timerId);
      this._timerId = null;
    }
    document.removeEventListener("visibilitychange", this._onVisibility);
    super.disconnectedCallback();
  }

  private _syncHostAttributes(theme: CardTheme, layout: CardLayout): void {
    this.setAttribute("data-theme", theme);
    this.setAttribute("data-layout", layout);
  }

  private _renderBatteryPill(
    t: TranslationStrings,
    lang: SupportedLanguage,
    timing: ActiveTimingInfo,
  ): TemplateResult | typeof nothing {
    const info = parseBatteryStatus({
      hass: this.hass,
      socEntityId: this._config?.battery_soc_entity,
      runtimeEntityId: this._config?.battery_runtime_entity,
      lowThreshold: this._config?.battery_low_threshold,
      nextOutageDurationMinutes: timing.nextOutageDurationMinutes,
    });
    if (!info) return nothing;

    const parts: string[] = [t.batteryLabel];
    if (info.soc !== null) {
      parts.push(`${info.soc}%`);
    }
    if (info.runtimeMinutes !== null) {
      const dur = formatDuration(info.runtimeMinutes, lang);
      if (info.willLastNextOutage === true) {
        parts.push(`• ${t.batteryEnough} (${t.batteryReserve} ${dur})`);
      } else {
        parts.push(`• ${t.batteryReserve} ${dur}`);
      }
    }
    return html`<span class="battery-pill ${info.isLow ? "low" : ""}">${parts.join(" ")}</span>`;
  }

  private _renderHero(options: {
    t: TranslationStrings;
    lang: SupportedLanguage;
    timing: ActiveTimingInfo;
    scheduledOutageEntity?: HassEntity;
    today: DayScheduleData;
    timeZone: string;
    isCompact: boolean;
  }): TemplateResult {
    const { t, lang, timing, scheduledOutageEntity, today, timeZone, isCompact } = options;
    const binaryOn = scheduledOutageEntity?.state === "on";
    const isOutageNow = binaryOn || timing.currentKind === "0";
    const isPossibleNow = !isOutageNow && timing.currentKind === "?";

    let tone = "tone-success";
    let mainText = t.powerOnNoOutages;
    let subText = "";

    if (isOutageNow) {
      tone = "tone-error";
      if (timing.currentEnd) {
        mainText = `${t.outageUntil} ${formatTimeHm(timing.currentEnd, timeZone)}`;
      } else {
        mainText = t.outageOngoing;
      }
      const parts: string[] = [];
      if (timing.remainingMinutes !== null) {
        parts.push(`${formatDuration(timing.remainingMinutes, lang)} ${t.remainingSuffix}`);
      }
      if (timing.currentStart && timing.currentEnd) {
        parts.push(
          `${formatTimeHm(timing.currentStart, timeZone)}–${formatTimeHm(timing.currentEnd, timeZone)}`,
        );
      }
      subText = parts.join(" • ");
    } else if (isPossibleNow) {
      tone = "tone-warning";
      mainText = t.slotMaybe;
      if (timing.nextOutageStart && timing.nextOutageMinutesUntil !== null) {
        subText = `${t.nextOutageAt} ${formatTimeHm(timing.nextOutageStart, timeZone)} (${t.inPrefix.toLowerCase()} ${formatDuration(timing.nextOutageMinutesUntil, lang)})`;
      }
    } else if (timing.nextOutageStart) {
      mainText = `${t.powerOn} • ${t.nextOutageAt} ${formatTimeHm(timing.nextOutageStart, timeZone)}`;
      const parts: string[] = [];
      if (timing.nextOutageMinutesUntil !== null) {
        parts.push(`${t.inPrefix} ${formatDuration(timing.nextOutageMinutesUntil, lang)}`);
      }
      if (timing.nextOutageDurationMinutes !== null) {
        parts.push(`${t.durationLabel} ${formatDuration(timing.nextOutageDurationMinutes, lang)}`);
      }
      subText = parts.join(" • ");
    } else if (today.slots === null) {
      tone = "tone-warning";
      mainText = t.noSchedule;
    }

    const showBattery = !isCompact ? this._renderBatteryPill(t, lang, timing) : nothing;
    const showProgress =
      isOutageNow && timing.progressPercent !== null
        ? html`
            <div class="progress-track">
              <div class="progress-fill" style="width: ${timing.progressPercent}%"></div>
            </div>
          `
        : nothing;

    return html`
      <div class="hero ${tone}">
        <div class="hero-top">
          <div class="hero-main">${mainText}</div>
          ${showBattery}
        </div>
        ${subText ? html`<div class="hero-sub">${subText}</div>` : nothing} ${showProgress}
      </div>
    `;
  }

  private _renderAddressAlert(
    t: TranslationStrings,
    addressStatus: HassEntity | undefined,
    restoration: HassEntity | undefined,
    timeZone: string,
  ): TemplateResult | typeof nothing {
    if (
      !addressStatus ||
      addressStatus.state === "none" ||
      addressStatus.state === "unavailable" ||
      addressStatus.state === "unknown"
    ) {
      return nothing;
    }
    const kindLabel = t.addressKinds[addressStatus.state] ?? t.addressKinds.other;
    const reason =
      typeof addressStatus.attributes.reason === "string" ? addressStatus.attributes.reason : "";
    let restorationStr = "";
    if (restoration && restoration.state !== "unknown" && restoration.state !== "unavailable") {
      const ms = Date.parse(restoration.state);
      if (!Number.isNaN(ms)) {
        restorationStr = `${t.expectedRestoration}${formatTimeHm(new Date(ms), timeZone)}`;
      }
    }
    const subParts = [reason, restorationStr].filter(Boolean);
    return html`
      <div class="alert-banner">
        <div class="alert-title">${kindLabel}</div>
        ${subParts.length > 0 ? html`<div>${subParts.join(" • ")}</div>` : nothing}
      </div>
    `;
  }

  private _hoverDailyCell(day: "today" | "tomorrow", hour: number): void {
    this._hoverTarget = { day, hour };
  }

  private _toggleDailyCell(day: "today" | "tomorrow", hour: number): void {
    if (this._pinnedTarget?.day === day && this._pinnedTarget.hour === hour) {
      this._pinnedTarget = null;
      this._hoverTarget = null;
      return;
    }
    this._pinnedTarget = { day, hour };
    this._hoverTarget = { day, hour };
  }

  private _toggleWeeklyCell(cell: { dayIdx: number; hour: number }): void {
    if (
      this._weeklyPinnedCell?.dayIdx === cell.dayIdx &&
      this._weeklyPinnedCell.hour === cell.hour
    ) {
      this._weeklyPinnedCell = null;
      this._weeklyHoverCell = null;
      return;
    }
    this._weeklyPinnedCell = cell;
    this._weeklyHoverCell = cell;
  }

  private _renderDtekTable(options: {
    t: TranslationStrings;
    today: DayScheduleData;
    tomorrow: DayScheduleData;
    nowHour: number | null;
    nowMinuteRatio: number | null;
    selectedTodayHour: number | null;
    selectedTomorrowHour: number | null;
    showToday: boolean;
    showTomorrow: boolean;
  }): TemplateResult | typeof nothing {
    const {
      t,
      today,
      tomorrow,
      nowHour,
      nowMinuteRatio,
      selectedTodayHour,
      selectedTomorrowHour,
      showToday,
      showTomorrow,
    } = options;
    if (!showToday && !showTomorrow) return nothing;
    const hours = Array.from({ length: 24 }, (_, h) => h);
    const todaySlots = today.slots;
    const tomorrowSlots = tomorrow.published ? tomorrow.slots : null;

    return html`
      <div
        class="table-scroll"
        @mouseleave=${() => {
          this._hoverTarget = null;
        }}
      >
        <table class="dtek-table">
          ${renderDtekHeaderRow(t.hoursHeader, nowHour)}
          <tbody>
            ${
              showToday
                ? html`
                    <tr class="is-today-row">
                      <td class="dtek-day-cell today-highlight">
                        <span class="day-lbl-full"
                          >${t.today} ${formatDateShort(today.dateIso)}</span
                        >
                        <span class="day-lbl-short"
                          >${t.todayShort} ${formatDateShort(today.dateIso)}</span
                        >
                      </td>
                      ${
                        todaySlots
                          ? hours.map((h) =>
                              renderDtekHourCell({
                                slots: todaySlots,
                                hour: h,
                                isNowCol: nowHour !== null && h === nowHour,
                                isNowHour: nowHour !== null && h === nowHour,
                                isSelected: selectedTodayHour === h,
                                nowMinuteRatio:
                                  nowHour !== null && h === nowHour ? nowMinuteRatio : null,
                                onHover: (hour) => this._hoverDailyCell("today", hour),
                                onSelect: (hour) => this._toggleDailyCell("today", hour),
                              }),
                            )
                          : html`<td class="dtek-empty-row" colspan="24">${t.noSchedule}</td>`
                      }
                    </tr>
                  `
                : nothing
            }
            ${
              showTomorrow
                ? html`
                    <tr>
                      <td class="dtek-day-cell">
                        <span class="day-lbl-full"
                          >${t.tomorrow} ${formatDateShort(tomorrow.dateIso)}</span
                        >
                        <span class="day-lbl-short"
                          >${t.tomorrowShort} ${formatDateShort(tomorrow.dateIso)}</span
                        >
                      </td>
                      ${
                        tomorrowSlots
                          ? hours.map((h) =>
                              renderDtekHourCell({
                                slots: tomorrowSlots,
                                hour: h,
                                isNowCol: nowHour !== null && h === nowHour,
                                isNowHour: false,
                                isSelected: selectedTomorrowHour === h,
                                onHover: (hour) => this._hoverDailyCell("tomorrow", hour),
                                onSelect: (hour) => this._toggleDailyCell("tomorrow", hour),
                              }),
                            )
                          : html`<td class="dtek-empty-row" colspan="24">${t.noTomorrow}</td>`
                      }
                    </tr>
                  `
                : nothing
            }
          </tbody>
        </table>
      </div>
    `;
  }

  private _renderModernTileGrid(options: {
    slots: readonly SlotState[];
    gridMode: ModernGridMode;
    nowSlot: number;
    selectedHour?: number | null;
    mini?: boolean;
    interactive?: boolean;
    onHover?: (hour: number) => void;
    onSelect?: (hour: number) => void;
    onLeave?: () => void;
  }): TemplateResult {
    const hours = Array.from({ length: 24 }, (_, h) => h);
    const nowHour = options.nowSlot >= 0 ? Math.floor(options.nowSlot / 2) : -1;
    const nowHalf = options.nowSlot >= 0 ? options.nowSlot % 2 : -1;
    const clsFor = (ch: SlotState): string =>
      ch === "0" ? "slot-off" : ch === "?" ? "slot-maybe" : "slot-on";

    return html`
      <div
        class=${options.gridMode === "1x24" ? "grid-1x24" : "grid-2x12"}
        @mouseleave=${() => {
          if (options.interactive) options.onLeave?.();
        }}
      >
        ${hours.map((h) => {
          const s1 = options.slots[h * 2] ?? "1";
          const s2 = options.slots[h * 2 + 1] ?? "1";
          const isNow = h === nowHour;
          const isSelected = options.selectedHour === h;
          const label = options.gridMode === "1x24" ? String(h) : pad2(h);
          return html`
            <button
              type="button"
              class="hour-tile ${options.mini ? "mini" : ""} ${isNow ? "is-now" : ""} ${isSelected ? "is-selected" : ""}"
              aria-label="${pad2(h)}:00-${pad2(h + 1)}:00"
              @mouseenter=${() => {
                if (options.interactive) options.onHover?.(h);
              }}
              @click=${() => {
                if (options.interactive) options.onSelect?.(h);
              }}
            >
              <span
                class="half-slot ${clsFor(s1)} ${s1 !== s2 ? "split" : ""} ${isNow && nowHalf === 0 ? "now-half" : ""}"
              ></span>
              <span
                class="half-slot ${clsFor(s2)} ${isNow && nowHalf === 1 ? "now-half" : ""}"
              ></span>
              <span class="hour-badge">${label}</span>
            </button>
          `;
        })}
      </div>
    `;
  }

  private _renderConnection(
    t: TranslationStrings,
    entities: ResolvedEntities,
    todayData: DayScheduleData,
    timeZone: string,
  ): TemplateResult {
    const connEntity = entities.connection ? this.hass?.states[entities.connection] : undefined;
    const schedUpdEntity = entities.scheduleUpdated
      ? this.hass?.states[entities.scheduleUpdated]
      : undefined;

    let connState = connEntity?.state;
    if (!connState || connState === "unknown" || connState === "unavailable") {
      connState =
        todayData.dataStatus === "mirror"
          ? "mirror"
          : todayData.dataStatus === "stale"
            ? "offline"
            : "ok";
    }
    const dotClass = connState === "mirror" ? "mirror" : connState === "offline" ? "offline" : "ok";
    let label =
      connState === "mirror" ? t.connMirror : connState === "offline" ? t.connOffline : t.connOk;

    if (
      schedUpdEntity &&
      schedUpdEntity.state !== "unknown" &&
      schedUpdEntity.state !== "unavailable"
    ) {
      const ms = Date.parse(schedUpdEntity.state);
      if (!Number.isNaN(ms)) {
        label = `${label} • ${formatTimeHm(new Date(ms), timeZone)}`;
      }
    }

    return html`
      <div class="conn">
        <span class="dot ${dotClass}"></span>
        <span>${label}</span>
      </div>
    `;
  }

  private _renderTomorrowBlock(options: {
    t: TranslationStrings;
    style: CardStyle;
    tomorrow: DayScheduleData;
    gridMode: ModernGridMode;
    showChips: boolean;
    selectedHour: number | null;
  }): TemplateResult {
    const { t, style, tomorrow, gridMode, showChips, selectedHour } = options;
    return html`
      <div class="tmr-box">
        <div class="readout-row">
          <span class="section-lbl">${t.tomorrow}</span>
          <span class="section-lbl">
            ${tomorrow.published ? `${tomorrow.outageHours.toFixed(1)} ${t.hourUnit}` : "—"}
          </span>
        </div>
        ${
          tomorrow.published && tomorrow.slots
            ? html`
                ${
                  style === "timeline"
                    ? renderTimelineDailyBox({
                        slots: tomorrow.slots,
                        mini: true,
                        selectedHour,
                        onHoverHour: (h) => this._hoverDailyCell("tomorrow", h),
                        onSelectHour: (h) => this._toggleDailyCell("tomorrow", h),
                        onLeave: () => {
                          this._hoverTarget = null;
                        },
                      })
                    : this._renderModernTileGrid({
                        slots: tomorrow.slots,
                        gridMode,
                        nowSlot: -1,
                        selectedHour,
                        mini: true,
                        interactive: true,
                        onHover: (h) => this._hoverDailyCell("tomorrow", h),
                        onSelect: (h) => this._toggleDailyCell("tomorrow", h),
                        onLeave: () => {
                          this._hoverTarget = null;
                        },
                      })
                }
                ${showChips ? renderIntervalChips(tomorrow.slots, t, true) : nothing}
              `
            : html`<div class="tmr-unpublished">${t.noTomorrow}</div>`
        }
      </div>
    `;
  }

  protected render(): TemplateResult {
    const cfg = this._config;
    const hass = this.hass;
    const lang = resolveLanguage(cfg?.language, hass?.locale?.language ?? hass?.language);
    const t = getStrings(lang);

    if (!cfg || !hass) {
      return html`<ha-card><div class="empty-state">${t.noEntity}</div></ha-card>`;
    }

    const style: CardStyle = cfg.style ?? "dtek";
    const layout: CardLayout = cfg.layout ?? "full";
    const theme = resolveActiveTheme(cfg.theme, Boolean(hass.themes?.darkMode));
    this._syncHostAttributes(theme, layout);

    const entities = resolveDailyEntities(hass, cfg);
    const primaryId = entities.today;
    if (!primaryId || !hass.states[primaryId]) {
      return html`<ha-card><div class="empty-state">${t.noEntity}</div></ha-card>`;
    }

    const timeZone = hass.config?.time_zone || DEFAULT_TIMEZONE;
    const { dateIso: todayIso, slotIndex: nowSlot } = getLocalDateAndSlot(this._now, timeZone);
    const tomorrowIso = addDaysIso(todayIso, 1);

    const todayEntity = hass.states[primaryId];
    const tomorrowEntity = entities.tomorrow ? hass.states[entities.tomorrow] : undefined;
    const groupEntity = entities.group ? hass.states[entities.group] : undefined;
    const nextOutageEntity = entities.nextOutage ? hass.states[entities.nextOutage] : undefined;
    const outageEndEntity = entities.outageEnd ? hass.states[entities.outageEnd] : undefined;
    const scheduledOutageEntity = entities.scheduledOutage
      ? hass.states[entities.scheduledOutage]
      : undefined;
    const addressStatusEntity = entities.addressStatus
      ? hass.states[entities.addressStatus]
      : undefined;
    const restorationEntity = entities.restoration ? hass.states[entities.restoration] : undefined;

    const showPossible = cfg.show_possible !== false;
    const rawToday = extractDaySchedule(todayEntity, todayIso, timeZone);
    const rawTomorrow = extractDaySchedule(tomorrowEntity, tomorrowIso, timeZone);
    const today = showPossible ? rawToday : stripPossibleSlots(rawToday);
    const tomorrow = showPossible ? rawTomorrow : stripPossibleSlots(rawTomorrow);
    const timing = computeActiveTiming({
      today,
      tomorrow,
      now: this._now,
      nextOutageEntity,
      outageEndEntity,
      timeZone,
    });

    const isCompact = layout === "compact";
    const viewMode: CardViewMode = cfg.view_mode ?? "daily_only";
    const showDaily =
      viewMode === "daily_only" || viewMode === "both" || this._activeView === "today";
    const showWeekly =
      viewMode === "both" || (viewMode === "switchable" && this._activeView === "week");

    const showHeader = cfg.show_header !== false;
    const showGroupBadge = cfg.show_group_badge !== false;
    const resolveFullVis = (val: boolean | undefined): boolean =>
      val !== undefined ? val : !isCompact;
    const showRegion = resolveFullVis(cfg.show_region);
    const showConnection = cfg.show_connection !== false;
    const showCountdown = cfg.show_countdown !== false;
    const showAddressAlert = resolveFullVis(cfg.show_address_alert);
    const showReadout = cfg.show_readout !== false;
    const showNowLine = cfg.show_now_line !== false;
    const showToday = cfg.show_today !== false;
    const showTomorrow = resolveFullVis(cfg.show_tomorrow);
    const showIntervalsPref = resolveFullVis(cfg.show_intervals_text);
    const rawIntervalDisplay: IntervalDisplayMode = cfg.interval_display ?? "auto";
    const resolvedIntervalMode =
      !showIntervalsPref || rawIntervalDisplay === "none"
        ? "none"
        : rawIntervalDisplay === "auto"
          ? style === "timeline"
            ? "chips"
            : "text"
          : rawIntervalDisplay;
    const showChips = resolvedIntervalMode === "chips" || resolvedIntervalMode === "both";
    const showSummaryText = resolvedIntervalMode === "text" || resolvedIntervalMode === "both";
    const showLegend = resolveFullVis(cfg.show_legend);

    const groupVal =
      groupEntity && groupEntity.state !== "unknown" && groupEntity.state !== "unavailable"
        ? groupEntity.state
        : null;
    const title = resolveVisibleTitle(cfg.title, cfg.show_title, () =>
      cleanAutoTitle({
        friendlyName: todayEntity?.attributes.friendly_name,
        fallbackTitle: t.cardDefaultTitle,
        groupVal,
        showGroupBadge,
      }),
    );
    const regionStr =
      typeof groupEntity?.attributes.region === "string" ? groupEntity.attributes.region : "";
    const hasHeaderLeft =
      Boolean(title) || (showGroupBadge && Boolean(groupVal)) || (showRegion && Boolean(regionStr));

    const minuteInfo = getMinuteOfDay(this._now, timeZone);
    const nowTimeBadge = `${t.nowTag.toUpperCase()} ${pad2(minuteInfo.hour)}:${pad2(minuteInfo.minute)}`;
    const nowHour = Math.floor(nowSlot / 2);
    const activeTarget = this._hoverTarget ?? this._pinnedTarget;
    const selectedTodayHour = this._pinnedTarget?.day === "today" ? this._pinnedTarget.hour : null;
    const selectedTomorrowHour =
      this._pinnedTarget?.day === "tomorrow" ? this._pinnedTarget.hour : null;

    let readout = "";
    if (activeTarget?.day === "tomorrow" && tomorrow.published && tomorrow.slots) {
      readout = formatHourReadout({
        slots: tomorrow.slots,
        hour: activeTarget.hour,
        lang,
        prefix: t.tomorrow,
      });
    } else if (today.slots) {
      const hour = activeTarget?.day === "today" ? activeTarget.hour : nowHour;
      readout = formatHourReadout({
        slots: today.slots,
        hour,
        lang,
        tag: hour === nowHour ? t.nowTag : undefined,
      });
    }

    const summaryText = today.outagesText
      ? `${t.today}: ${today.outagesText} (${today.outageHours.toFixed(1)} ${t.hourUnit})`
      : `${t.today}: ${today.outageHours.toFixed(1)} ${t.hourUnit}`;

    const useYellowPill =
      style === "dtek" || theme === "dtek_light" || theme === "dtek_dark" || theme === "kiosk_dark";

    const connEntity = entities.connection ? hass.states[entities.connection] : undefined;
    const weeklyPlanDisabled = connEntity?.attributes.weekly_schedule_shown === false;
    const weeklyRows = showWeekly
      ? buildWeeklyMatrix({
          events: this._weeklyEvents,
          todayDate: this._now,
          todaySchedule: today,
          tomorrowSchedule: tomorrow,
          rowOrder: cfg.row_order ?? "mon_sun",
          timeZone,
          showPossible,
        })
      : [];

    const weeklyView: WeeklyViewMode = cfg.weekly_view ?? "auto";
    const mobileWeeklyView: MobileWeeklyViewMode = cfg.mobile_weekly_view ?? "list";
    const emptyDaysMode: EmptyDaysMode = cfg.empty_days_mode ?? "auto";

    return html`
      <ha-card>
        <div class="wrap">
          ${
            showHeader && (hasHeaderLeft || viewMode === "switchable" || showConnection)
              ? html`
                  <div class="header">
                    ${
                      hasHeaderLeft
                        ? html`
                            <div class="header-left">
                              ${
                                title || (showGroupBadge && groupVal)
                                  ? html`
                                      <div class="header-title-row">
                                        ${title ? html`<span class="title">${title}</span>` : nothing}
                                        ${
                                          showGroupBadge && groupVal
                                            ? html`<span
                                                class="badge-group ${useYellowPill ? "dtek-pill" : ""}"
                                                >${t.groupPrefix} ${groupVal}</span
                                              >`
                                            : nothing
                                        }
                                      </div>
                                    `
                                  : nothing
                              }
                              ${
                                showRegion && regionStr
                                  ? html`<span class="region">${regionStr}</span>`
                                  : nothing
                              }
                            </div>
                          `
                        : nothing
                    }
                    <div class="header-right">
                      ${
                        viewMode === "switchable"
                          ? html`
                              <div class="view-tabs" role="tablist">
                                <button
                                  type="button"
                                  role="tab"
                                  class="view-tab ${this._activeView === "today" ? "active" : ""}"
                                  aria-selected=${this._activeView === "today" ? "true" : "false"}
                                  @click=${() => {
                                    this._activeView = "today";
                                  }}
                                >
                                  ${t.viewToday}
                                </button>
                                <button
                                  type="button"
                                  role="tab"
                                  class="view-tab ${this._activeView === "week" ? "active" : ""}"
                                  aria-selected=${this._activeView === "week" ? "true" : "false"}
                                  @click=${() => {
                                    this._activeView = "week";
                                  }}
                                >
                                  ${t.viewWeek}
                                </button>
                              </div>
                            `
                          : nothing
                      }
                      ${showConnection ? this._renderConnection(t, entities, today, timeZone) : nothing}
                    </div>
                  </div>
                `
              : nothing
          }
          ${
            showCountdown
              ? this._renderHero({
                  t,
                  lang,
                  timing,
                  scheduledOutageEntity,
                  today,
                  timeZone,
                  isCompact,
                })
              : nothing
          }
          ${
            showAddressAlert
              ? this._renderAddressAlert(t, addressStatusEntity, restorationEntity, timeZone)
              : nothing
          }
          ${
            showDaily
              ? html`
                  ${
                    showToday && showReadout
                      ? html`
                          <div class="readout-row">
                            <span class="section-lbl">
                              ${t.today} (${today.outageHours.toFixed(1)} ${t.hourUnit})
                            </span>
                            ${readout ? html`<span class="hover-readout">${readout}</span>` : nothing}
                          </div>
                        `
                      : nothing
                  }
                  ${
                    style === "dtek"
                      ? this._renderDtekTable({
                          t,
                          today,
                          tomorrow,
                          nowHour: showNowLine ? nowHour : null,
                          nowMinuteRatio: showNowLine ? minuteInfo.minute / 60 : null,
                          selectedTodayHour,
                          selectedTomorrowHour,
                          showToday,
                          showTomorrow,
                        })
                      : html`
                          ${
                            showToday
                              ? html`
                                  ${
                                    today.slots
                                      ? style === "timeline"
                                        ? renderTimelineDailyBox({
                                            slots: today.slots,
                                            nowPercent: showNowLine ? minuteInfo.percent : null,
                                            nowTimeLabel: nowTimeBadge,
                                            showNowBadge: showNowLine,
                                            selectedHour: selectedTodayHour,
                                            onHoverHour: (h) => this._hoverDailyCell("today", h),
                                            onSelectHour: (h) => this._toggleDailyCell("today", h),
                                            onLeave: () => {
                                              this._hoverTarget = null;
                                            },
                                          })
                                        : this._renderModernTileGrid({
                                            slots: today.slots,
                                            gridMode: cfg.modern_grid ?? "2x12",
                                            nowSlot: showNowLine ? nowSlot : -1,
                                            selectedHour: selectedTodayHour,
                                            interactive: true,
                                            onHover: (h) => this._hoverDailyCell("today", h),
                                            onSelect: (h) => this._toggleDailyCell("today", h),
                                            onLeave: () => {
                                              this._hoverTarget = null;
                                            },
                                          })
                                      : html`<div class="tmr-unpublished">${t.noSchedule}</div>`
                                  }
                                  ${
                                    showChips && today.slots
                                      ? renderIntervalChips(today.slots, t, true)
                                      : nothing
                                  }
                                `
                              : nothing
                          }
                          ${
                            showTomorrow
                              ? this._renderTomorrowBlock({
                                  t,
                                  style,
                                  tomorrow,
                                  gridMode: cfg.modern_grid ?? "2x12",
                                  showChips,
                                  selectedHour: selectedTomorrowHour,
                                })
                              : nothing
                          }
                        `
                  }
                  ${
                    showSummaryText || showLegend
                      ? html`
                          <div class="footer">
                            ${showSummaryText ? html`<span>${summaryText}</span>` : html`<span></span>`}
                            ${
                              showLegend
                                ? style === "dtek"
                                  ? renderDtekLegend(t, false)
                                  : style === "timeline"
                                    ? renderTimelineLegend(
                                        t,
                                        showPossible && today.possibleHours > 0,
                                      )
                                    : html`
                                        <div class="legend">
                                          <span class="legend-item">
                                            <span class="legend-swatch slot-on"></span>
                                            <span>${t.legOn}</span>
                                          </span>
                                          <span class="legend-item">
                                            <span class="legend-swatch slot-off"></span>
                                            <span>${t.legOff}</span>
                                          </span>
                                          ${
                                            showPossible
                                              ? html`
                                                  <span class="legend-item">
                                                    <span class="legend-swatch slot-maybe"></span>
                                                    <span>${t.legMaybe}</span>
                                                  </span>
                                                `
                                              : nothing
                                          }
                                        </div>
                                      `
                                : nothing
                            }
                          </div>
                        `
                      : nothing
                  }
                `
              : nothing
          }
          ${
            showWeekly
              ? html`
                  <div class=${showDaily ? "week-divider" : ""}>
                    ${renderWeeklyScheduleContent({
                      rows: weeklyRows,
                      t,
                      lang,
                      weeklyView,
                      mobileWeeklyView,
                      emptyDaysMode,
                      preferBarsOnDesktop:
                        style === "timeline" || theme === "kiosk_dark" || theme === "oled_black",
                      nowHour,
                      nowMinuteRatio: minuteInfo.minute / 60,
                      nowPercent: minuteInfo.percent,
                      nowTimeBadge,
                      hoverCell: this._weeklyHoverCell ?? this._weeklyPinnedCell,
                      selectedCell: this._weeklyPinnedCell,
                      onHover: (cell) => {
                        this._weeklyHoverCell = cell;
                      },
                      onSelectCell: (cell) => this._toggleWeeklyCell(cell),
                      showReadout,
                      showNowLine,
                      showPossible,
                      showIntervals: resolvedIntervalMode !== "none",
                      showLegend,
                      weeklyPlanDisabled,
                    })}
                  </div>
                `
              : nothing
          }
        </div>
      </ha-card>
    `;
  }
}
