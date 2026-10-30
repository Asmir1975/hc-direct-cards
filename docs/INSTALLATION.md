# Installation und Wechsel

## Manuell
dist/home-connect-direct-cards.js nach
/config/www/hc-direct-cards/home-connect-direct-cards.js kopieren.
Als JavaScript-Modul registrieren:

~~~text
/local/hc-direct-cards/home-connect-direct-cards.js?v=0.3.0-dev.1
~~~

Bestehenden Ressourceneintrag ändern, keine zweite Paketversion gleichzeitig laden.
Vollständig neu laden. Bei manuellen Größen 12 Spalten oder die empfohlene Größe
verwenden. Die Karte überschreibt keine manuell gespeicherte Breite.

## Gerätewahl
Einen der fünf Typen aus examples.yaml hinzufügen und Gerät im Editor wählen.
Felder können unter Manuelle Zuordnung überschrieben werden. Geräte-ID und
Entity-ID sind verschiedene Angaben. Nur eigene Instanz-IDs verwenden.

## HACS nach Veröffentlichung
Benutzerdefiniertes Dashboard-Repository:
https://github.com/Asmir1975/hc-direct-cards
Das Repo enthält das Bundle in dist und nennt den Dateinamen in hacs.json.
Tatsächliche HACS-Installation noch nicht geprüft.
[Offizielle Anforderungen](https://hacs.dev/docs/publish/plugin/).

## Rückkehr
Vorherige JS und zugehörige Ressourcen-URL verwenden, dann vollständig neu laden.
Die Integration und deren Konfiguration werden durch dieses Paket nicht geändert.
