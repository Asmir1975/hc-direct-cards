import type { HassEntity, HomeAssistant } from "../types/home-assistant";
import { canonicalState } from "./formatting";
import { isControlAvailable, isReadonly } from "./controls";

function ensureWritable(entity: HassEntity): void {
  if (!isControlAvailable(entity) || isReadonly(entity)) throw new Error("This entity is unavailable or read-only.");
}

export async function toggleEntity(hass: HomeAssistant, entity: HassEntity): Promise<void> {
  ensureWritable(entity);
  const domain = entity.entity_id.split(".")[0];
  if (domain === "select" || domain === "input_select") {
    const options = entity.attributes.options || [];
    const normalized = (value: string) => value.toLowerCase().split(/[.:/]/).filter(Boolean).pop()?.replace(/[\s_-]/g, "") || "";
    const on = options.find((value) => ["on", "ein", "active"].includes(normalized(value)));
    const off = options.find((value) => ["off", "aus", "inactive", "standby"].includes(normalized(value)));
    const option = ["on", "ein", "active"].includes(canonicalState(entity)) ? off : on;
    if (!option) throw new Error("This select has no recognizable on/off options.");
    await hass.callService("select", "select_option", { entity_id: entity.entity_id, option });
    return;
  }
  await hass.callService(domain, entity.state === "on" ? "turn_off" : "turn_on", { entity_id: entity.entity_id });
}

export async function pressEntity(hass: HomeAssistant, entity: HassEntity): Promise<void> {
  if (entity.state === "unavailable" || isReadonly(entity)) throw new Error("This button is unavailable or read-only.");
  const domain = entity.entity_id.split(".")[0];
  if (domain !== "button" && domain !== "input_button") throw new Error("The configured action is not a button entity.");
  await hass.callService(domain, "press", { entity_id: entity.entity_id });
}

export async function selectOption(hass: HomeAssistant, entity: HassEntity, option: string): Promise<void> {
  ensureWritable(entity);
  const domain = entity.entity_id.split(".")[0];
  if (domain !== "select" && domain !== "input_select") throw new Error("The configured entity is not a select.");
  if (entity.attributes.options && !entity.attributes.options.includes(option)) throw new Error("This option is not offered by the entity.");
  await hass.callService(domain, "select_option", { entity_id: entity.entity_id, option });
}

export async function setNumber(hass: HomeAssistant, entity: HassEntity, value: number): Promise<void> {
  ensureWritable(entity);
  const domain = entity.entity_id.split(".")[0];
  await hass.callService(domain, "set_value", { entity_id: entity.entity_id, value });
}

export async function setBrightness(hass: HomeAssistant, entity: HassEntity, percentage: number): Promise<void> {
  ensureWritable(entity);
  if (!entity.entity_id.startsWith("light.")) throw new Error("Expected a light entity.");
  const value = Math.max(0, Math.min(100, Math.round(percentage)));
  await hass.callService("light", value === 0 ? "turn_off" : "turn_on",
    value === 0 ? { entity_id: entity.entity_id } : { entity_id: entity.entity_id, brightness_pct: value });
}

export async function setFanSpeed(hass: HomeAssistant, entity: HassEntity, percentage: number): Promise<void> {
  ensureWritable(entity);
  if (!entity.entity_id.startsWith("fan.")) throw new Error("Expected a fan entity.");
  await hass.callService("fan", "set_percentage", { entity_id: entity.entity_id, percentage: Math.max(0, Math.min(100, percentage)) });
}
