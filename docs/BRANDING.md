# HC Direct Cards
Autor und Maintainer: Asmir1975. Repository-Name: hc-direct-cards.

Das eigene Logo verbindet fünf Kacheln: Kochfeld, Haube, Ofen, Geschirrspüler
und CoffeeMaker. Petrol trägt die Grundform, Kupfer setzt den Akzent. Die fünf Kacheln tragen gedämpfte Gerätefarben: Kochfeld Terrakotta, Haube Türkis, Ofen Bernstein, Geschirrspüler Blau, Kaffeemaschine Kupfer.
Keine übernommenen Herstellerlogos.

| Farbe | Wert |
|---|---|
| Dunkles Petrol | #123b40 |
| Petrol | #2e7478 |
| Kupfer | #ba8056 |
| Weiß | #ffffff |

assets/logo-icon-master.png: Symbol-Vorlage (transparent, 850 px). Das Symbol wurde per Bildgenerator
erstellt, freigestellt und vom Maintainer ausgewählt; es enthält keine Hersteller- oder Home-Assistant-Logos.
assets/logo-icon.png: quadratisches Symbol (512 px).
assets/logo.png: Wort-/Bildmarke mit transparentem Hintergrund für helle Seiten. logo-dark.png ist die
Variante für dunkle Hintergründe; die README nutzt beide per picture-Element.
Es gibt kein SVG, da das Symbol ein Rasterbild ist.
Regenerierbar mit scripts/generate_logo.py und Pillow: setzt den Schriftzug neben das Symbol und
erzeugt logo.png, logo-dark.png und logo-icon.png. Die Schriftdatei kann über HC_LOGO_FONT angegeben
werden; Standard ist DejaVu Sans Bold unter Linux.
Die Logo-Dateien gehören zum MIT-lizenzierten Projekt.
