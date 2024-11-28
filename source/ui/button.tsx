import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Spinner } from "../assets/loader";
import { twMerge, cvx, type VariantsType } from "str-merge";

export const cvButton = cvx({
  assign:
    "rounded-md text-[14px] font-medium leading-tight disabled:pointer-events-none disabled:gap-2",
  variants: {
    variant: {
      default: "text-color",
      destructive: "action_destructive font-bold text-white",
      outline: "border bg-background [@media(hover:hover)]:hover:bg-muted/65",
      ghost: "[@media(hover:hover)]:hover:bg-muted hover:text-muted-foreground",
      link: "layer_fold rounded-[--round] bg-constructive px-4 py-1.5 text-base font-semibold text-white transition-transform [--round:0.625rem] active:scale-95"
    },
    size: {
      default: "h-8 px-4 py-2",
      sm: "h-8 px-3",
      lg: "h-10 px-8",
      icon: "sizer [--sz:--sz-4]"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

type Variants = VariantsType<typeof cvButton> & { unstyled?: boolean };
export function buttonStyle(props: Variants = {}, className?: string) {
  const { unstyled, ...rest } = props;
  return { className: twMerge(!unstyled && cvButton({ ...rest }), className) };
}

export type MouseEventButtonType = React.MouseEvent<
  HTMLButtonElement,
  MouseEvent
>;

export interface UnstyledProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "style"> {
  asChild?: boolean;
  loading?: boolean;
  style?: React.CSSProperties & { [key: string]: any };
}
export interface ButtonProps
  extends UnstyledProps,
    VariantsType<typeof cvButton> {
  unstyled?: boolean;
}

export const UnstyledButton = React.forwardRef<
  HTMLButtonElement,
  UnstyledProps
>(function UnstyledButton(
  { asChild = false, type = "button", children, loading, disabled, ...props },
  ref
) {
  const Btn = asChild ? Slot : "button";

  return (
    <Btn
      {...{
        ref,
        type,
        disabled: loading || disabled,
        ...props
      }}>
      {loading && <Spinner />}
      {children}
    </Btn>
  );
});
UnstyledButton.displayName = "UnstyledButton";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { unstyled, className, variant = "default", size, ...props },
    ref
  ) {
    const rest = {
      ref,
      className: twMerge(!unstyled && cvButton({ variant, size }), className),
      ...props
    };
    return <UnstyledButton {...rest} />;
  }
);
Button.displayName = "Button";
