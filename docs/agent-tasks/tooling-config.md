# Shared tooling configuration

## Goal

Set up shared TypeScript, ESLint, Prettier, and Vitest configuration
for all six workspace projects, with consistent root scripts.

## Context

- This is a pnpm monorepo with apps/web, apps/worker,
  packages/engine, packages/schema, packages/parser, and packages/db.
- Read the root and applicable package AGENTS.md files.
- Follow the responsibilities and import boundaries in docs/decisions.md.
- Existing JavaScript files demonstrate Web importing Engine.
- No application framework has been configured yet.

## Constraints

- Keep changes focused on tooling and the minimal source migration
  needed to verify it.
- Preserve the existing Web-to-Engine import demonstration.
- Do not add application features, external services, or credentials.
- Do not change architectural boundaries.
- Do not commit or push.
- Follow the configured approval process for network access.
- Explain configuration choices and report any blocked checks.

## TypeScript choices

Set these options inside compilerOptions in the shared TypeScript configuration.

```json
{
  "strict": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitReturns": true,
  "noFallthroughCasesInSwitch": true,
  "noImplicitOverride": true
}
```

## Root scripts

Provide:

- typecheck: check all six workspace projects.
- lint: check code without modifying files.
- format: format supported project files.
- format:check: check formatting without modifying files.
- test: run Vitest once and exit.
- check: run typecheck, lint, format:check, and test.

## Done-check

- All six workspace projects extend the shared TypeScript configuration.
- Existing source files are included in type checking.
- ESLint and Prettier work together without conflicting formatting rules.
- Vitest is configured to discover tests across all six projects.
- Report an empty test suite honestly; do not treat zero tests as proof
  that testing works. The six package smoke tests belong to Task 005.
- Run the available checks and report their results.
- Update the root AGENTS.md Commands section to reflect working commands.
- Explain changed files, dependencies, and any remaining limitations.
