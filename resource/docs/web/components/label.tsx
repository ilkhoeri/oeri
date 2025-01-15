import * as React from "react";
import * as Primitive from "@radix-ui/react-label";
import { cn } from "str-merge";

export interface LabelProps extends React.ComponentPropsWithoutRef<typeof Primitive.Root> {
  unstyled?: boolean;
  style?: React.CSSProperties & Record<string, any>;
}
export const Label = React.forwardRef<React.ElementRef<typeof Primitive.Root>, LabelProps>(({ className, unstyled, ...props }, ref) => (
  <Primitive.Root
    {...{
      ref,
      className: cn(
        {
          "inline-flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70": !unstyled
        },
        className
      ),
      ...props
    }}
  />
));
Label.displayName = Primitive.Root.displayName;
