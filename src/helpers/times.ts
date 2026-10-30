import type { HassEntity, HomeAssistant } from "../types/home-assistant";
import { canonicalState, isAvailable } from "./formatting";
import { durationSeconds } from "./numbers";
import { uiLanguage } from "./localize";

export interface TimeSummary {
  phase: "active" | "idle" | "finished";
  /** Running time so far, seconds. */
  elapsed?: number;
  /** Time left, seconds. */
  remaining?: number;
  /** Total program time before the start, seconds. */
  estimate?: number;
  /** Expected end, epoch milliseconds. */
  endsAt?: number;
  /** When the program finished, epoch milliseconds. */
  finishedAt?: number;
}

export interface TimeInputs {
  active: boolean;
  /** Operating state entity, used to recognize a finished program. */
  status?: HassEntity;
  remaining?: HassEntity;
  elapsed?: HassEntity;
  estimate?: HassEntity;
  /** The delayed-start setting. */
  startIn?: HassEntity;
  now: number;
}

/**
 * Decides which times are worth showing: running time and time left while a program runs,
 * the expected total before it starts, and the finish time afterwards.
 * Nothing is invented: every value comes from an entity of the integration.
 */
export function summarizeTimes(input: TimeInputs): TimeSummary | undefined {
  const remaining = durationSeconds(input.remaining);
  const elapsed = durationSeconds(input.elapsed);
  const estimate = durationSeconds(input.estimate);
  const delay = durationSeconds(input.startIn) ?? 0;
  if (input.active) {
    // The estimate stands in while the appliance still reports no remaining time.
    const left = remaining && remaining > 0 ? remaining : estimate && estimate > 60 ? estimate : undefined;
    if (left === undefined && !elapsed) return undefined;
    return { phase: "active", elapsed: elapsed || undefined, remaining: left, endsAt: left === undefined ? undefined : input.now + left * 1000 };
  }
  if (input.status && isAvailable(input.status) && canonicalState(input.status) === "finished") {
    const since = Date.parse(input.status.last_changed);
    return Number.isFinite(since) ? { phase: "finished", finishedAt: since } : undefined;
  }
  if (estimate && estimate > 60) return { phase: "idle", estimate, endsAt: input.now + (delay + estimate) * 1000 };
  return undefined;
}

/** Clock time such as "21:40" or "9:40 PM", following the Home Assistant time format and time zone. */
export function clockText(hass: HomeAssistant, epochMs: number): string {
  const locale = hass.locale;
  const options: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit" };
  if (locale?.time_format === "24") options.hourCycle = "h23";
  else if (locale?.time_format === "12") options.hour12 = true;
  if (locale?.time_zone === "server" && hass.config?.time_zone) options.timeZone = hass.config.time_zone;
  try {
    const language = uiLanguage(hass);
    // 24-hour clocks read "00:40", not "0:40".
    if (new Intl.DateTimeFormat(language, options).resolvedOptions().hourCycle?.startsWith("h2")) options.hour = "2-digit";
    return new Date(epochMs).toLocaleTimeString(language, options);
  } catch {
    return new Date(epochMs).toLocaleTimeString();
  }
}
