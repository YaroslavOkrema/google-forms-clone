const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null;

export const getApiErrorMessage = (
  error: unknown,
  fallback: string,
): string | null => {
  if (!error) {
    return null;
  }

  if (isRecord(error) && typeof error.message === 'string') {
    return error.message;
  }

  return fallback;
};
