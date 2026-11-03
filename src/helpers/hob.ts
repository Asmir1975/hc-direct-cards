import type { HassEntity } from "../types/home-assistant";
import { canonicalState, isAvailable } from "./formatting";

export function zoneIsHot(state?: HassEntity): boolean {
  return isAvailable(state) && ["residuelheat", "residualheat"].includes(canonicalState(state));
}

export function zoneIsActive(state?: HassEntity, operation?: HassEntity): boolean {
  return [state, operation].some((entity) => isAvailable(entity) && ["active", "run", "pause", "actionrequired"].includes(canonicalState(entity)));
}

// Physical positions confirmed for the Siemens EX851LYV5E.
export const HOB_COLUMNS = [
  { side: "left", zones: ["200", "100"] },
  { side: "right", zones: ["300", "400"] },
] as const;

export function hobPairMode(bridge?: HassEntity, mode?: HassEntity): "join" | "move" | "" {
  if (isAvailable(mode) && /(?:^|cookinghobprogram)powermovemode$/.test(canonicalState(mode))) return "move";
  return isAvailable(bridge) && canonicalState(bridge) === "joinmode" ? "join" : "";
}
