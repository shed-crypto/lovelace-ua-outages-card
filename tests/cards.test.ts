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

    const selects = editor.shadowRoot?.querySelectorAll("select");
    expect(selects && selects.length === 5).toBe(true);
    const [styleSel, themeSel, layoutSel, langSel, gridSel] = Array.from(selects ?? []);

    themeSel.value = "dtek_dark";
    themeSel.dispatchEvent(new Event("change"));
    layoutSel.value = "compact";
    layoutSel.dispatchEvent(new Event("change"));
    langSel.value = "en";
    langSel.dispatchEvent(new Event("change"));
    gridSel.value = "1x24";
    gridSel.dispatchEvent(new Event("change"));
    styleSel.value = "dtek";
    styleSel.dispatchEvent(new Event("change"));

    const textInputs = Array.from(editor.shadowRoot?.querySelectorAll("input[type='text']") ?? []);
    (textInputs[1] as HTMLInputElement).value = "My Home";
    textInputs[1].dispatchEvent(new Event("change"));
    (textInputs[2] as HTMLInputElement).value = "sensor.battery_soc";
    textInputs[2].dispatchEvent(new Event("change"));

    const checkboxes = Array.from(
      editor.shadowRoot?.querySelectorAll("input[type='checkbox']") ?? [],
    );
    (checkboxes[0] as HTMLInputElement).checked = false;
    checkboxes[0].dispatchEvent(new Event("change"));

    expect(events.length).toBeGreaterThanOrEqual(7);
    const last = events[events.length - 1];
    expect(last.title).toBe("My Home");
    expect(last.battery_soc_entity).toBe("sensor.battery_soc");
    expect(last.show_header).toBe(false);

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

    const wSelects = Array.from(wEditor.shadowRoot?.querySelectorAll("select") ?? []);
    wSelects[0].value = "dtek_light";
    wSelects[0].dispatchEvent(new Event("change"));
    wSelects[1].value = "rolling";
    wSelects[1].dispatchEvent(new Event("change"));
    wSelects[2].value = "en";
    wSelects[2].dispatchEvent(new Event("change"));

    const wToggle = wEditor.shadowRoot?.querySelector("input[type='checkbox']") as HTMLInputElement;
    wToggle.checked = false;
    wToggle.dispatchEvent(new Event("change"));

    const wInputs = Array.from(wEditor.shadowRoot?.querySelectorAll("input[type='text']") ?? []);
    (wInputs[2] as HTMLInputElement).value = "calendar.custom_outages";
    wInputs[2].dispatchEvent(new Event("change"));

    expect(wEvents.at(-1)).toMatchObject({
      theme: "dtek_light",
      row_order: "rolling",
      language: "en",
      show_legend: false,
      calendar_entity: "calendar.custom_outages",
    });
  });
});
