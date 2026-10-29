# Tactics Animator Agent Instructions

## Golden rules
- Before changing or reviewing code, read docs/decisions.md and follow its package ownership and import boundaries.

- Before declaring work complete, run the relevant available checks listed under Commands. If a check fails or is unavailable, report the failure and do not claim completion.

- Before pushing to GitHub, Codex must ask before pushing.

- The browser-side web interface collects instructions and sends them to server-side code, Parser interprets football instructions into structured actions, the parser must never guess coordinates and the Engine calculates coordinates and movement from those actions.

## Policy for unlisted workspace imports

- Unlisted workspace imports are forbidden until reviewed and added to the allowed-import list in docs/decisions.md.

- Declare each dependency in the importing package’s package.json.

- Do not treat a dependency declaration as permission to violate an architectural boundary.

## Secret rules
- Never read, print, or copy real credentials into project files, prompts, logs, or Git history.

- Use placeholders in example configuration.

- If credentials are encountered accidentally, stop and report their location without revealing their values.

## Repository map

- `apps/web`: owns the user interface for entering tactical instructions and reviewing animations, plus server-side request handling for parsing instructions, saving projects, and requesting exports
- `apps/worker`: owns processing export jobs
- `packages/engine`: owns calculating player movement between points
- `packages/schema`: owns shared data definitions and validation rules
- `packages/parser`: owns converting written football instructions into structured actions
- `packages/db`: owns database access

## Commands

- Run these commands from the repository root.

- Run pnpm install only when dependency setup or dependency changes require it. It is not a routine completion check.

- `pnpm install`
  Installs workspace dependencies and links declared local package dependencies.
  May require network access; follow the configured approval process.

- `pnpm list -r --depth -1`
  Lists workspace projects so package names and locations can be checked.

- `node apps/web/src/check-engine.js`
  Checks that web can import and use the engine's named export.
  Expected output: template_constant.

- `git status --short --untracked-files=all`
  Shows changed and untracked files for review before staging or committing.

Lint, TypeScript checking, and automated tests are not configured yet.
Do not claim these checks passed. Update this section as they are added.

## Human and agent responsibilities

- The human owns architectural decisions and reviews changes.

- Codex defaults to hints, explanations, and small step-by-step goals so the human can implement and learn.

- Codex writes or modifies project code only when the human explicitly requests implementation. If the request is unclear, ask before editing.

- Codex flags work outside the current task and asks before expanding the scope.

## Definition of done

- The requested goal is met within the agreed scope.
- Changes follow the package responsibilities and import boundaries in docs/decisions.md and applicable AGENTS.md files.
- Relevant available checks listed under Commands have passed.
- Failed or unavailable checks are reported clearly; incomplete validation is not described as complete.
- Changes have been reviewed for accidentally included secrets, unrelated edits, and temporary debugging code.
- Documentation is updated when behavior, commands, or architectural decisions change.
- The final response explains what changed, what was checked, and any remaining limitations.
- Completion does not include pushing to GitHub unless the human explicitly approves the push.