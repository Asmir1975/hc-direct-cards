import type { ApplianceKind } from "../types/config";
import type { RegistryEntry } from "./registry";

// Keys from Home Connect Direct 1.13.0. Entity IDs and names may be changed in HA.
const common: Record<string, string[]> = {
  "connection_entity": ["connection"],
  "acknowledge_event_entity": ["button_acknowledge_event"],
  "power_entity": [
    "switch_power_state",
    "select_power_state"
  ],
  "status_entity": [
    "sensor_power_state"
  ],
  "operating_state_entity": [
    "sensor_operation_state"
  ],
  "selected_program_entity": [
    "select_program"
  ],
  "active_program_entity": [
    "sensor_active_program"
  ],
  "progress_entity": [
    "sensor_program_progress"
  ],
  "remaining_time_entity": [
    "sensor_remaining_program_time"
  ],
  "start_entity": [
    "button_start_program"
  ],
  "pause_entity": [
    "button_pause_program"
  ],
  "resume_entity": [
    "button_resume_program"
  ],
  "cancel_entity": [
    "button_abort_program"
  ],
  "door_entity": [
    "binary_sensor_door_state",
    "sensor_door_state"
  ],
  "child_lock_entity": [
    "switch_child_lock"
  ],
  "duration_entity": [
    "number_duration"
  ],
  "start_in_entity": [
    "number_start_in"
  ],
  "finish_at_entity": [
    "sensor_finish_in"
  ]
};
const specific: Record<ApplianceKind, Record<string, string[]>> = {
  "coffee": {
    "bean_amount_entity": [
      "select_bean_amount"
    ],
    "fill_quantity_entity": [
      "number_fill_quantity"
    ],
    "fill_quantity_select_entity": [
      "select_coffee_fill_quantity"
    ],
    "coffee_temperature_entity": [
      "select_coffee_temperature"
    ],
    "milk_ratio_entity": [
      "select_coffee_milk_ratio"
    ],
    "bean_container_entity": [
      "select_bean_container"
    ],
    "water_temperature_entity": [
      "select_hot_water_temperature"
    ],
    "flow_rate_entity": [
      "select_flow_rate"
    ],
    "multiple_beverages_entity": [
      "switch_multiple_beverages"
    ],
    "water_tank_entity": [
      "sensor_water_tank"
    ],
    "beans_empty_entity": [
      "binary_sensor_bean_container_empty"
    ],
    "drip_tray_entity": [
      "sensor_drip_tray"
    ],
    "cup_warmer_entity": [
      "switch_cup_warmer"
    ],
    "messages_entity": [
      "sensor_eq700_messages"
    ],
    "problem_entity": [
      "binary_sensor_eq700_problem"
    ],
    "grounds_container_entity": [
      "sensor_pomace_container"
    ],
    "bean_container_status_entity": [
      "sensor_bean_container"
    ],
    "shot_count_entity": [
      "sensor_shot_count"
    ],
    "aroma_entity": [
      "select_aroma_select"
    ],
    "favorite_order_entity": [
      "select_favorite_order"
    ],
    "phase_entity": [
      "sensor_coffeemaker_process_phase"
    ]
  },
  "oven": {
    "current_temperature_entity": [
      "sensor_oven_current_temperature",
      "sensor_oven_current_temperature_{cavity}"
    ],
    "target_temperature_entity": [
      "number_oven_setpoint_temperature"
    ],
    "level_entity": [
      "select_oven_level"
    ],
    "rapid_preheat_entity": [
      "switch_oven_fast_pre_heat"
    ],
    "elapsed_time_entity": [
      "sensor_elapsed_program_time"
    ],
    "estimated_time_entity": [
      "sensor_estimated_remaining_program_time"
    ],
    "cavity_light_entity": [
      "light_oven_cavity"
    ],
    "water_tank_entity": [
      "sensor_oven_water_tank",
      "sensor_oven_water_tank_{cavity}"
    ],
    "alarm_entity": [
      "number_setting_alarm_clock",
      "number_oven_setting_{cavity}_alarm_clock"
    ],
    "display_brightness_entity": [
      "number_oven_display_brightness"
    ],
    "key_tones_entity": [
      "switch_oven_button_tones"
    ],
    "cooling_fan_entity": [
      "select_oven_cooling_fan_runtime"
    ],
    "tone_duration_entity": [
      "select_oven_signal_duration"
    ],
    "messages_entity": [
      "sensor_oven_message_{cavity}"
    ],
    "meatprobe_temperature_entity": [
      "sensor_oven_cavity_meatprobe_temperature_{cavity}",
      "sensor_oven_current_meatprobe_temperature"
    ],
    "meatprobe_target_entity": [
      "sensor_oven_meatprobe_target_temperature_{cavity}"
    ],
    "meatprobe_plugged_entity": [
      "binary_sensor_oven_cavity_meatprobe_plugged_{cavity}"
    ]
  },
  "dishwasher": {
    "phase_entity": [
      "sensor_program_phase"
    ],
    "water_entity": [
      "sensor_water_forecast"
    ],
    "energy_entity": [
      "sensor_energy_forecast"
    ],
    "salt_entity": [
      "sensor_salt"
    ],
    "rinse_aid_entity": [
      "sensor_rinse_aid"
    ],
    "vario_speed_entity": [
      "switch_vario_speed_plus"
    ],
    "hygiene_entity": [
      "switch_hygiene_plus"
    ],
    "aquastop_entity": [
      "binary_sensor_aqua_stop"
    ],
    "smart_start_entity": [
      "switch_smart_start"
    ],
    "auto_smart_start_entity": [
      "switch_auto_smart_start"
    ],
    "elapsed_time_entity": [
      "sensor_elapsed_program_time"
    ],
    "estimated_time_entity": [
      "sensor_estimated_remaining_program_time"
    ],
    "extra_dry_entity": [
      "switch_extra_dry"
    ],
    "intensive_zone_entity": [
      "switch_intensiv_zone"
    ],
    "speed_on_demand_entity": [
      "switch_speed_on_demand"
    ],
    "half_load_entity": [
      "switch_half_load"
    ],
    "silent_entity": [
      "switch_silence_on_demand"
    ],
    "care_entity": [
      "sensor_machine_care_reminder"
    ],
    "messages_entity": [
      "sensor_dishwasher_message"
    ]
  },
  "hood": {
    "fan_entity": [
      "fan_hood"
    ],
    "hood_level_entity": [
      "select_hood_venting_level"
    ],
    "working_light_entity": [
      "light_cooking_lighting"
    ],
    "ambient_light_entity": [
      "light_cooking_ambient_lighting"
    ],
    "messages_entity": [
      "sensor_hood_filter_message"
    ],
    "grease_filter_entity": [
      "sensor_grease_filter_saturation"
    ],
    "carbon_filter_entity": [
      "sensor_carbon_filter_saturation"
    ],
    "delayed_shutoff_entity": [
      "number_hood_delayed_shutoff_time"
    ],
    "interval_on_entity": [
      "number_hood_interval_on"
    ],
    "interval_off_entity": [
      "number_hood_interval_off"
    ],
    "fan_profile_entity": [
      "select_hood_ventilation_profile"
    ],
    "fan_startup_entity": [
      "select_hood_ventilation_startup"
    ],
    "fan_shutdown_entity": [
      "select_hood_ventilation_shutdown"
    ],
    "automatic_sensitivity_entity": [
      "number_hood_automatic_sensitivity"
    ],
    "reset_grease_entity": [
      "button_hood_grease_filter_reset"
    ],
    "reset_carbon_entity": [
      "button_hood_carbon_filter_reset"
    ]
  },
  "hob": {
    "alarm_entity": [
      "number_setting_alarm_clock"
    ],
    "automatic_timer_entity": [
      "number_hob_automatic_timer"
    ],
    "child_lock_entity": [
      "select_hob_automatic_key_lock"
    ],
    "zone_100_state_entity": [
      "sensor_hob_zone_100_state"
    ],
    "zone_100_operation_entity": [
      "sensor_hob_zone_100_operationstate"
    ],
    "zone_100_power_entity": [
      "sensor_hob_zone_100_power_level"
    ],
    "zone_100_remaining_entity": [
      "sensor_hob_zone_100_remaining_program_time"
    ],
    "zone_100_frying_entity": [
      "sensor_hob_zone_100_frying_sensor_level"
    ],
    "zone_100_progress_entity": [
      "sensor_hob_zone_100_program_progress"
    ],
    "zone_200_state_entity": [
      "sensor_hob_zone_200_state"
    ],
    "zone_200_operation_entity": [
      "sensor_hob_zone_200_operationstate"
    ],
    "zone_200_power_entity": [
      "sensor_hob_zone_200_power_level"
    ],
    "zone_200_remaining_entity": [
      "sensor_hob_zone_200_remaining_program_time"
    ],
    "zone_200_frying_entity": [
      "sensor_hob_zone_200_frying_sensor_level"
    ],
    "zone_200_progress_entity": [
      "sensor_hob_zone_200_program_progress"
    ],
    "zone_300_state_entity": [
      "sensor_hob_zone_300_state"
    ],
    "zone_300_operation_entity": [
      "sensor_hob_zone_300_operationstate"
    ],
    "zone_300_power_entity": [
      "sensor_hob_zone_300_power_level"
    ],
    "zone_300_remaining_entity": [
      "sensor_hob_zone_300_remaining_program_time"
    ],
    "zone_300_frying_entity": [
      "sensor_hob_zone_300_frying_sensor_level"
    ],
    "zone_300_progress_entity": [
      "sensor_hob_zone_300_program_progress"
    ],
    "zone_400_state_entity": [
      "sensor_hob_zone_400_state"
    ],
    "zone_400_operation_entity": [
      "sensor_hob_zone_400_operationstate"
    ],
    "zone_400_power_entity": [
      "sensor_hob_zone_400_power_level"
    ],
    "zone_400_remaining_entity": [
      "sensor_hob_zone_400_remaining_program_time"
    ],
    "zone_400_frying_entity": [
      "sensor_hob_zone_400_frying_sensor_level"
    ],
    "zone_400_progress_entity": [
      "sensor_hob_zone_400_program_progress"
    ],
    "bridge_mode_entity": [
      "select_hob_bridge_zone_mode"
    ],
    "hob_mode_entity": [
      "select_program"
    ],
    "power_move_front_left_entity": [
      "select_hob_power_move_front_left"
    ],
    "power_move_middle_left_entity": [
      "select_hob_power_move_middle_left"
    ],
    "power_move_rear_left_entity": [
      "select_hob_power_move_rear_left"
    ],
    "power_move_front_right_entity": [
      "select_hob_power_move_front_right"
    ],
    "power_move_middle_right_entity": [
      "select_hob_power_move_middle_right"
    ],
    "power_move_rear_right_entity": [
      "select_hob_power_move_rear_right"
    ]
  },
  "dryer": {
    "phase_entity": [
      "sensor_dryer_process_phase",
      "sensor_laundry_process_phase"
    ],
    "speed_perfect_entity": [
      "switch_laundry_speed_perfect"
    ],
    "hygiene_entity": [
      "switch_laundry_hygiene"
    ],
    "half_load_entity": [
      "switch_half_load"
    ],
    "gentle_entity": [
      "switch_laundry_gentle"
    ],
    "wrinkle_guard_entity": [
      "switch_laundry_wrinkle_guard"
    ],
    "silent_entity": [
      "switch_laundry_silent_mode"
    ],
    "reload_entity": [
      "sensor_laundry_reload"
    ],
    "condensate_entity": [
      "binary_sensor_condensate_container_full"
    ],
    "lint_filter_entity": [
      "binary_sensor_lint_filter_full"
    ],
    "care_entity": [
      "binary_sensor_maintenance_reminder"
    ],
    "load_recommendation_entity": [
      "sensor_laundry_load_recommendation"
    ],
    "drum_light_entity": [
      "light_drum_light",
      "switch_drum_light"
    ],
    "door_light_entity": [
      "light_door_ring",
      "switch_door_light_ring"
    ],
    "brightness_entity": [
      "number_laundry_brightness"
    ]
  }
};

export function directDiscoveryScore(entry: RegistryEntry, kind: ApplianceKind, fieldKey: string): number | undefined {
  if (entry.platform !== "homeconnect_ws") return undefined;
  const keys = specific[kind][fieldKey] || common[fieldKey] || [];
  const key = entry.unique_id?.split("-").pop();
  const index = keys.findIndex((pattern) =>
    pattern === entry.translation_key || (key && new RegExp("^" + pattern.replace("{cavity}", "\\d+") + "$").test(key)));
  // Removed event sensors and similarly named settings must not acquire another role.
  return index < 0 ? -1000 : 1000 - index;
}
