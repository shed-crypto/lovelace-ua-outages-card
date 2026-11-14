import { svg, TemplateResult } from "lit";

export function renderCrossedBolt(options: {
  size?: number;
  accent?: boolean;
  faded?: boolean;
}): TemplateResult {
  const size = options.size ?? 13;
  const fillColor = options.accent
    ? "var(--ua-bolt-warn, var(--warning-color, #eab308))"
    : "var(--ua-bolt-color, var(--primary-text-color))";
  const slashColor = "var(--ua-bolt-color, var(--primary-text-color))";
  const opacity = options.faded ? "0.45" : "0.92";

  return svg`
    <svg
      width="${size}"
      height="${size}"
      viewBox="0 0 24 24"
      fill="none"
      style="opacity: ${opacity}; display: block;"
      aria-hidden="true"
    >
      <path d="M13 2L5 14h6l-1 8 8-12h-6l1-8z" fill="${fillColor}" />
      <path
        d="M3 3l18 18"
        stroke="${slashColor}"
        stroke-width="2.5"
        stroke-linecap="round"
      />
    </svg>
  `;
}
