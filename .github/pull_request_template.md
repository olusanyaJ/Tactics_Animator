## Author

me / agent / mixed — choose one.

## Summary

What changed, and why?

## Contributions

- **Human contribution:** Describe implementation, decisions, and review performed.
- **Agent contribution:** Describe implementation, investigation, or explanations; write none if not used.
- **Human review of agent changes:** Describe what was reviewed, or mark pending.

## Validation

Record actual results for the current changes. Use pending or not run with a reason; do not prefill successful results. Distinguish local execution from GitHub CI. An empty test suite is not a pass.

`pnpm check` runs typechecking, lint, formatting checks, and tests together, stopping at the first failure. A complete successful run covers all four; separate runs need not be repeated. If it stops early, report which stages ran and which did not. Record separate commands only when useful for diagnosis or partial validation.

| Command                 | Result and evidence                                                                |
| ----------------------- | ---------------------------------------------------------------------------------- |
| `pnpm check`            | Pending; include the stages reached and test count, or report no tests found       |
| Separate checks, if run | Optional: command and result; no repetition required after a successful pnpm check |
| `pnpm check:engine`     | Applicable when the import demo changes; otherwise record not applicable           |
| `git diff --check`      | Pending                                                                            |

GitHub CI result or run link: pending.

## Remaining limitations

Describe known gaps, failures, deferred work, and unverified assumptions.

## Review checklist

Leave items unchecked until verified. Explain any item that does not apply.

- [ ] Package ownership and allowed workspace imports follow docs/decisions.md.
- [ ] Server/browser separation is preserved, including indirect imports.
- [ ] No secrets or credentials are included.
- [ ] Relevant checks pass; failures and incomplete validation are disclosed.
- [ ] Meaningful tests cover changed behavior where needed.
- [ ] Documentation reflects the changes and remaining limitations.
- [ ] The human has reviewed all agent changes, or confirmed there are none.
