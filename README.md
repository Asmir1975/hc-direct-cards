<p align="center"><img src="https://raw.githubusercontent.com/Asmir1975/hc-direct-cards/main/assets/logo.png" alt="HC Direct Cards" width="640"></p>
<p align="center">Home Assistant cards for Home Connect Direct</p>
<p align="center"><a href="README.md">English</a> · <a href="README.de.md">Deutsch</a></p>
<p align="center">
<a href="https://github.com/Asmir1975/hc-direct-cards/releases/latest"><img src="https://img.shields.io/github/v/release/Asmir1975/hc-direct-cards?color=176b70&label=version" alt="Latest release"></a>
<a href="https://github.com/Asmir1975/hc-direct-cards/releases"><img src="https://img.shields.io/github/downloads/Asmir1975/hc-direct-cards/total?color=b9794a&label=downloads" alt="Downloads"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-176b70" alt="MIT license"></a>
<img src="https://img.shields.io/badge/cards-5-b9794a" alt="5 cards">
<img src="https://img.shields.io/badge/TypeScript-Lit-3178c6" alt="TypeScript and Lit">
</p>

HC Direct Cards gives Home Assistant one card each for a hob, extractor hood, oven,
dishwasher and coffee machine. It is made by
[Asmir1975](https://github.com/Asmir1975) for the
[Home Connect Direct](https://github.com/Asmir1975/homeconnect_direct) integration.

The cards are an optional companion to the integration. They show what it provides
and send the values it expects.

Pick the appliance in the visual editor and the card assigns the matching entities
for you. The main view holds the everyday controls, and further values and settings
fold out below.

Target temperature, duration and delayed start are set with − and + buttons. Time
values move in minutes, temperatures in steps of 5.

Oven and dishwasher show how long a program has run, how much time is left and when it
ends. Appliance messages such as "insert food now" or "program finished" appear at the
top of the card, also when you use the appliance at the device. The status chip turns
green when a program has finished, and the current phase shows next to the program name.

## The five cards

| Appliance | Card type | What it shows |
|---|---|---|
| Hob | `custom:hc-direct-hob-card` | Four zones, residual heat, timers; reported Join and powerMove state |
| Extractor hood | `custom:hc-direct-hood-card` | Available fan levels, light and dimming, filter values |
| Oven | `custom:hc-direct-oven-card` | Program, target temperature, duration and available extras |
| Dishwasher | `custom:hc-direct-dishwasher-card` | Program, start/cancel, remaining time and messages |
| Coffee machine | `custom:hc-direct-coffee-card` | Beverage, amount, aromaSelect, strength and available extras |

A function appears only when a matching entity is assigned. What an appliance can do
is up to the integration.

## Languages

The cards follow the Home Assistant language, English or German. Field labels use the
entity names of Home Connect Direct 1.13.0 in both languages, so they match the entity
list in Home Assistant. Any other language falls back to English. Option and state
names come from Home Assistant itself.

## Installation

You need a working Home Connect Direct 1.13.0 integration with your appliances set up.
The verified entity contract is `homeconnect_ws`.

### Manual

1. Copy `dist/home-connect-direct-cards.js` to
   `/config/www/hc-direct-cards/home-connect-direct-cards.js`.
2. Under Settings → Dashboards → Resources add it as a JavaScript module:

   ```text
   /local/hc-direct-cards/home-connect-direct-cards.js?v=1.2.0
   ```

3. Fully reload the browser.
4. Add a card, for example:

   ```yaml
   type: custom:hc-direct-coffee-card
   ```

5. Select the appliance in the visual editor.

Load only one version of this card package at a time. Existing `hc-direct` card types
stay valid. For existing cards, use the recommended size on the Layout tab or choose
12 columns.

### HACS

Add `https://github.com/Asmir1975/hc-direct-cards` under HACS → ⋮ → Custom repositories
with type Dashboard, then download HC Direct Cards and reload the browser. The repository
contains `hacs.json` and the built JavaScript in `dist`.

### Switching or removing

Change the existing resource entry instead of adding a second one, then reload
completely. To go back, use the previous JavaScript file and its resource URL. The
package does not touch the integration or its configuration.

## Automatic device detection

The selection stores the device ID. Assignment uses the entity registry, the integration
platform and stable entity keys. Renamed entity IDs are picked up when the registry is
resolved again. Disabled, hidden or missing entities are not used automatically, and
ambiguous matches stay empty. Manual assignments are kept.

An anchor entity is the alternative way to identify the device. Pick one entity of the
appliance and the card finds the other entities of the same device through its device
assignment.

## Hob

The physical layout is confirmed for the Siemens EX851LYV5E:

```text
200    300
100    400
```

Join shows one joint rectangle per side. powerMove shows two vertical lines per side and
reads rear, middle and front from the existing settings. The display follows the
reported Join and mode state, not just the click. Zone values are read-only, and tapping
one opens the entity details.

Other hob layouts are not verified. The global Join and mode entities give no reliable
way to show left and right modes independently. The card adds no zone power control and
no remote start for the hob.

## Good to know

Start delay: "Start in" moves in 15 minute steps and sits in the main view of the oven
and the dishwasher. Not every oven program accepts a delay. On a Siemens HB774G1B1,
programs such as air fry reject it and the integration answers "This program does not
support a delayed start." If you start such a program anyway, the oven ignores the delay
and starts at once.

Smart Start: there are two switches. Auto Smart Start is the setting, Smart Start is the
option for the selected program. While Auto Smart Start is off, the appliance locks Smart
Start. With Auto Smart Start on, the appliance suggests a start delay itself, based on
energy data from the Home Connect cloud. On a Siemens SX63HX52BE the suggestion
disappeared when the cloud connection was switched off. The integration disables both
switches by default.

## Compatibility and known limits

- The cards work with Home Connect Direct 1.13.0 (`homeconnect_ws`). Whatever the
  integration does not expose is not available in the cards.
- Some entities, for example the dishwasher's Smart Start switches, are disabled by
  default in the integration. Enable them in Home Assistant and the cards show them.
- The hob layout is confirmed for the Siemens EX851LYV5E only.

## Credits and license

Made by [Asmir1975](https://github.com/Asmir1975) under the [MIT license](LICENSE). See
also the [third-party notices](docs/legal/THIRD_PARTY_NOTICES.md) and the [changelog](CHANGELOG.md).

Parts of the card code derive from the
[Home Connect Card Pack](https://github.com/leMax6608/home-connect-card-pack) by
leMax6608 (MIT). Thank you for the foundation. The original notice is kept in the
[Card Pack license](docs/legal/HC_CARD_PACK_MIT.txt).

Home Connect, Bosch, Siemens and Home Assistant are trademarks of their respective
owners, see [trademarks](docs/legal/TRADEMARKS.md).
