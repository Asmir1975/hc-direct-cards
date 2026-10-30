# Branding

Author and maintainer: Asmir1975. Repository: hc-direct-cards.

The logo connects five tiles: hob, hood, oven, dishwasher and coffee machine.
Petrol carries the base shape, copper sets the accent. The tiles use muted
appliance colors: terracotta (hob), turquoise (hood), amber (oven), blue
(dishwasher) and copper (coffee machine). No manufacturer logos are used.

| Color | Value |
|---|---|
| Dark petrol | #123b40 |
| Petrol | #2e7478 |
| Copper | #ba8056 |
| White | #ffffff |

- `assets/logo-icon-master.png`: icon master (transparent, 850 px). Created with an image generator, cut out and selected by the maintainer; it contains no manufacturer or Home Assistant logos.
- `assets/logo-icon.png`: square icon (512 px).
- `assets/logo.png` and `assets/logo-dark.png`: wordmark for light and dark backgrounds; the README uses both through a `picture` element.
- There is no SVG because the icon is a raster image.

`dev/scripts/generate_logo.py` (Pillow) composes the three PNG files from the master.
Set `HC_LOGO_FONT` to a DejaVu Sans Bold file if the default Linux path does not exist.
The logo files are part of the MIT-licensed project.
