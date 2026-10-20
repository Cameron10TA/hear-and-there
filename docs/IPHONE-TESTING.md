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
