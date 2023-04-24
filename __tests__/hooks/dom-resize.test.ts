import { useResize } from "@hooks";
import { renderHook, waitFor } from "@testing-library/react";
import { NewSizableElement } from "../../__mocks__/generics";

describe("useResize", () => {
  describe("trigger", () => {
    it("should trigger the event immediately when rendered", async () => {
      const sizeableBody = NewSizableElement({ width: 1920, height: 1080 }, window.document.body);
      const callback = jest.fn();

      renderHook(() => useResize(callback));
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, 1920, 1080, window.document.body);

      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1000 }));
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(2, 2000, 1000, window.document.body);
    });

    it("should only trigger the callback when the document dimension have changed", async () => {
      const sizeableBody = NewSizableElement({ width: 1920, height: 1080 }, window.document.body);
      const callback = jest.fn();

      renderHook(() => useResize(callback));
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, 1920, 1080, window.document.body);

      await waitFor(() => sizeableBody.resize({ width: 1920, height: 1080 }));
      expect(callback).toHaveBeenCalledTimes(1);

      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1000 }));
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(2, 2000, 1000, window.document.body);
    });
  });

  describe("listen", () => {
    it("should trigger on both dimension when listen is not set", async () => {
      const sizeableBody = NewSizableElement({ width: 1920, height: 1080 }, window.document.body);
      const callback = jest.fn();

      renderHook(() => useResize(callback));
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, 1920, 1080, window.document.body);

      // Change width.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1080 }));
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(2, 2000, 1080, window.document.body);

      // Change height.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1000 }));
      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenNthCalledWith(3, 2000, 1000, window.document.body);
    });

    it('should only trigger on "width" resize if width value is passed', async () => {
      const sizeableBody = NewSizableElement({ width: 1920, height: 1080 }, window.document.body);
      const callback = jest.fn();

      renderHook(() => useResize(callback, { listen: "width" }));
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, 1920, 1080, window.document.body);

      // Change width.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1080 }));
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(2, 2000, 1080, window.document.body);

      // Change height.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1000 }));
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should only trigger on height resize if "height" value is passed', async () => {
      const sizeableBody = NewSizableElement({ width: 1920, height: 1080 }, window.document.body);
      const callback = jest.fn();

      renderHook(() => useResize(callback, { listen: "height" }));
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, 1920, 1080, window.document.body);

      // Change width.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1080 }));
      expect(callback).toHaveBeenCalledTimes(1);

      // Change height.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1000 }));
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(2, 2000, 1000, window.document.body);
    });
  });

  describe("element", () => {
    it("should only listen for element resize when given", async () => {
      const sizeableBody = NewSizableElement({ width: 1920, height: 1080 }, window.document.body);
      const sizeableElement = NewSizableElement({ width: 192, height: 108 });
      const callback = jest.fn();

      const elementRef = { current: sizeableElement.target };

      renderHook(() => useResize(callback, { element: elementRef }));
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, 192, 108, sizeableElement.target);

      // Change body width.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1080 }));
      expect(callback).toHaveBeenCalledTimes(1);

      // Change body height.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1000 }));
      expect(callback).toHaveBeenCalledTimes(1);

      // Change element width.
      await waitFor(() => sizeableElement.resize({ width: 200, height: 108 }));
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(2, 200, 108, sizeableElement.target);

      // Change element height.
      await waitFor(() => sizeableElement.resize({ width: 200, height: 100 }));
      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenNthCalledWith(3, 200, 100, sizeableElement.target);
    });
    it('should only listen for element width change with "width" listen parameter', async () => {
      const sizeableBody = NewSizableElement({ width: 1920, height: 1080 }, window.document.body);
      const sizeableElement = NewSizableElement({ width: 192, height: 108 });
      const callback = jest.fn();

      const elementRef = { current: sizeableElement.target };

      renderHook(() => useResize(callback, { element: elementRef, listen: "width" }));
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, 192, 108, sizeableElement.target);

      // Change body width.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1080 }));
      expect(callback).toHaveBeenCalledTimes(1);

      // Change body height.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1000 }));
      expect(callback).toHaveBeenCalledTimes(1);

      // Change element width.
      await waitFor(() => sizeableElement.resize({ width: 200, height: 108 }));
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(2, 200, 108, sizeableElement.target);

      // Change element height.
      await waitFor(() => sizeableElement.resize({ width: 200, height: 100 }));
      expect(callback).toHaveBeenCalledTimes(2);
    });

    it('should only listen for element height change with "height" listen parameter', async () => {
      const sizeableBody = NewSizableElement({ width: 1920, height: 1080 }, window.document.body);
      const sizeableElement = NewSizableElement({ width: 192, height: 108 });
      const callback = jest.fn();

      const elementRef = { current: sizeableElement.target };

      renderHook(() => useResize(callback, { element: elementRef, listen: "height" }));
      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenNthCalledWith(1, 192, 108, sizeableElement.target);

      // Change body width.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1080 }));
      expect(callback).toHaveBeenCalledTimes(1);

      // Change body height.
      await waitFor(() => sizeableBody.resize({ width: 2000, height: 1000 }));
      expect(callback).toHaveBeenCalledTimes(1);

      // Change element width.
      await waitFor(() => sizeableElement.resize({ width: 200, height: 108 }));
      expect(callback).toHaveBeenCalledTimes(1);

      // Change element height.
      await waitFor(() => sizeableElement.resize({ width: 200, height: 100 }));
      expect(callback).toHaveBeenCalledTimes(2);
      expect(callback).toHaveBeenNthCalledWith(2, 200, 100, sizeableElement.target);
    });
  });
});
