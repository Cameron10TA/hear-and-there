# Hear & There verification routing

Use only rows relevant to the changed behavior. This supplements the full diff
review; filenames alone do not establish that a boundary is unchanged.

## Baseline for code and delivery policy

- Read current `package.json`, `scripts/build.mjs`, and `.github/workflows/pages.yml`
  for actual commands and expected jobs. The current workflow uses Node 22; the
  application has no package dependencies and does not need `npm install` or `npm ci`.
- Run `npm test`, `npm run build`, and `node --check` for changed JavaScript/MJS
  files. Use both a full-branch whitespace check against the recorded merge base
  and `git diff --cached --check` for the staged patch.
- Verify that the published artifact contains only `index.html`, `styles.css`,
  `src/`, `assets/`, and `.nojekyll`, unless the requested change intentionally
  updates that allowlist. Inspect nested files, not just those top-level names.
- The build copies into `dist/`; it does not purge old files. Use a fresh disposable
  checkout/output or inspect an existing output for stale artifacts. Never recursively
  remove a computed path without confirming it is the intended project output.
- Ensure `tests/fixture.html`, `tests/browser-fixture.js`, `.codex-review/`, agent
  instructions, `.git/`, and private local files cannot enter the website artifact.
  The repository may contain shared development instructions; the deployed site must not.
- Review the staged file list and every outgoing commit for accidental attachments,
  credentials, precise personal locations, debug output, or unrelated source.

## Changed surfaces

| Surface | Check the affected behavior |
| --- | --- |
| Consent/location | Denied and revoked permission block both live and demo modes. Retry has a useful explanation. Poor accuracy, unavailable GPS, stale fixes, and off-campus positions do not cause false automatic arrivals. No raw GPS upload or persistent visitor storage is introduced. |
| Proximity/simulation | Entry and exit radii prevent repeated triggering from jitter. A story starts once per session as intended. Both stops are reachable in the simulation; seeking, pausing movement, restarting, and switching back to live location work. No production query flag or fixture bypasses consent. |
| Audio/lifecycle | Audio starts from a user gesture, then automatic arrivals work. Loading failure has a retry path. Pause/resume, mute, completed-story replay, stop changes, and canceled pending sounds behave correctly. Hiding/leaving the page stops audio and tracking; returning requires explicit resume. |
| UI/CSS/HTML | Check an iPhone-sized viewport and desktop, keyboard focus, accessible labels, transcripts, Reduce Motion, horizontal overflow, map controls/attribution, and new console/network errors. Verify actual behavior, not just a screenshot. |
| Landmark/media | Coordinates, radii, filenames, case-sensitive paths, source credits, description, and transcript match the audio. Verify the local asset decodes. Label GPS tuning and physical field evidence accurately. Read `docs/SOURCES.md` when changing facts or images. |
| Maps/external services | HTTPS, visible attribution, campus bounds, tile failure fallback, and normal cache behavior remain intact. No bulk tile prefetch or hidden new provider is introduced. Review changes to the CSP and privacy explanation with the actual requests. |
| Dependencies/toolchain | If dependencies are introduced, inspect the lockfile, package source, executable install hooks, and advisories against the base. Use the CI toolchain and a fresh locked install when a lockfile exists. Scanner/network failure is not a clean audit; do not run `npm ci` against this dependency-free baseline without a lockfile. |
| CI/build/dev tools | Inspect command arguments, filesystem boundaries, artifact allowlists, workflow permissions, fork-PR behavior, credential exposure, expected checks, and deployment only from the authorized target. Exercise a focused negative case when changing a gate. |
| Skills/agent policy | Compare against the existing instructions. Confirm push-only, review-only, follow-up pushes, main deployment, missing tools, mixed worktrees, and physical-device limits preserve scope. Instructions must not grant themselves publication or message-sending authority. |

## Browser and device evidence

For fictional GPS, generate the local-only fixture:

```sh
node scripts/create-test-fixture.mjs
npm run dev
```

Open `http://localhost:4173/tests/fixture.html`. Its labeled QA controls exercise
permission states, both landmarks, off-campus/poor fixes, and visibility changes.
It uses the real app and audio with mocked location. Also inspect the production
entrypoint at `http://localhost:4173/` for fixture leakage and layout changes.

Read `docs/IPHONE-TESTING.md` when audio, location, visibility, or touch behavior
changes. A mocked `visibilitychange` proves a handler, not iOS lock-screen delivery.
Report physical-device and on-campus checks as not run if those environments are
unavailable. Name a concrete blocker if it prevents verification of the changed
behavior; do not silently mark it passed or demand a physical device for prose edits.

## Evidence and stopping conditions

Record command, exit status, candidate SHA and base, and a concise observation for
browser checks. Record correctness and security/privacy separately. Identify reused
evidence by its original scope. Do not convert an unexplained flaky retry into a
clean pass, and do not claim scans, independent reviews, or device tests that did not run.

Unresolved actionable defects, leaked secrets, missing required code checks, mixed
publication scope, or unverified high-impact changes block publication. Repair what
can be repaired within scope. Report remaining limitations precisely instead of
inventing approval requirements or bypassing a failed check.
