import "./editors/dishwasher-editor";
import "./editors/oven-editor";
import "./editors/coffee-editor";
import "./editors/hood-editor";
import "./editors/hob-editor";
import "./cards/dishwasher-card";
import "./cards/oven-card";
import "./cards/coffee-card";
import "./cards/hood-card";
import "./cards/hob-card";
import { coffeeDefinition, dishwasherDefinition, ovenDefinition, hoodDefinition, hobDefinition } from "./definitions";
import { VERSION } from "./version";
import { matchesApplianceEntity } from "./helpers/suggestion";

const definitions = [dishwasherDefinition, ovenDefinition, coffeeDefinition, hoodDefinition, hobDefinition];
window.customCards = window.customCards || [];
for (const definition of definitions) {
  if (!window.customCards.some((card) => card.type === definition.cardType.replace("custom:", ""))) {
    window.customCards.push({
      type: definition.cardType.replace("custom:", ""),
      name: definition.displayName,
      description: definition.description,
      preview: true,
      documentationURL: "https://github.com/Asmir1975/hc-direct-cards",
      getEntitySuggestion: (hass, entityId) => matchesApplianceEntity(hass, entityId, definition.kind)
        ? { config: { type: definition.cardType, entity: entityId } }
        : null,
    });
  }
}

console.info(`%c HOME-CONNECT-DIRECT-CARDS %c v${VERSION} `, "color:white;background:#445b78;font-weight:700", "color:#445b78;background:#eef2f7");
