// define and export custom point type
export type Point = {
  x: number;
  y: number;
};

// define and export custom movement type
export type Movement = {
  playerId: string;
  from: Point;
  to: Point;
};

function isFinitenumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value);
}

function isPoint(value: unknown): value is Point {
  if (
    typeof value === 'object' &&
    value != null &&
    'x' in value &&
    'y' in value
  ) {
    return isFinitenumber(value.x) && isFinitenumber(value.y);
  }
  return false;
}

export function isMovement(value: unknown): value is Movement {
  if (
    typeof value === 'object' &&
    value != null &&
    'playerId' in value &&
    'from' in value &&
    'to' in value
  ) {
    return (
      typeof value.playerId === 'string' &&
      value.playerId.trim().length > 0 &&
      isPoint(value.from) &&
      isPoint(value.to)
    );
  }
  return false;
}
