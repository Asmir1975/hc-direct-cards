import type { ApplianceCardConfig } from "../types/config";
import type { HassEntity, HomeAssistant } from "../types/home-assistant";
import { isAvailable } from "./formatting";

export function isReadonly(entity: HassEntity): boolean {
  return entity.attributes.readonly === true;
}

export function isControlAvailable(entity?: HassEntity): boolean {
  if (!entity || entity.state === "unavailable" || entity.attributes.restored === true) return false;
  if (entity.entity_id.startsWith("select.") || entity.entity_id.startsWith("input_select.")) return (entity.attributes.options?.length || 0) > 0;
  return isAvailable(entity);
}

export function showQuantityField(key: string, hass: HomeAssistant, config: ApplianceCardConfig): boolean {
  const id = config.fill_quantity_select_entity;
  const select = typeof id === "string" ? hass.states[id] : undefined;
  if (key === "fill_quantity_select_entity") return isControlAvailable(select);
  if (key === "fill_quantity_entity") return !isControlAvailable(select);
  return true;
}
