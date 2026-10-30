import { describe, expect, it } from "vitest";
import { fieldLabel, translate, uiLanguage } from "../src/helpers/localize";
import { cleanLabel, displayState } from "../src/helpers/formatting";
import { coffeeDefinition, dishwasherDefinition, hobDefinition, hoodDefinition, ovenDefinition } from "../src/definitions";
import type { HassEntity, HomeAssistant } from "../src/types/home-assistant";

function entity(state: string, entityId = "sensor.test", attributes: HassEntity["attributes"] = {}): HassEntity {
  return { entity_id: entityId, state, attributes, last_changed: "", last_updated: "" };
}

function hassFor(language: string): HomeAssistant {
  return { language, states: {}, callService: async () => undefined, callWS: async () => [] } as unknown as HomeAssistant;
}

describe("UI localization", () => {
  it("resolves the base language from regional Home Assistant languages", () => {
    expect(uiLanguage(hassFor("de-CH"))).toBe("de");
    expect(uiLanguage(hassFor("en-GB"))).toBe("en");
    expect(uiLanguage(undefined)).toBe("en");
  });

  it("translates fixed UI copy and field labels to German", () => {
    const german = hassFor("de");
    expect(translate(german, "section.options", "Options")).toBe("Optionen");
    expect(translate(german, "action.cancel", "Cancel")).toBe("Abbrechen");
    const salt = dishwasherDefinition.fields.find((field) => field.key === "salt_entity")!;
    expect(fieldLabel(german, salt)).toBe("Salz");
  });

  it("falls back to the English source text for other languages", () => {
    expect(translate(hassFor("en"), "section.options", "Options")).toBe("Options");
    expect(translate(hassFor("fr"), "section.options", "Options")).toBe("Options");
  });

  it("uses the entity names of Home Connect Direct 1.13.0 for renamed fields", () => {
    const coffee = (key: string) => coffeeDefinition.fields.find((field) => field.key === key)!;
    expect(coffee("bean_amount_entity").label).toBe("Strength");
    expect(fieldLabel(hassFor("de"), coffee("bean_amount_entity"))).toBe("Stärke");
    expect(coffee("multiple_beverages_entity").label).toBe("Double cup");
    expect(fieldLabel(hassFor("de"), coffee("multiple_beverages_entity"))).toBe("Doppelbezug");
    expect(fieldLabel(hassFor("de"), coffee("grounds_container_entity"))).toBe("Tresterbehälter");
    expect(fieldLabel(hassFor("de"), coffee("drip_tray_entity"))).toBe("Tropfschale");
  });

  it("provides a German label for every card field", () => {
    const german = hassFor("de");
    const definitions = [coffeeDefinition, dishwasherDefinition, hobDefinition, hoodDefinition, ovenDefinition];
    const missing = definitions.flatMap((definition) => definition.fields
      .filter((field) => translate(german, `field.${field.key}`, "") === "")
      .map((field) => `${definition.kind}.${field.key}`));
    expect(missing).toEqual([]);
  });

  it("localizes raw Home Connect states and unavailable values in German", () => {
    const german = { ...hassFor("de"), formatEntityState: (value: HassEntity) => cleanLabel(value.state) };
    expect(displayState(german, entity("BSH.Common.EnumType.OperationState.Run"))).toBe("Läuft");
    expect(displayState(german, entity("unavailable"))).toBe("Nicht verfügbar");
    expect(displayState(german, undefined)).toBe("Nicht konfiguriert");
  });
});
