import { LitElement, css, html } from "lit";
import { registerElement } from "../helpers/register";

export interface ApplianceAction { key: string; label: string; confirmLabel?: string; icon: string; entityId: string; primary?: boolean; danger?: boolean; disabled?: boolean; }

export class ActionButtons extends LitElement {
  static properties = { actions: { attribute: false }, busyIds: { attribute: false }, confirmingId: {} };
  actions: ApplianceAction[] = [];
  busyIds = new Set<string>();
  confirmingId = "";
  static styles = css`
    :host { display:block; } .row { display:flex; gap:8px; flex-wrap:wrap; }
    button { min-height:44px; flex:1; display:flex; align-items:center; justify-content:center; gap:8px; border:1px solid var(--divider-color); border-radius:10px; padding:10px 16px; background:var(--card-background-color); color:var(--primary-text-color); font:inherit; font-size:13px; font-weight:600; cursor:pointer; }
    button.primary { background:var(--hc-accent); color:white; border-color:var(--hc-accent); }
    button.confirming { background:var(--warning-color,#b8691c); color:white; }
    button:disabled { opacity:.45; cursor:not-allowed; }
    ha-icon { --mdc-icon-size:18px; }
    button:focus-visible { outline:2px solid var(--hc-accent); outline-offset:2px; }
  `;

  render() { return html`<div class="row">${this.actions.map((action) => {
    const busy = this.busyIds.has(action.entityId);
    const confirming = this.confirmingId === action.entityId;
    return html`<button type="button" class="${action.primary ? "primary" : ""} ${action.danger ? "danger" : ""} ${confirming ? "confirming" : ""} ${busy ? "busy" : ""}" ?disabled=${action.disabled || busy} @click=${() => this.dispatchEvent(new CustomEvent("hcd-action", { detail: action, bubbles: true, composed: true }))}><ha-icon .icon=${busy ? "mdi:loading" : confirming ? "mdi:alert-circle-outline" : action.icon}></ha-icon><span>${confirming ? action.confirmLabel || action.label : action.label}</span></button>`;
  })}</div>`; }
}
registerElement("hcd-action-buttons", ActionButtons);
