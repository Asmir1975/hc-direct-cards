import { LitElement, PropertyValues, css, html, nothing } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { commonCardStyles } from "../styles/common";
import type { ApplianceCardConfig } from "../types/config";
import type { HomeAssistant, HassEntity } from "../types/home-assistant";
import type { ApplianceDefinition, FieldDefinition, SectionId } from "../types/schema";
import { configuredEntityIds, relevantStatesChanged, stateFor } from "../helpers/entity";
import { canonicalState, deriveMode, displayState, isActiveMode, isAvailable, isOn, isWarningActive, phaseText, progressValue, resolveAccentColor, stateTone } from "../helpers/formatting";
import { discoverEntities, discoveryKey } from "../helpers/registry";
import { formatDuration } from "../helpers/numbers";
import { clockText, summarizeTimes, type TimeSummary } from "../helpers/times";
import { messageNotice } from "../helpers/notices";
import { isReadonly, showQuantityField } from "../helpers/controls";
import { pressEntity, selectOption, setBrightness, setFanSpeed, setNumber, toggleEntity } from "../helpers/services";
import { fieldLabel, translate } from "../helpers/localize";
import type { ControlEventDetail } from "../components/entity-control";
import type { ApplianceAction } from "../components/action-buttons";
import { fireMoreInfo } from "../helpers/actions";
import { displayProgramName } from "../helpers/programs";
import "../components/appliance-header";
import "../components/progress-display";
import "../components/status-chip";
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
    .section-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); column-gap: 18px; }
    .entity-slot { min-width: 0; border-bottom: 1px solid color-mix(in srgb, var(--divider-color), transparent 45%); }
    .entity-slot:nth-last-child(-n+2) { border-bottom-color: transparent; }
    .program-grid .entity-slot:first-child { grid-column: 1 / -1; }
    .power-row { padding: 2px 11px; border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 82%); border-radius: 13px; background: color-mix(in srgb, var(--hc-accent), transparent 94%); }
    .program-focus { padding: 2px 0 5px; }
    .activity { display: grid; gap: 10px; padding: 12px; border: 1px solid color-mix(in srgb, var(--hc-accent), transparent 80%); border-radius: 14px; background: linear-gradient(135deg, color-mix(in srgb, var(--hc-accent), transparent 91%), color-mix(in srgb, var(--secondary-background-color), transparent 24%)); }
    .activity-top { display: flex; align-items: end; justify-content: space-between; gap: 12px; }
    .activity-copy { min-width: 0; }
    .activity-label { margin-bottom: 3px; color: var(--secondary-text-color); font-size: 10px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; }
    .activity-program { overflow: hidden; color: var(--primary-text-color); font-size: 15px; font-weight: 700; text-overflow: ellipsis; white-space: nowrap; }
    .activity-time { flex: none; padding: 5px 8px; border-radius: 9px; color: var(--hc-accent); background: color-mix(in srgb, var(--hc-accent), transparent 88%); font-size: 12px; font-weight: 700; font-variant-numeric: tabular-nums; }
    .times { display: flex; flex-wrap: wrap; gap: 6px 8px; }
    .time-chip { padding: 4px 10px; border-radius: 999px; font-size: 12px; font-variant-numeric: tabular-nums; color: var(--secondary-text-color); background: color-mix(in srgb, var(--hc-accent) 14%, transparent); }
    .time-chip b { color: var(--primary-text-color); font-weight: 650; }
    .message-strip { padding: 0 16px 12px; }
    .notice { font-size: 12px; padding: 8px 10px; border-left: 3px solid var(--warning-color, #d18420); background: color-mix(in srgb, var(--warning-color, #d18420), transparent 94%); overflow-wrap: anywhere; }
    .notice.info { border-left-color: var(--info-color, #3d8bd9); background: color-mix(in srgb, var(--info-color, #3d8bd9), transparent 92%); }
    .notice.success { border-left-color: var(--success-color, #43a047); background: color-mix(in srgb, var(--success-color, #43a047), transparent 92%); }
    .notice ha-icon { --mdc-icon-size: 16px; margin-right: 6px; vertical-align: -3px; }
    @container (max-width: 620px) {
      .section-grid { grid-template-columns: 1fr; }
      .program-grid .entity-slot:first-child { grid-column: auto; }
      .entity-slot:nth-last-child(-n+2) { border-bottom-color: color-mix(in srgb, var(--divider-color), transparent 45%); }
      .entity-slot:last-child { border-bottom-color: transparent; }
    }
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
    // A device or a single anchor entity is enough: the entities are assigned here, without opening the editor.
    const anchor = this._config?.entity || "";
    const selection = discoveryKey(this._config);
    if (!this.hass || !selection || this._config?.auto_detect === false || this._discovering || (selection === this._discoveryAnchor && this._registrySnapshot === this.hass.entities)) return;
    if (!this._config?.device_id && Object.keys(this._config!).some((key) => key.endsWith("_entity"))) return;
    this._discoveryAnchor = selection;
    this._registrySnapshot = this.hass.entities;
    const manual = this._manualConfig || this._config!;
    this._discovering = true;
    void discoverEntities(this.hass, anchor, this.definition, manual).then((suggestions) => {
      if (discoveryKey(this._config) !== selection) return;
      const latest = this._manualConfig || manual;
      const safe = Object.fromEntries(Object.entries(suggestions).filter(([key]) => !latest[key]));
      this._config = { ...latest, ...safe };
    }).catch((error) => {
      this._error = error instanceof Error ? error.message : "Automatic discovery failed.";
    }).finally(() => { this._discovering = false; this.requestUpdate(); });
  }

  getCardSize(): number { return this._expanded ? 6 : 1; }

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
    return relevantStatesChanged(changed.get("hass") as HomeAssistant | undefined, this.hass, configuredEntityIds(this._config));
  }

  protected getState(key: string): HassEntity | undefined {
    return this._config && stateFor(this.hass, this._config, key);
  }

  private toggleExpanded(): void {
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

  private showMoreInfo(): void {
    const entityId = this.infoEntityId();
    if (!entityId) return;
    fireMoreInfo(this, entityId);
  }

  private clearConfirmation(): void {
    if (this._confirmationTimer !== undefined) window.clearTimeout(this._confirmationTimer);
    this._confirmationTimer = undefined;
    this._confirmingId = "";
  }

  private supportsField(key: string): boolean {
    return this.definition.fields.some((field) => field.key === key);
  }

  /** Cards that draw some fields themselves list their keys here, so the generic sections skip them. */
  protected ownFieldKeys(): string[] { return []; }

  /** Extra content at the top of the details (the hob draws its zones here). */
  protected renderExtra(): unknown { return nothing; }

  protected configuredFields(section: SectionId): Array<{ field: FieldDefinition; entity: HassEntity }> {
    if (!this._config || !this.hass) return [];
    return this.definition.fields
      .filter((field) => field.section === section)
      .filter((field) => !field.key.startsWith("zone_") && !this.ownFieldKeys().includes(field.key))
      .filter((field) => showQuantityField(field.key, this.hass!, this._config!))
      .filter((field) => !["active_program_entity", "progress_entity", "remaining_time_entity"].includes(field.key))
      .map((field) => ({ field, entity: this.getState(field.key)! }))
      .filter(({ entity }) => !!entity);
  }

  protected async withBusy(entity: HassEntity, task: () => Promise<void>): Promise<void> {
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

  private handleControl(event: CustomEvent<ControlEventDetail>): void {
    const { entity, action, value } = event.detail;
    void this.withBusy(entity, async () => {
      if (!this.hass) return;
      if (action === "press") await pressEntity(this.hass, entity);
      if (action === "toggle") await toggleEntity(this.hass, entity);
      if (action === "select" && typeof value === "string") await selectOption(this.hass, entity, value);
      if (action === "number" && typeof value === "number") await setNumber(this.hass, entity, value);
      if (action === "brightness" && typeof value === "number") await setBrightness(this.hass, entity, value);
      if (action === "fan" && typeof value === "number") await setFanSpeed(this.hass, entity, value);
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

  /** A start delay moves in 15 minute steps; the appliance accepts any value (own device logs). */
  /** Explains a locked Smart Start switch: the appliance locks it while Auto Smart Start is off. */
  private hintFor(field: FieldDefinition, entity: HassEntity): string {
    if (field.key !== "smart_start_entity" || !isReadonly(entity)) return "";
    const auto = this.getState("auto_smart_start_entity");
    return auto && canonicalState(auto) === "off" ? translate(this.hass, "hint.smart_start_locked", "Smart Start is locked while Auto Smart Start is off.") : "";
  }

  private stepFor(field: FieldDefinition): number {
    return field.key === "start_in_entity" ? 900 : 0;
  }

  private renderTimes(times: TimeSummary) {
    const hass = this.hass!;
    const chip = (label: string, value = "") => html`<span class="time-chip">${label}${value ? html` <b>${value}</b>` : nothing}</span>`;
    const at = (key: string, fallback: string, epoch: number) => translate(hass, key, fallback).replace("{t}", clockText(hass, epoch));
    const smart = times.smartStart ? chip(translate(hass, "time.smart_changes", "Smart Start: times can change")) : nothing;
    if (times.phase === "delayed") return html`<div class="times">${chip(translate(hass, "time.starts_in", "Starts in"), formatDuration(hass, times.startsIn!))}${times.endsIn !== undefined ? chip(translate(hass, "time.done_in", "Done in"), formatDuration(hass, times.endsIn)) : nothing}${times.endsAt !== undefined ? chip(at("time.done_at", "Done at {t}", times.endsAt)) : nothing}${smart}</div>`;
    if (times.phase === "finished") return html`<div class="times">${chip(at("time.done_at", "Done at {t}", times.finishedAt!))}</div>`;
    if (times.phase === "idle") return html`<div class="times">${chip(translate(hass, "time.estimate", "Estimated duration"), formatDuration(hass, times.estimate!))}${chip(at("time.done_at_start", "Done at {t} if started", times.endsAt!))}${times.delayedEndsAt !== undefined ? chip(translate(hass, "time.done_in_delay", "With the delay done in {d} at {t}").replace("{d}", formatDuration(hass, times.endsIn!)).replace("{t}", clockText(hass, times.delayedEndsAt))) : nothing}${smart}</div>`;
    return html`<div class="times">
      ${times.elapsed !== undefined ? chip(translate(hass, "time.elapsed", "Running"), formatDuration(hass, times.elapsed)) : nothing}
      ${times.remaining !== undefined ? chip(translate(hass, "time.done_in", "Done in"), formatDuration(hass, times.remaining)) : nothing}
      ${times.endsAt !== undefined ? chip(at("time.done_at", "Done at {t}", times.endsAt)) : nothing}
    </div>`;
  }

  private renderPower(disabled: boolean) {
    const power = this.getState("power_entity") || this.getState("power_state_entity");
    if (!power) return nothing;
    const domain = power.entity_id.split(".")[0];
    const kind = domain === "select" || domain === "input_select" ? "select" : domain === "light" ? "light" : domain === "switch" || domain === "input_boolean" ? "toggle" : "status";
    return html`<div class="power-row"><hcd-entity-control .hass=${this.hass} .entity=${power} .label=${translate(this.hass, "power", "Power")} .kind=${kind} .busy=${this._busyIds.has(power.entity_id)} .disabled=${disabled}></hcd-entity-control></div>`;
  }

  private renderActions(mode: ReturnType<typeof deriveMode>) {
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

  private renderSection(section: SectionId, disabled: boolean) {
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
          .stepSeconds=${this.stepFor(field)} .hint=${this.hintFor(field, entity)}
          .busy=${this._busyIds.has(entity.entity_id)} .disabled=${disabled && field.kind !== "status" && !field.allowWhileActive}></hcd-entity-control>
        </div>
      `)}</div>
    </hcd-expandable-section>`;
  }

  private controlKind(field: FieldDefinition, entity: HassEntity): FieldDefinition["kind"] {
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
    if (!discoveryKey(this._config) && !Object.keys(this._config).some((key) => key.endsWith("_entity"))) {
      return html`<ha-card><div style="padding:20px">${translate(this.hass, "direct.select_device", "Choose the appliance in the card editor.")}</div></ha-card>`;
    }
    const status = this.getState("operating_state_entity") || this.getState("status_entity") || this.getState("power_state_entity") || this.getState("power_entity") || this.getState("entity");
    const power = this.getState("power_entity") || this.getState("power_state_entity");
    const activeProgram = this.getState("active_program_entity");
    const selectedProgram = this.getState("selected_program_entity");
    const progress = progressValue(this.getState("progress_entity"));
    const remaining = (this.supportsField("remaining_time_entity") ? this.getState("remaining_time_entity") : undefined)
      || (this.supportsField("finish_at_entity") ? this.getState("finish_at_entity") : undefined);
    const mode = deriveMode(power, status);
    const active = isActiveMode(mode);
    const program = active ? activeProgram || selectedProgram : selectedProgram || activeProgram;
    const summaryProgram = mode === "off" ? undefined : program;
    const summaryProgress = active ? progress : undefined;
    const summaryRemaining = active ? remaining : undefined;
    const headerStatus = mode === "off" && power ? power : status;
    const animations = this._config.animations !== false;
    const times = this.definition.kind === "oven" || this.definition.kind === "dishwasher"
      ? summarizeTimes({ active, status: this.getState("operating_state_entity"), remaining: this.getState("remaining_time_entity"),
        elapsed: this.getState("elapsed_time_entity"), estimate: this.getState("estimated_time_entity"), startIn: this.getState("start_in_entity"),
        smartStart: isOn(this.getState("smart_start_entity")) || isOn(this.getState("auto_smart_start_entity")), now: Date.now() })
      : undefined;
    const message = messageNotice(this.hass, this.getState("messages_entity"));
    const warnings = this.definition.fields
      .filter((field) => field.warning && field.key !== "messages_entity")
      .map((field) => ({ field, entity: this.getState(field.key) }))
      .filter(({ field, entity }) => entity && isWarningActive(entity, field.warningStates, field.warningBelow));
    const prominent = this.definition.fields
      .filter((field) => field.prominent)
      .map((field) => ({ field, entity: this.getState(field.key) }))
      .filter(({ entity }) => isAvailable(entity));
    const infoEntityId = this.infoEntityId();
    const accent = resolveAccentColor(this._config.accent_color, this.definition.accent);
    const phase = phaseText(this.hass, this.getState("phase_entity"), active, this.getState("operating_state_entity"));
    const connection = this.getState("connection_entity");
    const offline = !!connection && !isOn(connection);
    const device = this._config.device_id ? this.hass.devices?.[this._config.device_id] : undefined;
    const programNames = this._config.program_names;

    const showActivity = mode !== "off" && (isAvailable(program) || isAvailable(summaryRemaining) || summaryProgress !== undefined);
    // Open card: the activity block below already shows progress and time, so the header does not repeat them.
    const headerProgress = summaryProgress !== undefined && this._config.show_progress !== false && !(this._expanded && showActivity);
    const headerRemaining = isAvailable(summaryRemaining) && this._config.show_remaining_time !== false && !(this._expanded && showActivity);

    return html`<ha-card style=${styleMap({ "--hc-accent": accent })} @hcd-control=${this.handleControl} @hcd-action=${this.handleAction}>
      <div class="shell mode-${mode} ${this._expanded ? "expanded" : ""} ${animations ? "" : "no-animation"} ${mode === "unavailable" ? "unavailable" : ""}">
        <div class="summary ${headerProgress ? "has-progress" : ""}">
          <button class="summary-button header-button" type="button" ?disabled=${!infoEntityId} @click=${this.showMoreInfo} title=${translate(this.hass, "action.more_info", "More information")} aria-label=${translate(this.hass, "action.more_info", "More information")}>
            <hcd-appliance-header .name=${this._config.name || device?.name_by_user || device?.name || translate(this.hass, `device.${this.definition.kind}`, this.definition.defaultName)} .icon=${this._config.icon || this.definition.defaultIcon}
              .status=${displayState(this.hass, headerStatus)} .program=${isAvailable(summaryProgram) ? displayProgramName(this.hass, summaryProgram!, programNames) : ""} .phase=${phase && phase !== displayState(this.hass, headerStatus) ? phase : ""} .tone=${stateTone(status)} .offline=${offline} .mode=${mode} .accent=${accent}></hcd-appliance-header>
          </button>
          <button class="summary-button summary-toggle" type="button" @click=${this.toggleExpanded} aria-expanded=${String(this._expanded)} aria-label=${translate(this.hass, "action.toggle_details", "Toggle details")}><div class="metrics">
            ${prominent.map(({ entity }) => html`<span class="metric">${displayState(this.hass!, entity)}</span>`)}
            ${headerProgress ? html`<span class="metric progress">${Math.round(summaryProgress)}%</span>` : ""}
            ${headerRemaining ? html`<span class="metric">${displayState(this.hass, summaryRemaining)}</span>` : ""}
          </div><ha-icon class="chevron" icon="mdi:chevron-down"></ha-icon></button>
          ${headerProgress ? html`<div class="summary-progress" aria-hidden="true"><div class="summary-progress-fill" style=${`transform:scaleX(${summaryProgress / 100})`}></div></div>` : ""}
        </div>
        ${message ? html`<div class="message-strip"><div class="notice ${message.tone}" role="status"><ha-icon .icon=${message.icon}></ha-icon>${message.text}</div></div>` : ""}
        <div class="details"><div class="details-inner"><div class="details-content">
          ${warnings.length ? html`<div class="warning-strip">${warnings.map(({ field, entity }) => html`<hcd-status-chip .label=${fieldLabel(this.hass, field)} .value=${entity?.entity_id.startsWith("binary_sensor.") ? "" : displayState(this.hass!, entity)} warning icon="mdi:alert-outline"></hcd-status-chip>`)}</div>` : ""}
          ${this.renderExtra()}
          ${this.renderPower(false)}
          ${times ? this.renderTimes(times) : ""}
          ${showActivity ? html`<div class="activity"><div class="activity-top"><div class="activity-copy"><div class="activity-label">${mode === "running" ? translate(this.hass, "running", "Now running") : mode === "paused" ? translate(this.hass, "paused", "Paused") : translate(this.hass, "ready", "Ready")}</div><div class="activity-program">${isAvailable(program) ? displayProgramName(this.hass, program!, programNames) : translate(this.hass, "appliance_status", "Appliance status")}</div></div>${isAvailable(summaryRemaining) && this._config.show_remaining_time !== false && !times ? html`<div class="activity-time">${displayState(this.hass, summaryRemaining)}</div>` : ""}</div>${summaryProgress !== undefined && this._config.show_progress !== false ? html`<hcd-progress-display .value=${summaryProgress} .label=${translate(this.hass, "progress", "Program progress")} .animated=${animations}></hcd-progress-display>` : ""}</div>` : ""}
          ${this.renderActions(mode)}
          ${this.renderSection("program", false)}
          ${this.renderSection("options", false)}
          ${this.renderSection("status", false)}
          ${this.renderSection("settings", false)}
        </div></div></div>
        ${this._error ? html`<div class="error" role="alert"><span>${this._error}</span><button type="button" @click=${() => { this._error = ""; }} aria-label=${translate(this.hass, "action.dismiss", "Dismiss")} title=${translate(this.hass, "action.dismiss", "Dismiss")}><ha-icon icon="mdi:close"></ha-icon></button></div>` : ""}
      </div>
    </ha-card>`;
  }
}
