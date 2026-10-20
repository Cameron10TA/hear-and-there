---
name: add-location
description: Add or revise campus listening stops in Cameron10TA/hear-and-there, including sourced stories and media, outdoor path-aware listening zones, simulation integration, and validation. Use for new locations or changes to their listening boundaries, not unrelated map styling or audio-engine work.
---

# Add a Hear & There location

Deliver a complete campus stop that a visitor can hear from nearby outdoor paths.
Read `AGENTS.md`, `README.md`, and the current `src/landmarks.js` before editing.
Resolve these paths from the checkout root; this skill is shared across developers
and must not depend on one person's machine, account, or installed voice.

## Scope and coordination

- Follow the requested locations and current team assignments. Check existing
  stops and relevant in-progress work before adding a duplicate. If another
  teammate owns a category, leave it to them unless the current request says otherwise.
  Do not turn a temporary assignment into a permanent restriction on locations.
- Preserve unrelated changes. Reuse the established data/rendering model when it
  supports the location; adding a stop should not require rewriting the app.
- Adding a location does not itself authorize a push, PR, merge, deployment, paid
  service, or message to a teammate. Follow existing authorization and the repo's
  [pre-PR skill](../pre-pr/SKILL.md) when commit/publication work is in scope.

## Source the place and outdoor approaches

- Verify facts, names, and physical geometry using primary sources: Whitman's
  official campus map and department/building pages. Inspect the actual source;
  do not infer a footprint or entrance from the marker's center.
- Inspect the nearby walking network as well. The red dashed lines on the current
  OpenStreetMap basemap are useful starting evidence; obtain footway coordinates
  from OSM data when possible. A small bounded OSM map API extract can supply
  nodes and ways if Overpass is unavailable. Keep this a development-time lookup,
  not a new runtime service or tile-prefetch job.
- Prefer paths and sidewalks on the landmark's side of the street. Check fences,
  roads, water, neighboring buildings, and access tags before extending a zone.
  A mapped line alone does not prove current public access. Record uncertain
  approaches for a field check rather than inventing access claims.
- Record source URLs, OSM way/node IDs where used, retrieval date, geometry edits,
  photo credits/license information, and narration provenance in `docs/SOURCES.md`.
  Credit OSM-derived geometry under ODbL; do not assume college photos are openly
  licensed. Keep raw extracts and analysis images in ignored local review files.

## Design the listening area around outdoor use

Read `src/proximity.js` and the polygon rendering in `src/app.js` before changing
the schema. The current fields have different purposes:

| Field | Purpose |
| --- | --- |
| `coordinates` | Landmark marker/reference position, in latitude/longitude order. |
| `zone.outline` | Physical building/court footprint; used for distances and overlap decisions. |
| `zone.walkingOutline` | Listening polygon extending to nearby outdoor paths, including approaches around accessible sides. This is what the map shades. |
| `zone.buffer` | Entry margin in meters outside the walking outline; current starting value is 8 m. |
| `zone.exitBuffer` | Larger exit margin to reduce GPS jitter; current starting value is 14 m. |
| `listeningPosition` | A sourced outdoor path point for simulation and the QA fixture, outside the physical footprint but inside the listening area. |

- For buildings and courts, keep the physical footprint and the outdoor listening
  outline separate. An 8 m buffer around walls alone often misses the paths.
  Fit the walking outline to nearby path geometry, then apply the small margin.
  Check long sides, corners, recessed sections, and the approach from each
  accessible side. The visitor should not need to enter a building or court,
  cross a fence, or leave the adjacent path to trigger the story.
- Use a circle (`radius` and larger `exitRadius`) for a compact point landmark
  when it actually covers the outdoor approaches, as with Styx. Do not replace
  irregular sites with one large circle just to reach their farthest edge.
- Convert GeoJSON/OSM longitude/latitude data to the app's latitude/longitude order.
  Use a valid, non-self-intersecting polygon. Preserve meaningful concave footprint
  sections; an outdoor listening area may legitimately include paths in a recess.
- The 8/14 m values are starting settings, not surveyed or universally correct
  thresholds. Tune the outline first; avoid increasing margins across campus to
  compensate for one distant path. Keep exit margins larger than entry margins.
- Check adjacent stops together. Shared paths may overlap narrowly; the current
  selector ranks physical distance, retains the current entry through jitter,
  and gives actual footprints priority. Preserve that behavior unless the task
  calls for a tested change. Avoid swallowing a neighbor's approaches or an entire
  road block. Never use physical-footprint distance as the sole entry test when
  `walkingOutline` exists.
- Render and trigger from the same walking geometry and meter margins. Inspect
  multiple zoom levels: map stroke widths must scale with zoom. Keep physical
  marker positions distinct from outdoor simulation positions.

## Complete content and integration

- Add a unique, stable ID and the existing content fields in `src/landmarks.js`:
  name, subtitle, category, coordinates/zone, image and descriptive `imageAlt`,
  audio, ambience, approximate duration, description, transcript, source, and
  coordinate provenance. Add `listeningPosition` for a building/court.
- Write a short original story grounded in the sources and suitable for someone
  standing outside. Avoid unsupported hours/access promises or instructions to
  enter. Keep the delivered recording and transcript consistent. Store media
  locally under `assets/`; record synthetic narration as a sample with its voice
  source. Use available local tools or supplied recordings without assuming a
  particular OS voice or silently buying a voice service.
- Keep recordings compact and load them on demand. The current asset test expects
  mono PCM WAV samples; if intentionally adopting another supported format, update
  meaningful media validation and verify browser decoding instead of dropping the
  asset checks. If a recording cannot be produced, report the incomplete asset
  explicitly; do not add a broken file reference or claim the stop is complete.
- Add an outdoor arrival/hold to `simulation`, using `listeningPosition` rather
  than a building center. Allow time for narration. Trace the entire interpolated
  sequence: passing through another zone can trigger it before its named stop.
  Adjust order/waypoints so every intended stop is reached without unintended
  repeat arrivals. Simulation remains a presentation, not walking directions.
- Inspect index-based `landmarks[...]` references before inserting/reordering
  entries. Update campus bounds if needed while keeping tile requests campus-bound.
  Check counts, slider duration, welcome copy, source credits, and relevant test
  guides for stale assumptions. Reuse data-generated lists, jump buttons, and QA
  path controls instead of creating parallel hardcoded lists.

## Verify and hand off

- Add independent outdoor path checkpoints to `tests/proximity.test.js`, with
  source way IDs and coordinates. Include approaches missed by the old wall-only
  margin, sides/corners, exclusion points beyond the intended area, and shared
  paths with neighboring stops. Sampling only the new polygon's own vertices or
  checking only the building center does not validate outdoor access.
- Check that `listeningPosition` is outside the physical footprint and activates
  the intended stop, both fresh and when leaving a neighbor. Cover small GPS drift,
  entry/exit behavior, the full simulation, and matching assets/transcripts.
- Run `npm test`, `npm run build`, relevant `node --check` commands, and
  `git diff --check`; check each exit code. Confirm `dist/` contains the expected
  media and website files, with no `.agents`, fixtures, raw map extracts, or
  local review artifacts. Do not weaken assertions merely to accommodate a new stop.
- Regenerate the local fixture with `node scripts/create-test-fixture.mjs` and use
  `npm run dev` if no server is running. In `tests/fixture.html`, verify the new
  card/photo/transcript, map selection, outdoor path trigger, simulation jump,
  audio decoding/playback, and a narrow-screen layout. Use fictional GPS and mute
  playback when needed. Check loading/retry for the new media on a slow connection.
- Preserve the repo's consent, memory-only location/preferences, initial audio
  gesture, pause-on-hide, explicit resume, and on-demand download behavior.
- Report what was added, source/geometry choices, actual checks, local/publication
  state, and field follow-up. Laptop tests prove modeled geometry, not real GPS
  accuracy or physical iPhone behavior. Add specific path approaches and overlap
  boundaries to `docs/IPHONE-TESTING.md` when they need calibration; lack of a
  phone does not prevent completing the authorized laptop work.
