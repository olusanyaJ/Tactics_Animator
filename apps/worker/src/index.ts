import { interpolateMovement } from '@tactics/engine';

// worker currently imports Engine only, so we can derive its input and output types from engine’s function
// gets the first parameter’s type: your movement.
type Movement = Parameters<typeof interpolateMovement>[0];
// gets the returned position’s type
type Point = ReturnType<typeof interpolateMovement>;

// renderer callback type, accepts one parameter and returns void
type RendererCallback = (position: Point) => void;

// function calls Engine, then passes the calculated position to your renderer
export function renderMovementFrame(
  movement: Movement,
  progess: number,
  renderer: RendererCallback,
): void {
  const positon = interpolateMovement(movement, progess);
  renderer(positon);
}
