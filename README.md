# Tactics Animator

A football tactics animation tool in development. The goal is to turn written tactical explanations into animated pitch graphics that can be exported as MP4 videos.

For example: “Mainoo drops between the centre-backs, Dalot overlaps.”

## Current status

The workspace foundation and initial smoke tests are complete:

- Six workspace packages with documented responsibilities and import boundaries.
- Strict TypeScript checking, ESLint, Prettier, and Vitest.
- 19 passing tests across all six packages.
- Movement validation and linear interpolation.
- Parser validation using a supplied interpreter callback.
- Worker frame delegation using a supplied renderer callback.
- Owner-only save permission checks using fake storage callbacks.
- A Web-to-Engine import smoke test.

Real AI interpretation, browser preview, authentication, database persistence, video export, and CI enforcement are not implemented yet.

## Why I’m building it

I am a lifelong Manchester United fan and make football tactics content as [@fobillabong](https://instagram.com/fobillabong). Showing a move on screen meant using a paid tactics board and dragging every player into place by hand, which was slow and pulled me away from the analysis itself.

I want to describe a move the way I would explain it in a video, review the animation, and export it. Corrections should also be possible through written instructions.

## Planned workflow

The core rule: **the AI interprets instructions; the engine calculates positions and movement.**

The intended workflow is:

1. The user types a tactical explanation.
2. A language model converts the explanation into structured actions from a defined vocabulary.
3. Validation checks the action structure, players, and references. Invalid or ambiguous instructions require correction rather than guessed coordinates.
4. The engine turns valid actions into timed movements.
5. The browser previews the animation.
6. A server-side worker renders and exports an MP4 using the same movement calculations.

The current Parser accepts a supplied callback and validates its returned movement. It does not call a language model or implement the planned action vocabulary yet.

## Package responsibilities

| Package           | Responsibility                                       |
| ----------------- | ---------------------------------------------------- |
| `apps/web`        | User interface and server-side request handling      |
| `apps/worker`     | Export job processing and rendering orchestration    |
| `packages/engine` | Movement calculations                                |
| `packages/schema` | Shared data definitions and validation               |
| `packages/parser` | Written instructions to validated structured actions |
| `packages/db`     | Database access and permission checks                |

## Architectural boundaries

Allowed workspace imports:

- Web → Engine.
- Server-side Web → Parser and DB.
- Worker → Engine.
- Engine → Schema.
- Parser → Schema.
- DB → Schema.

Browser code must never import Parser or DB, directly or indirectly. Shared packages must never import applications. Unlisted workspace imports are forbidden until reviewed and added to the allowed list.

The full decision log is in [`docs/decisions.md`](docs/decisions.md).

## Current behavior

### Movement validation

A movement contains a nonblank `playerId` and two points, `from` and `to`. Each point contains finite numeric `x` and `y` coordinates.

Numeric strings are rejected. Pitch bounds and squad membership are not checked by the movement validator.

### Movement calculation

The engine uses linear interpolation between the starting and destination points.

Progress must be a finite number from 0 to 1, inclusive:

- `0` returns the starting position.
- `1` returns the destination.
- Intermediate values return the corresponding position.
- Invalid progress throws a `RangeError`.

Calculations do not modify the supplied movement.

### Parser validation

The Parser calls a supplied interpreter, validates its output, and checks that the player belongs to the supplied squad.

It returns either a valid movement or an `invalid-movement` or `unknown-player` result.

### Project save permissions

Only a project’s owner may save changes. The server must supply the authenticated user’s identity, and ownership must come from storage.

The current DB tests use fake callbacks to verify that:

- An owner can save.
- Another user is rejected without saving.
- A missing project is rejected without saving.

Actual database persistence and authentication remain future work. Invited editors are deferred until collaboration is introduced.

## Tooling

| Tool            | Purpose                                         |
| --------------- | ----------------------------------------------- |
| TypeScript      | Strict type checking                            |
| ESLint          | Code quality checks                             |
| Prettier        | Consistent formatting                           |
| Vitest          | Automated tests                                 |
| pnpm workspaces | Dependency management and local package linking |

The project currently uses Node’s TypeScript support without an application build system.

Web browser source and server source are checked separately. Engine and Schema source use an environment-neutral configuration. Tests use Node types.

Tooling does not enforce every architectural boundary; the documented import rules still apply.

## Planned technology

The broader design proposes Next.js and React, tRPC, Zod, Canvas 2D, Postgres, authentication, Redis with BullMQ, and server rendering with FFmpeg.

These are planned components, not the current installed application stack. The database ORM remains undecided.

Linux hosting, deployment automation, browser tests, and GitHub Actions are also future work.

## Getting started

Prerequisites:

- Node **24.22.1**, matching `.nvmrc`.
- pnpm **12.16.1**, matching `packageManager`.

From the repository root:

```bash
nvm use
pnpm install
pnpm check
```

Docker is not required for the current smoke tests.

## Commands

Run these from the repository root:

| Command             | Purpose                                               |
| ------------------- | ----------------------------------------------------- |
| `pnpm typecheck`    | Check root tooling and all workspace source and tests |
| `pnpm lint`         | Run ESLint; warnings fail                             |
| `pnpm format`       | Format supported project files                        |
| `pnpm format:check` | Check formatting without modifying files              |
| `pnpm test`         | Run the automated tests once                          |
| `pnpm check`        | Run typechecking, lint, formatting checks, and tests  |
| `pnpm check:engine` | Run the Web-to-Engine import demonstration            |
| `git diff --check`  | Check the diff for whitespace errors                  |

The import demonstration should print `template_constant`.

## Testing and quality checks

The current suite contains 19 tests across six packages. It checks movement validation, interpolation, Parser validation, Worker delegation, DB permission behavior, and the Web-to-Engine import.

These tests establish the initial behavior and verify the tooling. They do not establish a working AI service, database, browser application, or video export pipeline.

CI and branch protection will be configured separately so pull requests must pass the required checks before merging.

## Working with an AI agent

This is a user-led project. I write the core behavior with explanations and review support, while Codex assists with tooling, boilerplate, debugging, tests, and documentation when requested.

A root `AGENTS.md` and package-level instructions define responsibilities and boundaries. Changes must follow those rules and pass the relevant checks.

Secrets stay outside the repository. Network access follows the configured approval process, and pushing requires explicit human approval.

## Roadmap

- [x] Create the workspace and document package boundaries.
- [x] Add strict TypeScript, linting, formatting, and test tooling.
- [x] Add initial behavior and smoke tests across all six packages.
- [ ] Configure CI and required pull request checks.
- [ ] Build formations, action handling, and browser preview.
- [ ] Integrate AI parsing and an evaluation set.
- [ ] Add advanced actions, overlays, and corrections.
- [ ] Add authentication and persistent saved projects.
- [ ] Build the export queue and MP4 rendering.
- [ ] Configure Linux hosting and deployment automation.
- [ ] Record a working demo and refine the tool through real use.

## License

MIT.
