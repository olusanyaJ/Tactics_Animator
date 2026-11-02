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

Run these commands from the repository root using the Node version in `.nvmrc` and the pinned pnpm version.

- `pnpm install`: dependency setup only when needed; network access follows the configured approval process.
- `pnpm list -r --depth -1`: list all six workspace projects and the root.
- `pnpm typecheck`: check root tooling plus source and Node-based tests in all six workspace projects, including Web server source.
- `pnpm lint`: check JavaScript and TypeScript without modifying files; warnings fail.
- `pnpm format`: format supported project files. This modifies files; use only within authorized scope.
- `pnpm format:check`: check formatting without modifying files.
- `pnpm test`: run Vitest once across all six workspace projects. An empty suite fails and does not establish test coverage. Package smoke tests belong to Task 005.
- `pnpm check`: run typecheck, lint, format:check, and test in order; stop on the first failure.
- `pnpm check:engine`: run the TypeScript Web-to-Engine import demonstration in apps/web/src/server/check-engine.ts. Expected output: template_constant.
- `git status --short --untracked-files=all`: review changed and untracked files before staging or committing.

The shared TypeScript base preserves the six selected strictness flags and provides only ES2023 globals with `types: []`. NodeNext ESM resolution, no emit, and erasable TypeScript support the current Node runtime without adding a build system.

Web source is browser code by default (DOM libraries, no Node types); `apps/web/src/server/` is checked separately with Node types. Engine and Schema source use the environment-neutral base. Worker, Parser, and DB source use `tsconfig.node.json`. Every package checks Node-based tests separately using `tsconfig.test.json`. Keep Node test helpers in `tests/` or test/spec files, not portable source. Root `tsconfig.json` checks TypeScript tooling and JavaScript configuration files with Node types. Empty projects include their package manifest; this is not proof of tested behavior.

ESLint scopes Node globals to server source, root configs, and tests; browser globals apply only to Web source outside server/tests. Browser and portable Engine/Schema source reject Node built-in imports and direct Node-only globals. Prettier owns formatting, with eslint-config-prettier last. Vitest uses the Node environment; browser-specific tests need a deliberate environment choice later. These checks do not enforce all architectural import boundaries or prevent Node ambient types introduced by dependencies; docs/decisions.md still governs workspace imports. TypeScript excludes control initial files, not the transitive import graph. Node tests can import shared source, but that source must also pass its separate environment-neutral check.

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
