# iPhone field check

Use the published HTTPS site in Safari. The first version is designed for iPhone, but physical-device and on-campus verification must be completed by the team.

1. Open a fresh private tab. Before permission, confirm that neither the map nor simulation is accessible.
2. Tap Enable location and deny. Confirm the location explanation and retry button remain, with no demo bypass. Then allow permission through Safari's website settings and retry.
3. Grant permission. Try both in-person and simulation modes. Tap Start exploring; verify that sound can play through the phone speaker and headphones. Check the hardware volume.
4. In the simulation, jump to each stop. Confirm its name, photo, arrival sound, narration, transcript, pause/resume, and mute/unmute. Use the slider, pause movement, and restart at the end.
5. While narration plays, lock the phone. Sound should stop. Wait, unlock, and return. The page should require Resume exploring; audio should not restart unexpectedly. Repeat by switching apps and switching Safari tabs. Test Control Center, calls, and headphone interruptions as well.
6. Revoke location while exploring. Confirm the app returns to the permission gate. Repeat while simulation is running. Older Safari versions may only report revocation on the next native geolocation request.
7. At Whitman, approach Styx from outside its 30 m listening circle, then walk toward the outdoor courts' 42 m circle. Verify that the marker and distance match reality and each narration starts once. If not, adjust coordinates/radii in `src/landmarks.js` and repeat.
8. Stand near a circle boundary. GPS drift should not restart the story repeatedly. Test with Precise Location off and with poor reception; inaccurate or stale fixes should pause automatic triggering and show a helpful message.
9. Test off campus. Live mode should show an off-campus explanation and offer simulation. The map should remain at Whitman.
10. Rotate the phone, increase text size, use VoiceOver, and enable Reduce Motion. Check controls, map attribution, transcripts, and the permission error. Read transcripts with audio muted.
11. Turn off connectivity after the page loads. The app should explain tile or audio-loading failures; use transcripts when audio has not loaded. Offline operation is not promised.
12. End the walk and reload. Confirm no visited stops, position, or preferences are restored by the app.

Record the iPhone model, iOS version, date, and result in a GitHub issue. Do not attach precise personal location histories.
