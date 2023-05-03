/**
 * Merge multiple class names into a single string, while filtering undefined values.
 */
export const mergeClassNames = (...classes: (string | undefined | null)[]): string =>
  classes?.filter((x) => x != null)?.join(" ") || "";
