import * as React from "react";

export type PolymorphicRef<T extends React.ElementType> = React.ComponentPropsWithRef<T>["ref"];

export type PolymorphicWithoutRef<T extends React.ElementType, Exclude extends string = never> = Omit<React.ComponentProps<T>, "ref" | "style" | Exclude> & {
  el?: T;
  style?: React.CSSProperties & {
    [key: string]: any;
  };
};

const Element = <T extends React.ElementType = "div">({ el, ...props }: PolymorphicWithoutRef<T>, ref: PolymorphicRef<T>) => {
  const Component = (el || "div") as React.ElementType;
  return <Component ref={ref} {...props} />;
};

// @ts-ignore
export default React.forwardRef(Element) as <T extends React.ElementType = "div">(props: PolymorphicWithoutRef<T> & { ref?: PolymorphicRef<T> }) => React.ReactElement | null;
