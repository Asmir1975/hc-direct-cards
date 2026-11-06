<p align="center"><img src="https://raw.githubusercontent.com/Asmir1975/hc-direct-cards/main/assets/logo.png" alt="HC Direct Cards" width="640"></p>
<p align="center">Home-Assistant-Karten für Home Connect Direct</p>
<p align="center"><a href="README.md">English</a> · <a href="README.de.md">Deutsch</a></p>
<p align="center">
<a href="https://github.com/Asmir1975/hc-direct-cards/releases/latest"><img src="https://img.shields.io/github/v/release/Asmir1975/hc-direct-cards?color=176b70&label=version" alt="Aktuelle Version"></a>
<a href="https://github.com/Asmir1975/hc-direct-cards/releases"><img src="https://img.shields.io/github/downloads/Asmir1975/hc-direct-cards/total?color=b9794a&label=Downloads" alt="Downloads"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/Lizenz-MIT-176b70" alt="MIT-Lizenz"></a>
<img src="https://img.shields.io/badge/Karten-6-b9794a" alt="6 Karten">
<img src="https://img.shields.io/badge/TypeScript-Lit-3178c6" alt="TypeScript und Lit">
</p>

HC Direct Cards gibt Home Assistant je eine Karte für Kochfeld, Dunstabzugshaube, Ofen,
Geschirrspüler, Kaffeemaschine und Trockner. Entwickelt von
[Asmir1975](https://github.com/Asmir1975) für die Integration
[Home Connect Direct](https://github.com/Asmir1975/homeconnect_direct).

Die Karten sind eine optionale Ergänzung zur Integration. Sie zeigen, was die Integration
bereitstellt, und senden die Werte, die sie erwartet.

Gerät im visuellen Editor auswählen, die Karte ordnet die passenden Entitäten selbst zu.
Der Kopf zeigt das Gerät mit Zustand, Programm und Phase. Tippen Sie auf die Karte, um
die Bedienung zu öffnen. Weitere Werte und Einstellungen stehen in Bereichen darunter.

Solltemperatur, Dauer und verzögerter Start werden mit den Tasten − und + eingestellt.
Zeiten gehen in Minuten, Temperaturen in 5er-Schritten.

Ofen und Geschirrspüler zeigen, wie lange ein Programm läuft, wie viel Zeit bleibt und
wann es endet. Meldungen des Geräts wie „Speise jetzt einschieben“ oder „Programm beendet“
erscheinen oben in der Karte, auch wenn Sie das Gerät direkt am Gerät bedienen. Der
Zustandstext im Kopf wird grün, wenn ein Programm fertig ist, orange, wenn das Gerät
eine Eingabe braucht, und rot bei einem Fehler. Die aktuelle Phase steht neben dem
Programmnamen.

## Die sechs Karten

| Gerät | Kartentyp | Funktionen |
|---|---|---|
| Kochfeld | `custom:hc-direct-hob-card` | Vier Zonen, Restwärme, Zeitwerte; gemeldetes Join und powerMove |
| Dunstabzugshaube | `custom:hc-direct-hood-card` | Vorhandene Lüfterstufen, Licht und Dimmung, Filterwerte |
| Ofen | `custom:hc-direct-oven-card` | Programm, Solltemperatur, Dauer und vorhandene Zusatzfunktionen |
| Geschirrspüler | `custom:hc-direct-dishwasher-card` | Programm, Start/Abbruch, Restzeit und Meldungen |
| Kaffeemaschine | `custom:hc-direct-coffee-card` | Getränk, Menge, aromaSelect, Stärke und vorhandene Zusatzfunktionen |
| Trockner | `custom:hc-direct-dryer-card` | Programm, Optionen, Licht und Wartung. Nur mit erfundenen Daten getestet |

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
   /local/hc-direct-cards/home-connect-direct-cards.js?v=1.0.2
   ```

3. Browser vollständig neu laden.
4. Eine Karte hinzufügen, zum Beispiel:

   ```yaml
   type: custom:hc-direct-coffee-card
   ```

5. Im visuellen Editor das Gerät auswählen.

Dieses Paket nur einmal laden. Es läuft neben dem originalen Home Connect Card Pack,
weil Kartentypen und Elementnamen sich unterscheiden.

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

Join zeigt ein gemeinsames Rechteck pro Seite. powerMove zeigt zwei parallele senkrechte Linien pro
Seite. Die Darstellung folgt dem, was das Kochfeld meldet, nicht dem bloßen Klick. Join
erscheint, wenn die Einstellung Join an ist oder der Diagnosesensor „Zonen verbunden“
verbundene Zonen meldet. Der Sensor braucht eine Integrationsversion nach 1.13.0 und reagiert
auch, wenn die Zonen am Kochfeld selbst verbunden werden. Eine Zone zeigt ihre Stufe nur,
solange ihr Betriebszustand läuft, sonst „Aus“, weil das Kochfeld die letzte Stufe nach dem
Ausschalten behalten kann. Die Restzeit steht nur über null. Zonenwerte sind nur lesbar, ein
Tipp darauf öffnet die Entity-Details.

Andere Kochfeldanordnungen sind nicht verifiziert. Die globalen Join- und Modus-Entitäten
erlauben keine belegte, unabhängige Darstellung von linkem und rechtem Modus. Die Karte
ergänzt weder eine Zonen-Leistungssteuerung noch einen Fernstart für das Kochfeld.

## Gut zu wissen

Startverzögerung: „Starten in“ geht in 15-Minuten-Schritten und steht beim Ofen und beim
Geschirrspüler im Bereich Programm. Nicht jedes Ofenprogramm nimmt eine Verzögerung an.
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
- Die Trocknerkarte ist nur mit erfundenen Daten getestet. Der Autor hat keinen Trockner.

## Autor, Dank und Lizenz

Entwickelt von [Asmir1975](https://github.com/Asmir1975) unter der [MIT-Lizenz](LICENSE),
dazu die [weiteren Lizenzhinweise](docs/legal/THIRD_PARTY_NOTICES.md) und der [Changelog](CHANGELOG.md).

Teile des Kartencodes gehen auf das
[Home Connect Card Pack](https://github.com/leMax6608/home-connect-card-pack) von leMax6608
(MIT) zurück. Danke für die Grundlage. Der Originalvermerk liegt in der
[Card-Pack-Lizenz](docs/legal/HC_CARD_PACK_MIT.txt).

Home Connect, Bosch, Siemens und Home Assistant sind Marken ihrer jeweiligen Inhaber, siehe
[Markenhinweis](docs/legal/TRADEMARKS.md).
