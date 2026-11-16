# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-11-16

### Added
- `custom:ua-outages-card` supporting `dtek` (`00-01`..`23-24` table with crossed-lightning icons and half-hour splits) and `modern` (`2x12`/`1x24` labeled tiles) styles, `full`/`compact`/`kiosk` layouts, live browser countdown, emergency outage alert, and optional `battery_soc_entity` badge.
- `custom:ua-outages-weekly-card` displaying a 7x24 weekly outage matrix with `mon_sun` and `rolling` orders, today row highlight, and cached Home Assistant calendar API integration.
- Built-in `auto` (Home Assistant theme), `dtek_light`, and `dtek_dark` color themes.
- Device-based automatic entity discovery (`device_id` + `translation_key` + prefix fallback) and manual entity overrides.
- Visual UI editors for both cards and `uk` / `en` / `ru` localizations.
- TypeScript strict build with Rollup, ESLint, Prettier, Vitest test suite, and HACS `plugin` GitHub workflows.

