## Golden Rules
- Engine packages must never import applications, parser, or database packages.

- Engine may import @tactics/schema for shared data definitions and validation.

- Calculations must work independently of the UI, language parsing, and database connections.

- Engine calculates coordinates and movement from structured actions