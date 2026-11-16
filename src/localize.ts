import { CardLanguage, SlotState, SupportedLanguage } from "./types";

export interface TranslationStrings {
  cardDefaultTitle: string;
  weeklyDefaultTitle: string;
  groupPrefix: string;
  today: string;
  tomorrow: string;
  hoursShort: string;
  minShort: string;
  hourUnit: string;
  noEntity: string;
  noSchedule: string;
  noTomorrow: string;
  noWeeklyData: string;
  powerOn: string;
  powerOnNoOutages: string;
  nextOutageAt: string;
  possibleOutageAt: string;
  outageUntil: string;
  outageOngoing: string;
  inPrefix: string;
  remainingSuffix: string;
  durationLabel: string;
  expectedRestoration: string;
  batteryLabel: string;
  hoursHeader: string;
  daysHeader: string;
  todayTag: string;
  nowTag: string;
  viewToday: string;
  viewWeek: string;
  noOutagesToday: string;
  batteryEnough: string;
  batteryReserve: string;
  weeklyPlanDisabledNotice: string;
  dayUnscheduledLabel: string;
  collapsedDaysPrefix: string;
  slotOn: string;
  slotOff: string;
  slotMaybe: string;
  legOn: string;
  legOff: string;
  legMaybe: string;
  legFirst: string;
  legSecond: string;
  connOk: string;
  connMirror: string;
  connOffline: string;
  staleSuffix: string;
  addressKinds: Record<string, string>;
  weekdays: readonly [string, string, string, string, string, string, string];
  weekdaysShort: readonly [string, string, string, string, string, string, string];
  editor: {
    entity: string;
    title: string;
    style: string;
    styleDtek: string;
    styleModern: string;
    styleTimeline: string;
    theme: string;
    themeAuto: string;
    themeDtekLight: string;
    themeDtekDark: string;
    themeKioskDark: string;
    themeOledBlack: string;
    layout: string;
    layoutFull: string;
    layoutCompact: string;
    layoutKiosk: string;
    viewMode: string;
    viewModeDailyOnly: string;
    viewModeSwitchable: string;
    viewModeBoth: string;
    defaultView: string;
    modernGrid: string;
    intervalDisplay: string;
    intervalAuto: string;
    intervalChips: string;
    intervalText: string;
    intervalBoth: string;
    intervalNone: string;
    weeklyView: string;
    weeklyAuto: string;
    weeklyBars: string;
    weeklyTable: string;
    weeklyList: string;
    mobileWeeklyView: string;
    mobileWeeklyList: string;
    mobileWeeklyBars: string;
    emptyDaysMode: string;
    emptyDaysAuto: string;
    emptyDaysCompact: string;
    emptyDaysHide: string;
    emptyDaysShowAll: string;
    rowOrder: string;
    rowOrderMonSun: string;
    rowOrderRolling: string;
    language: string;
    langAuto: string;
    sectionBattery: string;
    batteryEntity: string;
    batteryRuntimeEntity: string;
    batteryLowThreshold: string;
    sectionVisibility: string;
    showHeader: string;
    showGroupBadge: string;
    showRegion: string;
    showConnection: string;
    showCountdown: string;
    showAddressAlert: string;
    showReadout: string;
    showNowLine: string;
    showToday: string;
    showTomorrow: string;
    showPossible: string;
    showIntervalsText: string;
    showLegend: string;
    advancedOverrides: string;
    calendarEntity: string;
    todayEntity: string;
    tomorrowEntity: string;
    groupEntity: string;
    nextOutageEntity: string;
    outageEndEntity: string;
    scheduledOutageEntity: string;
    addressStatusEntity: string;
    restorationEntity: string;
    connectionEntity: string;
  };
}

const UK: TranslationStrings = {
  cardDefaultTitle: "Графік відключень",
  weeklyDefaultTitle: "Графік на тиждень",
  groupPrefix: "Черга",
  today: "Сьогодні",
  tomorrow: "Завтра",
  hoursShort: "год",
  minShort: "хв",
  hourUnit: "год",
  noEntity: "Оберіть сутність інтеграції ua_outages у налаштуваннях картки",
  noSchedule: "Дані графіка ще не завантажені",
  noTomorrow: "Графік на завтра ще не опубліковано",
  noWeeklyData: "Дані тижневого календаря відсутні",
  powerOn: "Світло є",
  powerOnNoOutages: "Світло є • Запланованих відключень немає",
  nextOutageAt: "Наступне відключення о",
  possibleOutageAt: "Можливе відключення о",
  outageUntil: "Відключення до",
  outageOngoing: "Відключення триває",
  inPrefix: "Через",
  remainingSuffix: "залишилось",
  durationLabel: "тривалість",
  expectedRestoration: "Відновлення ~",
  batteryLabel: "АКБ",
  hoursHeader: "Години",
  daysHeader: "Дні",
  todayTag: "сьогодні",
  nowTag: "зараз",
  viewToday: "Сьогодні",
  viewWeek: "Тиждень",
  noOutagesToday: "Відключень не заплановано",
  batteryEnough: "вистачить",
  batteryReserve: "запас",
  weeklyPlanDisabledNotice: "Тижневий план вимкнено оператором — показані опубліковані дні",
  dayUnscheduledLabel: "Очікується графік",
  collapsedDaysPrefix: "Без прогнозу",
  slotOn: "Світло є",
  slotOff: "Світла немає",
  slotMaybe: "Можливе відключення",
  legOn: "Світло є",
  legOff: "Світла немає",
  legMaybe: "Можливе",
  legFirst: "Перші 30 хв",
  legSecond: "Другі 30 хв",
  connOk: "DTEK",
  connMirror: "Дзеркало",
  connOffline: "Офлайн",
  staleSuffix: "кеш",
  addressKinds: {
    emergency: "Аварійне відключення за адресою",
    planned: "Планові роботи за адресою",
    stabilization: "Стабілізаційне відключення",
    other: "Відключення за адресою",
  },
  weekdays: ["Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"],
  weekdaysShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
  editor: {
    entity: "Основна сутність (сенсор або календар)",
    title: "Заголовок картки (необов'язково)",
    style: "Стиль відображення",
    styleDtek: "Таблиця ДТЕК (00-01..23-24)",
    styleModern: "Сучасні плитки",
    styleTimeline: "Суцільна шкала + зараз",
    theme: "Колірна тема",
    themeAuto: "Авто (тема Home Assistant)",
    themeDtekLight: "ДТЕК Світла",
    themeDtekDark: "ДТЕК Темна",
    themeKioskDark: "Кіоск Темна (зелений/червоний)",
    themeOledBlack: "OLED Чорна (максимальний контраст)",
    layout: "Макет",
    layoutFull: "Повний",
    layoutCompact: "Компактний",
    layoutKiosk: "Кіоск (великий шрифт)",
    viewMode: "Режими перегляду",
    viewModeDailyOnly: "Лише добовий графік",
    viewModeSwitchable: "Перемикач Сьогодні / Тиждень",
    viewModeBoth: "Сьогодні + Тиждень разом",
    defaultView: "Початкова вкладка",
    modernGrid: "Сітка плиток (сучасний стиль)",
    intervalDisplay: "Формат інтервалів",
    intervalAuto: "Авто (за стилем картки)",
    intervalChips: "Кольорові чіпи інтервалів",
    intervalText: "Текстовий рядок",
    intervalBoth: "Чіпи + текст",
    intervalNone: "Приховати",
    weeklyView: "Вид тижневого графіка",
    weeklyAuto: "Авто (адаптивно для телефону/ПК)",
    weeklyBars: "Суцільні смуги 7×24 + зараз",
    weeklyTable: "Таблиця ДТЕК 7×24",
    weeklyList: "Компактний список по днях",
    mobileWeeklyView: "На вузькому екрані (при Авто)",
    mobileWeeklyList: "Список з об'єднаними інтервалами",
    mobileWeeklyBars: "7 суцільних кольорових смуг",
    emptyDaysMode: "Порожні дні без прогнозу",
    emptyDaysAuto: "Авто (7 днів на ПК, згорнуті на телефоні)",
    emptyDaysCompact: "Згорнути порожні дні в один рядок",
    emptyDaysHide: "Приховати порожні дні",
    emptyDaysShowAll: "Показувати всі 7 днів",
    rowOrder: "Порядок днів",
    rowOrderMonSun: "Пн–Нд (тиждень)",
    rowOrderRolling: "Від сьогодні (7 днів)",
    language: "Мова картки",
    langAuto: "Авто (мова HA)",
    sectionBattery: "Акумулятор / Інвертор (опціонально)",
    batteryEntity: "Сенсор заряду АКБ (%)",
    batteryRuntimeEntity: "Сенсор запасу часу АКБ (хв/год)",
    batteryLowThreshold: "Поріг низького заряду (%)",
    sectionVisibility: "Елементи картки",
    showHeader: "Показувати шапку",
    showGroupBadge: "Показувати бейдж черги",
    showRegion: "Показувати назву регіону",
    showConnection: "Показувати статус підключення",
    showCountdown: "Показувати живий таймер",
    showAddressAlert: "Показувати алерт за адресою",
    showReadout: "Показувати деталі обраної години",
    showNowLine: "Показувати підсвітку / лінію «зараз»",
    showToday: "Показувати блок сьогодні",
    showTomorrow: "Показувати блок завтра",
    showPossible: "Показувати можливі відключення (сіра зона)",
    showIntervalsText: "Показувати інтервали відключень",
    showLegend: "Показувати легенду",
    advancedOverrides: "Ручне перевизначення сутностей",
    calendarEntity: "Сутність календаря (calendar.*_outages)",
    todayEntity: "Сенсор на сьогодні",
    tomorrowEntity: "Сенсор на завтра",
    groupEntity: "Сенсор черги",
    nextOutageEntity: "Сенсор наступного відключення",
    outageEndEntity: "Сенсор кінця відключень",
    scheduledOutageEntity: "Бінарний сенсор планового відключення",
    addressStatusEntity: "Сенсор статусу за адресою",
    restorationEntity: "Сенсор часу відновлення",
    connectionEntity: "Сенсор підключення",
  },
};

const EN: TranslationStrings = {
  cardDefaultTitle: "Outage Schedule",
  weeklyDefaultTitle: "Weekly Schedule",
  groupPrefix: "Group",
  today: "Today",
  tomorrow: "Tomorrow",
  hoursShort: "h",
  minShort: "min",
  hourUnit: "h",
  noEntity: "Select a ua_outages entity in card configuration",
  noSchedule: "Schedule data is not available yet",
  noTomorrow: "Tomorrow's schedule is not published yet",
  noWeeklyData: "Weekly calendar data is unavailable",
  powerOn: "Power is on",
  powerOnNoOutages: "Power is on • No scheduled outages",
  nextOutageAt: "Next outage at",
  possibleOutageAt: "Possible outage at",
  outageUntil: "Outage until",
  outageOngoing: "Outage active",
  inPrefix: "In",
  remainingSuffix: "remaining",
  durationLabel: "duration",
  expectedRestoration: "Restoration ~",
  batteryLabel: "Battery",
  hoursHeader: "Hours",
  daysHeader: "Day",
  todayTag: "today",
  nowTag: "now",
  viewToday: "Today",
  viewWeek: "Week",
  noOutagesToday: "No scheduled outages",
  batteryEnough: "sufficient",
  batteryReserve: "reserve",
  weeklyPlanDisabledNotice: "Weekly forecast disabled by operator — showing published days",
  dayUnscheduledLabel: "Awaiting schedule",
  collapsedDaysPrefix: "No forecast",
  slotOn: "Power on",
  slotOff: "Outage",
  slotMaybe: "Possible outage",
  legOn: "On",
  legOff: "Off",
  legMaybe: "Maybe",
  legFirst: "First 30m",
  legSecond: "Second 30m",
  connOk: "DTEK",
  connMirror: "Mirror",
  connOffline: "Offline",
  staleSuffix: "cached",
  addressKinds: {
    emergency: "Emergency address outage",
    planned: "Planned address works",
    stabilization: "Stabilization outage",
    other: "Address outage",
  },
  weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  weekdaysShort: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  editor: {
    entity: "Primary entity (sensor or calendar)",
    title: "Card title (optional)",
    style: "Visual style",
    styleDtek: "DTEK Table (00-01..23-24)",
    styleModern: "Modern tiles",
    styleTimeline: "Continuous Timeline + now line",
    theme: "Color theme",
    themeAuto: "Auto (Home Assistant theme)",
    themeDtekLight: "DTEK Light",
    themeDtekDark: "DTEK Dark",
    themeKioskDark: "Kiosk Dark (green/red)",
    themeOledBlack: "OLED Black (high contrast)",
    layout: "Layout",
    layoutFull: "Full",
    layoutCompact: "Compact",
    layoutKiosk: "Kiosk (large text)",
    viewMode: "Card views",
    viewModeDailyOnly: "Daily only",
    viewModeSwitchable: "Today / Week switcher",
    viewModeBoth: "Today + Week stacked",
    defaultView: "Initial tab",
    modernGrid: "Tile grid (modern style)",
    intervalDisplay: "Interval display",
    intervalAuto: "Auto (by style)",
    intervalChips: "Color interval chips",
    intervalText: "Summary text",
    intervalBoth: "Chips + text",
    intervalNone: "Hidden",
    weeklyView: "Weekly layout",
    weeklyAuto: "Auto (responsive desktop/mobile)",
    weeklyBars: "Continuous 7x24 bars + now",
    weeklyTable: "DTEK 7x24 table",
    weeklyList: "Compact day list",
    mobileWeeklyView: "Mobile layout (when Auto)",
    mobileWeeklyList: "Day list with merged intervals",
    mobileWeeklyBars: "7 continuous color bars",
    emptyDaysMode: "Empty unscheduled days",
    emptyDaysAuto: "Auto (7 days desktop, collapsed mobile)",
    emptyDaysCompact: "Collapse empty days into one line",
    emptyDaysHide: "Hide unscheduled days",
    emptyDaysShowAll: "Always show all 7 days",
    rowOrder: "Weekday order",
    rowOrderMonSun: "Mon–Sun (calendar week)",
    rowOrderRolling: "From today (next 7 days)",
    language: "Card language",
    langAuto: "Auto (HA locale)",
    sectionBattery: "Battery / Inverter (optional)",
    batteryEntity: "Battery SOC entity (%)",
    batteryRuntimeEntity: "Battery runtime entity (min/h)",
    batteryLowThreshold: "Low battery threshold (%)",
    sectionVisibility: "Visible card elements",
    showHeader: "Show header",
    showGroupBadge: "Show group pill",
    showRegion: "Show region subtitle",
    showConnection: "Show connection status",
    showCountdown: "Show live countdown",
    showAddressAlert: "Show address outage alert",
    showReadout: "Show selected hour readout",
    showNowLine: "Show 'now' highlight / cursor line",
    showToday: "Show today block",
    showTomorrow: "Show tomorrow block",
    showPossible: "Show possible outages (grey zone)",
    showIntervalsText: "Show outage intervals",
    showLegend: "Show legend",
    advancedOverrides: "Manual entity overrides",
    calendarEntity: "Calendar entity (calendar.*_outages)",
    todayEntity: "Today sensor",
    tomorrowEntity: "Tomorrow sensor",
    groupEntity: "Group sensor",
    nextOutageEntity: "Next outage sensor",
    outageEndEntity: "Outage end sensor",
    scheduledOutageEntity: "Scheduled outage binary sensor",
    addressStatusEntity: "Address status sensor",
    restorationEntity: "Restoration timestamp sensor",
    connectionEntity: "Connection sensor",
  },
};

const RU: TranslationStrings = {
  cardDefaultTitle: "График отключений",
  weeklyDefaultTitle: "График на неделю",
  groupPrefix: "Очередь",
  today: "Сегодня",
  tomorrow: "Завтра",
  hoursShort: "ч",
  minShort: "мин",
  hourUnit: "ч",
  noEntity: "Выберите сущность интеграции ua_outages в настройках карточки",
  noSchedule: "Данные графика еще не загружены",
  noTomorrow: "График на завтра еще не опубликован",
  noWeeklyData: "Данные недельного календаря отсутствуют",
  powerOn: "Свет есть",
  powerOnNoOutages: "Свет есть • Запланированных отключений нет",
  nextOutageAt: "Следующее отключение в",
  possibleOutageAt: "Возможное отключение в",
  outageUntil: "Отключение до",
  outageOngoing: "Идет отключение",
  inPrefix: "Через",
  remainingSuffix: "осталось",
  durationLabel: "длительность",
  expectedRestoration: "Восстановление ~",
  batteryLabel: "АКБ",
  hoursHeader: "Часы",
  daysHeader: "День",
  todayTag: "сегодня",
  nowTag: "сейчас",
  viewToday: "Сегодня",
  viewWeek: "Неделя",
  noOutagesToday: "Отключений не запланировано",
  batteryEnough: "хватит",
  batteryReserve: "запас",
  weeklyPlanDisabledNotice: "Недельный план отключен оператором — показаны опубликованные дни",
  dayUnscheduledLabel: "Ожидается график",
  collapsedDaysPrefix: "Без прогноза",
  slotOn: "Свет есть",
  slotOff: "Света нет",
  slotMaybe: "Возможное отключение",
  legOn: "Свет есть",
  legOff: "Света нет",
  legMaybe: "Возможно",
  legFirst: "Первые 30 мин",
  legSecond: "Вторые 30 мин",
  connOk: "DTEK",
  connMirror: "Зеркало",
  connOffline: "Офлайн",
  staleSuffix: "кэш",
  addressKinds: {
    emergency: "Аварийное отключение по адресу",
    planned: "Плановые работы по адресу",
    stabilization: "Стабилизационное отключение",
    other: "Отключение по адресу",
  },
  weekdays: ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
  weekdaysShort: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  editor: {
    entity: "Основная сущность (сенсор или календарь)",
    title: "Заголовок карточки (необязательно)",
    style: "Стиль отображения",
    styleDtek: "Таблица ДТЭК (00-01..23-24)",
    styleModern: "Современные плитки",
    styleTimeline: "Сплошная шкала + сейчас",
    theme: "Цветовая тема",
    themeAuto: "Авто (тема Home Assistant)",
    themeDtekLight: "ДТЭК Светлая",
    themeDtekDark: "ДТЭК Темная",
    themeKioskDark: "Киоск Темная (зеленый/красный)",
    themeOledBlack: "OLED Черная (контраст)",
    layout: "Макет",
    layoutFull: "Полный",
    layoutCompact: "Компактный",
    layoutKiosk: "Киоск (крупный шрифт)",
    viewMode: "Режимы просмотра",
    viewModeDailyOnly: "Только суточный график",
    viewModeSwitchable: "Переключатель Сегодня / Неделя",
    viewModeBoth: "Сегодня + Неделя вместе",
    defaultView: "Начальная вкладка",
    modernGrid: "Сетка плиток (современный стиль)",
    intervalDisplay: "Формат интервалов",
    intervalAuto: "Авто (по стилю)",
    intervalChips: "Цветные чипы интервалов",
    intervalText: "Текстовая строка",
    intervalBoth: "Чипы + текст",
    intervalNone: "Скрыть",
    weeklyView: "Вид недельного графика",
    weeklyAuto: "Авто (адаптивно для телефона/ПК)",
    weeklyBars: "Сплошные полосы 7×24 + сейчас",
    weeklyTable: "Таблица ДТЭК 7×24",
    weeklyList: "Компактный список по дням",
    mobileWeeklyView: "На узком экране (при Авто)",
    mobileWeeklyList: "Список с объединенными интервалами",
    mobileWeeklyBars: "7 сплошных цветных полос",
    emptyDaysMode: "Пустые дни без прогноза",
    emptyDaysAuto: "Авто (7 дней на ПК, свернутые на телефоне)",
    emptyDaysCompact: "Свернуть пустые дни в одну строку",
    emptyDaysHide: "Скрыть пустые дни",
    emptyDaysShowAll: "Показывать все 7 дней",
    rowOrder: "Порядок дней",
    rowOrderMonSun: "Пн–Вс (неделя)",
    rowOrderRolling: "От сегодня (7 дней)",
    language: "Язык карточки",
    langAuto: "Авто (язык HA)",
    sectionBattery: "Аккумулятор / Инвертор (необязательно)",
    batteryEntity: "Сенсор заряда АКБ (%)",
    batteryRuntimeEntity: "Сенсор запаса времени АКБ (мин/ч)",
    batteryLowThreshold: "Порог низкого заряда (%)",
    sectionVisibility: "Элементы карточки",
    showHeader: "Показывать шапку",
    showGroupBadge: "Показывать бейдж очереди",
    showRegion: "Показывать название региона",
    showConnection: "Показывать статус подключения",
    showCountdown: "Показывать живой таймер",
    showAddressAlert: "Показывать алерт по адресу",
    showReadout: "Показывать детали выбранного часа",
    showNowLine: "Показывать подсветку / линию «сейчас»",
    showToday: "Показывать блок сегодня",
    showTomorrow: "Показывать блок завтра",
    showPossible: "Показывать возможные отключения (серая зона)",
    showIntervalsText: "Показывать интервалы отключений",
    showLegend: "Показывать легенду",
    advancedOverrides: "Ручное переопределение сущностей",
    calendarEntity: "Сущность календаря (calendar.*_outages)",
    todayEntity: "Сенсор на сегодня",
    tomorrowEntity: "Сенсор на завтра",
    groupEntity: "Сенсор очереди",
    nextOutageEntity: "Сенсор следующего отключения",
    outageEndEntity: "Сенсор конца отключений",
    scheduledOutageEntity: "Бинарный сенсор планового отключения",
    addressStatusEntity: "Сенсор статуса по адресу",
    restorationEntity: "Сенсор времени восстановления",
    connectionEntity: "Сенсор подключения",
  },
};

export const TRANSLATIONS: Record<SupportedLanguage, TranslationStrings> = {
  uk: UK,
  en: EN,
  ru: RU,
};

export function resolveLanguage(
  configLang: CardLanguage | undefined,
  hassLang: string | undefined,
): SupportedLanguage {
  if (configLang === "uk" || configLang === "en" || configLang === "ru") {
    return configLang;
  }
  const norm = (hassLang ?? "uk").toLowerCase();
  if (norm.startsWith("uk")) return "uk";
  if (norm.startsWith("ru")) return "ru";
  if (norm.startsWith("en")) return "en";
  return "en";
}

export function getStrings(lang: SupportedLanguage): TranslationStrings {
  return TRANSLATIONS[lang];
}

export function formatDuration(totalMinutes: number, lang: SupportedLanguage): string {
  const safe = Math.max(0, Math.round(totalMinutes));
  const t = TRANSLATIONS[lang];
  const hours = Math.floor(safe / 60);
  const mins = safe % 60;
  if (hours === 0) {
    return `${mins} ${t.minShort}`;
  }
  if (mins === 0) {
    return `${hours} ${t.hoursShort}`;
  }
  return `${hours} ${t.hoursShort} ${String(mins).padStart(2, "0")} ${t.minShort}`;
}

export function slotLabel(slot: SlotState, lang: SupportedLanguage): string {
  const t = TRANSLATIONS[lang];
  if (slot === "0") return t.slotOff;
  if (slot === "?") return t.slotMaybe;
  return t.slotOn;
}
