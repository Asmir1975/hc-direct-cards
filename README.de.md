<p align="center">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Asmir1975/hc-direct-cards/main/assets/logo-dark.png">
<img src="https://raw.githubusercontent.com/Asmir1975/hc-direct-cards/main/assets/logo.png" alt="HC Direct Cards" width="640">
</picture>
</p>
<p align="center"><strong>Fünf Küchengeräte. Eine klare Bedienung.</strong></p>
<p align="center"><a href="README.md">English</a> · <a href="README.de.md">Deutsch</a></p>
<p align="center">
<a href="LICENSE"><img src="https://img.shields.io/badge/Lizenz-MIT-176b70" alt="MIT-Lizenz"></a>
<a href="https://github.com/Asmir1975/homeconnect_direct"><img src="https://img.shields.io/badge/Home_Connect_Direct-1.13.0-176b70" alt="Für Home Connect Direct 1.13.0"></a>
<img src="https://img.shields.io/badge/Karten-5-b9794a" alt="5 Karten">
<img src="https://img.shields.io/badge/TypeScript-Lit-3178c6" alt="TypeScript und Lit">
</p>

**HC Direct Cards** bringt Kochfeld, Dunstabzugshaube, Ofen, Geschirrspüler und
Kaffeemaschine als eigene Karten in Home Assistant. Entwickelt von
[Asmir1975](https://github.com/Asmir1975) für
[Home Connect Direct](https://github.com/Asmir1975/homeconnect_direct).

Die Karten sind eine optionale Ergänzung zur Integration: Sie zeigen, was die
Integration bereitstellt, und senden deren eigene Werte, nicht mehr.

Gerät im visuellen Editor auswählen; die Karte ordnet vorhandene Entitäten
automatisch zu. Die Hauptansicht zeigt die tägliche Bedienung. Weitere Werte
und Einstellungen lassen sich aufklappen.

## Die fünf Karten

| Gerät | Kartentyp | Funktionen |
|---|---|---|
| Kochfeld | `custom:hc-direct-hob-card` | Vier Zonen, Restwärme, Zeitwerte; gemeldetes Join und powerMove |
| Dunstabzugshaube | `custom:hc-direct-hood-card` | Vorhandene Lüfterstufen, Licht und Dimmung, Filterwerte |
| Ofen | `custom:hc-direct-oven-card` | Programm, Solltemperatur, Dauer und vorhandene Zusatzfunktionen |
| Geschirrspüler | `custom:hc-direct-dishwasher-card` | Programm, Start/Abbruch, Restzeit und Meldungen |
| Kaffeemaschine | `custom:hc-direct-coffee-card` | Getränk, Menge, aromaSelect, Stärke und vorhandene Zusatzfunktionen |

Es werden nur Funktionen angezeigt, denen eine passende Entität zugeordnet ist.
Die Karte erweitert nicht die Fähigkeiten der Integration.

## Sprachen

Die Karten folgen der Home-Assistant-Sprache: **Deutsch** und **Englisch**.
Die Feldbezeichnungen entsprechen in beiden Sprachen den Entity-Namen von
Home Connect Direct 1.13.0 und passen damit zur Entitätenliste in Home Assistant.
Jede andere Sprache fällt auf Englisch zurück. Auswahl- und Zustandsnamen stammen
von Home Assistant selbst.

## Installation

Voraussetzung ist eine eingerichtete **Home Connect Direct 1.13.0** Integration
mit verfügbaren Geräten. Der geprüfte Entity-Vertrag heißt `homeconnect_ws`.
Die offizielle Home-Connect-Cloud-Integration hat eine andere Entity-Struktur.

### Manuell

1. `dist/home-connect-direct-cards.js` nach
   `/config/www/hc-direct-cards/home-connect-direct-cards.js` kopieren.
2. Unter **Einstellungen → Dashboards → Ressourcen** als **JavaScript-Modul** eintragen:

   ```text
   /local/hc-direct-cards/home-connect-direct-cards.js?v=1.0.0
   ```

3. Browser vollständig neu laden.
4. Eine Karte hinzufügen, zum Beispiel:

   ```yaml
   type: custom:hc-direct-coffee-card
   ```

5. Im visuellen Editor das Gerät auswählen.

Nur eine Version dieses Kartenpakets gleichzeitig laden. Vorhandene
`hc-direct`-Kartentypen bleiben gültig. Bei bestehenden Karten im Reiter
**Layout** die empfohlene Größe verwenden oder 12 Spalten wählen.

### HACS

`https://github.com/Asmir1975/hc-direct-cards` unter **HACS → ⋮ → Benutzerdefinierte
Repositories** mit Typ **Dashboard** hinzufügen, **HC Direct Cards** herunterladen und
den Browser neu laden. Das Repository enthält `hacs.json` und das gebaute JavaScript
in `dist`.

### Wechseln oder entfernen

Den vorhandenen Ressourceneintrag ändern statt einen zweiten anzulegen und vollständig
neu laden. Zum Zurückgehen die vorherige JavaScript-Datei samt Ressourcen-URL verwenden.
Die Integration und ihre Konfiguration werden durch dieses Paket nicht geändert.

## Automatische Geräteerkennung

Die Auswahl speichert die Geräte-ID. Die Zuordnung verwendet Entity-Registry,
Integrationsplattform und stabile Entity-Schlüssel. Umbenannte Entity-IDs können
bei einer erneuten Registry-Auflösung berücksichtigt werden.
Deaktivierte, ausgeblendete oder fehlende Entitäten werden nicht automatisch
verwendet. Mehrdeutige Zuordnungen bleiben leer. Manuelle Zuordnungen bleiben erhalten.

Eine **Anker-Entität** ist die alternative Angabe einer Entität des Geräts.
Über deren Gerätezuordnung findet die Karte weitere Entitäten desselben Geräts.

## Kochfeld

Die physische Anordnung ist für das **Siemens EX851LYV5E** bestätigt:

```text
200    300
100    400
```

Join zeigt ein gemeinsames Rechteck pro Seite. powerMove zeigt zwei senkrechte
Linien pro Seite und liest hinten/Mitte/vorne aus den vorhandenen Einstellungen.
Die Darstellung folgt gemeldeten Join-/Modus-Zuständen, nicht dem bloßen Klick.
Zonenwerte bleiben lesend; Tippen öffnet die Entity-Details.

Andere Kochfeldanordnungen sind nicht verifiziert. Die globalen Join-/Modus-
Entitäten erlauben keine belegte unabhängige linke/rechte Modusdarstellung.
Keine ergänzte Zonen-Leistungssteuerung und keine Kochfeld-Fernstartfunktion.

## Kompatibilität und bekannte Grenzen

- Funktioniert mit Home Connect Direct 1.13.0 (`homeconnect_ws`). Was die Integration
  nicht bereitstellt, steht in den Karten nicht zur Verfügung.
- Manche Entitäten, etwa die Smart-Start-Schalter des Geschirrspülers, sind in der Integration standardmäßig deaktiviert. In Home Assistant aktivieren, dann zeigen die Karten sie an.
- Die Kochfeldanordnung ist nur für das Siemens EX851LYV5E bestätigt.

## Entwicklung

Node.js 24 erforderlich. `npm ci`, `npm test`, `npm run build`; eine Offline-Demo läuft mit
`npm run demo` unter `http://localhost:5173/dev/demo/` (mit `?lang=en` die englischen
Texte). Sie nutzt gespeicherte Beispiel-Entitäten und kontaktiert weder Home Assistant
noch Geräte. Siehe [Architektur](docs/ARCHITECTURE.md),
[Mitwirken](.github/CONTRIBUTING.md) und [Changelog](CHANGELOG.md).

## Autor, Dank und Lizenz

**Asmir1975** · [MIT-Lizenz](LICENSE) · [Weitere Lizenzhinweise](docs/legal/THIRD_PARTY_NOTICES.md)

Teile des Kartencodes gehen auf das
[Home Connect Card Pack](https://github.com/leMax6608/home-connect-card-pack)
von leMax6608 (MIT) zurück. Danke für die Grundlage. Der Originalvermerk liegt in
[docs/legal/HC_CARD_PACK_MIT.txt](docs/legal/HC_CARD_PACK_MIT.txt). Home Connect,
Bosch, Siemens und Home Assistant sind Marken ihrer jeweiligen Inhaber, siehe
[docs/legal/TRADEMARKS.md](docs/legal/TRADEMARKS.md).
