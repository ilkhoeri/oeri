import * as React from "react";
import { cn, rem } from "str-merge";

export interface StackProps extends React.ComponentProps<"div"> {
  unstyled?: string;
  gap?: string | number;
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  style?: React.CSSProperties & { [key: string]: any };
}
export const Stack = React.forwardRef<HTMLDivElement, StackProps>((_props, ref) => {
  const { gap = "12", align = "stretch", justify = "flex-start", unstyled, className, style, ...props } = _props;
  return (
    <div
      {...{
        ref,
        className: cn({ "flex flex-col max-w-full": !unstyled }, className),
        style: {
          gap: rem(gap),
          alignItems: align,
          justifyContent: justify,
          ...style
        } as React.CSSProperties,
        ...props
      }}
    />
  );
});
Stack.displayName = "Stack";
