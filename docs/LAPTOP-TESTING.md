# Laptop testing

Use fictional GPS to test the visitor flow without visiting campus or granting access to your actual location. This fixture runs the real app, Leaflet, and Web Audio. Its mock permission buttons do not change your browser's real site permissions.

## Start

```sh
npm test
npm run build
node scripts/create-test-fixture.mjs
npm run dev
```

Open <http://localhost:4173/tests/fixture.html>. The red **LOCAL QA ONLY** disclosure identifies the fixture; expand it to show test controls. Reload before a new scenario to clear the app and audio cache. The build excludes this fixture and all tests.

For quiet testing, choose **QA: off campus** before enabling location, then start a live walk. Select a story and mute it before jumping to any campus stop. A new session resets mute, so repeat this when ending a walk or revoking permission. Muted playback still exercises audio loading, decoding, timers, and playback controls.

## Repeatable checks

| Scenario            | Steps and expected result                                                                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Consent gate        | Before enabling location, exploration is hidden. Choose **QA: deny location**, then **Enable location**. The explanation and retry button appear; simulation remains blocked. Grant mock location and retry to continue.                            |
| All stops | Pause simulation and use each **Go to** button. Check the title, image, transcript, duration, and playback. Jump buttons are generated for all 56 stops. The slider ends at 50:48; use each named jump rather than relying on the previous eleven-stop times. |
| Map selection       | Click each numbered marker. The matching story opens. Tab to a marker and use Enter or Space. Its accessible name includes the stop name; the label appears on hover/focus instead of all labels overlapping.                                       |
| Search and categories | Search **Penrose**: two results. Choose **Academics**: only Penrose Library. Choose **Housing**: zero results and a helpful message. Reset restores all 56 places and focuses search. Search **hua wen** to find the accented Chinese House name. Check keyboard focus on search, category, reset, and results. |
| Search while listening | Start a story, then enter a query with no matches. The current card and playback stay available. A new outdoor arrival can still select and play its story even if the list excludes it. End or revoke permission: search and category clear before a new session. |
| Simulation end      | Move the slider to 50:48. The movement button says **Restart walk**. Jump back to Penrose: it says **Continue movement**. Continue from that stop, or seek to the end and restart at 0:00. |
| End and restart     | Switch modes and mute, then **End walk**. Fresh consent is required, **Explore in person** is selected, and mute is cleared. A new walk starts in live mode unless you choose simulation.                                                           |
| Permission revoked  | During either mode, choose **QA: deny location**. The walk stops and the gate returns. Grant and retry; the next session has fresh defaults.                                                                                                        |
| Hidden page         | During playback, choose **QA: hide page**, then **QA: show page**. The walk stays paused and play is disabled until **Resume exploring**. Existing narration requires its own play/resume tap.                                                      |
| GPS errors          | In live mode, use **QA: poor GPS**, **QA: stale GPS**, and **QA: location unavailable**. Each shows its corresponding status and suspends automatic audio. A landmark/off-campus QA button supplies a fresh fix again.                              |
| Off campus          | **QA: off campus** shows the off-campus explanation and a simulation option. The map stays at Whitman.                                                                                                                                              |
| One recording fails | Reload, then choose **QA: fail Cleveland audio** before starting. Other stories should still play. Cleveland shows a recoverable error when you press play; its transcript remains readable. Choose **QA: restore audio** and play Cleveland again. |
| Responsive layout   | Check 320 × 568, 390 × 844, and a desktop viewport. All 56 stop cards and playback/simulation controls must remain reachable by scrolling, without horizontal page overflow.                                                                      |

The fixture deliberately sends fixes only on start, resume, or a QA location button. In live mode, an untouched fix becomes stale after 25 seconds; this is expected. Use simulation for longer playback tests. Audio failure injection affects new requests, so reload first if Cleveland is already cached.

## Laptop verification — October 20, 2026

- All 22 automated tests passed; the production build and whitespace checks passed.
- Eight new regression tests cover session resets, simulation seeking, independent audio loading/retry, and stale build output. They were checked against the prior source to confirm they catch the original problems.
- In the Codex desktop browser, verified all four stories/images and simulation jumps, denial/retry and revocation, session reset, inaccurate/stale/unavailable GPS, off-campus handling, mocked hide/show with explicit resume, and audio failure/retry with readable transcripts.
- Checked narrow/mobile and desktop layouts. Verified all four map clicks select the intended story, Enter/Space activate markers, and accessible marker names survive active-icon updates.
- Browser playback was checked muted through state/progress/duration, not by judging sound quality. No console errors were observed during the checked flows.

Physical Safari behavior, real permission prompts, screen locking, calls/headphone interruptions, VoiceOver, and campus coordinates/listening radii remain unverified. Use [the iPhone field checklist](IPHONE-TESTING.md) when a phone and campus access are available.

## Footprints and slow connections — current checklist

- Check all 56 stop cards, photos, transcripts, and simulation jumps. New building coverage follows the 54-building official campus-map inventory. The complete demo is 50:48; every hold accommodates the recording. Open **LOCAL QA ONLY · mocked GPS** to reveal the collapsible test controls.
- The map shows a circle at Styx and outdoor listening areas extending to nearby paths at the courts/buildings. The physical court footprint retains its cutout; the listening area includes the paths around it. Automated geometry tests cover every edge and corner, a 6 m perimeter, buffered entry/exit behavior, and neighboring zones.
- Before starting a fresh fixture session, choose **QA: off campus**, **QA: hold audio downloads**, and **QA: fail map tiles**. Start must open the explorer immediately. Select a story and tap Play: the transcript stays available, with slow feedback after four seconds. A download times out after fifteen seconds and offers retry.
- Cancel or switch stories while loading; **QA: release audio downloads** must not start the abandoned story. Repeat with hide/show, End walk, and permission revocation. Mute before releasing downloads when testing quietly.
- After **QA: restore map tiles**, tap **Retry map**. The map should recover without restarting the walk or narration.

These laptop checks do not establish physical iPhone behavior or GPS accuracy around real buildings.

## Earlier verification — October 20, 2026

Verification for the six-stop expansion: all 40 automated tests passed. Browser checks covered all six simulation jumps and photos, decoded Memorial/Reid narration with muted playback, immediate startup with held downloads and failed tiles, the audio timeout/retry flow with readable transcripts, map retry, cancellation by selecting another story, footprint rendering, and a 390 × 844 layout without horizontal overflow. No browser console errors appeared in the final normal flow. Physical field checks remain pending.

Outdoor-path refinement: 43 automated tests pass, including 30 independently sourced outdoor path checkpoints, shared-path selection/jitter, and outdoor demo positions. The full simulation still visits every stop once. Browser QA confirmed that each **QA: [stop] path** control triggers the matching story while outside the building; map shading now reaches those paths. The demo visits Memorial before Cleveland to avoid passing through Memorial’s zone twice. Physical GPS calibration remains pending.

Integrated residence-hall pass: 44 automated tests pass with all eleven stops, all ten physical footprints, 59 sourced path checkpoints, connected-building/shared-path drift and departure cases, and one full simulated arrival per stop. Browser checks on the combined data confirmed five dorm path arrivals, all eleven jump times/photos/decoded recordings, no horizontal overflow at 390 × 844, and no console errors in the normal flow. Playback was muted. Dorm stories and media were preserved; their zones, reference markers, outdoor listening points, and simulation ordering were updated. Physical GPS and iPhone calibration remain pending.

## Complete campus inventory — October 27, 2026

- All 48 automated tests pass, including the 54-building inventory, 342 new
  outdoor approach checkpoints, polygon validity and footprint coverage, 2 m
  listening-point drift, mono PCM WAV validation, and duration/hold checks.
  The existing 59 path checkpoints remain, with explicit nearest-neighbor
  expectations where new stops now share those paths.
- The full 50:48 simulation is traced at 0.1-second intervals. Its 56 arrivals
  match the named sequence exactly, with no missing or repeated arrivals.
- Browser QA used the real application, local media, Leaflet, and Web Audio
  with fictional GPS. All 56 named jumps selected the correct card, photograph,
  transcript, and decoded recording. Each of the 45 new outdoor-path controls
  selected its story with exactly one stop marked in range; an off-campus fix
  separated these fresh arrivals. Playback was muted.
- A fresh session with Robart's download held showed loading and the 15-second
  timeout/retry message. Retrying, selecting Stegner, and releasing downloads
  left Robart canceled and played Stegner's decoded recording normally.
- Map selection was checked with the Chinese House and Technology Services
  markers; keyboard Enter selected Robart and Stegner. The 320 × 568 and
  390 × 844 layouts were visually inspected in same-origin test iframes,
  including long names, photos, player controls, and vertical scrolling.
  The place list and jump list have bounded scrolling; thumbnail images load lazily.
- The production build and JavaScript syntax/whitespace checks pass. The
  website artifact contains only site inputs and media; fixtures, tests, OSM
  extracts, source documentation, and local review images are excluded.

Four street frontages are provisional model estimates rather than surveyed
sidewalks: College House, Lavender House, Sherwood House, and Third Space Center.
Check these first on campus. Physical Safari, lock-screen behavior, and GPS/access
calibration remain pending as listed in `IPHONE-TESTING.md`.

## Place search and category filters — October 27, 2026

All 55 automated tests pass. New coverage checks accent/case/punctuation matching,
category grouping, combined filters, no matches and reset, preservation of the
current player and automatic arrivals, and clearing filters on end/revocation.
Browser checks with fictional GPS verified Penrose's two results, Academics
narrowing to Penrose Library, Housing producing zero combined results, reset
restoring 56 places and focusing search, and **hua wen** finding the accented
Chinese House name. Keyboard Tab moves from search to category to reset, and
Arrow Down changes the category. Desktop (1265 px) had no horizontal overflow;
320 × 568 and 390 × 844 iframe layouts were visually checked for controls, result
cards, long names, and focus outlines. No console errors/warnings appeared in the
checked flow. This verifies browser layout and handlers, not physical iPhone behavior.
