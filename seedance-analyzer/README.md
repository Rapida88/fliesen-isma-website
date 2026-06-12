# Seedance Prompt Analyzer 📷🎬

Mobile Web-App (PWA): Foto oder Video hochladen → die App analysiert das Material
bis ins kleinste Detail (Subjekt, Bewegung, Kamera, Licht, Farben, Stil, Schnitte)
und erzeugt daraus einen fertigen **Seedance 2.0 Video-Prompt**, mit dem sich das
Material möglichst 1:1 nachbilden lässt.

## So funktioniert es

1. **App öffnen** — `seedance-analyzer/index.html` (siehe Hosting unten).
2. **API-Key speichern** — einmalig einen Anthropic API-Key eintragen
   (erhältlich auf [platform.claude.com](https://platform.claude.com)).
   Der Key wird **nur lokal im Browser** gespeichert (localStorage) und direkt
   vom Gerät an die Claude-API gesendet — es gibt keinen Zwischenserver.
3. **Foto oder Video auswählen** — bei Videos extrahiert die App automatisch
   6–14 gleichmäßig verteilte Frames direkt im Browser (nichts wird hochgeladen
   außer an die Claude-API).
4. **Analysieren** — Claude (Opus 4.8) erstellt:
   - 🔬 eine forensische Detail-Analyse auf Deutsch
   - 🎬 den fertigen Seedance-2.0-Prompt auf Englisch (mit Kopier-Button),
     bei Videos mit mehreren Shots automatisch als Timeline-Prompt mit Zeitmarken
   - ⚙️ empfohlene Einstellungen (Seitenverhältnis, Länge, Image-to-Video vs. Text-to-Video)
   - 💡 Tipps zum Iterieren

## Als App auf dem Handy installieren

Die Seite im Browser öffnen → **„Zum Home-Bildschirm hinzufügen“** (iOS Safari)
bzw. **„App installieren“** (Android Chrome). Die App startet dann im Vollbild
wie eine native App.

## Hosting

Reine statische Dateien, kein Build-Schritt nötig. Funktioniert auf GitHub Pages,
Netlify, Vercel oder jedem Webserver. Wichtig: **HTTPS ist Pflicht** (für PWA,
Kamera-Zugriff und die Zwischenablage).

Lokal testen:

```sh
cd seedance-analyzer
python3 -m http.server 8080
# → http://localhost:8080
```

## Technik

- Eine einzige HTML-Datei, Vanilla JS, kein Framework, kein Backend
- Video-Frame-Extraktion clientseitig über `<video>` + `<canvas>`
- Claude API (`claude-opus-4-8`) mit Streaming (SSE) und adaptivem Thinking,
  direkter Browser-Zugriff über den Header `anthropic-dangerous-direct-browser-access`
- Prompt-Logik basiert auf den offiziellen Seedance-2.0-Richtlinien
  (Struktur Subjekt → Aktion → Umgebung → Kamera → Licht → Stil,
  eine primäre Kamerabewegung, Licht als wichtigster Qualitätsfaktor,
  Timeline-Prompting für Multi-Shot-Videos)
