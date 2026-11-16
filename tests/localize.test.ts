import { describe, expect, it } from "vitest";
import { formatDuration, resolveLanguage, slotLabel, TRANSLATIONS } from "../src/localize";

describe("localization consistency", () => {
  it("keeps identical key structure across uk, en, and ru translations", () => {
    const baseKeys = Object.keys(TRANSLATIONS.en).sort();
    expect(Object.keys(TRANSLATIONS.uk).sort()).toEqual(baseKeys);
    expect(Object.keys(TRANSLATIONS.ru).sort()).toEqual(baseKeys);

    const editorKeys = Object.keys(TRANSLATIONS.en.editor).sort();
    expect(Object.keys(TRANSLATIONS.uk.editor).sort()).toEqual(editorKeys);
    expect(Object.keys(TRANSLATIONS.ru.editor).sort()).toEqual(editorKeys);

    expect(TRANSLATIONS.uk.weekdays).toHaveLength(7);
    expect(TRANSLATIONS.en.weekdays).toHaveLength(7);
    expect(TRANSLATIONS.ru.weekdays).toHaveLength(7);
  });

  it("resolves languages and formats durations cleanly", () => {
    expect(resolveLanguage("auto", "uk-UA")).toBe("uk");
    expect(resolveLanguage("auto", "ru")).toBe("ru");
    expect(resolveLanguage("auto", "de-DE")).toBe("en");
    expect(resolveLanguage("en", "uk-UA")).toBe("en");

    expect(formatDuration(150, "uk")).toBe("2 год 30 хв");
    expect(formatDuration(45, "en")).toBe("45 min");
    expect(formatDuration(120, "ru")).toBe("2 ч");
    expect(slotLabel("?", "uk")).toBe("Можливе відключення");
  });
});
