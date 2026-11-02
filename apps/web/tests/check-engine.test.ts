import { test, expect } from 'vitest';
// runs a separate process and captures its output.
import { spawnSync } from 'node:child_process';
// converts a file URL into a filesystem path.
import { fileURLToPath } from 'node:url';

test('runs the Web to Enginer import demo', () => {
  // This locates the script relative to the test file, so it doesn’t depend on where you run the command.
  const scriptPath = fileURLToPath(
    new URL('../src/server/check-engine.ts', import.meta.url),
  );

  const result = spawnSync(process.execPath, [scriptPath], {
    encoding: 'utf8',
  });

  expect(result.error).toBeUndefined();
  expect(result.status).toBe(0);
  expect(result.stdout.trim()).toBe('template_constant');
  expect(result.stderr).toBe('');
});
