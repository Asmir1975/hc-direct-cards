import { LitElement, css, html } from "lit";
import type { ApplianceMode } from "../helpers/formatting";
import { registerElement } from "../helpers/register";
import { styleMap } from "lit/directives/style-map.js";

export class ApplianceHeader extends LitElement {
  static properties = {
    name: {}, icon: {}, status: {}, program: {}, phase: {}, tone: {}, mode: {}, accent: {}, busy: { type: Boolean }, offline: { type: Boolean },
  };
  name = "Appliance";
  icon = "mdi:devices";
  status = "Unknown";
  program = "";
  /** Program phase, or the operation state when the appliance has no phase. */
  phase = "";
  /** Tone of the operation state: success, warning or error. */
  tone: "success" | "warning" | "error" | "" = "";
  offline = false;
  mode: ApplianceMode = "idle";
  accent = "var(--primary-color)";
  busy = false;

  static styles = css`
    :host { display: block; min-width: 0; }
    .header { display: grid; grid-template-columns: 48px minmax(0,1fr); align-items: center; gap: 12px; }
    .icon {
      position: relative; width: 48px; height: 48px; display: grid; place-items: center; border-radius: 15px;
      color: var(--hc-accent); background: color-mix(in srgb, var(--hc-accent), transparent 86%);
      border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 80%);
      box-shadow: inset 0 1px 0 color-mix(in srgb, white, transparent 82%);
      transition: transform 180ms ease, background 180ms ease, border-color 180ms ease;
    }
    .icon::after { content: ""; position: absolute; inset: 5px; border-radius: 11px; border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 89%); pointer-events: none; }
    .icon ha-icon { --mdc-icon-size: 25px; }
    .running .icon { background: color-mix(in srgb, var(--hc-accent), transparent 78%); }
    .running .icon ha-icon { animation: breathe 2.4s ease-in-out infinite; }
    .off .icon, .unavailable .icon { color: var(--secondary-text-color); background: var(--secondary-background-color); }
    .copy { min-width: 0; }
    .name { font-size: 15px; font-weight: 700; letter-spacing: -.01em; line-height: 1.25; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { display: flex; gap: 7px; align-items: center; margin-top: 4px; min-width: 0; }
    .dot { width: 7px; height: 7px; flex: none; border-radius: 50%; background: var(--secondary-text-color); }
    .running .dot { background: var(--success-color, #43a047); box-shadow: 0 0 0 4px color-mix(in srgb, var(--success-color, #43a047), transparent 82%); }
    .paused .dot { background: var(--warning-color, #f4b400); }
    .unavailable .dot, .offline .dot { background: var(--error-color, #bb4845); }
    .status.success { color: var(--success-color, #2e8b57); }
    .status.warning { color: var(--warning-color, #af6f18); }
    .status.error { color: var(--error-color, #bb4845); }
    .status, .program, .phase { color: var(--secondary-text-color); font-size: 12px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .program::before, .phase::before { content: "·"; margin-right: 7px; color: var(--hc-accent); }
    @keyframes breathe { 50% { transform: scale(1.08); } }
    @media (prefers-reduced-motion: reduce) { .running .icon ha-icon { animation: none; } }
  `;

  render() {
    return html`<div class="header ${this.mode} ${this.offline ? "offline" : ""}" style=${styleMap({ "--hc-accent": this.accent })}>
      <div class="icon"><ha-icon .icon=${this.icon}></ha-icon></div>
      <div class="copy">
        <div class="name">${this.name}</div>
        <div class="sub"><span class="dot"></span><span class="status ${this.tone}">${this.busy ? "Working…" : this.status}</span>${this.program ? html`<span class="program">${this.program}</span>` : ""}${this.phase ? html`<span class="phase">${this.phase}</span>` : ""}</div>
      </div>
    </div>`;
  }
}
registerElement("hcd-appliance-header", ApplianceHeader);
