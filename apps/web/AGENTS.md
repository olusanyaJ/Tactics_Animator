## Golden Rules

- Web owns the user interface and server-side request handling.
- Browser code collects instructions and displays animations.
- Web may import @tactics/engine for movement calculations.
- Only server-side web code may import @tactics/parser and @tactics/db.
- Browser code must never import parser or DB, or receive real API keys and database credentials.
- Web delegates parsing to Parser and movement calculations to Engine.
- Browser code must not import Parser or DB directly or indirectly, including through shared modules or barrel exports.