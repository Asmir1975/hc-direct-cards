import { html, nothing } from "lit";
import { BaseApplianceCard } from "./base-appliance-card";
import { hoodDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
import { displayState, isAvailable } from "../helpers/formatting";
import { isControlAvailable, isReadonly } from "../helpers/controls";
import { selectOption } from "../helpers/services";
import { fieldLabel, translate } from "../helpers/localize";

export class HoodCard extends BaseApplianceCard {
  protected definition = hoodDefinition;
  static getConfigElement() { return document.createElement(hoodDefinition.editorTag); }
  static getStubConfig() { return {}; }

  protected renderPrimary() {
    if (!this.hass) return nothing;
    const level = this.getState("hood_level_entity");
    const fan = this.getState("fan_entity");
    const light = this.getState("working_light_entity");
    const ambient = this.getState("ambient_light_entity");
    const blocked = this.isOffline() || !isControlAvailable(level) || !!level && isReadonly(level) || !!level && this._busyIds.has(level.entity_id);
    const options = level?.attributes.options || [];
    return html`
      <div class="hood-panel">
        <span class="section-label">${translate(this.hass,"field.fan_entity","Fan")}</span>
        ${level ? html`
          <div class="hood-level">${displayState(this.hass,level)}</div>
          <div class="stage-buttons">${options.map(option => html`
            <button type="button" class="stage ${option === level.state ? "selected":""}" aria-pressed=${String(option===level.state)}
              aria-label=${displayState(this.hass!,{...level,state:option})} ?disabled=${blocked}
              @click=${()=>void this.withBusy(level,()=>selectOption(this.hass!,level,option))}>
              ${/^fanstage0*\d+$/i.test(option) ? Number(option.match(/\d+$/)![0]) : displayState(this.hass!,{...level,state:option})}
            </button>`)}</div>
        `:fan ? html`<hcd-entity-control .hass=${this.hass} .entity=${fan} kind="fan" .disabled=${this.isOffline()} .label=${translate(this.hass,"field.fan_entity","Fan")}></hcd-entity-control>`:nothing}
      </div>
      ${[["working_light_entity",light],["ambient_light_entity",ambient]].map(([key,entity]) => entity && typeof entity !== "string" ? html`
        <div class="inline-control"><hcd-entity-control .hass=${this.hass} .entity=${entity} kind="light" .disabled=${this.isOffline()} .busy=${this._busyIds.has(entity.entity_id)}
          .label=${fieldLabel(this.hass,hoodDefinition.fields.find(f=>f.key===key)!)}></hcd-entity-control></div>`:nothing)}
      <div class="section-grid">${["grease_filter_entity","carbon_filter_entity"].map(key=>{
        const entity=this.getState(key);
        return entity ? html`<hcd-entity-control .hass=${this.hass} .entity=${entity} kind="status" .label=${fieldLabel(this.hass,hoodDefinition.fields.find(f=>f.key===key)!)}></hcd-entity-control>`:nothing;
      })}</div>
    `;
  }
}
registerElement(hoodDefinition.cardType.replace("custom:",""),HoodCard);
