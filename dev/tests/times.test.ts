import { describe, expect, it } from "vitest";
import { clockText, summarizeTimes } from "../../src/helpers/times";
import { durationSeconds, formatDuration } from "../../src/helpers/numbers";
import type { HassEntity, HomeAssistant } from "../../src/types/home-assistant";

const sensor = (state: string, unit: string, changed = ""): HassEntity => ({ entity_id: "sensor.t", state, attributes: { unit_of_measurement: unit }, last_changed: changed, last_updated: changed });
const state = (value: string, changed: string): HassEntity => ({ entity_id: "sensor.s", state: value, attributes: {}, last_changed: changed, last_updated: changed });
const hass = (extra: object = {}) => ({ language: "en", ...extra }) as unknown as HomeAssistant;
const now = Date.UTC(2026, 9, 30, 20, 0, 0);

describe("program times", () => {
  it("reads duration sensors in any unit", () => {
    expect(durationSeconds(sensor("0.5", "h"))).toBe(1800);
    expect(durationSeconds(sensor("37", "min"))).toBe(2220);
    expect(durationSeconds(sensor("90", "s"))).toBe(90);
    expect(durationSeconds(sensor("5", "kg"))).toBeUndefined();
    expect(formatDuration(hass(), 5400)).toBe("1:30 h");
  });

  it("shows running time, time left and the end while a program runs", () => {
    const summary = summarizeTimes({ active: true, remaining: sensor("1.5", "h"), elapsed: sensor("30", "min"), now })!;
    expect(summary).toMatchObject({ phase: "active", elapsed: 1800, remaining: 5400, endsAt: now + 5400_000 });
  });

  it("falls back to the estimate while no remaining time is reported", () => {
    const summary = summarizeTimes({ active: true, remaining: sensor("0", "min"), estimate: sensor("120", "min"), now })!;
    expect(summary.remaining).toBe(7200);
  });

  it("shows the expected total and end before the start, including a delayed start", () => {
    const summary = summarizeTimes({ active: false, estimate: sensor("2", "h"), startIn: sensor("30", "min"), now })!;
    expect(summary).toMatchObject({ phase: "idle", estimate: 7200, endsAt: now + 7200_000, delayedEndsAt: now + 9000_000 });
    expect(summarizeTimes({ active: false, estimate: sensor("2", "h"), now })!.delayedEndsAt).toBeUndefined();
    expect(summarizeTimes({ active: false, now })).toBeUndefined();
  });

  it("counts a delayed start down and adds it to the end time", () => {
    const status = state("BSH.Common.EnumType.OperationState.DelayedStart", "2026-10-30T19:00:00+00:00");
    const summary = summarizeTimes({ active: true, status, startIn: sensor("249", "min"), remaining: sensor("1", "h"), now })!;
    expect(summary).toMatchObject({ phase: "delayed", startsIn: 14940, remaining: 3600, endsAt: now + (14940 + 3600) * 1000 });
  });

  it("shows when a finished program ended", () => {
    const summary = summarizeTimes({ active: false, status: state("BSH.Common.EnumType.OperationState.Finished", "2026-10-30T19:10:00+00:00"), now })!;
    expect(summary).toMatchObject({ phase: "finished", finishedAt: Date.parse("2026-10-30T19:10:00+00:00") });
  });

  it("formats clock times in 24 h or 12 h as Home Assistant is set", () => {
    const at = Date.UTC(2026, 9, 30, 21, 40, 0);
    const options = { time_zone: "server" };
    expect(clockText(hass({ locale: { ...options, time_format: "24" }, config: { time_zone: "UTC" } }), at)).toBe("21:40");
    expect(clockText(hass({ locale: { ...options, time_format: "24" }, config: { time_zone: "UTC" } }), Date.UTC(2026, 9, 30, 0, 40, 0))).toBe("00:40");
    expect(clockText(hass({ locale: { ...options, time_format: "12" }, config: { time_zone: "UTC" } }), at)).toBe("9:40 PM");
  });
});
