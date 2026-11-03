import { test, expect, vi } from 'vitest';
import { saveProject } from '../src/index.ts';

// this test rejects saving another user's project
test("rejects saving another user's project", async () => {
  const ownerLookup = async () => 'user-1';

  const saveSpy = vi.fn(async () => {});

  const result = await saveProject('project-1', 'user-2', ownerLookup, saveSpy);

  // Assertion
  expect(result).toEqual({ ok: false, reason: 'forbidden' });
  expect(saveSpy).not.toHaveBeenCalled();
});

// this test allows the owner to save their project
test('allows the owner to save their project', async () => {
  const ownerLookup = async () => 'user-1';

  const saveSpy = vi.fn(async () => {});

  const result = await saveProject('project-1', 'user-1', ownerLookup, saveSpy);
  // Assertion
  expect(result).toEqual({ ok: true });
  expect(saveSpy).toHaveBeenCalledExactlyOnceWith('project-1');
});

// this test rejects saving a missing project
test('rejects saving a missing project', async () => {
  const ownerLookup = async () => null;

  const saveSpy = vi.fn(async () => {});
  const result = await saveProject('project-1', 'user-1', ownerLookup, saveSpy);

  expect(result).toEqual({ ok: false, reason: 'not-found' });
  expect(saveSpy).not.toHaveBeenCalled();
});
