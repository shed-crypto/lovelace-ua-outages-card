import { beforeEach, describe, expect, it, vi } from "vitest";
import "../src/index";
import { UaOutagesCardEditor, UaOutagesWeeklyCardEditor } from "../src/editor";
import { UaOutagesCard } from "../src/ua-outages-card";
import { UaOutagesWeeklyCard } from "../src/ua-outages-weekly-card";
import { CalendarApiEvent, HomeAssistant } from "../src/types";

function makeCallApi(
  events: CalendarApiEvent[] = [],
  shouldReject = false,
): { fn: HomeAssistant["callApi"]; spy: ReturnType<typeof vi.fn> } {
  const spy = vi.fn(async () => {
    if (shouldReject) throw new Error("API error");
    return events;
  });
  const fn: HomeAssistant["callApi"] = <T>() => spy() as Promise<T>;
  return { fn, spy };
}

function makeFullHass(overrides: Partial<HomeAssistant> = {}): HomeAssistant {
  const todayIso = new Date().toISOString().slice(0, 10);
  const tomorrowDate = new Date(Date.now() + 86_400_000);
  const tomorrowIso = tomorrowDate.toISOString().slice(0, 10);
  const defaultApi = makeCallApi([]);

  return {
    config: { time_zone: "Europe/Kyiv", language: "uk" },
    locale: { language: "uk" },
    themes: { darkMode: false },
    states: {
      "sensor.home_outages_today": {
        entity_id: "sensor.home_outages_today",
        state: "4.0",
        attributes: {
          friendly_name: "Home Outages today",
          date: todayIso,
          published: true,
          schedule: "00000111" + "1".repeat(16) + "000" + "?".repeat(3) + "1".repeat(18),
          outages_text: "00:00-02:30, 12:00-13:30",
          data_status: "fresh",
        },
      },
      "sensor.home_outages_tomorrow": {
        entity_id: "sensor.home_outages_tomorrow",
        state: "0",
        attributes: {
          date: tomorrowIso,
          published: false,
          schedule: "",
        },
      },
      "sensor.home_group": {
        entity_id: "sensor.home_group",
        state: "3.2",
        attributes: { region: "Kyiv Regional" },
      },
      "sensor.home_connection": {
        entity_id: "sensor.home_connection",
        state: "ok",
        attributes: {},
      },
      "sensor.home_address_status": {
        entity_id: "sensor.home_address_status",
        state: "emergency",
        attributes: { reason: "Cable fault" },
      },
      "sensor.home_restoration": {
        entity_id: "sensor.home_restoration",
        state: "2026-11-16T19:30:00+02:00",
        attributes: {},
      },
      "binary_sensor.home_scheduled_outage": {
        entity_id: "binary_sensor.home_scheduled_outage",
        state: "off",
        attributes: {},
      },
      "sensor.home_outage_end": {
        entity_id: "sensor.home_outage_end",
        state: "unknown",
        attributes: {},
      },
      "sensor.home_schedule_updated": {
        entity_id: "sensor.home_schedule_updated",
        state: "2026-11-16T14:00:00Z",
        attributes: {},
      },
      "sensor.home_last_update": {
        entity_id: "sensor.home_last_update",
        state: "2026-11-16T15:00:00Z",
        attributes: {},
      },
      "calendar.home_outages": {
        entity_id: "calendar.home_outages",
        state: "off",
        attributes: {},
      },
      "sensor.battery_soc": {
        entity_id: "sensor.battery_soc",
        state: "84.4",
        attributes: { unit_of_measurement: "%" },
      },
    },
    entities: {
      "sensor.home_outages_today": {
        entity_id: "sensor.home_outages_today",
        device_id: "dev_home",
        translation_key: "outages_today",
      },
      "sensor.home_outages_tomorrow": {
        entity_id: "sensor.home_outages_tomorrow",
        device_id: "dev_home",
        translation_key: "outages_tomorrow",
      },
      "sensor.home_group": {
        entity_id: "sensor.home_group",
        device_id: "dev_home",
        translation_key: "group",
      },
      "sensor.home_connection": {
        entity_id: "sensor.home_connection",
        device_id: "dev_home",
        translation_key: "connection",
      },
      "sensor.home_address_status": {
        entity_id: "sensor.home_address_status",
        device_id: "dev_home",
        translation_key: "address_status",
      },
      "sensor.home_restoration": {
        entity_id: "sensor.home_restoration",
        device_id: "dev_home",
        translation_key: "restoration",
      },
      "binary_sensor.home_scheduled_outage": {
        entity_id: "binary_sensor.home_scheduled_outage",
        device_id: "dev_home",
        translation_key: "scheduled_outage",
      },
      "sensor.home_outage_end": {
        entity_id: "sensor.home_outage_end",
        device_id: "dev_home",
        translation_key: "outage_end",
      },
      "sensor.home_schedule_updated": {
        entity_id: "sensor.home_schedule_updated",
        device_id: "dev_home",
        translation_key: "schedule_updated",
      },
      "sensor.home_last_update": {
        entity_id: "sensor.home_last_update",
        device_id: "dev_home",
        translation_key: "last_update",
      },
      "calendar.home_outages": {
        entity_id: "calendar.home_outages",
        device_id: "dev_home",
        translation_key: "outages",
      },
    },
    callApi: defaultApi.fn,
    ...overrides,
  };
}

describe("custom cards registration and DOM rendering", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("registers both custom elements, config elements, and window.customCards", () => {
    expect(customElements.get("ua-outages-card")).toBe(UaOutagesCard);
    expect(customElements.get("ua-outages-weekly-card")).toBe(UaOutagesWeeklyCard);
    expect(customElements.get("ua-outages-card-editor")).toBe(UaOutagesCardEditor);
    expect(customElements.get("ua-outages-weekly-card-editor")).toBe(UaOutagesWeeklyCardEditor);
    expect(UaOutagesCard.getConfigElement().tagName.toLowerCase()).toBe("ua-outages-card-editor");
    expect(UaOutagesWeeklyCard.getConfigElement().tagName.toLowerCase()).toBe(
      "ua-outages-weekly-card-editor",
    );

    const types = (window.customCards ?? []).map((c) => c.type);
    expect(types).toContain("ua-outages-card");
    expect(types).toContain("ua-outages-weekly-card");
  });

  it("renders DTEK table daily card, hover readouts, published tomorrow, and optional battery", async () => {
    const hass = makeFullHass();
    const card = document.createElement("ua-outages-card") as UaOutagesCard;
    card.hass = hass;
    card.setConfig({
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
      style: "dtek",
      theme: "dtek_light",
      language: "uk",
    });
    document.body.appendChild(card);
    await card.updateComplete;

    const root = card.shadowRoot;
    expect(root).not.toBeNull();
    expect(root?.querySelectorAll("th.dtek-vhead-cell")).toHaveLength(24);
    expect(root?.querySelector(".battery-pill")).toBeNull();
    expect(root?.querySelector(".alert-banner")?.textContent).toContain("Cable fault");
    expect(root?.querySelector(".dtek-empty-row")?.textContent).toContain("не опубліковано");
    expect(card.getAttribute("data-theme")).toBe("dtek_light");

    // Hovering a table cell updates the slot readout; leaving resets it.
    const thirdCell = root?.querySelectorAll("button.dtek-cell")[2] as HTMLButtonElement;
    thirdCell.dispatchEvent(new Event("mouseenter"));
    await card.updateComplete;
    expect(root?.querySelector(".hover-readout")?.textContent).toContain("02:00–03:00");
    root?.querySelector(".table-scroll")?.dispatchEvent(new Event("mouseleave"));
    await card.updateComplete;

    // Publish tomorrow and switch to modern 1x24 with battery pill.
    const tomorrowEntity = hass.states["sensor.home_outages_tomorrow"];
    if (tomorrowEntity) {
      tomorrowEntity.attributes.published = true;
      tomorrowEntity.attributes.schedule = "0000" + "1".repeat(44);
    }
    card.setConfig({
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
      style: "modern",
      modern_grid: "1x24",
      battery_soc_entity: "sensor.battery_soc",
      layout: "kiosk",
    });
    await card.updateComplete;

    expect(root?.querySelector(".battery-pill")?.textContent).toContain("84%");
    expect(root?.querySelectorAll(".hour-tile")).toHaveLength(48);
    const tileBtn = root?.querySelector(".hour-tile") as HTMLButtonElement;
    tileBtn.click();
    await card.updateComplete;
    expect(root?.querySelector(".hover-readout")?.textContent).toContain("00:00–01:00");
    expect(card.getGridOptions().columns).toBe(12);
    expect(card.getCardSize()).toBe(4);
  });

  it("renders active outage progress bar, mirror/offline states, and empty/compact fallbacks", async () => {
    const hass = makeFullHass();
    const now = Date.now();
    hass.states["binary_sensor.home_scheduled_outage"] = {
      entity_id: "binary_sensor.home_scheduled_outage",
      state: "on",
      attributes: {},
    };
    hass.states["sensor.home_outage_end"] = {
      entity_id: "sensor.home_outage_end",
      state: new Date(now + 3_600_000).toISOString(),
      attributes: { start: new Date(now - 3_600_000).toISOString() },
    };
    hass.states["sensor.home_connection"] = {
      entity_id: "sensor.home_connection",
      state: "mirror",
      attributes: {},
    };

    const card = document.createElement("ua-outages-card") as UaOutagesCard;
    card.hass = hass;
    card.setConfig({
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
      style: "dtek",
      language: "en",
    });
    document.body.appendChild(card);
    await card.updateComplete;

    const progress = card.shadowRoot?.querySelector(".progress-fill") as HTMLElement | null;
    expect(progress).not.toBeNull();
    expect(card.shadowRoot?.querySelector(".dot.mirror")).not.toBeNull();
    expect(card.shadowRoot?.querySelector(".hero-main")?.textContent).toContain("Outage until");

    // Compact layout hides battery pill and footer; missing entity renders empty prompt.
    const stub = UaOutagesCard.getStubConfig(hass);
    expect(stub.entity).toBe("sensor.home_outages_today");
    card.setConfig({ ...stub, layout: "compact", battery_soc_entity: "sensor.battery_soc" });
    await card.updateComplete;
    expect(card.getCardSize()).toBe(2);
    expect(card.shadowRoot?.querySelector(".battery-pill")).toBeNull();
    expect(card.shadowRoot?.querySelector(".footer")).toBeNull();

    card.setConfig({ type: "custom:ua-outages-card", entity: "sensor.does_not_exist" });
    await card.updateComplete;
    expect(card.shadowRoot?.querySelector(".empty-state")).not.toBeNull();

    // Unknown address_status hides alert banner; out-of-range battery SOC clamps cleanly.
    hass.states["sensor.home_address_status"] = {
      entity_id: "sensor.home_address_status",
      state: "unknown",
      attributes: {},
    };
    hass.states["sensor.battery_soc"] = {
      entity_id: "sensor.battery_soc",
      state: "105",
      attributes: {},
    };
    card.setConfig({
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
      battery_soc_entity: "sensor.battery_soc",
    });
    await card.updateComplete;
    expect(card.shadowRoot?.querySelector(".alert-banner")).toBeNull();
    expect(card.shadowRoot?.querySelector(".battery-pill")?.textContent).toContain("100%");
  });

  it("renders weekly card, caches calendar API, handles rolling/hover, and survives API error", async () => {
    const okApi = makeCallApi([
      {
        summary: "Можливе відключення",
        start: { dateTime: new Date(Date.now() + 2 * 86_400_000).toISOString() },
        end: { dateTime: new Date(Date.now() + 2 * 86_400_000 + 7_200_000).toISOString() },
      },
    ]);
    const hass = makeFullHass({ callApi: okApi.fn });
    const stub = UaOutagesWeeklyCard.getStubConfig(hass);
    expect(stub.entity).toBe("calendar.home_outages");

    const weekly = document.createElement("ua-outages-weekly-card") as UaOutagesWeeklyCard;
    weekly.hass = hass;
    weekly.setConfig({
      ...stub,
      theme: "dtek_dark",
      language: "uk",
      row_order: "rolling",
    });
    document.body.appendChild(weekly);
    await weekly.updateComplete;

    expect(okApi.spy).toHaveBeenCalledTimes(1);
    expect(weekly.getCardSize()).toBe(5);
    expect(weekly.getGridOptions().min_rows).toBe(4);
    expect(weekly.shadowRoot?.querySelectorAll("tbody tr")).toHaveLength(7);
    expect(weekly.shadowRoot?.querySelector("td.today-highlight")).not.toBeNull();
    expect(weekly.getAttribute("data-theme")).toBe("dtek_dark");

    // Hover cell updates readout; triggering re-render within TTL uses cache.
    const cellBtn = weekly.shadowRoot?.querySelectorAll("button.dtek-cell")[5] as HTMLButtonElement;
    cellBtn.click();
    await weekly.updateComplete;
    expect(weekly.shadowRoot?.querySelector(".hover-readout")?.textContent).toContain(
      "05:00–06:00",
    );
    expect(okApi.spy).toHaveBeenCalledTimes(1);

    // Rejecting API call does not throw or crash rendering.
    const errApi = makeCallApi([], true);
    const weeklyErr = document.createElement("ua-outages-weekly-card") as UaOutagesWeeklyCard;
    weeklyErr.hass = makeFullHass({ callApi: errApi.fn });
    weeklyErr.setConfig({
      type: "custom:ua-outages-weekly-card",
      entity: "calendar.home_outages",
    });
    document.body.appendChild(weeklyErr);
    await weeklyErr.updateComplete;
    expect(weeklyErr.shadowRoot?.querySelectorAll("tbody tr")).toHaveLength(7);
  });

  it("dispatches config-changed events across all controls in both visual editors", async () => {
    const hass = makeFullHass();
    const editor = document.createElement("ua-outages-card-editor") as UaOutagesCardEditor;
    editor.hass = hass;
    editor.setConfig({
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
      style: "modern",
    });
    document.body.appendChild(editor);
    await editor.updateComplete;

    const events: Record<string, unknown>[] = [];
    editor.addEventListener("config-changed", (ev) => {
      events.push((ev as CustomEvent<{ config: Record<string, unknown> }>).detail.config);
    });

    const select = (field: string): HTMLSelectElement => {
      const el = editor.shadowRoot?.querySelector(
        `select[data-field="${field}"]`,
      ) as HTMLSelectElement | null;
      if (!el) throw new Error(`Missing select ${field}`);
      return el;
    };
    const input = (field: string): HTMLInputElement => {
      const el = editor.shadowRoot?.querySelector(
        `input[data-field="${field}"]`,
      ) as HTMLInputElement | null;
      if (!el) throw new Error(`Missing input ${field}`);
      return el;
    };

    select("theme").value = "kiosk_dark";
    select("theme").dispatchEvent(new Event("change"));
    select("layout").value = "compact";
    select("layout").dispatchEvent(new Event("change"));
    select("language").value = "en";
    select("language").dispatchEvent(new Event("change"));
    select("modern_grid").value = "1x24";
    select("modern_grid").dispatchEvent(new Event("change"));
    select("view_mode").value = "switchable";
    select("view_mode").dispatchEvent(new Event("change"));
    await editor.updateComplete;

    select("weekly_view").value = "timeline_bars";
    select("weekly_view").dispatchEvent(new Event("change"));
    select("row_order").value = "rolling";
    select("row_order").dispatchEvent(new Event("change"));
    select("empty_days_mode").value = "show_all";
    select("empty_days_mode").dispatchEvent(new Event("change"));
    select("default_view").value = "week";
    select("default_view").dispatchEvent(new Event("change"));
    select("weekly_view").value = "auto";
    select("weekly_view").dispatchEvent(new Event("change"));
    await editor.updateComplete;
    select("mobile_weekly_view").value = "compact_bars";
    select("mobile_weekly_view").dispatchEvent(new Event("change"));
    select("interval_display").value = "both";
    select("interval_display").dispatchEvent(new Event("change"));
    select("style").value = "timeline";
    select("style").dispatchEvent(new Event("change"));

    input("title").value = "My Home";
    input("title").dispatchEvent(new Event("change"));
    input("battery_soc_entity").value = "sensor.battery_soc";
    input("battery_soc_entity").dispatchEvent(new Event("change"));
    input("battery_runtime_entity").value = "sensor.battery_runtime";
    input("battery_runtime_entity").dispatchEvent(new Event("change"));
    input("battery_low_threshold").value = "15";
    input("battery_low_threshold").dispatchEvent(new Event("change"));

    for (const cb of [
      "show_header",
      "show_group_badge",
      "show_region",
      "show_connection",
      "show_countdown",
      "show_now_line",
      "show_tomorrow",
      "show_intervals_text",
      "show_legend",
    ]) {
      input(cb).checked = false;
      input(cb).dispatchEvent(new Event("change"));
    }

    for (const ov of [
      "calendar_entity",
      "tomorrow_entity",
      "group_entity",
      "next_outage_entity",
      "outage_end_entity",
      "scheduled_outage_entity",
      "address_status_entity",
      "restoration_entity",
      "connection_entity",
    ]) {
      input(ov).value = `sensor.custom_${ov}`;
      input(ov).dispatchEvent(new Event("change"));
    }

    expect(events.length).toBeGreaterThanOrEqual(20);
    const last = events[events.length - 1];
    expect(last.title).toBe("My Home");
    expect(last.style).toBe("timeline");
    expect(last.theme).toBe("kiosk_dark");
    expect(last.view_mode).toBe("switchable");
    expect(last.default_view).toBe("week");
    expect(last.mobile_weekly_view).toBe("compact_bars");
    expect(last.interval_display).toBe("both");
    expect(last.battery_soc_entity).toBe("sensor.battery_soc");
    expect(last.battery_runtime_entity).toBe("sensor.battery_runtime");
    expect(last.battery_low_threshold).toBe(15);
    expect(last.show_header).toBe(false);
    expect(last.show_legend).toBe(false);

    const wEditor = document.createElement(
      "ua-outages-weekly-card-editor",
    ) as UaOutagesWeeklyCardEditor;
    wEditor.hass = hass;
    wEditor.setConfig({ type: "custom:ua-outages-weekly-card", entity: "calendar.home_outages" });
    document.body.appendChild(wEditor);
    await wEditor.updateComplete;

    const wEvents: Record<string, unknown>[] = [];
    wEditor.addEventListener("config-changed", (ev) => {
      wEvents.push((ev as CustomEvent<{ config: Record<string, unknown> }>).detail.config);
    });

    const wSelect = (field: string): HTMLSelectElement => {
      const el = wEditor.shadowRoot?.querySelector(
        `select[data-field="${field}"]`,
      ) as HTMLSelectElement | null;
      if (!el) throw new Error(`Missing weekly select ${field}`);
      return el;
    };
    const wInput = (field: string): HTMLInputElement => {
      const el = wEditor.shadowRoot?.querySelector(
        `input[data-field="${field}"]`,
      ) as HTMLInputElement | null;
      if (!el) throw new Error(`Missing weekly input ${field}`);
      return el;
    };

    wSelect("theme").value = "oled_black";
    wSelect("theme").dispatchEvent(new Event("change"));
    wSelect("layout").value = "kiosk";
    wSelect("layout").dispatchEvent(new Event("change"));
    wSelect("mobile_weekly_view").value = "compact_bars";
    wSelect("mobile_weekly_view").dispatchEvent(new Event("change"));
    wSelect("row_order").value = "rolling";
    wSelect("row_order").dispatchEvent(new Event("change"));
    wSelect("language").value = "en";
    wSelect("language").dispatchEvent(new Event("change"));
    wSelect("empty_days_mode").value = "hide_unscheduled";
    wSelect("empty_days_mode").dispatchEvent(new Event("change"));
    wSelect("weekly_view").value = "timeline_bars";
    wSelect("weekly_view").dispatchEvent(new Event("change"));

    wInput("title").value = "Custom Weekly";
    wInput("title").dispatchEvent(new Event("change"));
    for (const cb of [
      "show_header",
      "show_group_badge",
      "show_now_line",
      "show_intervals_text",
      "show_legend",
    ]) {
      wInput(cb).checked = false;
      wInput(cb).dispatchEvent(new Event("change"));
    }
    for (const ov of [
      "calendar_entity",
      "today_entity",
      "tomorrow_entity",
      "group_entity",
      "connection_entity",
    ]) {
      wInput(ov).value = `${ov.startsWith("cal") ? "calendar" : "sensor"}.custom_${ov}`;
      wInput(ov).dispatchEvent(new Event("change"));
    }

    expect(wEvents.at(-1)).toMatchObject({
      title: "Custom Weekly",
      theme: "oled_black",
      layout: "kiosk",
      weekly_view: "timeline_bars",
      row_order: "rolling",
      language: "en",
      empty_days_mode: "hide_unscheduled",
      show_header: false,
      show_legend: false,
      calendar_entity: "calendar.custom_calendar_entity",
    });
  });

  it("renders continuous timeline style, interval chips, battery reserve, and Today/Week switcher", async () => {
    const weekApi = makeCallApi([]);
    const hass = makeFullHass({ callApi: weekApi.fn });
    hass.states["sensor.battery_runtime"] = {
      entity_id: "sensor.battery_runtime",
      state: "198",
      attributes: { unit_of_measurement: "min" },
    };
    hass.states["sensor.home_next_outage"] = {
      entity_id: "sensor.home_next_outage",
      state: new Date(Date.now() + 3_600_000).toISOString(),
      attributes: { duration_minutes: 120 },
    };
    if (hass.entities) {
      hass.entities["sensor.home_next_outage"] = {
        entity_id: "sensor.home_next_outage",
        device_id: "dev_home",
        translation_key: "next_outage",
      };
    }
    if (hass.states["sensor.home_outages_tomorrow"]) {
      hass.states["sensor.home_outages_tomorrow"].attributes.published = true;
      hass.states["sensor.home_outages_tomorrow"].attributes.schedule = "1".repeat(48);
    }

    const card = document.createElement("ua-outages-card") as UaOutagesCard;
    card.hass = hass;
    card.setConfig({
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
      style: "timeline",
      theme: "kiosk_dark",
      view_mode: "switchable",
      default_view: "today",
      battery_soc_entity: "sensor.battery_soc",
      battery_runtime_entity: "sensor.battery_runtime",
      language: "uk",
    });
    document.body.appendChild(card);
    await card.updateComplete;

    expect(card.getAttribute("data-theme")).toBe("kiosk_dark");
    const slots = card.shadowRoot?.querySelectorAll(".tl-slot") ?? [];
    expect(slots.length).toBeGreaterThanOrEqual(48);
    (slots[0] as HTMLButtonElement).dispatchEvent(new Event("mouseenter"));
    (slots[1] as HTMLButtonElement).click();
    await card.updateComplete;
    expect(card.shadowRoot?.querySelector(".hover-readout")?.textContent).toContain("00:00–01:00");
    card.shadowRoot?.querySelector(".tl-box")?.dispatchEvent(new Event("mouseleave"));
    await card.updateComplete;

    expect(card.shadowRoot?.querySelector(".tl-now-line")).not.toBeNull();
    expect(card.shadowRoot?.querySelectorAll(".iv-chip").length).toBeGreaterThanOrEqual(2);
    expect(card.shadowRoot?.querySelector(".iv-chip.ok")?.textContent).toContain("Відключень");
    expect(card.shadowRoot?.querySelector(".battery-pill")?.textContent).toContain("вистачить");
    // view_mode=switchable does not fetch calendar until user clicks Week tab.
    expect(weekApi.spy).toHaveBeenCalledTimes(0);

    // Switch to Week tab and test weekly bar slot selection & return to Today tab.
    const tabs = card.shadowRoot?.querySelectorAll(".view-tab") as NodeListOf<HTMLButtonElement>;
    expect(tabs).toHaveLength(2);
    tabs[1].click();
    await card.updateComplete;
    await card.updateComplete;

    expect(weekApi.spy).toHaveBeenCalledTimes(1);
    const barSlots = card.shadowRoot?.querySelectorAll(".wbar-wrap .tl-slot") ?? [];
    expect(barSlots.length).toBeGreaterThan(0);
    (barSlots[2] as HTMLButtonElement).click();
    await card.updateComplete;
    card.shadowRoot?.querySelector(".wbar-wrap")?.dispatchEvent(new Event("mouseleave"));
    await card.updateComplete;
    expect(card.shadowRoot?.querySelector(".wbar-now-line")).not.toBeNull();

    tabs[0].click();
    await card.updateComplete;
    expect(card.shadowRoot?.querySelector(".tl-box")).not.toBeNull();
  });

  it("supports weekly list, hide_unscheduled, mobile bars, and disabled weekly plan notice", async () => {
    const hass = makeFullHass();
    if (hass.states["sensor.home_connection"]) {
      hass.states["sensor.home_connection"].attributes.weekly_schedule_shown = false;
    }

    const weekly = document.createElement("ua-outages-weekly-card") as UaOutagesWeeklyCard;
    weekly.hass = hass;
    weekly.setConfig({
      type: "custom:ua-outages-weekly-card",
      entity: "calendar.home_outages",
      theme: "oled_black",
      weekly_view: "list",
      empty_days_mode: "hide_unscheduled",
      language: "uk",
    });
    document.body.appendChild(weekly);
    await weekly.updateComplete;

    expect(weekly.getAttribute("data-theme")).toBe("oled_black");
    expect(weekly.shadowRoot?.querySelector(".notice-banner")?.textContent).toContain("вимкнено");
    expect(weekly.shadowRoot?.querySelectorAll(".wlist-card")).toHaveLength(1);
    expect(weekly.shadowRoot?.querySelector(".wlist-today-tag")).not.toBeNull();
    const listSlot = weekly.shadowRoot?.querySelector(".wlist .tl-slot") as HTMLButtonElement;
    listSlot.click();
    await weekly.updateComplete;
    weekly.shadowRoot?.querySelector(".wlist")?.dispatchEvent(new Event("mouseleave"));
    await weekly.updateComplete;

    // Also test auto responsive with compact_bars mobile view & view_mode="both".
    weekly.setConfig({
      type: "custom:ua-outages-weekly-card",
      entity: "calendar.home_outages",
      weekly_view: "auto",
      mobile_weekly_view: "compact_bars",
      empty_days_mode: "compact_empty",
    });
    await weekly.updateComplete;
    expect(weekly.shadowRoot?.querySelector(".weekly-mobile-view .wbar-wrap")).not.toBeNull();

    const bothCard = document.createElement("ua-outages-card") as UaOutagesCard;
    bothCard.hass = hass;
    bothCard.setConfig({
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
      style: "modern",
      view_mode: "both",
    });
    document.body.appendChild(bothCard);
    await bothCard.updateComplete;
    await bothCard.updateComplete;
    expect(bothCard.shadowRoot?.querySelector(".week-divider")).not.toBeNull();
  });

  it("deduplicates group name in header title and keeps today outage color distinct from possible", async () => {
    const hass = makeFullHass();
    if (hass.states["sensor.home_outages_today"]) {
      hass.states["sensor.home_outages_today"].attributes.friendly_name =
        "Українка · Черга 3.2 Відключень сьогодні";
    }
    const card = document.createElement("ua-outages-card") as UaOutagesCard;
    card.hass = hass;
    card.setConfig({
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
      language: "uk",
    });
    document.body.appendChild(card);
    await card.updateComplete;

    expect(card.shadowRoot?.querySelector(".title")?.textContent?.trim()).toBe("Українка");
    expect(card.shadowRoot?.querySelector(".badge-group")?.textContent?.trim()).toBe("Черга 3.2");

    // Weekly card keeps readout in its own row outside .header and separates '0' vs '?' on today row.
    const weekly = document.createElement("ua-outages-weekly-card") as UaOutagesWeeklyCard;
    weekly.hass = hass;
    weekly.setConfig({
      type: "custom:ua-outages-weekly-card",
      entity: "calendar.home_outages",
      theme: "dtek_light",
      language: "uk",
    });
    document.body.appendChild(weekly);
    await weekly.updateComplete;

    expect(weekly.shadowRoot?.querySelector(".header .hover-readout")).toBeNull();
    expect(weekly.shadowRoot?.querySelector(".readout-row .hover-readout")).not.toBeNull();
    const todayRow = weekly.shadowRoot?.querySelector("tr.is-today-row");
    expect(todayRow).not.toBeNull();
    const todayBgs = Array.from(todayRow?.querySelectorAll(".dtek-cell-bg > span") ?? []).map(
      (el) => (el as HTMLElement).style.background,
    );
    expect(todayBgs).toContain("var(--ua-off-bg)");
    expect(todayBgs).toContain("var(--ua-maybe-bg)");
    expect(todayBgs).toContain("var(--ua-today-on-bg)");
    expect(todayBgs).not.toContain("var(--ua-today-off-bg)");
  });
});
