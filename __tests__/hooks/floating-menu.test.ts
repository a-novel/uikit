import { act, fireEvent, renderHook } from "@testing-library/react";
import { useFloatingMenu } from "@hooks";
import { NewElement } from "../../__mocks__/generics";

describe("useFloatingMenu", () => {
  it("should close the menu if the window is clicked", async () => {
    const close = jest.fn();
    const ref = { current: NewElement() };
    renderHook(() => useFloatingMenu({ close, ref, opened: true }));

    expect(close).not.toHaveBeenCalled();

    await act(() => {
      fireEvent.click(document.body);
    });

    expect(close).toHaveBeenCalled();
  });

  it("should not close the menu if it is not opened", async () => {
    const close = jest.fn();
    const ref = { current: NewElement() };
    renderHook(() => useFloatingMenu({ close, ref }));

    expect(close).not.toHaveBeenCalled();

    await act(() => {
      fireEvent.click(document.body);
    });

    expect(close).not.toHaveBeenCalled();
  });

  it("should not close the menu if the hook is disabled", async () => {
    const close = jest.fn();
    const ref = { current: NewElement() };
    renderHook(() => useFloatingMenu({ close, ref, opened: true, disable: true }));

    expect(close).not.toHaveBeenCalled();

    await act(() => {
      fireEvent.click(document.body);
    });

    expect(close).not.toHaveBeenCalled();
  });

  it("should not close the menu if the click is fired on the menu", async () => {
    const close = jest.fn();
    const ref = { current: NewElement() };
    renderHook(() => useFloatingMenu({ close, ref, opened: true }));

    expect(close).not.toHaveBeenCalled();

    await act(() => {
      fireEvent.click(ref.current);
    });

    expect(close).not.toHaveBeenCalled();
  });

  it("should not close the menu if the click is fired within the menu", async () => {
    const close = jest.fn();
    const ref = { current: NewElement() };
    const child = NewElement();
    ref.current.appendChild(child);

    renderHook(() => useFloatingMenu({ close, ref, opened: true }));

    expect(close).not.toHaveBeenCalled();

    await act(() => {
      fireEvent.click(child);
    });

    expect(close).not.toHaveBeenCalled();
  });
});
