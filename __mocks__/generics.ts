interface ClientRectMock {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
  bottom?: number;
  left?: number;
  right?: number;
  top?: number;
}

export const NewElement = () => {
  const element = global.document.createElement("div");
  global.document.body.appendChild(element);

  return element;
};

/**
 * Since JSDom doesn't actually render elements, the `getBoundingClientRect` always returns 0.
 * See {@link https://github.com/jsdom/jsdom/issues/1590#issuecomment-243228840 this issue}.
 *
 * This function creates a new element in the document, with a mocked getBoundingClientRect
 * value. Every value not specified in the input argument will be set to 0.
 */
export const NewSizableElement = (value: ClientRectMock, element?: HTMLElement) => {
  // We don't use typing, since DomRect has some readonly properties that will make typescript complain.
  const dim = {
    width: value.width || 0,
    height: value.height || 0,
    x: value.x || 0,
    y: value.y || 0,
    bottom: value.bottom || 0,
    left: value.left || 0,
    right: value.right || 0,
    top: value.top || 0,
    toJSON(): any {},
  };

  const actualElement = element || NewElement();
  actualElement.getBoundingClientRect = () => dim;

  return {
    resize: (newValue: ClientRectMock) => {
      dim.width = newValue.width || dim.width;
      dim.height = newValue.height || dim.height;
      dim.x = newValue.x || dim.x;
      dim.y = newValue.y || dim.y;
      dim.bottom = newValue.bottom || dim.bottom;
      dim.left = newValue.left || dim.left;
      dim.right = newValue.right || dim.right;
      dim.top = newValue.top || dim.top;

      actualElement.getBoundingClientRect = () => dim;

      window.dispatchEvent(new Event("resize"));
    },
    target: actualElement,
  };
};
