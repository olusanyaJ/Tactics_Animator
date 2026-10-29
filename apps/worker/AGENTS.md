## Golden Rules

- Worker owns processing animation export jobs.
- Worker may import @tactics/engine to calculate movement for exported animations.
- Worker must never import apps/web.
- Worker uses Engine’s movement calculations so exports stay consistent with browser previews.
- Other workspace imports require review and addition to docs/decisions.md.