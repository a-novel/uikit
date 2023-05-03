import { act, renderHook } from "@testing-library/react";

import { useStableInput } from "@hooks";

describe("useStableInput", () => {
  it("should initialize both value and stableValue to undefined", async () => {
    const { result } = renderHook(() => useStableInput({ validate: (value?: string) => value === "valid" }));
    expect(result.current.value).toBeUndefined();
    expect(result.current.stableValue).toBeUndefined();
  });

  it("should initialize both value and stableValue with the initial value", async () => {
    const { result } = renderHook(() =>
      useStableInput({ initial: "initial", validate: (value?: string) => value === "valid" })
    );
    expect(result.current.value).toBe("initial");
    expect(result.current.stableValue).toBe("initial");
  });

  it("should only update value if validation does not pass", async () => {
    const { result } = renderHook(() =>
      useStableInput({ initial: "initial", validate: (value?: string) => value === "valid" })
    );
    expect(result.current.value).toBe("initial");
    expect(result.current.stableValue).toBe("initial");

    await act(() => {
      result.current.setValue("invalid");
    });

    expect(result.current.value).toBe("invalid");
    expect(result.current.stableValue).toBe("initial");
  });

  it("should update both values when validation passes", async () => {
    const { result } = renderHook(() =>
      useStableInput({ initial: "initial", validate: (value?: string) => value === "valid" })
    );
    expect(result.current.value).toBe("initial");
    expect(result.current.stableValue).toBe("initial");

    await act(() => {
      result.current.setValue("invalid");
    });

    expect(result.current.value).toBe("invalid");
    expect(result.current.stableValue).toBe("initial");

    await act(() => {
      result.current.setValue("valid");
    });

    expect(result.current.value).toBe("valid");
    expect(result.current.stableValue).toBe("valid");
  });
});
