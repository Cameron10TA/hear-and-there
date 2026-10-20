# Hear & There agent instructions

This repository is `Cameron10TA/hear-and-there`, a browser-only campus audio
experience hosted on GitHub Pages. Read `README.md` for the current architecture.

## Add or revise locations

Use [the add-location skill](.agents/skills/add-location/SKILL.md) when adding
campus stops or revising their listening boundaries. It covers outdoor path
coverage, sourced content and media, simulation integration, and validation.
Apply it even when the user does not name the skill. Respect current team
assignments and the user's requested scope.

## Before publication

Read and complete [the pre-PR skill](.agents/skills/pre-pr/SKILL.md) before every
`git push`, including push-only requests, follow-up commits, and CI fixes, and
before opening or updating a pull request. Apply it even when the user does not
name the skill. A completed review covers one push of the exact reviewed commit;
changes afterward require a fresh pass. Honor publication authorization already
given in the conversation; the skill does not grant new authorization.

Use a `codex/` task branch based on freshly fetched `origin/main`, and preserve
unrelated work. A push to `main` deploys the public website. Use a feature branch
unless the user has authorized direct publication to `main`. Do not merge a PR
solely because its checks passed.

## Product constraints

Unless the user's current request explicitly changes these requirements:

- Use plain HTML, CSS, and JavaScript, free services, and no database or accounts.
- Keep visitor location and preferences in memory only. Require location consent
  for both live and simulated exploration.
- Preserve the initial tap to enable audio, pause-on-hide behavior, and explicit
  resume. Desktop tests are not evidence of physical iPhone lock-screen behavior.
- Keep landmark content in `src/landmarks.js` and audio/transcripts consistent.
- Publish only the output of `scripts/build.mjs`. Keep test fixtures, local review
  artifacts, credentials, and agent instructions out of the website artifact.

These are agent workflow instructions, not an installed Git hook or GitHub branch
protection. Do not claim that other clients are mechanically prevented from pushing.
