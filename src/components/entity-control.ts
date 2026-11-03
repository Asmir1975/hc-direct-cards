import { LitElement, css, html, nothing } from "lit";
import type { ControlKind } from "../types/schema";
import type { HassEntity, HomeAssistant } from "../types/home-assistant";
import { displayState, isAvailable, isOn } from "../helpers/formatting";
import { formatNumber, numberSpec, stepNumber } from "../helpers/numbers";
import { translate } from "../helpers/localize";
import { registerElement } from "../helpers/register";
import { fireMoreInfo } from "../helpers/actions";
import { isControlAvailable, isReadonly } from "../helpers/controls";
import { customProgramName } from "../helpers/programs";
import type { ProgramNameMap } from "../types/config";

export interface ControlEventDetail { entity: HassEntity; action: "toggle" | "select" | "number" | "press" | "brightness" | "fan"; value?: string | number; }

export class EntityControl extends LitElement {
  static properties = { hass: { attribute: false }, entity: { attribute: false }, valueLabels: { attribute: false }, label: {}, kind: {}, disabled: { type: Boolean }, busy: { type: Boolean }, stepSeconds: { type: Number }, hint: {}, _pending: { state: true } };
  hass?: HomeAssistant;
  entity?: HassEntity;
  valueLabels: ProgramNameMap = {};
  label = "";
  kind: ControlKind = "status";
  disabled = false;
  busy = false;
  stepSeconds = 0;
  hint = "";
  private _pending?: number;
  private _sendTimer?: ReturnType<typeof setTimeout>;
  private _clearTimer?: ReturnType<typeof setTimeout>;

  static styles = css`
    :host { display: block; min-width: 0; }
    .control { min-height: 48px; display: grid; gap: 6px; }
    .line { min-height: 45px; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
    .label { min-width: 0; overflow-wrap: anywhere; color: var(--secondary-text-color); font-size: 12px; font-weight: 520; }
    .value { padding: 4px 0; color: var(--primary-text-color); font-size: 13px; font-weight: 600; text-align: right; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .status-line { width: 100%; padding: 0; border: 0; color: inherit; background: transparent; text-align: left; font: inherit; cursor: pointer; }
    .status-line:hover .value { color: var(--hc-accent); }
    select { max-width: 62%; min-width: 120px; height: 37px; padding: 0 30px 0 11px; color: var(--primary-text-color); background: var(--card-background-color); border: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); border-radius: 11px; font: inherit; font-size: 13px; transition: border-color 150ms ease, box-shadow 150ms ease; }
    select:hover:not(:disabled) { border-color: color-mix(in srgb, var(--hc-accent), var(--divider-color) 45%); }
    .switch { position: relative; width: 42px; height: 24px; flex: none; border: 0; border-radius: 999px; padding: 2px; background: var(--switch-unchecked-track-color, var(--disabled-color)); cursor: pointer; transition: background 160ms ease; }
    .switch::after { content: ""; display: block; width: 20px; height: 20px; border-radius: 50%; background: var(--switch-unchecked-button-color, #fff); box-shadow: 0 1px 3px #0004; transition: transform 160ms ease; }
    .switch.on { background: var(--hc-accent); }
    .switch.on::after { transform: translateX(18px); }
    input[type=range] { width: 100%; margin: 0; height: 18px; accent-color: var(--hc-accent); cursor: pointer; }
    .number-head { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 12px; }
    .number-value { font-weight: 650; font-variant-numeric: tabular-nums; }
    .stepper { flex: none; display: inline-flex; align-items: stretch; height: 37px; border: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); border-radius: 11px; overflow: hidden; background: var(--card-background-color); }
    .stepper button { width: 38px; padding: 0; border: 0; color: var(--primary-text-color); background: transparent; font: inherit; font-size: 20px; line-height: 1; cursor: pointer; transition: background 120ms ease; }
    .stepper button:hover:not(:disabled) { background: color-mix(in srgb, var(--hc-accent), transparent 82%); }
    .stepper-value { min-width: 78px; padding: 0 6px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 650; font-variant-numeric: tabular-nums; white-space: nowrap; border-inline: 1px solid color-mix(in srgb, var(--divider-color), var(--primary-text-color) 8%); }
    .hint { margin: -4px 0 8px; font-size: 11px; line-height: 1.4; color: var(--secondary-text-color); }
    .unavailable { opacity: .58; }
    button:disabled, select:disabled, input:disabled { cursor: not-allowed; opacity: .55; }
  `;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearTimeout(this._sendTimer);
    clearTimeout(this._clearTimer);
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    const previous = changed.get("entity") as HassEntity | undefined;
    // A newer value from Home Assistant replaces the locally shown one.
    if (previous && this._pending !== undefined && this._sendTimer === undefined && previous.state !== this.entity?.state) this._pending = undefined;
  }

  private tap(direction: 1 | -1) {
    if (!this.entity) return;
    const spec = numberSpec(this.entity, this.stepSeconds);
    const base = this._pending ?? spec.value;
    if (base === undefined) return;
    const next = stepNumber(spec, base, direction);
    if (next === base) return;
    this._pending = next;
    this.requestUpdate();
    clearTimeout(this._sendTimer);
    clearTimeout(this._clearTimer);
    // Repeated taps add up; the value is sent once after a short pause.
    this._sendTimer = setTimeout(() => {
      this._sendTimer = undefined;
      this.emit("number", next);
      this._clearTimer = setTimeout(() => { this._pending = undefined; this.requestUpdate(); }, 4000);
    }, 700);
  }

  private emit(action: ControlEventDetail["action"], value?: string | number) {
    if (!this.entity || this.disabled || this.busy || (action === "press" ? this.entity.state === "unavailable" : !isControlAvailable(this.entity)) || isReadonly(this.entity)) return;
    this.dispatchEvent(new CustomEvent<ControlEventDetail>("hcd-control", { detail: { entity: this.entity, action, value }, bubbles: true, composed: true }));
  }

  render() {
    if (!this.entity || !this.hass) return nothing;
    const unavailable = this.kind === "button" ? this.entity.state === "unavailable" : !isControlAvailable(this.entity);
    const blocked = this.disabled || this.busy || unavailable || isReadonly(this.entity);
    if (this.kind === "button") {
      return html`<div class="line"><span class="label">${this.label}</span><button type="button" ?disabled=${blocked} @click=${() => this.emit("press")}>${this.label}</button></div>`;
    }
    if (this.kind === "light" || this.kind === "fan") {
      const fan = this.kind === "fan";
      const modes = this.entity.attributes.supported_color_modes as string[] | undefined;
      const dimmable = fan ? (Number(this.entity.attributes.supported_features || 0) & 1) !== 0
        : !!modes?.some((mode) => !["onoff", "unknown"].includes(mode));
      const percentage = fan ? Number(this.entity.attributes.percentage ?? 0)
        : this.entity.state === "off" ? 0 : Math.round(Number(this.entity.attributes.brightness ?? 255) / 255 * 100);
      return html`<div class="control ${unavailable ? "unavailable" : ""}">
        <div class="line"><span class="label">${this.label}</span><button class="switch ${isOn(this.entity) ? "on" : ""}" type="button" role="switch" aria-checked=${String(isOn(this.entity))} aria-label=${this.label} ?disabled=${blocked} @click=${() => this.emit("toggle")}></button></div>
        ${dimmable ? html`<label class="number-head">${percentage}%<input aria-label=${this.label + " %"} type="range" min="0" max="100" step=${fan ? Number(this.entity.attributes.percentage_step || 1) : 1} .value=${String(percentage)} ?disabled=${blocked} @change=${(ev: Event) => this.emit(fan ? "fan" : "brightness", Number((ev.target as HTMLInputElement).value))}></label>` : nothing}
      </div>`;
    }
    if (this.kind === "toggle") {
      const on = isOn(this.entity);
      return html`<div class="line ${unavailable ? "unavailable" : ""}"><span class="label">${this.label}</span><button class="switch ${on ? "on" : ""}" type="button" role="switch" aria-checked=${String(on)} aria-label=${this.label} ?disabled=${blocked} @click=${() => this.emit("toggle")}></button></div>${this.hint ? html`<div class="hint">${this.hint}</div>` : nothing}`;
    }
    if (this.kind === "select") {
      const options = this.entity.attributes.options || [];
      const choices = options.includes(this.entity.state) || !isAvailable(this.entity) ? options : [this.entity.state, ...options];
      return html`<div class="line ${unavailable ? "unavailable" : ""}"><label class="label" for="select">${this.label}</label><select id="select" ?disabled=${blocked} @change=${(ev: Event) => this.emit("select", (ev.target as HTMLSelectElement).value)}>${!isAvailable(this.entity) ? html`<option value="" disabled selected>${displayState(this.hass, this.entity)}</option>` : nothing}${choices.map((option) => html`<option .value=${option} ?selected=${option === this.entity?.state}>${customProgramName(option, this.valueLabels) || displayState(this.hass!, { ...this.entity!, state: option })}</option>`)}</select></div>`;
    }
    if (this.kind === "number") {
      const spec = numberSpec(this.entity, this.stepSeconds);
      const shown = this._pending ?? spec.value;
      const text = shown === undefined ? displayState(this.hass, this.entity) : formatNumber(this.hass, spec, shown);
      const atMin = shown !== undefined && shown <= spec.min;
      const atMax = shown !== undefined && shown >= spec.max;
      const less = translate(this.hass, "action.decrease", "Decrease");
      const more = translate(this.hass, "action.increase", "Increase");
      return html`<div class="line ${unavailable ? "unavailable" : ""}"><span class="label">${this.label}</span><div class="stepper" role="group" aria-label=${this.label}>
        <button type="button" aria-label=${`${less}: ${this.label}`} ?disabled=${blocked || shown === undefined || atMin} @click=${() => this.tap(-1)}>−</button>
        <span class="stepper-value" aria-live="polite">${text}</span>
        <button type="button" aria-label=${`${more}: ${this.label}`} ?disabled=${blocked || shown === undefined || atMax} @click=${() => this.tap(1)}>+</button>
      </div></div>`;
    }
    const displayed = customProgramName(this.entity.state, this.valueLabels) || displayState(this.hass, this.entity);
    return html`<button type="button" class="line status-line ${unavailable ? "unavailable" : ""}" @click=${() => fireMoreInfo(this, this.entity!.entity_id)} aria-label=${`${this.label}: ${displayed}`}><span class="label">${this.label}</span><span class="value">${displayed}</span></button>`;
  }
}
registerElement("hcd-entity-control", EntityControl);
