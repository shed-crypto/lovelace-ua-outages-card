export type CardStyle = "dtek" | "modern";
export type CardTheme = "auto" | "dtek_light" | "dtek_dark";
export type CardLayout = "full" | "compact" | "kiosk";
export type ModernGridMode = "2x12" | "1x24";
export type CardLanguage = "auto" | "uk" | "en" | "ru";
export type SupportedLanguage = "uk" | "en" | "ru";
export type WeeklyRowOrder = "mon_sun" | "rolling";
export type SlotState = "1" | "0" | "?";

export interface HassEntityAttributeMap {
  friendly_name?: string;
  device_class?: string;
  unit_of_measurement?: string;
  region?: string;
  site_key?: string;
  group_id?: string;
  groups_at_address?: string[];
  extra_groups?: string[];
  groups_mode?: string;
  date?: string;
  published?: boolean;
  outages_text?: string;
  possible_text?: string;
  schedule?: string;
  outages?: RawOutageInterval[];
  groups?: Record<string, string>;
  data_status?: string;
  last_verified_at?: string;
  duration_minutes?: number;
  start?: string;
  end?: string;
  next_start?: string;
  next_end?: string;
  reason?: string;
  active?: boolean;
  external_operator?: boolean;
  version?: string;
  source?: string;
  last_error?: string;
  last_success?: string;
  last_dtek_success?: string;
  daily_schedule_shown?: boolean;
  weekly_schedule_shown?: boolean;
  [key: string]: unknown;
}

export interface RawOutageInterval {
  start?: string;
  end?: string;
  kind?: string;
  duration_minutes?: number;
}

export interface HassEntity {
  entity_id: string;
  state: string;
  last_changed?: string;
  last_updated?: string;
  attributes: HassEntityAttributeMap;
}

export interface EntityRegistryDisplayEntry {
  entity_id: string;
  device_id?: string | null;
  platform?: string;
  translation_key?: string;
}

export interface HassConfig {
  time_zone?: string;
  language?: string;
}

export interface HassLocale {
  language?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity | undefined>;
  entities?: Record<string, EntityRegistryDisplayEntry | undefined>;
  config?: HassConfig;
  locale?: HassLocale;
  language?: string;
  themes?: {
    darkMode?: boolean;
  };
  callApi<T>(method: "GET" | "POST", path: string): Promise<T>;
}

export interface CalendarApiEvent {
  summary?: string;
  description?: string;
  start: { dateTime?: string; date?: string } | string;
  end: { dateTime?: string; date?: string } | string;
}

export interface UaOutagesCardConfig {
  type: string;
  entity?: string;
  title?: string;
  style?: CardStyle;
  theme?: CardTheme;
  layout?: CardLayout;
  modern_grid?: ModernGridMode;
  language?: CardLanguage;
  show_header?: boolean;
  show_countdown?: boolean;
  show_tomorrow?: boolean;
  show_intervals_text?: boolean;
  show_legend?: boolean;
  battery_soc_entity?: string;
  tomorrow_entity?: string;
  group_entity?: string;
  next_outage_entity?: string;
  outage_end_entity?: string;
  scheduled_outage_entity?: string;
  address_status_entity?: string;
  restoration_entity?: string;
  groups_status_entity?: string;
  connection_entity?: string;
  schedule_updated_entity?: string;
  last_update_entity?: string;
}

export interface UaOutagesWeeklyCardConfig {
  type: string;
  entity?: string;
  title?: string;
  theme?: CardTheme;
  row_order?: WeeklyRowOrder;
  language?: CardLanguage;
  show_legend?: boolean;
  calendar_entity?: string;
  today_entity?: string;
  tomorrow_entity?: string;
  group_entity?: string;
  last_update_entity?: string;
}

export interface ResolvedEntities {
  today?: string;
  tomorrow?: string;
  group?: string;
  nextOutage?: string;
  outageEnd?: string;
  scheduledOutage?: string;
  addressStatus?: string;
  restoration?: string;
  groupsStatus?: string;
  connection?: string;
  scheduleUpdated?: string;
  lastUpdate?: string;
  calendar?: string;
}

export interface DayScheduleData {
  dateIso: string;
  published: boolean;
  slots: SlotState[] | null;
  outageHours: number;
  possibleHours: number;
  outagesText: string;
  dataStatus: string;
}

export interface ActiveTimingInfo {
  currentKind: SlotState;
  currentStart: Date | null;
  currentEnd: Date | null;
  remainingMinutes: number | null;
  progressPercent: number | null;
  nextOutageStart: Date | null;
  nextOutageMinutesUntil: number | null;
  nextOutageDurationMinutes: number | null;
}

export interface WeeklyDayRow {
  weekdayIndex: number; // 0 = Monday .. 6 = Sunday
  dateIso: string;
  isToday: boolean;
  slots: SlotState[];
}

export interface LovelaceGridOptions {
  columns?: number;
  min_columns?: number;
  max_columns?: number;
  rows?: number | "auto";
  min_rows?: number;
  max_rows?: number;
}

export interface CustomCardEntry {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
  documentationURL?: string;
}
