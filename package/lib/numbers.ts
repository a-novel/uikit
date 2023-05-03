/**
 * Generate a bounded random number.
 */
export const rand = (a: number, b: number): number => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min) + min);
};
