import { html, nothing } from "lit";
import { BaseApplianceCard } from "./base-appliance-card";
import { hobDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
import { displayState, isAvailable } from "../helpers/formatting";
import { fireMoreInfo } from "../helpers/actions";
import { zoneIsHot, zoneIsActive, HOB_COLUMNS, hobPairMode } from "../helpers/hob";
import { translate } from "../helpers/localize";

export class HobCard extends BaseApplianceCard {
  protected definition = hobDefinition;
  static getConfigElement() { return document.createElement(hobDefinition.editorTag); }
  static getStubConfig() { return {}; }

  protected primaryFieldKeys() { return ["bridge_mode_entity","hob_mode_entity"]; }

  protected renderPrimary() {
    if (!this.hass) return nothing;
    const present=(zone:string)=>["state","operation","power","remaining"].some(role=>!!this.getState("zone_"+zone+"_"+role+"_entity"));
    const bridge=this.getState("bridge_mode_entity");
    const modes=this.getState("hob_mode_entity");
    const pairMode=hobPairMode(bridge,modes);
    const modeOptions=modes?.attributes.options?.filter(option=>/(?:[._])(?:powerlevelmode|powermovemode|fryingsensormode)$/i.test(option)) || [];
    const modeEntity=modes && {...modes,attributes:{...modes.attributes,options:modeOptions}};
    return html`
    <div class="section-grid">
      ${bridge ? html`<hcd-entity-control .hass=${this.hass} .entity=${bridge} kind="select" .label=${translate(this.hass,"field.bridge_mode_entity","Join / split zones")} .busy=${this._busyIds.has(bridge.entity_id)}></hcd-entity-control>`:nothing}
      ${modeEntity && modeOptions.length ? html`<hcd-entity-control .hass=${this.hass} .entity=${modeEntity} kind="select" .label=${translate(this.hass,"field.hob_mode_entity","Power mode")} .busy=${this._busyIds.has(modeEntity.entity_id)}></hcd-entity-control>`:nothing}
    </div>
    ${!bridge ? html`<p class="read-only-note">${translate(this.hass,"direct.join_missing","No Join entity assigned. Enable or assign the zone bridge mode entity in the editor.")}</p>`:nothing}
    <div class="zones">${HOB_COLUMNS.map(column=>html`
      <div class="zone-pair ${pairMode ? "combined "+pairMode : ""}" data-side=${column.side}>
      ${pairMode ? html`<div class="pair-label">${pairMode==="move" ? "powerMove" : "Join"} · ${column.zones.join(" + ")}</div>` : nothing}
      ${pairMode==="move" ? html`<div class="move-levels">
        ${(["rear","middle","front"] as const).map(position=>{
          const setting=this.getState("power_move_"+position+"_"+column.side+"_entity");
          return html`<div class="move-level"><span>${translate(this.hass!,"direct.move_"+position,position==="rear"?"Rear":position==="middle"?"Middle":"Front")}</span><strong>${displayState(this.hass!,setting)}</strong></div>`;
        })}
      </div>` : nothing}
      ${column.zones.filter(present).map(zone=>{
      const value=(role:string)=>this.getState("zone_"+zone+"_"+role+"_entity");
      const state=value("state"), operation=value("operation"), power=value("power"), remaining=value("remaining"), frying=value("frying");
      const hot=zoneIsHot(state);
      const active=zoneIsActive(state,operation);
      const anchor=state || power || operation || remaining;
      return html`<button type="button" data-zone=${zone} class="zone ${hot?"hot":active?"active":""}" @click=${()=>anchor && fireMoreInfo(this,anchor.entity_id)}
        aria-label=${"Zone "+zone+": "+displayState(this.hass!,state || operation)}>
        <span class="zone-title">Zone ${zone}<span>${displayState(this.hass!,operation || state)}</span></span>
        <span class="zone-power">${displayState(this.hass!,power)}</span>
        ${hot ? html`<span class="hot-label">${translate(this.hass,"direct.residual_heat","Residual heat")}</span>`:nothing}
        ${isAvailable(remaining) ? html`<span class="zone-meta">${translate(this.hass,"field.remaining_time_entity","Remaining time")}: ${displayState(this.hass!,remaining)}</span>`:nothing}
        ${isAvailable(frying) && frying!.state !== "off" ? html`<span class="zone-meta">${translate(this.hass,"direct.frying","Frying sensor")}: ${displayState(this.hass!,frying)}</span>`:nothing}
      </button>`;
    })}</div>`)}</div><p class="read-only-note">${translate(this.hass,"direct.hob_readonly","Zone values are read-only. Tap a zone for details.")}</p>`;
  }
}
registerElement(hobDefinition.cardType.replace("custom:",""),HobCard);
