<p align="center">
<picture>
<source media="(prefers-color-scheme: dark)" srcset="https://raw.githubusercontent.com/Asmir1975/hc-direct-cards/main/assets/logo-dark.png">
<img src="https://raw.githubusercontent.com/Asmir1975/hc-direct-cards/main/assets/logo.png" alt="HC Direct Cards" width="640">
</picture>
</p>
<p align="center">Home-Assistant-Karten für Home Connect Direct</p>
<p align="center"><a href="README.md">English</a> · <a href="README.de.md">Deutsch</a></p>
<p align="center">
<a href="https://github.com/Asmir1975/hc-direct-cards/releases/latest"><img src="https://img.shields.io/github/v/release/Asmir1975/hc-direct-cards?color=176b70&label=version" alt="Aktuelle Version"></a>
<a href="https://github.com/Asmir1975/hc-direct-cards/releases"><img src="https://img.shields.io/github/downloads/Asmir1975/hc-direct-cards/total?color=b9794a&label=Downloads" alt="Downloads"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/Lizenz-MIT-176b70" alt="MIT-Lizenz"></a>
<img src="https://img.shields.io/badge/Karten-5-b9794a" alt="5 Karten">
<img src="https://img.shields.io/badge/TypeScript-Lit-3178c6" alt="TypeScript und Lit">
</p>

HC Direct Cards gibt Home Assistant je eine Karte für Kochfeld, Dunstabzugshaube, Ofen,
Geschirrspüler und Kaffeemaschine. Entwickelt von
[Asmir1975](https://github.com/Asmir1975) für die Integration
[Home Connect Direct](https://github.com/Asmir1975/homeconnect_direct).

Die Karten sind eine optionale Ergänzung zur Integration. Sie zeigen, was die Integration
bereitstellt, und senden die Werte, die sie erwartet.

Gerät im visuellen Editor auswählen, die Karte ordnet die passenden Entitäten selbst zu.
Die Hauptansicht zeigt die tägliche Bedienung, weitere Werte und Einstellungen lassen
sich aufklappen.

Solltemperatur, Dauer und verzögerter Start werden mit den Tasten − und + eingestellt.
Zeiten gehen in Minuten, Temperaturen in 5er-Schritten.

Ofen und Geschirrspüler zeigen, wie lange ein Programm läuft, wie viel Zeit bleibt und
wann es endet. Meldungen des Geräts wie „Speise jetzt einschieben“ oder „Programm beendet“
erscheinen oben in der Karte, auch wenn Sie das Gerät direkt am Gerät bedienen. Der
Statuschip wird grün, wenn ein Programm fertig ist, und die aktuelle Phase steht neben
dem Programmnamen.

## Die fünf Karten

| Gerät | Kartentyp | Funktionen |
|---|---|---|
| Kochfeld | `custom:hc-direct-hob-card` | Vier Zonen, Restwärme, Zeitwerte; gemeldetes Join und powerMove |
| Dunstabzugshaube | `custom:hc-direct-hood-card` | Vorhandene Lüfterstufen, Licht und Dimmung, Filterwerte |
| Ofen | `custom:hc-direct-oven-card` | Programm, Solltemperatur, Dauer und vorhandene Zusatzfunktionen |
| Geschirrspüler | `custom:hc-direct-dishwasher-card` | Programm, Start/Abbruch, Restzeit und Meldungen |
| Kaffeemaschine | `custom:hc-direct-coffee-card` | Getränk, Menge, aromaSelect, Stärke und vorhandene Zusatzfunktionen |

Eine Funktion erscheint nur, wenn ihr eine passende Entität zugeordnet ist. Was ein Gerät
kann, bestimmt die Integration.

## Sprachen

Die Karten folgen der Home-Assistant-Sprache, Deutsch oder Englisch. Die Feldbezeichnungen
entsprechen in beiden Sprachen den Entity-Namen von Home Connect Direct 1.13.0 und passen
damit zur Entitätenliste in Home Assistant. Jede andere Sprache fällt auf Englisch zurück.
Auswahl- und Zustandsnamen stammen von Home Assistant selbst.

## Installation

Sie brauchen eine eingerichtete Integration Home Connect Direct 1.13.0 mit Ihren Geräten.
Der geprüfte Entity-Vertrag heißt `homeconnect_ws`.

### Manuell

1. `dist/home-connect-direct-cards.js` nach
   `/config/www/hc-direct-cards/home-connect-direct-cards.js` kopieren.
2. Unter Einstellungen → Dashboards → Ressourcen als JavaScript-Modul eintragen:

   ```text
   /local/hc-direct-cards/home-connect-direct-cards.js?v=1.2.0
   ```

3. Browser vollständig neu laden.
4. Eine Karte hinzufügen, zum Beispiel:

   ```yaml
   type: custom:hc-direct-coffee-card
   ```

5. Im visuellen Editor das Gerät auswählen.

Nur eine Version dieses Kartenpakets gleichzeitig laden. Vorhandene `hc-direct`-Kartentypen
bleiben gültig. Bei bestehenden Karten im Reiter Layout die empfohlene Größe verwenden
oder 12 Spalten wählen.

### HACS

`https://github.com/Asmir1975/hc-direct-cards` unter HACS → ⋮ → Benutzerdefinierte
Repositories mit dem Typ Dashboard hinzufügen, HC Direct Cards herunterladen und den
Browser neu laden. Das Repository enthält `hacs.json` und das gebaute JavaScript in `dist`.

### Wechseln oder entfernen

Den vorhandenen Ressourceneintrag ändern, statt einen zweiten anzulegen, und vollständig
neu laden. Zum Zurückgehen die vorherige JavaScript-Datei samt Ressourcen-URL verwenden.
Das Paket ändert weder die Integration noch deren Konfiguration.

## Automatische Geräteerkennung

Die Auswahl speichert die Geräte-ID. Die Zuordnung nutzt Entity-Registry, Integrations-
plattform und stabile Entity-Schlüssel. Umbenannte Entity-IDs werden bei einer erneuten
Registry-Auflösung berücksichtigt. Deaktivierte, ausgeblendete oder fehlende Entitäten
werden nicht automatisch verwendet, mehrdeutige Zuordnungen bleiben leer. Manuelle
Zuordnungen bleiben erhalten.

Eine Anker-Entität ist die alternative Angabe des Geräts. Wählen Sie eine Entität des Geräts,
und die Karte findet über deren Gerätezuordnung die übrigen Entitäten desselben Geräts.

## Kochfeld

Die physische Anordnung ist für das Siemens EX851LYV5E bestätigt:

```text
200    300
100    400
```

Join zeigt ein gemeinsames Rechteck pro Seite. powerMove zeigt zwei senkrechte Linien pro
Seite und liest hinten, Mitte und vorne aus den vorhandenen Einstellungen. Die Darstellung
folgt dem gemeldeten Join- und Modus-Zustand, nicht dem bloßen Klick. Zonenwerte sind nur
lesbar, ein Tipp darauf öffnet die Entity-Details.

Andere Kochfeldanordnungen sind nicht verifiziert. Die globalen Join- und Modus-Entitäten
erlauben keine belegte, unabhängige Darstellung von linkem und rechtem Modus. Die Karte
ergänzt weder eine Zonen-Leistungssteuerung noch einen Fernstart für das Kochfeld.

## Gut zu wissen

Startverzögerung: „Starten in“ geht in 15-Minuten-Schritten und steht beim Ofen und beim
Geschirrspüler in der Hauptansicht. Nicht jedes Ofenprogramm nimmt eine Verzögerung an.
Beim Siemens HB774G1B1 lehnen Programme wie Heißluft-Fritteuse sie ab, die Integration
antwortet dann „Dieses Programm unterstützt keine Startverzögerung.“ Starten Sie so ein
Programm trotzdem, ignoriert der Ofen die Verzögerung und startet sofort.

Smart Start: Es gibt zwei Schalter. Automatischer Smart Start ist die Einstellung, Smart
Start die Option für das gewählte Programm. Ist Automatischer Smart Start aus, sperrt das
Gerät Smart Start. Ist er an, schlägt das Gerät selbst eine Startverzögerung vor, auf Basis
von Energiedaten aus der Home-Connect-Cloud. Beim Siemens SX63HX52BE verschwand der Vorschlag,
als die Cloud-Verbindung ausgeschaltet war. Die Integration deaktiviert beide Schalter
standardmäßig.

## Kompatibilität und bekannte Grenzen

- Die Karten arbeiten mit Home Connect Direct 1.13.0 (`homeconnect_ws`). Was die Integration
  nicht bereitstellt, steht in den Karten nicht zur Verfügung.
- Manche Entitäten, etwa die Smart-Start-Schalter des Geschirrspülers, sind in der Integration
  standardmäßig deaktiviert. In Home Assistant aktivieren, dann zeigen die Karten sie an.
- Die Kochfeldanordnung ist nur für das Siemens EX851LYV5E bestätigt.

## Entwicklung

Sie brauchen Node.js 24. Führen Sie `npm ci`, `npm test` und `npm run build` aus. `npm run demo`
startet eine Offline-Demo unter `http://localhost:5173/dev/demo/` (mit `?lang=en` die
englischen Texte). Sie nutzt gespeicherte Beispiel-Entitäten und kontaktiert weder Home
Assistant noch ein Gerät. Siehe [Architektur](docs/ARCHITECTURE.md),
[Mitwirken](.github/CONTRIBUTING.md) und [Changelog](CHANGELOG.md).

## Autor, Dank und Lizenz

Entwickelt von [Asmir1975](https://github.com/Asmir1975) unter der [MIT-Lizenz](LICENSE),
dazu die [weiteren Lizenzhinweise](docs/legal/THIRD_PARTY_NOTICES.md).

Teile des Kartencodes gehen auf das
[Home Connect Card Pack](https://github.com/leMax6608/home-connect-card-pack) von leMax6608
(MIT) zurück. Danke für die Grundlage. Der Originalvermerk liegt in der
[Card-Pack-Lizenz](docs/legal/HC_CARD_PACK_MIT.txt).

Home Connect, Bosch, Siemens und Home Assistant sind Marken ihrer jeweiligen Inhaber, siehe
[Markenhinweis](docs/legal/TRADEMARKS.md).
