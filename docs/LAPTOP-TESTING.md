# Laptop testing

Use fictional GPS to test the visitor flow without visiting campus or granting access to your actual location. This fixture runs the real app, Leaflet, and Web Audio. Its mock permission buttons do not change your browser's real site permissions.

## Start

```sh
npm test
npm run build
node scripts/create-test-fixture.mjs
npm run dev
```

Open <http://localhost:4173/tests/fixture.html>. The red **LOCAL QA ONLY** bar identifies the fixture. Reload before a new scenario to clear the app and audio cache. The build excludes this fixture and all tests.

For quiet testing, choose **QA: off campus** before enabling location, then start a live walk. Select a story and mute it before jumping to any campus stop. A new session resets mute, so repeat this when ending a walk or revoking permission. Muted playback still exercises audio loading, decoding, timers, and playback controls.

## Repeatable checks

| Scenario            | Steps and expected result                                                                                                                                                                                                                           |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Consent gate        | Before enabling location, exploration is hidden. Choose **QA: deny location**, then **Enable location**. The explanation and retry button appear; simulation remains blocked. Grant mock location and retry to continue.                            |
| Four stops          | In simulation, pause movement, then use each **Go to** button. Check the title, photograph, transcript, duration, and playback. Expected jump times: Styx 0:12, courts 1:16, Penrose 2:20, Cleveland 3:26.                                          |
| Map selection       | Click each numbered marker. The matching story opens. Tab to a marker and use Enter or Space. Its accessible name includes the stop name; the label appears on hover/focus instead of all labels overlapping.                                       |
| Simulation end      | Move the slider to 4:06. The movement button says **Restart walk**. Jump back to Penrose: it says **Continue movement**. Continue from 2:20, or seek to the end and restart at 0:00.                                                                |
| End and restart     | Switch modes and mute, then **End walk**. Fresh consent is required, **Explore in person** is selected, and mute is cleared. A new walk starts in live mode unless you choose simulation.                                                           |
| Permission revoked  | During either mode, choose **QA: deny location**. The walk stops and the gate returns. Grant and retry; the next session has fresh defaults.                                                                                                        |
| Hidden page         | During playback, choose **QA: hide page**, then **QA: show page**. The walk stays paused and play is disabled until **Resume exploring**. Existing narration requires its own play/resume tap.                                                      |
| GPS errors          | In live mode, use **QA: poor GPS**, **QA: stale GPS**, and **QA: location unavailable**. Each shows its corresponding status and suspends automatic audio. A landmark/off-campus QA button supplies a fresh fix again.                              |
| Off campus          | **QA: off campus** shows the off-campus explanation and a simulation option. The map stays at Whitman.                                                                                                                                              |
| One recording fails | Reload, then choose **QA: fail Cleveland audio** before starting. Other stories should still play. Cleveland shows a recoverable error when you press play; its transcript remains readable. Choose **QA: restore audio** and play Cleveland again. |
| Responsive layout   | Check 320 × 568, 390 × 844, and a desktop viewport. All four stop cards and playback/simulation controls must remain reachable by scrolling, without horizontal page overflow.                                                                      |

The fixture deliberately sends fixes only on start, resume, or a QA location button. In live mode, an untouched fix becomes stale after 25 seconds; this is expected. Use simulation for longer playback tests. Audio failure injection affects new requests, so reload first if Cleveland is already cached.

## Laptop verification — October 20, 2026

- All 22 automated tests passed; the production build and whitespace checks passed.
- Eight new regression tests cover session resets, simulation seeking, independent audio loading/retry, and stale build output. They were checked against the prior source to confirm they catch the original problems.
- In the Codex desktop browser, verified all four stories/images and simulation jumps, denial/retry and revocation, session reset, inaccurate/stale/unavailable GPS, off-campus handling, mocked hide/show with explicit resume, and audio failure/retry with readable transcripts.
- Checked narrow/mobile and desktop layouts. Verified all four map clicks select the intended story, Enter/Space activate markers, and accessible marker names survive active-icon updates.
- Browser playback was checked muted through state/progress/duration, not by judging sound quality. No console errors were observed during the checked flows.

Physical Safari behavior, real permission prompts, screen locking, calls/headphone interruptions, VoiceOver, and campus coordinates/listening radii remain unverified. Use [the iPhone field checklist](IPHONE-TESTING.md) when a phone and campus access are available.
