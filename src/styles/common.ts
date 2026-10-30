import { css } from "lit";
export const commonCardStyles = css`
  :host { display:block; --hc-accent:var(--primary-color,#147d79); }
  * { box-sizing:border-box; }
  ha-card { display:block; color:var(--primary-text-color); background:var(--ha-card-background,var(--card-background-color)); border:1px solid var(--divider-color); border-radius:18px; overflow:hidden; box-shadow:none; }
  .shell { container-type:inline-size; }
  .card-header { display:flex; align-items:center; justify-content:space-between; gap:12px; padding:20px 20px 16px; }
  .identity { min-width:0; padding:0; background:none; color:inherit; border:0; text-align:left; font:inherit; cursor:pointer; }
  .eyebrow { display:block; font-size:9px; font-weight:750; letter-spacing:.12em; color:var(--secondary-text-color); line-height:1.6; text-transform:uppercase; }
  .card-title { display:block; margin-top:4px; font-size:21px; font-weight:650; letter-spacing:-.035em; overflow-wrap:anywhere; }
  .state-label { flex-shrink:0; font-size:11px; padding:6px 8px; border-radius:6px; background:var(--secondary-background-color); color:var(--secondary-text-color); }
  .connection-dot { display:inline-block; width:6px;height:6px;border-radius:50%;background:var(--success-color,#479c70);margin-right:6px; }
  .connection-dot.offline { background:var(--error-color,#bb4845); }
  .state-label.running { color:var(--primary-text-color); background:color-mix(in srgb,var(--hc-accent),transparent 91%); }
  .state-label.paused { color:var(--warning-color,#af6f18); }
  .daily-controls { padding:0 20px 18px; display:grid; gap:14px; }
  .power-row { padding:0 0 10px; border-bottom:1px solid var(--divider-color); }
  .now-running { margin:0 20px 12px; display:flex; flex-wrap:wrap; justify-content:space-between; gap:6px; font-size:13px; }
  .now-running strong { color:var(--hc-accent); }
  .progress-line { height:3px; margin:0 20px 14px; background:var(--divider-color); overflow:hidden; border-radius:2px; }
  .progress-line span { height:100%; display:block; background:var(--hc-accent); transition:width .25s ease; }
  .key-metrics { margin:0 20px 14px; display:flex; gap:12px; font-size:18px; }
  .warning-strip { padding:0 20px 12px; display:grid; gap:6px; }
  .notice { font-size:12px; padding:8px 10px; border-left:3px solid var(--warning-color,#d18420); background:color-mix(in srgb,var(--warning-color,#d18420),transparent 94%); overflow-wrap:anywhere; }
  footer { border-top:1px solid var(--divider-color); }
  .details-button { width:100%; min-height:44px; padding:10px 20px; border:0; background:transparent; color:var(--secondary-text-color); display:flex; justify-content:space-between; align-items:center; font:inherit; font-size:12px; cursor:pointer; }
  .details-content { display:grid; gap:12px; padding:0 20px 18px; }
  .primary-actions { margin-top:2px; }
  .error { margin:0 20px 18px; padding:10px; color:var(--error-color,#c64d41); background:color-mix(in srgb,var(--error-color,#c64d41),transparent 92%); border-radius:8px; font-size:12px; }
  .error button { color:inherit; border:0; background:none; cursor:pointer; float:right; }
  button:focus-visible,input:focus-visible,select:focus-visible { outline:2px solid var(--hc-accent);outline-offset:2px; }
  @container (max-width:340px) { .card-header { padding:16px; } .daily-controls,.details-content { padding-inline:16px; } .card-title { font-size:19px; } }
  @media (prefers-reduced-motion:reduce) { * { transition:none!important; } }
`;
