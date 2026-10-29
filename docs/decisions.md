# Tactics Animator Decisions

**Date:** 2026-10-28  
**Status:** Draft

---

## Package responsibilities

apps/web owns the user interface for entering tactical instructions, so that users can review animations.

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


### Umlisted imports
Unlisted workspace imports are forbidden until reviewed and added to the allowed-import list.