import { mergeClassNames } from "@lib";

describe("mergeClassNames", () => {
  it("should merge class names", () => {
    expect(mergeClassNames("a", "b", "c")).toBe("a b c");
  });

  it("should ignore null or undefined values", () => {
    expect(mergeClassNames(undefined, "a", null, "c")).toBe("a c");
  });

  it("should behave normally with only one value", () => {
    expect(mergeClassNames("a")).toBe("a");
  });

  it("should behave normally with no values", () => {
    expect(mergeClassNames()).toBe("");
  });
});
