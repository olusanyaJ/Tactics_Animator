import { test, expect, vi } from 'vitest';
import { renderMovementFrame } from '../src/index.ts';

test('passes the calculated positon to the renderer', () => {
  const playerMovement = {
    playerId: 'Mainoo',
    from: { x: 10, y: 30 },
    to: { x: 20, y: 40 },
  };

  const renderer = vi.fn();
  renderMovementFrame(playerMovement, 0.5, renderer);
  expect(renderer).toHaveBeenCalledExactlyOnceWith({ x: 15, y: 35 });
});
