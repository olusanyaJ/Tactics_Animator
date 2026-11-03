# Tactics Animator Decisions

**Date:** 2026-10-28  
**Status:** Draft

---

## Package responsibilities

apps/web owns the user interface and server-side request handling for parsing instructions, saving and retrieving projects, and requesting exports.

apps/worker owns processing export jobs, so that users receive MP4 export video.

packages/engine owns calculating player movement between points, so that the browser preview and exported video use the same calculation.

packages/schema owns shared data definitions and validation rules, so that different parts of the application agree on data structure.

packages/parser owns converting written football instructions into structured actions, so that the engine can process them

packages/db owns database access, so that projects and squad information can be saved and retrieved

## Import boundaries

An arrow means “imports from.”

### Allowed imports

- apps/web → packages/engine

- packages/engine → packages/schema

- packages/parser → packages/schema
  Reason: the parser uses shared definitions and validation rules for the actions it produces.

- apps/worker → packages/engine

- packages/db → packages/schema
  Reason: database code can use shared definitions for the data it saves and retrieves.

- Server-side apps/web → packages/parser.

- Server-side apps/web → packages/db

### Forbidden imports

- packages/engine must never import apps/web.
  Reason: movement calculations must work independently of the user interface.

- packages/engine must never import packages/parser.
  Reason: movement calculations consume structured actions and remain independent of language parsing.

- packages/schema must never import packages/engine
  Reason: schema can define and validate action data independently

- packages/engine must never import packages/db.
  Reason: movement calculations should work without a database connection.

- apps/worker must never import apps/web.
  Reason: the worker receives export jobs through the queue and runs independently of the web interface.

- packages/schema must never import packages/db.
  Reason: shared data definitions and structural validation work without database access.

- packages/schema must never import another workspace package.
  Reason: shared definitions and validation rules must be usable independently by their consumers.

- packages/parser must never import packages/db.
  Reason: squad information is passed as input, allowing parsing to be tested without a database.

- packages/db must never import packages/parser or packages/engine.
  Reason: saving and retrieving records should work independently of language parsing and movement calculations.

- packages/parser must never import packages/engine.
  Reason: parsing produces structured actions without calculating positions or movement.

- Browser-side apps/web must never import packages/parser.
  Reason: the parser uses a secret API key to convert written football instructions into structured actions.

- Browser-side apps/web must never import packages/db.
  Reason: database access uses credentials and needs server-side permission checks. These responsibilities stay on the server

## General rules

- packages under packages/ must never import applications under apps/.
  Reason: shared packages must not import applications because that would tie reusable logic to application-specific code and make it harder to use independently.

### Project save permissions (MVP)

- Only a project’s owner may save changes. The server uses the authenticated user’s identity and ownership retrieved from storage to authorize updates. Invited editors are deferred until collaboration is introduced.

### Unlisted imports

Unlisted workspace imports are forbidden until reviewed and added to the allowed-import list.

### Movement progress

- Engine accepts finite progress values from 0 to 1, inclusive.
- Progress 0 returns the starting position.
- Progress 1 returns the destination.
- Intermediate progress uses linear interpolation between the two points.
- Negative values, values above 1, NaN, and Infinity cause a RangeError.
- Calculations must not mutate the supplied movement data.

### Minimum movement contract

- Movement contains playerId, from, and to.
- playerId is a string containing at least one non-whitespace character.
- playerId identifies a player consistently within the project.
- from and to each contain x and y coordinates.
- Coordinates must be finite numbers; numeric strings are rejected.
- Pitch limits and squad membership are not checked by this validator.

Example:

```json
{
  "playerId": "p1",
  "from": { "x": 10, "y": 30 },
  "to": { "x": 20, "y": 40 }
}
```

## Main branch protection — solo workflow

The recorded policy for `main` is:

- Changes require a pull request.
- The GitHub Actions `check` job in `.github/workflows/ci.yml` is a required status check. It runs the existing `pnpm check` command.
- The branch being merged must be up to date with `main` before merging.
- Review conversations must be resolved before merging.
- Bypassing these requirements is disabled.
- Force pushes and branch deletion are disallowed.
- Approving reviews are not required for the current solo workflow. Human review of agent changes remains a project responsibility under `AGENTS.md`.

Branch protection is configured on GitHub, separately from `ci.yml`. The workflow defines when checks run and what they execute; it does not enforce merge restrictions. The human reports verifying CI merge enforcement in [PR #1](https://github.com/olusanyaJ/Tactics_Animator/pull/1): a deliberately failing test blocked merging, and restoring it produced passing CI and allowed merging. See the [recorded human verification](agent-log.md#human-reported-verification--pr-1). The agent has not independently inspected live GitHub settings. This verifies observed enforcement at that time, not every individual protection option or a guarantee that settings remain unchanged; this documentation task does not change them.
