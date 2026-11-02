import type { Movement, Point } from '@tactics/schema';

export const template_constant = 'template_constant';

export function interpolateMovement(
  movement: Movement,
  progess: number,
): Point {
  // catches NaN, infinities and progress
  if (!Number.isFinite(progess) || progess < 0 || progess > 1) {
    throw new RangeError('Progress must be a finite number between 0 and 1');
  }
  // returning a new point object using
  const pointMovement = {
    x: movement.from.x + (movement.to.x - movement.from.x) * progess,
    y: movement.from.y + (movement.to.y - movement.from.y) * progess,
  };
  return pointMovement;
}
