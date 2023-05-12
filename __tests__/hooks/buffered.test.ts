import { act, renderHook, waitFor } from "@testing-library/react";

import { DataList, DataListWithStatus, useBufferedState } from "@hooks";

interface bufferedTestMatcher {
  setState?: DataList<number>;
  expectBuffer: DataList<number>;
  expectData: DataListWithStatus<number>;
}

const toMap = (data: Record<any, any>): Map<any, any> => {
  const map = new Map();
  Object.entries(data).forEach(([key, value]) => map.set(key, value));
  return map;
};

// For each given timestamp in states, execute actions and test results.
const bufferedTest = async (
  duration: number,
  initial: bufferedTestMatcher,
  states: Record<number, bufferedTestMatcher>
) => {
  const { result, rerender } = renderHook(({ source }) => useBufferedState({ source, bufferedDuration: duration }), {
    initialProps: { source: initial.setState || new Map() },
  });

  await waitFor(() => {
    expect(result.current.buffer).toEqual(initial.expectBuffer);
  });

  let timeReference = { current: 0 };

  for (const [timestamp, data] of Object.entries(states)) {
    const { setState, expectBuffer, expectData } = data;

    await act(() => {
      setState && rerender({ source: setState });
      jest.advanceTimersByTime(parseInt(timestamp) - timeReference.current);
      timeReference.current = parseInt(timestamp);
    });

    await waitFor(() => {
      expect(result.current.data).toEqual(expectData);
      expect(result.current.buffer).toEqual(expectBuffer);
    });
  }
};

describe("useBufferedState", () => {
  it("should return an empty buffer on first render", async () => {
    await bufferedTest(1000, { expectBuffer: new Map(), expectData: new Map() }, {});
  });

  it("should return an empty buffer when elements are added to the source", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: toMap({ a: 1, b: 2 }),
        expectBuffer: toMap({}),
        expectData: toMap({ a: { status: "active", content: 1 }, b: { status: "active", content: 2 } }),
      },
      {
        // Add new elements to the source, but don't expect them to be in the buffer.
        0: {
          setState: toMap({ a: 1, b: 2, c: 3 }),
          expectBuffer: toMap({}),
          expectData: toMap({
            a: { status: "active", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "active", content: 3 },
          }),
        },
      }
    );
  });

  it("should return deleted elements in the buffer, and only delete them past the bufferedDuration", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: toMap({ a: 1, b: 2, c: 3 }),
        expectBuffer: toMap({}),
        expectData: toMap({
          a: { status: "active", content: 1 },
          b: { status: "active", content: 2 },
          c: { status: "active", content: 3 },
        }),
      },
      {
        // Remove a and c, add d. a and c should now appear in the buffer.
        0: {
          setState: toMap({ b: 2, d: 4 }),
          expectBuffer: toMap({ a: 1, c: 3 }),
          expectData: toMap({
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 3 },
            d: { status: "active", content: 4 },
          }),
        },
        // Move on, but it's still too early to remove a and c from the buffer.
        500: {
          expectBuffer: toMap({ a: 1, c: 3 }),
          expectData: toMap({
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 3 },
            d: { status: "active", content: 4 },
          }),
        },
        // Wait even more, and now a and c should be removed from the buffer.
        1050: {
          expectBuffer: toMap({}),
          expectData: toMap({
            b: { status: "active", content: 2 },
            d: { status: "active", content: 4 },
          }),
        },
      }
    );
  });

  it("should respect buffer duration when elements are removed asynchronously", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: toMap({ a: 1, b: 2, c: 3 }),
        expectBuffer: toMap({}),
        expectData: toMap({
          a: { status: "active", content: 1 },
          b: { status: "active", content: 2 },
          c: { status: "active", content: 3 },
        }),
      },
      {
        // Remove a and c, add d. a and c should now appear in the buffer.
        0: {
          setState: toMap({ b: 2, d: 4 }),
          expectBuffer: toMap({ a: 1, c: 3 }),
          expectData: toMap({
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 3 },
            d: { status: "active", content: 4 },
          }),
        },
        // Remove b, a and c should still be in the buffer.
        500: {
          setState: toMap({ d: 4 }),
          expectBuffer: toMap({ a: 1, b: 2, c: 3 }),
          expectData: toMap({
            a: { status: "removed", content: 1 },
            b: { status: "removed", content: 2 },
            c: { status: "removed", content: 3 },
            d: { status: "active", content: 4 },
          }),
        },
        // Wait for a and c to be removed, b should still be in.
        1050: {
          expectBuffer: toMap({ b: 2 }),
          expectData: toMap({
            b: { status: "removed", content: 2 },
            d: { status: "active", content: 4 },
          }),
        },
        // b is now gone.
        1550: {
          expectBuffer: toMap({}),
          expectData: toMap({
            d: { status: "active", content: 4 },
          }),
        },
      }
    );
  });

  it("should use latest known value in the buffer", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: toMap({ a: 1, b: 2, c: 3 }),
        expectBuffer: toMap({}),
        expectData: toMap({
          a: { status: "active", content: 1 },
          b: { status: "active", content: 2 },
          c: { status: "active", content: 3 },
        }),
      },
      {
        // Update a.
        100: {
          setState: toMap({ a: 4, b: 2, c: 3 }),
          expectBuffer: toMap({}),
          expectData: toMap({
            a: { status: "active", content: 4 },
            b: { status: "active", content: 2 },
            c: { status: "active", content: 3 },
          }),
        },
        // Removing 'a', its latest value should appear in the buffer.
        200: {
          setState: toMap({ b: 2, c: 3 }),
          expectBuffer: toMap({ a: 4 }),
          expectData: toMap({
            a: { status: "removed", content: 4 },
            b: { status: "active", content: 2 },
            c: { status: "active", content: 3 },
          }),
        },
      }
    );
  });

  it("should instantly remove elements from the buffer, if they are added back to the source", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: toMap({ a: 1, b: 2, c: 3 }),
        expectBuffer: toMap({}),
        expectData: toMap({
          a: { status: "active", content: 1 },
          b: { status: "active", content: 2 },
          c: { status: "active", content: 3 },
        }),
      },
      {
        // Remove a and c.
        0: {
          setState: toMap({ b: 2 }),
          expectBuffer: toMap({ a: 1, c: 3 }),
          expectData: toMap({
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 3 },
          }),
        },
        // Add back c.
        500: {
          setState: toMap({ b: 2, c: 13 }),
          expectBuffer: toMap({ a: 1 }),
          expectData: toMap({
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "active", content: 13 },
          }),
        },
        // 'a' should still be removed normally.
        1050: {
          expectBuffer: toMap({}),
          expectData: toMap({
            b: { status: "active", content: 2 },
            c: { status: "active", content: 13 },
          }),
        },
        // 'c' can be removed again.
        1100: {
          setState: toMap({ b: 2 }),
          expectBuffer: toMap({ c: 13 }),
          expectData: toMap({
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 13 },
          }),
        },
        2150: {
          expectBuffer: toMap({}),
          expectData: toMap({
            b: { status: "active", content: 2 },
          }),
        },
      }
    );
  });
});
