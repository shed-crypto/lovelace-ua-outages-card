# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-11-16

### Added
- `custom:ua-outages-card` supporting `dtek` (`00-01`..`23-24` table with crossed-lightning icons and half-hour splits), `modern` (`2x12`/`1x24` labeled tiles), and `timeline` (continuous `00..23` colored bar with live minute-accurate `"now"` badge/cursor and interval chips) styles, `full`/`compact`/`kiosk` layouts, `view_mode` (`daily_only` | `switchable` | `both`), live browser countdown, emergency outage alert, and optional battery indicators (`battery_soc_entity`, `battery_runtime_entity`, `battery_low_threshold`).
- `custom:ua-outages-weekly-card` displaying a 7x24 weekly outage schedule with container-responsive `auto` / `timeline_bars` / `table` / `list` views, mobile preferences (`list` | `compact_bars`), `empty_days_mode` (`auto` | `compact_empty` | `hide_unscheduled` | `show_all`), `mon_sun` / `rolling` row order, today row and active hour column highlighting, merged interval summaries, automatic operator-disabled forecast notice, and cached Home Assistant calendar API integration.
- Five built-in color themes: `auto` (Home Assistant theme), `dtek_light`, `dtek_dark`, `kiosk_dark`, and `oled_black`.
- Device-based automatic entity discovery (`device_id` + `translation_key` + prefix fallback), queue name deduplication in auto-discovered titles, multi-line responsive header wrapping, and manual entity overrides.
- Granular per-block visibility controls (`show_header`, `show_group_badge`, `show_region`, `show_connection`, `show_address_alert`, `show_readout`, `show_now_line`, `show_today`, `show_tomorrow`, `show_possible`, `show_intervals_text`, `show_legend`, `interval_display`) in both visual UI editors, plus `uk` / `en` / `ru` localizations.
- TypeScript strict build with Rollup, ESLint, Prettier, Vitest test suite, and HACS `plugin` GitHub workflows.

