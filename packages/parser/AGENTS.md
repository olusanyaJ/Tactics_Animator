## Golden Rules
- Parser converts written football instructions into structured actions.
- Parser may import @tactics/schema for shared definitions and validation.
- Parser must never import engine, database, or application packages.
- Parser must not calculate or guess coordinates and movement.
- Parser runs server-side; real API keys must never appear in source code or browser bundles.