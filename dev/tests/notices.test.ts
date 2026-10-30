import { describe, expect, it } from "vitest";
import { messageNotice, noticeTone } from "../../src/helpers/notices";
import type { HassEntity, HomeAssistant } from "../../src/types/home-assistant";

const hass = { language: "de", formatEntityState: (e: HassEntity) => e.attributes.labels ? (e.attributes.labels as Record<string, string>)[e.state] : e.state } as unknown as HomeAssistant;
const sensor = (state: string): HassEntity => ({ entity_id: "sensor.meldung", state, attributes: { labels: { insert_food_now: "Speise jetzt einschieben", program_finished: "Programm beendet", program_aborted: "Programm abgebrochen" } }, last_changed: "", last_updated: "" });

describe("appliance messages", () => {
  it("sorts the integration's events into info, success and warning", () => {
    expect(noticeTone("insert_food_now")).toBe("info");
    expect(noticeTone("turn_food_later")).toBe("info");
    expect(noticeTone("regular_preheat_finished")).toBe("success");
    expect(noticeTone("program_finished")).toBe("success");
    expect(noticeTone("program_aborted")).toBe("warning");
    expect(noticeTone("drain_pump_blocked")).toBe("warning");
    expect(noticeTone("error_door_latch")).toBe("warning");
  });

  it("shows the current message with the integration's own text and nothing for none", () => {
    expect(messageNotice(hass, sensor("insert_food_now"))).toMatchObject({ text: "Speise jetzt einschieben", tone: "info" });
    expect(messageNotice(hass, sensor("none"))).toBeUndefined();
    expect(messageNotice(hass, sensor("unavailable"))).toBeUndefined();
    expect(messageNotice(hass, undefined)).toBeUndefined();
  });
});
