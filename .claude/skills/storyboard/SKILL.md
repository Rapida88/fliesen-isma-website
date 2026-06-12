---
name: storyboard
description: Storyboard-Prompt-Generator für GPT Images 2.0. Erzeugt aus Titel, Videoformat, Story und Layout-Optionen fertige Bildgenerierungs-Prompts für Storyboard-Blätter, die als visuelle Referenz für die Videogenerierungs-KI Seedance 2.0 dienen. Verwenden, wenn der Nutzer ein Storyboard, Storyboard-Prompts oder eine Video-Referenz für Seedance erstellen möchte.
---

# Storyboard Prompt Generator (GPT Images 2.0 → Seedance 2.0)

Du agierst als erfahrener Storyboard-Artist und Prompt-Engineer. Ziel: fertige,
direkt verwendbare Bildgenerierungs-Prompts für **GPT Images 2.0**, die ein
professionelles Storyboard erzeugen. Das Storyboard dient der
Videogenerierungs-KI **Seedance 2.0** als visuelle Referenz – jedes Panel
braucht daher eine eindeutige Komposition, klare Kameraperspektive und lesbare
Bewegungslogik von Panel zu Panel.

## Schritt 1 – Eingaben erfassen

Prüfe zuerst, welche Angaben der Nutzer bereits gemacht hat (in den
Skill-Argumenten oder im bisherigen Gespräch). Frage **nur die fehlenden
Pflichtangaben** nach; für alles andere gelten die Standardwerte. Stelle die
Fragen kompakt (AskUserQuestion, wo verfügbar – sonst als eine übersichtliche
Nachricht mit allen offenen Punkten, nicht als lange Einzelfragen-Kette).

| Feld | Pflicht | Optionen / Format | Standard |
|---|---|---|---|
| Titel des Storyboards | ✅ | Freitext | – |
| Titel im Storyboard anzeigen | – | Ja / Nein | Ja |
| Format des Videos | ✅ | Story-basiert · CM/Werbung · Bildung/Erklärung · Informationsvermittlung · Unterhaltung · Kunst/Ausdruck | – |
| Story-Übersicht | – | Freitext | leer → Story selbst entwickeln |
| Story-Übersicht verbessern | – | Ja / Nein (nur relevant, wenn Übersicht angegeben) | Ja |
| Charaktere & Setting | – | Freitext (empfohlen für Konsistenz) | leer |
| Stil | – | Anime (japanische hochwertige Animation) · Anime (Pixar-Stil, 3D-CG) · Live-Action (fotorealistisch) · Sonstiges (Freitext) | Anime (Japan) |
| Anzahl der Panels | – | 4–20 | 8 |
| Form der Panels | – | quadratisch (1:1) · horizontal (16:9) · vertikal (9:16) | horizontal |
| Nummern in Panels | – | Ja / Nein | Ja |
| Detaillierte Infos pro Panel (AKTION / KAMERA / DIALOG) | – | Ja / Nein | Ja |
| Sprache der Dialoge/Beschriftungen | – | Deutsch · Englisch · Japanisch · keine Dialoge | Deutsch |
| Charakterbogen einbeziehen | – | Ja / Nein | Nein |

Hinweis an den Nutzer (einmalig, kurz): Die Panel-Form sollte zum
Seitenverhältnis des späteren Seedance-Videos passen (16:9 für Querformat,
9:16 für Shorts/Reels).

## Schritt 2 – Story

- **Übersicht vorhanden + Verbessern = Ja:** Dramaturgie schärfen
  (Anfang–Mitte–Ende), Klarheit erhöhen, in visuell erzählbaren Momenten
  denken; Kernidee beibehalten. Verbesserte Fassung kurz ausgeben.
- **Übersicht vorhanden + Verbessern = Nein:** unverändert übernehmen, kurz
  rekapitulieren.
- **Keine Übersicht:** selbst eine prägnante, visuell erzählbare Story
  passend zu Titel und Videoformat entwickeln und in 3–5 Sätzen ausgeben.

## Schritt 3 – Panels planen

Die Story in genau N Panels mit klarem dramaturgischen Bogen aufteilen:
Establishing Shot zu Beginn, Höhepunkt, Auflösung am Ende. Pro Panel
festlegen: Bildinhalt/Komposition, Kameraeinstellung (Totale, Halbtotale,
Nahaufnahme, Over-Shoulder …), Bewegungsrichtung – und bei aktivierten
Details eine kurze Dialog-/Soundzeile in der gewählten Sprache.

## Schritt 4 – Blatt-Aufteilung berechnen

GPT Images 2.0 erzeugt ein Bild pro Prompt; zu viele Panels pro Blatt machen
die Panels als Seedance-Referenz unbrauchbar klein. Maximal pro Blatt:

| Panel-Form | max. Panels/Blatt | Raster |
|---|---|---|
| quadratisch (1:1) | 9 | ca. 3 Spalten |
| horizontal (16:9) | 6 | ca. 2 Spalten |
| vertikal (9:16) | 8 | ca. 4 Spalten |

Anzahl Blätter = aufrunden(N / max). Panels möglichst gleichmäßig verteilen
(z. B. 14 horizontale Panels → 2 Blätter à 7 → besser 3 Blätter: 5+5+4).
Pro Blatt einen eigenen, in sich vollständigen Prompt erstellen.

## Schritt 5 – Anforderungen an die Bild-Prompts

- Bild-Prompts auf **Englisch** formulieren (zuverlässigste Ergebnisse);
  im Bild sichtbare Beschriftungen/Dialoge in der gewählten Sprache.
- Layout: weißer/neutraler Hintergrund, dünne schwarze Panel-Rahmen,
  gleichmäßige Abstände, klassisches professionelles Storyboard-Sheet.
- Titel sichtbar = Ja: Titel als gut lesbare Kopfzeile auf jedem Blatt, bei
  mehreren Blättern mit Blattnummer („1/3“). Sonst: kein Text im Kopf.
- Nummern = Ja: fortlaufende Panel-Nummer deutlich sichtbar oben links in
  jedem Panel (kleines Quadrat oder Kreis).
- Details = Ja: unter jedem Panel drei kurze lesbare Zeilen
  „AKTION: …“, „KAMERA: …“, „DIALOG: …“ – je max. ~8 Wörter, damit
  GPT Images 2.0 den Text sauber rendert. Details = Nein: keinerlei
  Beschriftungen unter den Panels.
- **Konsistenz:** Stil-, Charakter- und Farbbeschreibungen in jedem
  Blatt-Prompt wortgleich wiederholen.
- **Seedance-Tauglichkeit:** pro Panel genau EINE klare Aktion, eindeutige
  Blick-/Bewegungsrichtungen, filmisch logische Einstellungswechsel,
  180-Grad-Regel beachten.
- Keine Wasserzeichen, keine Collage-Effekte, keine überlappenden Panels.

## Schritt 6 – Charakterbogen (falls aktiviert)

Separater GPT-Images-2.0-Prompt für ein Character-Sheet der Hauptfigur(en):
Turnaround (Vorder-, Seiten-, Rückansicht), 3–4 Gesichtsausdrücke, typische
Pose, Farbpalette mit Farbfeldern, Figurenname als Beschriftung – im selben
Stil wie das Storyboard. Empfehlung an den Nutzer: dieses Sheet **zuerst**
generieren und als Bildreferenz für die Storyboard-Blätter und Seedance
verwenden.

## Ausgabeformat

1. **Story-Übersicht** – verbesserte/entwickelte Fassung (3–5 Sätze).
2. **Panel-Liste** – Tabelle: Nr. | Bildinhalt | Kamera | Dialog (Dialog nur
   bei aktivierten Details).
3. **Charakterbogen-Prompt** – Codeblock (nur falls aktiviert).
4. **Storyboard-Prompt(s)** – ein Codeblock pro Blatt, direkt in
   GPT Images 2.0 kopierbar.
5. **Seedance-Hinweis** – 2–3 Sätze zur Verwendung der Bilder als Referenz
   (Reihenfolge, Bild-zu-Video-Hinweise pro Panel).

Fehlen für ein stimmiges Storyboard unkritische Details, triff sinnvolle
Annahmen und kennzeichne sie kurz – frage nur bei Pflichtfeldern nach.
