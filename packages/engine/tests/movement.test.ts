import { test, expect } from 'vitest';
import { interpolateMovement } from '../src/index.ts';

// this test calculates the halfway position returns the result
test('calculates the halfway position', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  const result = interpolateMovement(playerMovement, 0.5);

  expect(result).toEqual({ x: 15, y: 35 });
});

// this tests return the starting postion at progress zero
test('return the starting postion at progress zero', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  const result = interpolateMovement(playerMovement, 0);

  expect(result).toEqual({ x: 10, y: 30 });
});

// this tests return the destination postion at progress zero
test('return the destination postion at progress one', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  const result = interpolateMovement(playerMovement, 1);

  expect(result).toEqual({ x: 20, y: 40 });
});

// this test rejects progress greater than one and returns the range error
test('rejects progress greater than one', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  expect(() => interpolateMovement(playerMovement, 1.5)).toThrow(RangeError);
});

// this test rejects values below zero and returns the range error
test('rejects values below zero', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  expect(() => interpolateMovement(playerMovement, -0.1)).toThrow(RangeError);
});

// this test rejects an invalid numeric result and returns the range error
test('rejects an invalid numeric result', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  expect(() => interpolateMovement(playerMovement, NaN)).toThrow(RangeError);
});

// this test rejects an infinite progress and returns the range error
test('rejects infinite progress', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  expect(() => interpolateMovement(playerMovement, Infinity)).toThrow(
    RangeError,
  );
});

// this test does not modfiy the movement but checks whether calling it changes the input
test('does not modify the movement', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  interpolateMovement(playerMovement, 0.5);

  expect(playerMovement).toEqual({
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  });
});
