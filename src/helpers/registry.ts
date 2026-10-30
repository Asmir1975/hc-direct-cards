import { directDiscoveryScore } from "./homeconnect-direct";
import type { BaseApplianceCardConfig } from "../types/config";
import type { HomeAssistant } from "../types/home-assistant";
import type { ApplianceDefinition, FieldDefinition } from "../types/schema";

export interface RegistryEntry {
  entity_id: string;
  platform?: string;
  unique_id?: string;
  translation_key?: string | null;
  device_id?: string | null;
  original_name?: string | null;
  name?: string | null;
  disabled_by?: string | null;
  hidden_by?: string | null;
}

export interface DiscoveryAnalysis {
  anchor: RegistryEntry;
  candidates: RegistryEntry[];
  suggestions: Partial<BaseApplianceCardConfig>;
}

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function scoreEntry(hass: HomeAssistant, entry: RegistryEntry, field: FieldDefinition, definition: ApplianceDefinition): number {
  const domain = entry.entity_id.split(".")[0];
  if (field.domains?.length && !field.domains.includes(domain)) return -1000;
  const direct = directDiscoveryScore(entry, definition.kind, field.key);
  if (direct !== undefined) return hass.states[entry.entity_id] && hass.states[entry.entity_id].attributes.restored !== true ? direct : -1000;
  const state = hass.states[entry.entity_id];
  const haystack = normalize([
    entry.entity_id, entry.name, entry.original_name, state?.attributes.friendly_name,
    state?.attributes.device_class, state?.attributes.unit_of_measurement, state?.attributes.icon,
  ]
    .filter(Boolean).join(" "));
  let score = 10;
  if (field.domains?.length) {
    const domainIndex = field.domains.indexOf(domain);
    score += (field.domains.length - domainIndex) * 8;
  }
  for (const alias of field.aliases || []) {
    const needle = normalize(alias);
    if (haystack.includes(needle)) score = Math.max(score, 100 + needle.length);
  }
  const keyTokens = normalize(field.key.replace(/_entity$/, "")).split(" ");
  score += keyTokens.filter((token) => haystack.includes(token)).length * 4;
  if (entry.disabled_by || entry.hidden_by) score -= 50;
  return score;
}

export async function analyzeEntityDiscovery(
  hass: HomeAssistant,
  anchorEntity: string,
  definition: ApplianceDefinition,
  current: BaseApplianceCardConfig,
): Promise<DiscoveryAnalysis> {
  const registry = await hass.callWS<RegistryEntry[]>({ type: "config/entity_registry/list" });
  const anchor = current.device_id
    ? registry.find(entry => entry.device_id === current.device_id && entry.platform === "homeconnect_ws"
      && !entry.disabled_by && !entry.hidden_by && hass.states[entry.entity_id] && hass.states[entry.entity_id].attributes.restored !== true)
    : registry.find((entry) => entry.entity_id === anchorEntity);
  if (!anchor?.device_id) throw new Error("The selected device has no active integration entity, or the anchor has no device registry link.");
  const candidates = registry.filter((entry) => entry.device_id === anchor.device_id && !entry.disabled_by && !entry.hidden_by
    && (anchor.platform !== "homeconnect_ws" || entry.platform === "homeconnect_ws"));
  const suggestions: Partial<BaseApplianceCardConfig> = {};
  const used = new Set(Object.entries(current)
    .filter(([key, value]) => key !== "entity" && typeof value === "string" && value.includes("."))
    .map(([, value]) => value as string));

  for (const field of definition.fields) {
    if (field.key === "entity" || current[field.key]) continue;
    const ranked = candidates
      .filter((entry) => !used.has(entry.entity_id))
      .map((entry) => ({ entry, score: scoreEntry(hass, entry, field, definition) }))
      .filter(({ score }) => score >= 50)
      .sort((a, b) => b.score - a.score || a.entry.entity_id.localeCompare(b.entry.entity_id));
    if (ranked[0] && !(ranked[0].score >= 980 && ranked[1]?.score === ranked[0].score)) {
      suggestions[field.key] = ranked[0].entry.entity_id;
      used.add(ranked[0].entry.entity_id);
    }
  }
  return { anchor, candidates, suggestions };
}

export async function discoverEntities(
  hass: HomeAssistant,
  anchorEntity: string,
  definition: ApplianceDefinition,
  current: BaseApplianceCardConfig,
): Promise<Partial<BaseApplianceCardConfig>> {
  return (await analyzeEntityDiscovery(hass, anchorEntity, definition, current)).suggestions;
}

export function discoveryKey(config?: BaseApplianceCardConfig): string {
  return config?.device_id ? "device:" + config.device_id : config?.entity ? "entity:" + config.entity : "";
}
