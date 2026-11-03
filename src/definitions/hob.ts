import { commonFields } from "./common";
import type { ApplianceDefinition, FieldDefinition } from "../types/schema";

export const HOB_ZONES = ["100", "200", "300", "400"] as const;
const zoneRoles = {
  state: "Zone state", operation: "Operating state", power: "Power level",
  remaining: "Remaining time", frying: "Frying sensor", progress: "Progress",
} as const;
export const hobZoneFields: FieldDefinition[] = HOB_ZONES.flatMap(zone =>
  Object.entries(zoneRoles).map(([role, label]) => ({
    key: "zone_" + zone + "_" + role + "_entity", label: "Zone " + zone + " · " + label,
    section: "status" as const, kind: "status" as const, domains: ["sensor"],
  })));
export const hobDefinition: ApplianceDefinition = {
  kind: "hob", cardType: "custom:hc-direct-hob-card", editorTag: "hc-direct-hob-card-editor",
  displayName: "HC Direct · Hob", description: "Read-only zones, residual heat and timers.",
  defaultName: "Hob", defaultIcon: "mdi:stove", accent: "#c75b30",
  fields: [
    ...commonFields.filter(f => ["entity","status_entity","operating_state_entity","connection_entity"].includes(f.key)),
    ...hobZoneFields,
    { key: "join_zone_entity", label: "Join zone", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["join zone", "zonen verbunden"] },
    { key: "bridge_mode_entity", label: "varioInduction (join zones)", section: "program", kind: "select", domains: ["select"] },
    { key: "hob_mode_entity", label: "Power mode", section: "program", kind: "select", domains: ["select"] },

    { key: "power_move_front_left_entity", label: "powerMove level front left", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_middle_left_entity", label: "powerMove level middle left", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_rear_left_entity", label: "powerMove level rear left", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_front_right_entity", label: "powerMove level front right", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_middle_right_entity", label: "powerMove level middle right", section: "settings", kind: "select", domains: ["select"] },
    { key: "power_move_rear_right_entity", label: "powerMove level rear right", section: "settings", kind: "select", domains: ["select"] },
    { key: "alarm_entity", label: "Alarm clock", section: "program", kind: "number", domains: ["number"], aliases: ["alarm clock"] },
    { key: "automatic_timer_entity", label: "Automatic timer", section: "settings", kind: "number", domains: ["number"], aliases: ["automatic timer"] },
    { key: "child_lock_entity", label: "Child lock", section: "settings", kind: "select", domains: ["select"], aliases: ["child lock"] },
  ],
};
