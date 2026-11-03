export type ApplianceKind = "dishwasher" | "oven" | "coffee" | "dryer" | "hob" | "hood";
export type ProgramNameMap = Record<string, string>;

export interface BaseApplianceCardConfig {
  type: string;
  entity?: string;
  device_id?: string;
  auto_detect?: boolean;
  name?: string;
  icon?: string;
  accent_color?: string;
  power_entity?: string;
  connection_entity?: string;
  status_entity?: string;
  operating_state_entity?: string;
  active_program_entity?: string;
  selected_program_entity?: string;
  progress_entity?: string;
  remaining_time_entity?: string;
  start_in_entity?: string;
  messages_entity?: string;
  acknowledge_event_entity?: string;
  program_names?: ProgramNameMap;
  start_entity?: string;
  pause_entity?: string;
  resume_entity?: string;
  cancel_entity?: string;
  default_expanded?: boolean;
  animations?: boolean;
  confirm_cancel?: boolean;
  show_progress?: boolean;
  show_remaining_time?: boolean;
  show_status_section?: boolean;
  show_options_section?: boolean;
  show_settings_section?: boolean;
  [key: string]: string | boolean | ProgramNameMap | undefined;
}

export interface DishwasherCardConfig extends BaseApplianceCardConfig {
  door_entity?: string;
  phase_entity?: string;
  water_entity?: string;
  energy_entity?: string;
  salt_entity?: string;
  rinse_aid_entity?: string;
  vario_speed_entity?: string;
  hygiene_entity?: string;
  half_load_entity?: string;
  silent_entity?: string;
  care_entity?: string;
  filter_check_entity?: string;
  filter_entity?: string;
  aquastop_entity?: string;
  heater_scale_entity?: string;
  extra_dry_entity?: string;
  intensive_zone_entity?: string;
  speed_on_demand_entity?: string;
  smart_start_entity?: string;
  auto_smart_start_entity?: string;
}

export interface OvenCardConfig extends BaseApplianceCardConfig {
  meatprobe_temperature_entity?: string;
  meatprobe_target_entity?: string;
  meatprobe_plugged_entity?: string;
  current_temperature_entity?: string;
  target_temperature_entity?: string;
  duration_entity?: string;
  level_entity?: string;
  door_entity?: string;
  water_tank_entity?: string;
  rapid_preheat_entity?: string;
  cavity_light_entity?: string;
  alarm_entity?: string;
  child_lock_entity?: string;
  display_brightness_entity?: string;
  key_tones_entity?: string;
  cooling_fan_entity?: string;
  tone_duration_entity?: string;
}

export interface CoffeeCardConfig extends BaseApplianceCardConfig {
  fill_quantity_select_entity?: string;
  aroma_entity?: string;
  shot_count_entity?: string;
  problem_entity?: string;
  grounds_container_entity?: string;
  bean_container_status_entity?: string;
  favorite_order_entity?: string;
  phase_entity?: string;
  bean_amount_entity?: string;
  fill_quantity_entity?: string;
  coffee_temperature_entity?: string;
  milk_ratio_entity?: string;
  bean_container_entity?: string;
  water_temperature_entity?: string;
  flow_rate_entity?: string;
  multiple_beverages_entity?: string;
  water_tank_entity?: string;
  beans_empty_entity?: string;
  drip_tray_entity?: string;
  door_entity?: string;
  cup_warmer_entity?: string;
  child_lock_entity?: string;
}

export interface DryerCardConfig extends BaseApplianceCardConfig {
  phase_entity?: string;
  finish_at_entity?: string;
  drying_target_entity?: string;
  duration_entity?: string;
  speed_perfect_entity?: string;
  hygiene_entity?: string;
  half_load_entity?: string;
  gentle_entity?: string;
  wrinkle_guard_entity?: string;
  silent_entity?: string;
  door_entity?: string;
  reload_entity?: string;
  condensate_entity?: string;
  lint_filter_entity?: string;
  care_entity?: string;
  load_recommendation_entity?: string;
  drum_light_entity?: string;
  door_light_entity?: string;
  signal_volume_entity?: string;
  brightness_entity?: string;
  auto_power_off_entity?: string;
}

export interface HobCardConfig extends BaseApplianceCardConfig {
  bridge_mode_entity?: string;
  join_zone_entity?: string;
  hob_mode_entity?: string;
  alarm_entity?: string;
  automatic_timer_entity?: string;
  child_lock_entity?: string;
}

export interface HoodCardConfig extends BaseApplianceCardConfig {
  fan_entity?: string;
  hood_level_entity?: string;
  working_light_entity?: string;
  ambient_light_entity?: string;
  grease_filter_entity?: string;
  carbon_filter_entity?: string;
  delayed_shutoff_entity?: string;
  interval_on_entity?: string;
  interval_off_entity?: string;
  fan_profile_entity?: string;
  fan_startup_entity?: string;
  fan_shutdown_entity?: string;
  automatic_sensitivity_entity?: string;
  reset_grease_entity?: string;
  reset_carbon_entity?: string;
}

export type ApplianceCardConfig =
  | DishwasherCardConfig
  | OvenCardConfig
  | CoffeeCardConfig
  | DryerCardConfig
  | HobCardConfig
  | HoodCardConfig;
