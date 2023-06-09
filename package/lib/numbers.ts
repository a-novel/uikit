/**
 * Generate a bounded random number.
 */
export const rand = (a: number, b: number): number => {
  const min = Math.min(a, b);
  const max = Math.max(a, b);
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Convert a number to a string, shortening it if necessary by adding a unit for missing digits.
 */
export const shortenNumber = (n: number): string => {
  const absN = Math.abs(n);
  switch (true) {
    case absN < 1000:
      return n.toString();
    case absN < 1000000:
      return `${(n / 1000).toFixed(1)}k`;
    case absN < 1000000000:
      return `${(n / 1000000).toFixed(1)}m`;
    default:
      return `${(n / 1000000000).toFixed(1)}b`;
  }
};
