# Architektur

Fünf Lit-Karten teilen Entity-Zuordnung, Serviceaufrufe und Detaildarstellung.
Öffentliche Kartentypen heißen hc-direct-*-card, interne Elemente hcd-*.
src/index.ts registriert ausschließlich coffee, dishwasher, hob, hood und oven.

## Zuordnung
helpers/registry.ts ermittelt Kandidaten desselben Geräts. Für homeconnect_ws
verwendet helpers/homeconnect-direct.ts stabile Registry-Schlüssel oder
translation_key, keinen Anzeigenamen als Ersatz. Manuelle Zuordnungen bleiben
erhalten. Gerät-only-Konfigurationen werden bei Registry-Änderungen neu aufgelöst.
Anker-Entitäten sind eine kompatible Alternative zur Geräteauswahl.

## Darstellung
BaseApplianceCard zeigt Kopf, Verbindung, Warnungen, Hauptbedienung und Details.
Detailfelder stehen untereinander; Labels dürfen umbrechen und Selects schrumpfen.
Die Kartenempfehlung ist 12 Spalten mit automatischer Höhe.
Die getrennten Designvorschläge sind nicht integriert.
HoodCard ergänzt Stufenwahl und Licht. HobCard zeigt Zonen in der bestätigten
EX851LYV5E-Anordnung, gemeldetes Join/powerMove und Restwärme.

## Schreibzugriffe
Controls senden reguläre HA-Dienste vorhandener Entitäten. Readonly, unavailable,
restored und bekannte Trennung blockieren. Betrieb allein blockiert den
Hauptschalter nicht. HA-Rückmeldungen bleiben maßgeblich.
Die Browserdemo protokolliert Aufrufe nur lokal.

## Dateien
- src/definitions: Rollen der fünf Typen.
- src/cards, src/editors, src/components: Lit-Komponenten.
- tests: Unit-Tests und reduzierte Offline-Fixtures.
- scripts/verify_integration_contract.py: optionaler Vergleich der Adapter-Schlüssel mit einem lokalen Quellstand der Integration.
- scripts/generate_logo.py: setzt aus dem Symbol in assets die Logo-Dateien (hell/dunkel) zusammen.
- dist: gebaute JS für manuelle Installation und HACS-Struktur.
- assets: eigene Logo-Dateien.
