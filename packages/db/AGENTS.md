## Golden Rules

- DB owns saving and retrieving project and squad data.
- DB may import @tactics/schema for shared definitions and validation.
- DB must never import engine, parser, or application packages.
- Database access runs server-side; credentials must never appear in source code or browser bundles.
- Database operations must respect the project’s permission checks.