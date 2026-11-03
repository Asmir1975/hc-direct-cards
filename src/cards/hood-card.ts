import { css, html, nothing } from "lit";
import { BaseApplianceCard } from "./base-appliance-card";
import { hoodDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
import { displayState, isAvailable } from "../helpers/formatting";
import { isReadonly } from "../helpers/controls";
import { selectOption } from "../helpers/services";
import { fieldLabel, translate } from "../helpers/localize";
import type { FieldDefinition } from "../types/schema";

export class HomeConnectHoodCard extends BaseApplianceCard {
  protected definition = hoodDefinition;

  static styles = [...BaseApplianceCard.styles, css`
    .hood-panel { padding: 16px; border-radius: 14px; border: 1px solid var(--divider-color); background: var(--secondary-background-color); display: grid; gap: 14px; }
    .section-label { font-size: 11px; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; color: var(--secondary-text-color); }
    .hood-level { font-size: 32px; font-weight: 650; letter-spacing: -.04em; }
    .stage-buttons { display: flex; gap: 6px; flex-wrap: wrap; }
    .stage { min-width: 44px; min-height: 44px; border: 1px solid var(--divider-color); border-radius: 10px; padding: 8px 12px; background: var(--card-background-color); color: var(--primary-text-color); font: inherit; cursor: pointer; }
    .stage.selected { background: var(--hc-accent); color: white; border-color: var(--hc-accent); }
    .stage:disabled { opacity: .45; cursor: not-allowed; }
    .hood-extra { display: grid; gap: 4px; margin-top: 10px; }
  `];

  static getConfigElement() { return document.createElement(hoodDefinition.editorTag); }
  static getStubConfig() { return { name: hoodDefinition.defaultName, default_expanded: true }; }

  // The fan levels, the lights and the filter values are drawn here, so the generic sections skip them.
  protected ownFieldKeys(): string[] {
    return ["hood_level_entity", "fan_entity", "working_light_entity", "ambient_light_entity", "grease_filter_entity", "carbon_filter_entity"];
  }

  private fieldFor(key: string): FieldDefinition { return hoodDefinition.fields.find((field) => field.key === key)!; }

  protected renderExtra() {
    if (!this.hass) return nothing;
    const level = this.getState("hood_level_entity");
    const fan = this.getState("fan_entity");
    const options = level?.attributes.options || [];
    const blocked = !level || !isAvailable(level) || isReadonly(level) || this._busyIds.has(level.entity_id);
    const control = (key: string, kind: "light" | "status" | "fan") => {
      const entity = this.getState(key);
      return entity ? html`<hcd-entity-control .hass=${this.hass} .entity=${entity} .kind=${kind} .label=${fieldLabel(this.hass, this.fieldFor(key))} .busy=${this._busyIds.has(entity.entity_id)}></hcd-entity-control>` : nothing;
    };
    return html`
      <div class="hood-panel">
        <span class="section-label">${translate(this.hass, "field.fan_entity", "Fan")}</span>
        ${level ? html`
          <div class="hood-level">${displayState(this.hass, level)}</div>
          <div class="stage-buttons">${options.map((option) => html`
            <button type="button" class="stage ${option === level.state ? "selected" : ""}" aria-pressed=${String(option === level.state)}
              aria-label=${displayState(this.hass!, { ...level, state: option })} ?disabled=${blocked}
              @click=${() => void this.withBusy(level, () => selectOption(this.hass!, level, option))}>
              ${/^fanstage0*\d+$/i.test(option) ? Number(option.match(/\d+$/)![0]) : displayState(this.hass!, { ...level, state: option })}
            </button>`)}</div>`
          : fan ? control("fan_entity", "fan") : nothing}
      </div>
      <div class="hood-extra">
        ${control("working_light_entity", "light")}
        ${control("ambient_light_entity", "light")}
        ${control("grease_filter_entity", "status")}
        ${control("carbon_filter_entity", "status")}
      </div>`;
  }
}
registerElement("hc-direct-hood-card", HomeConnectHoodCard);
