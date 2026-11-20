import "./ua-outages-card";
import "./ua-outages-weekly-card";
import "./editor";
import { CustomCardEntry } from "./types";

declare global {
  interface Window {
    customCards?: CustomCardEntry[];
  }
}

const CARD_DEFS: readonly CustomCardEntry[] = [
  {
    type: "ua-outages-card",
    name: "UA Outages Card",
    description:
      "Today and tomorrow Ukrainian power outage schedule card with DTEK table and modern tile styles.",
    preview: true,
    documentationURL: "https://github.com/shed-crypto/lovelace-ua-outages-card",
  },
  {
    type: "ua-outages-weekly-card",
    name: "UA Outages Weekly Card",
    description: "7x24 weekly power outage schedule matrix in DTEK table style.",
    preview: true,
    documentationURL: "https://github.com/shed-crypto/lovelace-ua-outages-card",
  },
];

window.customCards = window.customCards || [];
for (const entry of CARD_DEFS) {
  if (!window.customCards.some((existing) => existing.type === entry.type)) {
    window.customCards.push(entry);
  }
}

console.info("UA-OUTAGES-CARD 0.1.1 loaded");
