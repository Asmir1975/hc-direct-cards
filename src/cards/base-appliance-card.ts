import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { commonCardStyles } from "../styles/common";
import type { ApplianceCardConfig } from "../types/config";
import type { HomeAssistant, HassEntity } from "../types/home-assistant";
import type { ApplianceDefinition, FieldDefinition, SectionId } from "../types/schema";
import { configuredEntityIds, relevantStatesChanged, stateFor } from "../helpers/entity";
import { deriveMode, displayState, isOn, isActiveMode, isAvailable, isWarningActive, progressValue, resolveAccentColor } from "../helpers/formatting";
import { discoverEntities, discoveryKey } from "../helpers/registry";
import { showQuantityField } from "../helpers/controls";
import { setBrightness, setFanSpeed, pressEntity, selectOption, setNumber, toggleEntity } from "../helpers/services";
import { fieldLabel, translate } from "../helpers/localize";
import type { ControlEventDetail } from "../components/entity-control";
import type { ApplianceAction } from "../components/action-buttons";
import { fireMoreInfo } from "../helpers/actions";
import { displayProgramName } from "../helpers/programs";
import "../components/entity-control";
import "../components/expandable-section";
import "../components/action-buttons";

const SECTION_META: Record<SectionId, { title: string; icon: string }> = {
  program: { title: "Program", icon: "mdi:tune-variant" },
  options: { title: "Options", icon: "mdi:toggle-switch-outline" },
  status: { title: "Status & care", icon: "mdi:information-outline" },
  settings: { title: "Device settings", icon: "mdi:cog-outline" },
};

export abstract class BaseApplianceCard extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
    _expanded: { state: true },
    _busyIds: { state: true },
    _error: { state: true },
    _confirmingId: { state: true },
  };

  hass?: HomeAssistant;
  protected _config?: ApplianceCardConfig;
  protected _expanded = false;
  protected _busyIds = new Set<string>();
  protected _error = "";
  protected _confirmingId = "";
  private _expandedByUser = false;
  private _confirmationTimer?: number;
  private _discoveryAnchor = "";
  private _manualConfig?: ApplianceCardConfig;
  private _registrySnapshot?: HomeAssistant["entities"];
  private _discovering = false;
  protected abstract definition: ApplianceDefinition;

  static styles = [commonCardStyles, css`
    .section-grid { display:grid; grid-template-columns:minmax(0,1fr); gap:10px 20px; }
    .entity-slot { min-width:0; border-bottom:1px solid var(--divider-color); padding-block:6px; }
    .primary-grid { display:grid; gap:12px; }
    .primary-grid hcd-entity-control { padding:8px 0; border-bottom:1px solid var(--divider-color); }
    .zones { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:10px; }
    .zone-pair { display:flex; flex-direction:column; gap:10px; min-width:0; }
    .zone-pair.combined { gap:0; border:2px solid var(--hc-accent); border-radius:16px; overflow:hidden; background:var(--secondary-background-color); }
    .pair-label { padding:8px 12px; font-size:12px; font-weight:650; color:var(--hc-accent); border-bottom:1px solid var(--divider-color); }
    .zone-pair.combined .zone { border-radius:0; border:0; flex:1; }
    .zone-pair.move { border-top:0; border-bottom:0; border-radius:0; background:transparent; }
    .zone-pair.move .pair-label { border:0; }
    .move-levels { display:flex; flex-direction:column; gap:22px; padding:14px 12px 22px; }
    .move-level { display:flex; align-items:center; justify-content:space-between; gap:8px; }
    .move-level span { font-size:12px; color:var(--secondary-text-color); }
    .move-level strong { font-size:26px; font-weight:650; }
    .zone-pair.move .zone { padding:8px 12px; background:transparent; }
    .zone-pair.move .zone-power { font-size:16px; margin:4px 0; }
    .zone-pair.combined .zone.hot { box-shadow:inset 3px 0 var(--warning-color,#d57825); }
    .zone { width:100%; min-width:0; text-align:left; color:inherit; background:var(--secondary-background-color); border:1px solid var(--divider-color); border-radius:14px; padding:14px; cursor:pointer; }
    .zone.active { border-color:var(--hc-accent); background:color-mix(in srgb,var(--hc-accent),transparent 94%); }
    .zone.hot { border-color:var(--warning-color,#d57825); }
    .zone-title { display:flex; justify-content:space-between; gap:8px; font-size:12px; font-weight:650; }
    .zone-power { display:block; margin:16px 0 8px; font-size:30px; font-weight:650; font-variant-numeric:tabular-nums; }
    .zone-meta { display:block; font-size:12px; color:var(--secondary-text-color); line-height:1.7; }
    .hot-label { color:var(--warning-color,#d57825); font-size:12px; }
    .stage-buttons { display:flex; gap:6px; flex-wrap:wrap; }
    .stage { min-width:44px; min-height:44px; border:1px solid var(--divider-color); border-radius:10px; padding:8px 12px; background:var(--card-background-color); color:var(--primary-text-color); font:inherit; cursor:pointer; }
    .stage.selected { background:var(--hc-accent); color:white; border-color:var(--hc-accent); }
    .stage:disabled { opacity:.45; cursor:not-allowed; }
    .hood-panel { padding:18px; border-radius:14px; border:1px solid var(--divider-color); background:var(--secondary-background-color); display:grid; gap:16px; }
    .section-label { font-size:11px; font-weight:700; letter-spacing:.1em; text-transform:uppercase; color:var(--secondary-text-color); }
    .hood-level { font-size:32px; font-weight:650; letter-spacing:-.04em; }
    .inline-control { padding:4px 0; }
    .read-only-note { margin:8px 0 0; color:var(--secondary-text-color); font-size:11px; }
    @container (max-width:420px) { .section-grid { grid-template-columns:1fr; } }
  `];

  setConfig(config: ApplianceCardConfig): void {
    if (!config || typeof config !== "object") throw new Error("Invalid card configuration.");
    const first = !this._config;
    const defaultChanged = this._config?.default_expanded !== config.default_expanded;
    this._manualConfig = { ...config };
    this._discoveryAnchor = "";
    this._config = { ...config };
    if (first || (defaultChanged && !this._expandedByUser)) this._expanded = config.default_expanded === true;
  }

  protected updated(): void {
    // Minimal anchor-only YAML also works without opening the visual editor.
    const anchor = this._config?.entity || "";
    const selection = discoveryKey(this._config);
    if (!this.hass || !selection || this._config?.auto_detect === false || this._discovering || (selection === this._discoveryAnchor && this._registrySnapshot === this.hass.entities)) return;
    if (!this._config?.device_id && Object.keys(this._config!).some(key => key.endsWith("_entity"))) return;
    this._discoveryAnchor = selection;
    this._registrySnapshot = this.hass.entities;
    const manual = this._manualConfig || this._config!;
    this._discovering = true;
    void discoverEntities(this.hass,anchor,this.definition,manual).then(suggestions=>{
      if (discoveryKey(this._config) !== selection) return;
      const latest = this._manualConfig || manual;
      const safe=Object.fromEntries(Object.entries(suggestions).filter(([key])=>!latest[key]));
      this._config={...latest,...safe};
    }).catch(error=>{
      this._error=error instanceof Error ? error.message : "Automatic discovery failed.";
    }).finally(()=>{this._discovering=false;this.requestUpdate();});
  }

  getCardSize(): number { return this._expanded ? 10 : this.definition.kind === "hob" || this.definition.kind === "hood" ? 6 : 7; }

  getGridOptions() { return { columns: 12, min_columns: 3, rows: "auto" }; }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.clearConfirmation();
  }

  protected shouldUpdate(changed: PropertyValues<this>): boolean {
    if (!changed.has("hass")) return true;
    if (!this._config) return true;
    const before = changed.get("hass") as HomeAssistant | undefined;
    if (this._config.device_id && (before?.entities !== this.hass?.entities
      || before?.devices?.[this._config.device_id] !== this.hass?.devices?.[this._config.device_id])) return true;
    return relevantStatesChanged(before, this.hass, configuredEntityIds(this._config));
  }

  protected getState(key: string): HassEntity | undefined {
    return this._config && stateFor(this.hass, this._config, key);
  }

  protected toggleExpanded(): void {
    this._expandedByUser = true;
    this._expanded = !this._expanded;
  }

  private infoEntityId(): string | undefined {
    if (!this._config) return undefined;
    for (const key of ["entity", "operating_state_entity", "status_entity", "power_state_entity", "power_entity"]) {
      const value = this._config[key];
      if (typeof value === "string" && value.includes(".")) return value;
    }
    return undefined;
  }

  protected showMoreInfo(): void {
    const entityId = this.infoEntityId();
    if (!entityId) return;
    fireMoreInfo(this, entityId);
  }

  private clearConfirmation(): void {
    if (this._confirmationTimer !== undefined) window.clearTimeout(this._confirmationTimer);
    this._confirmationTimer = undefined;
    this._confirmingId = "";
  }

  protected supportsField(key: string): boolean {
    return this.definition.fields.some((field) => field.key === key);
  }

  protected isOffline(): boolean {
    const connection = this.getState("connection_entity");
    return !!connection && !isOn(connection);
  }

  protected primaryFieldKeys(): string[] {
    const common = ["selected_program_entity"];
    const keys: Partial<Record<string, string[]>> = {
      coffee: [...common, "fill_quantity_select_entity", "fill_quantity_entity", "bean_amount_entity", "aroma_entity"],
      oven: [...common, "target_temperature_entity", "duration_entity"],
      dishwasher: common,
      hood: ["hood_level_entity", "fan_entity", "working_light_entity", "ambient_light_entity"],
      hob: [],
    };
    return keys[this.definition.kind] || [];
  }

  protected renderPrimary(mode: ReturnType<typeof deriveMode>) {
    if (!this._config || !this.hass) return nothing;
    const fields = this.definition.fields.filter(field => this.primaryFieldKeys().includes(field.key))
      .filter(field => showQuantityField(field.key, this.hass!, this._config!))
      .map(field => ({ field, entity: this.getState(field.key) })).filter(item => !!item.entity);
    const disabled = this.isOffline() || mode === "running" || mode === "paused";
    return html`<div class="primary-grid">${fields.map(({field,entity}) => html`
      <hcd-entity-control .hass=${this.hass} .entity=${entity} .label=${fieldLabel(this.hass,field)} .kind=${this.controlKind(field,entity!)}
        .valueLabels=${field.key === "selected_program_entity" ? this._config?.program_names || {} : {}}
        .busy=${this._busyIds.has(entity!.entity_id)} .disabled=${disabled && field.kind !== "status"}></hcd-entity-control>
    `)}</div>`;
  }

  protected configuredFields(section: SectionId): Array<{ field: FieldDefinition; entity: HassEntity }> {
    if (!this._config || !this.hass) return [];
    return this.definition.fields
      .filter((field) => field.section === section)
      .filter((field) => !this.primaryFieldKeys().includes(field.key) && !field.key.startsWith("zone_"))
      .filter((field) => showQuantityField(field.key, this.hass!, this._config!))
      .filter((field) => !["active_program_entity", "progress_entity", "remaining_time_entity"].includes(field.key))
      .map((field) => ({ field, entity: this.getState(field.key)! }))
      .filter(({ entity }) => !!entity);
  }

  protected async withBusy(entity: HassEntity, task: () => Promise<void>): Promise<void> {
    if (this.isOffline()) { this._error=translate(this.hass,"direct.disconnected","Device disconnected"); return; }
    if (this._busyIds.has(entity.entity_id)) return;
    this._busyIds = new Set(this._busyIds).add(entity.entity_id);
    this._error = "";
    try { await task(); }
    catch (error) { this._error = error instanceof Error ? error.message : "The Home Assistant service call failed."; }
    finally {
      const next = new Set(this._busyIds);
      next.delete(entity.entity_id);
      this._busyIds = next;
    }
  }

  protected handleControl(event: CustomEvent<ControlEventDetail>): void {
    const { entity, action, value } = event.detail;
    void this.withBusy(entity, async () => {
      if (!this.hass) return;
      if (action === "brightness" && typeof value === "number") await setBrightness(this.hass, entity, value);
      if (action === "fan" && typeof value === "number") await setFanSpeed(this.hass, entity, value);
      if (action === "press") await pressEntity(this.hass, entity);
      if (action === "toggle") await toggleEntity(this.hass, entity);
      if (action === "select" && typeof value === "string") await selectOption(this.hass, entity, value);
      if (action === "number" && typeof value === "number") await setNumber(this.hass, entity, value);
    });
  }

  private handleAction(event: CustomEvent<ApplianceAction>): void {
    const action = event.detail;
    if (action.danger && this._config?.confirm_cancel !== false && this._confirmingId !== action.entityId) {
      this.clearConfirmation();
      this._confirmingId = action.entityId;
      this._confirmationTimer = window.setTimeout(() => this.clearConfirmation(), 5000);
      return;
    }
    this.clearConfirmation();
    const entity = this.hass?.states[action.entityId];
    if (entity) void this.withBusy(entity, () => pressEntity(this.hass!, entity));
  }

  protected renderPower(disabled: boolean) {
    const power = this.getState("power_entity") || this.getState("power_state_entity");
    if (!power) return nothing;
    const domain = power.entity_id.split(".")[0];
    const kind = domain === "select" || domain === "input_select" ? "select" : domain === "light" ? "light" : domain === "switch" || domain === "input_boolean" ? "toggle" : "status";
    return html`<div class="power-row"><hcd-entity-control .hass=${this.hass} .entity=${power} .label=${translate(this.hass, "power", "Power")} .kind=${kind} .busy=${this._busyIds.has(power.entity_id)} .disabled=${disabled}></hcd-entity-control></div>`;
  }

  protected renderActions(mode: ReturnType<typeof deriveMode>) {
    if (!this._config || !this.hass || mode === "off" || mode === "unavailable") return nothing;
    const actionSpec = mode === "paused"
      ? [["resume_entity", translate(this.hass, "action.resume", "Resume"), "mdi:play", true, false], ["cancel_entity", translate(this.hass, "action.cancel", "Cancel"), "mdi:stop", false, true]]
      : mode === "running"
        ? [["pause_entity", translate(this.hass, "action.pause", "Pause"), "mdi:pause", false, false], ["cancel_entity", translate(this.hass, "action.cancel", "Cancel"), "mdi:stop", false, true]]
        : [["start_entity", translate(this.hass, "action.start", "Start"), "mdi:play", true, false]];
    const actions: ApplianceAction[] = actionSpec.flatMap(([key, label, icon, primary, danger]) => {
      if (!this.definition.fields.some((field) => field.key === key)) return [];
      const id = this._config?.[key as string];
      const entity = typeof id === "string" ? this.hass?.states[id] : undefined;
      const domain = entity?.entity_id.split(".")[0];
      return entity ? [{ key, label, confirmLabel: danger ? translate(this.hass, "action.confirm_cancel", "Confirm cancel") : undefined, icon, entityId: id as string, primary, danger, disabled: entity.state === "unavailable" || (domain !== "button" && domain !== "input_button") } as ApplianceAction] : [];
    });
    return actions.length ? html`<div class="primary-actions"><hcd-action-buttons .actions=${actions} .busyIds=${this._busyIds} .confirmingId=${this._confirmingId}></hcd-action-buttons></div>` : nothing;
  }

  protected renderSection(section: SectionId, disabled: boolean) {
    if (!this._config) return nothing;
    if (section === "options" && this._config.show_options_section === false) return nothing;
    if (section === "status" && this._config.show_status_section === false) return nothing;
    if (section === "settings" && this._config.show_settings_section === false) return nothing;
    const fields = this.configuredFields(section);
    if (!fields.length) return nothing;
    const meta = SECTION_META[section];
    return html`<hcd-expandable-section .title=${translate(this.hass, `section.${section}`, meta.title)} .icon=${meta.icon} .open=${false}>
      <div class="section-grid ${section === "program" ? "program-grid" : ""}">${fields.map(({ field, entity }) => html`
        <div class="entity-slot"><hcd-entity-control .hass=${this.hass} .entity=${entity} .label=${fieldLabel(this.hass, field)} .kind=${this.controlKind(field, entity)}
          .valueLabels=${field.key === "selected_program_entity" || field.key === "active_program_entity" ? this._config?.program_names || {} : {}}
          .busy=${this._busyIds.has(entity.entity_id)} .disabled=${disabled && field.kind !== "status" && !field.allowWhileActive}></hcd-entity-control>
        </div>
      `)}</div>
    </hcd-expandable-section>`;
  }

  protected controlKind(field: FieldDefinition, entity: HassEntity): FieldDefinition["kind"] {
    if (field.kind === "status" || field.kind === "button") return field.kind;
    const domain = entity.entity_id.split(".")[0];
    if (domain === "select" || domain === "input_select") return "select";
    if (domain === "number" || domain === "input_number") return "number";
    if (domain === "light") return "light";
    if (domain === "fan") return "fan";
    if (domain === "switch" || domain === "input_boolean") return "toggle";
    return "status";
  }

  render() {
    if (!this._config || !this.hass) return nothing;
    if (!discoveryKey(this._config) && !Object.keys(this._config).some(key=>key.endsWith("_entity"))) {
      return html`<ha-card><div class="daily-controls" style="padding-top:20px">${translate(this.hass,"direct.select_device","Choose the appliance in the card editor.")}</div></ha-card>`;
    }
    const status = this.getState("operating_state_entity") || this.getState("status_entity") || this.getState("power_entity");
    const power = this.getState("power_entity");
    const mode = deriveMode(power, status);
    const active = isActiveMode(mode);
    const headerStatus = mode === "off" && power ? power : status;
    const program = active ? this.getState("active_program_entity") || this.getState("selected_program_entity") : this.getState("selected_program_entity");
    const remaining = this.getState("remaining_time_entity") || this.getState("finish_at_entity");
    const progress = progressValue(this.getState("progress_entity"));
    const warnings = this.definition.fields.filter(f => f.warning).map(field => ({field, entity:this.getState(field.key)}))
      .filter(({field,entity}) => entity && isWarningActive(entity,field.warningStates,field.warningBelow));
    const metrics = this.definition.fields.filter(f => f.prominent).map(f=>this.getState(f.key)).filter(isAvailable);
    const disabled = this.isOffline() || this.definition.kind !== "hood" && (mode === "running" || mode === "paused");
    const accent = resolveAccentColor(this._config.accent_color,this.definition.accent);
    return html`<ha-card style=${styleMap({"--hc-accent":accent})} @hcd-control=${this.handleControl} @hcd-action=${this.handleAction}>
      <div class="shell">
        <header class="card-header">
          <button class="identity" type="button" @click=${this.showMoreInfo}>
            <span class="eyebrow">HOME CONNECT DIRECT · ${translate(this.hass,"device."+this.definition.kind,this.definition.defaultName)}</span>
            <span class="card-title">${this._config.name || this.hass.devices?.[this._config.device_id || ""]?.name_by_user || this.hass.devices?.[this._config.device_id || ""]?.name || translate(this.hass,"device."+this.definition.kind,this.definition.defaultName)}</span>
          </button>
          <span class="state-label ${mode}">${this.getState("connection_entity") ? html`<span class="connection-dot ${this.isOffline() ? "offline":""}" title=${translate(this.hass,this.isOffline()?"direct.disconnected":"direct.connected",this.isOffline()?"Device disconnected":"Connected")}></span>`:nothing}${headerStatus ? displayState(this.hass,headerStatus) : translate(this.hass,"ready","Ready")}</span>
        </header>
        ${warnings.length ? html`<div class="warning-strip">${warnings.map(({field,entity})=>html`<span class="notice">${fieldLabel(this.hass,field)}${entity?.entity_id.startsWith("binary_sensor.") ? "" : ": "+displayState(this.hass!,entity)}</span>`)}</div>`:nothing}
        ${active && isAvailable(program) ? html`<div class="now-running"><span>${displayProgramName(this.hass,program!,this._config.program_names)}</span>${isAvailable(remaining) ? html`<strong>${displayState(this.hass,remaining)}</strong>`:nothing}</div>`:nothing}
        ${active && progress !== undefined && this._config.show_progress !== false ? html`<div class="progress-line"><span style=${`width:${progress}%`}></span></div>`:nothing}
        ${metrics.length ? html`<div class="key-metrics">${metrics.map(e=>html`<strong>${displayState(this.hass!,e)}</strong>`)}</div>`:nothing}
        <div class="daily-controls">
          ${this.definition.kind !== "hood" ? this.renderPower(this.isOffline()):nothing}
          ${this.renderPrimary(mode)}
          ${this.renderActions(mode)}
        </div>
        <footer><button class="details-button" type="button" @click=${this.toggleExpanded} aria-expanded=${String(this._expanded)}>${translate(this.hass,"direct.details","Details & settings")} <span>${this._expanded ? "−":"+"}</span></button></footer>
        ${this._expanded ? html`<div class="details-content">
          ${this.renderSection("program",disabled)}
          ${this.renderSection("options",disabled)}
          ${this.renderSection("status",false)}
          ${this.renderSection("settings",disabled)}
        </div>`:nothing}
        ${this._error ? html`<div class="error" role="alert">${this._error}<button @click=${()=>{this._error="";}}>×</button></div>`:nothing}
      </div>
    </ha-card>`;
  }
}
