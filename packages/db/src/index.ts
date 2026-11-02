type SaveResult =
  { ok: true } | { ok: false; reason: 'forbidden' | 'not-found' };

/* call back type, means Parser must validate the output with isMovement before trusting it.
 it returns a Promise because database access is asynchronous. */
type FindProjectOwner = (projectId: string) => Promise<string | null>;

// Promise<void> means saving completes asynchronously without returning a value. If it fails, the promise rejects.
type SaveChanges = (projectId: string) => Promise<void>;

export async function saveProject(
  projectId: string,
  userId: string,
  findProjectOwner: FindProjectOwner,
  saveChanges: SaveChanges,
): Promise<SaveResult> {
  const ownerId = await findProjectOwner(projectId);
  if (ownerId === null) {
    return { ok: false, reason: 'not-found' };
  } else if (ownerId !== userId) {
    return { ok: false, reason: 'forbidden' };
  }
  await saveChanges(projectId);
  return { ok: true };
}
