import { FC, ReactNode, useEffect, useRef } from "react";

import { NewSizableElement } from "../../__mocks__/generics";
import { act, render } from "@testing-library/react";

import { StickyProviderProps, WithSticky } from "@contexts";

interface RenderDummyStickyProps extends Omit<StickyProviderProps<HTMLDivElement>, "render"> {
  height: number;
  width: number;
  children?: ReactNode;
  testID?: string;
}

const RenderDummySticky: FC<RenderDummyStickyProps> = ({ height, width, children, testID, ...props }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    NewSizableElement({ width, height }, ref.current || undefined);
    // Required for resize listener to properly trigger, since we "create" dimensions after the
    // element being rendered.
    window.dispatchEvent(new Event("resize"));
  }, [height, width]);

  return (
    <WithSticky
      stickyRef={ref}
      render={(stickyRef, style) => (
        <>
          {/* What ru doing step-div */}
          <div data-testid={testID} style={{ position: "sticky", ...style }} ref={stickyRef}>
            I am stuck
          </div>
          {children}
        </>
      )}
      {...props}
    />
  );
};

describe("WithSticky", () => {
  it("should stick at 0 0 by default", () => {
    const rendered = render(<RenderDummySticky height={100} width={1000} />);

    expect(rendered.getByText("I am stuck")).toHaveStyle({
      top: "0px",
      left: "0px",
      "--sticky-top": "0px",
      "--sticky-left": "0px",
    });
  });

  it("should stick children to parent dimensions", async () => {
    const rendered = render(
      <RenderDummySticky testID="1" height={100} width={1000}>
        <RenderDummySticky testID="2" height={50} width={500}>
          <RenderDummySticky testID="3" height={10} width={100} />
        </RenderDummySticky>
      </RenderDummySticky>
    );

    expect(rendered.getByTestId("1")).toHaveStyle({
      top: "0px",
      left: "0px",
      "--sticky-top": "0px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("2")).toHaveStyle({
      top: "100px",
      left: "1000px",
      "--sticky-top": "100px",
      "--sticky-left": "1000px",
    });

    expect(rendered.getByTestId("3")).toHaveStyle({
      top: "150px",
      left: "1500px",
      "--sticky-top": "150px",
      "--sticky-left": "1500px",
    });
  });

  it("should ignore other dimensions if an axis is ignored", async () => {
    const rendered = render(
      <RenderDummySticky testID="1" mode="vertical" height={100} width={1000}>
        <RenderDummySticky testID="2" mode="horizontal" height={50} width={500}>
          <RenderDummySticky testID="3" height={10} width={100} />
        </RenderDummySticky>
      </RenderDummySticky>
    );

    expect(rendered.getByTestId("1")).toHaveStyle({
      top: "0px",
      left: "0px",
      "--sticky-top": "0px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("2")).toHaveStyle({
      top: "100px",
      left: "0px",
      "--sticky-top": "100px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("3")).toHaveStyle({
      top: "100px",
      left: "500px",
      "--sticky-top": "100px",
      "--sticky-left": "500px",
    });
  });

  it("should update positions when a parent size changes", async () => {
    const rendered = render(
      <RenderDummySticky testID="1" mode="vertical" height={100} width={1000}>
        <RenderDummySticky testID="2" mode="horizontal" height={50} width={500}>
          <RenderDummySticky testID="3" height={10} width={100} />
        </RenderDummySticky>
      </RenderDummySticky>
    );

    expect(rendered.getByTestId("1")).toHaveStyle({
      top: "0px",
      left: "0px",
      "--sticky-top": "0px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("2")).toHaveStyle({
      top: "100px",
      left: "0px",
      "--sticky-top": "100px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("3")).toHaveStyle({
      top: "100px",
      left: "500px",
      "--sticky-top": "100px",
      "--sticky-left": "500px",
    });

    await act(() => {
      rendered.rerender(
        <RenderDummySticky testID="1" mode="vertical" height={200} width={2000}>
          <RenderDummySticky testID="2" mode="horizontal" height={50} width={500}>
            <RenderDummySticky testID="3" height={10} width={100} />
          </RenderDummySticky>
        </RenderDummySticky>
      );
    });

    expect(rendered.getByTestId("1")).toHaveStyle({
      top: "0px",
      left: "0px",
      "--sticky-top": "0px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("2")).toHaveStyle({
      top: "200px",
      left: "0px",
      "--sticky-top": "200px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("3")).toHaveStyle({
      top: "200px",
      left: "500px",
      "--sticky-top": "200px",
      "--sticky-left": "500px",
    });

    await act(() => {
      rendered.rerender(
        <RenderDummySticky testID="1" mode="vertical" height={200} width={2000}>
          <RenderDummySticky testID="2" mode="horizontal" height={100} width={1000}>
            <RenderDummySticky testID="3" height={10} width={100} />
          </RenderDummySticky>
        </RenderDummySticky>
      );
    });

    expect(rendered.getByTestId("1")).toHaveStyle({
      top: "0px",
      left: "0px",
      "--sticky-top": "0px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("2")).toHaveStyle({
      top: "200px",
      left: "0px",
      "--sticky-top": "200px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("3")).toHaveStyle({
      top: "200px",
      left: "1000px",
      "--sticky-top": "200px",
      "--sticky-left": "1000px",
    });
  });

  it("should ignore parent dimensions on reset", async () => {
    const rendered = render(
      <RenderDummySticky testID="1" height={100} width={1000}>
        <RenderDummySticky reset testID="2" height={50} width={500}>
          <RenderDummySticky testID="3" height={10} width={100} />
        </RenderDummySticky>
      </RenderDummySticky>
    );

    expect(rendered.getByTestId("1")).toHaveStyle({
      top: "0px",
      left: "0px",
      "--sticky-top": "0px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("2")).toHaveStyle({
      top: "0px",
      left: "0px",
      "--sticky-top": "0px",
      "--sticky-left": "0px",
    });

    expect(rendered.getByTestId("3")).toHaveStyle({
      top: "50px",
      left: "500px",
      "--sticky-top": "50px",
      "--sticky-left": "500px",
    });
  });
});
