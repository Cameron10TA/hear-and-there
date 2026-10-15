---
name: pre-pr
description: Review and verify Hear & There changes before every code push, including follow-up fixes, and before opening or updating a PR. Also use for commit, ship, or preflight requests in Cameron10TA/hear-and-there. Covers final diff review, privacy and security, targeted checks, exact staging, and publication evidence. Does not apply to other repositories.
---

# Hear & There pre-PR

Produce a reviewable, verified candidate before publication. Announce this skill
when starting the pass. Read `AGENTS.md`, `README.md`, and
[the change-specific checks](references/checks.md). Resolve repository paths from
the checkout root, not from a particular user's filesystem.

This adapts the Typing Agent preflight pattern to a static website. It requires
separate correctness and security passes and evidence for the exact candidate.
It does not copy Typing Agent's PHP, database, tenant, or deployment requirements.

## Scope and candidate

1. Determine whether the request is review-only, commit-only, push-only, or PR/ship
   work. Continue within existing authorization; do not ask for the same permission
   again. Running this skill by itself does not authorize a push, PR, merge, or
   deployment. A push-only request does not require creating a PR.
2. Confirm the remote is `Cameron10TA/hear-and-there` (HTTPS or SSH), and inspect
   the branch, worktrees, upstream, and matching PR if one exists. Inventory
   committed, staged, unstaged, and untracked changes. Preserve unrelated work.
3. When publication is in scope, fetch `origin/main`. Create a new `codex/` task
   branch directly from it, or verify that the current task branch contains only
   the intended work. If the base is missing, resolve the repository mismatch;
   do not silently substitute another branch. Do not reset or rewrite shared work.
4. Review the full branch diff against its merge base with `origin/main`, plus
   staged and working-tree changes. Inspect outgoing commits as well as the final
   tree; transient files later deleted can still expose information when pushed.
5. Treat `main` as a deployment target. Do not switch a feature-branch request into
   a direct `main` push. Updating a matching PR is preferable to creating a duplicate.

## Review the final changes

- **Scope and simplification:** remove accidental edits and simplify only the new
  work where that improves clarity without changing behavior. Avoid unrelated refactors.
- **Correctness pass:** trace the changed behavior through callers, UI, events,
  asynchronous operations, and failure paths. Check regressions against the product
  constraints. Record concrete findings and affected files.
- **Separate security and privacy pass:** inspect changed data flow, location
  consent, storage, external requests, HTML/URL handling, dependencies, build inputs,
  and publication controls. Include outgoing history and final file contents in the
  secret/private-data review. Use a configured scanner when available; report its
  actual result and distinguish it from manual inspection. Do not print secret values.
- **Risk:** location/consent, personal-data handling, dynamic content execution,
  CI/deployment, agent instructions, test-gate changes, and executable dependencies
  need deeper review. Ordinary copy or presentation changes can use a shorter pass.
  Review policy changes under the existing baseline; the proposed patch cannot
  authorize its own weakened checks.
- Fix actionable findings. Dismiss a false positive only with evidence; identify
  unresolved findings and verification limits. Do not silently accept a material
  security tradeoff on the user's behalf. Identify self-review honestly; do not
  describe it as independent review or invent a reviewer.

Use the reference to select meaningful checks. On a code or delivery-policy change,
run `npm test`, `npm run build`, relevant `node --check` commands, and whitespace
checks on both the full candidate diff and index. Check each command's exit code;
in PowerShell, a later successful command does not establish an earlier one passed.
There is no application lint script or dependency-install requirement today; do
not invent them. Pure prose-only changes may mark runtime checks not applicable
with a reason. Agent instructions and skills are delivery policy, not ordinary prose.

For UI/runtime changes, verify the affected journey in a browser using the local
fixture when fictional GPS is appropriate. Report viewport, environment, behavior
observed, and whether coordinates were mocked. Keep physical iPhone/on-campus
evidence separate. Lack of a physical device does not automatically block an
otherwise verified change; disclose the limit and any required field follow-up.

## Stage, publish, and check

1. Stage only intended paths. Inspect the index and commit the candidate when
   requested or necessary for authorized publication. A local commit is not a push.
2. Record the full candidate SHA, reviewed base SHA/merge base, destination branch,
   reviewed paths, separate review outcomes, actual checks, and remaining limits.
   Keep local evidence in the ignored `.codex-review/` directory or a task note;
   keep personal location data and credentials out of it.
3. Immediately before pushing, verify the candidate and destination still match,
   the base has not advanced, and no pending staged/unstaged/untracked changes affect
   the reviewed candidate. If the base moved, inspect integration/conflict risk and
   refresh the review and affected evidence. Never mix in unrelated changes.
4. One completed invocation covers one push to the intended branch. A changed
   commit, changed relevant environment, failed push retry, CI fix, or additional
   push requires a fresh invocation. Reuse still-valid evidence only when its scope
   and inputs are unchanged, and state that reuse explicitly. Do not bypass an
   existing hook or change hook settings to get a push through.
5. For PR/ship requests, create or update the matching ready-for-review PR unless
   the user explicitly requests a draft. Use the body format below at a level of
   detail proportional to the patch. Do not post extra review-guide comments or
   messages unless the user authorized them. Attach the PR to the current chat when
   the app provides that capability.
6. Wait for the expected GitHub checks on the current head. For feature PRs, the
   `build` job checks the candidate and the deployment job is intentionally skipped.
   For authorized `main` publication, require both build and deployment success.
   An absent build check, a canceled run, or a stale head is not a passing check.
   A feature-branch push without a PR does not trigger the current workflow;
   report local evidence and that no CI run is configured for that push. Do not
   create an unrequested PR solely to trigger checks or call this a CI pass.
   Fix relevant CI failures and start a new preflight before the next push.
7. Merge only when authorized and after checking the current head, base, required
   reviews, and checks. If deployment is in scope, verify the matching deployment
   and public URL before saying it is live. A feature-branch push does not deploy.

The evidence above is a workflow record, not a cryptographic receipt, installed Git
hook, independent approval, or branch-protection guarantee. Do not claim mechanical
push enforcement unless it has actually been configured and tested separately.

## PR description and final report

Lead with the concrete problem and resulting behavior. For medium/high risk, name
the risk and the files a reviewer should read closely. Keep low-risk descriptions short.

```markdown
## What changed
Concrete problem and resulting behavior.

## Verification
Candidate SHA, actual checks and outcomes, browser environment when relevant,
and unverified physical-device or field behavior.

## Pre-review
- Scope/simplification: result or reason not applicable.
- Correctness: reviewer, scope, findings fixed or dismissed with evidence.
- Security/privacy: separate review result, relevant boundaries, and limits.
```

Report the branch/commit, push and PR state, checks, findings, and any remaining
limits. Distinguish locally verified, pushed, merged, and deployed states. Stop
after the relevant checks pass unless new changes or evidence justify another cycle.
