import type { ApplianceKind } from "./config";

export type ControlKind = "select" | "number" | "toggle" | "status" | "light" | "fan" | "button";
export type SectionId = "program" | "options" | "status" | "settings";

export interface FieldDefinition {
  key: string;
  label: string;
  section: SectionId | "general" | "actions";
  kind?: ControlKind;
  domains?: string[];
  aliases?: string[];
  warning?: boolean;
  warningStates?: string[];
  /** Numeric sensors warn only at or below this value (a countdown such as the machine care reminder). */
  warningBelow?: number;
  prominent?: boolean;
  allowWhileActive?: boolean;
}

export interface ApplianceDefinition {
  kind: ApplianceKind;
  cardType: string;
  editorTag: string;
  displayName: string;
  description: string;
  defaultName: string;
  defaultIcon: string;
  accent: string;
  fields: FieldDefinition[];
}
