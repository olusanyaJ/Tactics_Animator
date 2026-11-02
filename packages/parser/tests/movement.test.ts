import { test, expect } from 'vitest';
import { parseMovement } from '../src/index.ts';

// this test rejects a player outside the squad
test('rejects a player outside the squad', () => {
  const playerMovement = {
    playerId: 'p99',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  // set the supplied squad to ['p1']
  const suppliedSquad: string[] = ['p1'];
  // fake interpreter that returns theat movement
  const interpreter = () => playerMovement;

  // Calling parseMovement with instruction text, the squad, and  interpreter.
  const result = parseMovement('Move p99 forward', suppliedSquad, interpreter);

  // Assertion
  expect(result).toEqual({ ok: false, reason: 'unknown-player' });
});

// this test accepts a squad player
test('accepts a squad player', () => {
  const playerMovement = {
    playerId: 'p1',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };
  const suppliedSquad: string[] = ['p1'];
  const interpreter = () => playerMovement;
  // Calling parseMovement with instruction text, the squad, and  interpreter.
  const result = parseMovement(
    'Valid movement for p1',
    suppliedSquad,
    interpreter,
  );
  // Assertion
  expect(result).toEqual({ ok: true, movement: playerMovement });
});

test('rejects malformed movement', () => {
  const playerMovement = {
    p1: 'p99',
    from: { x: 10, y: 30 },
    to: { x: '20', y: 40 },
  };
  const suppliedSquad: string[] = ['p1'];
  const interpreter = () => playerMovement;
  // Calling parseMovement with instruction text, the squad, and  interpreter.
  const result = parseMovement(
    "Movement for p1 with to.x: '20'",
    suppliedSquad,
    interpreter,
  );

  // Assertion
  expect(result).toEqual({ ok: false, reason: 'invalid-movement' });
});
