import type { HassEntity } from "../types/home-assistant";
import { canonicalState, isAvailable, isOn } from "./formatting";

export function zoneIsHot(state?: HassEntity): boolean {
  return isAvailable(state) && ["residuelheat", "residualheat"].includes(canonicalState(state));
}

/**
 * A zone counts as running by its operation state. The zone status and the power level can stay on their last value
 * after the hob went off (seen on the EX851LYV5E: status "active" and level 45 with operation state "inactive"),
 * so the status only decides when no operation state is assigned.
 */
export function zoneIsActive(state?: HassEntity, operation?: HassEntity): boolean {
  if (operation) return isAvailable(operation) && ["run", "pause", "actionrequired"].includes(canonicalState(operation));
  return isAvailable(state) && canonicalState(state) === "active";
}

// Physical positions confirmed for the Siemens EX851LYV5E.
export const HOB_COLUMNS = [
  { side: "left", zones: ["200", "100"] },
  { side: "right", zones: ["300", "400"] },
] as const;

/**
 * `bridge` is the Join setting, `joined` the diagnostic sensor "Join zone" (Cooking.Hob.Option.JoinZone) of newer
 * integration versions, which is on while the hob reports joined zones, also when they were joined at the hob itself.
 */
export function hobPairMode(bridge?: HassEntity, mode?: HassEntity, joined?: HassEntity): "join" | "move" | "" {
  if (isAvailable(mode) && /(?:^|cookinghobprogram)powermovemode$/.test(canonicalState(mode))) return "move";
  if (isAvailable(bridge) && canonicalState(bridge) === "joinmode") return "join";
  return isAvailable(joined) && isOn(joined) ? "join" : "";
}
