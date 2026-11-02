import { test, expect } from 'vitest';
import { isMovement } from '../src/index.ts';

// this test calls the real validator and checks that valid movement returns true
test('accepts valid movement data', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  const result = isMovement(playerMovement);

  expect(result).toBe(true);
});

// this test checks that the validator rejectsa numeric string cordinate rather than accepting everything.
test('rejects a numeric string cordinate', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: '20', y: 40 },
  };

  const result = isMovement(playerMovement);

  expect(result).toBe(false);
});

// this test checks that the validator rejects a blank playerID rather than accepting everything.

test('rejects a blank playerID', () => {
  const playerMovement = {
    playerId: '   ',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  const result = isMovement(playerMovement);

  expect(result).toBe(false);
});
