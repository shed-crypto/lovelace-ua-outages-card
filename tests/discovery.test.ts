import { describe, expect, it } from "vitest";
import {
  findDefaultPrimaryEntity,
  resolveDailyEntities,
  resolveWeeklyEntities,
} from "../src/discovery";
import { HomeAssistant } from "../src/types";

function makeHass(): HomeAssistant {
  return {
    states: {
      "sensor.home_outages_today": {
        entity_id: "sensor.home_outages_today",
        state: "4.0",
        attributes: { schedule: "1".repeat(48) },
      },
      "sensor.home_outages_tomorrow": {
        entity_id: "sensor.home_outages_tomorrow",
        state: "0",
        attributes: { published: false },
      },
      "sensor.home_group": {
        entity_id: "sensor.home_group",
        state: "3.2",
        attributes: { region: "Kyiv Regional" },
      },
      "sensor.home_next_outage": {
        entity_id: "sensor.home_next_outage",
        state: "2026-11-16T10:00:00Z",
        attributes: {},
      },
      "sensor.home_restoration": {
        entity_id: "sensor.home_restoration",
        state: "unknown",
        attributes: {},
      },
      "sensor.home_connection": {
        entity_id: "sensor.home_connection",
        state: "ok",
        attributes: {},
      },
      "binary_sensor.home_scheduled_outage": {
        entity_id: "binary_sensor.home_scheduled_outage",
        state: "off",
        attributes: {},
      },
      "calendar.home_outages": {
        entity_id: "calendar.home_outages",
        state: "off",
        attributes: {},
      },
      "sensor.other_custom_id": {
        entity_id: "sensor.other_custom_id",
        state: "unknown",
        attributes: {},
      },
    },
    entities: {
      "sensor.home_outages_today": {
        entity_id: "sensor.home_outages_today",
        device_id: "dev_1",
        translation_key: "outages_today",
      },
      "sensor.home_group": {
        entity_id: "sensor.home_group",
        device_id: "dev_1",
        translation_key: "group",
      },
      "sensor.other_custom_id": {
        entity_id: "sensor.other_custom_id",
        device_id: "dev_1",
        translation_key: "restoration",
      },
      "calendar.home_outages": {
        entity_id: "calendar.home_outages",
        device_id: "dev_1",
        translation_key: "outages",
      },
    },
    callApi: async () => [] as never,
  };
}

describe("entity auto-discovery", () => {
  it("resolves all related entities via device_id, translation_key, and prefix", () => {
    const hass = makeHass();
    const resolved = resolveDailyEntities(hass, {
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
    });

    expect(resolved.today).toBe("sensor.home_outages_today");
    expect(resolved.tomorrow).toBe("sensor.home_outages_tomorrow");
    expect(resolved.group).toBe("sensor.home_group");
    expect(resolved.restoration).toBe("sensor.other_custom_id");
    expect(resolved.scheduledOutage).toBe("binary_sensor.home_scheduled_outage");
    expect(resolved.connection).toBe("sensor.home_connection");
    expect(resolved.calendar).toBe("calendar.home_outages");
  });

  it("respects manual overrides over discovered entities", () => {
    const hass = makeHass();
    const resolved = resolveDailyEntities(hass, {
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
      group_entity: "sensor.manual_group",
      tomorrow_entity: "sensor.manual_tomorrow",
    });

    expect(resolved.group).toBe("sensor.manual_group");
    expect(resolved.tomorrow).toBe("sensor.manual_tomorrow");
  });

  it("resolves weekly calendar and sensors starting from either calendar or sensor entity", () => {
    const hass = makeHass();
    const weekly = resolveWeeklyEntities(hass, {
      type: "custom:ua-outages-weekly-card",
      entity: "calendar.home_outages",
    });
    expect(weekly.calendar).toBe("calendar.home_outages");
    expect(weekly.today).toBe("sensor.home_outages_today");
    expect(weekly.group).toBe("sensor.home_group");

    expect(findDefaultPrimaryEntity(hass, "sensor")).toBe("sensor.home_outages_today");
    expect(findDefaultPrimaryEntity(hass, "calendar")).toBe("calendar.home_outages");

    // Prefix fallback works even without hass.entities registry.
    const noRegistryHass: HomeAssistant = {
      ...hass,
      entities: undefined,
    };
    const prefixResolved = resolveDailyEntities(noRegistryHass, {
      type: "custom:ua-outages-card",
      entity: "sensor.home_outages_today",
    });
    expect(prefixResolved.group).toBe("sensor.home_group");
    expect(prefixResolved.scheduledOutage).toBe("binary_sensor.home_scheduled_outage");
  });
});
