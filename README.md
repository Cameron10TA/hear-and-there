# Hear & There

A browser-only audio walk at Whitman College in Walla Walla. The seven stops are **Styx**, the **outdoor tennis courts**, **Penrose Library**, **Cleveland Commons**, **Jewett Hall**, **Lyman House**, and **Anderson Hall**.

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
4. Walk near a landmark. A short original synthesized arrival sound introduces its sample narration. Each story starts automatically once per session; the play button can replay it.
5. The map and distance indicators remain active between stops. No routes or turn-by-turn directions are provided.
6. Locking the screen or leaving the page pauses audio, GPS watching, and simulation. Return and tap **Resume exploring**; a fresh location request checks access again. Tap the story's play button to resume an interrupted narration.
7. **End walk** clears the session location and visited stops. A reload also starts fresh.

The simulation follows fixed test positions and includes a time slider and jump buttons. It is a presentation tool, not a recommended walking route. Location consent is still required, but real coordinates are not used to move its marker.

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

Edit `src/landmarks.js`. Each entry includes latitude/longitude, an entry radius and larger exit radius, a photograph, a local audio-file path, a transcript, and a source. Add a matching image and audio file under `assets/`. Keep the transcript accurate when replacing audio. Prefer compact MP3 or AAC recordings for future content; Web Audio decodes supported local audio formats. The current short WAV samples need no external voice service.

Styx uses an OpenStreetMap artwork coordinate. The campus locations use Whitman's official interactive-map polygons; the residence hall triggers are placed on exterior paths. **These are starting points: verify the circles on campus with an iPhone.** Entry radii range from 18 m to 42 m. Larger exit radii reduce GPS jitter. Stale fixes over 25 seconds old and accuracy estimates worse than 65 m do not trigger automatic stories. Geolocation reports an estimate, not a guaranteed boundary.

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

Open `http://localhost:4173/tests/fixture.html`. The red QA bar can grant/deny mock permission, move between landmarks, supply an inaccurate or stale fix, simulate visibility changes, and fail/restore Cleveland's audio request. It uses the real application and real audio. **The fixture is not part of the production build.** Do not publish the repository root as the website; the Pages workflow publishes only `dist/`.

See [the laptop test guide](docs/LAPTOP-TESTING.md) for repeatable scenarios that do not require a campus visit or real location access.

See [the iPhone test checklist](docs/IPHONE-TESTING.md). Desktop responsive tests and mocked GPS are not a substitute for physical Safari tests, OS lock behavior, and an on-campus walk.

## Credits

An independent student project by Cameron, Ahmed, Umar, and Muhammad. It is not an official Whitman College service.

See [content and asset sources](docs/SOURCES.md). Photographs remain the property of their respective rights holders; no open license is asserted for them. Leaflet's BSD 2-Clause license is included at `assets/vendor/leaflet-LICENSE.txt`.
