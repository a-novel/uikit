import { useState } from "react";

import { act, renderHook, waitFor } from "@testing-library/react";

import { DataList, DataListWithStatus, useBufferedState } from "@hooks";

interface bufferedTestMatcher {
  setState?: DataList<number>;
  expectState: DataList<number>;
  expectBuffer: DataList<number>;
  expectData: DataListWithStatus<number>;
}

// For each given timestamp in states, execute actions and test results.
const bufferedTest = async (
  duration: number,
  initial: bufferedTestMatcher,
  states: Record<number, bufferedTestMatcher>
) => {
  const { result } = renderHook(() => {
    const [source, setSource] = useState<Record<string, number>>(initial.setState || {});
    const { buffer, data } = useBufferedState({ source, bufferedDuration: duration });
    return { source, setSource, buffer, data };
  });

  expect(result.current.source).toEqual(initial.expectState);
  expect(result.current.buffer).toEqual(initial.expectBuffer);

  let timeReference = 0;

  for (const [timestamp, { setState, expectState, expectBuffer, expectData }] of Object.entries(states)) {
    await act(() => {
      setState && result.current.setSource(setState);
      jest.advanceTimersByTime(parseInt(timestamp) - timeReference);
      timeReference = parseInt(timestamp);
    });

    await waitFor(() => {
      expect(result.current.source).toEqual(expectState);
      expect(result.current.buffer).toEqual(expectBuffer);
      expect(result.current.data).toEqual(expectData);
    });
  }
};

describe("useBufferedState", () => {
  it("should return an empty buffer on first render", async () => {
    await bufferedTest(1000, { expectState: {}, expectBuffer: {}, expectData: {} }, {});
  });

  it("should return an empty buffer when elements are added to the source", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: { a: 1, b: 2 },
        expectState: { a: 1, b: 2 },
        expectBuffer: {},
        expectData: { a: { status: "active", content: 1 }, b: { status: "active", content: 2 } },
      },
      {
        // Add new elements to the source, but don't expect them to be in the buffer.
        0: {
          setState: { a: 1, b: 2, c: 3 },
          expectState: { a: 1, b: 2, c: 3 },
          expectBuffer: {},
          expectData: {
            a: { status: "active", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "active", content: 3 },
          },
        },
      }
    );
  });

  it("should return deleted elements in the buffer, and only delete them past the bufferedDuration", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: { a: 1, b: 2, c: 3 },
        expectState: { a: 1, b: 2, c: 3 },
        expectBuffer: {},
        expectData: {
          a: { status: "active", content: 1 },
          b: { status: "active", content: 2 },
          c: { status: "active", content: 3 },
        },
      },
      {
        // Remove a and c, add d. a and c should now appear in the buffer.
        0: {
          setState: { b: 2, d: 4 },
          expectState: { b: 2, d: 4 },
          expectBuffer: { a: 1, c: 3 },
          expectData: {
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 3 },
            d: { status: "active", content: 4 },
          },
        },
        // Move on, but it's still too early to remove a and c from the buffer.
        500: {
          expectState: { b: 2, d: 4 },
          expectBuffer: { a: 1, c: 3 },
          expectData: {
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 3 },
            d: { status: "active", content: 4 },
          },
        },
        // Wait even more, and now a and c should be removed from the buffer.
        1050: {
          expectState: { b: 2, d: 4 },
          expectBuffer: {},
          expectData: {
            b: { status: "active", content: 2 },
            d: { status: "active", content: 4 },
          },
        },
      }
    );
  });

  it("should respect buffer duration when elements are removed asynchronously", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: { a: 1, b: 2, c: 3 },
        expectState: { a: 1, b: 2, c: 3 },
        expectBuffer: {},
        expectData: {
          a: { status: "active", content: 1 },
          b: { status: "active", content: 2 },
          c: { status: "active", content: 3 },
        },
      },
      {
        // Remove a and c, add d. a and c should now appear in the buffer.
        0: {
          setState: { b: 2, d: 4 },
          expectState: { b: 2, d: 4 },
          expectBuffer: { a: 1, c: 3 },
          expectData: {
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 3 },
            d: { status: "active", content: 4 },
          },
        },
        // Remove b, a and c should still be in the buffer.
        500: {
          setState: { d: 4 },
          expectState: { d: 4 },
          expectBuffer: { a: 1, b: 2, c: 3 },
          expectData: {
            a: { status: "removed", content: 1 },
            b: { status: "removed", content: 2 },
            c: { status: "removed", content: 3 },
            d: { status: "active", content: 4 },
          },
        },
        // Wait for a and c to be removed, b should still be in.
        1050: {
          expectState: { d: 4 },
          expectBuffer: { b: 2 },
          expectData: {
            b: { status: "removed", content: 2 },
            d: { status: "active", content: 4 },
          },
        },
        // b is now gone.
        1550: {
          expectState: { d: 4 },
          expectBuffer: {},
          expectData: {
            d: { status: "active", content: 4 },
          },
        },
      }
    );
  });

  it("should use latest known value in the buffer", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: { a: 1, b: 2, c: 3 },
        expectState: { a: 1, b: 2, c: 3 },
        expectBuffer: {},
        expectData: {
          a: { status: "active", content: 1 },
          b: { status: "active", content: 2 },
          c: { status: "active", content: 3 },
        },
      },
      {
        // Update a.
        100: {
          setState: { a: 4, b: 2, c: 3 },
          expectState: { a: 4, b: 2, c: 3 },
          expectBuffer: {},
          expectData: {
            a: { status: "active", content: 4 },
            b: { status: "active", content: 2 },
            c: { status: "active", content: 3 },
          },
        },
        // Removing 'a', its latest value should appear in the buffer.
        200: {
          setState: { b: 2, c: 3 },
          expectState: { b: 2, c: 3 },
          expectBuffer: { a: 4 },
          expectData: {
            a: { status: "removed", content: 4 },
            b: { status: "active", content: 2 },
            c: { status: "active", content: 3 },
          },
        },
      }
    );
  });

  it("should instantly remove elements from the buffer, if they are added back to the source", async () => {
    await bufferedTest(
      1000,
      // Ignore initial values.
      {
        setState: { a: 1, b: 2, c: 3 },
        expectState: { a: 1, b: 2, c: 3 },
        expectBuffer: {},
        expectData: {
          a: { status: "active", content: 1 },
          b: { status: "active", content: 2 },
          c: { status: "active", content: 3 },
        },
      },
      {
        // Remove a and c.
        0: {
          setState: { b: 2 },
          expectState: { b: 2 },
          expectBuffer: { a: 1, c: 3 },
          expectData: {
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 3 },
          },
        },
        // Add back c.
        500: {
          setState: { b: 2, c: 13 },
          expectState: { b: 2, c: 13 },
          expectBuffer: { a: 1 },
          expectData: {
            a: { status: "removed", content: 1 },
            b: { status: "active", content: 2 },
            c: { status: "active", content: 13 },
          },
        },
        // 'a' should still be removed normally.
        1050: {
          expectState: { b: 2, c: 13 },
          expectBuffer: {},
          expectData: {
            b: { status: "active", content: 2 },
            c: { status: "active", content: 13 },
          },
        },
        // 'c' can be removed again.
        1100: {
          setState: { b: 2 },
          expectState: { b: 2 },
          expectBuffer: { c: 13 },
          expectData: {
            b: { status: "active", content: 2 },
            c: { status: "removed", content: 13 },
          },
        },
        2150: {
          expectState: { b: 2 },
          expectBuffer: {},
          expectData: {
            b: { status: "active", content: 2 },
          },
        },
      }
    );
  });
});
