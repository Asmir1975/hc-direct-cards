import { css, html, nothing } from "lit";
import { BaseApplianceCard } from "./base-appliance-card";
import { hobDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
import { displayState, isAvailable } from "../helpers/formatting";
import { fireMoreInfo } from "../helpers/actions";
import { HOB_COLUMNS, hobPairMode, zoneIsActive, zoneIsHot } from "../helpers/hob";
import { translate } from "../helpers/localize";

export class HomeConnectHobCard extends BaseApplianceCard {
  protected definition = hobDefinition;

  static styles = [...BaseApplianceCard.styles, css`
    .zones { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px; }
    .zone-pair { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
    .zone-pair.combined { gap: 0; border: 2px solid var(--hc-accent); border-radius: 16px; overflow: hidden; background: var(--secondary-background-color); }
    .pair-label { padding: 8px 12px; font-size: 12px; font-weight: 650; color: var(--hc-accent); border-bottom: 1px solid var(--divider-color); }
    .zone-pair.combined .zone { border-radius: 0; border: 0; flex: 1; }
    .zone-pair.move { border-top: 0; border-bottom: 0; border-radius: 0; background: transparent; }
    .zone-pair.move .pair-label { border: 0; }
    .move-levels { display: flex; flex-direction: column; gap: 22px; padding: 14px 12px 22px; }
    .move-level { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .move-level span { font-size: 12px; color: var(--secondary-text-color); }
    .move-level strong { font-size: 26px; font-weight: 650; }
    .zone-pair.move .zone { padding: 8px 12px; background: transparent; }
    .zone-pair.move .zone-power { font-size: 16px; margin: 4px 0; }
    .zone-pair.combined .zone.hot { box-shadow: inset 3px 0 var(--warning-color, #d57825); }
    .zone { width: 100%; min-width: 0; text-align: left; color: inherit; font: inherit; background: var(--secondary-background-color); border: 1px solid var(--divider-color); border-radius: 14px; padding: 14px; cursor: pointer; }
    .zone.active { border-color: var(--hc-accent); background: color-mix(in srgb, var(--hc-accent), transparent 94%); }
    .zone.hot { border-color: var(--warning-color, #d57825); }
    .zone-title { display: flex; justify-content: space-between; gap: 8px; font-size: 12px; font-weight: 650; }
    .zone-power { display: block; margin: 16px 0 8px; font-size: 30px; font-weight: 650; font-variant-numeric: tabular-nums; }
    .zone-meta { display: block; font-size: 12px; color: var(--secondary-text-color); line-height: 1.7; }
    .hot-label { color: var(--warning-color, #d57825); font-size: 12px; }
    .hob-controls { display: grid; gap: 4px; }
    .read-only-note { margin: 8px 0 0; color: var(--secondary-text-color); font-size: 11px; }
  `];

  static getConfigElement() { return document.createElement(hobDefinition.editorTag); }
  static getStubConfig() { return { name: hobDefinition.defaultName, default_expanded: true }; }

  // Join and the power mode are drawn here, so the generic list skips them.
  protected ownFieldKeys(): string[] { return ["bridge_mode_entity", "hob_mode_entity"]; }

  protected renderExtra() {
    if (!this.hass) return nothing;
    const present = (zone: string) => ["state", "operation", "power", "remaining"].some((role) => !!this.getState(`zone_${zone}_${role}_entity`));
    const bridge = this.getState("bridge_mode_entity");
    const modes = this.getState("hob_mode_entity");
    const pairMode = hobPairMode(bridge, modes);
    const modeOptions = modes?.attributes.options?.filter((option) => /(?:[._])(?:powerlevelmode|powermovemode|fryingsensormode)$/i.test(option)) || [];
    const modeEntity = modes && { ...modes, attributes: { ...modes.attributes, options: modeOptions } };
    return html`
      <div class="hob-controls">
        ${bridge ? html`<hcd-entity-control .hass=${this.hass} .entity=${bridge} kind="select" .label=${translate(this.hass, "field.bridge_mode_entity", "varioInduction (join zones)")} .busy=${this._busyIds.has(bridge.entity_id)}></hcd-entity-control>` : nothing}
        ${modeEntity && modeOptions.length ? html`<hcd-entity-control .hass=${this.hass} .entity=${modeEntity} kind="select" .label=${translate(this.hass, "field.hob_mode_entity", "Power mode")} .busy=${this._busyIds.has(modeEntity.entity_id)}></hcd-entity-control>` : nothing}
      </div>
      ${!bridge ? html`<p class="read-only-note">${translate(this.hass, "direct.join_missing", "No Join entity assigned. Enable or assign the zone bridge mode entity in the editor.")}</p>` : nothing}
      <div class="zones">${HOB_COLUMNS.map((column) => html`
        <div class="zone-pair ${pairMode ? `combined ${pairMode}` : ""}" data-side=${column.side}>
          ${pairMode ? html`<div class="pair-label">${pairMode === "move" ? "powerMove" : "Join"} · ${column.zones.join(" + ")}</div>` : nothing}
          ${pairMode === "move" ? html`<div class="move-levels">
            ${(["rear", "middle", "front"] as const).map((position) => {
              const setting = this.getState(`power_move_${position}_${column.side}_entity`);
              return html`<div class="move-level"><span>${translate(this.hass!, `direct.move_${position}`, position === "rear" ? "Rear" : position === "middle" ? "Middle" : "Front")}</span><strong>${displayState(this.hass!, setting)}</strong></div>`;
            })}
          </div>` : nothing}
          ${column.zones.filter(present).map((zone) => {
            const value = (role: string) => this.getState(`zone_${zone}_${role}_entity`);
            const state = value("state"), operation = value("operation"), power = value("power"), remaining = value("remaining"), frying = value("frying");
            const hot = zoneIsHot(state);
            const active = zoneIsActive(state, operation);
            const anchor = state || power || operation || remaining;
            return html`<button type="button" data-zone=${zone} class="zone ${hot ? "hot" : active ? "active" : ""}" @click=${() => anchor && fireMoreInfo(this, anchor.entity_id)}
              aria-label=${`Zone ${zone}: ${displayState(this.hass!, state || operation)}`}>
              <span class="zone-title">Zone ${zone}<span>${displayState(this.hass!, operation || state)}</span></span>
              <span class="zone-power">${displayState(this.hass!, power)}</span>
              ${hot ? html`<span class="hot-label">${translate(this.hass, "direct.residual_heat", "Residual heat")}</span>` : nothing}
              ${isAvailable(remaining) ? html`<span class="zone-meta">${translate(this.hass, "field.remaining_time_entity", "Remaining time")}: ${displayState(this.hass!, remaining)}</span>` : nothing}
              ${isAvailable(frying) && frying!.state !== "off" ? html`<span class="zone-meta">${translate(this.hass, "direct.frying", "Frying sensor")}: ${displayState(this.hass!, frying)}</span>` : nothing}
            </button>`;
          })}
        </div>`)}
      </div>
      <p class="read-only-note">${translate(this.hass, "direct.hob_readonly", "Zone values are read-only. Tap a zone for details.")}</p>`;
  }
}
registerElement("hc-direct-hob-card", HomeConnectHobCard);
