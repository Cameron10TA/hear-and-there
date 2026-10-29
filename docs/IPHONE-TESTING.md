# iPhone field check

Use the published HTTPS site in Safari. The first version is designed for iPhone, but physical-device and on-campus verification must be completed by the team.

1. Open a fresh private tab. Before permission, confirm that neither the map nor simulation is accessible.
2. Tap Enable location and deny. Confirm the location explanation and retry button remain, with no demo bypass. Then allow permission through Safari's website settings and retry.
3. Grant permission. Try both in-person and simulation modes. Tap Start exploring; verify that sound can play through the phone speaker and headphones. Check the hardware volume.
4. In the simulation, jump to each stop. Confirm its name, photo, arrival sound, narration, transcript, pause/resume, and mute/unmute. Use the slider, pause movement, and restart at the end.
5. While narration plays, lock the phone. Sound should stop. Wait, unlock, and return. The page should require Resume exploring; audio should not restart unexpectedly. Repeat by switching apps and switching Safari tabs. Test Control Center, calls, and headphone interruptions as well.
6. Revoke location while exploring. Confirm the app returns to the permission gate. Repeat while simulation is running. Older Safari versions may only report revocation on the next native geolocation request.
7. At Whitman, approach Styx’s 30 m circle, then walk around every accessible side and corner of the outdoor courts, Penrose Library, Cleveland Commons, Memorial Building, and Reid Campus Center. Stay on the adjacent walking paths; no entry into a building or court is needed. Their outdoor listening polygons include the nearby mapped paths plus an 8 m margin. Verify the shaded map area and triggers match reality, especially the shared Penrose/courts path. Adjust `zone.walkingOutline`, `buffer`, or `exitBuffer` in `src/landmarks.js` based on field results.
8. Stand near each listening-area boundary. GPS drift should not restart the story repeatedly. Test with Precise Location off and with poor reception; inaccurate or stale fixes should pause automatic triggering and show a helpful message.
9. Test off campus. Live mode should show an off-campus explanation and offer simulation. The map should remain at Whitman.
10. Rotate the phone, increase text size, use VoiceOver, and enable Reduce Motion. Check controls, map attribution, transcripts, and the permission error. Read transcripts with audio muted.
11. Turn off connectivity after the page loads. The app should explain tile or audio-loading failures; use transcripts when audio has not loaded. On a slow connection, verify Start opens immediately; cancel a loading story, move away, or hide the page before its download finishes. Confirm it never starts late. Restore connectivity and use Retry story audio / Retry map. Offline operation is not promised.
12. End the walk and reload. Confirm no visited stops, position, or preferences are restored by the app.

Record the iPhone model, iOS version, date, and result in a GitHub issue. Do not attach precise personal location histories.

## Feedback update: controls and listening collection

- In simulation, confirm the yellow slider, movement button, and **Jump to a place**
  appear before the story. The player appears before search and the place list.
  Check portrait/landscape, larger text, and VoiceOver without horizontal overflow.
- Tap a map marker and a place card. Each should play its story directly after
  the initial Start gesture. Choosing one pauses simulated movement. In live mode,
  a nearby arrival or poor fix must not replace the manually chosen narration.
  Use **Follow nearby stories** / **Follow simulated walk** to return to arrivals.
- Let a story finish. Verify the Listened label, numbered map marker with a check,
  accessible completion label, and count. Pause partway or switch stories: neither
  should earn completion. Replay a completed story: the count must not increase.
- Finish Styx, Penrose Library, and Memorial Building in order to reveal the hidden
  thread bonus. Seeking or switching modes must preserve completion and clues.
  End/revoke/reload must clear both. Recheck pause-on-lock and explicit resume while
  a manually selected story is playing or loading. Physical-device results remain
  pending until this checklist is actually run on a phone.

## Themed collections and map groups

- Check all three themed collections. Their narration estimates exclude walking.
  Use Listen next and the suggested-order buttons, finish a story, switch themes,
  and complete a collection. Shared completions must remain counted. Merely
  selecting a theme or filter must not start audio or preload its recordings.
- Use category and Not listened to yet above the map and in the list. Confirm
  both stay synchronized, long names fit, zero matches have useful guidance,
  and the current story remains playable even when its pin is kept outside filters.
- Tap a numbered group to zoom in; no story should start from a group. Zoom fully
  in to expose individual pins. With VoiceOver, verify group counts, names, and
  individual pin actions after filtering and re-adding layers. Check that the
  44-pixel targets work with touch, orientation changes, and larger text.
- Listening boundaries have not changed. While filters hide a nearby place,
  confirm automatic arrival still works and exposes the current place's pin.
  Check pauses, resumed sessions, map tile failure, and progress reset on end/revoke.

## Residence paths and shared boundaries

Check the five residence halls outdoors as well: Jewett's north sidewalk and
recessed south approach; Lyman's long west path and southeast approach;
Anderson's north recess and south path; Stanton's west sidewalk and winding
south/east paths; and Douglas's west path, north approach, and south spur.
The physical perimeters are covered, but mapped paths do not establish public
access. In particular, confirm whether Lyman's full east side and Douglas's
east/south grounds are accessible; do not enter private residence areas to test.

Walk each shared boundary in both directions: Jewett/Lyman at their connection,
Anderson/Stanton between the halls, and Anderson/Cleveland beside the west
Cleveland path. Fresh arrival should select the closer footprint. An already
active story should remain selected through small drift, then yield when its
entry area ends. Only one story should play, with no repeated arrival sound.
Recheck the original Penrose/courts shared path. Tune outlines before increasing
buffers if field results differ from the modeled boundaries.

## Complete-building expansion: field calibration

The 56-stop version includes all 54 building features in Whitman's Walla Walla
campus map, plus Styx and the courts. The two remote farm observatories are outside
this walk. Use the per-building sources and OSM way IDs in `SOURCES.md` to record
which approaches have actually been checked; laptop geometry is not GPS evidence.

- Verify the four **estimated street frontages first**: College House on East
  Main Street; Lavender House on Merriam Street; Sherwood House on Alvarado
  Terrace; and Third Space Center on Marcus Street. The model places the listening
  line 6 m from the mapped road centerline on the building side. This is not a
  surveyed sidewalk. Confirm that a public sidewalk exists there, its position,
  and whether the 8/14 m margins reach it without taking over a neighbor's approach.
  Move the outline to the actual sidewalk; do not walk in traffic to test it.
- Keep Sherwood House's check on the public sidewalk. Its stairs, driveway,
  and residential grounds are private. At the Bike Shop, verify the public alley
  outside the pictured gate (OSM service way 1565067585); do not enter the fenced
  workspace. Check present access before using any mapped alley.
- Check the small houses on Boyer/Merriam/Cypress: Fine Arts, La Casa Hispana,
  La Maison, Environmental, Chinese, German, Community Service, Spirituality,
  Wellness, Lavender, Multicultural, and Writing. Confirm which frontages are
  public sidewalks and which paths lead into private residences.
- Walk the northern sidewalks at Beta Theta Pi, Tau Kappa Epsilon, Sigma Chi,
  and Phi Delta Theta. At the Beta/Olin sidewalk overlap, an active Olin story
  may persist through its exit margin; depart before expecting a fresh Beta
  arrival. Verify this does not make the frontage impractical in real use.
- Check Hall of Science's north/west/south approaches, Olin's long sides and
  recess, Harper Joy's west/east paths, and Sherwood/Climbing Center's connected
  approaches. Test shared paths in both directions: Science/Penrose,
  Harper Joy/Penrose, Olin/Jewett, Climbing/Memorial, and Maxey/courts.
- Verify Hunter/Reid, Baker/Douglas, Prentiss/Douglas, and Writing/Cleveland
  boundaries. In particular, a current Cleveland story may remain selected at
  Writing House's west sidewalk until departure; fresh arrival selects Writing.
- Check Fouts and Third Space around the creek and bridge. Use the modeled
  Marcus Street frontage for Third Space only after confirming its sidewalk;
  the south path is nearer Fouts. Never cross the creek or a fence to test a zone.
- Check all three Nancy Serrurier Village halls (Harvey, Robart, Stegner) against
  the current completed paths. The official footprints are newer than some OSM
  surroundings. Verify the south path's Robart/Third Space overlap.
- Check the remaining outdoor frontages at Baker Ferguson Fitness Center,
  College House, Bratton Tennis Center, Technology Services, Facilities Services,
  Cordiner, Hall of Music, Dance Studio, Glover Alston, Boyer House, Penrose House,
  and Welty. Use sidewalks around work and care facilities and respect privacy.

For every building, compare the shaded area at two zoom levels, approach along
each accessible side, pause near the entry/exit boundary, depart, and return.
Record exact public-path corrections without publishing personal GPS histories.
