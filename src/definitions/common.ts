import type { FieldDefinition } from "../types/schema";

export const commonFields: FieldDefinition[] = [
  { key: "entity", label: "Alternative: anchor entity", section: "general" },
  { key: "connection_entity", label: "Connection", section: "status", kind: "status", domains: ["binary_sensor"], aliases: ["connection", "verbindung"] },
  { key: "power_entity", label: "Power", section: "general", domains: ["switch", "select"] , aliases: ["power", "einschalter", "power state"] },
  { key: "status_entity", label: "Status", section: "general", domains: ["sensor", "select"], aliases: ["status", "power state"] },
  { key: "operating_state_entity", label: "Operating state", section: "general", domains: ["sensor", "select"], aliases: ["operating state", "betriebszustand", "operation state"] },
  { key: "selected_program_entity", label: "Selected program", section: "program", kind: "select", domains: ["select"], aliases: ["selected program", "ausgewahltes programm", "program"] },
  { key: "active_program_entity", label: "Active program", section: "program", kind: "status", domains: ["sensor"], aliases: ["active program", "aktives programm"] },
  { key: "progress_entity", label: "Program progress", section: "status", kind: "status", domains: ["sensor"], aliases: ["program progress", "programmfortschritt", "progress"] },
  { key: "remaining_time_entity", label: "Remaining time", section: "status", kind: "status", domains: ["sensor"], aliases: ["remaining program time", "verbleibende programmlaufzeit", "remaining time", "remaining duration"] },
  { key: "start_in_entity", label: "Start in", section: "program", kind: "number", domains: ["number"], aliases: ["start in", "startverzogerung"] },
  { key: "messages_entity", label: "Messages", section: "status", kind: "status", domains: ["sensor"], aliases: ["messages", "meldungen"], warning: true },
  { key: "acknowledge_event_entity", label: "Confirm message", section: "settings", kind: "button", domains: ["button"], aliases: ["confirm message"], allowWhileActive: true },
  { key: "start_entity", label: "Start", section: "actions", domains: ["button"], aliases: ["start"] },
  { key: "pause_entity", label: "Pause", section: "actions", domains: ["button"], aliases: ["pause"] },
  { key: "resume_entity", label: "Resume", section: "actions", domains: ["button"], aliases: ["resume", "fortsetzen"] },
  { key: "cancel_entity", label: "Cancel", section: "actions", domains: ["button"], aliases: ["cancel", "abbrechen"] },
];
