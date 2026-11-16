# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- `timeline` visual style featuring continuous `00..23` colored bars, live minute-accurate yellow `"now"` cursor badge/line, and merged interval chips.
- `kiosk_dark` and `oled_black` built-in themes.
- Unified card `view_mode` (`daily_only` | `switchable` | `both`) allowing one-tap header switching between Today and Week inside `custom:ua-outages-card`.
- Container-responsive weekly card layouts (`auto` | `timeline_bars` | `table` | `list`), mobile mode preference (`list` | `compact_bars`), and `empty_days_mode` (`compact_empty` | `hide_unscheduled` | `show_all`) with automatic operator-disabled forecast notice.
- Optional `battery_runtime_entity` and `battery_low_threshold` alongside `battery_soc_entity` to report backup reserve sufficiency before the next outage.
- Granular per-block visibility controls (`show_header`, `show_group_badge`, `show_region`, `show_connection`, `show_address_alert`, `show_readout`, `show_now_line`, `show_today`, `show_tomorrow`, `show_possible`, `interval_display`) in both visual UI editors, allowing independent card-level filtering of grey-zone (`?`) possible outages without changing HA integration settings.

### Fixed
- Multi-line header and readout wrapping in narrow Home Assistant `sections` columns, plus automatic removal of duplicated queue names from auto-discovered card titles.
- Weekly card today row highlighting so confirmed outages remain visually distinct from possible outages across all themes and weekdays.

## [0.1.0] - 2026-11-16

### Added
- `custom:ua-outages-card` supporting `dtek` (`00-01`..`23-24` table with crossed-lightning icons and half-hour splits) and `modern` (`2x12`/`1x24` labeled tiles) styles, `full`/`compact`/`kiosk` layouts, live browser countdown, emergency outage alert, and optional `battery_soc_entity` badge.
- `custom:ua-outages-weekly-card` displaying a 7x24 weekly outage matrix with `mon_sun` and `rolling` orders, today row highlight, and cached Home Assistant calendar API integration.
- Built-in `auto` (Home Assistant theme), `dtek_light`, and `dtek_dark` color themes.
- Device-based automatic entity discovery (`device_id` + `translation_key` + prefix fallback) and manual entity overrides.
- Visual UI editors for both cards and `uk` / `en` / `ru` localizations.
- TypeScript strict build with Rollup, ESLint, Prettier, Vitest test suite, and HACS `plugin` GitHub workflows.

