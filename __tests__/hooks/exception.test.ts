import { act, renderHook } from "@testing-library/react";
import { useCaptureException } from "@hooks";

jest.mock("@lib/api", () => ({
  ...jest.requireActual("@lib/api"),
  isAPIError: jest.fn().mockImplementation(() => false),
}));
const highway = require("@lib/api");
const mockedHighway = highway as jest.Mocked<typeof highway>;

jest.mock("@lib", () => ({
  ...jest.requireActual("@lib"),
  captureException: jest.fn().mockImplementation(() => {}),
}));
const lib = require("@lib");
const mockedLib = lib as jest.Mocked<typeof lib>;

afterEach(() => {
  jest.restoreAllMocks();
});

describe("useCaptureException", () => {
  it("should call captureException when error is updated", async () => {
    const { rerender } = renderHook(({ error }) => useCaptureException({ error }), {
      initialProps: { error: null as unknown },
    });
    expect(mockedLib.captureException).not.toHaveBeenCalled();

    await act(() => {
      rerender({ error: new Error("test") });
    });
    expect(mockedLib.captureException).toHaveBeenCalledTimes(1);
    expect(mockedLib.captureException).toHaveBeenNthCalledWith(1, new Error("test"));
  });

  it("should not call captureException when error is updated and silent is true", async () => {
    const { rerender } = renderHook(({ error }) => useCaptureException({ error, silent: true }), {
      initialProps: { error: null as unknown },
    });
    expect(mockedLib.captureException).not.toHaveBeenCalled();

    await act(() => {
      rerender({ error: new Error("test") });
    });
    expect(mockedLib.captureException).not.toHaveBeenCalled();
  });

  it("should not call captureException when error is updated and it is an APIError with an ignored code", async () => {
    mockedHighway.isAPIError.mockImplementation(() => true);

    const { rerender } = renderHook(({ error }) => useCaptureException({ error, ignoreAPICodes: [401, 404] }), {
      initialProps: { error: null as unknown },
    });
    expect(mockedLib.captureException).not.toHaveBeenCalled();

    await act(() => {
      rerender({ error: { status: 404 } });
    });
    expect(mockedLib.captureException).not.toHaveBeenCalled();
  });

  it("should call captureException when error is updated and it is an APIError with a non-ignored code", async () => {
    mockedHighway.isAPIError.mockImplementation(() => true);

    const { rerender } = renderHook(({ error }) => useCaptureException({ error, ignoreAPICodes: [401, 404] }), {
      initialProps: { error: null as unknown },
    });
    expect(mockedLib.captureException).not.toHaveBeenCalled();

    await act(() => {
      rerender({ error: { status: 500 } });
    });
    expect(mockedLib.captureException).toHaveBeenCalledTimes(1);
    expect(mockedLib.captureException).toHaveBeenNthCalledWith(1, { status: 500 });
  });
});
