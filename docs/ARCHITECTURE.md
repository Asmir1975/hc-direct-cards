# Architecture

Five Lit cards share entity assignment, service calls and the detail view.
Public card types are named `hc-direct-*-card`, internal elements `hcd-*`.
`src/index.ts` registers exactly coffee, dishwasher, hob, hood and oven.

## Entity assignment
`helpers/registry.ts` collects candidate entities of the same device. For
`homeconnect_ws`, `helpers/homeconnect-direct.ts` uses stable registry keys or the
`translation_key`, never the display name as a substitute. Manual assignments are
kept. Device-only configurations are resolved again when the registry changes.
Anchor entities are a compatible alternative to selecting the device.

## Presentation
`BaseApplianceCard` renders header, connection, warnings, main controls and
details. Detail fields are stacked; labels may wrap and selects may shrink.
The recommended card size is 12 columns with automatic height. `HoodCard` adds
level selection and light. `HobCard` shows the zones in the confirmed EX851LYV5E
layout, the reported Join/powerMove state and residual heat.

## Writes
Controls call regular Home Assistant services on existing entities and send the
original value. The card only withholds a command where the integration itself
says it cannot work: entities that are unavailable or restored, and entities with
the integration's `readonly` attribute. It does not lock controls because a
program is running or the appliance is disconnected; the connection state is
only displayed. Cancelling a program asks for a second tap by default
(`confirm_cancel: false` turns that off).

## Localization
`helpers/localize.ts` holds the German texts; English is the source text and the
fallback for every other language. Field labels follow the entity names of Home
Connect Direct 1.13.0.

## Layout of the repository
- `src/definitions`: roles of the five card types.
- `src/cards`, `src/editors`, `src/components`: Lit components.
- `src/helpers`: assignment, services, formatting, localization.
- `dist`: built JavaScript for manual installation and HACS.
- `assets`: logo files.
- `dev`: unit tests with reduced offline fixtures, an offline demo page and helper scripts.
