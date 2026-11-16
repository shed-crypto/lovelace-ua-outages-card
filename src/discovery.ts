import {
  EntityRegistryDisplayEntry,
  HomeAssistant,
  ResolvedEntities,
  UaOutagesCardConfig,
  UaOutagesWeeklyCardConfig,
} from "./types";

type RoleKey = keyof ResolvedEntities;

interface RoleMatcher {
  role: RoleKey;
  domain: string;
  suffix: string;
  translationKey: string;
}

const ROLE_MATCHERS: readonly RoleMatcher[] = [
  { role: "today", domain: "sensor", suffix: "_outages_today", translationKey: "outages_today" },
  {
    role: "tomorrow",
    domain: "sensor",
    suffix: "_outages_tomorrow",
    translationKey: "outages_tomorrow",
  },
  { role: "group", domain: "sensor", suffix: "_group", translationKey: "group" },
  { role: "nextOutage", domain: "sensor", suffix: "_next_outage", translationKey: "next_outage" },
  { role: "outageEnd", domain: "sensor", suffix: "_outage_end", translationKey: "outage_end" },
  {
    role: "scheduledOutage",
    domain: "binary_sensor",
    suffix: "_scheduled_outage",
    translationKey: "scheduled_outage",
  },
  {
    role: "addressStatus",
    domain: "sensor",
    suffix: "_address_status",
    translationKey: "address_status",
  },
  { role: "restoration", domain: "sensor", suffix: "_restoration", translationKey: "restoration" },
  {
    role: "groupsStatus",
    domain: "sensor",
    suffix: "_groups_status",
    translationKey: "groups_status",
  },
  { role: "connection", domain: "sensor", suffix: "_connection", translationKey: "connection" },
  {
    role: "scheduleUpdated",
    domain: "sensor",
    suffix: "_schedule_updated",
    translationKey: "schedule_updated",
  },
  { role: "lastUpdate", domain: "sensor", suffix: "_last_update", translationKey: "last_update" },
  { role: "calendar", domain: "calendar", suffix: "_outages", translationKey: "outages" },
];

function inferPrefix(entityId: string): string | null {
  const dotIdx = entityId.indexOf(".");
  if (dotIdx < 0) return null;
  const objId = entityId.slice(dotIdx + 1);
  // Longest suffixes first so `_outages_today` wins over `_outages`.
  const sorted = [...ROLE_MATCHERS].sort((a, b) => b.suffix.length - a.suffix.length);
  for (const matcher of sorted) {
    if (objId.endsWith(matcher.suffix)) {
      return objId.slice(0, objId.length - matcher.suffix.length);
    }
  }
  return null;
}

function matchByEntry(entry: EntityRegistryDisplayEntry): RoleKey | null {
  const domain = entry.entity_id.split(".")[0];
  for (const m of ROLE_MATCHERS) {
    if (
      entry.translation_key &&
      entry.translation_key === m.translationKey &&
      domain === m.domain
    ) {
      return m.role;
    }
  }
  for (const m of ROLE_MATCHERS) {
    if (domain === m.domain && entry.entity_id.endsWith(m.suffix)) {
      return m.role;
    }
  }
  return null;
}

function resolveFromDevice(
  hass: HomeAssistant,
  primaryEntity: string,
  target: ResolvedEntities,
): void {
  const registry = hass.entities;
  if (!registry) return;
  const deviceId = registry[primaryEntity]?.device_id;
  if (!deviceId) return;

  for (const entry of Object.values(registry)) {
    if (!entry || entry.device_id !== deviceId) continue;
    const role = matchByEntry(entry);
    if (role && !target[role]) {
      target[role] = entry.entity_id;
    }
  }
}

function resolveFromPrefix(
  hass: HomeAssistant,
  primaryEntity: string,
  target: ResolvedEntities,
): void {
  const prefix = inferPrefix(primaryEntity);
  if (!prefix) return;

  for (const m of ROLE_MATCHERS) {
    if (target[m.role]) continue;
    const candidate = `${m.domain}.${prefix}${m.suffix}`;
    if (hass.states[candidate]) {
      target[m.role] = candidate;
    }
  }
}

export function resolveDailyEntities(
  hass: HomeAssistant,
  config: UaOutagesCardConfig,
): ResolvedEntities {
  const resolved: ResolvedEntities = {
    calendar: config.calendar_entity || undefined,
    tomorrow: config.tomorrow_entity || undefined,
    group: config.group_entity || undefined,
    nextOutage: config.next_outage_entity || undefined,
    outageEnd: config.outage_end_entity || undefined,
    scheduledOutage: config.scheduled_outage_entity || undefined,
    addressStatus: config.address_status_entity || undefined,
    restoration: config.restoration_entity || undefined,
    groupsStatus: config.groups_status_entity || undefined,
    connection: config.connection_entity || undefined,
    scheduleUpdated: config.schedule_updated_entity || undefined,
    lastUpdate: config.last_update_entity || undefined,
  };

  if (config.entity) {
    const entityDomain = config.entity.split(".")[0];
    if (entityDomain === "sensor" && !config.entity.endsWith("_group")) {
      // Allow direct fallback when a third-party outage sensor is supplied directly.
      const inferred = inferPrefix(config.entity);
      if (inferred === null || config.entity.endsWith("_outages_today")) {
        resolved.today = config.entity;
      }
    }
    resolveFromDevice(hass, config.entity, resolved);
    resolveFromPrefix(hass, config.entity, resolved);
    if (!resolved.today && entityDomain === "sensor") {
      resolved.today = config.entity;
    }
  }

  return resolved;
}

export function resolveWeeklyEntities(
  hass: HomeAssistant,
  config: UaOutagesWeeklyCardConfig,
): ResolvedEntities {
  const resolved: ResolvedEntities = {
    calendar: config.calendar_entity || undefined,
    today: config.today_entity || undefined,
    tomorrow: config.tomorrow_entity || undefined,
    group: config.group_entity || undefined,
    connection: config.connection_entity || undefined,
    lastUpdate: config.last_update_entity || undefined,
  };

  if (config.entity) {
    if (config.entity.startsWith("calendar.") && !resolved.calendar) {
      resolved.calendar = config.entity;
    }
    resolveFromDevice(hass, config.entity, resolved);
    resolveFromPrefix(hass, config.entity, resolved);
  }

  return resolved;
}

export function findDefaultPrimaryEntity(
  hass: HomeAssistant,
  preferredDomain: "sensor" | "calendar",
): string | undefined {
  const states = Object.values(hass.states);
  if (preferredDomain === "calendar") {
    const cal = states.find(
      (s) => s && s.entity_id.startsWith("calendar.") && s.entity_id.endsWith("_outages"),
    );
    if (cal) return cal.entity_id;
  }
  const today = states.find(
    (s) => s && s.entity_id.startsWith("sensor.") && s.entity_id.endsWith("_outages_today"),
  );
  if (today) return today.entity_id;

  const withSchedule = states.find(
    (s) => s && s.entity_id.startsWith("sensor.") && typeof s.attributes.schedule === "string",
  );
  return withSchedule?.entity_id;
}
