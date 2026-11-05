# Agent contribution log

I use this Log to record how i worked with Codex, what went wrong, what caused it and what i learned.

This log records human and agent contributions, the evidence checked, corrections, and unfinished work. It supports learning and review; an entry is not proof of approval, a passing CI run, or deployment. Do not reconstruct authorship or historical check results from source files alone. Use `pending` for unverified details and link evidence where available.

## CI workflow push permissions

- **What I did** - Codex drafted the CI workflow. I reviewed it, tried pushing the branch, and updated my GitHub token permissions after GitHub rejected the push. The next push succeeded.
- **What went wrong** - GitHub rejected my first push - the CI workflow push containing ci.yml.
- **Root cause** - The token Git was using lacked permission to create or update workflow files. Updating my fine-grained token permissions resolved it.
- **Next time** - Check repository and workflow permissions when setting up Git authentication.

[Related PR #1](https://github.com/olusanyaJ/Tactics_Animator/pull/1)

## 2026-11-02 — Documentation and review drafts

- **What I did** - Codex drafted the documentation and I reviewed the drafts and directed corrections.
- **What went wrong** - The agent log was too long and impersonal. README also described CI as future work after it was implemented.
- **Root cause** — The log focused on recording verification details instead of explaining my experience. The documentation needed a consistency review after the CI work.
- **Next time** — I’ll give Codex a short reflection template, write the lessons in my own words, and check that project status statements match what I’ve completed.

## Human-reported verification — PR #1

- **What I did** — I changed the error returned when a project has no owner ID to see whether a failing test would block the merge.
- **What went wrong** — The save-project test failed as intended, GitHub CI turned red, and the merge was blocked. I restored the expected error, CI passed, and GitHub let me merge the PR.
- **Root cause** — The returned error didn’t match the test assertion. Branch protection required the CI check to pass.
- **Next time** — I’ll deliberately fail a test and then restore it to verify that the merge is blocked on red and allowed on green.

[Commit that triggered the failure](https://github.com/olusanyaJ/Tactics_Animator/pull/1/changes/88d9d0cf68f31fb5b82b24e84a7861859593f304)
