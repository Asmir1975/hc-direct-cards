import { describe, it, expect, vi } from "vitest";
import { discoverEntities, type RegistryEntry } from "../../src/helpers/registry";
import { coffeeDefinition, ovenDefinition, dishwasherDefinition } from "../../src/definitions";
import { showQuantityField } from "../../src/helpers/controls";
import { pressEntity, selectOption, setNumber, toggleEntity } from "../../src/helpers/services";
import { deriveMode, isWarningActive, displayState } from "../../src/helpers/formatting";
import type { HassEntity, HomeAssistant } from "../../src/types/home-assistant";

const state = (entity_id: string, value = "on", attributes = {}): HassEntity =>
  ({ entity_id, state: value, attributes, last_changed: "", last_updated: "" });
function fixture(keys: string[], platform = "homeconnect_ws") {
  const entries: RegistryEntry[] = keys.map((key, i) => ({
    entity_id: key.split("_")[0] === "binary" ? "binary_sensor.renamed_" + i : key.split("_")[0] + ".renamed_" + i,
    device_id: "appliance", platform, unique_id: "private-device-id-" + key,
    // Deliberately misleading user names must never trump the integration key.
    name: "Start status power alarm", original_name: "Custom label",
  }));
  const callService = vi.fn(async () => undefined);
  const hass = { states: Object.fromEntries(entries.map((e) => [e.entity_id, state(e.entity_id, "on", e.entity_id.startsWith("select.") ? {options:["on","off"]}: {})])),
    callService, callWS: vi.fn(async () => entries) } as unknown as HomeAssistant;
  const id = (key: string) => entries[keys.indexOf(key)].entity_id;
  return { entries, hass, id, callService };
}

describe("Home Connect Direct 1.13.0", () => {
  it("detects renamed coffee entities using stable registry keys", async () => {
    const f = fixture(["select_power_state","sensor_operation_state","select_program","sensor_active_program",
      "select_coffee_fill_quantity","number_fill_quantity","sensor_eq700_messages","binary_sensor_eq700_problem",
      "sensor_water_tank","sensor_drip_tray","sensor_pomace_container","binary_sensor_bean_container_empty",
      "select_bean_amount","select_aroma_select","select_favorite_order","sensor_shot_count","button_start_program",
      "button_abort_program","sensor_door_state","select_coffee_milk_ratio"]);
    const result = await discoverEntities(f.hass, f.id("sensor_operation_state"), coffeeDefinition, { type: coffeeDefinition.cardType });
    for (const [field, key] of Object.entries({
      power_entity: "select_power_state", operating_state_entity: "sensor_operation_state",
      selected_program_entity: "select_program", active_program_entity: "sensor_active_program",
      fill_quantity_select_entity: "select_coffee_fill_quantity", fill_quantity_entity: "number_fill_quantity",
      messages_entity: "sensor_eq700_messages", problem_entity: "binary_sensor_eq700_problem",
      grounds_container_entity: "sensor_pomace_container", beans_empty_entity: "binary_sensor_bean_container_empty",
      bean_amount_entity: "select_bean_amount", aroma_entity: "select_aroma_select",
      favorite_order_entity: "select_favorite_order", shot_count_entity: "sensor_shot_count",
      start_entity: "button_start_program", cancel_entity: "button_abort_program", door_entity: "sensor_door_state",
      milk_ratio_entity: "select_coffee_milk_ratio",
    })) expect(result[field]).toBe(f.id(key));
    expect(result.status_entity).toBeUndefined();
  });

  it("respects device boundaries, manual choices, disabled entries and orphaned old entities", async () => {
    const f = fixture(["sensor_operation_state","sensor_program_progress","button_start_program","sensor_eq700_messages","number_fill_quantity"]);
    f.entries[1].device_id = "other";
    f.entries[2].disabled_by = "user";
    delete f.hass.states[f.id("sensor_eq700_messages")];
    const result = await discoverEntities(f.hass, f.id("sensor_operation_state"), coffeeDefinition,
      { type: coffeeDefinition.cardType, fill_quantity_entity: "number.manual" });
    expect(result).toEqual({ operating_state_entity: f.id("sensor_operation_state") });
  });

  it("ignores restored obsolete entities and other platforms on the same device", async () => {
    const f = fixture(["sensor_operation_state","sensor_power_state","button_start_program"]);
    f.hass.states[f.id("sensor_power_state")].attributes.restored = true;
    f.entries[2].platform = "template"; f.entries[2].original_name = "Start";
    const result = await discoverEntities(f.hass, f.entries[0].entity_id, ovenDefinition, { type: ovenDefinition.cardType });
    expect(result.status_entity).toBeUndefined();
    expect(result.start_entity).toBeUndefined();
    expect(result.operating_state_entity).toBe(f.entries[0].entity_id);
  });

  it("does not confuse start delay, smart start or old status mirrors with power or actions", async () => {
    const f = fixture(["sensor_operation_state","switch_smart_start","number_start_in","button_start_program",
      "switch_power_state","binary_sensor_program_finished","sensor_estimated_remaining_program_time"]);
    const result = await discoverEntities(f.hass, f.id("sensor_operation_state"), dishwasherDefinition, { type: dishwasherDefinition.cardType });
    expect(result.start_entity).toBe(f.id("button_start_program"));
    expect(result.power_entity).toBe(f.id("switch_power_state"));
    expect(result.start_in_entity).toBe(f.id("number_start_in"));
    expect(result.status_entity).toBeUndefined();
    expect(result.remaining_time_entity).toBeUndefined();
  });

  it("finds oven cavity sensors, messages and the optional acknowledgement", async () => {
    const f = fixture(["sensor_operation_state","sensor_oven_current_temperature_1","sensor_oven_message_1",
      "sensor_oven_cavity_meatprobe_temperature_1","sensor_oven_meatprobe_target_temperature_1",
      "binary_sensor_oven_cavity_meatprobe_plugged_1","number_oven_setting_1_alarm_clock",
      "button_acknowledge_event","number_oven_setpoint_temperature"]);
    const result = await discoverEntities(f.hass, f.id("sensor_operation_state"), ovenDefinition, { type: ovenDefinition.cardType });
    expect(result.current_temperature_entity).toBe(f.id("sensor_oven_current_temperature_1"));
    expect(result.messages_entity).toBe(f.id("sensor_oven_message_1"));
    expect(result.alarm_entity).toBe(f.id("number_oven_setting_1_alarm_clock"));
    expect(result.acknowledge_event_entity).toBe(f.id("button_acknowledge_event"));
    expect(result.meatprobe_target_entity).toBe(f.id("sensor_oven_meatprobe_target_temperature_1"));
    expect(result.target_temperature_entity).toBe(f.id("number_oven_setpoint_temperature"));
  });

  it("leaves multiple equally plausible cavities unassigned", async () => {
    const f = fixture(["sensor_operation_state","sensor_oven_current_temperature_1","sensor_oven_current_temperature_2"]);
    const result = await discoverEntities(f.hass, f.id("sensor_operation_state"), ovenDefinition, { type: ovenDefinition.cardType });
    expect(result.current_temperature_entity).toBeUndefined();
  });

  it("uses translation keys when unique IDs are unavailable", async () => {
    const f = fixture(["sensor_operation_state"]);
    f.entries[0].unique_id = undefined; f.entries[0].translation_key = "sensor_operation_state";
    const result = await discoverEntities(f.hass, f.entries[0].entity_id, ovenDefinition, { type: ovenDefinition.cardType });
    expect(result.operating_state_entity).toBe(f.entries[0].entity_id);
  });

  it("detects dishwasher aggregates and retains remaining time units", async () => {
    const f = fixture(["sensor_operation_state","sensor_dishwasher_message","sensor_salt","sensor_rinse_aid",
      "switch_vario_speed_plus","sensor_remaining_program_time","sensor_door_state"]);
    const result = await discoverEntities(f.hass, f.entries[0].entity_id, dishwasherDefinition, { type: dishwasherDefinition.cardType });
    expect(result.messages_entity).toBe(f.id("sensor_dishwasher_message"));
    expect(result.vario_speed_entity).toBe(f.id("switch_vario_speed_plus"));
    expect(result.door_entity).toBe(f.id("sensor_door_state"));
    expect(displayState(f.hass, state(f.id("sensor_remaining_program_time"), "0.5", { unit_of_measurement: "h" }))).toBe("0.5 h");
  });


  it("switches quantity controls dynamically and keeps number fallback for other drinks", () => {
    const f = fixture(["select_coffee_fill_quantity","number_fill_quantity"]);
    const config = { type: coffeeDefinition.cardType, fill_quantity_select_entity: f.entries[0].entity_id };
    expect(showQuantityField("fill_quantity_select_entity", f.hass, config)).toBe(true);
    expect(showQuantityField("fill_quantity_entity", f.hass, config)).toBe(false);
    f.hass.states[f.entries[0].entity_id] = state(f.entries[0].entity_id, "unavailable");
    expect(showQuantityField("fill_quantity_select_entity", f.hass, config)).toBe(false);
    expect(showQuantityField("fill_quantity_entity", f.hass, config)).toBe(true);
  });

  it("dispatches exact options and unit-native numbers without conversion", async () => {
    const f = fixture([]);
    await selectOption(f.hass, state("select.amount", "120 ml", {options:["120 ml","150 ml"]}), "150 ml");
    await setNumber(f.hass, state("number.start_in", "0", { unit_of_measurement: "min" }), 30);
    expect(f.callService).toHaveBeenNthCalledWith(1, "select", "select_option", { entity_id: "select.amount", option: "150 ml" });
    expect(f.callService).toHaveBeenNthCalledWith(2, "number", "set_value", { entity_id: "number.start_in", value: 30 });
  });

  it.each(["select", "number", "switch"])("blocks readonly %s writes even if the device is idle", async (domain) => {
    const f = fixture([]); const e = state(domain + ".locked", "on", { readonly: true });
    const operation = domain === "select" ? selectOption(f.hass, e, "off") : domain === "number" ? setNumber(f.hass, e, 2) : toggleEntity(f.hass, e);
    await expect(operation).rejects.toThrow(/read-only/);
    expect(f.callService).not.toHaveBeenCalled();
  });

  it("allows an unpressed button but blocks an unavailable one", async () => {
    const f = fixture([]);
    await pressEntity(f.hass, state("button.confirm", "unknown"));
    await expect(pressEntity(f.hass, state("button.confirm", "unavailable"))).rejects.toThrow();
    expect(f.callService).toHaveBeenCalledTimes(1);
  });

  it("treats delayed start as active so Cancel stays available", () => {
    expect(deriveMode(state("select.power", "on"), state("sensor.operation", "delayedstart"))).toBe("running");
    expect(deriveMode(state("select.power", "on"), state("sensor.operation", "aborting"))).toBe("running");
  });

  it("renders the valid none message state through HA instead of Unknown", () => {
    const f = fixture([]);
    f.hass.formatEntityState = () => "Keine Meldung";
    expect(displayState(f.hass, state("sensor.messages", "none"))).toBe("Keine Meldung");
    expect(isWarningActive(state("sensor.messages", "none"))).toBe(false);
  });

  it("shows full drip/grounds containers as warnings but a full water tank as healthy", () => {
    expect(isWarningActive(state("sensor.drip", "full"), ["full", "notinserted"])).toBe(true);
    expect(isWarningActive(state("sensor.grounds", "full"), ["missing", "full"])).toBe(true);
    expect(isWarningActive(state("sensor.water", "full"))).toBe(false);
    expect(isWarningActive(state("sensor.messages", "none"))).toBe(false);
  });
});
