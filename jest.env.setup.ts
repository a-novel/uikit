import crypto from "crypto";
import { TextDecoder, TextEncoder } from "util";

Object.defineProperty(globalThis, "crypto", {
  value: {
    randomUUID: crypto.randomUUID,
  },
});

// @ts-ignore
globalThis.TextEncoder = TextEncoder;
// @ts-ignore
globalThis.TextDecoder = TextDecoder;

global.ResizeObserver = class {
  private targets: Element[] = [];
  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;

    window.addEventListener("resize", this._trigger);
  }

  observe(target: Element, _?: ResizeObserverOptions | undefined) {
    this.targets.push(target);
    // We can basically expect the trigger to be called when a new element is observed. This was tested in Chrome,
    // and is confirmed by W3C spec.
    // https://www.w3.org/TR/resize-observer/#intro
    // Observation will fire when observation starts if Element is being rendered, and Element’s size is not 0,0.
    // https://html.spec.whatwg.org/#being-rendered
    // An element is being rendered if it has any associated CSS layout boxes, SVG layout boxes, or some equivalent in
    // other styling languages.
    this._trigger();
  }

  unobserve(target: Element) {
    this.targets = this.targets.filter((t) => t !== target);
  }

  disconnect() {
    this.targets = [];
    window.removeEventListener("resize", this._trigger);
  }

  private _trigger = () => {
    this.callback(
      this.targets.map((target) => {
        // JSDOM uses dummy values for an element DomRect (basically all 0s).
        // For the callback to receive more relevant values, the getBoundingClientRect
        // method must be mocked on the element. This is doable with the NewSizableElement
        // generator (see __mocks__/generics).
        const rect = target.getBoundingClientRect();
        return {
          target,
          contentRect: rect,
          // This approximation is correct, unless a non-western-like writing mode is used (e.g. japanese from
          // top-bottom and right-left - the bastards).
          borderBoxSize: [{ blockSize: rect.height, inlineSize: rect.width }],
          contentBoxSize: [{ blockSize: rect.height, inlineSize: rect.width }],
          devicePixelContentBoxSize: [{ blockSize: rect.height, inlineSize: rect.width }],
        };
      }),
      this
    );
  };
};
