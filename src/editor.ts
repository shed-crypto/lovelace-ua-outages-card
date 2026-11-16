import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getStrings, resolveLanguage, TranslationStrings } from "./localize";
import {
  ActiveScheduleView,
  CardLanguage,
  CardLayout,
  CardStyle,
  CardTheme,
  CardViewMode,
  EmptyDaysMode,
  HomeAssistant,
  IntervalDisplayMode,
  MobileWeeklyViewMode,
  ModernGridMode,
  UaOutagesCardConfig,
  UaOutagesWeeklyCardConfig,
  WeeklyRowOrder,
  WeeklyViewMode,
} from "./types";

const editorStyles = css`
  :host {
    display: block;
    color: var(--primary-text-color, #1f2937);
    font-size: 13px;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  @media (max-width: 500px) {
    .row-2 {
      grid-template-columns: 1fr;
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  label {
    font-size: 12px;
    font-weight: 600;
    color: var(--secondary-text-color, #6b7280);
  }

  input[type="text"],
  input[type="number"],
  select {
    width: 100%;
    box-sizing: border-box;
    padding: 8px 10px;
    border-radius: 6px;
    border: 1px solid var(--divider-color, #cbd5e1);
    background: var(--card-background-color, #ffffff);
    color: var(--primary-text-color, #1f2937);
    font: inherit;
  }

  .toggles {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 12px;
  }

  @media (max-width: 500px) {
    .toggles {
      grid-template-columns: 1fr;
    }
  }

  .toggle-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: var(--primary-text-color, #1f2937);
    cursor: pointer;
  }

  details {
    border: 1px solid var(--divider-color, #cbd5e1);
    border-radius: 8px;
    padding: 8px 10px;
  }

  summary {
    cursor: pointer;
    font-weight: 600;
    font-size: 12px;
    color: var(--secondary-text-color, #6b7280);
  }

  details .form,
  details .toggles {
    margin-top: 10px;
  }
`;

function emitConfigChanged<T>(host: HTMLElement, config: T): void {
  const cleaned: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(config as Record<string, unknown>)) {
    if (val !== undefined && val !== "") {
      cleaned[key] = val;
    }
  }
  host.dispatchEvent(
    new CustomEvent("config-changed", {
      detail: { config: cleaned },
      bubbles: true,
      composed: true,
    }),
  );
}

function listEntities(
  hass: HomeAssistant | undefined,
  domainFilter: readonly string[],
): Array<{ id: string; label: string }> {
  if (!hass) return [];
  const items: Array<{ id: string; label: string }> = [];
  for (const entity of Object.values(hass.states)) {
    if (!entity) continue;
    const domain = entity.entity_id.split(".")[0];
    if (!domainFilter.includes(domain)) continue;
    const name =
      typeof entity.attributes.friendly_name === "string" ? entity.attributes.friendly_name : "";
    items.push({
      id: entity.entity_id,
      label: name ? `${name} (${entity.entity_id})` : entity.entity_id,
    });
  }
  return items.sort((a, b) => a.id.localeCompare(b.id));
}

function renderEntityInput(options: {
  hass: HomeAssistant | undefined;
  field: string;
  labelText: string;
  value: string;
  domains: readonly string[];
  listId: string;
  onChange: (value: string | undefined) => void;
}): TemplateResult {
  const entities = listEntities(options.hass, options.domains);
  return html`
    <div class="field">
      <label>${options.labelText}</label>
      <input
        type="text"
        data-field=${options.field}
        list="${options.listId}"
        .value=${options.value}
        @change=${(ev: Event) => {
          const target = ev.target as HTMLInputElement;
          options.onChange(target.value.trim() || undefined);
        }}
      />
      <datalist id="${options.listId}">
        ${entities.map((opt) => html`<option value="${opt.id}">${opt.label}</option>`)}
      </datalist>
    </div>
  `;
}

function renderSelectField<T extends string>(options: {
  field: string;
  labelText: string;
  value: T;
  choices: ReadonlyArray<{ value: T; label: string }>;
  onChange: (value: T) => void;
}): TemplateResult {
  return html`
    <div class="field">
      <label>${options.labelText}</label>
      <select
        data-field=${options.field}
        .value=${options.value}
        @change=${(ev: Event) => options.onChange((ev.target as HTMLSelectElement).value as T)}
      >
        ${options.choices.map((c) => html`<option value=${c.value}>${c.label}</option>`)}
      </select>
    </div>
  `;
}

function renderCheckboxInput(options: {
  field: string;
  labelText: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}): TemplateResult {
  return html`
    <label class="toggle-item">
      <input
        type="checkbox"
        data-field=${options.field}
        .checked=${options.checked}
        @change=${(ev: Event) => options.onChange((ev.target as HTMLInputElement).checked)}
      />
      <span>${options.labelText}</span>
    </label>
  `;
}

function themeChoices(
  ed: TranslationStrings["editor"],
): Array<{ value: CardTheme; label: string }> {
  return [
    { value: "auto", label: ed.themeAuto },
    { value: "dtek_light", label: ed.themeDtekLight },
    { value: "dtek_dark", label: ed.themeDtekDark },
    { value: "kiosk_dark", label: ed.themeKioskDark },
    { value: "oled_black", label: ed.themeOledBlack },
  ];
}

function layoutChoices(
  ed: TranslationStrings["editor"],
): Array<{ value: CardLayout; label: string }> {
  return [
    { value: "full", label: ed.layoutFull },
    { value: "compact", label: ed.layoutCompact },
    { value: "kiosk", label: ed.layoutKiosk },
  ];
}

function languageChoices(
  ed: TranslationStrings["editor"],
): Array<{ value: CardLanguage; label: string }> {
  return [
    { value: "auto", label: ed.langAuto },
    { value: "uk", label: "Українська" },
    { value: "en", label: "English" },
    { value: "ru", label: "Русский" },
  ];
}

function weeklyViewChoices(
  ed: TranslationStrings["editor"],
): Array<{ value: WeeklyViewMode; label: string }> {
  return [
    { value: "auto", label: ed.weeklyAuto },
    { value: "timeline_bars", label: ed.weeklyBars },
    { value: "table", label: ed.weeklyTable },
    { value: "list", label: ed.weeklyList },
  ];
}

function mobileWeeklyChoices(
  ed: TranslationStrings["editor"],
): Array<{ value: MobileWeeklyViewMode; label: string }> {
  return [
    { value: "list", label: ed.mobileWeeklyList },
    { value: "compact_bars", label: ed.mobileWeeklyBars },
  ];
}

function emptyDaysChoices(
  ed: TranslationStrings["editor"],
): Array<{ value: EmptyDaysMode; label: string }> {
  return [
    { value: "compact_empty", label: ed.emptyDaysCompact },
    { value: "hide_unscheduled", label: ed.emptyDaysHide },
    { value: "show_all", label: ed.emptyDaysShowAll },
  ];
}

function rowOrderChoices(
  ed: TranslationStrings["editor"],
): Array<{ value: WeeklyRowOrder; label: string }> {
  return [
    { value: "mon_sun", label: ed.rowOrderMonSun },
    { value: "rolling", label: ed.rowOrderRolling },
  ];
}

@customElement("ua-outages-card-editor")
export class UaOutagesCardEditor extends LitElement {
  static styles = editorStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: UaOutagesCardConfig = { type: "custom:ua-outages-card" };

  public setConfig(config: UaOutagesCardConfig): void {
    this._config = { ...config };
  }

  private _update<K extends keyof UaOutagesCardConfig>(
    key: K,
    value: UaOutagesCardConfig[K],
  ): void {
    const next: UaOutagesCardConfig = { ...this._config, [key]: value };
    this._config = next;
    emitConfigChanged(this, next);
  }

  private _entityField(
    labelText: string,
    key: keyof UaOutagesCardConfig,
    domains: readonly string[],
    listId: string,
  ): TemplateResult {
    const val = typeof this._config[key] === "string" ? (this._config[key] as string) : "";
    return renderEntityInput({
      hass: this.hass,
      field: String(key),
      labelText,
      value: val,
      domains,
      listId,
      onChange: (v) => this._update(key, v as never),
    });
  }

  protected render(): TemplateResult {
    const lang = resolveLanguage(
      this._config.language,
      this.hass?.locale?.language ?? this.hass?.language,
    );
    const ed = getStrings(lang).editor;
    const style = this._config.style ?? "dtek";
    const viewMode = this._config.view_mode ?? "daily_only";
    const weeklyView = this._config.weekly_view ?? "auto";

    return html`
      <div class="form">
        ${this._entityField(
          ed.entity,
          "entity",
          ["sensor", "calendar", "binary_sensor"],
          "ua-primary-list",
        )}
        <div class="field">
          <label>${ed.title}</label>
          <input
            type="text"
            data-field="title"
            .value=${this._config.title ?? ""}
            @change=${(ev: Event) => {
              const target = ev.target as HTMLInputElement;
              this._update("title", target.value.trim() || undefined);
            }}
          />
        </div>

        <div class="row-2">
          ${renderSelectField<CardStyle>({
            field: "style",
            labelText: ed.style,
            value: style,
            choices: [
              { value: "dtek", label: ed.styleDtek },
              { value: "modern", label: ed.styleModern },
              { value: "timeline", label: ed.styleTimeline },
            ],
            onChange: (v) => this._update("style", v),
          })}
          ${renderSelectField<CardTheme>({
            field: "theme",
            labelText: ed.theme,
            value: this._config.theme ?? "auto",
            choices: themeChoices(ed),
            onChange: (v) => this._update("theme", v),
          })}
        </div>

        <div class="row-2">
          ${renderSelectField<CardLayout>({
            field: "layout",
            labelText: ed.layout,
            value: this._config.layout ?? "full",
            choices: layoutChoices(ed),
            onChange: (v) => this._update("layout", v),
          })}
          ${renderSelectField<CardLanguage>({
            field: "language",
            labelText: ed.language,
            value: this._config.language ?? "auto",
            choices: languageChoices(ed),
            onChange: (v) => this._update("language", v),
          })}
        </div>

        <div class="row-2">
          ${renderSelectField<CardViewMode>({
            field: "view_mode",
            labelText: ed.viewMode,
            value: viewMode,
            choices: [
              { value: "daily_only", label: ed.viewModeDailyOnly },
              { value: "switchable", label: ed.viewModeSwitchable },
              { value: "both", label: ed.viewModeBoth },
            ],
            onChange: (v) => this._update("view_mode", v),
          })}
          ${renderSelectField<IntervalDisplayMode>({
            field: "interval_display",
            labelText: ed.intervalDisplay,
            value: this._config.interval_display ?? "auto",
            choices: [
              { value: "auto", label: ed.intervalAuto },
              { value: "chips", label: ed.intervalChips },
              { value: "text", label: ed.intervalText },
              { value: "both", label: ed.intervalBoth },
              { value: "none", label: ed.intervalNone },
            ],
            onChange: (v) => this._update("interval_display", v),
          })}
        </div>

        ${
          style === "modern"
            ? renderSelectField<ModernGridMode>({
                field: "modern_grid",
                labelText: ed.modernGrid,
                value: this._config.modern_grid ?? "2x12",
                choices: [
                  { value: "2x12", label: "2×12" },
                  { value: "1x24", label: "1×24" },
                ],
                onChange: (v) => this._update("modern_grid", v),
              })
            : nothing
        }
        ${
          viewMode !== "daily_only"
            ? html`
                <div class="row-2">
                  ${
                    viewMode === "switchable"
                      ? renderSelectField<ActiveScheduleView>({
                          field: "default_view",
                          labelText: ed.defaultView,
                          value: this._config.default_view ?? "today",
                          choices: [
                            { value: "today", label: getStrings(lang).viewToday },
                            { value: "week", label: getStrings(lang).viewWeek },
                          ],
                          onChange: (v) => this._update("default_view", v),
                        })
                      : nothing
                  }
                  ${renderSelectField<WeeklyViewMode>({
                    field: "weekly_view",
                    labelText: ed.weeklyView,
                    value: weeklyView,
                    choices: weeklyViewChoices(ed),
                    onChange: (v) => this._update("weekly_view", v),
                  })}
                </div>
                <div class="row-2">
                  ${
                    weeklyView === "auto"
                      ? renderSelectField<MobileWeeklyViewMode>({
                          field: "mobile_weekly_view",
                          labelText: ed.mobileWeeklyView,
                          value: this._config.mobile_weekly_view ?? "list",
                          choices: mobileWeeklyChoices(ed),
                          onChange: (v) => this._update("mobile_weekly_view", v),
                        })
                      : renderSelectField<WeeklyRowOrder>({
                          field: "row_order",
                          labelText: ed.rowOrder,
                          value: this._config.row_order ?? "mon_sun",
                          choices: rowOrderChoices(ed),
                          onChange: (v) => this._update("row_order", v),
                        })
                  }
                  ${renderSelectField<EmptyDaysMode>({
                    field: "empty_days_mode",
                    labelText: ed.emptyDaysMode,
                    value: this._config.empty_days_mode ?? "compact_empty",
                    choices: emptyDaysChoices(ed),
                    onChange: (v) => this._update("empty_days_mode", v),
                  })}
                </div>
                ${
                  weeklyView === "auto"
                    ? renderSelectField<WeeklyRowOrder>({
                        field: "row_order",
                        labelText: ed.rowOrder,
                        value: this._config.row_order ?? "mon_sun",
                        choices: rowOrderChoices(ed),
                        onChange: (v) => this._update("row_order", v),
                      })
                    : nothing
                }
              `
            : nothing
        }

        <details>
          <summary>${ed.sectionBattery}</summary>
          <div class="form">
            ${this._entityField(
              ed.batteryEntity,
              "battery_soc_entity",
              ["sensor"],
              "ua-battery-list",
            )}
            <div class="row-2">
              ${this._entityField(
                ed.batteryRuntimeEntity,
                "battery_runtime_entity",
                ["sensor"],
                "ua-bat-rt-list",
              )}
              <div class="field">
                <label>${ed.batteryLowThreshold}</label>
                <input
                  type="number"
                  min="1"
                  max="99"
                  data-field="battery_low_threshold"
                  .value=${String(this._config.battery_low_threshold ?? 20)}
                  @change=${(ev: Event) => {
                    const num = Number((ev.target as HTMLInputElement).value);
                    this._update(
                      "battery_low_threshold",
                      Number.isFinite(num) ? Math.min(99, Math.max(1, num)) : undefined,
                    );
                  }}
                />
              </div>
            </div>
          </div>
        </details>

        <details open>
          <summary>${ed.sectionVisibility}</summary>
          <div class="toggles">
            ${renderCheckboxInput({
              field: "show_header",
              labelText: ed.showHeader,
              checked: this._config.show_header !== false,
              onChange: (c) => this._update("show_header", c),
            })}
            ${renderCheckboxInput({
              field: "show_group_badge",
              labelText: ed.showGroupBadge,
              checked: this._config.show_group_badge !== false,
              onChange: (c) => this._update("show_group_badge", c),
            })}
            ${renderCheckboxInput({
              field: "show_region",
              labelText: ed.showRegion,
              checked: this._config.show_region !== false,
              onChange: (c) => this._update("show_region", c),
            })}
            ${renderCheckboxInput({
              field: "show_connection",
              labelText: ed.showConnection,
              checked: this._config.show_connection !== false,
              onChange: (c) => this._update("show_connection", c),
            })}
            ${renderCheckboxInput({
              field: "show_countdown",
              labelText: ed.showCountdown,
              checked: this._config.show_countdown !== false,
              onChange: (c) => this._update("show_countdown", c),
            })}
            ${renderCheckboxInput({
              field: "show_now_line",
              labelText: ed.showNowLine,
              checked: this._config.show_now_line !== false,
              onChange: (c) => this._update("show_now_line", c),
            })}
            ${renderCheckboxInput({
              field: "show_tomorrow",
              labelText: ed.showTomorrow,
              checked: this._config.show_tomorrow !== false,
              onChange: (c) => this._update("show_tomorrow", c),
            })}
            ${renderCheckboxInput({
              field: "show_intervals_text",
              labelText: ed.showIntervalsText,
              checked: this._config.show_intervals_text !== false,
              onChange: (c) => this._update("show_intervals_text", c),
            })}
            ${renderCheckboxInput({
              field: "show_legend",
              labelText: ed.showLegend,
              checked: this._config.show_legend !== false,
              onChange: (c) => this._update("show_legend", c),
            })}
          </div>
        </details>

        <details>
          <summary>${ed.advancedOverrides}</summary>
          <div class="form">
            ${this._entityField(
              ed.calendarEntity,
              "calendar_entity",
              ["calendar"],
              "ua-daily-cal-list",
            )}
            ${this._entityField(ed.tomorrowEntity, "tomorrow_entity", ["sensor"], "ua-tmr-list")}
            ${this._entityField(ed.groupEntity, "group_entity", ["sensor"], "ua-grp-list")}
            ${this._entityField(
              ed.nextOutageEntity,
              "next_outage_entity",
              ["sensor"],
              "ua-nxt-list",
            )}
            ${this._entityField(ed.outageEndEntity, "outage_end_entity", ["sensor"], "ua-end-list")}
            ${this._entityField(
              ed.scheduledOutageEntity,
              "scheduled_outage_entity",
              ["binary_sensor"],
              "ua-sched-list",
            )}
            ${this._entityField(
              ed.addressStatusEntity,
              "address_status_entity",
              ["sensor"],
              "ua-addr-list",
            )}
            ${this._entityField(
              ed.restorationEntity,
              "restoration_entity",
              ["sensor"],
              "ua-rest-list",
            )}
            ${this._entityField(
              ed.connectionEntity,
              "connection_entity",
              ["sensor"],
              "ua-conn-list",
            )}
          </div>
        </details>
      </div>
    `;
  }
}

@customElement("ua-outages-weekly-card-editor")
export class UaOutagesWeeklyCardEditor extends LitElement {
  static styles = editorStyles;

  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config: UaOutagesWeeklyCardConfig = { type: "custom:ua-outages-weekly-card" };

  public setConfig(config: UaOutagesWeeklyCardConfig): void {
    this._config = { ...config };
  }

  private _update<K extends keyof UaOutagesWeeklyCardConfig>(
    key: K,
    value: UaOutagesWeeklyCardConfig[K],
  ): void {
    const next: UaOutagesWeeklyCardConfig = { ...this._config, [key]: value };
    this._config = next;
    emitConfigChanged(this, next);
  }

  private _entityField(
    labelText: string,
    key: keyof UaOutagesWeeklyCardConfig,
    domains: readonly string[],
    listId: string,
  ): TemplateResult {
    const val = typeof this._config[key] === "string" ? (this._config[key] as string) : "";
    return renderEntityInput({
      hass: this.hass,
      field: String(key),
      labelText,
      value: val,
      domains,
      listId,
      onChange: (v) => this._update(key, v as never),
    });
  }

  protected render(): TemplateResult {
    const lang = resolveLanguage(
      this._config.language,
      this.hass?.locale?.language ?? this.hass?.language,
    );
    const ed = getStrings(lang).editor;
    const weeklyView = this._config.weekly_view ?? "auto";

    return html`
      <div class="form">
        ${this._entityField(ed.entity, "entity", ["calendar", "sensor"], "ua-weekly-primary")}

        <div class="field">
          <label>${ed.title}</label>
          <input
            type="text"
            data-field="title"
            .value=${this._config.title ?? ""}
            @change=${(ev: Event) =>
              this._update("title", (ev.target as HTMLInputElement).value.trim() || undefined)}
          />
        </div>

        <div class="row-2">
          ${renderSelectField<WeeklyViewMode>({
            field: "weekly_view",
            labelText: ed.weeklyView,
            value: weeklyView,
            choices: weeklyViewChoices(ed),
            onChange: (v) => this._update("weekly_view", v),
          })}
          ${renderSelectField<CardTheme>({
            field: "theme",
            labelText: ed.theme,
            value: this._config.theme ?? "auto",
            choices: themeChoices(ed),
            onChange: (v) => this._update("theme", v),
          })}
        </div>

        <div class="row-2">
          ${renderSelectField<CardLayout>({
            field: "layout",
            labelText: ed.layout,
            value: this._config.layout ?? "full",
            choices: layoutChoices(ed),
            onChange: (v) => this._update("layout", v),
          })}
          ${renderSelectField<CardLanguage>({
            field: "language",
            labelText: ed.language,
            value: this._config.language ?? "auto",
            choices: languageChoices(ed),
            onChange: (v) => this._update("language", v),
          })}
        </div>

        <div class="row-2">
          ${
            weeklyView === "auto"
              ? renderSelectField<MobileWeeklyViewMode>({
                  field: "mobile_weekly_view",
                  labelText: ed.mobileWeeklyView,
                  value: this._config.mobile_weekly_view ?? "list",
                  choices: mobileWeeklyChoices(ed),
                  onChange: (v) => this._update("mobile_weekly_view", v),
                })
              : renderSelectField<WeeklyRowOrder>({
                  field: "row_order",
                  labelText: ed.rowOrder,
                  value: this._config.row_order ?? "mon_sun",
                  choices: rowOrderChoices(ed),
                  onChange: (v) => this._update("row_order", v),
                })
          }
          ${renderSelectField<EmptyDaysMode>({
            field: "empty_days_mode",
            labelText: ed.emptyDaysMode,
            value: this._config.empty_days_mode ?? "compact_empty",
            choices: emptyDaysChoices(ed),
            onChange: (v) => this._update("empty_days_mode", v),
          })}
        </div>

        ${
          weeklyView === "auto"
            ? renderSelectField<WeeklyRowOrder>({
                field: "row_order",
                labelText: ed.rowOrder,
                value: this._config.row_order ?? "mon_sun",
                choices: rowOrderChoices(ed),
                onChange: (v) => this._update("row_order", v),
              })
            : nothing
        }

        <details open>
          <summary>${ed.sectionVisibility}</summary>
          <div class="toggles">
            ${renderCheckboxInput({
              field: "show_header",
              labelText: ed.showHeader,
              checked: this._config.show_header !== false,
              onChange: (c) => this._update("show_header", c),
            })}
            ${renderCheckboxInput({
              field: "show_group_badge",
              labelText: ed.showGroupBadge,
              checked: this._config.show_group_badge !== false,
              onChange: (c) => this._update("show_group_badge", c),
            })}
            ${renderCheckboxInput({
              field: "show_now_line",
              labelText: ed.showNowLine,
              checked: this._config.show_now_line !== false,
              onChange: (c) => this._update("show_now_line", c),
            })}
            ${renderCheckboxInput({
              field: "show_intervals_text",
              labelText: ed.showIntervalsText,
              checked: this._config.show_intervals_text !== false,
              onChange: (c) => this._update("show_intervals_text", c),
            })}
            ${renderCheckboxInput({
              field: "show_legend",
              labelText: ed.showLegend,
              checked: this._config.show_legend !== false,
              onChange: (c) => this._update("show_legend", c),
            })}
          </div>
        </details>

        <details>
          <summary>${ed.advancedOverrides}</summary>
          <div class="form">
            ${this._entityField(ed.calendarEntity, "calendar_entity", ["calendar"], "ua-wcal-list")}
            ${this._entityField(ed.todayEntity, "today_entity", ["sensor"], "ua-wtoday-list")}
            ${this._entityField(ed.tomorrowEntity, "tomorrow_entity", ["sensor"], "ua-wtmr-list")}
            ${this._entityField(ed.groupEntity, "group_entity", ["sensor"], "ua-wgrp-list")}
            ${this._entityField(
              ed.connectionEntity,
              "connection_entity",
              ["sensor"],
              "ua-wconn-list",
            )}
          </div>
        </details>
      </div>
    `;
  }
}
