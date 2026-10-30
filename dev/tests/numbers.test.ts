import { describe, expect, it } from "vitest";
import { formatNumber, numberSpec, stepNumber } from "../../src/helpers/numbers";
import type { HassEntity, HomeAssistant } from "../../src/types/home-assistant";

function number(state: string, attributes: HassEntity["attributes"]): HassEntity {
  return { entity_id: "number.test", state, attributes, last_changed: "", last_updated: "" };
}
const hass = (language: string) => ({ language }) as unknown as HomeAssistant;

describe("number controls", () => {
  it("steps temperatures by 5 and stays inside the entity range", () => {
    const spec = numberSpec(number("180", { unit_of_measurement: "°C", min: 30, max: 300, step: 1, device_class: "temperature" }));
    expect(stepNumber(spec, 180, 1)).toBe(185);
    expect(stepNumber(spec, 32, -1)).toBe(30);
    expect(stepNumber(spec, 300, 1)).toBe(300);
  });

  it("steps durations in whole minutes whatever unit the entity uses", () => {
    const seconds = numberSpec(number("3600", { unit_of_measurement: "s", min: 0, max: 86340, step: 1, device_class: "duration" }));
    expect(stepNumber(seconds, 3600, 1)).toBe(3660);
    const minutes = numberSpec(number("10", { unit_of_measurement: "min", min: 0, max: 4440, step: 1, device_class: "duration" }));
    expect(stepNumber(minutes, 10, -1)).toBe(9);
    expect(stepNumber(minutes, 0, -1)).toBe(0);
  });

  it("shows durations as minutes or hours and keeps the entity step for other values", () => {
    const seconds = numberSpec(number("3600", { unit_of_measurement: "s", min: 0, max: 86340, step: 1, device_class: "duration" }));
    expect(formatNumber(hass("en"), seconds, 3600)).toBe("1:00 h");
    expect(formatNumber(hass("en"), seconds, 600)).toBe("10 min");
    expect(formatNumber(hass("de"), seconds, 600)).toBe("10 Min.");
    const volume = numberSpec(number("140", { unit_of_measurement: "mL", min: 80, max: 140, step: 20 }));
    expect(stepNumber(volume, 140, -1)).toBe(120);
    expect(formatNumber(hass("en"), volume, 120)).toBe("120 mL");
  });
});
