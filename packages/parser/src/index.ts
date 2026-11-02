import { isMovement } from '@tactics/schema';
import type { Movement } from '@tactics/schema';

// call back type, means Parser must validate the output with isMovement before trusting it.
type InterpreterCallBack = (instructions: string) => unknown;

type ParseResult =
  | { ok: true; movement: Movement }
  | { ok: false; reason: 'invalid-movement' }
  | { ok: false; reason: 'unknown-player' };

export function parseMovement(
  instructions: string,
  playerIds: readonly string[],
  interpreter: InterpreterCallBack,
): ParseResult {
  const candidate = interpreter(instructions);
  if (!isMovement(candidate)) {
    return { ok: false, reason: 'invalid-movement' };
  }
  if (!playerIds.includes(candidate.playerId)) {
    return { ok: false, reason: 'unknown-player' };
  }
  return { ok: true, movement: candidate };
}
