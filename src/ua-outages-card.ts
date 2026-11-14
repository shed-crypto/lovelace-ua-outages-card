import { LitElement, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { findDefaultPrimaryEntity, resolveDailyEntities } from "./discovery";
import { formatDuration, getStrings, resolveLanguage, TranslationStrings } from "./localize";
import {
  formatHourReadout,
  pad2,
  renderDtekHeaderRow,
  renderDtekHourCell,
  renderDtekLegend,
  resolveActiveTheme,
} from "./render-helpers";
import {
  addDaysIso,
  computeActiveTiming,
  DEFAULT_TIMEZONE,
  extractDaySchedule,
  formatDateShort,
  formatTimeHm,
  getLocalDateAndSlot,
} from "./schedule-parser";
import { cardStyles } from "./styles";
import {
  ActiveTimingInfo,
  CardLayout,
  CardStyle,
  CardTheme,
  DayScheduleData,
  HassEntity,
  HomeAssistant,
  LovelaceGridOptions,
  ModernGridMode,
  ResolvedEntities,
  SlotState,
  SupportedLanguage,
  UaOutagesCardConfig,
} from "./types";

const TICK_INTERVAL_MS = 30_000;

@customElement("ua-outages-card")
export class UaOutagesCard extends LitElement {
  static styles = cardStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: UaOutagesCardConfig;
  @state() private _now: Date = new Date();
  @state() private _hoverHour: number | null = null;

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
      modern_grid: "2x12",
      language: "auto",
      show_header: true,
      show_countdown: true,
      show_tomorrow: true,
      show_intervals_text: true,
      show_legend: true,
      ...config,
    };
    this._hoverHour = null;
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

  private _renderBatteryPill(t: TranslationStrings): TemplateResult | typeof nothing {
    const socEntityId = this._config?.battery_soc_entity?.trim();
    if (!socEntityId || !this.hass) return nothing;
    const entity = this.hass.states[socEntityId];
    if (!entity) return nothing;
    const soc = Number.parseFloat(entity.state);
    if (!Number.isFinite(soc)) return nothing;
    const rounded = Math.max(0, Math.min(100, Math.round(soc)));
    const low = rounded <= 20;
    return html`
      <span class="battery-pill ${low ? "low" : ""}"> ${t.batteryLabel} ${rounded}% </span>
    `;
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

    const showBattery = !isCompact ? this._renderBatteryPill(t) : nothing;
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

  private _renderDtekTable(options: {
    t: TranslationStrings;
    today: DayScheduleData;
    tomorrow: DayScheduleData;
    nowHour: number;
    showTomorrow: boolean;
  }): TemplateResult {
    const { t, today, tomorrow, nowHour, showTomorrow } = options;
    const hours = Array.from({ length: 24 }, (_, h) => h);
    const onSelect = (h: number): void => {
      this._hoverHour = h;
    };
    const todaySlots = today.slots;
    const tomorrowSlots = tomorrow.published ? tomorrow.slots : null;

    return html`
      <div class="table-scroll" @mouseleave=${() => (this._hoverHour = null)}>
        <table class="dtek-table">
          ${renderDtekHeaderRow(t.hoursHeader)}
          <tbody>
            <tr>
              <td class="dtek-day-cell">${t.today} ${formatDateShort(today.dateIso)}</td>
              ${
                todaySlots
                  ? hours.map((h) =>
                      renderDtekHourCell({
                        slots: todaySlots,
                        hour: h,
                        isNowHour: h === nowHour,
                        onSelect,
                      }),
                    )
                  : html`<td class="dtek-empty-row" colspan="24">${t.noSchedule}</td>`
              }
            </tr>
            ${
              showTomorrow
                ? html`
                    <tr>
                      <td class="dtek-day-cell">
                        ${t.tomorrow} ${formatDateShort(tomorrow.dateIso)}
                      </td>
                      ${
                        tomorrowSlots
                          ? hours.map((h) =>
                              renderDtekHourCell({
                                slots: tomorrowSlots,
                                hour: h,
                                isNowHour: false,
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
    mini?: boolean;
    interactive?: boolean;
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
          if (options.interactive) this._hoverHour = null;
        }}
      >
        ${hours.map((h) => {
          const s1 = options.slots[h * 2] ?? "1";
          const s2 = options.slots[h * 2 + 1] ?? "1";
          const isNow = h === nowHour;
          const label = options.gridMode === "1x24" ? String(h) : pad2(h);
          return html`
            <button
              type="button"
              class="hour-tile ${options.mini ? "mini" : ""} ${isNow ? "is-now" : ""}"
              aria-label="${pad2(h)}:00-${pad2(h + 1)}:00"
              @mouseenter=${() => {
                if (options.interactive) this._hoverHour = h;
              }}
              @click=${() => {
                if (options.interactive) this._hoverHour = h;
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

    const today = extractDaySchedule(todayEntity, todayIso, timeZone);
    const tomorrow = extractDaySchedule(tomorrowEntity, tomorrowIso, timeZone);
    const timing = computeActiveTiming({
      today,
      tomorrow,
      now: this._now,
      nextOutageEntity,
      outageEndEntity,
      timeZone,
    });

    const isCompact = layout === "compact";
    const showHeader = cfg.show_header !== false;
    const showCountdown = cfg.show_countdown !== false;
    const showTomorrow = !isCompact && cfg.show_tomorrow !== false;
    const showIntervalsText = !isCompact && cfg.show_intervals_text !== false;
    const showLegend = !isCompact && cfg.show_legend !== false;

    const title =
      cfg.title ||
      (typeof todayEntity?.attributes.friendly_name === "string"
        ? todayEntity.attributes.friendly_name.replace(
            /\s+(Outages today|Відключень сьогодні|Отключений сегодня)$/i,
            "",
          )
        : t.cardDefaultTitle);
    const groupVal =
      groupEntity && groupEntity.state !== "unknown" && groupEntity.state !== "unavailable"
        ? groupEntity.state
        : null;
    const regionStr =
      typeof groupEntity?.attributes.region === "string" ? groupEntity.attributes.region : "";

    const nowHour = Math.floor(nowSlot / 2);
    const activeHour = this._hoverHour ?? nowHour;
    const readout = today.slots
      ? formatHourReadout({
          slots: today.slots,
          hour: activeHour,
          lang,
          tag: activeHour === nowHour ? t.nowTag : undefined,
        })
      : "";

    const summaryText = today.outagesText
      ? `${t.today}: ${today.outagesText} (${today.outageHours.toFixed(1)} ${t.hourUnit})`
      : `${t.today}: ${today.outageHours.toFixed(1)} ${t.hourUnit}`;

    const useYellowPill = style === "dtek" || theme === "dtek_light" || theme === "dtek_dark";

    return html`
      <ha-card>
        <div class="wrap">
          ${
            showHeader
              ? html`
                  <div class="header">
                    <div class="header-left">
                      <span class="title">${title}</span>
                      ${
                        groupVal
                          ? html`<span class="badge-group ${useYellowPill ? "dtek-pill" : ""}"
                              >${t.groupPrefix} ${groupVal}</span
                            >`
                          : nothing
                      }
                      ${
                        regionStr && !isCompact
                          ? html`<span class="region">${regionStr}</span>`
                          : nothing
                      }
                    </div>
                    ${this._renderConnection(t, entities, today, timeZone)}
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
            !isCompact
              ? this._renderAddressAlert(t, addressStatusEntity, restorationEntity, timeZone)
              : nothing
          }

          <div class="readout-row">
            <span class="section-lbl">
              ${t.today} (${today.outageHours.toFixed(1)} ${t.hourUnit})
            </span>
            ${readout ? html`<span class="hover-readout">${readout}</span>` : nothing}
          </div>

          ${
            style === "dtek"
              ? this._renderDtekTable({ t, today, tomorrow, nowHour, showTomorrow })
              : html`
                  ${
                    today.slots
                      ? this._renderModernTileGrid({
                          slots: today.slots,
                          gridMode: cfg.modern_grid ?? "2x12",
                          nowSlot,
                          interactive: true,
                        })
                      : html`<div class="tmr-unpublished">${t.noSchedule}</div>`
                  }
                  ${
                    showTomorrow
                      ? html`
                          <div class="tmr-box">
                            <div class="readout-row">
                              <span class="section-lbl">${t.tomorrow}</span>
                              <span class="section-lbl">
                                ${
                                  tomorrow.published
                                    ? `${tomorrow.outageHours.toFixed(1)} ${t.hourUnit}`
                                    : "—"
                                }
                              </span>
                            </div>
                            ${
                              tomorrow.published && tomorrow.slots
                                ? this._renderModernTileGrid({
                                    slots: tomorrow.slots,
                                    gridMode: cfg.modern_grid ?? "2x12",
                                    nowSlot: -1,
                                    mini: true,
                                  })
                                : html`<div class="tmr-unpublished">${t.noTomorrow}</div>`
                            }
                          </div>
                        `
                      : nothing
                  }
                `
          }
          ${
            showIntervalsText || showLegend
              ? html`
                  <div class="footer">
                    ${showIntervalsText ? html`<span>${summaryText}</span>` : html`<span></span>`}
                    ${
                      showLegend
                        ? style === "dtek"
                          ? renderDtekLegend(t, false)
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
                                <span class="legend-item">
                                  <span class="legend-swatch slot-maybe"></span>
                                  <span>${t.legMaybe}</span>
                                </span>
                              </div>
                            `
                        : nothing
                    }
                  </div>
                `
              : nothing
          }
        </div>
      </ha-card>
    `;
  }
}
