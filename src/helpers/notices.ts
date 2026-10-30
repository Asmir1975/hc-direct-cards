import type { HassEntity, HomeAssistant } from "../types/home-assistant";
import { displayState, isAvailable } from "./formatting";

export type NoticeTone = "info" | "success" | "warning";

export interface Notice {
  text: string;
  tone: NoticeTone;
  icon: string;
}

const ICONS: Record<NoticeTone, string> = {
  info: "mdi:information-outline",
  success: "mdi:check-circle-outline",
  warning: "mdi:alert-outline",
};

/** Kind of message, derived from the event key the integration reports (for example `insert_food_now`). */
export function noticeTone(key: string): NoticeTone {
  const value = key.trim().toLowerCase().split(/[.:/]/).pop() || "";
  if (/aborted|error|blocked|calcified|voltage|not_possible|too_high|failed/.test(value)) return "warning";
  if (/finished|success|done|complete/.test(value)) return "success";
  if (/^(insert|turn|open|close|leave|remove|place|refill|fill|wipe|prepare|subsequent|after|pyro|easy|clock|is_not|keep|empty|clean)/.test(value) || /(_now|_later|_info)$/.test(value)) return "info";
  return "warning";
}

/**
 * The current message of an appliance as shown in the card, or undefined when there is none.
 * The text is the integration's own translation of the event.
 */
export function messageNotice(hass: HomeAssistant, entity?: HassEntity): Notice | undefined {
  if (!entity || !isAvailable(entity)) return undefined;
  const key = entity.state.trim().toLowerCase();
  if (!key || key === "none" || key === "off") return undefined;
  const tone = noticeTone(key);
  return { text: displayState(hass, entity), tone, icon: ICONS[tone] };
}
