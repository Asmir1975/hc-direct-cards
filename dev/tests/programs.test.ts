import { describe, expect, it } from "vitest";
import { customProgramName, displayProgramName } from "../../src/helpers/programs";
import type { HassEntity, HomeAssistant } from "../../src/types/home-assistant";

const hass = { states: {} } as unknown as HomeAssistant;
const program = {
  entity_id: "sensor.oven_active_program",
  state: "Cooking.Oven.Program.HeatingMode.PizzaSetting",
  attributes: {},
  last_changed: "",
  last_updated: "",
} as HassEntity;

describe("manual program names", () => {
  it("uses an exact manual display name without changing the original value", () => {
    const names = { "Cooking.Oven.Program.HeatingMode.PizzaSetting": "Meine Pizza" };
    expect(customProgramName(program.state, names)).toBe("Meine Pizza");
    expect(displayProgramName(hass, program, names)).toBe("Meine Pizza");
    expect(program.state).toBe("Cooking.Oven.Program.HeatingMode.PizzaSetting");
  });

  it("falls back to the normal state display for missing or blank mappings", () => {
    expect(customProgramName(program.state, { [program.state]: "   " })).toBeUndefined();
    expect(displayProgramName(hass, program, {})).toBe("Pizza Setting");
  });
});
