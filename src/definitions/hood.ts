import { commonFields } from "./common";
import type { ApplianceDefinition, FieldDefinition } from "../types/schema";
export const hoodDefinition: ApplianceDefinition = {
  kind: "hood", cardType: "custom:hc-direct-hood-card", editorTag: "hc-direct-hood-card-editor",
  displayName: "HC Direct · Hood", description: "Fan levels, light and filter status.",
  defaultName: "Hood", defaultIcon: "mdi:extractor-hood", accent: "#187d79",
  fields: [...commonFields.filter(f => !["start_entity","pause_entity","resume_entity","cancel_entity","progress_entity","remaining_time_entity","start_in_entity"].includes(f.key)),
  ...([
  {
    "key": "fan_entity",
    "label": "Fan",
    "section": "program",
    "kind": "fan",
    "domains": [
      "fan"
    ],
    "aliases": [
      "hood fan",
      "lufter"
    ]
  },
  {
    "key": "hood_level_entity",
    "label": "Hood level",
    "section": "program",
    "kind": "select",
    "domains": [
      "select"
    ],
    "aliases": [
      "haubenstufe"
    ]
  },
  {
    "key": "working_light_entity",
    "label": "Working light",
    "section": "options",
    "kind": "light",
    "domains": [
      "light"
    ],
    "aliases": [
      "working light",
      "arbeitslicht"
    ]
  },
  {
    "key": "ambient_light_entity",
    "label": "Ambient light",
    "section": "options",
    "kind": "light",
    "domains": [
      "light"
    ],
    "aliases": [
      "ambient light"
    ]
  },
  {
    "key": "grease_filter_entity",
    "label": "Grease filter saturation",
    "section": "status",
    "kind": "status",
    "domains": [
      "sensor"
    ],
    "aliases": [
      "grease filter saturation"
    ]
  },
  {
    "key": "carbon_filter_entity",
    "label": "Carbon filter saturation",
    "section": "status",
    "kind": "status",
    "domains": [
      "sensor"
    ],
    "aliases": [
      "carbon filter saturation"
    ]
  },
  {
    "key": "delayed_shutoff_entity",
    "label": "Fan run-on time",
    "section": "program",
    "kind": "number",
    "domains": [
      "number"
    ],
    "aliases": [
      "delayed shutoff time"
    ]
  },
  {
    "key": "interval_on_entity",
    "label": "Interval on",
    "section": "settings",
    "kind": "number",
    "domains": [
      "number"
    ],
    "aliases": [
      "interval on"
    ]
  },
  {
    "key": "interval_off_entity",
    "label": "Interval off",
    "section": "settings",
    "kind": "number",
    "domains": [
      "number"
    ],
    "aliases": [
      "interval off"
    ]
  },
  {
    "key": "fan_profile_entity",
    "label": "Fan profile",
    "section": "settings",
    "kind": "select",
    "domains": [
      "select"
    ],
    "aliases": [
      "ventilation profile"
    ]
  },
  {
    "key": "fan_startup_entity",
    "label": "Fan at power on",
    "section": "settings",
    "kind": "select",
    "domains": [
      "select"
    ],
    "aliases": [
      "ventilation startup"
    ]
  },
  {
    "key": "fan_shutdown_entity",
    "label": "Fan at power off",
    "section": "settings",
    "kind": "select",
    "domains": [
      "select"
    ],
    "aliases": [
      "ventilation shutdown"
    ]
  },
  {
    "key": "automatic_sensitivity_entity",
    "label": "Automatic mode sensitivity",
    "section": "settings",
    "kind": "number",
    "domains": [
      "number"
    ],
    "aliases": [
      "automatic sensitivity"
    ]
  },
  {
    "key": "reset_grease_entity",
    "label": "Reset grease filter status",
    "section": "settings",
    "kind": "button",
    "domains": [
      "button"
    ],
    "aliases": [
      "grease filter reset"
    ]
  },
  {
    "key": "reset_carbon_entity",
    "label": "Reset carbon filter",
    "section": "settings",
    "kind": "button",
    "domains": [
      "button"
    ],
    "aliases": [
      "carbon filter reset"
    ]
  }
] satisfies FieldDefinition[])],
};
