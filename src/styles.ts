import { css } from "lit";

export const cardStyles = css`
  :host {
    display: block;
    --ua-bg: var(--ha-card-background, var(--card-background-color, #ffffff));
    --ua-sub: var(--secondary-background-color, rgba(127, 127, 127, 0.08));
    --ua-fg: var(--primary-text-color, #1f2937);
    --ua-muted: var(--secondary-text-color, #6b7280);
    --ua-border: var(--divider-color, rgba(127, 127, 127, 0.25));
    --ua-accent: var(--primary-color, #03a9f4);
    --ua-success: var(--success-color, #16a34a);
    --ua-warning: var(--warning-color, #eab308);
    --ua-error: var(--error-color, #dc2626);
    --ua-off-bg: color-mix(in srgb, var(--ua-error) 34%, var(--ua-bg));
    --ua-maybe-bg: color-mix(in srgb, var(--ua-warning) 20%, var(--ua-bg));
    --ua-on-bg: color-mix(in srgb, var(--ua-success) 20%, var(--ua-bg));
    --ua-today-row-bg: #ffd600;
    --ua-today-row-fg: #14171f;
    --ua-today-off-bg: color-mix(in srgb, #ffd600 72%, var(--ua-bg));
    --ua-today-maybe-bg: color-mix(in srgb, #ffd600 28%, var(--ua-bg));
    --ua-today-on-bg: color-mix(in srgb, #ffd600 10%, var(--ua-bg));
    --ua-bolt-color: var(--ua-fg);
    --ua-bolt-warn: #eab308;
    --ua-yellow-bg: #ffd600;
    --ua-yellow-fg: #14171f;
  }

  :host([data-theme="dtek_light"]) {
    --ua-bg: #ffffff;
    --ua-sub: #f3f4f6;
    --ua-fg: #14171f;
    --ua-muted: #4b5563;
    --ua-border: #d1d5db;
    --ua-accent: #d97706;
    --ua-off-bg: #d1d5db;
    --ua-maybe-bg: #eef0f4;
    --ua-on-bg: #ffffff;
    --ua-today-row-bg: #ffd600;
    --ua-today-row-fg: #14171f;
    --ua-today-off-bg: #ffd600;
    --ua-today-maybe-bg: #fff3b0;
    --ua-today-on-bg: #fffbeb;
    --ua-bolt-color: #1f2937;
    --ua-bolt-warn: #eab308;
  }

  :host([data-theme="dtek_dark"]) {
    --ua-bg: #181b22;
    --ua-sub: #222733;
    --ua-fg: #f3f4f6;
    --ua-muted: #9ca3af;
    --ua-border: #363c4a;
    --ua-accent: #ffd600;
    --ua-off-bg: #3b4252;
    --ua-maybe-bg: #262c38;
    --ua-on-bg: #181b22;
    --ua-today-row-bg: #ffd600;
    --ua-today-row-fg: #14171f;
    --ua-today-off-bg: #9a7b00;
    --ua-today-maybe-bg: #38321b;
    --ua-today-on-bg: #222018;
    --ua-bolt-color: #e5e7eb;
    --ua-bolt-warn: #facc15;
  }

  ha-card {
    background: var(--ua-bg);
    color: var(--ua-fg);
    border-color: var(--ua-border);
    padding: 14px;
    box-sizing: border-box;
    font-size: 13px;
    line-height: 1.4;
  }

  :host([data-layout="kiosk"]) ha-card {
    padding: 18px;
    font-size: 15px;
  }

  .wrap {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
  }

  .title {
    font-size: 15px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  :host([data-layout="kiosk"]) .title {
    font-size: 18px;
  }

  .badge-group {
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    white-space: nowrap;
    flex-shrink: 0;
    background: var(--ua-sub);
    color: var(--ua-fg);
    border: 1px solid var(--ua-border);
  }

  .badge-group.dtek-pill {
    background: var(--ua-yellow-bg);
    color: var(--ua-yellow-fg);
    border-color: transparent;
  }

  .region {
    font-size: 12px;
    color: var(--ua-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .conn {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: var(--ua-muted);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    flex-shrink: 0;
  }

  .dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .dot.ok {
    background: var(--ua-success);
  }
  .dot.mirror {
    background: var(--ua-warning);
  }
  .dot.offline {
    background: var(--ua-error);
  }

  .hero {
    border-radius: 10px;
    border: 1px solid var(--ua-border);
    padding: 10px 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .hero.tone-success {
    border-color: color-mix(in srgb, var(--ua-success) 52%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-success) 10%, var(--ua-bg));
  }

  .hero.tone-error {
    border-color: color-mix(in srgb, var(--ua-error) 55%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-error) 12%, var(--ua-bg));
  }

  .hero.tone-warning {
    border-color: color-mix(in srgb, var(--ua-warning) 60%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-warning) 13%, var(--ua-bg));
  }

  .hero-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 8px;
  }

  .hero-main {
    font-size: 14px;
    font-weight: 600;
  }

  :host([data-layout="kiosk"]) .hero-main {
    font-size: 17px;
  }

  .hero-sub {
    font-size: 12px;
    color: var(--ua-muted);
  }

  .battery-pill {
    padding: 2px 8px;
    border-radius: 999px;
    border: 1px solid var(--ua-border);
    background: var(--ua-sub);
    font-size: 12px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .battery-pill.low {
    border-color: var(--ua-error);
    color: var(--ua-error);
  }

  .progress-track {
    width: 100%;
    height: 6px;
    border-radius: 999px;
    background: var(--ua-sub);
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 999px;
    background: var(--ua-error);
    transition: width 0.3s ease;
  }

  .alert-banner {
    border-radius: 8px;
    border: 1px solid color-mix(in srgb, var(--ua-warning) 62%, var(--ua-border));
    background: color-mix(in srgb, var(--ua-warning) 14%, var(--ua-bg));
    padding: 8px 10px;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .alert-title {
    font-weight: 600;
  }

  .readout-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 12px;
  }

  .section-lbl {
    color: var(--ua-muted);
    font-weight: 600;
  }

  .hover-readout {
    font-family: var(--code-font-family, monospace);
    font-variant-numeric: tabular-nums;
    color: var(--ua-fg);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .table-scroll {
    overflow-x: auto;
  }

  .dtek-table {
    width: 100%;
    min-width: 420px;
    border-collapse: separate;
    border-spacing: 0;
    table-layout: fixed;
    border: 1px solid var(--ua-border);
    border-radius: 8px;
    overflow: hidden;
  }

  .dtek-table th,
  .dtek-table td {
    border-right: 1px solid var(--ua-border);
    border-bottom: 1px solid var(--ua-border);
    padding: 0;
    text-align: center;
    vertical-align: middle;
  }

  .dtek-table th:last-child,
  .dtek-table td:last-child {
    border-right: none;
  }

  .dtek-table tbody tr:last-child td {
    border-bottom: none;
  }

  .dtek-corner {
    width: 88px;
    background: var(--ua-sub);
    font-size: 12px;
    font-weight: 600;
    padding: 0 6px;
  }

  .dtek-vhead-cell {
    background: var(--ua-sub);
    padding: 3px 0;
  }

  .dtek-vhead {
    writing-mode: vertical-rl;
    transform: rotate(180deg);
    display: inline-block;
    font-size: 11px;
    line-height: 1;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .dtek-day-cell {
    background: var(--ua-sub);
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    padding: 0 7px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .dtek-day-cell.today-highlight {
    background: var(--ua-today-row-bg);
    color: var(--ua-today-row-fg);
  }

  .dtek-cell {
    position: relative;
    height: 28px;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
    width: 100%;
    display: block;
  }

  .dtek-cell.compact-row {
    height: 24px;
  }

  :host([data-layout="kiosk"]) .dtek-cell {
    height: 34px;
  }

  .dtek-cell:hover {
    outline: 2px solid var(--ua-fg);
    outline-offset: -2px;
    z-index: 4;
  }

  .dtek-cell.is-now {
    outline: 2px solid var(--ua-accent);
    outline-offset: -2px;
    z-index: 5;
  }

  .dtek-cell-bg {
    position: absolute;
    inset: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .dtek-cell-icon {
    position: relative;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .dtek-empty-row {
    font-size: 12px;
    color: var(--ua-muted);
    text-align: left;
    padding: 6px 10px;
  }

  /* Modern 24-hour tiles */
  .grid-2x12 {
    display: grid;
    grid-template-columns: repeat(12, minmax(0, 1fr));
    gap: 4px;
  }

  .grid-1x24 {
    display: grid;
    grid-template-columns: repeat(24, minmax(0, 1fr));
    gap: 2px;
  }

  .hour-tile {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    height: 28px;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid var(--ua-border);
    cursor: pointer;
    padding: 0;
    background: none;
  }

  .hour-tile.mini {
    height: 22px;
  }

  :host([data-layout="kiosk"]) .hour-tile {
    height: 34px;
  }

  .hour-tile:hover {
    border-color: var(--ua-fg);
    z-index: 4;
  }

  .hour-tile.is-now {
    border: 2px solid var(--ua-accent);
    z-index: 5;
  }

  .half-slot {
    height: 100%;
    position: relative;
  }

  .half-slot.split {
    border-right: 1px dashed color-mix(in srgb, var(--ua-fg) 35%, transparent);
  }

  .half-slot.now-half::after {
    content: "";
    position: absolute;
    bottom: 2px;
    left: 50%;
    transform: translateX(-50%);
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: var(--ua-accent);
  }

  .slot-on {
    background: var(--ua-on-bg);
  }

  .slot-off {
    background: var(--ua-off-bg);
  }

  .slot-maybe {
    background-color: var(--ua-maybe-bg);
    background-image: repeating-linear-gradient(
      -45deg,
      color-mix(in srgb, var(--ua-warning) 36%, transparent),
      color-mix(in srgb, var(--ua-warning) 36%, transparent) 3px,
      transparent 3px,
      transparent 6px
    );
  }

  .hour-badge {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    font-size: 12px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    color: var(--ua-fg);
    text-shadow: 0 0 4px color-mix(in srgb, var(--ua-bg) 88%, transparent);
  }

  .tmr-box {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .tmr-unpublished {
    padding: 6px 10px;
    border-radius: 6px;
    border: 1px dashed var(--ua-border);
    font-size: 12px;
    color: var(--ua-muted);
  }

  .footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--ua-border);
    font-size: 12px;
    color: var(--ua-muted);
  }

  .legend {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }

  .legend-item {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .legend-swatch {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    border: 1px solid var(--ua-border);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }

  .empty-state {
    padding: 16px;
    text-align: center;
    color: var(--ua-muted);
    font-size: 13px;
  }
`;
