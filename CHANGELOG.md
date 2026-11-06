# Changelog

## 1.0.2 – 2026-11-06
- New cards use the full width of a section (12 columns) with automatic height. Cards you have already resized keep their size.
- While a card is open, the header no longer repeats the progress, the remaining time and the progress bar that the "Active program" block shows. A closed card shows them as before. Measurements such as the oven temperature stay in the header.
- README: install steps for the Home Assistant Marketplace (2026.11 and newer) next to HACS (older versions).

## 1.0.1 – 2026-11-03
Hob card.
- The four zones sit in a grid like the real hob: 200 and 300 above 100 and 400. Zones of one row have the same height, also with Join and powerMove.
- A zone shows its power level only while its operation state is running. Otherwise it shows "Off". The hob can keep the last level and an active status after it went off.
- Remaining time shows only above zero. The state text in each zone is gone, and the Join and power mode selects share one row (stacked on narrow cards).
- Join and powerMove no longer print a label per side, and powerMove no longer lists the default values for rear, middle and front. They stay in the device settings.
- Join also shows when the diagnostic sensor "Join zone" is on. It comes with integration versions after 1.13.0 and also reacts when the zones are joined at the hob itself. The sensor reports one value for the whole hob, so both sides show as joined.

## 1.0.0 – 2026-11-03
First release of the new card design.
- Six cards for Home Connect Direct 1.13.0: hob, extractor hood, oven, dishwasher, coffee machine and dryer. The dryer card has only been tested with made-up data.
- The header shows the appliance, its state, program and phase. The state text turns green when a program has finished, orange when the appliance needs action and red on an error. Appliances without a program phase show only their operation state.
- Device selection in the visual editor with automatic entity assignment. An anchor entity works as an alternative.
- Number values use − and + buttons. Time values move in minutes, "Start in" in 15 minute steps, temperatures in steps of 5. Repeated taps are sent as one value.
- Oven and dishwasher show a time row: running time, time left, finish time, the estimated duration before the start and the finish time afterwards. With a delayed start it shows "starts in" and the finish time including the delay. With Smart Start on, a note says the times can change.
- Appliance messages appear under the header with a tone: blue for hints, green for finished, orange for problems.
- Hob: confirmed EX851LYV5E layout, reported Join and powerMove state, residual heat.
- Hood: own power switch, fan levels, dimmable lights, filter values.
- Oven: cavity light. Dishwasher: Smart Start, Auto Smart Start, extra drying, intensive zone and speed on demand, with a note when Smart Start is locked. They appear only when the integration provides the entity.
- German and English UI. Any other language falls back to English. Labels follow the entity names of Home Connect Direct 1.13.0.
- Runs next to the original Home Connect Card Pack: card types and element names differ.
- Installable manually or as a custom HACS dashboard repository.
