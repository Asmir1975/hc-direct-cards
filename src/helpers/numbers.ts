import type { HassEntity, HomeAssistant } from "../types/home-assistant";
import { numericState } from "./formatting";
import { translate, uiLanguage } from "./localize";

export interface NumberSpec {
  value: number | undefined;
  min: number;
  max: number;
  /** Size of one +/- tap, in the entity's own unit. */
  step: number;
  unit: string;
  duration: boolean;
  /** Seconds per entity unit when the value is a duration, otherwise 0. */
  unitSeconds: number;
}

const DURATION_UNITS: Record<string, number> = { s: 1, sec: 1, min: 60, h: 3600, d: 86400 };

function round(value: number): number {
  return Math.round(value * 1e6) / 1e6;
}

export function numberSpec(entity: HassEntity): NumberSpec {
  const attributes = entity.attributes;
  const unit = String(attributes.unit_of_measurement ?? "").trim();
  const min = Number(attributes.min ?? 0);
  const max = Number(attributes.max ?? 100);
  const entityStep = Number(attributes.step ?? 1) || 1;
  const unitSeconds = DURATION_UNITS[unit.toLowerCase()] ?? 0;
  const duration = unitSeconds > 0 && (attributes.device_class === "duration" || unit.toLowerCase() === "min" || unit.toLowerCase() === "s");
  const temperature = attributes.device_class === "temperature" || unit === "°C" || unit === "°F";
  // Time values move in whole minutes, temperatures in steps of 5; everything else follows the entity.
  const step = duration ? Math.max(entityStep, 60 / unitSeconds) : temperature ? Math.max(entityStep, 5) : entityStep;
  return { value: numericState(entity), min, max, step, unit, duration, unitSeconds: duration ? unitSeconds : 0 };
}

export function stepNumber(spec: NumberSpec, current: number, direction: 1 | -1): number {
  const target = current + direction * spec.step;
  const snapped = spec.min + Math.round((target - spec.min) / spec.step) * spec.step;
  return round(Math.max(spec.min, Math.min(spec.max, snapped)));
}

export function formatNumber(hass: HomeAssistant, spec: NumberSpec, value: number): string {
  if (spec.duration) {
    const seconds = Math.round(value * spec.unitSeconds);
    const minutes = Math.floor(seconds / 60);
    const rest = seconds % 60;
    if (rest) return `${minutes}:${String(rest).padStart(2, "0")} ${translate(hass, "unit.min", "min")}`;
    if (minutes >= 60) return `${Math.floor(minutes / 60)}:${String(minutes % 60).padStart(2, "0")} h`;
    return `${minutes} ${translate(hass, "unit.min", "min")}`;
  }
  const text = value.toLocaleString(uiLanguage(hass), { maximumFractionDigits: 2 });
  return spec.unit ? `${text} ${spec.unit}` : text;
}
