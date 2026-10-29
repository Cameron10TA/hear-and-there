# Hear & There

A browser-only audio walk at Whitman College in Walla Walla. There are **56 stops**: **all 54 buildings identified in the official map's Walla Walla campus area**, plus **Styx** and the **outdoor tennis courts**. Buildings include academic and administrative spaces, residence and interest houses, fraternity houses, athletics facilities, and the three Nancy Serrurier Village halls. The two farm-based observatories are outside this campus walk. See the full inventory and sources in [docs/SOURCES.md](docs/SOURCES.md).

**Website:** https://Cameron10TA.github.io/hear-and-there/

## Run locally

Install Node.js 20 or later, clone this repository, and run:

```sh
npm run dev
```

Open `http://localhost:4173`. No package installation, API key, database, or backend is needed. Location works on localhost; use the HTTPS GitHub Pages URL on an iPhone. A phone visiting an ordinary HTTP LAN address cannot use geolocation.

```sh
npm test
npm run build
```

The build recreates `dist/` and copies only the website into it, removing stale output from earlier builds. Tests, development scripts, and local files are excluded. This is plain HTML, CSS, and JavaScript, with a vendored copy of Leaflet 1.9.4 for the map.

## Visitor experience

1. Allow the browser's location prompt. Denial blocks both live and simulated exploration.
2. Choose **Explore in person** or **Simulate a walk**.
3. Tap **Start exploring** to unlock audio. This extra gesture matters on iPhones.
4. Walk near a landmark. A short original synthesized arrival sound introduces its sample narration. Each story starts automatically once per session; the play button can replay it. Tap a map marker or place card to play a story directly. Your chosen story takes priority until you choose **Follow nearby stories** (or **Follow simulated walk**). Selecting a story pauses simulated movement.
5. The map and distance indicators remain active between stops. No routes or turn-by-turn directions are provided.
6. Locking the screen or leaving the page pauses audio, GPS watching, and simulation. Return and tap **Resume exploring**; a fresh location request checks access again. Tap the story's play button to resume an interrupted narration.
7. Finish narrations to collect **Listened** badges on the map and place list. The completion count gives you an optional goal of hearing all 56 stories. Opening a card, arriving, canceling a download, or pausing does not complete a story. Progress survives simulation jumps and mode switches within the same walk.
8. **End walk** clears the session location, completed stories, and bonus progress. Reloading or revoking location access also starts fresh.

Starting opens the map and stories immediately while audio unlocks. Only a story being played or reached is downloaded; other recordings do not delay startup. Slow audio shows waiting feedback and a cancel button, then offers retry after a 15-second download timeout. Transcripts remain available. Switching stories, moving out of an automatic arrival zone, pausing, or ending the walk prevents a late download from starting unexpectedly. Recordings stay in memory for replay. Map failures offer **Retry map** while stories remain usable.

The 50:48 simulation uses outdoor listening points at all 56 stops. It follows fixed test positions and includes a time slider and jump buttons. It is a presentation tool, not a recommended walking route. Location consent is still required, but real coordinates are not used to move its marker.

Simulation controls sit at the top of the story panel, with the time slider and movement button always exposed and the full jump list under **Jump to a place**. The selected story and audio player appear before search and the place list. Location status stays in the toolbar. The **Follow a hidden thread** section below the list hints at a smaller challenge: finish Styx, Penrose Library, and Memorial Building in that order to reveal an original bonus message. Finishing another story restarts the sequence; replays can complete clues without increasing the unique-story count. The bonus stays unlocked until the walk ends. All progress exists only in memory.

Choose a short themed collection: **First time at Whitman** (6 stops), **Art around campus** (7), or **Student life** (7). Each shows an approximate total narration time, suggested story order, its own completion count, and **Listen next** for the first unfinished story. Completed stories count across collections. Selecting a collection clears search/category/unlistened filters and narrows both map and list; **All campus stories** restores the full campus collection. The suggested order is for listening, not walking directions. Narration estimates reuse the existing duration labels and exclude walking time; choosing a collection does not download all of its recordings.

Search by name, or filter by Academics, Housing, Athletics, Arts & culture, and Campus life. Search ignores case and accents and combines with the selected collection, category, and **Not listened to yet**. Category and unlistened controls above the map stay synchronized with those in the place list. **Reset filters** clears search/category/unlistened choices within the current collection. Nearby automatic stories and simulation jumps still work across campus; a current story/location remains visible on the map even outside the filters, and its player remains available. Choosing a collection or filter never starts or interrupts audio.

At overview zooms, overlapping pins become numbered groups. Click or keyboard-activate a group to zoom in; groups do not play narration. At maximum zoom all places are individual pins. Individual pin numbers follow the selected collection's suggested order, with a dot for a current place outside that collection. Grouped or filtered listening outlines are hidden to reduce clutter; actual arrival boundaries and their selection logic are unchanged. Collection/filter choices and progress stay in memory and clear on end, reload, or revoked consent.

## Work together

Each developer can clone the repository and work on a separate branch. Push a branch and open a pull request for another teammate to review. Merging into `main` runs the tests, builds the static files, and deploys GitHub Pages.

Suggested independent areas:

- **Content:** `src/landmarks.js`, transcripts, images, and recorded audio.
- **Design:** `styles.css` and `index.html`.
- **Location and map:** `src/proximity.js` and the map/location functions in `src/app.js`.
- **Audio and testing:** `src/audio.js`, tests, and the iPhone checklist.

Repository owner: `Cameron10TA`. The owner can add the other three developers as collaborators in GitHub's repository settings. They are not invited automatically.

AI-assisted pushes and pull requests follow the shared [pre-PR skill](.agents/skills/pre-pr/SKILL.md), routed automatically by [AGENTS.md](AGENTS.md). It reviews the final changes, runs the applicable checks, and records correctness and privacy/security evidence before every push, including follow-up fixes. In a repository-aware agent, invoke it as `$pre-pr`. These instructions do not install a Git hook or change GitHub branch protection.

## Change landmarks or audio

For a complete new stop or a listening-zone update, use the shared
[add-location skill](.agents/skills/add-location/SKILL.md), or invoke
`$add-location` in a repository-aware agent. It covers outdoor paths, sources,
photos, matching audio/transcripts, simulation, and verification. `AGENTS.md`
also routes these tasks to the skill. The files live in the repository so
teammates get the same workflow when they pull the change.

Edit `src/landmarks.js`. Each entry includes latitude/longitude, either circular entry/exit radii or a polygon `zone` with the physical `outline`, an outdoor `walkingOutline`, and `buffer`/`exitBuffer` in meters, a photograph, a local audio-file path, a transcript, and a source. Add a matching image and audio file under `assets/`. Keep the transcript accurate when replacing audio. Prefer compact MP3 or AAC recordings for future content; Web Audio decodes supported local audio formats. The current short WAV samples need no external voice service.

Styx keeps its 30 m circular entry zone (48 m exit) around an OpenStreetMap artwork coordinate. The outdoor courts and all 54 buildings retain Whitman’s official footprint polygons for distance and overlap decisions. Their listening areas extend to adjacent outdoor approaches through a separate `walkingOutline`, with an 8 m entry margin beyond that area and a 14 m exit margin to reduce GPS jitter. You do not need to enter a building or leave the nearby path. Four frontages (College House, Lavender House, Sherwood House, and Third Space Center) use explicitly documented street-side estimates where separate sidewalk geometry is missing; confirm these on site. A neighboring entry takes over once you leave the current entry; an actual footprint takes priority over an overlapping buffer. Distances to these buildings measure to the footprint. The five residence halls use the same path-based model; their stories and media are preserved. Shared paths near Anderson/Cleveland, Anderson/Stanton, and connected Jewett/Lyman have explicit overlap tests. **Field-test every side on campus with an iPhone before treating the buffers as calibrated.** Stale fixes over 25 seconds old and accuracy estimates worse than 65 m do not trigger automatic stories. Geolocation reports an estimate, not a guaranteed boundary.

## Privacy and services

- No accounts, cookies set by the app, analytics, local storage, session storage, IndexedDB, or service worker.
- Visitor coordinates and preferences exist only in JavaScript memory.
- The browser can remember location permission and cache ordinary site files; the app does not control those browser decisions.
- GitHub serves the static site and has its normal request logs. OpenStreetMap serves map tiles and sees the requested map area, IP address, and normal request metadata. The app does not send raw GPS coordinates to either service.
- The map is constrained to campus, so it does not load map tiles around a remote visitor's home.
- Map availability depends on the public tile service. The landmark list, distances, transcripts, and audio work if tiles fail.
- Follow the [OpenStreetMap tile policy](https://operations.osmfoundation.org/policies/tiles/): attribution stays visible, browser caching stays enabled, and there is no tile prefetch or offline download. This prototype uses free public hosting/services within their published limits; there is no paid plan or custom domain.

## Testing

`npm test` covers geographical distances, entry/exit hysteresis, stale/inaccurate fixes, the complete simulation, local content assets, session reset, audio-loading recovery, and clean production builds. For browser QA with fictional coordinates instead of real location:

```sh
node scripts/create-test-fixture.mjs
npm run dev
```

Open `http://localhost:4173/tests/fixture.html`. The red QA bar can grant/deny mock permission, move between landmarks or their outdoor listening positions, supply an inaccurate or stale fix, simulate visibility changes, fail/restore Cleveland's audio, hold/release audio downloads, and fail/restore map tiles. It uses the real application and real audio. **The fixture is not part of the production build.** Do not publish the repository root as the website; the Pages workflow publishes only `dist/`.

See [the laptop test guide](docs/LAPTOP-TESTING.md) for repeatable scenarios that do not require a campus visit or real location access.

See [the iPhone test checklist](docs/IPHONE-TESTING.md). Desktop responsive tests and mocked GPS are not a substitute for physical Safari tests, OS lock behavior, and an on-campus walk.

## Credits

An independent student project by Cameron, Ahmed, Umar, and Muhammad. It is not an official Whitman College service.

See [content and asset sources](docs/SOURCES.md). Photographs remain the property of their respective rights holders; no open license is asserted for them. Leaflet's BSD 2-Clause license is included at `assets/vendor/leaflet-LICENSE.txt`.
