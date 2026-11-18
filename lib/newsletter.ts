export function normalizeEmail(email: unknown): string | null {
  if (typeof email !== 'string') return null;
  const value = email.trim().toLowerCase();
  if (value.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return null;
  return value;
}

export function newsletterCopy(email: string) {
  return `AJ Accessories newsletter signup for ${email}`;
}
