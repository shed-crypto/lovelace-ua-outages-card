import { LitElement, css, html, nothing, TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { getStrings, resolveLanguage } from "./localize";
import {
  CardLanguage,
  CardLayout,
  CardStyle,
  CardTheme,
  HomeAssistant,
  ModernGridMode,
  UaOutagesCardConfig,
  UaOutagesWeeklyCardConfig,
  WeeklyRowOrder,
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
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 4px;
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

  details .form {
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

function renderCheckboxInput(options: {
  labelText: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}): TemplateResult {
  return html`
    <label class="toggle-item">
      <input
        type="checkbox"
        .checked=${options.checked}
        @change=${(ev: Event) => options.onChange((ev.target as HTMLInputElement).checked)}
      />
      <span>${options.labelText}</span>
    </label>
  `;
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
            .value=${this._config.title ?? ""}
            @change=${(ev: Event) => {
              const target = ev.target as HTMLInputElement;
              this._update("title", target.value.trim() || undefined);
            }}
          />
        </div>

        <div class="row-2">
          <div class="field">
            <label>${ed.style}</label>
            <select
              .value=${style}
              @change=${(ev: Event) =>
                this._update("style", (ev.target as HTMLSelectElement).value as CardStyle)}
            >
              <option value="dtek">${ed.styleDtek}</option>
              <option value="modern">${ed.styleModern}</option>
            </select>
          </div>

          <div class="field">
            <label>${ed.theme}</label>
            <select
              .value=${this._config.theme ?? "auto"}
              @change=${(ev: Event) =>
                this._update("theme", (ev.target as HTMLSelectElement).value as CardTheme)}
            >
              <option value="auto">${ed.themeAuto}</option>
              <option value="dtek_light">${ed.themeDtekLight}</option>
              <option value="dtek_dark">${ed.themeDtekDark}</option>
            </select>
          </div>
        </div>

        <div class="row-2">
          <div class="field">
            <label>${ed.layout}</label>
            <select
              .value=${this._config.layout ?? "full"}
              @change=${(ev: Event) =>
                this._update("layout", (ev.target as HTMLSelectElement).value as CardLayout)}
            >
              <option value="full">${ed.layoutFull}</option>
              <option value="compact">${ed.layoutCompact}</option>
              <option value="kiosk">${ed.layoutKiosk}</option>
            </select>
          </div>

          <div class="field">
            <label>${ed.language}</label>
            <select
              .value=${this._config.language ?? "auto"}
              @change=${(ev: Event) =>
                this._update("language", (ev.target as HTMLSelectElement).value as CardLanguage)}
            >
              <option value="auto">${ed.langAuto}</option>
              <option value="uk">Українська</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </div>
        </div>

        ${
          style === "modern"
            ? html`
                <div class="field">
                  <label>${ed.modernGrid}</label>
                  <select
                    .value=${this._config.modern_grid ?? "2x12"}
                    @change=${(ev: Event) =>
                      this._update(
                        "modern_grid",
                        (ev.target as HTMLSelectElement).value as ModernGridMode,
                      )}
                  >
                    <option value="2x12">2×12</option>
                    <option value="1x24">1×24</option>
                  </select>
                </div>
              `
            : nothing
        }
        ${this._entityField(ed.batteryEntity, "battery_soc_entity", ["sensor"], "ua-battery-list")}

        <div class="toggles">
          ${renderCheckboxInput({
            labelText: ed.showHeader,
            checked: this._config.show_header !== false,
            onChange: (c) => this._update("show_header", c),
          })}
          ${renderCheckboxInput({
            labelText: ed.showCountdown,
            checked: this._config.show_countdown !== false,
            onChange: (c) => this._update("show_countdown", c),
          })}
          ${renderCheckboxInput({
            labelText: ed.showTomorrow,
            checked: this._config.show_tomorrow !== false,
            onChange: (c) => this._update("show_tomorrow", c),
          })}
          ${renderCheckboxInput({
            labelText: ed.showIntervalsText,
            checked: this._config.show_intervals_text !== false,
            onChange: (c) => this._update("show_intervals_text", c),
          })}
          ${renderCheckboxInput({
            labelText: ed.showLegend,
            checked: this._config.show_legend !== false,
            onChange: (c) => this._update("show_legend", c),
          })}
        </div>

        <details>
          <summary>${ed.advancedOverrides}</summary>
          <div class="form">
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

    return html`
      <div class="form">
        ${this._entityField(ed.entity, "entity", ["calendar", "sensor"], "ua-weekly-primary")}

        <div class="field">
          <label>${ed.title}</label>
          <input
            type="text"
            .value=${this._config.title ?? ""}
            @change=${(ev: Event) =>
              this._update("title", (ev.target as HTMLInputElement).value.trim() || undefined)}
          />
        </div>

        <div class="row-2">
          <div class="field">
            <label>${ed.theme}</label>
            <select
              .value=${this._config.theme ?? "auto"}
              @change=${(ev: Event) =>
                this._update("theme", (ev.target as HTMLSelectElement).value as CardTheme)}
            >
              <option value="auto">${ed.themeAuto}</option>
              <option value="dtek_light">${ed.themeDtekLight}</option>
              <option value="dtek_dark">${ed.themeDtekDark}</option>
            </select>
          </div>

          <div class="field">
            <label>${ed.rowOrder}</label>
            <select
              .value=${this._config.row_order ?? "mon_sun"}
              @change=${(ev: Event) =>
                this._update("row_order", (ev.target as HTMLSelectElement).value as WeeklyRowOrder)}
            >
              <option value="mon_sun">${ed.rowOrderMonSun}</option>
              <option value="rolling">${ed.rowOrderRolling}</option>
            </select>
          </div>
        </div>

        <div class="field">
          <label>${ed.language}</label>
          <select
            .value=${this._config.language ?? "auto"}
            @change=${(ev: Event) =>
              this._update("language", (ev.target as HTMLSelectElement).value as CardLanguage)}
          >
            <option value="auto">${ed.langAuto}</option>
            <option value="uk">Українська</option>
            <option value="en">English</option>
            <option value="ru">Русский</option>
          </select>
        </div>

        ${renderCheckboxInput({
          labelText: ed.showLegend,
          checked: this._config.show_legend !== false,
          onChange: (c) => this._update("show_legend", c),
        })}

        <details>
          <summary>${ed.advancedOverrides}</summary>
          <div class="form">
            ${this._entityField(ed.calendarEntity, "calendar_entity", ["calendar"], "ua-wcal-list")}
            ${this._entityField(ed.todayEntity, "today_entity", ["sensor"], "ua-wtoday-list")}
            ${this._entityField(ed.tomorrowEntity, "tomorrow_entity", ["sensor"], "ua-wtmr-list")}
            ${this._entityField(ed.groupEntity, "group_entity", ["sensor"], "ua-wgrp-list")}
          </div>
        </details>
      </div>
    `;
  }
}
