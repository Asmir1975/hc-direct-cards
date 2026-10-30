# Changelog

## Unreleased
- Oven and dishwasher: a time row shows running time, time left ("done in") and the finish time ("done at") while a program runs, the estimated duration and finish time before the start (including a set delayed start), and when a program finished. Times follow the Home Assistant 12/24 h setting. New optional entities: elapsed program time and estimated program time.

## 1.1.0 – 2026-10-30
- Number values (target temperature, duration, start in, alarm, coffee amount and others) use a box with − and + buttons instead of a slider. Time values move in minutes and are shown as minutes or hours, temperatures in steps of 5. Repeated taps are sent as one value.
- Hood: own power switch.
- Oven: cavity light switch. Dishwasher: Smart Start (per program), Auto Smart Start, extra drying, intensive zone and speed on demand. All appear only when the integration provides the entity.

## 1.0.0 – 2026-10-30
First release.
- Five cards for Home Connect Direct 1.13.0: hob, extractor hood, oven, dishwasher and coffee machine.
- Device selection in the visual editor with automatic entity assignment; anchor entity and manual assignment as alternatives.
- Hob: confirmed EX851LYV5E layout, reported Join and powerMove state, residual heat.
- German and English UI, other languages fall back to English. Labels follow the entity names of Home Connect Direct 1.13.0.
- Installable manually or as a custom HACS dashboard repository.
